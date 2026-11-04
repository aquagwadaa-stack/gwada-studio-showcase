import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, CircleCheck, ExternalLink, Quote, X } from "lucide-react";
import { DemoRequestForm } from "@/components/site/DemoRequestForm";
import { FaqSection } from "@/components/site/FaqSection";

const title = "Démo gratuite de votre site internet — Gwada Web Studio";
const description =
  "Voyez votre site avant de payer. Je prépare gratuitement une démonstration à vos couleurs, sans engagement, en Guadeloupe, en Martinique et partout en France.";

export const Route = createFileRoute("/demo-gratuite")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/demo-gratuite" }],
  }),
  component: DemoPage,
});

const steps = [
  {
    title: "Vous me présentez votre commerce",
    text: "Le nom, votre activité, un lien si vous en avez un. Deux minutes suffisent.",
  },
  {
    title: "Je prépare votre démonstration",
    text: "Une première version à vos couleurs, avec votre activité, à ouvrir sur votre téléphone.",
  },
  {
    title: "Vous décidez",
    text: "Elle vous plaît : je vous envoie un devis clair. Elle ne vous plaît pas : on en reste là.",
  },
];

const included = [
  "Une première version à vos couleurs",
  "Votre activité et vos services mis en avant",
  "Un lien à ouvrir sur votre téléphone",
  "Un échange direct avec moi",
];

const excluded = [
  "Aucun paiement demandé",
  "Aucun engagement de votre part",
  "Pas le site final : tout peut encore être modifié",
];

const references = [
  {
    name: "Crystal Beach Courbaril",
    kind: "Location saisonnière, réservation directe",
    url: "https://crystalbeachcourbaril.fr/",
    domain: "crystalbeachcourbaril.fr",
  },
  {
    name: "Kafé Céramik",
    kind: "Café-atelier, réservations en ligne",
    url: "https://kafeceramik.fr/",
    domain: "kafeceramik.fr",
  },
];

const quotes = [
  {
    text: "Le résultat est magnifique : le site correspond parfaitement à ce que nous souhaitions.",
    author: "Kafe Ceramik, Saint-François",
  },
  {
    text: "Le site correspond tout à fait à ce que je souhaitais, et je suis ravie du résultat.",
    author: "Appart Courbaril",
  },
];

const faq = [
  {
    question: "La démonstration est-elle vraiment gratuite ?",
    answer:
      "Oui. Elle ne vous engage à rien. Si vous ne souhaitez pas continuer, vous ne me devez rien.",
  },
  {
    question: "Que se passe-t-il si elle me plaît ?",
    answer:
      "Je vous envoie un devis clair, avec ce qui est inclus et ce qui ne l’est pas. Les sites commencent à 550 €, et on ne démarre qu’une fois le devis signé.",
  },
  {
    question: "Je n’ai que Facebook ou Instagram, est-ce que ça marche ?",
    answer:
      "Oui, c’est même un très bon point de départ. Je m’appuie sur ce que vous publiez déjà, et votre page continue d’exister à côté du site.",
  },
  {
    question: "Vous travaillez aussi en dehors de la Guadeloupe ?",
    answer:
      "Oui. Je suis basé aux Abymes et je travaille à distance avec la Martinique et toute la France, par WhatsApp, téléphone ou visio.",
  },
  {
    question: "Et si j’ai déjà un site ?",
    answer:
      "Je peux préparer une démonstration d’une version plus moderne, pour que vous puissiez comparer avant de décider.",
  },
];

function DemoPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-[32rem] bg-[radial-gradient(circle_at_25%_100%,rgba(84,215,200,.13),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-14">
          <div className="lg:pt-8">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#54d7c8]">
              Démonstration gratuite · Sans engagement
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.6rem,5.6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.055em]">
              Voyez votre site <span className="block text-[#54d7c8]">avant de payer.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Je prépare gratuitement une démonstration à vos couleurs. Vous la regardez sur votre
              téléphone, et vous décidez ensuite. Si elle ne vous plaît pas, on en reste là.
            </p>
            <ul className="mt-7 grid gap-2.5 text-sm font-semibold text-white/72">
              {[
                "Aucun paiement demandé",
                "Un seul interlocuteur, du début à la fin",
                "Sites à partir de 550 € si vous décidez de continuer",
                "Chaque site comprend un espace pour le gérer vous-même",
                "Guadeloupe, Martinique et toute la France",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CircleCheck className="h-4 w-4 shrink-0 text-[#54d7c8]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <DemoRequestForm />
        </div>
      </section>

      <section className="bg-[#f5f3eb] px-5 py-16 text-[#152820] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="max-w-3xl font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
            Trois étapes, et c’est vous qui décidez.
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white p-6 sm:p-7">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#102b23] text-sm font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-5 text-lg font-black tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5d56]">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#54d7c8]/25 bg-[#54d7c8]/[0.06] p-6 sm:p-8">
            <h2 className="text-xl font-black tracking-[-0.02em]">Ce que vous recevez</h2>
            <ul className="mt-5 grid gap-3 text-sm text-white/72">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#54d7c8]" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <h2 className="text-xl font-black tracking-[-0.02em]">Ce que ce n’est pas</h2>
            <ul className="mt-5 grid gap-3 text-sm text-white/72">
              {excluded.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-white/40" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#102019] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="max-w-3xl font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
            Des sites déjà en ligne.
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {references.map((reference) => (
              <a
                key={reference.name}
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#54d7c8]/45"
              >
                <h3 className="text-lg font-black tracking-[-0.02em]">{reference.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{reference.kind}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#54d7c8]">
                  {reference.domain} <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </a>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {quotes.map((quote) => (
              <figure key={quote.author} className="rounded-3xl bg-[#f5f3eb] p-6 text-[#152820]">
                <Quote className="h-5 w-5 text-[#287667]" />
                <blockquote className="mt-3 text-base font-semibold leading-relaxed">
                  {quote.text}
                </blockquote>
                <figcaption className="mt-3 text-xs font-bold text-[#4a5d56]">
                  {quote.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FaqSection items={faq} />

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
            Le plus simple, c’est de voir le résultat.
          </h2>
          <a
            href="#demande"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="demo-final"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
