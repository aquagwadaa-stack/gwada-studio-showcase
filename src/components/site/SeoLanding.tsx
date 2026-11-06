import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { DemoRequestForm } from "@/components/site/DemoRequestForm";
import { FaqSection } from "@/components/site/FaqSection";
import { reveal, rise } from "@/components/site/Motion";
import { BrowserFrame } from "@/components/site/SitePreview";
import type { LandingPage } from "@/lib/landing-pages";

const steps = [
  { title: "Vous me présentez votre activité", text: "Le nom et un lien suffisent." },
  {
    title: "Je prépare votre démonstration",
    text: "À vos couleurs, à ouvrir sur votre téléphone.",
  },
  { title: "Vous décidez", text: "Devis clair si elle vous plaît, rien à payer sinon." },
];

export function SeoLanding({ page }: { page: LandingPage }) {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start lg:gap-14">
          <div className="lg:pt-8">
            <p className="gws-rise text-sm font-bold text-[#54d7c8]">{page.eyebrow}</p>
            <h1
              {...rise(1)}
              className="gws-rise mt-3 font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.045em]"
            >
              {page.headline} <span className="block">{page.accent}</span>
            </h1>
            <p
              {...rise(2)}
              className="gws-rise mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
            >
              {page.intro}
            </p>
            <p {...rise(3)} className="gws-rise mt-5 text-sm font-bold text-white/80">
              Voyez votre site avant de payer : démonstration gratuite, sans engagement. Sites à
              partir de 550 €.
            </p>
            {page.example && (
              <a
                href={page.example.href}
                data-cta="landing-exemple"
                className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#54d7c8]/50 px-5 text-sm font-bold text-[#54d7c8] transition hover:border-[#54d7c8]"
              >
                {page.example.label} <ArrowRight className="h-4 w-4" />
              </a>
            )}
          </div>
          <DemoRequestForm defaultSource={page.source} />
        </div>
      </section>

      <section className="bg-[#f5f3eb] px-5 py-16 text-[#152820] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2
            {...reveal()}
            className="max-w-3xl font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          >
            {page.pointsTitle}
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {page.points.map((point, index) => (
              <div
                key={point.title}
                {...reveal(index % 2)}
                className="rounded-3xl bg-white p-6 sm:p-7"
              >
                <h3 className="text-lg font-black tracking-[-0.02em]">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5d56]">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {page.details && (
        <section className="border-b border-white/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-3 lg:gap-12">
            {page.details.map((detail, index) => (
              <div key={detail.title} {...reveal(index)}>
                <h2 className="font-display text-[clamp(1.5rem,2.3vw,2rem)] font-extrabold leading-[1.12] tracking-[-0.035em]">
                  {detail.title}
                </h2>
                {detail.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-[15px] leading-relaxed text-white/65">
                    {paragraph}
                  </p>
                ))}
                {detail.link && (
                  <a
                    href={detail.link.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#54d7c8]"
                  >
                    {detail.link.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
          <div {...reveal()}>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Comment ça se passe
            </h2>
            <ol className="mt-8 grid gap-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#54d7c8] text-sm font-black text-[#0d1715]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-base font-bold">{step.title}</span>
                    <span className="mt-1 block text-sm text-white/60">{step.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div {...reveal(1)} className="self-start">
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Un site déjà en ligne
            </h2>
            <a
              href={page.reference.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded-2xl"
              aria-label={`Ouvrir ${page.reference.name} dans un nouvel onglet`}
              data-cta="landing-reference"
            >
              <BrowserFrame
                image={page.reference.image}
                alt={`Page d’accueil du site ${page.reference.name}`}
                address={page.reference.domain}
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </a>
            <h3 className="mt-4 text-lg font-black tracking-[-0.02em]">{page.reference.name}</h3>
            <p className="mt-1 text-sm leading-relaxed text-white/60">{page.reference.kind}</p>
          </div>
        </div>
      </section>

      <FaqSection items={page.faq} />

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
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
            data-cta="landing-final"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
