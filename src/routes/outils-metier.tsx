import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Bell,
  Check,
  CircleCheck,
  Clock3,
  FileText,
  LayoutDashboard,
  PanelsTopLeft,
  Settings2,
  UserRound,
  UsersRound,
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
] as const;

const demoModes = [
  {
    id: "admin",
    label: "Administration",
    icon: LayoutDashboard,
    accent: "#5b7cfa",
    title: "Voir l’essentiel sans fouiller partout",
    text: "Demandes, réservations ou contenus sont regroupés dans une interface pensée pour votre façon de travailler.",
  },
  {
    id: "automation",
    label: "Automatisation",
    icon: Workflow,
    accent: "#f2cb5d",
    title: "Une action déclenche automatiquement la suivante",
    text: "Un formulaire reçu peut envoyer une confirmation, créer une tâche et prévenir la bonne personne sans intervention manuelle.",
  },
  {
    id: "client",
    label: "Espace client",
    icon: UserRound,
    accent: "#ff7c6c",
    title: "Donner à chaque client un espace clair",
    text: "Documents, suivi, prochaines étapes et échanges utiles restent accessibles au même endroit.",
  },
  {
    id: "form",
    label: "Formulaire",
    icon: FileText,
    accent: "#54d7c8",
    title: "Recevoir directement les bonnes informations",
    text: "Le formulaire s’adapte à votre activité pour éviter les dossiers incomplets et les allers-retours inutiles.",
  },
] as const;

