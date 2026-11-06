import type { CSSProperties } from "react";
import { BellRing, CalendarCheck, Inbox, MailCheck, Search, Sparkles } from "lucide-react";
import { rise } from "@/components/site/Motion";

/** Haut de la page Référencement : un résultat de recherche et une réponse d'assistant. */
export function ApercuRecherche() {
  return (
    <figure className="gws-rise relative mx-auto w-full max-w-[480px] lg:mr-0" {...rise(2)}>
      <div className="gws-flotte-a rounded-2xl bg-[#fbfaf5] p-5 text-[#152820] shadow-[0_24px_60px_rgba(0,0,0,.35)] sm:p-6">
        <div className="flex items-center gap-2.5 rounded-full border border-[#152820]/12 bg-white px-4 py-2.5 text-sm font-medium text-[#152820]/75">
          <Search className="h-4 w-4 shrink-0 text-[#152820]/45" aria-hidden="true" />
          Coiffeur ouvert le samedi aux Abymes
        </div>
        <div className="mt-5">
          <div className="text-xs text-[#152820]/55">votre-entreprise.fr</div>
          <div className="mt-1 font-display text-lg font-bold tracking-[-0.02em] text-[#0f6b5e]">
            Votre entreprise, coiffeur aux Abymes
          </div>
          <p className="mt-1 text-sm leading-relaxed text-[#152820]/70">
            Ouvert du mardi au samedi. Tarifs, plan d’accès et rendez-vous en ligne.
          </p>
        </div>
      </div>
      <div className="gws-flotte-b relative -mt-3 ml-6 rounded-2xl border border-[#54d7c8]/30 bg-[#13211e] p-5 shadow-[0_24px_60px_rgba(0,0,0,.4)] sm:ml-12 sm:p-6">
        <div className="flex items-center gap-2 text-sm font-bold text-[#54d7c8]">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Réponse d’un assistant IA
        </div>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Votre entreprise, aux Abymes, est ouverte le samedi de 9&nbsp;h à 18&nbsp;h. Vous pouvez
          prendre rendez-vous sur son site.
        </p>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-white/50">
        Exemple pour illustrer ce qu’on vise : des informations claires, que Google et les IA
        peuvent reprendre.
      </figcaption>
    </figure>
  );
}

const etapes = [
  {
    icone: Inbox,
    titre: "Une demande arrive sur votre site",
    detail: "Le nom, le besoin et la date sont bien rangés.",
  },
  {
    icone: MailCheck,
    titre: "Votre client reçoit sa confirmation",
    detail: "Tout de suite, sans que vous ayez à écrire.",
  },
  {
    icone: BellRing,
    titre: "Vous êtes prévenu",
    detail: "Avec le détail de la demande.",
  },
  {
    icone: CalendarCheck,
    titre: "Le rappel part la veille",
    detail: "Et vous pouvez reprendre la main à tout moment.",
  },
];

/** Haut de la page Automatisation : un parcours qui se déroule étape par étape. */
export function ApercuParcours() {
  return (
    <figure className="relative mx-auto w-full max-w-[460px] lg:mr-0">
      <div
        className="gws-rise rounded-3xl border border-white/10 bg-[#13211e] p-6 shadow-[0_24px_60px_rgba(0,0,0,.35)] sm:p-7"
        {...rise(2)}
      >
        <ol className="gws-fil relative space-y-6">
          {etapes.map(({ icone: Icone, titre, detail }, index) => (
            <li
              key={titre}
              className="gws-etape relative flex gap-4"
              style={{ "--i": index } as CSSProperties}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1b3a34] text-[#54d7c8] ring-1 ring-[#54d7c8]/30">
                <Icone className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
              <div>
                <div className="text-[15px] font-bold leading-snug text-white">{titre}</div>
                <div className="mt-0.5 text-sm leading-relaxed text-white/55">{detail}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-4 text-xs leading-relaxed text-white/50">
        Exemple de parcours, à adapter à votre façon de travailler.
      </figcaption>
    </figure>
  );
}
