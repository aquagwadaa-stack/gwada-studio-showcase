import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/site/Nav";
import { SiteFooter } from "../components/site/Footer";

function NotFoundComponent() {
  return (
    <div className="grid min-h-[70svh] place-items-center bg-[#0d1715] px-5 text-[#f7f7ef]">
      <div className="max-w-lg text-center">
        <div className="text-sm font-black uppercase tracking-[0.18em] text-[#54d7c8]">
          Erreur 404
        </div>
        <h1 className="mt-4 font-display text-5xl font-black tracking-[-0.05em]">
          Cette page n’existe plus.
        </h1>
        <p className="mt-4 text-white/55">
          Le nouveau site va droit à l’essentiel. Revenez à l’accueil pour découvrir Gwada Web
          Studio.
        </p>
        <Link
          to="/"
          className="mt-7 inline-flex rounded-full bg-[#54d7c8] px-6 py-3 text-sm font-black text-[#0d1715]"
        >
          Revenir à l’accueil
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="grid min-h-[70svh] place-items-center bg-[#0d1715] px-5 text-[#f7f7ef]">
      <div className="max-w-md text-center">
        <h1 className="font-display text-4xl font-black tracking-tight">La page n’a pas chargé.</h1>
        <p className="mt-3 text-sm text-white/55">
          Un imprévu est survenu. Vous pouvez relancer la page.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-full bg-[#54d7c8] px-6 py-3 text-sm font-black text-[#0d1715]"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<Record<string, never>>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gwada Web Studio — Sites web utiles en Guadeloupe" },
      {
        name: "description",
        content:
          "Sites web et outils métier sur mesure en Guadeloupe : réservation, paiement, catalogue et administration.",
      },
      { name: "author", content: "Gwada Web Studio" },
      { property: "og:title", content: "Gwada Web Studio — Des sites qui travaillent avec vous" },
      {
        property: "og:description",
        content: "Sites modernes, outils métier et accompagnement direct en Guadeloupe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" id="top">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen bg-[#0d1715]">
      <SiteNav />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
