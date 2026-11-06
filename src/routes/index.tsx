import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Quote, Star } from "lucide-react";
import { FaqSection } from "@/components/site/FaqSection";
import { InclusApercu } from "@/components/site/Inclus";
import { reveal, rise } from "@/components/site/Motion";
import { BrowserFrame, RealisationCard } from "@/components/site/SitePreview";
import { realisations } from "@/lib/realisations";
import { services } from "@/lib/services";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/" }],
    meta: [
      { title: "Création de site internet en Guadeloupe, démo gratuite — Gwada Web Studio" },
      {
        name: "description",
        content:
          "Sites internet, applications et outils sur mesure en Guadeloupe, en Martinique et en France. Voyez le résultat avant de payer : démonstration gratuite, sans engagement.",
      },
      {
        property: "og:title",
        content: "Gwada Web Studio — Des sites et des applications que vous voyez avant de payer",
      },
      {
        property: "og:description",
        content:
          "Sites internet, applications et outils sur mesure, créés en Guadeloupe. Démonstration gratuite à vos couleurs, sans engagement.",
      },
    ],
  }),
  component: HomePage,
});

const metiers = [
  { to: "/site-internet-restaurant", label: "Restaurants et traiteurs" },
  { to: "/site-internet-artisan", label: "Artisans" },
  { to: "/site-internet-location-saisonniere", label: "Gîtes et locations" },
  { to: "/site-internet-salon-institut", label: "Salons et instituts" },
  { to: "/site-internet-commerce-antillais", label: "Commerces antillais en métropole" },
  { to: "/site-commandes-noel", label: "Commandes de Noël" },
] as const;

const etapes = [
  {
    title: "Vous me présentez votre activité",
    text: "Le nom, un lien si vous en avez un. Deux minutes suffisent.",
  },
  {
    title: "Je prépare votre démonstration",
    text: "Gratuite, à vos couleurs, à ouvrir sur votre téléphone.",
  },
  {
    title: "On cadre, je vous envoie le devis",
    text: "On précise ce qu’il vous faut. Si la démonstration vous plaît, vous recevez un devis clair.",
  },
  {
    title: "Je crée votre projet",
    text: "On démarre une fois le devis signé, et vous donnez votre avis en cours de route.",
  },
  {
    title: "Mise en ligne et prise en main",
    text: "Je teste, je publie, et je vous montre comment tout gérer.",
  },
  {
    title: "Je reste là",
    text: "Vous gardez le même interlocuteur après la mise en ligne.",
  },
];

const questions = [
  {
    question: "Combien coûte un site ?",
    answer:
      "Un site commence à 550 € pour le plus simple, avec son espace de gestion. Le prix dépend ensuite de ce qu’il doit faire : réservation, paiement, catalogue. Après la démonstration, vous recevez un devis clair.",
  },
  {
    question: "La démonstration est-elle vraiment gratuite ?",
    answer:
      "Oui. Elle ne vous engage à rien. Si vous ne souhaitez pas continuer, vous ne me devez rien.",
  },
  {
    question: "Pourrai-je modifier mon site moi-même ?",
    answer:
      "Oui. Chaque site comprend un espace pour le gérer vous-même, plus ou moins complet selon le projet, et je vous montre comment l’utiliser.",
  },
  {
    question: "Quand est-ce que je paie ?",
    answer:
      "Rien pour la démonstration. Une fois le devis signé, le paiement se fait habituellement en trois fois : 40 % à la commande, 40 % à la validation et 20 % à la mise en ligne.",
  },
  {
    question: "Le nom de domaine et l’hébergement sont-ils compris ?",
    answer:
      "Ce sont des services externes. Ils vous sont facturés à leur prix réel, sans marge, et ils sont annoncés dans le devis.",
  },
  {
    question: "Combien de temps faut-il ?",
    answer:
      "Cela dépend du projet et du moment où vous me confiez vos textes et vos photos. Le délai est écrit dans le devis.",
  },
  {
    question: "Mon site sera-t-il visible sur Google et les IA ?",
    answer:
      "Chaque site comprend les bases pour Google et pour les IA comme ChatGPT. Personne ne peut garantir une place, mais votre site sera clair et facile à comprendre pour eux.",
  },
  {
    question: "Vous travaillez en dehors de la Guadeloupe ?",
    answer:
      "Oui. Je suis basé aux Abymes et je travaille à distance avec la Martinique et toute la France, par WhatsApp, téléphone ou visio.",
  },
];

