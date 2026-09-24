import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  FileText,
  Globe2,
  Inbox,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageSquareText,
  MousePointerClick,
  PanelsTopLeft,
  Palette,
  Phone,
  Plus,
  QrCode,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Wifi,
  Workflow,
} from "lucide-react";
import { contactInfo } from "@/lib/contact-info";
import { ProjectBriefForm } from "@/components/site/ProjectBriefForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Sites web qui génèrent des demandes" },
      {
        name: "description",
        content:
          "Sites web, outils métier et cartes NFC pour avis Google conçus en Guadeloupe. Réservations, paiements, automatisations et solutions sur mesure.",
      },
      {
        property: "og:title",
        content: "Gwada Web Studio — Transformez les visites en demandes claires",
      },
      {
        property: "og:description",
        content:
          "Sites sur mesure, réservations, paiements, catalogues et espaces d'administration. Basé en Guadeloupe, disponible à distance.",
      },
    ],
  }),
  component: HomePage,
});

const solutions = [
  {
    icon: CalendarDays,
    title: "Réservations",
    text: "Des créneaux clairs, des confirmations et moins d’allers-retours par message.",
    color: "var(--gws-turquoise)",
  },
  {
    icon: CreditCard,
    title: "Acomptes & paiements",
    text: "Encaissez au bon moment et donnez à vos clients un parcours simple et rassurant.",
    color: "var(--gws-coral)",
  },
  {
    icon: ShoppingBag,
    title: "Catalogues & commandes",
    text: "Présentez votre offre, facilitez la recherche et transformez l’intérêt en demande.",
    color: "var(--gws-yellow)",
  },
  {
    icon: LayoutDashboard,
    title: "Espaces d’administration",
    text: "Gérez horaires, contenus, photos, demandes et clients sans dépendre d’un développeur.",
    color: "var(--gws-blue)",
  },
  {
    icon: FileText,
    title: "Formulaires & documents",
    text: "Collectez les bonnes informations et évitez les dossiers incomplets.",
    color: "var(--gws-turquoise)",
  },
  {
    icon: PanelsTopLeft,
    title: "Espaces clients",
    text: "Regroupez suivis, documents et actions utiles dans un espace vraiment pratique.",
    color: "var(--gws-coral)",
  },
];

