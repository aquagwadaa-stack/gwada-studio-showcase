import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/site/Nav";
import { SiteFooter } from "../components/site/Footer";
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
      { title: "Gwada Web Studio — Sites web, outils métier & cartes NFC" },
      {
        name: "description",
        content:
          "Sites web, outils métier et cartes NFC pour avis Google. Réservation, paiement, catalogue et solutions sur mesure depuis la Guadeloupe.",
      },
      { name: "author", content: "Gwada Web Studio" },
      {
        property: "og:title",
        content: "Gwada Web Studio — Sites web, outils métier & cartes NFC",
      },
      {
        property: "og:description",
        content:
          "Sites web, outils métier et cartes NFC conçus sur mesure pour les entreprises en Guadeloupe.",
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
        content: "Gwada Web Studio — Sites web, outils métier & cartes NFC",
      },
      {
        name: "twitter:description",
        content:
          "Sites web, outils métier et cartes NFC conçus sur mesure pour les entreprises en Guadeloupe.",
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
      "Conception de sites, outils web utiles et cartes NFC pour avis Google en Guadeloupe.",
    email: contactInfo.email,
    telephone: contactInfo.phoneHref,
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isolated = pathname.startsWith("/admin") || pathname.startsWith("/a/");

  usePageScrollMotion(pathname, isolated);

  if (isolated) {
    return <Outlet />;
  }

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

function usePageScrollMotion(pathname: string, isolated: boolean) {
  useEffect(() => {
    if (isolated) return;

    type MotionItem = {
      section: HTMLElement;
      target: HTMLElement;
      baseTop: number;
      baseBottom: number;
      index: number;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let items: MotionItem[] = [];
    let frame = 0;
    let resizeTimer = 0;

    const clearStyles = () => {
      items.forEach(({ section, target }) => {
        section.style.paddingTop = "";
        section.style.paddingBottom = "";
        section.style.willChange = "";
        target.style.transform = "";
        target.style.opacity = "";
        target.style.willChange = "";
      });
      items = [];
    };

    const update = () => {
      frame = 0;

      if (reduceMotion.matches) {
        items.forEach(({ target }) => {
          target.style.transform = "none";
          target.style.opacity = "1";
        });
        return;
      }

      const viewportHeight = window.innerHeight;
      const mobile = window.innerWidth < 640;
      const maxTighten = mobile ? 24 : 38;
      const maxRise = mobile ? 28 : 44;

      items.forEach(({ section, target, baseTop, baseBottom, index }) => {
        const rect = section.getBoundingClientRect();

        if (index === 0) {
          const distance = Math.min(Math.max(section.offsetHeight * 0.42, 240), 460);
          const progress = Math.min(1, Math.max(0, -rect.top / distance));
          const lift = (mobile ? 16 : 24) * progress;
          const scale = 1 - 0.012 * progress;

          target.style.transform = `translate3d(0, -${lift}px, 0) scale(${scale})`;
          target.style.opacity = `${1 - 0.12 * progress}`;
          return;
        }

        const start = viewportHeight * 0.98;
        const end = viewportHeight * 0.42;
        const raw = (start - rect.top) / Math.max(1, start - end);
        const progress = Math.min(1, Math.max(0, raw));

        section.style.paddingTop = `${Math.max(16, baseTop - maxTighten * progress)}px`;
        section.style.paddingBottom = `${Math.max(16, baseBottom - maxTighten * 0.75 * progress)}px`;

        const translate = maxRise * (1 - progress);
        const scale = 0.985 + 0.015 * progress;
        target.style.transform = `translate3d(0, ${translate}px, 0) scale(${scale})`;
        target.style.opacity = `${0.72 + 0.28 * progress}`;
      });
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const prepare = () => {
      clearStyles();

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("main > div > section"),
      );

      items = sections.map((section, index) => {
        const target =
          section.querySelector<HTMLElement>(':scope > div[class*="mx-auto"]') ??
          section.querySelector<HTMLElement>(":scope > div") ??
          section;

        const styles = window.getComputedStyle(section);

        if (index > 0) {
          section.style.willChange = "padding-top, padding-bottom";
        }
        target.style.willChange = "transform, opacity";

        return {
          section,
          target,
          baseTop: Number.parseFloat(styles.paddingTop) || 0,
          baseBottom: Number.parseFloat(styles.paddingBottom) || 0,
          index,
        };
      });

      update();
    };

    const prepareFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(prepare);
    });

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(prepare, 120);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);
    reduceMotion.addEventListener("change", prepare);

    return () => {
      window.cancelAnimationFrame(prepareFrame);
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
      reduceMotion.removeEventListener("change", prepare);
      clearStyles();
    };
  }, [pathname, isolated]);
}
