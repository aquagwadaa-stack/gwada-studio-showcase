import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  LineChart,
  MapPin,
  MessageCircleQuestion,
  ScanSearch,
  Sparkles,
} from "lucide-react";
import { ApercuRecherche } from "@/components/site/ApercuService";
import { FaqSection } from "@/components/site/FaqSection";
import { reveal, rise } from "@/components/site/Motion";

const title = "Référencement SEO et AEO : être trouvé sur Google et par les IA — Gwada Web Studio";
const description =
  "Je prépare votre site pour Google et pour les IA comme ChatGPT : SEO, AEO, fiche Google et structure claire. Les bases sont incluses dans chaque site, sans promesse de position.";

export const Route = createFileRoute("/referencement-google-ia")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/referencement-google-ia" }],
  }),
  component: ReferencementPage,
});

const definitions = [
  {
    title: "SEO",
    text: "Le référencement naturel : apparaître quand quelqu’un cherche votre activité sur Google, sans payer de publicité.",
  },
  {
    title: "AEO",
    text: "L’optimisation pour les moteurs de réponse : aider ChatGPT, Gemini, Perplexity ou les réponses IA de Google à comprendre votre activité et à s’appuyer sur votre site.",
  },
];

const leviers = [
  {
    icon: ScanSearch,
    title: "Un site clair pour Google",
    text: "Titres, descriptions, adresses des pages, plan du site et affichage rapide sur téléphone.",
  },
  {
    icon: MapPin,
    title: "Vos services et votre zone",
    text: "Une page claire par activité ou par secteur, quand c’est utile pour vos clients.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Des réponses aux vraies questions",
    text: "Des questions et des réponses écrites avec vos mots : un format simple à lire pour Google et pour les IA.",
  },
  {
    icon: FileText,
    title: "Des informations lisibles par les machines",
    text: "Votre activité, votre adresse, vos horaires et vos prix sont décrits dans un format que les moteurs savent lire.",
  },
  {
    icon: Sparkles,
    title: "Votre fiche Google",
    text: "On vérifie qu’elle est complète et cohérente avec votre site, car elle compte beaucoup dans les recherches locales.",
  },
  {
    icon: LineChart,
    title: "Le suivi",
    text: "Je relie votre site à la Search Console pour voir sur quelles recherches vous apparaissez.",
  },
];

const questions = [
  {
    question: "C’est quoi le SEO ?",
    answer:
      "Le SEO, ou référencement naturel, regroupe ce qui aide un site à apparaître dans les résultats de Google sans payer de publicité.",
  },
  {
    question: "C’est quoi l’AEO ?",
    answer:
      "L’AEO, pour Answer Engine Optimization, regroupe ce qui aide les assistants comme ChatGPT, Gemini ou Perplexity à comprendre votre activité et à s’appuyer sur votre site quand ils répondent.",
  },
  {
    question: "Combien de temps pour voir un résultat ?",
    answer:
      "Cela dépend de votre activité et de la concurrence dans votre zone. Il faut souvent compter plusieurs semaines, parfois plusieurs mois.",
  },
  {
    question: "Pouvez-vous garantir que Google ou ChatGPT parleront de moi ?",
    answer:
      "Non, personne ne le peut. Je rends votre site plus clair et plus facile à comprendre, ce qui améliore vos chances.",
  },
  {
    question: "Est-ce compris dans le prix du site ?",
    answer:
      "Les bases, oui : elles sont incluses dans chaque site. Un travail plus poussé, comme de nouvelles pages ou un suivi dans le temps, se fait sur devis.",
  },
  {
    question: "J’ai déjà un site, pouvez-vous l’améliorer ?",
    answer: "Oui. Je regarde ce qui manque et je vous dis ce qui serait vraiment utile.",
  },
];

function ReferencementPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div>
            <h1 className="gws-rise font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">
              Être trouvé sur Google, et compris par les IA.
            </h1>
            <p
              className="gws-rise mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:text-[17px]"
              {...rise(1)}
            >
              Vos clients cherchent sur Google, et de plus en plus en posant leur question à ChatGPT
              ou à d’autres assistants. Je prépare votre site pour qu’ils comprennent ce que vous
              faites, où vous êtes et à qui vous vous adressez.
            </p>
            <p className="gws-rise mt-4 text-sm font-bold text-white/85" {...rise(2)}>
              Les bases sont incluses dans chaque site. Un travail plus poussé se fait sur devis.
            </p>
            <div className="gws-rise mt-7 flex flex-col gap-3 sm:flex-row" {...rise(3)}>
              <Link
                to="/demo-gratuite"
                className="gws-button-primary inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
                data-cta="referencement-demo"
              >
                Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#leviers"
                className="inline-flex min-h-13 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                Voir ce que je mets en place
              </a>
            </div>
          </div>
          <ApercuRecherche />
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2
            {...reveal()}
            className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          >
            SEO et AEO, en clair
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {definitions.map((item, index) => (
              <article
                key={item.title}
                {...reveal(index)}
                className="rounded-3xl border border-white/10 bg-[#13211e] p-6 sm:p-8"
              >
                <h3 className="font-display text-3xl font-extrabold tracking-[-0.03em] text-[#54d7c8]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/68 sm:text-base">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="leviers"
        className="bg-[#f5f3eb] px-5 py-16 text-[#152820] sm:px-8 sm:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-[1280px]">
          <h2
            {...reveal()}
            className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          >
            Ce que je mets en place
          </h2>
          <ul className="mt-9 grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {leviers.map((item, index) => (
              <li key={item.title} {...reveal(index % 3)} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#1c6358] text-white">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a5d56]">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div
          {...reveal()}
          className="mx-auto max-w-[1280px] rounded-3xl border border-white/10 bg-[#13211e] p-6 sm:p-10"
        >
          <h2 className="font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">
            Ce que je ne promets pas
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/68 sm:text-base">
            Personne ne peut garantir une première place sur Google, ni une citation par une IA. Je
            ne vends ni faux avis, ni liens achetés. Je travaille sur ce qui dépend de votre site,
            et vous voyez ce qui change dans vos statistiques.
          </p>
        </div>
      </section>

      <FaqSection items={questions} title="Vos questions sur le référencement" />

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div
          {...reveal("zoom")}
          className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Le plus simple, c’est de voir le résultat.
          </h2>
          <Link
            to="/demo-gratuite"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="referencement-final"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
