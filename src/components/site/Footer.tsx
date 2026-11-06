import { Link } from "@tanstack/react-router";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/contact-info";
import { services } from "@/lib/services";

const studioLinks = [
  { to: "/realisations", label: "Réalisations" },
  { to: "/ce-qui-est-inclus", label: "Ce qui est inclus" },
  { to: "/demo-gratuite", label: "Démo gratuite" },
  { to: "/contact", label: "Contact" },
] as const;

const metierLinks = [
  { to: "/creation-site-internet-guadeloupe", label: "Site internet en Guadeloupe" },
  { to: "/creation-site-internet-martinique", label: "Site internet en Martinique" },
  { to: "/site-internet-restaurant", label: "Restaurants et traiteurs" },
  { to: "/site-internet-artisan", label: "Artisans" },
  { to: "/site-internet-location-saisonniere", label: "Gîtes et locations" },
  { to: "/site-internet-salon-institut", label: "Salons et instituts" },
  { to: "/site-internet-commerce-antillais", label: "Commerces antillais en métropole" },
  { to: "/site-commandes-noel", label: "Commandes de Noël" },
] as const;

const legalLinks = [
  { to: "/mentions-legales", label: "Mentions légales" },
  { to: "/confidentialite", label: "Confidentialité" },
] as const;

function FooterTitle({ children }: { children: string }) {
  return <h2 className="text-sm font-extrabold text-white">{children}</h2>;
}

const linkClass = "text-sm text-white/60 transition hover:text-white";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0d1715] text-[#f7f7ef]">
      <div className="mx-auto max-w-[1376px] px-5 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.7fr_1.15fr]">
          <div>
            <Link to="/" className="font-display text-lg font-black tracking-[-0.01em]">
              Gwada Web Studio
            </Link>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">
              Sites internet, applications et outils sur mesure, en Guadeloupe, en Martinique et
              dans toute la France.
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-white/72">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Mail className="h-3.5 w-3.5 text-[#54d7c8]" aria-hidden="true" />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phoneHref}`}
                  className="inline-flex items-center gap-2 transition hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-[#54d7c8]" aria-hidden="true" />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#54d7c8]" aria-hidden="true" />
                Les Abymes, Guadeloupe
              </li>
            </ul>
          </div>

          <div>
            <FooterTitle>Services</FooterTitle>
            <ul className="mt-3 grid gap-2">
              {services.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>Le studio</FooterTitle>
            <ul className="mt-3 grid gap-2">
              {studioLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>Votre activité</FooterTitle>
            <ul className="mt-3 grid gap-2">
              {metierLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-white/50">
            <span>© {new Date().getFullYear()} Gwada Web Studio</span>
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </p>
          <a
            href="#top"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white/35 hover:text-white"
            aria-label="Revenir en haut"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
