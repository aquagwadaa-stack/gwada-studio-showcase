import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileText,
  LayoutDashboard,
  PanelsTopLeft,
  Settings2,
  UserRound,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/outils-metier")({
  head: () => ({
    meta: [
      { title: "Outils métier & automatisations — Gwada Web Studio" },
      {
        name: "description",
        content:
          "Espaces d’administration, formulaires, automatisations, tableaux de bord et espaces clients conçus sur mesure pour votre activité.",
      },
    ],
  }),
  component: OutilsMetierPage,
});

const tools = [
  {
    icon: LayoutDashboard,
    title: "Administration",
    text: "Modifier vos contenus, horaires, demandes ou données depuis une interface claire sans toucher au code.",
    accent: "#5b7cfa",
  },
  {
    icon: FileText,
    title: "Formulaires intelligents",
    text: "Collecter les bonnes informations dès le départ et éviter les échanges inutiles ou dossiers incomplets.",
    accent: "#54d7c8",
  },
  {
    icon: UserRound,
    title: "Espaces clients",
    text: "Regrouper documents, suivis, demandes et actions utiles dans un espace accessible à vos clients.",
    accent: "#ff7c6c",
  },
  {
    icon: Workflow,
    title: "Automatisations",
    text: "Faire disparaître une partie des tâches répétitives : confirmations, notifications, classement ou transmission.",
    accent: "#f2cb5d",
  },
  {
    icon: PanelsTopLeft,
    title: "Tableaux de bord",
    text: "Voir rapidement ce qui demande votre attention : demandes, réservations, clients, contenus ou activité.",
    accent: "#54d7c8",
  },
  {
    icon: Settings2,
    title: "Outils internes",
    text: "Créer un outil spécifique à votre façon de travailler lorsqu’un logiciel générique ne correspond pas à votre besoin.",
    accent: "#5b7cfa",
  },
];

function OutilsMetierPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="gws-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto max-w-[1380px]">
          <div className="max-w-4xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#5b7cfa]">
              Outils métier
            </div>
            <h1 className="mt-5 font-display text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Votre site peut aussi
              <span className="block text-[#5b7cfa]">vous faire gagner du temps.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
              Derrière la partie visible par vos clients, je peux construire les outils dont vous
              avez besoin pour mieux gérer votre activité : administration, formulaires,
              automatisations ou espaces privés.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="gws-button-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
              >
                Expliquer mon besoin <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#outils"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white"
              >
                Voir les exemples
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="outils" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Ce qu’on peut construire
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Les fonctions utiles restent
              <span className="block text-[#54d7c8]">invisibles jusqu’au moment où elles servent.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((item) => (
              <article
                key={item.title}
                className="min-h-[270px] rounded-[1.8rem] border border-white/10 bg-[#13211e] p-6 sm:p-7"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl text-[#0d1715]"
                  style={{ backgroundColor: item.accent }}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/52">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#65716d]">
              Exemple très concret
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Moins de messages à traiter manuellement.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5d6965]">
              Un client remplit sa demande sur votre site. Les informations arrivent déjà
              structurées. Vous voyez ce qui est urgent, ce qui manque et ce qui peut être traité,
              sans reprendre chaque détail par téléphone ou message.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#101a18] p-5 text-white sm:p-7">
            {[
              ["Avant", "Messages dispersés", "Informations incomplètes, copier-coller et relances."],
              ["Après", "Demandes structurées", "Les bonnes données arrivent au bon endroit."],
              ["Ensuite", "Suivi simple", "Vous gardez une vue claire sur ce qui reste à faire."],
            ].map(([tag, title, text], index) => (
              <div
                key={tag}
                className="grid grid-cols-[70px_1fr] gap-4 border-b border-white/10 py-5 first:pt-0 last:border-0 last:pb-0"
              >
                <span className={`text-xs font-black uppercase tracking-wider ${index === 0 ? "text-[#ff7c6c]" : index === 1 ? "text-[#54d7c8]" : "text-[#f2cb5d]"}`}>
                  {tag}
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
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Pas besoin d’un logiciel énorme
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              On construit seulement ce qui vous manque.
            </h2>
          </div>
          <div className="space-y-3">
            {[
              "Adapté à votre façon de travailler",
              "Utilisable sur téléphone si nécessaire",
              "Peut être relié à votre site public",
              "Peut évoluer avec votre activité",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold"
              >
                <Check className="h-4 w-4 text-[#5b7cfa]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-7 rounded-[2rem] bg-[#5b7cfa] p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] text-white/60">
              Votre quotidien
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-[-0.045em] sm:text-5xl">
              Dites-moi simplement ce qui vous fait perdre du temps aujourd’hui.
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
