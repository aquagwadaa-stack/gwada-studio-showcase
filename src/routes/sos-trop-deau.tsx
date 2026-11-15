import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  AlarmClock,
  ArrowRight,
  ChevronDown,
  Droplet,
  MapPin,
  Search,
  Send,
  ShowerHead,
  Star,
  Sun,
  TriangleAlert,
} from "lucide-react";

// Site parodique pour les vidéos du studio : hors menu, hors plan du site, invisible pour Google.
// Un service d'urgence pour ceux qui ont « trop d'eau » : suivi en direct, bulletin, signalement,
// avis. La blague porte sur la situation, sans citer personne, et finit sur la démo gratuite.

const SITE = "https://gwadawebstudio.fr";
const POLICE =
  "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap";
const ICONE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%92%A7%3C/text%3E%3C/svg%3E";
const PARTAGE = `${SITE}/sos-trop-deau-partage.jpg`;
const ACCROCHE = "Trop d’eau ? On arrive.";

export const Route = createFileRoute("/sos-trop-deau")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "SOS Trop d’Eau — Trop d’eau ? On arrive." },
      {
        name: "description",
        content:
          "Le premier service d’urgence des Antilles pour ceux qui ont trop d’eau. 24 h/24. Dernière intervention : jamais.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#07235c" },
      { property: "og:title", content: "SOS Trop d’Eau" },
      {
        property: "og:description",
        content: `${ACCROCHE} Le premier service d’urgence des Antilles pour ceux qui ont trop d’eau.`,
      },
      { property: "og:url", content: `${SITE}/sos-trop-deau` },
      { property: "og:image", content: PARTAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `SOS Trop d’Eau : ${ACCROCHE}` },
      { name: "twitter:title", content: "SOS Trop d’Eau" },
      { name: "twitter:description", content: ACCROCHE },
      { name: "twitter:image", content: PARTAGE },
    ],
    links: [
      { rel: "stylesheet", href: POLICE },
      { rel: "icon", type: "image/svg+xml", href: ICONE },
    ],
  }),
  component: SosTropDEau,
});

const display = { fontFamily: '"Barlow Condensed", "Arial Narrow", Arial, sans-serif' };

const INTERVENTIONS = [
  {
    nom: "Robinet qui coule sans arrêt",
    texte: "On vient le refermer. Promis.",
    Icone: Droplet,
  },
  {
    nom: "Douche avec trop de pression",
    texte: "On vous la remet en mode filet d’eau.",
    Icone: ShowerHead,
  },
  {
    nom: "Eau en pleine journée",
    texte: "Ce n’est pas normal. On vient vérifier.",
    Icone: Sun,
  },
  {
    nom: "Eau trop transparente",
    texte: "On ouvre une enquête.",
    Icone: Search,
  },
];

const SUIVI = [
  ["Appels en attente", "0"],
  ["Techniciens disponibles", "12 sur 12"],
  ["Interventions cette année", "0"],
];

const SEMAINE = ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."];

const LIEUX = ["Cuisine", "Salle de bain", "Jardin", "Partout"];
const DUREES = ["5 minutes", "1 heure", "Depuis ce matin", "Depuis toujours"];

const QUESTIONS = [
  [
    "C’est quoi, trop d’eau ?",
    "Quand elle coule plus de 5 minutes d’affilée. D’après nos archives, ce n’est jamais arrivé.",
  ],
  [
    "Vous venez aussi quand il n’y a pas d’eau ?",
    "Non. Nous, c’est le trop. Pour le pas assez, on est comme vous : on attend.",
  ],
  [
    "Combien coûte une intervention ?",
    "C’est gratuit. On n’a jamais eu l’occasion de faire une facture.",
  ],
  ["Vous recrutez ?", "Non. Nos 12 techniciens s’ennuient déjà assez."],
];

const NAVIGATION = [
  ["#interventions", "Interventions"],
  ["#suivi", "En direct"],
  ["#bulletin", "Bulletin"],
  ["#avis", "Avis"],
  ["#questions", "Questions"],
];

