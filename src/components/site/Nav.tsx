import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/sites-web", label: "Sites web" },
  { to: "/outils-metier", label: "Outils métier" },
  { to: "/cartes-nfc", label: "Cartes NFC" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1715]/90 text-[#f7f7ef] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3" aria-label="Gwada Web Studio — Accueil">
          <BrandMark />
          <span className="font-display text-sm font-black uppercase tracking-[0.08em] sm:text-base">
            Gwada Web Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {links.map((link) => {
            const active = pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition ${active ? "bg-white/[0.08] text-white" : "text-white/55 hover:bg-white/[0.04] hover:text-white"}`}
              >
                {active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#54d7c8]" aria-hidden="true" />
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full bg-[#f7f7ef] px-5 py-2.5 text-xs font-black uppercase tracking-wider text-[#0d1715] transition hover:bg-[#54d7c8] sm:inline-flex"
          data-cta="nav-contact"
        >
          Me contacter <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0d1715] px-5 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-[1380px] flex-col" aria-label="Navigation mobile">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 text-lg font-black"
            >
              Accueil
            </Link>
            {links.map((link) => {
              const active = pathname.startsWith(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`my-1 flex items-center justify-between rounded-xl px-3 py-3.5 text-lg font-black transition ${active ? "bg-white/[0.07] text-white" : "text-white/72 hover:bg-white/[0.035] hover:text-white"}`}
                >
                  {link.label}
                  {active && (
                    <span className="h-2 w-2 rounded-full bg-[#54d7c8]" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#54d7c8] px-5 text-sm font-black text-[#0d1715]"
              data-cta="nav-mobile-contact"
            >
              Me contacter <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function BrandMark() {
  return (
    <span
      className="relative grid h-8 w-8 place-items-center rounded-full border-[6px] border-[#f7f7ef]"
      aria-hidden="true"
    >
      <span className="absolute right-[-6px] top-[-6px] h-3 w-3 rounded-full bg-[#54d7c8]" />
    </span>
  );
}
