import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Globe2,
  LayoutDashboard,
  Sparkles,
  Wifi,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Sites web, outils métier & cartes NFC" },
      {
        name: "description",
        content:
          "Gwada Web Studio crée des sites web, outils métier et cartes NFC pour les entreprises en Guadeloupe. Des solutions utiles, sur mesure et simples à utiliser.",
      },
      {
        property: "og:title",
        content: "Gwada Web Studio — Sites web, outils métier & cartes NFC",
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
    text: "Du site vitrine simple au parcours complet avec réservation, paiement, catalogue ou prise de contact.",
    bullets: ["Site vitrine", "Réservation", "Paiement", "Catalogue"],
    href: "/sites-web",
    accent: "#54d7c8",
  },
  {
    icon: LayoutDashboard,
    number: "02",
    eyebrow: "Votre quotidien",
    title: "Outils métier",
    text: "Des interfaces et automatisations pour gérer plus facilement vos demandes, clients, documents et contenus.",
    bullets: ["Administration", "Formulaires", "Espaces clients", "Automatisations"],
    href: "/outils-metier",
    accent: "#5b7cfa",
  },
  {
    icon: Wifi,
    number: "03",
    eyebrow: "Vos avis Google",
    title: "Cartes NFC",
    text: "Une carte physique à poser dans votre commerce pour permettre à vos clients de laisser un avis en quelques secondes.",
    bullets: ["NFC + QR", "Dès 29,90 €", "Sans abonnement", "Configuration incluse"],
    href: "/cartes-nfc",
    accent: "#ff7c6c",
  },
] as const;

function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0d1715] text-[#f7f7ef]">
      <Hero />
      <Offers />
      <NfcPreview />
      <WhyGws />
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

function Offers() {
  return (
    <section id="solutions" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="max-w-3xl">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
            Trois grandes solutions
          </div>
          <h2 className="mt-4 font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Allez directement vers
            <span className="block text-[#f2cb5d]">ce qui vous intéresse.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
            Chaque univers a maintenant sa propre page. Vous pouvez comprendre l’essentiel ici puis
            entrer dans le détail uniquement si le service vous concerne.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {offers.map((offer) => (
            <Link
              key={offer.title}
              to={offer.href}
              className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#13211e] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-8"
            >
              <span className="absolute right-6 top-4 font-display text-6xl font-black text-white/[0.035]">
                {offer.number}
              </span>

              <span
                className="grid h-12 w-12 place-items-center rounded-2xl text-[#0d1715]"
                style={{ backgroundColor: offer.accent }}
              >
                <offer.icon className="h-5 w-5" />
              </span>

              <div className="mt-9 text-[10px] font-black uppercase tracking-[0.16em] text-white/40">
                {offer.eyebrow}
              </div>
              <h3 className="mt-2 text-3xl font-black tracking-[-0.04em]">{offer.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55">{offer.text}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {offer.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-bold text-white/55"
                  >
                    {bullet}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-2 pt-8 text-sm font-black" style={{ color: offer.accent }}>
                Découvrir <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NfcPreview() {
  return (
    <section className="bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#101a18] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            <Wifi className="h-3.5 w-3.5 text-[#54d7c8]" />
            Nouveau · Cartes NFC
          </div>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Facilitez les avis Google en quelques secondes.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5d6965] sm:text-lg">
            Une carte posée sur votre comptoir. Le client approche son téléphone ou scanne le QR
            code, et votre page d’avis Google s’ouvre directement.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {["Standard 29,90 €", "Personnalisée 39,90 €", "Sans abonnement"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#d1d9d4] bg-white px-4 py-2 text-xs font-black"
              >
                {item}
              </span>
            ))}
          </div>

          <Link
            to="/cartes-nfc"
            className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#167f74]"
          >
            Voir les cartes NFC <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <figure className="mx-auto w-full max-w-[650px] lg:ml-auto">
          <div className="overflow-hidden rounded-[2rem] border border-[#cbd4cf] bg-white p-2 shadow-[0_26px_70px_rgba(16,26,24,.14)] sm:p-3">
            <img
              src="/carte-nfc-google-avis.webp"
              alt="Carte NFC Gwada Web Studio pour laisser un avis Google"
              className="block h-auto w-full rounded-[1.55rem]"
            />
          </div>
          <figcaption className="mt-3 text-center text-xs font-semibold text-[#6b7773]">
            Exemple réel de la carte standard · emplacement QR configuré pour votre commerce
          </figcaption>
        </figure>
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
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <article key={point.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.025] p-6 sm:p-7">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#54d7c8] text-[#0d1715]">
                <point.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-7 text-xl font-black">{point.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-24 pt-6 sm:px-8 sm:pb-28 lg:px-12">
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
