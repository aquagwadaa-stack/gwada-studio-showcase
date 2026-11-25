import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

/**
 * Redirections permanentes (301) : barre oblique finale, et adresses mal recopiées dans des
 * publications (par exemple « /realisationsDemander », lien collé au mot suivant sur Facebook).
 * Les fichiers des sous-dossiers (images de /realisations/…) ne sont jamais redirigés.
 */
export function redirectionPermanente(url: URL): string | null {
  // Plusieurs barres obliques en tête (« //autre-site.com/ ») sont réduites à une seule :
  // sinon « Location: //autre-site.com » enverrait le visiteur sur un autre domaine.
  let chemin = url.pathname.replace(/^\/+/, "/");
  if (chemin.length > 1 && chemin.endsWith("/")) chemin = chemin.replace(/\/+$/, "") || "/";
  let lisible = chemin;
  try {
    lisible = decodeURIComponent(chemin);
  } catch {
    // adresse mal encodée : on garde la forme brute
  }
  const bas = lisible.toLowerCase();
  if (bas !== "/realisations" && /^\/r[eé]alisations?[^/]*$/.test(bas)) chemin = "/realisations";
  else if (bas !== "/demo-gratuite" && (bas === "/demo" || /^\/demo-gratuite[^/]*$/.test(bas)))
    chemin = "/demo-gratuite";
  if (!chemin.startsWith("/") || chemin.startsWith("//")) return null;
  return chemin !== url.pathname ? chemin + url.search : null;
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    if (request.method === "GET" || request.method === "HEAD") {
      const cible = redirectionPermanente(new URL(request.url));
      if (cible) return new Response(null, { status: 301, headers: { location: cible } });
    }
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
