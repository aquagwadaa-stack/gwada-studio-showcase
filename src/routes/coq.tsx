import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  CalendarCheck,
  Check,
  ChevronDown,
  Ear,
  Lock,
  MapPin,
  Moon,
  Send,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

// Site parodique pour les vidéos du studio : hors menu, hors plan du site, invisible pour Google.
// Il montre de vraies fonctions (statut en direct, réservation, boutique, avis, espace de gestion)
// et finit sur la démo gratuite.

const SITE = "https://gwadawebstudio.fr";
const POLICE =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,800;1,9..144,600&display=swap";
const ICONE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%90%93%3C/text%3E%3C/svg%3E";
const PARTAGE = `${SITE}/coq-partage.jpg`;
const ACCROCHE = "Votre réveil, que vous le vouliez ou non.";

export const Route = createFileRoute("/coq")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Le Coq du Voisin — Votre réveil, que vous le vouliez ou non" },
      {
        name: "description",
        content:
          "Horaires, réservation de réveil, boutique et avis des voisins : le site du coq qui chante à 4\u00a0h du matin.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#10162b" },
      { property: "og:title", content: "Le Coq du Voisin" },
      {
        property: "og:description",
        content: `${ACCROCHE} Horaires, réservation, boutique et avis des voisins.`,
      },
      { property: "og:url", content: `${SITE}/coq` },
      { property: "og:image", content: PARTAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `Le Coq du Voisin : ${ACCROCHE}` },
      { name: "twitter:title", content: "Le Coq du Voisin" },
      { name: "twitter:description", content: ACCROCHE },
      { name: "twitter:image", content: PARTAGE },
    ],
    links: [
      { rel: "stylesheet", href: POLICE },
      { rel: "icon", type: "image/svg+xml", href: ICONE },
    ],
  }),
  component: SiteDuCoq,
});

const display = { fontFamily: '"Fraunces", Georgia, "Times New Roman", serif' };

const OUVERTURE = 3 * 60 + 47;
const FERMETURE = 18 * 60;
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const JOURS_RESERVATION = ["Demain", "Après-demain", "Dimanche"];
const CRENEAUX = [
  "3\u00a0h\u00a047",
  "3\u00a0h\u00a052",
  "3\u00a0h\u00a058",
  "4\u00a0h\u00a005",
  "4\u00a0h\u00a012",
  "4\u00a0h\u00a020",
  "4\u00a0h\u00a031",
  "4\u00a0h\u00a046",
];
const CRENEAUX_INDISPONIBLES = [
  "6\u00a0h\u00a030",
  "7\u00a0h\u00a000",
  "8\u00a0h\u00a000",
  "9\u00a0h\u00a030",
];

const FORMULES = [
  {
    nom: "Réveil Classique",
    texte: "Un chant à 3\u00a0h\u00a047. Puis quelques autres, au cas où.",
  },
  { nom: "Réveil Premium", texte: "Comme le Classique, mais plus fort.", vedette: true },
  { nom: "Réveil Week-end", texte: "Identique. Il ne sait pas qu’on est samedi." },
];

const PRODUITS = [
  {
    nom: "Bouchons d’oreilles «\u00a0Spécial 4\u00a0h\u00a0»",
    prix: "2,00 €",
    texte: "Le meilleur ami des voisins.",
    Icone: Ear,
    fond: "#ffe1cc",
  },
  {
    nom: "Oreiller anti-cocorico",
    prix: "19,90 €",
    texte: "Testé et approuvé par personne.",
    Icone: BedDouble,
    fond: "#e3e8ff",
  },
  {
    nom: "Rideaux occultants",
    prix: "24,90 €",
    texte: "Bloquent la lumière. Pas le son.",
    Icone: Moon,
    fond: "#ece4f7",
  },
  {
    nom: "Kit «\u00a0Je déménage\u00a0»",
    prix: "Sur devis",
    texte: "La seule solution qui marche.",
    Icone: Truck,
    fond: "#dff2e6",
  },
];

const AVIS = [
  {
    note: 1,
    texte: "Il a chanté pendant ma sieste. Et pendant ma nuit. Et pendant mon mariage.",
    auteur: "La voisine du n°\u00a012",
    reponse: "Cocorico.",
  },
  {
    note: 1,
    texte:
      "J’avais réservé 4\u00a0h\u00a005. Il a chanté à 3\u00a0h\u00a047. Aucun respect des horaires.",
    auteur: "Le voisin de gauche",
  },
  {
    note: 5,
    texte: "Grâce à lui, je n’ai plus jamais raté mon bus de 5\u00a0h.",
    auteur: "Le seul voisin content",
  },
  { note: 1, texte: "Pas de bouton snooze. J’ai cherché partout.", auteur: "Le voisin de droite" },
  {
    note: 1,
    texte: "Maintenant, le chien du quartier aboie pour lui répondre. Merci beaucoup.",
    auteur: "Le voisin d’en face",
  },
];

