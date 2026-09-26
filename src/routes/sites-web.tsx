import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CreditCard,
  Globe2,
  MessageSquareText,
  ShoppingBag,
  Smartphone,
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
];

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
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white"
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
                className="rounded-[1.8rem] border border-white/10 bg-[#13211e] p-6 sm:p-8"
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
