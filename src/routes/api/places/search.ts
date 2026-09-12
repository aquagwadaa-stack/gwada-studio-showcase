import { createFileRoute } from "@tanstack/react-router";

type PlaceResult = {
  id: string;
  name: string;
  address: string;
  writeAReviewUri: string | null;
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/places/search")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["GOOGLE_MAPS_API_KEY"];
        if (!apiKey) {
          return json(
            { error: "missing_key", message: "La recherche Google n'est pas encore configurée." },
            503,
          );
        }

        // Authentification : seul un utilisateur connecté peut faire des recherches.
        const authHeader = request.headers.get("Authorization") ?? "";
        const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
        if (!token) {
          return json({ error: "unauthorized", message: "Connexion requise." }, 401);
        }
        const supabaseUrl = process.env["SUPABASE_URL"];
        const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];
        if (!supabaseUrl || !supabaseKey) {
          return json({ error: "server", message: "Service indisponible." }, 503);
        }
        const userRes = await fetch(`${supabaseUrl}/auth/v1/user`, {
          headers: { Authorization: `Bearer ${token}`, apikey: supabaseKey },
        });
        if (!userRes.ok) {
          return json({ error: "unauthorized", message: "Session expirée." }, 401);
        }

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ error: "bad_request", message: "Requête invalide." }, 400);
        }
        const raw = (payload as { query?: unknown } | null)?.query;
        const query = typeof raw === "string" ? raw.trim() : "";
        if (query.length < 2 || query.length > 120) {
          return json({ error: "bad_request", message: "Recherche invalide." }, 400);
        }

        let googleRes: Response;
        try {
          googleRes = await fetch("https://places.googleapis.com/v1/places:searchText", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": apiKey,
              "X-Goog-FieldMask":
                "places.id,places.displayName,places.formattedAddress,places.googleMapsLinks",
            },
            body: JSON.stringify({
              textQuery: query,
              languageCode: "fr",
              regionCode: "GP",
              pageSize: 5,
              locationBias: {
                circle: {
                  center: { latitude: 16.265, longitude: -61.551 },
                  radius: 50000,
                },
              },
            }),
          });
        } catch {
          return json({ error: "network", message: "Recherche Google indisponible." }, 502);
        }

        if (!googleRes.ok) {
          const status = googleRes.status;
          console.error(`Places searchText failed [${status}]`);
          if (status === 403 || status === 401) {
            return json(
              { error: "key", message: "La clé Google n'autorise pas cette recherche." },
              502,
            );
          }
          if (status === 429) {
            return json({ error: "quota", message: "Quota Google atteint. Réessayez." }, 502);
          }
          return json({ error: "google", message: "Recherche Google impossible." }, 502);
        }

        const data = (await googleRes.json()) as {
          places?: Array<{
            id?: string;
            displayName?: { text?: string };
            formattedAddress?: string;
            googleMapsLinks?: { writeAReviewUri?: string };
          }>;
        };

        const results: PlaceResult[] = (data.places ?? []).slice(0, 5).map((p) => ({
          id: p.id ?? "",
          name: p.displayName?.text ?? "Sans nom",
          address: p.formattedAddress ?? "",
          writeAReviewUri: p.googleMapsLinks?.writeAReviewUri ?? null,
        }));

        return json({ results });
      },
    },
  },
});