const QUESTIONS = [
  ["Il dort quand ?", "Personne ne sait. Nos équipes enquêtent."],
  ["Peut-on le faire taire ?", "Non. C’est écrit dans ses conditions générales."],
  ["Il chante aussi le dimanche ?", "Surtout le dimanche."],
  ["Il fait les mariages ?", "Il y sera. Invité ou pas."],
  ["C’est le coq de qui, exactement ?", "Du voisin. C’est toujours le coq du voisin."],
];

const ETOILES_CIEL = [
  [3, 8, 1.5, 0],
  [5, 26, 2, 0.6],
  [2, 47, 1.5, 1.2],
  [6, 63, 2, 0.3],
  [3, 81, 1.5, 0.9],
  [12, 93, 2, 1.5],
  [24, 96, 1.5, 0.4],
  [37, 92, 2, 1.1],
  [49, 97, 1.5, 0.8],
];

const NAVIGATION = [
  ["#horaires", "Horaires"],
  ["#reserver", "Réserver"],
  ["#boutique", "Boutique"],
  ["#avis", "Avis"],
  ["#contact", "Contact"],
];

const STYLES = `
@keyframes coq-onde { 0%, 100% { opacity: .12 } 45% { opacity: 1 } }
@keyframes coq-scintille { 0%, 100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes coq-leve { from { transform: translateY(36px) } to { transform: translateY(0) } }
@keyframes coq-hoche { 0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(-3deg) } }
@keyframes coq-secoue { 0%, 100% { transform: translateX(0) } 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
@keyframes coq-monte { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }
.coq-ondes path { animation: coq-onde 1.4s ease-in-out infinite; }
.coq-ondes path:nth-child(2) { animation-delay: .18s }
.coq-ondes path:nth-child(3) { animation-delay: .36s }
.coq-hoche { animation: coq-hoche 2.8s ease-in-out infinite; transform-origin: 50% 92%; transform-box: fill-box; }
.coq-soleil { animation: coq-leve 2.4s cubic-bezier(.2,.7,.2,1) both; }
.coq-etoile { animation: coq-scintille 2.6s ease-in-out infinite; }
.coq-secoue { animation: coq-secoue .45s ease-in-out; }
.coq-toast { animation: coq-monte .25s ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .coq-ondes path, .coq-hoche, .coq-soleil, .coq-etoile, .coq-secoue, .coq-toast { animation: none !important; }
}
`;

type Maintenant = { minutes: number; jour: string };

function heureGuadeloupe(): Maintenant {
  const morceaux = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "America/Guadeloupe",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const lire = (type: string) => morceaux.find((m) => m.type === type)?.value ?? "";
  return { minutes: Number(lire("hour")) * 60 + Number(lire("minute")), jour: lire("weekday") };
}

function useMaintenant() {
  const [maintenant, setMaintenant] = useState<Maintenant | null>(null);
  useEffect(() => {
    const mettreAJour = () => setMaintenant(heureGuadeloupe());
    mettreAJour();
    const minuterie = window.setInterval(mettreAJour, 30_000);
    return () => window.clearInterval(minuterie);
  }, []);
  return maintenant;
}

function estOuvert(maintenant: Maintenant | null) {
  if (!maintenant) return true;
  return maintenant.minutes >= OUVERTURE && maintenant.minutes < FERMETURE;
}

function SiteDuCoq() {
  const maintenant = useMaintenant();
  const [panier, setPanier] = useState(0);
  const [message, setMessage] = useState<{ texte: string; numero: number } | null>(null);
  const minuterie = useRef<number | undefined>(undefined);

  const annoncer = (texte: string) => {
    window.clearTimeout(minuterie.current);
    setMessage({ texte, numero: Date.now() });
    minuterie.current = window.setTimeout(() => setMessage(null), 2800);
  };

  useEffect(() => () => window.clearTimeout(minuterie.current), []);

  return (
    <div className="min-h-svh bg-[#fff6ea] text-[#1d1a17] [overflow-wrap:anywhere]">
      <style>{STYLES}</style>

      <p className="m-0 bg-[#d7263d] px-4 py-2 text-center text-[13px] font-semibold leading-snug text-white">
        Nouveau&nbsp;: séance de 2&nbsp;h&nbsp;15, sans supplément.
      </p>

      <Entete panier={panier} />

      <main>
        <Accueil maintenant={maintenant} />
        <Horaires maintenant={maintenant} />
        <Reservation />
        <Formules annoncer={annoncer} />
        <Boutique
          annoncer={annoncer}
          ajouter={() => {
            setPanier((n) => n + 1);
            annoncer("Ajouté au panier. Ça ne l’arrêtera pas, mais ça aide.");
          }}
        />
        <Avis />
        <EspaceDuCoq />
        <Questions />
        <Contact />
      </main>

      <PiedDePage />
      <LeVotre />

      {message && (
        <p
          key={message.numero}
          role="status"
          className="coq-toast fixed bottom-5 left-1/2 z-50 m-0 flex w-[min(92vw,26rem)] -translate-x-1/2 items-center gap-3 rounded-2xl bg-[#10162b] px-4 py-3.5 text-[14px] font-semibold leading-snug text-white shadow-[0_18px_50px_rgba(16,22,43,0.35)]"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ff7a3d]">
            <Check className="h-4 w-4" />
          </span>
          {message.texte}
        </p>
      )}
    </div>
  );
}

