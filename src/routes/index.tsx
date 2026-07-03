import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  CreditCard,
  FileText,
  LayoutDashboard,
  Mail,
  MapPin,
  MessageSquareText,
  PanelsTopLeft,
  Search,
  Settings2,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { contactInfo } from "@/lib/contact-info";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Sites web utiles en Guadeloupe" },
      {
        name: "description",
        content:
          "Sites web et outils métier sur mesure en Guadeloupe : réservation, paiement, catalogue, espace client et administration.",
      },
      { property: "og:title", content: "Gwada Web Studio — Des sites qui travaillent avec vous" },
      {
        property: "og:description",
        content:
          "Je conçois des sites modernes et des outils utiles pour les entreprises en Guadeloupe.",
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
    <div className="overflow-hidden bg-[#0d1715] text-[#f7f7ef]">
      <Hero />
      <SocialProofStrip />
      <Solutions />
      <ConcreteShowcase />
      <Approach />
      <About />
      <Contact />
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
            <MapPin className="h-3.5 w-3.5 text-[#54d7c8]" />
            Création web en Guadeloupe
          </div>

          <h1 className="font-display text-[clamp(3.15rem,7vw,6.8rem)] font-black leading-[0.91] tracking-[-0.065em]">
            Votre site peut faire
            <span className="block text-[#54d7c8]">plus qu’être joli.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/68 sm:text-xl">
            Je conçois des sites et des outils web qui facilitent vraiment votre activité :
            réserver, encaisser, présenter, organiser et gagner du temps.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="gws-button-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black uppercase tracking-[0.08em]"
            >
              Parler de mon projet <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#exemples"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.03] px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.08]"
            >
              Voir ce que je construis
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/55">
            {["Sur mesure", "Pensé mobile", "Sans jargon"].map((item) => (
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
          Pas de promesse magique. Un site clair, une vraie logique métier et un outil que vous
          pouvez utiliser au quotidien.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Entreprises locales", "Indépendants", "Commerces", "Services"].map((item) => (
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
            Je m’appelle Louis. Je crée ici, pour les entreprises d’ici.
          </h2>
        </div>
        <div>
          <p className="text-base font-semibold leading-relaxed sm:text-lg">
            Mon travail, ce n’est pas d’ajouter un site de plus sur internet. C’est de comprendre
            votre quotidien et de construire l’outil qui vous aidera vraiment.
          </p>
          <div className="mt-6 flex items-center gap-3 text-sm font-black">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#101a18] text-white">
              <MapPin className="h-4 w-4" />
            </span>
            Guadeloupe · accompagnement direct
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const mailto = `mailto:${contactInfo.email}?subject=${encodeURIComponent("Mon projet — Gwada Web Studio")}&body=${encodeURIComponent("Bonjour Louis,\n\nMon activité :\n\nCe que j’aimerais améliorer :\n\nLe meilleur moyen de me recontacter :\n")}`;

  return (
    <section
      id="contact"
      className="relative border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_50%_100%,rgba(84,215,200,.16),transparent_65%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#54d7c8] text-[#0d1715]">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="mt-7 font-display text-5xl font-black leading-[0.95] tracking-[-0.055em] sm:text-7xl">
          Une idée ?<br />
          Parlons-en simplement.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          Expliquez-moi votre activité et ce que vous aimeriez améliorer. Je vous répondrai avec une
          première orientation claire.
        </p>
        <a
          href={mailto}
          className="gws-button-primary mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-8 text-sm font-black uppercase tracking-[0.08em]"
        >
          Écrire à Louis <ArrowRight className="h-4 w-4" />
        </a>
        <div className="mt-5 text-sm font-semibold text-white/45">{contactInfo.email}</div>
      </div>
    </section>
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