const testimonials = [
  {
    name: "Kafe Ceramik",
    role: "Site de réservation · Saint-François",
    initial: "K",
    text: "[…] Il nous a trouvé des solutions à chaque étape et le résultat est magnifique : le site correspond parfaitement à ce que nous souhaitions.\n\nLe vrai plus, c’est sa disponibilité. Il est sur place en Guadeloupe, peut intervenir rapidement dès qu’il y a un souci et, surtout, son accompagnement ne s’arrête pas une fois le site livré. Même pour le service après-vente, il reste hyper présent, réactif et efficace.\n\nNous sommes vraiment ravis de lui avoir fait confiance et nous recommandons Gwada Web Studio les yeux fermés. […]",
  },
  {
    name: "J.-J. A.",
    role: "Site professionnel · Cabinet médical",
    initial: "J",
    text: "J’ai confié la création de mon site professionnel à Gwada Web Studio et le résultat est tout à fait conforme à ce que j’attendais. Les échanges ont été simples et efficaces, avec une bonne compréhension des besoins liés à mon activité. Je suis très satisfait du travail réalisé et du sérieux dont il a fait preuve.",
  },
  {
    name: "Appart Courbaril",
    role: "Site de location · crystalbeachcourbaril.fr",
    initial: "A",
    text: "J’ai fait appel à Gwada Web Studio pour la création du site internet de mon appartement, et je suis vraiment très contente du résultat ! Il a été à l’écoute de mes attentes, très professionnel et a su parfaitement s’adapter à mon activité et à ses spécificités. Le site correspond tout à fait à ce que je souhaitais, et je suis ravie du résultat. Un grand merci pour son travail et son sérieux, je recommande sans hésiter !",
  },
] as const;

function HomePage() {
  return (
    <div className="overflow-hidden bg-[#0d1715] text-[#f7f7ef]">
      <Hero />
      <Services />
      <Portfolio />
      <InclusApercu />
      <Process />
      <Reviews />
      <FaqSection items={questions} title="Les questions qu’on me pose" />
      <FinalCta />
    </div>
  );
}

const titreAccueil = "Des sites et des applications sur mesure, que vous voyez avant de payer.";