function Entete({ panier }: { panier: number }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#1d1a17]/10 bg-[#fff6ea]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6">
        <a href="#accueil" className="flex min-w-0 items-center gap-2 no-underline">
          <Coq className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" ondes={false} />
          <span className="flex flex-col leading-none">
            <span
              style={display}
              className="whitespace-nowrap text-[17px] font-extrabold tracking-[-0.02em] text-[#1d1a17] sm:text-[19px]"
            >
              Le Coq du Voisin
            </span>
            <span className="mt-1 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] text-[#c2541f]">
              Réveil naturel
            </span>
          </span>
        </a>
        <nav aria-label="Menu" className="ml-auto hidden items-center gap-6 lg:flex">
          {NAVIGATION.map(([lien, nom]) => (
            <a
              key={lien}
              href={lien}
              className="text-sm font-semibold text-[#1d1a17]/75 no-underline transition hover:text-[#d7263d]"
            >
              {nom}
            </a>
          ))}
        </nav>
        <a
          href="#boutique"
          aria-label={`Panier : ${panier} article${panier > 1 ? "s" : ""}`}
          className="relative ml-auto grid h-11 w-11 place-items-center rounded-full border border-[#1d1a17]/15 text-[#1d1a17] no-underline lg:ml-0"
        >
          <ShoppingBag className="h-5 w-5" />
          {panier > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#d7263d] px-1 text-[11px] font-bold text-white">
              {panier}
            </span>
          )}
        </a>
        <a
          href="#reserver"
          className="inline-flex h-11 shrink-0 items-center rounded-full bg-[#ff7a3d] px-3.5 text-sm font-bold text-[#1d1a17] no-underline shadow-[0_6px_14px_rgba(255,122,61,0.25)] transition hover:bg-[#ff6a26]"
        >
          Réserver
        </a>
      </div>
    </header>
  );
}