const STYLES = `
@keyframes eau-gyro { 0%, 100% { opacity: .08 } 50% { opacity: .55 } }
@keyframes eau-secoue { 0%, 100% { transform: translateX(0) } 20%, 60% { transform: translateX(-6px) } 40%, 80% { transform: translateX(6px) } }
@keyframes eau-goutte { 0% { transform: translateY(-14px); opacity: 0 } 25% { opacity: 1 } 100% { transform: translateY(26px); opacity: 0 } }
.eau-gyro { animation: eau-gyro 1.1s ease-in-out infinite; }
.eau-gyro-2 { animation: eau-gyro 1.1s ease-in-out infinite .55s; }
.eau-secoue { animation: eau-secoue .45s ease-in-out; }
.eau-goutte { animation: eau-goutte 2.4s ease-in infinite; }
.eau-chevrons { background-image: repeating-linear-gradient(-45deg, #ffd60a 0 16px, #0c1b33 16px 32px); }
.eau-page :focus-visible { outline: 3px solid #ffd60a; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) {
  .eau-gyro, .eau-gyro-2, .eau-secoue, .eau-goutte { animation: none !important; }
}
`;

function SosTropDEau() {
  return (
    <div className="eau-page min-h-svh bg-[#f2f6fd] text-[#0c1b33] [overflow-wrap:anywhere]">
      <style>{STYLES}</style>

      <p className="m-0 bg-[#ffd60a] px-4 py-2 text-center text-[13px] font-bold leading-snug text-[#0c1b33]">
        Vigilance trop d’eau&nbsp;: verte. Depuis toujours.
      </p>

      <Entete />

      <main>
        <Accueil />
        <Interventions />
        <Suivi />
        <Bulletin />
        <Avis />
        <Signaler />
        <Questions />
        <Zone />
      </main>

      <PiedDePage />
      <LeVotre />
    </div>
  );
}

function Entete() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#0c1b33]/10 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <a href="#accueil" className="flex min-w-0 items-center gap-2.5 no-underline">
          <Logo className="h-10 w-10 shrink-0" />
          <span className="flex flex-col leading-none">
            <span
              style={display}
              className="whitespace-nowrap text-[22px] font-extrabold tracking-[-0.01em] text-[#0c1b33]"
            >
              SOS Trop d’Eau
            </span>
            <span className="mt-0.5 whitespace-nowrap text-[11px] font-bold text-[#0b4fd6]">
              Urgence 24&nbsp;h/24
            </span>
          </span>
        </a>
        <nav aria-label="Menu" className="ml-auto hidden items-center gap-6 lg:flex">
          {NAVIGATION.map(([lien, nom]) => (
            <a
              key={lien}
              href={lien}
              className="text-sm font-semibold text-[#0c1b33]/75 no-underline transition hover:text-[#0b4fd6]"
            >
              {nom}
            </a>
          ))}
        </nav>
        <a
          href="#signaler"
          className="ml-auto inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-[#0b4fd6] px-4 text-sm font-bold text-white no-underline transition hover:bg-[#083fae] lg:ml-0"
        >
          <TriangleAlert className="h-4 w-4" /> Signaler
        </a>
      </div>
    </header>
  );
}

function Accueil() {
  return (
    <section id="accueil" className="relative overflow-hidden bg-[#07235c] text-white">
      <div className="relative mx-auto grid max-w-6xl gap-4 px-5 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:pt-16">
        <div className="lg:pb-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-[13px] font-bold ring-1 ring-white/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc84] opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3ddc84]" />
            </span>
            0 intervention en cours
          </span>
          <h1
            style={display}
            className="mb-0 mt-5 text-[clamp(3.4rem,19.5vw,7.5rem)] font-extrabold leading-[0.84] tracking-[-0.015em]"
          >
            <span className="block whitespace-nowrap">Trop d’eau&nbsp;?</span>{" "}
            <span className="block text-[#ffd60a]">On arrive.</span>
          </h1>
          <p className="mb-0 mt-5 max-w-xl text-[17px] leading-relaxed text-white/85">
            Le premier service d’urgence des Antilles pour ceux qui ont trop d’eau.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#signaler"
              className="inline-flex min-h-13 items-center gap-2 rounded-full bg-[#ffd60a] px-6 text-[15px] font-extrabold text-[#0c1b33] no-underline shadow-[0_14px_34px_rgba(255,214,10,0.3)] transition hover:bg-white"
            >
              <TriangleAlert className="h-5 w-5" /> Signaler un excès d’eau
            </a>
            <a
              href="#interventions"
              className="inline-flex min-h-13 items-center rounded-full px-6 text-[15px] font-bold text-white no-underline ring-1 ring-white/35 transition hover:ring-white/70"
            >
              Nos interventions
            </a>
          </div>
          <ul className="m-0 mt-7 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-[13px] font-semibold text-white/75">
            <li>24&nbsp;h/24, 7&nbsp;j/7</li>
            <li>Guadeloupe et Martinique</li>
            <li>Déplacement gratuit</li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[27rem] pt-2 lg:max-w-[31rem]">
          <Camionnette className="relative w-full" />
        </div>
      </div>
      <div className="eau-chevrons h-4" />
    </section>
  );
}

