import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CircleCheck,
  CreditCard,
  Globe2,
  Search,
  ShoppingBag,
} from "lucide-react";

export const Route = createFileRoute("/sites-web")({
  head: () => ({
    meta: [
      { title: "Sites web sur mesure — Gwada Web Studio" },
      {
        name: "description",
        content:
          "Sites vitrine, réservation, paiement, catalogue et prise de contact : des sites web conçus autour de votre activité en Guadeloupe.",
      },
    ],
  }),
  component: SitesWebPage,
});

const possibilities = [
  {
    icon: Globe2,
    title: "Site vitrine",
    text: "Présenter clairement votre activité, vos services, vos horaires, vos coordonnées et ce qui vous différencie.",
    accent: "#54d7c8",
  },
  {
    icon: CalendarDays,
    title: "Réservation",
    text: "Permettre à vos clients de choisir un créneau sans passer par une succession de messages.",
    accent: "#5b7cfa",
  },
  {
    icon: CreditCard,
    title: "Paiement & acompte",
    text: "Encaisser au bon moment et rendre le parcours plus simple pour vous comme pour vos clients.",
    accent: "#ff7c6c",
  },
  {
    icon: ShoppingBag,
    title: "Catalogue & commande",
    text: "Présenter vos produits ou prestations de façon structurée et guider rapidement vers la bonne offre.",
    accent: "#f2cb5d",
  },
] as const;

const demoModes = [
  {
    id: "vitrine",
    label: "Vitrine",
    title: "Présenter votre activité clairement",
    text: "Une première page qui explique en quelques secondes ce que vous faites, pour qui et comment vous contacter.",
    icon: Globe2,
    accent: "#54d7c8",
  },
  {
    id: "reservation",
    label: "Réservation",
    title: "Laisser le client choisir son créneau",
    text: "Le visiteur consulte les disponibilités et avance sans attendre une réponse par message.",
    icon: CalendarDays,
    accent: "#5b7cfa",
  },
  {
    id: "paiement",
    label: "Paiement",
    title: "Encaisser directement au bon moment",
    text: "Acompte, paiement complet ou validation : le parcours reste clair jusqu’à la confirmation.",
    icon: CreditCard,
    accent: "#ff7c6c",
  },
  {
    id: "catalogue",
    label: "Catalogue",
    title: "Aider le client à trouver la bonne offre",
    text: "Produits ou prestations sont rangés, filtrables et immédiatement compréhensibles.",
    icon: ShoppingBag,
    accent: "#f2cb5d",
  },
] as const;

type DemoMode = (typeof demoModes)[number];

function SitesWebPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="gws-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1380px]">
          <div className="max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#54d7c8]">
              Sites web
            </div>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Un site qui présente bien votre activité.
              <span className="block text-[#54d7c8]">Et qui sert vraiment à quelque chose.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
              Le site peut rester très simple ou intégrer des fonctions plus avancées. L’objectif
              est toujours le même : permettre à vos visiteurs de comprendre rapidement votre offre
              et de passer à l’action.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="gws-button-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
              >
                Parler de mon site <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#possibilites"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                Voir les possibilités
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="possibilites" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Selon votre activité
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Le bon site n’a pas besoin
              <span className="block text-[#f2cb5d]">d’avoir toutes les fonctions.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/55 sm:text-lg">
              On choisit uniquement ce qui facilite réellement le parcours de vos clients.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {possibilities.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.8rem] border border-white/10 bg-[#13211e] p-6 transition hover:border-white/20 sm:p-8"
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl text-[#0d1715]"
                  style={{ backgroundColor: item.accent }}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.035em]">{item.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/52">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InteractiveWebsiteDemo />

      <section className="bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#65716d]">
              Le parcours
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Le visiteur doit toujours savoir quoi faire ensuite.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5d6965]">
              Un joli site qui ne mène nulle part ne suffit pas. Chaque page doit conduire
              naturellement vers une demande, une réservation, un paiement ou un contact.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#101a18] p-5 text-white sm:p-7">
            {[
              ["01", "Comprendre", "Votre offre est claire dès les premières secondes."],
              ["02", "Choisir", "Le client trouve rapidement le service ou produit qui lui correspond."],
              ["03", "Agir", "Il peut réserver, demander, payer ou vous contacter sans friction."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="grid grid-cols-[42px_1fr] gap-4 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#54d7c8] text-xs font-black text-[#101a18]">
                  {number}
                </span>
                <div>
                  <div className="font-black">{title}</div>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-2">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Toujours sur mesure
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Vous pouvez commencer simple.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              Un site peut être une vitrine claire aujourd’hui puis évoluer plus tard avec de la
              réservation, un espace client ou une administration si votre activité en a besoin.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Design adapté à votre identité",
              "Pensé ordinateur et mobile",
              "Structure claire pour vos visiteurs",
              "Fonctions ajoutées uniquement si elles sont utiles",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold"
              >
                <Check className="h-4 w-4 text-[#54d7c8]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-7 rounded-[2rem] bg-[#54d7c8] p-7 text-[#101a18] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] opacity-60">
              Votre projet
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-[-0.045em] sm:text-5xl">
              Vous avez déjà un site ou vous partez de zéro ?
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
    </div>
  );
}

function InteractiveWebsiteDemo() {
  const [activeId, setActiveId] = useState<DemoMode["id"]>("vitrine");
  const active = demoModes.find((mode) => mode.id === activeId) ?? demoModes[0];

  return (
    <section className="border-y border-white/10 bg-[#101d1a] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Visualisez la différence
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Le site change selon
              <span className="block text-[#54d7c8]">ce que vous voulez lui faire faire.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/52">
              Cliquez sur un besoin pour voir un exemple simplifié du parcours correspondant.
            </p>

            <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {demoModes.map((mode) => {
                const selected = active.id === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveId(mode.id)}
                    aria-pressed={selected}
                    className={`grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${selected ? "border-white/25 bg-white/[0.08]" : "border-white/8 bg-white/[0.025] hover:border-white/18"}`}
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-[#101a18]"
                      style={{ backgroundColor: mode.accent }}
                    >
                      <mode.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-black">{mode.label}</span>
                      <span className="mt-0.5 block text-[11px] text-white/40">{mode.title}</span>
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition ${selected ? "translate-x-0 text-white" : "-translate-x-1 text-white/20"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[#0d1715] shadow-[0_28px_80px_rgba(0,0,0,.28)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff7c6c]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f2cb5d]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#54d7c8]" />
                </div>
                <div className="rounded-full bg-white/[0.06] px-4 py-1.5 text-[10px] font-bold text-white/35">
                  votreentreprise.fr
                </div>
                <span className="w-12" />
              </div>

              <div className="bg-[#edf1eb] p-4 text-[#101a18] sm:p-7">
                <div className="mb-5 flex flex-col gap-3 border-b border-[#d4ddd8] pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#697671]">
                      Exemple · {active.label}
                    </div>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] sm:text-3xl">
                      {active.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#61706b]">
                      {active.text}
                    </p>
                  </div>
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: active.accent }}
                  />
                </div>

                <DemoScreen mode={active} />
              </div>
            </div>

            <p className="mt-4 text-center text-xs font-semibold text-white/32">
              Démonstration illustrative — le design final est adapté à votre activité et à votre identité.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoScreen({ mode }: { mode: DemoMode }) {
  if (mode.id === "reservation") {
    return (
      <div className="grid gap-4 md:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-black">Choisissez une date</div>
            <CalendarDays className="h-5 w-5 text-[#5b7cfa]" />
          </div>
          <div className="mt-5 grid grid-cols-7 gap-2 text-center text-[10px] font-bold">
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                className={`grid aspect-square place-items-center rounded-lg ${i === 16 ? "bg-[#5b7cfa] text-white" : "bg-[#eef1ef] text-[#6c7773]"}`}
              >
                {i + 1}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#101a18] p-5 text-white">
          <div className="text-xs font-black uppercase tracking-wider text-white/35">
            Créneaux disponibles
          </div>
          <div className="mt-4 space-y-2">
            {["09:30", "11:00", "14:30", "16:00"].map((time, index) => (
              <div
                key={time}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold ${index === 2 ? "bg-[#5b7cfa]" : "bg-white/[0.06] text-white/65"}`}
              >
                {time}
                {index === 2 && <Check className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode.id === "paiement") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between border-b border-[#e0e6e2] pb-5">
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-[#74817c]">
              Votre réservation
            </div>
            <div className="mt-1 text-xl font-black">Atelier découverte</div>
          </div>
          <CircleCheck className="h-6 w-6 text-[#54a998]" />
        </div>
        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between text-[#697671]">
            <span>2 personnes</span>
            <span>60,00 €</span>
          </div>
          <div className="flex justify-between text-[#697671]">
            <span>Acompte demandé</span>
            <span>20,00 €</span>
          </div>
          <div className="flex justify-between border-t border-[#e0e6e2] pt-4 text-lg font-black">
            <span>À régler maintenant</span>
            <span className="text-[#ef6f61]">20,00 €</span>
          </div>
        </div>
        <div className="mt-6 flex min-h-12 items-center justify-center rounded-xl bg-[#ff7c6c] text-sm font-black">
          Payer l’acompte
        </div>
      </div>
    );
  }

  if (mode.id === "catalogue") {
    return (
      <div>
        <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm text-[#77817d] shadow-sm">
          <Search className="h-4 w-4" />
          Rechercher un produit ou une prestation
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ["Option 01", "#54d7c8"],
            ["Option 02", "#ff7c6c"],
            ["Option 03", "#5b7cfa"],
            ["Option 04", "#f2cb5d"],
            ["Option 05", "#54d7c8"],
            ["Option 06", "#ff7c6c"],
          ].map(([label, color]) => (
            <div key={label} className="rounded-2xl bg-white p-3 shadow-sm">
              <div
                className="aspect-[4/3] rounded-xl"
                style={{ background: `linear-gradient(145deg, ${color}55, ${color})` }}
              />
              <div className="mt-3 text-sm font-black">{label}</div>
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-[#101a18]/10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#e2e7e4] px-5 py-4">
        <div className="text-sm font-black">Votre entreprise</div>
        <div className="hidden gap-4 text-[11px] font-bold text-[#71807b] sm:flex">
          <span>Services</span>
          <span>À propos</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="grid gap-6 p-5 sm:grid-cols-[1.1fr_.9fr] sm:p-7">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#238e82]">
            Votre promesse principale
          </div>
          <div className="mt-3 max-w-md text-3xl font-black leading-[0.98] tracking-[-0.04em]">
            Expliquez immédiatement pourquoi vos clients doivent vous choisir.
          </div>
          <div className="mt-4 max-w-sm text-sm leading-relaxed text-[#65716d]">
            Une phrase claire, quelques preuves utiles et une action évidente.
          </div>
          <div className="mt-5 inline-flex rounded-full bg-[#101a18] px-5 py-3 text-xs font-black text-white">
            Nous contacter
          </div>
        </div>
        <div className="min-h-48 rounded-2xl bg-[linear-gradient(145deg,#d9f4ef,#54d7c8)] p-5">
          <div className="ml-auto h-10 w-24 rounded-full bg-white/55" />
          <div className="mt-14 h-3 w-4/5 rounded-full bg-white/70" />
          <div className="mt-3 h-3 w-2/3 rounded-full bg-white/55" />
          <div className="mt-8 h-12 rounded-xl bg-[#101a18]/90" />
        </div>
      </div>
    </div>
  );
}