function Statut({
  maintenant,
  sombre = false,
}: {
  maintenant: Maintenant | null;
  sombre?: boolean;
}) {
  const ouvert = estOuvert(maintenant);
  const point = ouvert ? "bg-[#3ddc84]" : "bg-[#ff5a5f]";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-bold ${
        sombre
          ? "bg-white/10 text-white ring-1 ring-white/20"
          : "bg-white text-[#1d1a17] ring-1 ring-[#1d1a17]/10"
      }`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-70 ${point}`}
        />
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${point}`} />
      </span>
      {ouvert ? "Ouvert · ferme à 18\u00a0h" : "Fermé · réouverture à 3\u00a0h\u00a047"}
    </span>
  );
}

function Accueil({ maintenant }: { maintenant: Maintenant | null }) {
  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#0b1024_0%,#18214a_42%,#6b3a5a_72%,#ff8a4c_100%)] text-white"
    >
      {ETOILES_CIEL.map(([haut, gauche, taille, delai]) => (
        <span
          key={`${haut}-${gauche}`}
          className="coq-etoile absolute rounded-full bg-white"
          style={{
            top: `${haut}%`,
            left: `${gauche}%`,
            width: taille * 2,
            height: taille * 2,
            animationDelay: `${delai}s`,
          }}
        />
      ))}

      <div className="relative mx-auto grid max-w-6xl gap-6 px-5 pb-0 pt-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-20">
        <div className="lg:pb-24">
          <Statut maintenant={maintenant} sombre />
          <h1
            style={display}
            className="mb-0 mt-5 text-[clamp(2.6rem,10vw,4.6rem)] font-extrabold leading-[0.98] tracking-[-0.035em]"
          >
            <span className="block">Votre réveil,</span>
            <em className="block font-semibold text-balance text-[#ffb37a]">
              que vous le vouliez ou non.
            </em>
          </h1>
          <p className="mb-0 mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">
            Chaque matin à 3&nbsp;h&nbsp;47. Sans abonnement, sans bouton snooze, sans votre accord.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#reserver"
              className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#ff7a3d] px-6 text-[15px] font-bold text-[#1d1a17] no-underline shadow-[0_14px_34px_rgba(255,122,61,0.45)] transition hover:bg-[#ff6a26]"
            >
              <CalendarCheck className="h-5 w-5" /> Réserver mon réveil
            </a>
            <a
              href="#horaires"
              className="inline-flex min-h-13 items-center rounded-full px-6 text-[15px] font-bold text-white no-underline ring-1 ring-white/35 transition hover:ring-white/70"
            >
              Voir les horaires
            </a>
          </div>
          <ul className="m-0 mt-7 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[13px] font-semibold text-white/75">
            <li className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-[#f5b83d] text-[#f5b83d]" /> 1,8/5 · 5 avis
            </li>
            <li>Ouvert 365 jours par an</li>
            <li>Livré dans tout le quartier</li>
          </ul>
        </div>

        <div className="relative mx-auto -mb-1 w-full max-w-[26rem] lg:max-w-[30rem]">
          <div className="coq-soleil absolute bottom-[-46%] left-1/2 aspect-square w-[92%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ffe08a_0%,#ffb347_48%,#ff7a3d_78%,rgba(255,122,61,0)_100%)] opacity-90" />
          <Coq className="relative w-full drop-shadow-[0_18px_30px_rgba(11,16,36,0.45)]" />
          <div className="relative h-5 rounded-t-[50%] bg-[#0b1024]/85" />
        </div>
      </div>
    </section>
  );
}

function EnTete({ sur, titre, texte }: { sur: string; titre: string; texte?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#c2541f]">
        {sur}
      </p>
      <h2
        style={display}
        className="mb-0 mt-2 text-[clamp(2rem,7vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
      >
        {titre}
      </h2>
      {texte && <p className="mb-0 mt-3 text-[16px] leading-relaxed text-[#1d1a17]/70">{texte}</p>}
    </div>
  );
}

function Horaires({ maintenant }: { maintenant: Maintenant | null }) {
  return (
    <section id="horaires" className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <EnTete sur="Horaires" titre="Ouvert tous les jours. Vraiment tous." />
          <div className="mt-5">
            <Statut maintenant={maintenant} />
          </div>
          <p className="mb-0 mt-5 text-[15px] leading-relaxed text-[#1d1a17]/70">
            Jours fériés : ouvert. Vacances : ouvert. Fermeture annuelle : jamais.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-2 shadow-[0_20px_50px_rgba(29,26,23,0.08)] ring-1 ring-[#1d1a17]/5">
          <table className="w-full border-collapse text-[15px]">
            <tbody>
              {JOURS.map((jour) => {
                const aujourdHui = maintenant?.jour === jour;
                return (
                  <tr key={jour} className={aujourdHui ? "bg-[#fff1e4]" : ""}>
                    <th
                      scope="row"
                      className="rounded-l-2xl px-4 py-3 text-left font-semibold capitalize"
                    >
                      {jour}
                      {aujourdHui && (
                        <span className="ml-2 rounded-full bg-[#ff7a3d] px-2 py-0.5 text-[11px] font-bold normal-case text-[#1d1a17]">
                          aujourd’hui
                        </span>
                      )}
                    </th>
                    <td className="rounded-r-2xl px-4 py-3 text-right font-bold tabular-nums">
                      3&nbsp;h&nbsp;47 – 18&nbsp;h&nbsp;00
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Reservation() {
  const [jour, setJour] = useState(JOURS_RESERVATION[0]);
  const [creneau, setCreneau] = useState<string | null>(null);
  const [annulation, setAnnulation] = useState(0);

  return (
    <section id="reserver" className="bg-[#10162b] text-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#ffb37a]">
          Réservation en ligne
        </p>
        <h2
          style={display}
          className="mb-0 mt-2 text-[clamp(2rem,7vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
        >
          Réservez votre réveil.
        </h2>
        <p className="mb-0 mt-3 max-w-2xl text-[16px] leading-relaxed text-white/70">
          Choisissez votre créneau. Il chantera à l’heure. Et aux autres aussi.
        </p>

        <div className="mt-8 rounded-3xl bg-white/[0.06] p-4 ring-1 ring-white/10 sm:p-6">
          <p className="m-0 text-sm font-bold text-white/70">1. Le jour</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
            {JOURS_RESERVATION.map((choix) => (
              <button
                key={choix}
                type="button"
                onClick={() => {
                  setJour(choix);
                  setCreneau(null);
                }}
                className={`min-h-11 whitespace-nowrap rounded-full px-1 text-[12.5px] font-bold transition sm:px-4 sm:text-sm ${
                  jour === choix
                    ? "bg-white text-[#10162b]"
                    : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/15"
                }`}
              >
                {choix}
              </button>
            ))}
          </div>

          <p className="mb-0 mt-6 text-sm font-bold text-white/70">2. L’heure</p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {CRENEAUX.map((heure) => (
              <button
                key={heure}
                type="button"
                onClick={() => {
                  setCreneau(heure);
                  setAnnulation(0);
                }}
                className={`min-h-12 rounded-xl text-[15px] font-bold tabular-nums transition ${
                  creneau === heure
                    ? "bg-[#ff7a3d] text-[#1d1a17]"
                    : "bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/20"
                }`}
              >
                {heure}
              </button>
            ))}
            {CRENEAUX_INDISPONIBLES.map((heure) => (
              <button
                key={heure}
                type="button"
                disabled
                className="min-h-12 rounded-xl bg-transparent text-[15px] font-bold tabular-nums text-white/30 line-through ring-1 ring-white/10"
              >
                {heure}
              </button>
            ))}
          </div>
          <p className="mb-0 mt-3 text-[13px] text-white/55">
            Les créneaux après 5&nbsp;h ne sont pas proposés : le coq a d’autres engagements.
          </p>

          {creneau && (
            <div
              key={`${creneau}-${annulation}`}
              className={`mt-6 rounded-2xl bg-white p-5 text-[#1d1a17] ${annulation ? "coq-secoue" : ""}`}
            >
              <p className="m-0 flex items-center gap-2 text-[15px] font-extrabold text-[#1f8a4c]">
                <Check className="h-5 w-5" /> Réservation confirmée
              </p>
              <p className="mb-0 mt-2 text-[16px] leading-relaxed">
                {jour}, le coq chantera à <strong>{creneau}</strong>. Et aussi à toutes les autres
                heures.
              </p>
              {annulation > 0 ? (
                <p className="mb-0 mt-4 rounded-xl bg-[#ffe9ec] px-4 py-3 text-[14px] font-bold text-[#b3182f]">
                  Annulation impossible : le coq est déjà en train de répéter.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setAnnulation((n) => n + 1)}
                  className="mt-4 min-h-11 rounded-full px-4 text-sm font-bold text-[#1d1a17]/70 ring-1 ring-[#1d1a17]/15 transition hover:ring-[#1d1a17]/40"
                >
                  Annuler ma réservation
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Formules({ annoncer }: { annoncer: (texte: string) => void }) {
  return (
    <section id="formules" className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
      <EnTete sur="Nos formules" titre="Une formule pour chaque voisin." />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {FORMULES.map((formule) => (
          <article
            key={formule.nom}
            className={`relative flex flex-col rounded-3xl p-6 ${
              formule.vedette
                ? "bg-[#1d1a17] text-white shadow-[0_24px_60px_rgba(29,26,23,0.25)]"
                : "bg-white ring-1 ring-[#1d1a17]/8"
            }`}
          >
            {formule.vedette && (
              <span className="absolute -top-3 left-6 rounded-full bg-[#ff7a3d] px-3 py-1 text-[12px] font-extrabold text-[#1d1a17]">
                La plus choisie
              </span>
            )}
            <h3 style={display} className="m-0 text-[24px] font-extrabold tracking-[-0.02em]">
              {formule.nom}
            </h3>
            <p className="mb-0 mt-2 text-[34px] font-extrabold tracking-[-0.03em]">Gratuit</p>
            <p
              className={`mb-0 mt-2 flex-1 text-[15px] leading-relaxed ${
                formule.vedette ? "text-white/75" : "text-[#1d1a17]/70"
              }`}
            >
              {formule.texte}
            </p>
            <button
              type="button"
              onClick={() => annoncer("Excellent choix. C’est la même que les deux autres.")}
              className={`mt-6 min-h-12 rounded-full text-sm font-bold transition ${
                formule.vedette
                  ? "bg-[#ff7a3d] text-[#1d1a17] hover:bg-[#ff6a26]"
                  : "bg-[#1d1a17] text-white hover:bg-[#2e2a26]"
              }`}
            >
              Choisir cette formule
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function Boutique({
  ajouter,
  annoncer,
}: {
  ajouter: () => void;
  annoncer: (texte: string) => void;
}) {
  return (
    <section id="boutique" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <EnTete
          sur="La boutique"
          titre={"Tout pour survivre à 3\u00a0h\u00a047."}
          texte="Livraison offerte dans le quartier. Le coq, lui, ne livre que du bruit."
        />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {PRODUITS.map(({ nom, prix, texte, Icone, fond }) => {
            const surDevis = prix === "Sur devis";
            return (
              <article
                key={nom}
                className="flex flex-col rounded-3xl bg-[#fff6ea] p-3 ring-1 ring-[#1d1a17]/6 sm:p-4"
              >
                <div
                  className="grid aspect-square place-items-center rounded-2xl"
                  style={{ background: fond }}
                >
                  <Icone className="h-14 w-14 text-[#1d1a17]/80" strokeWidth={1.6} />
                </div>
                <h3 className="mb-0 mt-3 text-[15px] font-bold leading-snug">{nom}</h3>
                <p className="mb-0 mt-1 flex-1 text-[13px] leading-snug text-[#1d1a17]/60">
                  {texte}
                </p>
                <p className="mb-0 mt-3 text-[17px] font-extrabold">{prix}</p>
                <button
                  type="button"
                  onClick={
                    surDevis
                      ? () => annoncer("Bonne idée. Beaucoup de voisins y pensent.")
                      : ajouter
                  }
                  className="mt-3 min-h-11 rounded-full bg-[#1d1a17] px-3 text-[13px] font-bold text-white transition hover:bg-[#d7263d]"
                >
                  {surDevis ? "Demander un devis" : "Ajouter au panier"}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Etoiles({ note }: { note: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${note} étoile${note > 1 ? "s" : ""} sur 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${n <= note ? "fill-[#f5b83d] text-[#f5b83d]" : "text-[#1d1a17]/20"}`}
        />
      ))}
    </span>
  );
}

function Avis() {
  return (
    <section id="avis" className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <EnTete sur="Avis des voisins" titre="Ils en parlent mieux que nous." />
        <div className="rounded-3xl bg-white px-6 py-4 ring-1 ring-[#1d1a17]/8">
          <p className="m-0 flex items-baseline gap-2">
            <span style={display} className="text-[40px] font-extrabold leading-none">
              1,8
            </span>
            <span className="text-[15px] font-semibold text-[#1d1a17]/60">/ 5</span>
          </p>
          <div className="mt-2">
            <Etoiles note={2} />
          </div>
          <p className="mb-0 mt-1 text-[13px] text-[#1d1a17]/60">5 avis de voisins</p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {AVIS.map((avis) => (
          <article key={avis.auteur} className="rounded-3xl bg-white p-5 ring-1 ring-[#1d1a17]/8">
            <Etoiles note={avis.note} />
            <p className="mb-0 mt-3 text-[16px] leading-relaxed">«&nbsp;{avis.texte}&nbsp;»</p>
            <p className="mb-0 mt-3 text-[13px] font-bold text-[#1d1a17]/55">{avis.auteur}</p>
            {avis.reponse && (
              <div className="mt-4 rounded-2xl bg-[#fff6ea] px-4 py-3">
                <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#c2541f]">
                  Réponse du propriétaire
                </p>
                <p className="mb-0 mt-1 text-[15px] font-semibold">{avis.reponse}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function EspaceDuCoq() {
  const [refus, setRefus] = useState(0);

  return (
    <section id="espace" className="bg-[#1d1a17] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#ffb37a]">
            Son espace
          </p>
          <h2
            style={display}
            className="mb-0 mt-2 text-[clamp(2rem,7vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
          >
            Il gère tout lui-même.
          </h2>
          <p className="mb-0 mt-3 text-[16px] leading-relaxed text-white/70">
            Horaires, réservations, avis : le coq a son espace pour tout modifier quand il veut. Il
            ne l’a jamais fait.
          </p>
        </div>

        <div className="rounded-3xl bg-[#f7f4ef] p-4 text-[#1d1a17] shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white ring-1 ring-[#1d1a17]/8">
              <Coq className="h-10 w-10" ondes={false} />
            </span>
            <div>
              <p className="m-0 text-[17px] font-extrabold">Bonjour, le Coq</p>
              <p className="m-0 text-[13px] text-[#1d1a17]/55">Dernière connexion : jamais</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {[
              ["Chants aujourd’hui", "beaucoup"],
              ["Voisins réveillés", "tous"],
              ["Siestes", "0"],
              ["Avis lus", "aucun"],
            ].map(([nom, valeur]) => (
              <div key={nom} className="rounded-2xl bg-white p-3.5 ring-1 ring-[#1d1a17]/6">
                <p className="m-0 text-[12px] font-semibold text-[#1d1a17]/55">{nom}</p>
                <p className="m-0 mt-1 text-[20px] font-extrabold">{valeur}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-[#1d1a17]/6">
            <label htmlFor="premier-chant" className="flex items-center justify-between gap-3">
              <span className="text-[14px] font-bold">Heure du premier chant</span>
              <span className="flex items-center gap-1.5 text-[14px] font-extrabold tabular-nums">
                <Lock className="h-3.5 w-3.5 text-[#d7263d]" /> 3&nbsp;h&nbsp;47
              </span>
            </label>
            <input
              id="premier-chant"
              type="range"
              min={0}
              max={100}
              defaultValue={8}
              disabled
              className="mt-3 w-full accent-[#ff7a3d] opacity-60"
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <span>
                <span className="block text-[14px] font-bold">Mode silencieux</span>
                <span className="block text-[12px] font-semibold text-[#1d1a17]/50">
                  Indisponible pour ce coq
                </span>
              </span>
              <span className="relative h-6 w-11 shrink-0 rounded-full bg-[#1d1a17]/15">
                <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" />
              </span>
            </div>
          </div>

          <div key={refus} className={refus ? "coq-secoue" : ""}>
            <button
              type="button"
              onClick={() => setRefus((n) => n + 1)}
              className="mt-4 min-h-12 w-full rounded-full bg-[#1d1a17] text-[15px] font-bold text-white transition hover:bg-[#2e2a26]"
            >
              Modifier mes horaires
            </button>
            {refus > 0 && (
              <p className="mb-0 mt-3 rounded-xl bg-[#ffe9ec] px-4 py-3 text-center text-[14px] font-bold text-[#b3182f]">
                Modification refusée par le coq.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-16 sm:px-6">
      <EnTete sur="Questions fréquentes" titre="Vous vous posez des questions." />
      <div className="mt-8 grid gap-3">
        {QUESTIONS.map(([question, reponse]) => (
          <details key={question} className="group rounded-2xl bg-white ring-1 ring-[#1d1a17]/8">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-bold [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
            </summary>
            <p className="m-0 px-5 pb-5 text-[15px] leading-relaxed text-[#1d1a17]/70">{reponse}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [envoye, setEnvoye] = useState(false);

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <EnTete
            sur="Contact"
            titre="Une remarque ? Écrivez au coq."
            texte="Plaintes, suggestions, demandes de grasse matinée : toutes les demandes sont lues."
          />
          {envoye ? (
            <p className="mb-0 mt-6 rounded-2xl bg-[#e8f6ee] px-5 py-4 text-[15px] font-semibold leading-relaxed text-[#17663a]">
              Message bien reçu. Il a été lu par une poule. Elle ne répondra pas.
            </p>
          ) : (
            <form
              className="mt-6"
              onSubmit={(evenement) => {
                evenement.preventDefault();
                setEnvoye(true);
              }}
            >
              <label htmlFor="message-coq" className="text-sm font-bold">
                Votre message
              </label>
              <textarea
                id="message-coq"
                rows={4}
                placeholder="Il ne sait pas lire, mais allez-y."
                className="mt-2 w-full resize-none rounded-2xl border-0 bg-[#fff6ea] px-4 py-3 text-[16px] text-[#1d1a17] ring-1 ring-[#1d1a17]/12 outline-none placeholder:text-[#1d1a17]/40 focus:ring-2 focus:ring-[#ff7a3d]"
              />
              <button
                type="submit"
                className="mt-3 inline-flex min-h-12 items-center gap-2 rounded-full bg-[#ff7a3d] px-6 text-[15px] font-bold text-[#1d1a17] transition hover:bg-[#ff6a26]"
              >
                <Send className="h-4 w-4" /> Envoyer au coq
              </button>
            </form>
          )}
        </div>

        <div>
          <p className="m-0 text-[12px] font-extrabold uppercase tracking-[0.2em] text-[#c2541f]">
            Nous trouver
          </p>
          <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-3xl bg-[#e7efe1] ring-1 ring-[#1d1a17]/8">
            <div className="absolute inset-y-0 left-[38%] w-5 bg-white/90" />
            <div className="absolute inset-x-0 top-[58%] h-5 bg-white/90" />
            <div className="absolute inset-y-0 left-[78%] w-3 bg-white/70" />
            <div className="absolute right-[6%] top-[12%] h-[34%] w-[28%] rounded-xl bg-[#d3e4c8]" />
            <div className="absolute bottom-[8%] left-[6%] h-[24%] w-[26%] rounded-xl bg-[#d3e4c8]" />
            <Repere className="left-[46%] top-[30%] bg-[#2f5bd3]" nom="Votre chambre" />
            <Repere className="left-[54%] top-[44%] bg-[#d7263d]" nom="Le coq" />
          </div>
          <p className="mb-0 mt-3 flex items-center gap-2 text-[15px] font-semibold">
            <MapPin className="h-4 w-4 text-[#d7263d]" /> Dans la cour d’à côté. Juste sous votre
            fenêtre.
          </p>
        </div>
      </div>
    </section>
  );
}

function Repere({ className, nom }: { className: string; nom: string }) {
  return (
    <span
      className={`absolute flex -translate-x-1/2 -translate-y-full flex-col items-center ${className} rounded-full px-3 py-1.5 text-[12px] font-bold text-white shadow-lg`}
    >
      {nom}
    </span>
  );
}

function PiedDePage() {
  return (
    <footer className="bg-[#fff6ea]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Coq className="h-9 w-9" ondes={false} />
          <span style={display} className="text-[18px] font-extrabold">
            Le Coq du Voisin
          </span>
        </div>
        <p className="m-0 text-[13px] text-[#1d1a17]/60">
          Réveil naturel depuis 2023. Tous droits réservés, surtout celui de chanter.
        </p>
      </div>
    </footer>
  );
}

function LeVotre() {
  return (
    <section className="relative overflow-hidden bg-[#0d1715] text-[#f7f7ef]">
      <div className="gws-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:px-6 sm:py-20">
        <p className="m-0 text-[13px] font-black uppercase tracking-[0.2em] text-[#54d7c8]">
          Ce site est une blague
        </p>
        <h2 className="mb-0 mt-4 font-display text-[clamp(2.1rem,8vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.045em]">
          Le vôtre peut être sérieux.
        </h2>
        <p className="mx-auto mb-0 mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">
          Horaires en direct, réservation en ligne, boutique, avis, espace pour tout gérer : tout ce
          que vous venez de voir, nous le faisons pour de vrais commerces.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/demo-gratuite"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#54d7c8] px-7 text-[15px] font-extrabold text-[#0d1715] no-underline transition hover:bg-[#f7f7ef]"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/realisations"
            className="inline-flex min-h-13 items-center justify-center rounded-full px-7 text-[15px] font-bold text-white no-underline ring-1 ring-white/25 transition hover:ring-white/60"
          >
            Voir de vrais sites
          </Link>
        </div>
        <p className="mb-0 mt-6 text-[14px] text-white/60">
          Démonstration à vos couleurs, sans engagement : vous voyez votre site avant de payer.
        </p>
        <p className="mb-0 mt-10 text-[13px] text-white/50">
          Site imaginé par{" "}
          <Link to="/" className="font-bold text-[#54d7c8] no-underline hover:underline">
            Gwada Web Studio
          </Link>
        </p>
      </div>
    </section>
  );
}

function Coq({ className, ondes = true }: { className?: string; ondes?: boolean }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true">
      {ondes && (
        <g className="coq-ondes" fill="none" stroke="#ffe08a" strokeLinecap="round" strokeWidth="5">
          <path d="M46 34 Q36 48 46 62" />
          <path d="M32 24 Q16 48 32 72" />
          <path d="M18 14 Q-4 48 18 82" />
        </g>
      )}
      <g className={ondes ? "coq-hoche" : undefined}>
        <g fill="none" strokeLinecap="round">
          <path d="M132 112 C152 56 200 50 198 104" stroke="#14403d" strokeWidth="14" />
          <path d="M130 122 C164 82 214 98 190 142" stroke="#1f5c57" strokeWidth="12" />
          <path d="M126 132 C158 118 194 138 170 164" stroke="#2d7a72" strokeWidth="11" />
        </g>
        <g fill="none" stroke="#f5b83d" strokeLinecap="round" strokeWidth="5">
          <path d="M104 148 L100 180 M100 180 L89 184 M100 180 L107 186" />
          <path d="M122 148 L126 180 M126 180 L115 184 M126 180 L134 185" />
        </g>
        <path
          fill="#b8471f"
          d="M82 44 C94 44 101 54 99 66 C105 82 119 92 137 98 C152 104 154 129 143 141 C131 155 108 159 92 151 C72 141 61 121 66 102 C69 90 72 82 70 74 C66 66 66 52 74 47 C76 45 79 44 82 44 Z"
        />
        <path
          fill="#f0a63a"
          d="M76 60 C86 64 99 66 101 75 C108 89 104 102 92 106 C80 102 71 89 70 75 C70 68 72 63 76 60 Z"
        />
        <path fill="#7a2a12" d="M100 114 C116 101 141 107 143 125 C129 134 110 134 100 125 Z" />
        <path
          fill="#e0283f"
          d="M73 47 C68 37 77 30 82 38 C82 27 93 25 93 37 C97 29 106 33 99 46 Z"
        />
        <path fill="#f5b83d" d="M71 50 L52 42 L70 56 Z" />
        <path fill="#e9a52c" d="M70 58 L54 60 L72 63 Z" />
        <ellipse cx="72" cy="69" rx="4.5" ry="8" fill="#e0283f" />
        <circle cx="83" cy="53" r="3.4" fill="#fff6ea" />
        <circle cx="82.4" cy="53.2" r="1.8" fill="#1d1a17" />
      </g>
    </svg>
  );
}
