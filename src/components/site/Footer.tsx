import { Link } from "@tanstack/react-router";
import { ArrowUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1715] text-[#f7f7ef]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-12">
        <div>
          <Link to="/" className="font-display text-lg font-black uppercase tracking-[0.08em]">
            Gwada Web Studio
          </Link>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">
            Sites web et outils métier sur mesure pour les entreprises en Guadeloupe.
          </p>
          <p className="mt-6 text-xs text-white/30">
            © {new Date().getFullYear()} Gwada Web Studio · Louis Aubry
          </p>
        </div>
        <a
          href="#top"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white/35 hover:text-white"
          aria-label="Revenir en haut"
        >
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
