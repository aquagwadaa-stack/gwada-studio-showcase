import { ArrowUpRight } from "lucide-react";
import { reveal } from "@/components/site/Motion";
import type { PageLongue, Realisation } from "@/lib/realisations";

type BrowserFrameProps = {
  image: string;
  alt: string;
  address: string;
  sizes: string;
  priority?: boolean;
  /** Capture plus haute : la vraie page défile dans le cadre. */
  pageLongue?: PageLongue;
  className?: string;
};

export function BrowserFrame({
  image,
  alt,
  address,
  sizes,
  priority = false,
  pageLongue,
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`gws-frame overflow-hidden rounded-xl border border-black/10 bg-white text-[#152820] sm:rounded-2xl ${className}`}
    >
      <div className="flex h-7 items-center gap-3 border-b border-black/[0.07] bg-[#eef0ec] px-3 sm:h-9 sm:px-4">
        <span className="flex shrink-0 gap-1" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff7c6c]" />
          <span className="h-2 w-2 rounded-full bg-[#f2cb5d]" />
          <span className="h-2 w-2 rounded-full bg-[#54d7c8]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-full bg-white px-3 py-0.5 text-center text-[10px] font-semibold text-[#55665f] sm:text-[11px]">
          {address}
        </span>
        <span className="w-[32px] shrink-0" aria-hidden="true" />
      </div>
      {pageLongue ? (
        <div className="gws-vue aspect-[8/5] overflow-hidden">
          <img
            src={`${pageLongue.image}-800.webp`}
            srcSet={`${pageLongue.image}-800.webp 800w, ${pageLongue.image}-1400.webp 1400w`}
            sizes={sizes}
            width={1400}
            height={pageLongue.hauteur}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="gws-page block h-auto w-full"
          />
        </div>
      ) : (
        <img
          src={`${image}-800.webp`}
          srcSet={`${image}-800.webp 800w, ${image}-1400.webp 1400w`}
          sizes={sizes}
          width={1400}
          height={875}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="block aspect-[8/5] w-full object-cover object-top"
        />
      )}
    </div>
  );
}

export function RealisationCard({
  item,
  index = 0,
  sizes = "(min-width: 1024px) 620px, 100vw",
}: {
  item: Realisation;
  index?: number;
  sizes?: string;
}) {
  return (
    <article {...reveal(index)}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl"
        aria-label={`Ouvrir ${item.name} dans un nouvel onglet`}
        data-cta={`realisation-${item.slug}`}
      >
        <BrowserFrame
          image={item.image}
          pageLongue={item.pageLongue}
          alt={item.alt}
          address={item.address}
          sizes={sizes}
        />
      </a>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-extrabold tracking-[-0.03em]">{item.name}</h3>
          <p className="mt-0.5 text-sm opacity-65">{item.kind}</p>
        </div>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="gws-lien inline-flex shrink-0 items-center gap-1 pt-1 text-sm font-bold"
          data-cta={`realisation-lien-${item.slug}`}
        >
          {item.own ? "Voir l’application" : "Voir le site"}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <p className="mt-2 max-w-xl text-[15px] leading-relaxed opacity-75">{item.summary}</p>
    </article>
  );
}
