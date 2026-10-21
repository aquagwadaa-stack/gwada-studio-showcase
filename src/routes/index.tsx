import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronRight,
  CircleCheck,
  ExternalLink,
  Globe2,
  LayoutDashboard,
  MousePointer2,
  Quote,
  Sparkles,
  Star,
  Wifi,
  Workflow,
} from "lucide-react";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Des sites web qui donnent envie de vous choisir" },
      {
        name: "description",
        content:
          "Création de sites web sur mesure en Guadeloupe. Découvrez nos réalisations, sites de réservation, outils métier et solutions NFC. Parlons de votre projet.",
      },
      {
        property: "og:title",
        content: "Gwada Web Studio — Donnez une autre dimension à votre image.",
      },
      {
        property: "og:description",
        content:
          "Sites web sur mesure, expériences digitales et outils métier conçus avec soin en Guadeloupe. Découvrez nos projets.",
      },
    ],
  }),
  component: HomePage,
});

const projects = [
  {
    title: "Crystal Beach Courbaril",
    type: "Location saisonnière",
    description: "Une expérience élégante pour découvrir un appartement et réserver plus facilement.",
    tags: ["Site vitrine", "Réservation directe"],
    url: "https://crystalbeachcourbaril.fr/",
    domain: "crystalbeachcourbaril.fr",
    theme: "beach",
  },
  {
    title: "Dr Aubry",
    type: "Cabinet médical",
    description: "Une présence professionnelle, claire et accessible pour les patients.",
    tags: ["Site professionnel", "Contenus administrables"],
    url: "https://docaubry.fr/",
    domain: "docaubry.fr",
    theme: "medical",
  },
  {
    title: "Kafé Céramik",
    type: "Loisirs & expérience",
    description: "Un univers chaleureux pensé pour présenter l'activité et faciliter les réservations.",
    tags: ["Identité digitale", "Réservations"],
    url: null,
    domain: "Projet client",
    theme: "ceramic",
  },
] as const;

const services = [
  {
    icon: Globe2,
    number: "01",
    eyebrow: "Votre vitrine digitale",
    title: "Sites web",
    description:
      "Un site à votre image, aussi agréable à découvrir que simple à utiliser. Vitrine, catalogue, réservation ou paiement.",
    href: "/sites-web",
    color: "#54d7c8",
    link: "Créer mon site",
  },
  {
    icon: LayoutDashboard,
    number: "02",
    eyebrow: "Votre quotidien simplifié",
    title: "Outils métier",
    description:
      "Des interfaces pratiques pour gérer vos clients, vos réservations et vos tâches sans multiplier les outils.",
    href: "/outils-metier",
    color: "#a3a8ff",
    link: "Découvrir les outils",
  },
  {
    icon: Wifi,
    number: "03",
    eyebrow: "Votre réputation en ligne",
    title: "Cartes NFC",
    description:
      "Un geste suffit pour diriger vos clients vers vos avis Google grâce à une carte NFC et un QR code.",
    href: "/cartes-nfc",
    color: "#ffae96",
    link: "Découvrir les cartes",
  },
] as const;

const testimonials = [
  {
    name: "Jean-Jacques Aubry",
    role: "Site professionnel · docaubry.fr",
    initial: "J",
    text:
      "J’ai confié la création de mon site professionnel à Gwada Web Studio et le résultat est tout à fait conforme à ce que j’attendais. Les échanges ont été simples et efficaces, avec une bonne compréhension des besoins liés à mon activité. Je suis très satisfait du travail réalisé et du sérieux dont il a fait preuve.",
  },
  {
    name: "Appart Courbaril",
    role: "Site de location · crystalbeachcourbaril.fr",
    initial: "A",
    text:
      "J’ai fait appel à Gwada Web Studio pour la création du site internet de mon appartement, et je suis vraiment très contente du résultat ! Il a été à l’écoute de mes attentes, très professionnel et a su parfaitement s’adapter à mon activité et à ses spécificités. Le site correspond tout à fait à ce que je souhaitais, et je suis ravie du résultat. Un grand merci pour son travail et son sérieux, je recommande sans hésiter !",
  },
] as const;

