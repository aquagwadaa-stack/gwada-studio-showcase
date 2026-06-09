import { createFileRoute } from "@tanstack/react-router";
import { DemoBanner } from "@/components/showroom/DemoBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MessageCircle,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Sparkles,
  ShieldCheck,
  Heart,
} from "lucide-react";
import { whatsappUrl } from "@/lib/contact-info";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/vitrine")({
  head: () => ({
    meta: [
      { title: "Démo Vitrine — Gwada Web Studio" },
      { name: "description", content: "Démonstration d'un site vitrine généraliste." },
    ],
  }),
  component: VitrinePage,
});

function VitrinePage() {
  return (
    <div className="gws-themed">
      <DemoBanner note="Site vitrine : présentation, services, avis, contact." />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gws-surface" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-card mb-6">
            <Sparkles className="h-3.5 w-3.5 gws-accent-text" /> Votre entreprise
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-bold tracking-tight">
            Bienvenue chez <span className="gws-accent-text gws-display-grad">Votre Entreprise</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
            Depuis plus de 15 ans, nous accompagnons nos clients avec passion, savoir-faire et exigence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button size="lg" className="gws-accent-bg hover:opacity-90">Nous découvrir</Button>
            <Button size="lg" variant="outline">Nous contacter</Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest gws-accent-text font-semibold mb-3">À propos</div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Une équipe à votre écoute.</h2>
            <p className="mt-4 text-muted-foreground">
              Nous croyons qu'un service de qualité commence par une vraie écoute. Chaque demande est étudiée
              avec soin pour vous offrir une réponse adaptée et durable.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { v: "15+", l: "années d'expérience" },
                { v: "1200", l: "clients satisfaits" },
                { v: "4.9/5", l: "note moyenne" },
              ].map((x) => (
                <div key={x.l} className="rounded-xl border border-border p-4">
                  <div className="text-2xl font-display font-bold gws-accent-text">{x.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{x.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl gws-surface border border-border overflow-hidden grid place-items-center">
            <ImagePlaceholder seed={1} label="Notre équipe" />
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-center">Nos services</h2>
          <p className="mt-3 text-muted-foreground text-center max-w-xl mx-auto">Trois piliers pour répondre à toutes vos demandes.</p>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, title: "Service A", desc: "Une prestation complète conçue pour vos besoins essentiels." },
              { icon: Heart, title: "Service B", desc: "Un accompagnement personnalisé qui s'adapte à votre rythme." },
              { icon: Sparkles, title: "Service C", desc: "Une offre premium pour aller plus loin et viser l'excellence." },
            ].map((s) => (
              <Card key={s.title} className="p-6 gws-themed hover:gws-accent-border transition">
                <div className="h-11 w-11 rounded-lg gws-accent-bg grid place-items-center mb-4">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Galerie</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-xl border border-border overflow-hidden hover:scale-[1.02] transition">
                <ImagePlaceholder seed={i + 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-center">Avis clients</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { name: "Marie L.", text: "Service impeccable, je recommande vivement. Très professionnels.", stars: 5 },
              { name: "Thomas D.", text: "Une équipe à l'écoute et un résultat à la hauteur de mes attentes.", stars: 5 },
              { name: "Sophie M.", text: "Excellent accueil, prestations de qualité. Reviendrai sans hésiter.", stars: 5 },
            ].map((a) => (
              <Card key={a.name} className="p-6 gws-themed">
                <div className="flex gap-1 gws-accent-text mb-3">
                  {Array.from({ length: a.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground italic">« {a.text} »</p>
                <div className="text-sm font-medium mt-4">{a.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8">
          <Card className="p-6 gws-themed">
            <h3 className="font-display text-2xl font-semibold mb-4">Nous trouver</h3>
            <div className="aspect-video rounded-lg overflow-hidden relative border border-border bg-muted">
              <div className="absolute inset-0" style={{
                backgroundImage: "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }} />
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center text-center">
                  <MapPin className="h-10 w-10 gws-accent-text" />
                  <div className="mt-2 font-medium">10 rue de l'Exemple</div>
                  <div className="text-sm text-muted-foreground">97110 Pointe-à-Pitre</div>
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 gws-accent-text" />Lun-Ven : 9h–18h</div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 gws-accent-text" />Sam : 10h–16h</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 gws-accent-text" />+590 690 00 00 00</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 gws-accent-text" />contact@votre-entreprise.fr</div>
            </div>
          </Card>

          <ContactForm />
        </div>
      </section>

      <a
        href={whatsappUrl("Bonjour, je viens du site.")}
        className="fixed z-40 bottom-24 right-5 h-14 w-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-2xl hover:scale-105 transition"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

function ContactForm() {
  return (
    <Card className="p-6 gws-themed">
      <h3 className="font-display text-2xl font-semibold mb-4">Contactez-nous</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Message envoyé (démonstration).");
        }}
        className="space-y-3"
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <Label htmlFor="n">Nom</Label>
            <Input id="n" required placeholder="Votre nom" />
          </div>
          <div>
            <Label htmlFor="e">E-mail</Label>
            <Input id="e" type="email" required placeholder="vous@exemple.fr" />
          </div>
        </div>
        <div>
          <Label htmlFor="m">Message</Label>
          <Textarea id="m" required rows={4} placeholder="Votre message..." />
        </div>
        <Button type="submit" className="w-full gws-accent-bg hover:opacity-90">Envoyer</Button>
      </form>
    </Card>
  );
}

function ImagePlaceholder({ seed, label }: { seed: number; label?: string }) {
  const hues = [200, 30, 280, 330, 160, 50, 220, 0, 100];
  const h = hues[seed % hues.length];
  return (
    <div
      className="w-full h-full relative grid place-items-center"
      style={{
        background: `linear-gradient(135deg, hsl(${h} 70% 75%), hsl(${(h + 40) % 360} 60% 60%))`,
      }}
    >
      {label && <span className="text-white font-display text-lg drop-shadow">{label}</span>}
    </div>
  );
}
