// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Pages gardées dans des fichiers à part : l'admin (lourd et privé) et l'aperçu de Noël (hors Google).
const PAGES_A_PART = ["/admin", "/exemple-commandes-noel"];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: {
      codeSplittingOptions: {
        // Les pages publiques sont chargées d'un seul bloc. Google ne télécharge parfois
        // qu'une partie des fichiers d'un site : avec une page découpée, il lui manquait un
        // morceau et il indexait « La page n'a pas chargé » à la place du contenu. D'un seul
        // bloc, soit tout se charge, soit la page reste celle envoyée par le serveur.
        splitBehavior: ({ routeId }: { routeId: string }) =>
          PAGES_A_PART.some((debut) => routeId.startsWith(debut)) ? undefined : [],
      },
    },
  },
});