function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0d1715] text-[#f7f7ef]">
      <Hero />
      <ValueRibbon />
      <Portfolio />
      <Difference />
      <Services />
      <Reviews />
      <Process />
      <FinalCta />
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={"inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.19em] " + (light ? "text-[#60716b]" : "text-[#54d7c8]")}>
      <span className={"h-1.5 w-1.5 rounded-full " + (light ? "bg-[#168577]" : "bg-[#54d7c8]")} aria-hidden="true" />
      {children}
    </span>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="gws-grid pointer-events-none absolute inset-0 -z-20 opacity-55" />
      <div className="pointer-events-none absolute left-[-19rem] top-8 -z-10 h-[38rem] w-[38rem] rounded-full bg-[#54d7c8]/12 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-18rem] top-0 -z-10 h-[38rem] w-[38rem] rounded-full bg-[#5b7cfa]/16 blur-[130px]" />

      <div className="mx-auto grid min-h-[min(850px,88svh)] max-w-[1440px] items-center gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-6 lg:px-12 lg:pb-24 lg:pt-20">
        <div className="relative z-10">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#54d7c8]/25 bg-[#54d7c8]/[0.07] px-4 py-2.5 text-[11px] font-bold tracking-wide text-[#b9f7e9]">
            <span className="relative mr-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#54d7c8] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#54d7c8]" />
            </span>
            Studio web indépendant · Guadeloupe
          </div>

          <h1 className="max-w-[800px] font-display text-[clamp(3.25rem,6.1vw,6.55rem)] font-extrabold leading-[.98] tracking-[-.073em]">
            Le site que
            <br />
            <span className="relative inline-block text-[#54d7c8]">
              vos clients
              <svg className="absolute -bottom-3 left-0 w-full opacity-70" viewBox="0 0 435 24" preserveAspectRatio="none" aria-hidden="true">
                <path d="M5 16 Q205 -1 429 12" stroke="#54d7c8" strokeWidth="6" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            n’oublieront pas.
          </h1>

          <p className="mt-9 max-w-[590px] text-base leading-[1.85] text-white/65 sm:text-lg">
            Une première impression peut tout changer. Je crée des sites web sur mesure qui
            mettent votre activité en valeur et donnent envie à vos visiteurs de passer à l’action.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/contact"
              className="gws-button-primary group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-sm font-black"
              data-cta="home-hero-project"
            >
              Parlons de votre projet
              <ArrowUpRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href="#realisations"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.035] px-7 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/[0.075]"
              data-cta="home-hero-projects"
            >
              Découvrir mes réalisations
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/10 pt-7 text-xs font-medium text-white/55">
            <span className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-[#54d7c8]" /> Design sur mesure</span>
            <span className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-[#54d7c8]" /> Adapté au mobile</span>
            <span className="flex items-center gap-2"><CircleCheck className="h-4 w-4 text-[#54d7c8]" /> Contact direct</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[650px] lg:max-w-none" aria-label="Illustration d'un site web haut de gamme">
          <div className="gws-display-orbit absolute left-1/2 top-1/2 -z-10 aspect-square w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.09]" />
          <div className="gws-display-orbit absolute left-1/2 top-1/2 -z-10 aspect-square w-[83%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#54d7c8]/[0.11]" />
          <div className="gws-hero-device relative overflow-hidden rounded-[1.9rem] border border-white/20 bg-[#182923] p-2 shadow-[0_40px_110px_rgba(0,0,0,.44)] sm:rounded-[2.2rem] sm:p-3">
            <div className="overflow-hidden rounded-[1.35rem] bg-[#fbf8f0] text-[#18352d] sm:rounded-[1.55rem]">
              <div className="flex h-11 items-center justify-between gap-3 border-b border-[#dedfd7] bg-white px-4 sm:px-6">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ff9187]" />
                  <span className="h-2 w-2 rounded-full bg-[#ffce71]" />
                  <span className="h-2 w-2 rounded-full bg-[#8addbf]" />
                </div>
                <span className="max-w-[60%] truncate rounded-full bg-[#f1f3ee] px-4 py-1 text-[10px] font-semibold text-[#7b8a80]">votre-entreprise.fr</span>
                <MousePointer2 className="h-3.5 w-3.5 text-[#9da69d]" />
              </div>

              <div className="flex items-center justify-between gap-3 px-6 py-6 sm:px-10">
                <div className="font-display text-xl font-extrabold tracking-[-.08em] sm:text-2xl">studio<span className="text-[#bc7861]">.</span></div>
                <div className="hidden gap-5 text-[10px] font-bold text-[#526960] sm:flex">
                  <span>À propos</span><span>Services</span><span>Contact</span>
                </div>
                <div className="rounded-full bg-[#1d4235] px-3 py-2 text-[9px] font-bold text-white sm:px-4">Découvrir</div>
              </div>
              <div className="grid gap-5 px-6 pb-6 sm:px-10 sm:pb-9 md:grid-cols-[.9fr_1.1fr] md:items-center">
                <div className="relative z-10 py-3">
                  <div className="text-[9px] font-extrabold uppercase tracking-[.23em] text-[#a87259]">L’art de se démarquer</div>
                  <div className="mt-4 font-display text-[clamp(2.05rem,3.6vw,3.8rem)] font-extrabold leading-[.99] tracking-[-.07em]">
                    Chaque détail
                    <span className="block font-serif italic font-normal text-[#b07960]">compte.</span>
                  </div>
                  <p className="mt-4 max-w-[230px] text-[10px] leading-relaxed text-[#68786f] sm:text-xs">Une expérience pensée pour révéler ce qui vous rend unique.</p>
                  <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1d4235] px-4 py-2.5 text-[10px] font-bold text-white">
                    En savoir plus <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="relative min-h-[220px] overflow-hidden rounded-[48%_48%_1rem_1rem] bg-[#cfd8be] sm:min-h-[330px]">
                  <div className="absolute -left-8 bottom-[-3rem] h-60 w-48 rounded-[55%] bg-[#e5bd9e] blur-[3px]" />
                  <div className="absolute right-[-3rem] top-[-4rem] h-80 w-64 rounded-[48%] bg-[#9cab91] rotate-[23deg]" />
                  <div className="absolute bottom-[-6rem] left-[17%] h-80 w-52 rotate-[31deg] rounded-full bg-[#536a55] shadow-[0_15px_50px_rgba(20,51,34,.19)]" />
                  <div className="absolute left-[30%] top-[22%] h-32 w-32 rounded-full border-[24px] border-[#f6e7d1] bg-[#bb8c76] shadow-[0_25px_35px_rgba(40,41,30,.2)] sm:h-44 sm:w-44 sm:border-[32px]" />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#233e35]/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/50 bg-white/80 px-3 py-1.5 text-[9px] font-bold text-[#496155] backdrop-blur">Une identité singulière</div>
                </div>
              </div>
            </div>
          </div>
          <div className="gws-float absolute -bottom-7 -left-3 flex max-w-[235px] items-center gap-3 rounded-2xl border border-white/15 bg-[#f7f7ef] px-4 py-3 text-[#16352d] shadow-[0_22px_65px_rgba(0,0,0,.3)] sm:-left-9 sm:px-5 sm:py-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#c9f4e8] text-[#20766c]"><CheckCheck className="h-5 w-5" /></span>
            <div><div className="text-xs font-extrabold">Plus qu’un joli site</div><div className="mt-1 text-[10px] leading-snug text-[#6c8077]">Un parcours qui donne envie d’agir.</div></div>
          </div>
          <div className="gws-float-delayed absolute -right-3 -top-5 hidden items-center gap-2 rounded-full border border-[#54d7c8]/25 bg-[#183f36] px-4 py-3 text-xs font-bold text-[#b7f7e9] shadow-xl sm:flex">
            <Sparkles className="h-4 w-4" /> Le détail fait la différence
          </div>
          <p className="mt-12 text-center text-[10px] font-medium tracking-wide text-white/35">Maquette illustrative · Chaque site est créé selon votre identité</p>
        </div>
      </div>
      <a href="#realisations" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-white/35 hover:text-[#54d7c8] xl:flex">
        Scroller pour découvrir <ArrowDown className="h-3 w-3" />
      </a>
    </section>
  );
}

