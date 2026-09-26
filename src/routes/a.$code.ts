import { createFileRoute } from "@tanstack/react-router";

const page = (title: string, message: string, status: number) =>
  new Response(
    `<!doctype html><html lang="fr"><head><meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/>
<title>${title} — Gwada Web Studio</title>
<style>
:root{color-scheme:dark}
body{margin:0;min-height:100svh;display:grid;place-items:center;background:#0d1715;color:#f7f7ef;
font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif;padding:24px;text-align:center}
.k{font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#54d7c8}
h1{font-size:26px;line-height:1.25;margin:14px 0 8px;font-weight:800}
p{margin:0;color:rgba(255,255,255,.55);font-size:15px}
a{display:inline-block;margin-top:22px;background:#54d7c8;color:#0d1715;text-decoration:none;
font-weight:800;font-size:14px;padding:12px 22px;border-radius:999px}
</style></head><body><main>
<div class="k">Gwada Web Studio</div>
<h1>${message}</h1>
<p>Carte NFC / QR Gwada Web Studio.</p>
<a href="https://gwadawebstudio.fr">Voir Gwada Web Studio</a>
</main></body></html>`,
    { status, headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" } },
  );

export const Route = createFileRoute("/a/$code")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ params }) => {
        const code = String(params.code || "")
          .trim()
          .toUpperCase();

        if (!/^[A-Z0-9_-]{1,32}$/.test(code)) {
          return page("Carte inconnue", "Cette carte n’existe pas.", 404);
        }

        const url = process.env["SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!url || !key) {
          return page("Indisponible", "Service temporairement indisponible.", 503);
        }

        try {
          const res = await fetch(
            `${url}/rest/v1/nfc_cards?select=target_url,active&code=eq.${encodeURIComponent(code)}&limit=1`,
            {
              headers: { apikey: key, accept: "application/json" },
            },
          );
          if (!res.ok) {
            return page("Indisponible", "Service temporairement indisponible.", 503);
          }
          const rows = (await res.json()) as Array<{
            target_url: string | null;
            active: boolean;
          }>;
          const card = rows[0];

          if (!card) {
            return page("Carte inconnue", "Cette carte n’existe pas.", 404);
          }

          const target = card.target_url?.trim();
          const valid = !!target && /^https?:\/\//i.test(target);

          if (card.active && valid) {
            return new Response(null, {
              status: 302,
              headers: { location: target!, "cache-control": "no-store" },
            });
          }

          return page(
            "Carte non configurée",
            "Cette carte n’est pas encore configurée.",
            200,
          );
        } catch {
          return page("Indisponible", "Service temporairement indisponible.", 503);
        }
      },
    },
  },
});
