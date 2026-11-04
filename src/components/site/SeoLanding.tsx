import { Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { DemoRequestForm } from "@/components/site/DemoRequestForm";
import { FaqSection } from "@/components/site/FaqSection";
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
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#54d7c8]">
              {page.eyebrow}
            </div>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[1.04] tracking-[-0.05em]">
              {page.headline} <span className="block text-[#54d7c8]">{page.accent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {page.intro}
            </p>
            <p className="mt-5 text-sm font-bold text-white/80">
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
          <h2 className="max-w-3xl font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
            {page.pointsTitle}
          </h2>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {page.points.map((point) => (
              <div key={point.title} className="rounded-3xl bg-white p-6 sm:p-7">
                <h3 className="text-lg font-black tracking-[-0.02em]">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4a5d56]">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[clamp(2rem,3.8vw,3.4rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
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
          <a
            href={page.reference.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group self-start rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-[#54d7c8]/45"
          >
            <div className="text-xs font-black uppercase tracking-[0.16em] text-white/45">
              Un site déjà en ligne
            </div>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.03em]">{page.reference.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{page.reference.kind}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#54d7c8]">
              {page.reference.domain} <ExternalLink className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </section>

      <FaqSection items={page.faq} />

      <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.045em]">
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