function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0d1715] pb-20 text-[#f7f7ef] sm:pb-0">
      <Hero />
      <SocialProofStrip />
      <Impact />
      <Solutions />
      <NfcCards />
      <ConcreteShowcase />
      <Approach />
      <About />
      <Faq />
      <Contact />
      <MobileLeadBar />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden border-b border-white/10">
      <div className="gws-grid absolute inset-0 -z-20 opacity-30" />
      <div className="absolute -left-48 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#54d7c8]/15 blur-[110px]" />
      <div className="absolute -right-48 bottom-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[#5b7cfa]/15 blur-[120px]" />

      <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-[1380px] items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:px-12 lg:py-20">
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/80">
            <Globe2 className="h-3.5 w-3.5 text-[#54d7c8]" />
            Guadeloupe · France · À distance
          </div>

          <h1 className="font-display text-[clamp(3.15rem,7vw,6.8rem)] font-black leading-[0.91] tracking-[-0.065em]">
            Transformez vos visites
            <span className="block text-[#54d7c8]">en demandes claires.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/68 sm:text-xl">
            Je conçois des sites et des outils web qui guident vos clients vers l’action : demander
            un devis, réserver, verser un acompte ou trouver la bonne offre.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="gws-button-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black uppercase tracking-[0.08em]"
            >
              Décrire mon projet <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#exemples"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.08]"
            >
              Voir ce que je construis
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
            {["Échange direct avec Louis", "Sur mesure", "Pensé mobile"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-[#54d7c8]" /> {item}
              </span>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[610px] lg:ml-auto">
      <div className="absolute -left-5 top-14 h-24 w-24 rounded-full bg-[#ff7c6c] blur-3xl opacity-25" />
      <div className="gws-float absolute -right-3 top-8 z-20 rounded-2xl bg-[#f2cb5d] px-4 py-3 text-[#0d1715] shadow-2xl sm:right-0">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider">
          <CircleCheck className="h-4 w-4" /> Acompte reçu
        </div>
      </div>

      <div className="relative mt-10 rounded-[2rem] border border-white/15 bg-[#101f1c]/95 p-3 shadow-[0_35px_90px_rgba(0,0,0,.38)] sm:p-5">
        <div className="mb-4 flex items-center justify-between px-2 py-1">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff7c6c]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f2cb5d]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#54d7c8]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
            Tableau de bord
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-2xl bg-[#172b27] p-4">
            <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-[#54d7c8] text-[#0d1715]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="space-y-2.5">
              {["Vue d’ensemble", "Réservations", "Clients", "Contenus"].map((item, i) => (
                <div
                  key={item}
                  className={`rounded-lg px-3 py-2 text-[11px] font-semibold ${
                    i === 0 ? "bg-white text-[#0d1715]" : "text-white/45"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#edf1eb] p-4 text-[#13201d] sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.15em] text-[#50605c]">
                  Aujourd’hui
                </div>
                <div className="mt-1 text-xl font-black tracking-tight">
                  Bonjour, tout est prêt.
                </div>
              </div>
              <div className="rounded-full bg-[#13201d] px-3 py-1.5 text-[9px] font-bold text-white">
                En ligne
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Metric value="12" label="réservations" accent="#54d7c8" />
              <Metric value="4" label="demandes" accent="#ff7c6c" />
            </div>

            <div className="mt-3 rounded-xl bg-white p-3 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-black">Prochains créneaux</span>
                <Clock3 className="h-3.5 w-3.5 text-[#5b7cfa]" />
              </div>
              {[
                "09:30 · Atelier découverte",
                "11:00 · Rendez-vous client",
                "14:30 · Groupe de 8",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-center gap-2 border-t border-[#dbe1dd] py-2 first:border-0"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: ["#54d7c8", "#5b7cfa", "#f2cb5d"][i] }}
                  />
                  <span className="text-[10px] font-semibold text-[#50605c]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="gws-float-delayed absolute -bottom-7 -left-2 z-20 w-[200px] rounded-2xl border border-white/10 bg-[#5b7cfa] p-4 text-white shadow-2xl sm:-left-7">
        <div className="flex items-center justify-between">
          <MessageSquareText className="h-4 w-4" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/60">
            Nouveau
          </span>
        </div>
        <p className="mt-5 text-sm font-black leading-tight">
          Une demande qualifiée, sans échange inutile.
        </p>
      </div>
    </div>
  );
}

function Metric({ value, label, accent }: { value: string; label: string; accent: string }) {
  return (
    <div className="rounded-xl bg-white p-3 shadow-sm">
      <div className="text-2xl font-black" style={{ color: accent }}>
        {value}
      </div>
      <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-[#66736f]">
        {label}
      </div>
    </div>
  );
}

function SocialProofStrip() {
  return (
    <section className="border-b border-white/10 bg-[#111d1a]">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-4 px-5 py-7 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <p className="max-w-xl text-sm font-semibold leading-relaxed text-white/65">
          Un site clair, une vraie logique métier et un parcours pensé pour faire avancer vos
          visiteurs au lieu de les laisser repartir.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Commerces", "Services", "Indépendants", "Projets à distance"].map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/45"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Impact() {
  const outcomes = [
    {
      icon: MousePointerClick,
      title: "Vos visiteurs savent quoi faire",
      text: "Chaque page conduit vers une action utile : demander, réserver, payer ou prendre contact.",
      color: "#54d7c8",
    },
    {
      icon: Inbox,
      title: "Vos demandes arrivent mieux cadrées",
      text: "Les bonnes questions sont posées avant le premier échange. Vous gagnez du temps dès le départ.",
      color: "#ff7c6c",
    },
    {
      icon: Workflow,
      title: "Votre quotidien devient plus simple",
      text: "Moins de copier-coller et d’allers-retours : les tâches répétitives passent dans un parcours clair.",
      color: "#5b7cfa",
    },
  ];

  return (
    <section id="impact" className="px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <SectionHeading
            eyebrow="Ce que le site change"
            title={
              <>
                Moins de friction. <span className="text-[#f2cb5d]">Plus d’actions utiles.</span>
              </>
            }
            text="Le design attire l’œil. Le parcours, lui, transforme cet intérêt en quelque chose de concret pour votre entreprise."
          />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-black text-[#54d7c8] lg:ml-auto"
            data-cta="impact-project"
          >
            Voir ce que mon projet peut automatiser <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-3">
          {outcomes.map((outcome) => (
            <article
              key={outcome.title}
              className="rounded-[1.6rem] border border-white/10 bg-[#13211e] p-6 sm:p-7"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-2xl text-[#0d1715]"
                style={{ backgroundColor: outcome.color }}
              >
                <outcome.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-8 text-xl font-black tracking-tight">{outcome.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{outcome.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="services" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <SectionHeading
          eyebrow="Ce que je construis"
          title={
            <>
              Un site utile, <span className="text-[#54d7c8]">concrètement.</span>
            </>
          }
          text="La bonne solution dépend de votre activité. On choisit les fonctions qui servent vraiment vos clients et votre équipe."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <article
              key={solution.title}
              className="group relative min-h-[250px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#13211e] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/25 sm:p-7"
            >
              <span className="absolute right-5 top-4 text-5xl font-black text-white/[0.035]">
                0{i + 1}
              </span>
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl text-[#0d1715]"
                style={{ backgroundColor: solution.color }}
              >
                <solution.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-12 text-xl font-black tracking-tight">{solution.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">{solution.text}</p>
              <ChevronRight className="absolute bottom-6 right-6 h-5 w-5 text-white/20 transition group-hover:translate-x-1 group-hover:text-white/60" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NfcCards() {
  const benefits = [
    { icon: Wifi, label: "NFC" },
    { icon: QrCode, label: "QR code" },
    { icon: ShieldCheck, label: "Garantie 1 an" },
    { icon: Check, label: "Sans abonnement" },
  ];

  const offers = [
    {
      name: "Standard",
      price: "29,90 €",
      accent: "#54d7c8",
      description: "Une carte prête à être posée dans votre commerce.",
      features: [
        "Carte NFC + QR code",
        "Accès direct à votre page d’avis Google",
        "Programmation et configuration incluses",
      ],
    },
    {
      name: "Personnalisée",
      price: "39,90 €",
      accent: "#ff7c6c",
      description: "La même simplicité, avec une carte adaptée à votre image.",
      features: [
        "Tout ce qui est inclus dans l’offre Standard",
        "Design personnalisé",
        "Logo et couleurs de votre entreprise",
      ],
    },
  ];

  return (
    <section
      id="cartes-nfc"
      className="border-y border-[#d8dfdb] bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-28 lg:px-12"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#101a18] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white">
              <Wifi className="h-3.5 w-3.5 text-[#54d7c8]" />
              Cartes NFC pour avis Google
            </div>

            <h2 className="mt-6 max-w-3xl font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
              Plus simple de demander un avis.
              <span className="block text-[#ef6f61]">Plus simple d’en laisser un.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5a6763] sm:text-lg">
              Vos clients approchent leur téléphone de la carte ou scannent le QR code. Leur page
              d’avis Google s’ouvre directement, sans recherche ni manipulation compliquée.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {benefits.map((benefit) => (
                <span
                  key={benefit.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d1d9d4] bg-white px-4 py-2 text-xs font-black shadow-sm"
                >
                  <benefit.icon className="h-4 w-4 text-[#167f74]" />
                  {benefit.label}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[640px] lg:ml-auto">
            <div className="absolute -left-5 top-10 h-32 w-32 rounded-full bg-[#54d7c8]/20 blur-3xl" />
            <div className="absolute -right-5 bottom-6 h-36 w-36 rounded-full bg-[#ff7c6c]/20 blur-3xl" />

            <div className="relative rotate-[-1.5deg] rounded-[2rem] border border-[#cbd4cf] bg-white p-4 shadow-[0_26px_70px_rgba(16,26,24,.16)] sm:p-6">
              <div className="overflow-hidden rounded-[1.6rem] bg-[#101a18] p-6 text-white sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#54d7c8]">
                      Votre commerce
                    </div>
                    <div className="mt-4 max-w-sm font-display text-3xl font-black leading-[0.95] tracking-[-0.04em] sm:text-4xl">
                      VOTRE AVIS EST IMPORTANT !
                    </div>
                  </div>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-white/[0.06]">
                    <Wifi className="h-5 w-5 text-[#54d7c8]" />
                  </div>
                </div>

                <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <div className="flex gap-1 text-[#f2cb5d]" aria-label="5 étoiles">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-white/60">
                      Approchez votre téléphone ou scannez le QR code pour laisser votre avis.
                    </p>
                  </div>

                  <div className="grid h-28 w-28 place-items-center rounded-2xl bg-white text-[#101a18] shadow-xl sm:h-32 sm:w-32">
                    <QrCode className="h-20 w-20 sm:h-24 sm:w-24" strokeWidth={1.4} />
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-center text-xs font-black sm:grid-cols-3">
                <div className="rounded-xl bg-[#e5f7f4] px-3 py-3 text-[#167f74]">1. Approchez</div>
                <div className="rounded-xl bg-[#fff1ee] px-3 py-3 text-[#b94f45]">2. Google s’ouvre</div>
                <div className="col-span-2 rounded-xl bg-[#f6efcf] px-3 py-3 text-[#806b1d] sm:col-span-1">
                  3. Laissez l’avis
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-7">
            <div className="text-xs font-black uppercase tracking-[0.16em] text-[#687570]">
              Deux versions, un seul fonctionnement
            </div>
            <h3 className="mt-2 font-display text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Choisissez simplement le niveau de personnalisation.
            </h3>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.name}
                className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_50px_rgba(27,46,40,.07)] sm:p-8 ${offer.name === "Personnalisée" ? "border-[#f0bbb5] bg-[#fff9f7]" : "border-[#d2dad5] bg-white"}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: offer.accent }}
                />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {offer.name === "Personnalisée" && (
                        <Palette className="h-4 w-4 text-[#ef6f61]" />
                      )}
                      <h4 className="text-xl font-black">{offer.name}</h4>
                      {offer.name === "Personnalisée" && (
                        <span className="rounded-full bg-[#ff7c6c]/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#b94f45]">
                          Design à votre image
                        </span>
                      )}
                    </div>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#65716d]">
                      {offer.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-left sm:text-right">
                    <div
                      className="text-4xl font-black tracking-[-0.05em]"
                      style={{ color: offer.accent }}
                    >
                      {offer.price}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#7b8783]">
                      paiement unique
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-3 border-t border-[#e2e7e4] pt-6">
                  {offer.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-[15px] font-semibold text-[#3d4b47]"
                    >
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                        style={{ backgroundColor: `${offer.accent}22`, color: offer.accent }}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 rounded-[1.7rem] bg-[#101a18] p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.15em] text-[#54d7c8]">
              Une carte pour votre commerce ?
            </div>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/60">
              Contactez-moi directement pour vérifier votre fiche Google et choisir la version qui
              vous convient.
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm font-bold sm:flex-row sm:gap-5">
              <a
                href={`mailto:${contactInfo.email}?subject=Carte%20NFC%20avis%20Google`}
                className="inline-flex items-center gap-2 text-white/75 transition hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#54d7c8]" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phoneHref}`}
                className="inline-flex items-center gap-2 text-white/75 transition hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#54d7c8]" />
                {contactInfo.phone}
              </a>
            </div>
          </div>
          <a
            href={`mailto:${contactInfo.email}?subject=Carte%20NFC%20avis%20Google`}
            className="gws-button-primary inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-6 text-sm font-black"
            data-cta="nfc-contact"
          >
            Me contacter <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ConcreteShowcase() {
  return (
    <section
      id="exemples"
      className="bg-[#edf1eb] px-5 py-24 text-[#101a18] sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-[1380px]">
        <SectionHeading
          dark
          eyebrow="Plus qu’une vitrine"
          title={
            <>
              Une expérience simple <span className="text-[#ef6f61]">des deux côtés.</span>
            </>
          }
          text="Vos clients vont à l’essentiel. Vous gardez la main sur ce qui fait tourner votre activité."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <ShowcaseCard
            className="lg:col-span-7 lg:row-span-2"
            tag="Côté client"
            title="Réserver sans attendre une réponse"
            color="#54d7c8"
          >
            <ReservationMockup />
          </ShowcaseCard>
          <ShowcaseCard
            className="lg:col-span-5"
            tag="Côté entreprise"
            title="Tout piloter au même endroit"
            color="#5b7cfa"
          >
            <AdminMockup />
          </ShowcaseCard>
          <ShowcaseCard
            className="lg:col-span-5"
            tag="Votre offre"
            title="Trouver le bon produit rapidement"
            color="#f2cb5d"
          >
            <CatalogueMockup />
          </ShowcaseCard>
        </div>

        <p className="mt-7 text-center text-xs font-semibold text-[#5a6763]">
          Interfaces illustratives — chaque projet est conçu autour de votre activité, pas à partir
          d’un modèle générique.
        </p>
      </div>
    </section>
  );
}

function ShowcaseCard({
  tag,
  title,
  color,
  className = "",
  children,
}: {
  tag: string;
  title: string;
  color: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className={`overflow-hidden rounded-[2rem] border border-[#cfd8d2] bg-white p-5 shadow-[0_18px_50px_rgba(27,46,40,.08)] sm:p-7 ${className}`}
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color }}>
            {tag}
          </span>
          <h3 className="mt-2 max-w-lg text-2xl font-black tracking-[-0.035em] sm:text-3xl">
            {title}
          </h3>
        </div>
        <span className="mt-1 h-4 w-4 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      </div>
      <div className="mt-7">{children}</div>
    </article>
  );
}

function ReservationMockup() {
  return (
    <div className="rounded-[1.5rem] bg-[#0f1d1a] p-4 text-white sm:p-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#54d7c8]">
            Votre réservation
          </div>
          <div className="mt-1 text-base font-black">Choisissez votre créneau</div>
        </div>
        <Smartphone className="h-5 w-5 text-white/35" />
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-2xl bg-white/[0.06] p-4">
          <div className="flex items-center justify-between text-xs font-bold">
            <span>Juillet 2026</span>
            <span className="text-white/35">Lun → Dim</span>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-[10px]">
            {Array.from({ length: 21 }, (_, i) => (
              <span
                key={i}
                className={`grid aspect-square place-items-center rounded-lg ${i === 11 ? "bg-[#54d7c8] font-black text-[#0d1715]" : i > 3 ? "bg-white/[0.05] text-white/65" : "text-white/20"}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {["09:30", "11:00", "14:30", "16:00"].map((time, i) => (
            <div
              key={time}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-xs font-bold ${i === 2 ? "bg-[#54d7c8] text-[#0d1715]" : "bg-white/[0.06] text-white/65"}`}
            >
              {time} {i === 2 && <Check className="h-3.5 w-3.5" />}
            </div>
          ))}
          <div className="mt-3 rounded-xl bg-[#ff7c6c] px-4 py-3 text-center text-xs font-black text-[#0d1715]">
            Continuer
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminMockup() {
  return (
    <div className="grid grid-cols-[82px_1fr] overflow-hidden rounded-2xl border border-[#dce3df] bg-[#f4f6f3]">
      <div className="bg-[#172521] p-3">
        <div className="mb-5 h-7 w-7 rounded-lg bg-[#5b7cfa]" />
        <div className="space-y-2">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`h-6 rounded-md ${n === 1 ? "bg-white/15" : "bg-white/[0.04]"}`}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-black">Activité</span>
          <Settings2 className="h-4 w-4 text-[#7a8883]" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-white p-3">
            <div className="text-lg font-black text-[#5b7cfa]">24</div>
            <div className="text-[8px] font-bold uppercase text-[#7a8883]">demandes</div>
          </div>
          <div className="rounded-xl bg-white p-3">
            <div className="text-lg font-black text-[#ef6f61]">8</div>
            <div className="text-[8px] font-bold uppercase text-[#7a8883]">à traiter</div>
          </div>
        </div>
        <div className="mt-2 rounded-xl bg-white p-3">
          {["Horaires mis à jour", "Nouvelle photo", "Demande confirmée"].map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-2 border-b border-[#e8ece9] py-1.5 text-[8px] font-semibold last:border-0"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ["#54d7c8", "#f2cb5d", "#5b7cfa"][i] }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CatalogueMockup() {
  return (
    <div className="rounded-2xl bg-[#f6f4ed] p-4">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[9px] font-semibold text-[#77817d] shadow-sm">
        <Search className="h-3.5 w-3.5" /> Rechercher dans le catalogue
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {["#54d7c8", "#ff7c6c", "#5b7cfa"].map((color, i) => (
          <div key={color} className="rounded-xl bg-white p-2 shadow-sm">
            <div
              className="h-12 rounded-lg"
              style={{ background: `linear-gradient(145deg, ${color}55, ${color})` }}
            />
            <div className="mt-2 h-1.5 w-4/5 rounded-full bg-[#1b2925]/15" />
            <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#1b2925]/8" />
            <div className="mt-3 text-[8px] font-black">Option {i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Approach() {
  const steps = [
    {
      number: "01",
      title: "On clarifie",
      text: "Votre activité, vos clients et ce qui vous fait perdre du temps aujourd’hui.",
    },
    {
      number: "02",
      title: "Je conçois",
      text: "Une direction visuelle et des parcours adaptés, sans modèle rebadgé.",
    },
    {
      number: "03",
      title: "On ajuste",
      text: "Vous testez, on affine, puis je vous montre comment garder la main.",
    },
    {
      number: "04",
      title: "On met en ligne",
      text: "Je vérifie les parcours sur ordinateur et mobile, puis votre site commence à travailler.",
    },
  ];

  return (
    <section id="methode" className="border-b border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Ma façon de travailler"
            title={
              <>
                Du sur-mesure, <span className="text-[#f2cb5d]">vraiment.</span>
              </>
            }
            text="Vous n’avez pas besoin de connaître le web. Vous connaissez votre métier ; je transforme vos besoins en une solution claire."
          />
          <div className="space-y-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 sm:grid-cols-[80px_1fr] sm:items-center sm:p-7"
              >
                <div className="text-4xl font-black text-[#ff7c6c]">{step.number}</div>
                <div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="a-propos" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="mx-auto grid max-w-[1380px] gap-10 rounded-[2.4rem] bg-[#ff7c6c] p-7 text-[#101a18] sm:p-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:p-16">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.18em]">
            Derrière Gwada Web Studio
          </div>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
            Je m’appelle Louis. Votre projet reste humain, du premier échange à la mise en ligne.
          </h2>
        </div>
        <div>
          <p className="text-base font-semibold leading-relaxed sm:text-lg">
            Vous échangez directement avec la personne qui comprend, conçoit et construit votre
            site. Pas de jargon inutile ni de projet qui se perd entre plusieurs interlocuteurs.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-black">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#101a18] text-white">
              <MapPin className="h-4 w-4" />
            </span>
            Basé en Guadeloupe · projets en France et à distance
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const questions = [
    {
      question: "Travaillez-vous seulement en Guadeloupe ?",
      answer:
        "Non. Gwada Web Studio est basé en Guadeloupe, mais le cadrage, les validations et le suivi peuvent se faire à distance pour des projets en France ou ailleurs.",
    },
    {
      question: "Dois-je déjà savoir exactement ce qu’il me faut ?",
      answer:
        "Non. Vous connaissez votre activité et vos difficultés. Mon rôle est de transformer cela en parcours, fonctionnalités et priorités compréhensibles.",
    },
    {
      question: "Pourrai-je modifier mon site moi-même ?",
      answer:
        "Oui lorsque le projet le nécessite. Je peux prévoir une administration pour gérer les contenus, photos, horaires, réservations ou demandes sans toucher au code.",
    },
    {
      question: "Combien coûte un projet ?",
      answer:
        "Le prix dépend surtout des parcours et fonctions à construire. Après le premier échange, le périmètre, les livrables et le prix sont posés clairement dans un devis avant de commencer.",
    },
    {
      question: "Pouvez-vous reprendre un site qui existe déjà ?",
      answer:
        "Oui. Je commence par vérifier ce qui peut être conservé, ce qui freine les visiteurs et ce qu’il faut réellement reconstruire.",
    },
  ];

  return (
    <section
      id="questions"
      className="border-b border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.78fr_1.22fr]">
        <div>
          <SectionHeading
            eyebrow="Avant de démarrer"
            title={
              <>
                Les questions qui <span className="text-[#54d7c8]">reviennent souvent.</span>
              </>
            }
            text="Le but du premier échange est justement de rendre le projet plus simple et plus clair."
          />
          <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-bold text-white/55">
            <ShieldCheck className="h-4 w-4 text-[#54d7c8]" /> Premier échange sans engagement
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((item) => (
            <details
              key={item.question}
              className="group rounded-[1.35rem] border border-white/10 bg-white/[0.025] p-5 open:border-white/20 open:bg-white/[0.045] sm:p-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-black sm:text-lg">
                {item.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-white/55 transition group-open:rotate-45 group-open:bg-[#54d7c8] group-open:text-[#0d1715]">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-4 max-w-2xl pr-10 text-sm leading-relaxed text-white/55">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="absolute inset-x-0 bottom-0 h-[42rem] bg-[radial-gradient(circle_at_35%_100%,rgba(84,215,200,.15),transparent_62%)]" />
      <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#54d7c8] text-[#0d1715]">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="mt-7 max-w-2xl font-display text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl">
            Faisons avancer votre projet.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            En quelques lignes, expliquez-moi votre activité et votre objectif. Je vous réponds
            personnellement avec une première direction utile.
          </p>

          <div className="mt-9 max-w-lg space-y-6">
            {[
              [
                "01",
                "Vous décrivez le besoin",
                "Le formulaire pose uniquement les questions utiles.",
              ],
              ["02", "Je regarde votre situation", "Votre demande est lue directement par Louis."],
              [
                "03",
                "On choisit la suite",
                "Orientation, échange ou démonstration selon le projet.",
              ],
            ].map(([number, title, text]) => (
              <div key={number} className="gws-proof-line grid grid-cols-[34px_1fr] gap-4">
                <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-[#172b27] text-[10px] font-black text-[#54d7c8]">
                  {number}
                </span>
                <div>
                  <h3 className="text-sm font-black">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/45">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-white"
            >
              <Mail className="h-4 w-4 text-[#54d7c8]" /> {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phoneHref}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-white/55 transition hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#54d7c8]" /> {contactInfo.phone}
            </a>
          </div>
        </div>

        <ProjectBriefForm />
      </div>
    </section>
  );
}

function MobileLeadBar() {
  const [visible, setVisible] = useState(false);
  const [nfcVisible, setNfcVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 620);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    const nfcSection = document.getElementById("cartes-nfc");
    const observer = nfcSection
      ? new IntersectionObserver(
          ([entry]) => setNfcVisible(entry?.isIntersecting ?? false),
          { threshold: 0.08 },
        )
      : null;

    if (nfcSection && observer) observer.observe(nfcSection);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  const showBar = visible && !nfcVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0d1715]/95 p-3 backdrop-blur-xl transition-transform duration-300 sm:hidden ${showBar ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
      aria-hidden={!showBar}
    >
      <a
        href="#contact"
        className="gws-button-primary flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black"
        data-cta="mobile-sticky-project"
      >
        Décrire mon projet <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      <div
        className={`text-xs font-black uppercase tracking-[0.18em] ${dark ? "text-[#53635e]" : "text-white/45"}`}
      >
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
        {title}
      </h2>
      <p
        className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${dark ? "text-[#5a6763]" : "text-white/58"}`}
      >
        {text}
      </p>
    </div>
  );
}
