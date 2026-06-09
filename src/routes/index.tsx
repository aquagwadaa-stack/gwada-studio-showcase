import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Layers3,
  MousePointer2,
  Palette,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiveShowcase } from "@/components/showroom/LiveShowcase";
import { useShowroom } from "@/context/showroom-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Imaginez votre futur site" },
      {
        name: "description",
        content:
          "Composez un site vitrine, une réservation, un catalogue ou une boutique et visualisez le résultat instantanément.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { openConfig } = useShowroom();

  return (
    <div>
      <Hero onConfigure={openConfig} />
      <LiveShowcase />
      <ProofSection />
      <FinalCta onConfigure={openConfig} />
    </div>
  );
}

function Hero({ onConfigure }: { onConfigure: () => void }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-[#080b12]">
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 15% 15%, color-mix(in srgb, var(--gws-accent) 42%, transparent), transparent 32%), radial-gradient(circle at 85% 80%, #4438ca55, transparent 35%)",
        }}
      />
      <div className="absolute inset-0 z-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:54px_54px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 text-white sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/75 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-[var(--gws-accent)]" />
            Showroom interactif · Gwada Web Studio
          </div>
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Ne choisissez pas un modèle.
            <span className="mt-2 block text-[var(--gws-accent)]">Composez votre site.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
            Présentation, réservation, catalogue et vente en ligne peuvent vivre dans un seul site.
            Combinez vos besoins, changez l'univers et comparez plusieurs directions visuelles en
            direct.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() =>
                document.getElementById("apercu")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full gws-accent-bg px-6 hover:opacity-90"
            >
              Composer ma démonstration <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onConfigure}
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Configuration rapide
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/55">
            {["Combinaisons libres", "6 directions graphiques", "Pensé pour le mobile"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-[var(--gws-accent)]" /> {item}
                </span>
              ),
            )}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const cards = [
    {
      icon: Layers3,
      title: "Fonctions",
      value: "Vitrine + réservation",
      className: "left-0 top-8",
    },
    {
      icon: Palette,
      title: "Direction",
      value: "Éditorial & premium",
      className: "right-0 top-36",
    },
    {
      icon: Smartphone,
      title: "Expérience",
      value: "Mobile en priorité",
      className: "left-8 bottom-2",
    },
  ];

  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[520px]">
      <div className="absolute left-1/2 top-1/2 h-[360px] w-[245px] -translate-x-1/2 -translate-y-1/2 rotate-3 overflow-hidden rounded-[2.4rem] border-[7px] border-white/10 bg-white shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=700&q=85"
          alt=""
          className="h-52 w-full object-cover"
        />
        <div className="p-5 text-[#17191f]">
          <div className="text-[9px] font-semibold uppercase tracking-widest text-orange-600">
            Casa Manguier
          </div>
          <div className="mt-2 text-2xl font-bold leading-none">Le goût des îles.</div>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100" />
          <div className="mt-2 h-2 w-3/4 rounded-full bg-slate-100" />
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="h-16 rounded-xl bg-orange-100" />
            <div className="h-16 rounded-xl bg-teal-100" />
          </div>
          <div className="mt-4 rounded-full bg-orange-500 py-2 text-center text-[9px] font-bold text-white">
            Réserver une table
          </div>
        </div>
      </div>
      {cards.map((card) => (
        <div
          key={card.title}
          className={`absolute ${card.className} z-10 w-[190px] rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl`}
        >
          <card.icon className="h-4 w-4 text-[var(--gws-accent)]" />
          <div className="mt-4 text-[10px] uppercase tracking-wider text-white/45">
            {card.title}
          </div>
          <div className="mt-1 text-xs font-semibold text-white">{card.value}</div>
        </div>
      ))}
      <MousePointer2 className="absolute bottom-16 right-20 z-20 h-7 w-7 -rotate-12 fill-white text-white drop-shadow-xl" />
    </div>
  );
}

function ProofSection() {
  const points = [
    {
      number: "01",
      title: "On part de votre objectif",
      text: "Être trouvé, recevoir des demandes, réserver, présenter une gamme ou vendre : la structure suit votre activité.",
    },
    {
      number: "02",
      title: "On construit une vraie identité",
      text: "Les couleurs ne suffisent pas. Typographies, rythme, images, formes et ton changent réellement d'un univers à l'autre.",
    },
    {
      number: "03",
      title: "On soigne le parcours",
      text: "Chaque écran guide le visiteur vers une action utile, avec une expérience rapide et claire sur téléphone.",
    },
  ];

  return (
    <section className="border-y border-border/60 bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] gws-accent-text">
              Au-delà de la démonstration
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-5xl">
              Le bon site n'est jamais générique.
            </h2>
            <p className="mt-5 max-w-lg text-muted-foreground">
              Ce showroom montre les possibilités. Votre site final, lui, sera construit autour de
              votre entreprise, de vos clients et de vos objectifs.
            </p>
          </div>
          <div className="grid gap-3">
            {points.map((point) => (
              <article
                key={point.number}
                className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-[54px_1fr]"
              >
                <div className="font-display text-2xl font-bold gws-accent-text">
                  {point.number}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta({ onConfigure }: { onConfigure: () => void }) {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0a0d14] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            background:
              "radial-gradient(circle at 20% 10%, var(--gws-accent), transparent 34%), radial-gradient(circle at 85% 90%, #4338ca, transparent 32%)",
          }}
        />
        <div className="relative">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Votre projet
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Maintenant, imaginez cette qualité avec votre nom, vos images et votre offre.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            Gwada Web Studio transforme cette base en une expérience unique, adaptée à votre
            activité et à vos clients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-full gws-accent-bg px-6 hover:opacity-90">
              <Link to="/contact">
                Discuter de mon projet <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onConfigure}
              className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              Modifier la composition
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