function EnTete({ titre, texte }: { titre: string; texte?: string }) {
  return (
    <div className="max-w-2xl">
      <h2
        style={display}
        className="m-0 text-[clamp(2.5rem,11vw,3.9rem)] font-extrabold leading-[0.92] tracking-[-0.01em]"
      >
        {titre}
      </h2>
      {texte && <p className="mb-0 mt-3 text-[16px] leading-relaxed text-[#0c1b33]/70">{texte}</p>}
    </div>
  );
}

function Interventions() {
  return (
    <section id="interventions" className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
      <EnTete
        titre="Tout ce qui coule trop, on s’en occupe."
        texte="Quatre urgences reviennent tout le temps. Enfin, reviendraient."
      />
      <ul className="m-0 mt-7 grid list-none gap-3 p-0 md:grid-cols-2">
        {INTERVENTIONS.map(({ nom, texte, Icone }) => (
          <li
            key={nom}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(7,35,92,0.07)] ring-1 ring-[#0c1b33]/6"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#e3edff] text-[#0b4fd6]">
              <Icone className="h-7 w-7" />
            </span>
            <span className="min-w-0">
              <span style={display} className="block text-[25px] font-bold leading-[1.02]">
                {nom}
              </span>
              <span className="mt-1 block text-[14.5px] leading-snug text-[#0c1b33]/70">
                {texte}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Suivi() {
  return (
    <section id="suivi" className="bg-[#0c1b33] text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p
              style={display}
              className="m-0 text-[clamp(5.4rem,27vw,9rem)] font-extrabold leading-[0.8] tracking-[-0.02em] text-[#ffd60a]"
            >
              24&nbsp;h/24
            </p>
            <h2
              style={display}
              className="mb-0 mt-3 text-[clamp(2.1rem,9vw,3rem)] font-bold leading-[0.95]"
            >
              On intervient jour et nuit.
            </h2>
          </div>

          <div className="rounded-3xl bg-white/[0.06] p-2 ring-1 ring-white/10">
            <p className="m-0 flex items-center gap-2 px-4 pb-2 pt-3 text-[13px] font-bold text-white/60">
              <span className="h-2 w-2 rounded-full bg-[#3ddc84]" /> Centre d’appels, en direct
            </p>
            <dl className="m-0">
              {SUIVI.map(([nom, valeur]) => (
                <div
                  key={nom}
                  className="flex items-baseline justify-between gap-4 border-t border-white/10 px-4 py-3.5"
                >
                  <dt className="text-[15px] font-semibold text-white/75">{nom}</dt>
                  <dd
                    style={display}
                    className="m-0 text-[30px] font-bold leading-none tabular-nums"
                  >
                    {valeur}
                  </dd>
                </div>
              ))}
              <div
                id="derniere"
                className="mt-1 flex items-baseline justify-between gap-4 rounded-2xl bg-[#ffd60a] px-4 py-4 text-[#0c1b33]"
              >
                <dt className="text-[15px] font-extrabold">Dernière intervention</dt>
                <dd style={display} className="m-0 text-[38px] font-extrabold leading-none">
                  Jamais
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bulletin() {
  return (
    <section id="bulletin" className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
      <EnTete titre="Prochain risque de trop d’eau" />
      <div className="mt-7 overflow-hidden rounded-3xl bg-white shadow-[0_18px_44px_rgba(7,35,92,0.1)] ring-1 ring-[#0c1b33]/6 lg:max-w-3xl">
        <p className="m-0 flex items-center gap-2 bg-[#1f9d55] px-5 py-2.5 text-[13px] font-extrabold text-white">
          <span className="h-2.5 w-2.5 rounded-full bg-white" /> Bulletin de vigilance&nbsp;: vert
        </p>
        <div className="px-5 pb-5 pt-5">
          <p
            style={display}
            className="m-0 text-[clamp(4.4rem,22vw,6.5rem)] font-extrabold leading-[0.82] tracking-[-0.015em] text-[#0b4fd6]"
          >
            Mardi
          </p>
          <p style={display} className="mb-0 mt-2 text-[34px] font-bold leading-none">
            2&nbsp;h&nbsp;00 du matin
          </p>
          <p className="mb-0 mt-4 inline-flex items-center gap-2 rounded-full bg-[#e3edff] px-4 py-2 text-[15px] font-extrabold text-[#07235c]">
            <AlarmClock className="h-4 w-4" /> Durée prévue&nbsp;: 5 minutes
          </p>

          <ol className="m-0 mt-6 grid list-none grid-cols-7 gap-1.5 p-0 text-center">
            {SEMAINE.map((jour) => {
              const risque = jour === "mar.";
              return (
                <li
                  key={jour}
                  className={`rounded-xl px-0.5 pb-2 pt-2 ${
                    risque ? "bg-[#0b4fd6] text-white" : "bg-[#f2f6fd] text-[#0c1b33]/55"
                  }`}
                >
                  <span className="block text-[12px] font-bold">{jour}</span>
                  <span className="mt-1 grid h-6 place-items-center">
                    {risque ? (
                      <Droplet className="h-5 w-5 fill-[#7fd4ff] text-[#7fd4ff]" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0c1b33]/25" />
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          <p className="mb-0 mt-5 text-[15px] leading-relaxed text-[#0c1b33]/75">
            Notre conseil&nbsp;: mettez un réveil et sortez les bassines.
          </p>
        </div>
      </div>
    </section>
  );
}

function Avis() {
  const [essais, setEssais] = useState(0);
  return (
    <section id="avis" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <EnTete titre="Avis clients" />
        <div className="mt-4 flex items-center gap-3">
          <span className="flex gap-1" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((n) => (
              <Star key={n} className="h-7 w-7 text-[#0c1b33]/25" />
            ))}
          </span>
          <span style={display} className="text-[30px] font-bold leading-none">
            0 avis
          </span>
        </div>

        <div
          key={essais}
          className={`mt-6 rounded-3xl border-2 border-dashed border-[#0c1b33]/20 bg-[#f2f6fd] p-6 lg:max-w-3xl ${
            essais ? "eau-secoue" : ""
          }`}
        >
          <p style={display} className="m-0 text-[32px] font-bold leading-[0.98]">
            Aucun avis pour le moment.
          </p>
          <p className="mb-0 mt-2 text-[16px] leading-relaxed text-[#0c1b33]/75">
            Bizarrement, personne n’a jamais eu le problème.
          </p>
          {essais > 0 ? (
            <p
              role="status"
              className="mb-0 mt-5 rounded-xl bg-[#ffe6e3] px-4 py-3 text-[14.5px] font-bold text-[#b3261e]"
            >
              Avis refusé&nbsp;: il faut d’abord avoir eu trop d’eau.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setEssais((n) => n + 1)}
              className="mt-5 min-h-12 rounded-full bg-[#0c1b33] px-5 text-[15px] font-bold text-white transition hover:bg-[#0b4fd6]"
            >
              Laisser le premier avis
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Choix({
  nom,
  options,
  valeur,
  choisir,
}: {
  nom: string;
  options: string[];
  valeur: string;
  choisir: (v: string) => void;
}) {
  return (
    <fieldset className="m-0 min-w-0 border-0 p-0">
      <legend className="p-0 text-[15px] font-extrabold">{nom}</legend>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={valeur === option}
            onClick={() => choisir(option)}
            className={`min-h-11 rounded-full px-4 text-[14px] font-bold transition ${
              valeur === option
                ? "bg-[#0b4fd6] text-white"
                : "bg-white text-[#0c1b33] ring-1 ring-[#0c1b33]/15 hover:ring-[#0b4fd6]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function Signaler() {
  const [lieu, setLieu] = useState(LIEUX[0]);
  const [duree, setDuree] = useState(DUREES[3]);
  const [envois, setEnvois] = useState(0);

  return (
    <section id="signaler" className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
      <EnTete titre="Signaler un excès d’eau" texte="Réponse immédiate. On n’a que ça à faire." />
      <div className="mt-7 grid gap-6 rounded-3xl bg-[#e3edff] p-5 sm:p-7 lg:max-w-3xl">
        <Choix nom="Où ça coule trop ?" options={LIEUX} valeur={lieu} choisir={setLieu} />
        <Choix nom="Depuis quand ?" options={DUREES} valeur={duree} choisir={setDuree} />
        <button
          type="button"
          onClick={() => setEnvois((n) => n + 1)}
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#0b4fd6] px-6 text-[15px] font-extrabold text-white transition hover:bg-[#083fae]"
        >
          <Send className="h-4 w-4" /> Envoyer mon signalement
        </button>

        {envois > 0 && (
          <div
            key={envois}
            role="status"
            className="eau-secoue rounded-2xl bg-white p-5 ring-1 ring-[#b3261e]/25"
          >
            <p className="m-0 flex items-center gap-2 text-[15px] font-extrabold text-[#b3261e]">
              <TriangleAlert className="h-5 w-5" /> Signalement refusé
            </p>
            <p className="mb-0 mt-2 text-[16px] leading-relaxed">
              {envois === 1
                ? `Nos capteurs ne détectent aucune eau dans votre ${lieu === "Partout" ? "logement" : lieu.toLowerCase()}.`
                : "Toujours rien. On est comme vous : on attend."}
            </p>
            <p className="mb-0 mt-4 flex items-center gap-3 text-[14px] font-bold text-[#0c1b33]/70">
              <span className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full bg-[#e3edff]">
                <Droplet className="eau-goutte h-4 w-4 fill-[#0b4fd6] text-[#0b4fd6]" />
              </span>
              Débit mesuré&nbsp;: 1 goutte par heure.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section id="questions" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        <EnTete titre="On nous demande souvent" />
        <div className="mt-6 grid gap-2.5 lg:max-w-3xl">
          {QUESTIONS.map(([question, reponse]) => (
            <details key={question} className="group rounded-2xl bg-[#f2f6fd] px-5 py-1">
              <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-bold [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[#0b4fd6] transition group-open:rotate-180" />
              </summary>
              <p className="mb-0 mt-0 pb-4 text-[15.5px] leading-relaxed text-[#0c1b33]/75">
                {reponse}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Zone() {
  return (
    <section id="zone" className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
      <EnTete titre="Zone d’intervention" />
      <p className="mb-0 mt-4 flex max-w-2xl items-start gap-3 text-[17px] leading-relaxed">
        <MapPin className="mt-1 h-5 w-5 shrink-0 text-[#0b4fd6]" />
        <span>
          Guadeloupe et Martinique. Partout où il y a trop d’eau. Pour l’instant&nbsp;: nulle part.
        </span>
      </p>
    </section>
  );
}

function PiedDePage() {
  return (
    <footer className="border-t border-[#0c1b33]/10 bg-[#f2f6fd]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-9 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span style={display} className="text-[22px] font-extrabold">
            SOS Trop d’Eau
          </span>
        </div>
        <p className="m-0 text-[13px] text-[#0c1b33]/60">
          Service d’urgence. Toujours prêt, jamais dérangé.
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
          L’eau, on n’y peut rien. Votre site, si.
        </h2>
        <p className="mx-auto mb-0 mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">
          Un suivi en direct, un formulaire, des avis, un espace pour tout gérer&nbsp;: tout ce que
          vous venez de voir, nous le faisons pour de vrais commerces.
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
          Démonstration à vos couleurs, sans engagement&nbsp;: vous voyez votre site avant de payer.
        </p>
        <p className="mx-auto mb-0 mt-8 max-w-xl text-[14px] leading-relaxed text-white/60">
          On en rit parce qu’on le vit. Courage à tous ceux qui remplissent leurs bidons ce soir.
        </p>
        <p className="mb-0 mt-8 text-[13px] text-white/50">
          Site imaginé par{" "}
          <Link to="/" className="font-bold text-[#54d7c8] no-underline hover:underline">
            Gwada Web Studio
          </Link>
        </p>
      </div>
    </section>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="23" fill="#0b4fd6" />
      <circle cx="24" cy="24" r="17.5" fill="none" stroke="#ffd60a" strokeWidth="5" />
      <g stroke="#0b4fd6" strokeWidth="5">
        <path d="M24 3 V10 M24 38 V45 M3 24 H10 M38 24 H45" />
      </g>
      <path
        fill="#fff"
        d="M24 12.5 C28 18 31.5 22 31.5 26.5 A7.5 7.5 0 0 1 16.5 26.5 C16.5 22 20 18 24 12.5 Z"
      />
    </svg>
  );
}

function Camionnette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 214"
      className={className}
      role="img"
      aria-label="La camionnette de SOS Trop d’Eau"
    >
      <ellipse cx="190" cy="197" rx="172" ry="9" fill="#041a47" />
      <circle className="eau-gyro" cx="207" cy="20" r="26" fill="#35c2ff" opacity=".3" />
      <circle className="eau-gyro-2" cx="231" cy="20" r="26" fill="#9be1ff" opacity=".3" />
      <rect x="190" y="27" width="58" height="13" rx="4" fill="#c9d5e8" />
      <rect x="196" y="12" width="21" height="17" rx="6" fill="#35c2ff" />
      <rect x="221" y="12" width="21" height="17" rx="6" fill="#9be1ff" />
      <path
        fill="#ffffff"
        d="M40 38 H258 Q271 38 279 49 L307 92 L346 100 Q360 103 360 117 V160 Q360 170 350 170 H32 Q22 170 22 160 V56 Q22 38 40 38 Z"
      />
      <path fill="#cfe6ff" d="M250 52 H258 Q264 52 268 58 L291 94 H250 Z" />
      <path fill="none" stroke="#0c1b33" strokeOpacity=".16" strokeWidth="2" d="M240 46 V168" />
      <rect x="22" y="118" width="338" height="26" fill="#0b4fd6" />
      <g fill="#ffd60a">
        <rect x="22" y="118" width="26" height="26" />
        <rect x="74" y="118" width="26" height="26" />
        <rect x="126" y="118" width="26" height="26" />
        <rect x="178" y="118" width="26" height="26" />
        <rect x="230" y="118" width="26" height="26" />
        <rect x="282" y="118" width="26" height="26" />
        <rect x="334" y="118" width="26" height="26" />
      </g>
      <g transform="translate(44 50)">
        <circle cx="26" cy="26" r="25" fill="#0b4fd6" />
        <circle cx="26" cy="26" r="19" fill="none" stroke="#ffd60a" strokeWidth="5" />
        <path
          fill="#fff"
          d="M26 13 C30 19 34 23.5 34 28.5 A8 8 0 0 1 18 28.5 C18 23.5 22 19 26 13 Z"
        />
      </g>
      <text
        x="104"
        y="74"
        fill="#0b4fd6"
        fontFamily='"Barlow Condensed", "Arial Narrow", Arial, sans-serif'
        fontWeight="800"
        fontSize="34"
        letterSpacing=".5"
      >
        SOS
      </text>
      <text
        x="104"
        y="102"
        fill="#0c1b33"
        fontFamily='"Barlow Condensed", "Arial Narrow", Arial, sans-serif'
        fontWeight="800"
        fontSize="27"
        letterSpacing=".3"
      >
        TROP D’EAU
      </text>
      <rect x="252" y="102" width="16" height="5" rx="2.5" fill="#0c1b33" opacity=".5" />
      <rect x="346" y="103" width="12" height="12" rx="3" fill="#ffd60a" />
      <circle cx="92" cy="172" r="33" fill="#07235c" />
      <circle cx="292" cy="172" r="33" fill="#07235c" />
      <rect x="18" y="160" width="346" height="12" rx="6" fill="#0c1b33" />
      <circle cx="92" cy="172" r="25" fill="#0c1b33" />
      <circle cx="92" cy="172" r="11" fill="#c9d5e8" />
      <circle cx="292" cy="172" r="25" fill="#0c1b33" />
      <circle cx="292" cy="172" r="11" fill="#c9d5e8" />
    </svg>
  );
}
