import { Link } from "@tanstack/react-router";
import { contactInfo, whatsappUrl } from "@/lib/contact-info";
import { Sparkles, Mail, Phone, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display font-semibold text-lg">
            <span className="h-8 w-8 rounded-lg gws-accent-bg grid place-items-center">
              <Sparkles className="h-4 w-4" />
            </span>
            Gwada Web Studio
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-md">
            Création de sites web modernes et adaptés à chaque entreprise. Showroom interactif pour
            visualiser votre futur site avant même de commencer.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Démonstrations</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/vitrine" className="hover:text-foreground">Site vitrine</Link></li>
            <li><Link to="/reservation" className="hover:text-foreground">Réservation</Link></li>
            <li><Link to="/catalogue" className="hover:text-foreground">Catalogue</Link></li>
            <li><Link to="/boutique" className="hover:text-foreground">Boutique</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />{contactInfo.email}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />{contactInfo.phone}</li>
            <li>
              <a href={whatsappUrl("Bonjour, je viens du showroom.")} className="inline-flex items-center gap-2 hover:text-foreground">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gwada Web Studio · Tous droits réservés.
      </div>
    </footer>
  );
}