function ValueRibbon() {
  const items = ["Une identité qui marque", "Des expériences fluides", "Un design pensé mobile", "Un accompagnement direct"];
  return (
    <div className="overflow-hidden border-b border-white/10 bg-[#12211d] py-5" aria-label="Nos engagements">
      <div className="gws-marquee flex w-max items-center gap-10">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex shrink-0 items-center gap-10 text-xs font-extrabold uppercase tracking-[.16em] text-white/45 sm:text-sm">
            <Star className="h-3.5 w-3.5 fill-[#54d7c8] text-[#54d7c8]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <section id="realisations" className="bg-[#f5f3eb] px-5 py-20 text-[#152820] sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[900px]">
            <Eyebrow light>Du concret, pas des promesses</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.75rem,5.25vw,5.8rem)] font-extrabold leading-[1.02] tracking-[-.068em]">
              Des projets réels.
              <span className="block text-[#6e8177]">Des univers uniques.</span>
            </h2>
          </div>
          <p className="max-w-[330px] text-sm leading-[1.8] text-[#66766e] sm:text-base">
            Chaque entreprise a sa personnalité. Mon travail, c’est de la faire ressentir dès le premier clic.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className={"gws-project-card group overflow-hidden rounded-[1.75rem] border border-[#dce0d7] bg-white shadow-[0_12px_38px_rgba(27,49,38,.035)] " + (index === 2 ? "lg:col-span-2" : "")}>
              <div className={"relative overflow-hidden " + (index === 2 ? "lg:grid lg:grid-cols-[1.1fr_.9fr]" : "")}>
                <div className="relative overflow-hidden">
                  <ProjectIllustration theme={project.theme} />
                  <span className="absolute bottom-4 left-4 z-10 rounded-full border border-white/25 bg-[#152820]/75 px-3 py-2 text-[10px] font-bold text-white backdrop-blur-lg sm:bottom-6 sm:left-6">Représentation graphique du projet</span>
                </div>
                <div className={"flex flex-col justify-between p-6 sm:p-8 " + (index === 2 ? "lg:py-12 lg:px-12" : "")}>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[.15em] text-[#668075]">{project.type}</span>
                    <h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-.055em] sm:text-4xl">{project.title}</h3>
                    <p className="mt-4 max-w-lg text-sm leading-[1.85] text-[#617168] sm:text-base">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-[#dae4dd] bg-[#f6f8f4] px-3 py-1.5 text-[11px] font-bold text-[#63776c]">{tag}</span>
                      ))}
                    </div>
                  </div>
                  {project.url ? (
                    <a href={project.url} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#183b30] px-5 py-3.5 text-xs font-extrabold text-white transition hover:bg-[#227c6e]" aria-label={"Découvrir le site " + project.title}>
                      Voir le site en ligne <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link to="/contact" className="mt-8 inline-flex w-fit items-center gap-3 text-sm font-extrabold text-[#246e60] hover:underline">
                      Un projet similaire en tête ? <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-5 text-center text-xs leading-relaxed text-[#78867d]">Les visuels ci-dessus sont des illustrations stylisées des projets, et non des captures des sites réels. Consultez les liens pour découvrir les réalisations en ligne.</p>
      </div>
    </section>
  );
}

function ProjectIllustration({ theme }: { theme: (typeof projects)[number]["theme"] }) {
  if (theme === "beach") {
    return (
      <div className="relative h-[310px] overflow-hidden bg-[#d7cbb8] p-5 sm:h-[395px] sm:p-9">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f2e7d2] via-[#e9d6ba] to-[#809e9d]" />
        <div className="absolute -right-10 bottom-[-120px] h-[320px] w-[320px] rounded-full bg-[#2c7477]/75 blur-[1px]" />
        <div className="absolute -left-20 bottom-[-140px] h-[300px] w-[300px] rounded-full bg-[#efe3c8]" />
        <div className="absolute right-6 top-12 h-40 w-40 rounded-full border-[20px] border-[#f7e9cc]/75" />
        <div className="absolute bottom-0 right-10 h-56 w-20 rotate-[20deg] rounded-t-full bg-[#366f65]/75" />
        <div className="relative mx-auto flex h-full max-w-[540px] flex-col overflow-hidden rounded-[1rem] border border-white/40 bg-[#fffaf0]/80 shadow-[0_25px_80px_rgba(18,69,71,.23)] backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-[#a7aa9d]/20 px-5 py-4 text-[#38605b]"><span className="font-serif text-lg italic">Courbaril</span><span className="text-[9px] font-extrabold uppercase tracking-widest">Saint-François</span></div>
          <div className="grid flex-1 grid-cols-[1fr_.85fr]">
            <div className="flex flex-col justify-center px-5 sm:px-7">
              <span className="text-[8px] font-bold uppercase tracking-[.18em] text-[#548880]">Évasion & douceur de vivre</span>
              <span className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.8rem)] leading-none text-[#325952]">Une parenthèse <i>à part.</i></span>
              <span className="mt-5 w-fit rounded-full bg-[#315d57] px-4 py-2 text-[9px] font-bold text-white">Découvrir le séjour →</span>
            </div>
            <div className="relative m-3 overflow-hidden rounded-[45%_45%_8px_8px] bg-[#6daca7]">
              <div className="absolute -right-10 bottom-[-7rem] h-64 w-52 rotate-[-25deg] rounded-full bg-[#e6e0c6]" />
              <div className="absolute bottom-[-2.5rem] left-[-2rem] h-44 w-48 rounded-full bg-[#276c6d]" />
              <div className="absolute right-[15%] top-[18%] h-20 w-20 rounded-full bg-[#f6d9a5]/90" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (theme === "medical") {
    return (
      <div className="relative h-[310px] overflow-hidden bg-[#ccdee2] p-5 sm:h-[395px] sm:p-9">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d7f1ee] via-[#c7dce3] to-[#8dabbb]" />
        <div className="absolute -right-14 top-[-80px] h-72 w-72 rounded-full border-[40px] border-white/20" />
        <div className="absolute -left-20 bottom-[-100px] h-80 w-80 rounded-full bg-[#779da7]/40" />
        <div className="relative mx-auto h-full max-w-[540px] overflow-hidden rounded-[1rem] border border-white/80 bg-white shadow-[0_25px_80px_rgba(37,77,89,.18)]">
          <div className="flex h-14 items-center justify-between border-b border-[#e3eaed] px-5"><span className="font-display text-sm font-black text-[#2b505d]">Dr Aubry <span className="font-normal text-[#81a4af]">| Médecine générale</span></span><span className="h-8 w-20 rounded-full bg-[#4c8699]" /></div>
          <div className="grid h-[calc(100%-3.5rem)] grid-cols-[1.15fr_.85fr]">
            <div className="flex flex-col justify-center px-5 sm:px-7">
              <span className="text-[8px] font-bold uppercase tracking-[.15em] text-[#68a6a4]">Informations & accompagnement</span>
              <span className="mt-4 font-display text-[clamp(1.35rem,2.7vw,2.6rem)] font-bold leading-[1.08] tracking-[-.05em] text-[#23495b]">Votre santé,<br /> notre priorité.</span>
              <div className="mt-5 flex gap-2"><span className="h-2 w-20 rounded-full bg-[#dde7e9]" /><span className="h-2 w-8 rounded-full bg-[#dde7e9]" /></div>
              <span className="mt-6 w-fit rounded-full bg-[#3c8595] px-4 py-2 text-[9px] font-bold text-white">Informations pratiques →</span>
            </div>
            <div className="relative m-3 overflow-hidden rounded-xl bg-[#c2e0e2]">
              <div className="absolute bottom-[-30%] right-[-35%] h-56 w-56 rounded-full bg-[#6c9fae]" />
              <div className="absolute left-[18%] top-[18%] h-28 w-28 rounded-full bg-white/50" />
              <div className="absolute left-[25%] top-[20%] h-20 w-20 rounded-full border-[18px] border-[#5a9eb1]/70" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-[310px] overflow-hidden bg-[#e5babb] p-5 sm:h-[395px] sm:p-9">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8ded1] via-[#e6adab] to-[#ad7d8b]" />
      <div className="absolute -right-20 -top-16 h-72 w-72 rounded-full bg-[#f9e6b8]/60" />
      <div className="absolute -left-24 bottom-[-8rem] h-72 w-72 rounded-full bg-[#bd7d7e]/70" />
      <div className="relative mx-auto flex h-full max-w-[630px] flex-col overflow-hidden rounded-[1rem] border border-[#fff6ee]/65 bg-[#fff7ec] shadow-[0_25px_80px_rgba(94,42,49,.22)]">
        <div className="flex items-center justify-between px-6 py-5 text-[#73494b]"><span className="font-serif text-xl font-bold italic">Kafé Céramik</span><span className="text-[9px] font-bold uppercase tracking-widest">Atelier créatif</span></div>
        <div className="grid flex-1 grid-cols-[1.1fr_.9fr]">
          <div className="flex flex-col justify-center px-6">
            <span className="text-[8px] font-bold uppercase tracking-[.18em] text-[#b36d75]">Un moment à partager</span>
            <span className="mt-4 font-serif text-[clamp(1.6rem,3vw,3rem)] leading-[.95] text-[#8e4f56]">Créez. Riez.<br /><i>Recommencez.</i></span>
            <span className="mt-5 w-fit rounded-full bg-[#a6646a] px-4 py-2 text-[9px] font-bold text-white">Réserver mon atelier →</span>
          </div>
          <div className="relative overflow-hidden">
            <div className="absolute bottom-[-7rem] right-[-3rem] h-72 w-64 rounded-full bg-[#dba08b]" />
            <div className="absolute bottom-[-1rem] left-[10%] h-44 w-36 rounded-[35%_35%_45%_45%] border-[25px] border-[#fff3dc] bg-[#c78d75] shadow-[0_8px_24px_rgba(95,53,48,.24)]" />
            <div className="absolute left-[35%] top-[10%] h-24 w-24 rounded-full border-[19px] border-[#a86469] bg-[#e8bf9e]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Difference() {
  return (
    <section className="relative bg-[#0d1715] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <Eyebrow>La différence Gwada Web Studio</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.7rem,4.8vw,5.3rem)] font-extrabold leading-[1.03] tracking-[-.065em]">
            Être visible,
            <span className="block text-[#54d7c8]">c’est bien.</span>
            Donner envie,
            <span className="block text-[#ffae96]">c’est mieux.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.9] text-white/55">
            Votre site est souvent votre première rencontre avec un futur client. Il doit transmettre
            votre sérieux, raconter votre univers et rendre la prise de contact évidente.
          </p>
          <Link to="/sites-web" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#54d7c8] transition hover:gap-4">
            Ce que je peux créer pour vous <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { num: "01", icon: Sparkles, title: "Un univers à vous", text: "Pas un site générique. Une identité digitale qui reflète réellement votre activité.", color: "#54d7c8" },
            { num: "02", icon: MousePointer2, title: "Un parcours évident", text: "Vos visiteurs comprennent votre offre et savent exactement quoi faire ensuite.", color: "#ffae96" },
            { num: "03", icon: Globe2, title: "Beau sur chaque écran", text: "Une expérience soignée sur ordinateur, tablette et surtout téléphone.", color: "#a3a8ff" },
            { num: "04", icon: Workflow, title: "Utile, pas seulement joli", text: "Des fonctionnalités adaptées à vos besoins réels, sans complexité inutile.", color: "#f2cb5d" },
          ].map((item, index) => (
            <article key={item.title} className={"gws-hover-card group rounded-[1.65rem] border border-white/10 bg-[#15231e] p-6 sm:p-7 " + (index % 2 ? "sm:translate-y-7" : "")}>
              <div className="flex items-center justify-between"><span className="text-xs font-black text-white/20">{item.num}</span><item.icon className="h-6 w-6" style={{ color: item.color }} /></div>
              <h3 className="mt-11 text-xl font-extrabold tracking-[-.04em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-[1.8] text-white/50">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="solutions" className="bg-[#102019] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="max-w-[800px]">
          <Eyebrow>Mes solutions</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,5.6rem)] font-extrabold leading-[1.04] tracking-[-.065em]">
            La bonne solution,
            <span className="block text-[#8da59a]">pour votre ambition.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-[1.8] text-white/55">Du premier site vitrine à l’outil plus complet : tout part de votre activité et de vos objectifs.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link key={service.title} to={service.href} className={"gws-hover-card group relative flex min-h-[385px] flex-col overflow-hidden rounded-[1.7rem] border border-white/10 p-7 transition-colors hover:border-white/30 sm:p-8 " + (index === 0 ? "bg-[#1f483b]" : "bg-[#162c24]")} data-cta={"home-service-" + service.number}>
              <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-15 blur-[3px] transition-transform group-hover:scale-125" style={{ background: service.color }} />
              <div className="relative flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl text-[#102019]" style={{ background: service.color }}><service.icon className="h-6 w-6" /></div>
                <span className="font-display text-sm font-extrabold text-white/25">{service.number}</span>
              </div>
              <span className="mt-12 text-[10px] font-bold uppercase tracking-[.17em] text-white/45">{service.eyebrow}</span>
              <h3 className="mt-3 font-display text-3xl font-extrabold tracking-[-.055em]">{service.title}</h3>
              <p className="mt-4 text-sm leading-[1.9] text-white/60">{service.description}</p>
              <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/15 pt-7">
                <span className="text-sm font-extrabold" style={{ color: service.color }}>{service.link}</span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/20 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-white/60"><ArrowUpRight className="h-4 w-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section className="bg-[#f5f3eb] px-5 py-20 text-[#152820] sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Eyebrow light>Ils m’ont fait confiance</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.7rem,5vw,5.5rem)] font-extrabold leading-[1.03] tracking-[-.06em]">
              Votre satisfaction,
              <span className="block text-[#6e8177]">ma meilleure vitrine.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[#d7a54f]" aria-label="Deux témoignages clients notés cinq étoiles">
            {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            <span className="ml-2 text-xs font-bold text-[#6e8177]">2 témoignages clients</span>
          </div>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {testimonials.map((review, i) => {
            const isExpanded = expanded === i;
            return (
              <article key={review.name} className="relative flex flex-col rounded-[1.75rem] border border-[#e0e3dc] bg-white p-7 shadow-[0_14px_44px_rgba(26,52,40,.04)] sm:p-9">
                <Quote className="h-10 w-10 text-[#79beaa]/60" strokeWidth={1.5} />
                <p className={"mt-7 text-base leading-[1.9] text-[#455a51] " + (isExpanded ? "" : "line-clamp-5")}>“{review.text}”</p>
                <button onClick={() => setExpanded(isExpanded ? null : i)} aria-expanded={isExpanded} className="mt-3 w-fit text-xs font-extrabold text-[#237566] hover:underline">{isExpanded ? "Réduire l’avis" : "Lire l’avis complet"}</button>
                <div className="mt-auto flex items-center gap-4 border-t border-[#e6ebe4] pt-7">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#cce8de] text-lg font-black text-[#255d4f]">{review.initial}</span>
                  <div><div className="text-sm font-extrabold">{review.name}</div><div className="mt-1 text-xs text-[#83938a]">{review.role}</div></div>
                  <div className="ml-auto hidden gap-0.5 text-[#d7a54f] sm:flex">{Array.from({length:5},(_,n)=><Star key={n} className="h-3.5 w-3.5 fill-current" />)}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { number: "01", title: "On parle de votre idée", text: "Vous me racontez votre activité et vos envies, même si tout n’est pas encore défini." },
    { number: "02", title: "Je conçois votre solution", text: "Une proposition adaptée à votre image, à votre budget et aux fonctions dont vous avez réellement besoin." },
    { number: "03", title: "Votre site prend vie", text: "Un site pensé pour vos visiteurs, avec un interlocuteur direct tout au long du projet." },
  ];
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <Eyebrow>Simple du début à la fin</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2.8rem,4.9vw,5.5rem)] font-extrabold leading-[1.03] tracking-[-.065em]">Vous avez l’idée.<span className="block text-[#54d7c8]">On la concrétise.</span></h2>
            <p className="mt-6 max-w-md text-base leading-[1.9] text-white/55">Pas besoin de connaître le web ou de rédiger un cahier des charges compliqué. On commence par une discussion.</p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-[#54d7c8] transition hover:gap-4">Décrire mon projet <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="space-y-0">
            {steps.map((step) => (
              <div key={step.number} className="grid grid-cols-[54px_1fr] gap-5 border-b border-white/12 py-8 first:pt-0 last:border-none sm:grid-cols-[85px_1fr]">
                <div className="font-display text-3xl font-extrabold tracking-[-.06em] text-[#54d7c8]/65 sm:text-4xl">{step.number}</div>
                <div><h3 className="font-display text-xl font-extrabold tracking-[-.04em] sm:text-2xl">{step.title}</h3><p className="mt-3 max-w-lg text-sm leading-[1.85] text-white/50 sm:text-base">{step.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-28 lg:px-12">
      <div className="gws-final-cta relative mx-auto max-w-[1380px] overflow-hidden rounded-[2rem] bg-[#54d7c8] p-8 text-[#0d271f] sm:rounded-[2.5rem] sm:p-14 lg:p-20">
        <div className="pointer-events-none absolute -right-24 -top-40 h-[450px] w-[450px] rounded-full border-[70px] border-[#0e6056]/10" />
        <div className="pointer-events-none absolute -right-16 bottom-[-230px] h-[430px] w-[430px] rounded-full bg-white/20 blur-[45px]" />
        <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[840px]">
            <span className="text-[11px] font-black uppercase tracking-[.18em] text-[#1c6358]">À votre tour</span>
            <h2 className="mt-6 font-display text-[clamp(2.65rem,5.4vw,6rem)] font-extrabold leading-[1.05] tracking-[-.07em]">
              Et si votre prochain client
              <span className="block text-[#287667]">tombait sous le charme ?</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-[1.85] text-[#245c51]">Parlez-moi de votre projet. Je vous aiderai à imaginer un site qui vous ressemble et qui donne envie de vous choisir.</p>
          </div>
          <Link to="/contact" className="group inline-flex min-h-16 shrink-0 items-center justify-center gap-4 self-start rounded-full bg-[#102b23] px-8 text-sm font-extrabold text-white shadow-[0_20px_45px_rgba(10,48,37,.15)] transition hover:-translate-y-1 hover:bg-[#18483a] lg:self-end" data-cta="home-final-project">
            Demander mon devis <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1380px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-bold text-white/35">
        <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#54d7c8]" /> Premier échange sans engagement</span>
        <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#54d7c8]" /> Un projet adapté à votre activité</span>
        <Link to="/contact" className="flex items-center gap-1 hover:text-white">Une question ? Contactez-moi <ChevronRight className="h-3 w-3" /></Link>
      </div>
    </section>
  );
}
