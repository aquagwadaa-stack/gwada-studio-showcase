import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-[1.5fr_0.7fr_0.8fr]">
        <div>
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <span className="h-8 w-8 rounded-lg gws-accent-bg grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </span>
            Gwada Web Studio
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Je conçois des sites web clairs, modernes et adaptés aux objectifs réels de chaque
            entreprise en Guadeloupe.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Explorer</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" hash="apercu" className="hover:text-foreground">
                Composer un site
              </Link>
            </li>
            <li>
              <Link to="/reservation" className="hover:text-foreground">
                Réservation
              </Link>
            </li>
            <li>
              <Link to="/catalogue" className="hover:text-foreground">
                Catalogue
              </Link>
            </li>
            <li>
              <Link to="/boutique" className="hover:text-foreground">
                Boutique
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Un projet en tête ?</h4>
          <p className="text-sm text-muted-foreground">
            Parlons de votre activité et voyons ce qu'un site peut concrètement vous apporter.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold gws-accent-text"
          >
            Me contacter <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gwada Web Studio · Création de sites web en Guadeloupe.
      </div>
    </footer>
  );
}
