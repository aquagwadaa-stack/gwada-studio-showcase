import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { contactInfo } from "@/lib/contact-info";

const footerLinks = [
  { to: "/sites-web", label: "Sites web" },
  { to: "/outils-metier", label: "Outils métier" },
  { to: "/cartes-nfc", label: "Cartes NFC" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1715] text-[#f7f7ef]">
      <div className="mx-auto grid max-w-[1380px] gap-10 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-end lg:px-12">
        <div>
          <Link to="/" className="font-display text-lg font-black uppercase tracking-[0.08em]">
            Gwada Web Studio
          </Link>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-white/45">
            Sites web, outils métier et cartes NFC. Basé en Guadeloupe, projets en France et à distance.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-5">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-[#54d7c8]" /> {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5 text-[#54d7c8]" /> {contactInfo.phone}
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-bold text-white/40 transition hover:text-white/75"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs text-white/30">
            © {new Date().getFullYear()} Gwada Web Studio · Louis
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
