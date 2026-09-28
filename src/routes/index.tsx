import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Check,
  Globe2,
  LayoutDashboard,
  Quote,
  Sparkles,
  Star,
  Wifi,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Création de sites & outils web en Guadeloupe" },
      {
        name: "description",
        content:
          "Gwada Web Studio crée des sites web, outils métier et cartes NFC pour les entreprises en Guadeloupe. Des solutions utiles, sur mesure et simples à utiliser.",
      },
      {
        property: "og:title",
        content: "Gwada Web Studio — Création de sites & outils web en Guadeloupe",
      },
      {
        property: "og:description",
        content:
          "Sites vitrine, réservations, paiements, espaces d’administration, automatisations et cartes NFC pour avis Google.",
      },
    ],
  }),
  component: HomePage,
});

const offers = [
  {
    icon: Globe2,
    number: "01",
    eyebrow: "Votre présence en ligne",
    title: "Sites web",
    text: "Du site vitrine clair au parcours complet avec réservation, paiement, catalogue ou prise de contact.",
    bullets: ["Vitrine", "Réservation", "Paiement"],
    href: "/sites-web",
    accent: "#54d7c8",
    note: "Pensé autour de votre activité",
  },
  {
    icon: LayoutDashboard,
    number: "02",
    eyebrow: "Votre quotidien",
    title: "Outils métier",
    text: "Des interfaces et automatisations pour mieux gérer vos demandes, clients, documents et tâches répétitives.",
    bullets: ["Administration", "Automatisations", "Espaces clients"],
    href: "/outils-metier",
    accent: "#5b7cfa",
    note: "Construit selon votre fonctionnement",
  },
  {
    icon: Wifi,
    number: "03",
    eyebrow: "Vos avis Google",
    title: "Cartes NFC",
    text: "Facilitez les avis Google en quelques secondes : NFC ou QR code, puis la page d’avis s’ouvre directement.",
    bullets: ["NFC + QR", "Standard 29,90 €", "Personnalisée 39,90 €"],
    href: "/cartes-nfc",
    accent: "#ff7c6c",
    note: "Sans abonnement",
  },
] as const;

