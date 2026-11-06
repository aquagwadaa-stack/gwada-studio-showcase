import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  Bot,
  FileCheck,
  FolderSearch,
  ListChecks,
  MailCheck,
} from "lucide-react";
import { ApercuParcours } from "@/components/site/ApercuService";
import { FaqSection } from "@/components/site/FaqSection";
import { reveal, rise } from "@/components/site/Motion";
import { BrowserFrame } from "@/components/site/SitePreview";
import { memoRevision } from "@/lib/realisations";
import { pageHead } from "@/lib/seo";

const title = "Automatisation et IA pour les entreprises en Guadeloupe";
const description =
  "Réponses automatiques, relances, tri des demandes, documents, assistant IA sur votre site : je mets en place ce qui vous fait gagner du temps, sur devis.";

export const Route = createFileRoute("/automatisation-ia")({
  staticData: { sitemap: true },
  head: () =>
    pageHead({
      path: "/automatisation-ia",
      title,
      description,
      nom: "Automatisation et IA",
      service: { name: "Automatisation et IA pour les entreprises" },
    }),
  component: AutomatisationPage,
});

const exemples = [
  {
    icon: MailCheck,
    title: "Réponses automatiques",
    text: "Une demande arrive, et votre client reçoit tout de suite une confirmation claire.",
    accent: "#54d7c8",
  },
  {
    icon: BellRing,
    title: "Relances et rappels",
    text: "Rendez-vous à venir, devis sans réponse, acompte à régler : le rappel part au bon moment.",
    accent: "#f2cb5d",
  },
  {
    icon: ListChecks,
    title: "Tri des demandes",
    text: "Chaque demande est classée et arrive à la bonne personne, avec les bonnes informations.",
    accent: "#a3a8ff",
  },
  {
    icon: FileCheck,
    title: "Documents préparés",
    text: "Devis, fiches ou comptes rendus se remplissent à partir de vos données.",
    accent: "#ffae96",
  },
  {
    icon: Bot,
    title: "Assistant IA sur votre site",
    text: "Il répond aux questions fréquentes à partir de vos informations, et vous passe la main quand il le faut.",
    accent: "#54d7c8",
  },
  {
    icon: FolderSearch,
    title: "Recherche dans vos documents",
    text: "Une IA retrouve une information dans vos fichiers, sans que vous ayez à tout rouvrir.",
    accent: "#f2cb5d",
  },
];

const etapes = [
  {
    title: "On repère ce qui vous prend du temps",
    text: "Vous me dites ce que vous refaites chaque jour ou chaque semaine.",
  },
  {
    title: "Je commence par le plus utile",
    text: "Une première automatisation simple, sur la tâche qui vous fera gagner le plus de temps.",
  },
  {
    title: "Vous gardez la main",
    text: "Vous voyez ce qui se passe, vous validez, et on ajuste si besoin.",
  },
];

const garanties = [
  {
    title: "Vos données",
    text: "Je collecte le strict nécessaire, et je vous dis quels services sont utilisés avant de les mettre en place.",
  },
  {
    title: "Une personne garde la main",
    text: "Une IA peut se tromper. Là où c’est important, une personne valide avant l’envoi.",
  },
  {
    title: "Pas de coût caché",
    text: "Les services externes sont facturés à leur prix réel, sans marge, et annoncés dans le devis.",
  },
];

const questions = [
  {
    question: "Est-ce réservé aux grandes entreprises ?",
    answer:
      "Non. Une petite automatisation peut déjà aider : une confirmation, une relance ou un tableau tenu à jour tout seul.",
  },
  {
    question: "Peut-on l’ajouter à mon site actuel ?",
    answer: "Souvent, oui. Je regarde votre site et je vous dis ce qui est possible.",
  },
  {
    question: "L’IA peut-elle se tromper ?",
    answer:
      "Oui. C’est pour cela qu’elle s’appuie sur vos informations, et qu’une personne garde la main sur ce qui est important.",
  },
  {
    question: "Et mes données ?",
    answer:
      "Je collecte le strict nécessaire, et je vous dis quels services sont utilisés avant de les mettre en place.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "Cela dépend de ce qu’il faut mettre en place. Vous recevez un devis clair, avec les services externes à leur prix réel.",
  },
];

function AutomatisationPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div>
            <h1 className="gws-rise font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">
              Moins de tâches répétitives, plus de temps pour vos clients.
            </h1>
            <p
              className="gws-rise mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:text-[17px]"
              {...rise(1)}
            >
              Confirmations, relances, tri des demandes, documents à préparer : ce qui se répète
              peut souvent se faire tout seul. Et quand l’IA est vraiment utile, je l’ajoute là où
              elle vous fait gagner du temps.
            </p>
            <p className="gws-rise mt-4 text-sm font-bold text-white/85" {...rise(2)}>
              Sur devis. Démonstration gratuite, sans engagement.
            </p>
            <div className="gws-rise mt-7 flex flex-col gap-3 sm:flex-row" {...rise(3)}>
              <Link
                to="/contact"
                className="gws-button-primary inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
                data-cta="automatisation-contact"
              >
                Expliquer mon besoin <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#exemples"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                Voir des exemples
              </a>
            </div>
          </div>
          <ApercuParcours />
        </div>
      </section>

      <section id="exemples" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2
            {...reveal()}
            className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          >
            Ce qu’on peut mettre en place
          </h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {exemples.map((item, index) => (
              <article
                key={item.title}
                {...reveal(index % 3)}
                className="rounded-3xl border border-white/10 bg-[#13211e] p-6"
              >
                <span
                  className="grid h-10 w-10 place-items-center rounded-xl text-[#0d1715]"
                  style={{ backgroundColor: item.accent }}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f3eb] px-5 py-16 text-[#152820] sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2
            {...reveal()}
            className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          >
            Comment je m’y prends
          </h2>
          <ol className="mt-9 grid gap-x-8 gap-y-7 md:grid-cols-3">
            {etapes.map((etape, index) => (
              <li key={etape.title} {...reveal(index)} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1c6358] text-sm font-black text-white">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-base font-extrabold leading-snug tracking-[-0.01em]">
                    {etape.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a5d56]">{etape.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
          <a
            {...reveal("zoom")}
            href={memoRevision.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-2xl"
            aria-label={`Ouvrir ${memoRevision.name} dans un nouvel onglet`}
            data-cta="automatisation-memo-revision"
          >
            <BrowserFrame
              image={memoRevision.image}
              pageLongue={memoRevision.pageLongue}
              alt={memoRevision.alt}
              address={memoRevision.address}
              sizes="(min-width: 1024px) 700px, 100vw"
            />
          </a>
          <div {...reveal(1)}>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
              L’IA en vrai : {memoRevision.name}
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/68 sm:text-base">
              C’est mon application. L’IA y transforme les cours des étudiants en médecine en QCM
              corrigés et en examens blancs.
            </p>
            <a
              href={memoRevision.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold transition hover:border-white/45 hover:bg-white/[0.06]"
              data-cta="automatisation-memo-revision-lien"
            >
              Voir l’application <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-4 md:grid-cols-3">
          {garanties.map((item, index) => (
            <article
              key={item.title}
              {...reveal(index)}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
            >
              <h3 className="text-lg font-black tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/62">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <FaqSection items={questions} title="Vos questions sur l’automatisation" />

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div
          {...reveal("zoom")}
          className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <h2 className="max-w-3xl font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Dites-moi simplement ce qui vous fait perdre du temps aujourd’hui.
          </h2>
          <Link
            to="/contact"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="automatisation-final"
          >
            Me contacter <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
