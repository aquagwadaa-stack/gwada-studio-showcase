import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";

const links = [
  { to: "/realisations", label: "Réalisations" },
  { to: "/ce-qui-est-inclus", label: "Ce qui est inclus" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const onService = services.some((service) => pathname.startsWith(service.to));

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header className="gws-entete sticky top-0 z-50 border-b border-white/10 text-[#f7f7ef] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-[1376px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3" aria-label="Gwada Web Studio, accueil">
          <img
            src="/logo-gws.webp"
            alt=""
            width={320}
            height={159}
            decoding="async"
            className="h-9 w-auto shrink-0 object-contain sm:h-10"
          />
          <span className="font-display text-sm font-black tracking-[-0.01em] sm:text-base">
            Gwada Web Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((value) => !value)}
              aria-expanded={servicesOpen}
              aria-controls="menu-services"
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition ${onService ? "bg-white/[0.08] text-white" : "text-white/65 hover:bg-white/[0.05] hover:text-white"}`}
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {servicesOpen && (
              <div
                id="menu-services"
                className="gws-menu absolute left-0 top-full mt-2 w-[340px] rounded-2xl border border-white/12 bg-[#13211e] p-2 shadow-[0_24px_60px_rgba(0,0,0,.45)]"
              >
                {services.map((service) => (
                  <Link
                    key={service.to}
                    to={service.to}
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-xl px-3.5 py-2.5 transition hover:bg-white/[0.06]"
                  >
                    <span className="block text-sm font-extrabold">{service.label}</span>
                    <span className="mt-0.5 block text-[13px] text-white/60">{service.short}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {links.map((link) => {
            const active = pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${active ? "bg-white/[0.08] text-white" : "text-white/65 hover:bg-white/[0.05] hover:text-white"}`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/demo-gratuite"
            className="hidden items-center gap-1.5 rounded-full bg-[#f7f7ef] px-5 py-2.5 text-[13px] font-extrabold text-[#0d1715] transition hover:bg-[#54d7c8] sm:inline-flex"
            data-cta="nav-demo"
          >
            Démo gratuite <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
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
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0d1715] px-5 pb-6 pt-3 lg:hidden">
          <nav className="mx-auto flex max-w-[1376px] flex-col" aria-label="Navigation mobile">
            <Link to="/" onClick={() => setOpen(false)} className="py-3 text-lg font-extrabold">
              Accueil
            </Link>
            <p className="mt-2 border-t border-white/10 pb-1 pt-4 text-sm font-semibold text-white/55">
              Services
            </p>
            {services.map((service) => (
              <Link
                key={service.to}
                to={service.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-lg font-extrabold"
              >
                {service.label}
              </Link>
            ))}
            <div className="mb-2 mt-3 border-t border-white/10" />
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-lg font-extrabold"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/demo-gratuite"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#54d7c8] px-5 text-sm font-black text-[#0d1715]"
              data-cta="nav-mobile-demo"
            >
              Ma démo gratuite <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
