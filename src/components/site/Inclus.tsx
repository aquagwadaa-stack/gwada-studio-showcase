import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { reveal } from "@/components/site/Motion";
import { inclusEssentiel } from "@/lib/prestation";

export function InclusApercu() {
  return (
    <section className="bg-[#f5f3eb] px-5 py-16 text-[#152820] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div {...reveal()}>
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Ce qui est inclus dans chaque prestation
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#4a5d56] sm:text-base">
            Pas de mauvaise surprise : vous savez ce que vous avez pour votre argent avant de
            signer.
          </p>
          <Link
            to="/ce-qui-est-inclus"
            className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-[#1c6358] transition hover:gap-3"
            data-cta="inclus-detail"
          >
            Voir le détail <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div>
          <ul className="grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {inclusEssentiel.map((item, index) => (
              <li
                key={item}
                {...reveal(index % 4)}
                className="flex items-start gap-3 text-[15px] font-semibold leading-snug"
              >
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#1c6358] text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p
            {...reveal()}
            className="mt-6 border-t border-[#152820]/15 pt-4 text-sm leading-relaxed text-[#4a5d56]"
          >
            À part, au prix réel et sans marge : le nom de domaine, l’hébergement et les services
            externes. Ils sont annoncés dans le devis.
          </p>
        </div>
      </div>
    </section>
  );
}
