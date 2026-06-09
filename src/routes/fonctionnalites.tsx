import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MessageCircle, Mail, Image as ImageIcon, Star, MapPin, Calendar,
  LayoutGrid, CreditCard, Boxes, Truck, FileText, UserCircle, Smartphone, Search,
} from "lucide-react";

export const Route = createFileRoute("/fonctionnalites")({
  head: () => ({
    meta: [
      { title: "Fonctionnalités — Gwada Web Studio" },
      { name: "description", content: "Toutes les fonctionnalités disponibles pour votre site." },
    ],
  }),
  component: FeaturesPage,
});

const FEATURES = [
  { icon: MessageCircle, title: "Contact WhatsApp", desc: "Un bouton flottant pour discuter directement avec vos clients." },
  { icon: Mail, title: "Formulaire de contact", desc: "Recevez les demandes par e-mail, avec validation et anti-spam." },
  { icon: ImageIcon, title: "Galerie", desc: "Présentez vos réalisations dans une galerie élégante et fluide." },
  { icon: Star, title: "Avis clients", desc: "Affichez les témoignages de vos clients pour rassurer." },
  { icon: MapPin, title: "Carte & horaires", desc: "Indiquez clairement votre adresse et vos horaires d'ouverture." },
  { icon: Calendar, title: "Réservation", desc: "Permettez à vos clients de réserver en ligne 24h/24." },
  { icon: LayoutGrid, title: "Catalogue avec filtres", desc: "Présentez vos produits ou services avec recherche et tri." },
  { icon: CreditCard, title: "Paiement en ligne", desc: "Encaissez par carte bancaire en toute sécurité." },
  { icon: Boxes, title: "Gestion des stocks", desc: "Suivez vos disponibilités en temps réel." },
  { icon: Truck, title: "Commande & retrait", desc: "Proposez la livraison ou le retrait sur place." },
  { icon: FileText, title: "Demande de devis", desc: "Recueillez les demandes structurées de vos prospects." },
  { icon: UserCircle, title: "Espace client", desc: "Offrez un espace personnel pour suivre commandes et factures." },
  { icon: Smartphone, title: "Site responsive", desc: "Parfaitement adapté à tous les écrans, du mobile au desktop." },
  { icon: Search, title: "Référencement naturel", desc: "Optimisé pour Google : balises, vitesse, structure." },
];

function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-3xl">
        <div className="text-xs uppercase tracking-widest gws-accent-text font-semibold mb-3">Fonctionnalités</div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
          Tout ce dont votre site a besoin.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choisissez les fonctionnalités adaptées à votre activité. Tout est modulaire et combinable.
        </p>
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((f) => (
          <Card key={f.title} className="p-6 gws-themed hover:gws-accent-border transition">
            <div className="h-11 w-11 rounded-lg gws-accent-bg grid place-items-center mb-4">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-lg">{f.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{f.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Button asChild size="lg" className="gws-accent-bg hover:opacity-90">
          <Link to="/contact">Demander un devis</Link>
        </Button>
      </div>
    </div>
  );
}
