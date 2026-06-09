import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DemoBanner } from "@/components/showroom/DemoBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATALOGUE } from "@/components/demos/catalogue/data";
import { Thumb } from "./catalogue";
import { MessageCircle, Mail, ArrowLeft } from "lucide-react";
import { whatsappUrl } from "@/lib/contact-info";
import { toast } from "sonner";

export const Route = createFileRoute("/catalogue/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.id} — Catalogue Gwada Web Studio` },
      { name: "description", content: "Fiche détaillée du catalogue de démonstration." },
    ],
  }),
  component: ItemPage,
});

function ItemPage() {
  const { id } = Route.useParams();
  const item = CATALOGUE.find((c) => c.id === id);
  if (!item) throw notFound();

  const similar = CATALOGUE.filter((c) => c.category === item.category && c.id !== item.id).slice(0, 3);

  return (
    <div>
      <DemoBanner note="Fiche détaillée — catalogue de démonstration." />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/catalogue" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Retour au catalogue
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border">
              <Thumb seed={item.seed} />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-square rounded-lg overflow-hidden border border-border">
                  <Thumb seed={item.seed + i * 3} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest gws-accent-text font-semibold">{item.category}</div>
            <h1 className="mt-2 text-3xl sm:text-4xl font-display font-bold tracking-tight">{item.title}</h1>
            {item.badge && (
              <span className="inline-block mt-3 px-2.5 py-1 rounded-full text-xs font-semibold border border-border">
                {item.badge}
              </span>
            )}
            <div className="mt-5 text-3xl font-display font-bold gws-accent-text">{item.price}</div>
            <p className="mt-5 text-muted-foreground">{item.description}</p>

            <Card className="mt-6 p-5 gws-themed">
              <h3 className="font-semibold mb-3">Caractéristiques</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                {item.specs.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs text-muted-foreground">{s.label}</dt>
                    <dd className="font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => toast.success("Demande envoyée (démo).")} className="gws-accent-bg hover:opacity-90">
                <Mail className="mr-2 h-4 w-4" /> Demander des informations
              </Button>
              <Button variant="outline" asChild>
                <a href={whatsappUrl(`Bonjour, je suis intéressé par ${item.title}.`)}>
                  <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-6">Articles similaires</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {similar.map((s) => (
                <Link key={s.id} to="/catalogue/$id" params={{ id: s.id }}>
                  <Card className="overflow-hidden hover:-translate-y-1 transition gws-themed p-0">
                    <div className="aspect-[4/3]"><Thumb seed={s.seed} /></div>
                    <div className="p-4">
                      <div className="font-display font-semibold">{s.title}</div>
                      <div className="text-sm gws-accent-text mt-1">{s.price}</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