type DemoMode = (typeof demoModes)[number];

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
              Derrière la partie visible par vos clients, des outils peuvent simplifier votre
              quotidien : administration, formulaires, automatisations ou espaces privés.
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
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                Voir les possibilités
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
                className="min-h-[245px] rounded-[1.7rem] border border-white/10 bg-[#13211e] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 sm:p-7"
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-2xl text-[#0d1715]"
                  style={{ backgroundColor: item.accent }}
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-7 text-xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/52">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <InteractiveToolDemo />

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Pas besoin d’un logiciel énorme
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              On construit seulement ce qui vous manque.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              L’outil peut être très simple : une vue interne, un formulaire mieux pensé ou une
              automatisation ciblée. Il évolue seulement si votre activité en a besoin.
            </p>
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

function InteractiveToolDemo() {
  const [activeId, setActiveId] = useState<DemoMode["id"]>("admin");
  const active = demoModes.find((mode) => mode.id === activeId) ?? demoModes[0];

  return (
    <section className="border-y border-[#d8dfdb] bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#66736e]">
              À quoi ça ressemble concrètement ?
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Pas seulement un site.
              <span className="block text-[#516fe0]">Un outil qui travaille avec vous.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#5f6b67]">
              Choisissez un exemple pour voir comment une fonction peut s’intégrer à votre quotidien.
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
                    className={`grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${selected ? "border-[#bac5eb] bg-white shadow-[0_10px_30px_rgba(34,53,87,.08)]" : "border-[#d6ddd9] bg-white/45 hover:border-[#b9c4be]"}`}
                  >
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl text-[#101a18]"
                      style={{ backgroundColor: mode.accent }}
                    >
                      <mode.icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-black">{mode.label}</span>
                      <span className="mt-0.5 block text-[11px] text-[#6b7773]">
                        {mode.title}
                      </span>
                    </span>
                    <ArrowRight
                      className={`h-4 w-4 transition ${selected ? "text-[#101a18]" : "-translate-x-1 text-[#9aa49f]"}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-[2rem] border border-[#d5ddd8] bg-white shadow-[0_28px_70px_rgba(27,46,40,.12)]">
              <div className="flex items-center justify-between border-b border-[#e0e6e2] px-5 py-4">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#7b8682]">
                    Espace interne
                  </div>
                  <div className="mt-1 text-sm font-black">Votre entreprise</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[#eef1ef]">
                    <Bell className="h-3.5 w-3.5 text-[#5d6965]" />
                  </span>
                  <span className="h-8 w-8 rounded-full bg-[#5b7cfa]" />
                </div>
              </div>

              <div className="bg-[#eef2ef] p-4 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#76827d]">
                      Exemple · {active.label}
                    </div>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                      {active.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#65716d]">
                      {active.text}
                    </p>
                  </div>
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: active.accent }}
                  />
                </div>

                <ToolDemoScreen mode={active} />
              </div>
            </div>

            <p className="mt-4 text-center text-xs font-semibold text-[#78837f]">
              Exemple illustratif — l’outil final est construit autour de votre propre organisation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolDemoScreen({ mode }: { mode: DemoMode }) {
  if (mode.id === "automation") {
    const steps = [
      ["1", "Nouvelle demande reçue", "Le formulaire est envoyé.", "#54d7c8"],
      ["2", "Confirmation automatique", "Le client reçoit immédiatement un message.", "#f2cb5d"],
      ["3", "Tâche créée", "La demande apparaît dans votre suivi interne.", "#5b7cfa"],
      ["4", "Bonne personne prévenue", "L’information arrive au bon interlocuteur.", "#ff7c6c"],
    ];

    return (
      <div className="space-y-3">
        {steps.map(([number, title, text, color], index) => (
          <div key={number} className="relative flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black"
              style={{ backgroundColor: color }}
            >
              {number}
            </span>
            <div className="min-w-0">
              <div className="text-sm font-black">{title}</div>
              <p className="mt-1 text-xs leading-relaxed text-[#687570]">{text}</p>
            </div>
            {index < steps.length - 1 && (
              <span className="absolute -bottom-3 left-[33px] h-3 w-px bg-[#cbd5cf]" />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (mode.id === "client") {
    return (
      <div className="grid gap-4 md:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-2xl bg-[#101a18] p-5 text-white">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-white/35">
            Bonjour Marie
          </div>
          <div className="mt-2 text-xl font-black">Votre projet avance.</div>
          <div className="mt-6 space-y-3">
            {[
              ["Brief reçu", true],
              ["Proposition validée", true],
              ["Mise en ligne", false],
            ].map(([label, done]) => (
              <div key={label as string} className="flex items-center gap-3 text-sm font-bold">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full ${done ? "bg-[#54d7c8] text-[#101a18]" : "border border-white/20 text-white/35"}`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
                </span>
                <span className={done ? "text-white" : "text-white/45"}>{label as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-black">Documents</div>
            <FileText className="h-5 w-5 text-[#ff7c6c]" />
          </div>
          <div className="mt-4 space-y-2">
            {["Devis signé.pdf", "Brief projet.pdf", "Facture acompte.pdf"].map((file, index) => (
              <div
                key={file}
                className="flex items-center justify-between rounded-xl border border-[#e2e7e4] px-4 py-3 text-xs font-bold"
              >
                <span>{file}</span>
                <span className="text-[#7a8581]">{index === 0 ? "Validé" : "Disponible"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (mode.id === "form") {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#77827e]">
              Nouvelle demande
            </div>
            <div className="mt-1 text-lg font-black">Informations essentielles</div>
          </div>
          <FileText className="h-5 w-5 text-[#238e82]" />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Type de demande", "Création de site"],
            ["Budget estimé", "2 000 – 4 000 €"],
            ["Échéance", "Sous 6 semaines"],
            ["Priorité", "Moyenne"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[#f1f4f2] p-4">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#85908c]">
                {label}
              </div>
              <div className="mt-2 text-sm font-black">{value}</div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl bg-[#e3f7f3] p-4">
          <div className="flex items-center gap-2 text-xs font-black text-[#167f74]">
            <CircleCheck className="h-4 w-4" />
            Toutes les informations nécessaires sont présentes
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        ["Demandes", "12", "+3 aujourd’hui", "#5b7cfa"],
        ["À traiter", "4", "2 urgentes", "#ff7c6c"],
        ["Clients", "38", "+5 ce mois", "#54d7c8"],
      ].map(([label, value, note, color]) => (
        <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-[10px] font-black uppercase tracking-wider text-[#7e8985]">
            {label}
          </div>
          <div className="mt-2 text-3xl font-black">{value}</div>
          <div className="mt-3 text-xs font-bold" style={{ color }}>
            {note}
          </div>
        </div>
      ))}

      <div className="sm:col-span-2 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="font-black">Dernières demandes</div>
          <UsersRound className="h-5 w-5 text-[#5b7cfa]" />
        </div>
        <div className="mt-4 space-y-2">
          {[
            ["Atelier Horizon", "Réservation", "Nouveau"],
            ["Villa Caraïbes", "Demande de devis", "À traiter"],
            ["Studio Créatif", "Modification", "En cours"],
          ].map(([name, type, status], index) => (
            <div
              key={name}
              className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-[#e2e7e4] px-4 py-3"
            >
              <div>
                <div className="text-xs font-black">{name}</div>
                <div className="mt-0.5 text-[11px] text-[#74807b]">{type}</div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${index === 0 ? "bg-[#e5f7f4] text-[#167f74]" : index === 1 ? "bg-[#fff0ee] text-[#b94f45]" : "bg-[#edf0fb] text-[#516fe0]"}`}
              >
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-[#101a18] p-5 text-white shadow-sm">
        <div className="text-[10px] font-black uppercase tracking-wider text-white/35">
          Aujourd’hui
        </div>
        <div className="mt-4 text-4xl font-black">4</div>
        <div className="mt-1 text-xs text-white/45">actions à effectuer</div>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-2/3 rounded-full bg-[#5b7cfa]" />
        </div>
      </div>
    </div>
  );
}
