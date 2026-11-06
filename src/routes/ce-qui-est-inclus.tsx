import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { FaqSection } from "@/components/site/FaqSection";
import { etapesInclus, horsInclus } from "@/lib/prestation";

const title = "Ce qui est inclus dans une prestation — Gwada Web Studio";
const description =
  "Démonstration, devis clair, espace de gestion, mise en ligne, prise en main, suivi : tout ce que comprend une prestation, et ce qui se paie à part.";

export const Route = createFileRoute("/ce-qui-est-inclus")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/ce-qui-est-inclus" }],
  }),
  component: InclusPage,
});

const tarifs = [
  { label: "Sites internet", value: "à partir de 550 €" },
  { label: "Applications et outils", value: "sur devis" },
  { label: "Cartes d’avis Google", value: "à partir de 29,90 €" },
];

const questions = [
  {
    question: "Que comprend un site à 550 € ?",
    answer:
      "C’est le site le plus simple : il présente votre activité et comprend déjà son espace de gestion. Le devis précise exactement ce qui est prévu pour vous.",
  },
  {
    question: "Quand est-ce que je paie ?",
    answer:
      "Rien pour la démonstration. On démarre une fois le devis signé, et les échéances de paiement sont écrites dans le devis.",
  },
  {
    question: "Le nom de domaine et l’hébergement sont-ils compris ?",
    answer:
      "Ce sont des services externes. Ils vous sont facturés à leur prix réel, sans marge, et ils sont annoncés dans le devis.",
  },
  {
    question: "Et si je veux ajouter quelque chose après la mise en ligne ?",
    answer:
      "C’est possible. Une nouvelle fonction a son propre prix, que je vous annonce avant de commencer.",
  },
  {
    question: "Combien de temps faut-il ?",
    answer:
      "Cela dépend du projet et du moment où vous me confiez vos textes et vos photos. Le délai est écrit dans le devis.",
  },
];

function InclusPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[1280px]">
          <h1 className="max-w-3xl font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.05em]">
            Ce qui est inclus dans chaque prestation
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-[17px]">
            Vous savez ce que vous avez pour votre argent avant de signer, de la démonstration
            jusqu’au suivi après la mise en ligne.
          </p>
          <dl className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {tarifs.map((tarif) => (
              <div
                key={tarif.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <dt className="text-[13px] font-semibold text-white/60">{tarif.label}</dt>
                <dd className="mt-0.5 text-base font-extrabold text-[#54d7c8]">{tarif.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-[#f5f3eb] px-5 py-14 text-[#152820] sm:px-8 sm:py-20 lg:px-12">
        <ol className="mx-auto grid max-w-[1280px] gap-10 lg:gap-12">
          {etapesInclus.map((etape, index) => (
            <li
              key={etape.title}
              className="grid gap-5 border-t border-[#152820]/15 pt-6 lg:grid-cols-[280px_1fr] lg:gap-10"
            >
              <div className="flex items-center gap-3 lg:items-start">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#1c6358] text-sm font-black text-white">
                  {index + 1}
                </span>
                <h2 className="font-display text-xl font-extrabold leading-snug tracking-[-0.03em] sm:text-2xl lg:pt-0.5">
                  {etape.title}
                </h2>
              </div>
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {etape.items.map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#1c6358]"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="text-base font-extrabold tracking-[-0.01em]">{item.title}</h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-[#4a5d56]">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Ce qui n’est pas inclus
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/62 sm:text-base">
              C’est dit clairement dans le devis, avant que vous décidiez.
            </p>
          </div>
          <ul className="grid gap-5">
            {horsInclus.map((item) => (
              <li key={item.title} className="flex gap-3">
                <Minus
                  className="mt-1 h-4 w-4 shrink-0 text-[#ffae96]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-extrabold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/62">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={questions} />

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Le plus simple, c’est de voir le résultat.
          </h2>
          <Link
            to="/demo-gratuite"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="inclus-demo"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