function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="gws-grid pointer-events-none absolute inset-0 -z-20 opacity-45" />
      <div className="gws-aurore pointer-events-none absolute right-[-14rem] top-[-6rem] -z-10 h-[34rem] w-[34rem] rounded-full bg-[#54d7c8]/10 blur-[120px]" />

      <div className="mx-auto grid max-w-[1376px] items-center gap-12 px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1fr_1.02fr] lg:gap-10 lg:px-12 lg:pb-20 lg:pt-16">
        <div>
          <h1 className="max-w-[640px] font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.042em]">
            {titreAccueil.split(" ").map((mot, index) => (
              <Fragment key={index}>
                <span className="gws-mot">
                  <span {...rise(index)}>{mot}</span>
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p
            {...rise(6)}
            className="gws-rise mt-5 max-w-[560px] text-base leading-relaxed text-white/68 sm:text-[17px]"
          >
            Je crée votre site internet, votre application ou votre outil de gestion, pour les
            entreprises de Guadeloupe, de Martinique et de France. Je vous prépare d’abord une
            démonstration gratuite à vos couleurs, sans engagement.
          </p>
          <div {...rise(7)} className="gws-rise mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/demo-gratuite"
              className="gws-button-primary group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full px-7 text-sm font-black"
              data-cta="home-hero-demo"
            >
              Recevoir ma démo gratuite
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#realisations"
              className="group inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/[0.06]"
              data-cta="home-hero-projects"
            >
              Voir mes réalisations
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
          <ul
            {...rise(8)}
            className="gws-rise mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-semibold text-white/60"
          >
            {["Démo gratuite, sans engagement", "Sites à partir de 550 €", "Basé aux Abymes"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check
                    className="h-3.5 w-3.5 text-[#54d7c8]"
                    strokeWidth={3}
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        <a
          href="#realisations"
          data-fan
          className="relative mx-auto block aspect-[10/8] w-full max-w-[640px] lg:max-w-none"
          aria-label="Voir mes réalisations"
        >
          <div className="gws-plan gws-plan-gauche left-0 top-[7%] w-[64%]">
            <BrowserFrame
              image={realisations[1].image}
              alt={realisations[1].alt}
              address={realisations[1].address}
              sizes="(min-width: 1024px) 400px, 62vw"
              className="gws-fan-left"
            />
          </div>
          <div className="gws-plan gws-plan-droite right-0 top-0 w-[62%]">
            <BrowserFrame
              image={realisations[2].image}
              alt={realisations[2].alt}
              address={realisations[2].address}
              sizes="(min-width: 1024px) 400px, 62vw"
              className="gws-fan-right"
            />
          </div>
          <div className="gws-plan gws-plan-devant bottom-0 left-[12%] w-[76%]">
            <BrowserFrame
              image={realisations[0].image}
              alt={realisations[0].alt}
              address={realisations[0].address}
              sizes="(min-width: 1024px) 480px, 76vw"
              priority
              className="gws-fan-front"
            />
          </div>
        </a>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <h2
          {...reveal()}
          className="max-w-2xl font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
        >
          Ce que je peux faire pour vous
        </h2>

        <div className="mt-9 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-6">
          {services.map((service, index) => (
            <Link
              key={service.to}
              to={service.to}
              {...reveal(index < 3 ? index : index - 3)}
              data-spot
              className={`gws-spot group flex flex-col bg-[#13211e] p-6 sm:p-8 ${index < 3 ? "lg:col-span-2" : "lg:col-span-3"}`}
              data-cta={`home-service-${service.to.slice(1)}`}
            >
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.035em]">
                {service.label}
              </h3>
              <p className="mt-1 text-sm font-bold" style={{ color: service.accent }}>
                {service.price}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/62">{service.text}</p>
              <ul className="mb-7 mt-5 grid gap-2 text-sm font-semibold text-white/80">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <Check
                      className="h-3.5 w-3.5 shrink-0"
                      style={{ color: service.accent }}
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-extrabold transition-all group-hover:gap-3">
                {service.link} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div
          {...reveal()}
          className="mt-7 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5"
        >
          <p className="shrink-0 text-sm font-bold text-white/60">Une page pour votre métier :</p>
          <ul className="flex flex-wrap gap-2">
            {metiers.map((metier) => (
              <li key={metier.to}>
                <Link
                  to={metier.to}
                  className="inline-flex rounded-full border border-white/12 px-3.5 py-1.5 text-[13px] font-semibold text-white/72 transition hover:border-[#54d7c8]/50 hover:text-white"
                >
                  {metier.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="realisations" className="bg-[#102019] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div
          {...reveal()}
          className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between lg:gap-10"
        >
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            De vrais projets, en ligne
          </h2>
          <p className="max-w-md text-[15px] leading-relaxed text-white/62">
            Ce ne sont pas des maquettes : ce sont les vraies pages. Passez dessus pour les voir
            défiler, cliquez pour ouvrir le site.
          </p>
        </div>
        <div className="mt-9 grid gap-x-8 gap-y-11 md:grid-cols-2">
          {realisations.map((item, index) => (
            <RealisationCard key={item.slug} item={item} index={index % 2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div {...reveal()}>
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Comment ça se passe
          </h2>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/62 sm:text-base">
            Pas besoin de connaître le web ni d’avoir un cahier des charges. On commence par une
            démonstration.
          </p>
        </div>
        <ol className="mt-9 grid gap-x-8 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
          {etapes.map((etape, index) => (
            <li key={etape.title} {...reveal(index % 3)} className="flex gap-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#54d7c8] text-sm font-black text-[#0d1715]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-extrabold leading-snug tracking-[-0.025em]">
                  {etape.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-white/60">{etape.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Reviews() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <section className="bg-[#f5f3eb] px-5 py-16 text-[#152820] sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div {...reveal()} className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Ce que disent mes clients
          </h2>
          <div
            className="flex items-center gap-1 text-[#c98f2e]"
            aria-label={`${testimonials.length} témoignages clients notés cinq étoiles`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
            ))}
            <span className="ml-2 text-xs font-bold text-[#55665f]">
              {testimonials.length} témoignages clients
            </span>
          </div>
        </div>
        <div className="mt-9 grid items-start gap-4 lg:grid-cols-3">
          {testimonials.map((review, i) => {
            const isExpanded = expanded === i;
            return (
              <article
                key={review.name}
                {...reveal(i)}
                className="flex h-full flex-col rounded-3xl bg-white p-6 sm:p-7"
              >
                <Quote className="h-6 w-6 text-[#2a8f7c]" strokeWidth={1.75} aria-hidden="true" />
                <p
                  className={`mt-4 whitespace-pre-line text-[15px] leading-relaxed text-[#3f524a] ${isExpanded ? "" : "line-clamp-5"}`}
                >
                  “{review.text}”
                </p>
                <button
                  onClick={() => setExpanded(isExpanded ? null : i)}
                  aria-expanded={isExpanded}
                  className="mt-2 w-fit text-xs font-extrabold text-[#1c6358] hover:underline"
                >
                  {isExpanded ? "Réduire l’avis" : "Lire l’avis complet"}
                </button>
                <div className="mt-auto pt-5">
                  <div className="text-sm font-extrabold">{review.name}</div>
                  <div className="mt-0.5 break-words text-xs text-[#55665f]">{review.role}</div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
      <div
        {...reveal("zoom")}
        className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Le plus simple, c’est de voir le résultat.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#1f5249] sm:text-base">
            Envoyez-moi le nom de votre entreprise. Je vous prépare gratuitement une démonstration à
            vos couleurs, et vous décidez ensuite.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3">
          <Link
            to="/demo-gratuite"
            className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="home-final-demo"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="text-center text-sm font-bold text-[#17463d] underline decoration-1 underline-offset-4"
          >
            Une question ? Écrivez-moi
          </Link>
        </div>
      </div>
    </section>
  );
}
