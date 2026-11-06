import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { BrowserFrame } from "@/components/site/SitePreview";
import { realisations } from "@/lib/realisations";

const title = "Réalisations : sites internet et applications en ligne — Gwada Web Studio";
const description =
  "Découvrez de vrais projets en ligne : Kafé Céramik, Crystal Beach Courbaril, un cabinet médical et l’application Mémo Révision.";

export const Route = createFileRoute("/realisations")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/realisations" }],
  }),
  component: RealisationsPage,
});

function RealisationsPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[1280px]">
          <h1 className="max-w-3xl font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.05em]">
            Mes réalisations
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-[17px]">
            Trois sites pour des clients, et une application à moi. Tout est en ligne : cliquez sur
            une page pour ouvrir le vrai site.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-16 lg:gap-24">
          {realisations.map((item, index) => (
            <article
              key={item.slug}
              className={`grid items-center gap-7 lg:gap-14 ${index % 2 ? "lg:grid-cols-[.75fr_1.25fr]" : "lg:grid-cols-[1.25fr_.75fr]"}`}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block rounded-2xl ${index % 2 ? "lg:order-2" : ""}`}
                aria-label={`Ouvrir ${item.name} dans un nouvel onglet`}
                data-cta={`realisation-${item.slug}`}
              >
                <BrowserFrame
                  image={item.image}
                  alt={item.alt}
                  address={item.address}
                  sizes="(min-width: 1024px) 760px, 100vw"
                  priority={index === 0}
                />
              </a>
              <div>
                <p className="text-sm font-bold text-[#54d7c8]">{item.kind}</p>
                <h2 className="mt-1 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">
                  {item.name}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-white/68 sm:text-base">
                  {item.summary}
                </p>
                <ul className="mt-4 grid gap-1.5 text-sm font-semibold text-white/82">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5">
                      <Check
                        className="h-3.5 w-3.5 shrink-0 text-[#54d7c8]"
                        strokeWidth={3}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                {item.quote && (
                  <figure className="mt-5 border-l-2 border-[#54d7c8]/60 pl-4">
                    <blockquote className="text-sm italic leading-relaxed text-white/72">
                      “{item.quote.text}”
                    </blockquote>
                    <figcaption className="mt-1.5 text-xs font-bold text-white/55">
                      {item.quote.author}
                    </figcaption>
                  </figure>
                )}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-bold transition hover:border-white/45 hover:bg-white/[0.06]"
                  data-cta={`realisation-lien-${item.slug}`}
                >
                  {item.own ? "Voir l’application" : "Voir le site"}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Et si le prochain, c’était le vôtre ?
          </h2>
          <Link
            to="/demo-gratuite"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="realisations-demo"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
