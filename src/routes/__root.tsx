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
import { SocialSidebar } from "../components/site/SocialSidebar";
import { contactInfo } from "../lib/contact-info";

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
      { title: "Gwada Web Studio — Sites web qui génèrent des demandes" },
      {
        name: "description",
        content:
          "Sites web et outils métier utiles : demandes de devis, réservation, paiement, catalogue et administration. Basé en Guadeloupe, projets à distance.",
      },
      { name: "author", content: "Gwada Web Studio" },
      {
        property: "og:title",
        content: "Gwada Web Studio — Sites web qui génèrent des demandes",
      },
      {
        property: "og:description",
        content:
          "Transformez vos visites en demandes claires grâce à un site pensé autour de votre activité.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/Q8gH7ktalcbKpZgJJcez7FQcXo13/social-images/social-1783128129523-ChatGPT_Image_2_mai_2026,_00_45_51.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Gwada Web Studio — Sites web qui génèrent des demandes",
      },
      {
        name: "twitter:description",
        content:
          "Transformez vos visites en demandes claires grâce à un site pensé autour de votre activité.",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/Q8gH7ktalcbKpZgJJcez7FQcXo13/social-images/social-1783128129523-ChatGPT_Image_2_mai_2026,_00_45_51.webp",
      },
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
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: contactInfo.brand,
    description:
      "Conception de sites et outils web utiles : demandes de devis, réservations, paiements, catalogues et espaces d'administration.",
    email: contactInfo.email,
    areaServed: ["Guadeloupe", "France"],
  };

  return (
    <html lang="fr" id="top">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
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
      <SocialSidebar />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