function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0d1715] text-[#f7f7ef]">
      <Hero />
      <WhyGws />
      <CustomerReviews />
      <Offers />
      <FinalCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="gws-grid absolute inset-0 -z-20 opacity-30" />
      <div className="absolute -left-48 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#54d7c8]/15 blur-[110px]" />
      <div className="absolute -right-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-[#5b7cfa]/15 blur-[120px]" />

      <div className="mx-auto flex min-h-[72svh] max-w-[1380px] items-center px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/65 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#54d7c8]" />
            Solutions digitales · Guadeloupe
          </div>

          <h1 className="mt-7 font-display text-[clamp(3.1rem,7vw,6.7rem)] font-black leading-[0.9] tracking-[-0.065em]">
            Sites web.
            <span className="block text-[#54d7c8]">Outils métier.</span>
            <span className="block text-[#ff7c6c]">Cartes NFC.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/65 sm:text-xl">
            Des solutions simples et sur mesure pour aider les entreprises à être mieux présentées,
            mieux organisées et plus faciles à contacter.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#solutions"
              className="gws-button-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
            >
              Voir les solutions <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.06]"
            >
              Parler de mon projet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyGws() {
  const points = [
    {
      icon: Check,
      title: "Sur mesure",
      text: "Le projet part de votre activité et de vos besoins, pas d’un modèle imposé.",
    },
    {
      icon: Workflow,
      title: "Utile au quotidien",
      text: "Le design compte, mais chaque fonction doit surtout servir un objectif concret.",
    },
    {
      icon: Sparkles,
      title: "Un seul interlocuteur",
      text: "Vous échangez directement avec la personne qui conçoit et construit votre solution.",
    },
  ];

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-3 md:grid-cols-3">
          {points.map((point) => (
            <article
              key={point.title}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5 sm:p-6"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#54d7c8] text-[#0d1715]">
                <point.icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-6 text-lg font-black">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


const customerReviews = [
  {
    name: "Jean-Jacques Aubry",
    initial: "J",
    accent: "#54d7c8",
    siteUrl: "https://docaubry.fr/",
    siteLabel: "docaubry.fr",
    text:
      "J’ai confié la création de mon site professionnel à Gwada Web Studio et le résultat est tout à fait conforme à ce que j’attendais. Les échanges ont été simples et efficaces, avec une bonne compréhension des besoins liés à mon activité. Je suis très satisfait du travail réalisé et du sérieux dont il a fait preuve.",
  },
  {
    name: "Appart Courbaril",
    initial: "A",
    accent: "#8b5cf6",
    siteUrl: "https://crystalbeachcourbaril.fr/",
    siteLabel: "crystalbeachcourbaril.fr",
    text:
      "J’ai fait appel à Gwada Web Studio pour la création du site internet de mon appartement, et je suis vraiment très contente du résultat ! Il a été à l’écoute de mes attentes, très professionnel et a su parfaitement s’adapter à mon activité et à ses spécificités. Le site correspond tout à fait à ce que je souhaitais, et je suis ravie du résultat. Un grand merci pour son travail et son sérieux, je recommande sans hésiter !",
  },
] as const;

function CustomerReviews() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="border-y border-white/8 bg-[#101d1a] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Ils nous ont fait confiance
            </div>
            <h2 className="mt-3 font-display text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Des retours clients concrets.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 text-[#f2cb5d]" aria-label="5 étoiles sur 5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
              ))}
            </div>
            <span className="text-sm font-black text-white">5/5</span>
            <span className="text-xs font-semibold text-white/35">2 avis</span>
          </div>
        </div>

        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0">
          {customerReviews.map((review, index) => {
            const isExpanded = expanded === index;
            return (
              <article
                key={review.name}
                className="min-w-[86vw] snap-center rounded-[1.7rem] border border-white/10 bg-[#13211e] p-5 sm:min-w-0 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-black text-[#0d1715]"
                      style={{ backgroundColor: review.accent }}
                    >
                      {review.initial}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-black sm:text-base">{review.name}</div>
                      <div className="mt-1 flex gap-0.5 text-[#f2cb5d]">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <Star key={starIndex} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <Quote className="h-8 w-8 shrink-0 text-white/10" strokeWidth={1.6} />
                </div>

                <p
                  className={`mt-5 text-sm leading-relaxed text-white/62 ${isExpanded ? "" : "line-clamp-4"}`}
                >
                  {review.text}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={review.siteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3.5 py-2 text-[11px] font-black text-white/65 transition hover:border-white/25 hover:bg-white/[0.07] hover:text-white"
                    aria-label={`Voir le site ${review.siteLabel}`}
                  >
                    Voir le site
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : index)}
                    className="text-xs font-black text-[#54d7c8] transition hover:text-white"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "Réduire" : "Lire l’avis"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-3 text-center text-[11px] font-semibold text-white/30 sm:hidden">
          Faites glisser pour voir le deuxième avis
        </p>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section id="solutions" className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
            Trois grandes solutions
          </div>
          <h2 className="mt-4 font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Allez directement vers
            <span className="block text-[#f2cb5d]">ce qui vous intéresse.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            Choisissez le besoin qui correspond à votre activité. Chaque bloc mène vers une page
            dédiée, avec des exemples beaucoup plus concrets.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {offers.map((offer) => (
            <Link
              key={offer.title}
              to={offer.href}
              className="group relative flex min-h-[285px] flex-col overflow-hidden rounded-[1.65rem] border border-white/10 bg-[#13211e] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#162823] hover:shadow-[0_22px_60px_rgba(0,0,0,.2)] sm:p-6"
            >
              <span
                className="absolute inset-x-0 top-0 h-1 opacity-80 transition-opacity group-hover:opacity-100"
                style={{ backgroundColor: offer.accent }}
              />

              <div className="flex items-center justify-between gap-4">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl text-[#0d1715]"
                  style={{ backgroundColor: offer.accent }}
                >
                  <offer.icon className="h-5 w-5" />
                </span>

                <div className="flex items-center gap-3">
                  <span className="font-display text-sm font-black text-white/20">
                    {offer.number}
                  </span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.035] transition group-hover:border-white/25 group-hover:bg-white/[0.08]">
                    <ArrowRight className="h-4 w-4 text-white/45 transition group-hover:translate-x-0.5 group-hover:text-white" />
                  </span>
                </div>
              </div>

              <div className="mt-6 text-[10px] font-black uppercase tracking-[0.16em] text-white/38">
                {offer.eyebrow}
              </div>
              <h3 className="mt-2 text-2xl font-black tracking-[-0.04em]">{offer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{offer.text}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {offer.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    className="rounded-full border border-white/10 bg-white/[0.025] px-3 py-1.5 text-[10px] font-bold text-white/55"
                  >
                    {bullet}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                <span className="text-[11px] font-bold text-white/35">{offer.note}</span>
                <span className="text-xs font-black" style={{ color: offer.accent }}>
                  Découvrir
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-20 pt-3 sm:px-8 sm:pb-24 lg:px-12">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-7 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d1715] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] opacity-60">
            Vous avez une idée ?
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-[-0.045em] sm:text-5xl">
            Expliquez-moi simplement ce que vous aimeriez améliorer.
          </h2>
        </div>
        <Link
          to="/contact"
          className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#0d1715] px-7 text-sm font-black text-white"
        >
          Me contacter <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
