import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Minus } from "lucide-react";
import { FaqSection } from "@/components/site/FaqSection";
import { reveal, rise } from "@/components/site/Motion";
import { WhatsAppIcon } from "@/components/site/WhatsApp";
import { whatsappLink } from "@/lib/contact-info";
import { offreLocation } from "@/lib/location";
import { pageHead } from "@/lib/seo";

const title = `Location de site internet : ${offreLocation.signature} € puis ${offreLocation.parMois} €/mois — Gwada Web Studio`;
const description = `Votre site sur mesure sans tout payer d’un coup : ${offreLocation.signature} € à la signature, puis ${offreLocation.parMois} € par mois. Hébergement, nom de domaine à votre nom et entretien compris. Démonstration gratuite.`;

/** Prix mensuel et frais de signature, lisibles par Google. */
const offreLocationStructuree = {
  "@type": "Offer",
  url: "https://gwadawebstudio.fr/location-site-internet",
  priceCurrency: "EUR",
  priceSpecification: [
    {
      "@type": "UnitPriceSpecification",
      price: offreLocation.parMois,
      priceCurrency: "EUR",
      unitCode: "MON",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
    },
    {
      "@type": "UnitPriceSpecification",
      price: offreLocation.signature,
      priceCurrency: "EUR",
      priceType: "https://schema.org/MinimumAdvertisedPrice",
      name: "À la signature",
    },
  ],
};

export const Route = createFileRoute("/location-site-internet")({
  staticData: { sitemap: true },
  head: () =>
    pageHead({
      path: "/location-site-internet",
      title,
      description,
      nom: "Location de site internet",
      donnees: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Location de site internet sur mesure",
          description,
          url: "https://gwadawebstudio.fr/location-site-internet",
          provider: { "@id": "https://gwadawebstudio.fr/#studio" },
          areaServed: ["Guadeloupe", "Martinique", "France"],
          offers: offreLocationStructuree,
        },
      ],
    }),
  component: LocationPage,
});

const chiffres = [
  { label: "À la signature", value: `${offreLocation.signature} €` },
  { label: "Puis chaque mois", value: `${offreLocation.parMois} €` },
  { label: "Engagement", value: "Aucun" },
];

const compris = [
  {
    title: "Votre site, fait sur mesure",
    text: "À votre image, avec son espace de gestion, exactement comme un site acheté. On commence par la démonstration gratuite.",
  },
  {
    title: "L’hébergement et la sécurité",
    text: "Votre site en ligne, rapide et sécurisé, avec ses sauvegardes.",
  },
  {
    title: "Votre nom de domaine, à votre nom",
    text: "L’adresse de votre site vous appartient. Je m’occupe de la renouveler.",
  },
  {
    title: "L’entretien",
    text: "Les mises à jour techniques et la correction des bugs, tant que la location dure.",
  },
  {
    title: "Vos modifications",
    text: "Textes, photos, prix, horaires : vous les changez vous-même dans votre espace, autant que vous voulez.",
  },
  {
    title: "Le même interlocuteur",
    text: "Vous m’écrivez directement, sur WhatsApp ou par e-mail, ici en Guadeloupe.",
  },
];

const nonCompris = [
  {
    title: "Les nouvelles fonctions",
    text: "Une fonction ajoutée après la mise en ligne a son propre prix, annoncé avant de commencer.",
  },
  {
    title: "Les services externes",
    text: "Commission du paiement en ligne, SMS : au prix réel du fournisseur.",
  },
  {
    title: "Les très grands projets",
    text: "Pour une application ou un outil important, la mensualité est indiquée sur devis.",
  },
];

const garanties = [
  {
    title: "Vous gardez votre nom de domaine",
    text: "Il est à votre nom. Si vous partez, je vous donne ce qu’il faut pour le transférer.",
  },
  {
    title: "Vous gardez vos contenus",
    text: "Vos textes, vos photos et les données de vos clients vous sont remis.",
  },
  {
    title: "Pas de société de financement",
    text: `Vous signez avec moi, et seulement avec moi. Pas de contrat de 48 mois : vous arrêtez quand vous voulez, avec ${offreLocation.preavisMois} mois de préavis.`,
  },
  {
    title: "Et si Gwada Web Studio arrête son activité ?",
    text: "Je vous remets gratuitement votre site, ses données et la gestion de votre nom de domaine.",
  },
];

const questions = [
  {
    question: "Pourquoi louer plutôt qu’acheter ?",
    answer: `Pour avoir un site complet sans sortir une grosse somme d’un coup. Vous payez ${offreLocation.signature} € à la signature, puis ${offreLocation.parMois} € par mois, et l’hébergement, le nom de domaine et l’entretien sont déjà compris.`,
  },
  {
    question: "Puis-je arrêter quand je veux ?",
    answer: `Oui, la location est sans engagement : vous arrêtez avec ${offreLocation.preavisMois} mois de préavis, et je vous remets vos contenus, vos données et votre nom de domaine. Vous pouvez aussi acheter votre site.`,
  },
  {
    question: "Puis-je acheter mon site plus tard ?",
    answer:
      "Oui, à tout moment. Je vous fais un devis, au prix du moment, et le site devient le vôtre une fois payé.",
  },
  {
    question: "Le chèque TIC peut-il payer la location ?",
    answer:
      "Non : le chèque TIC de la Région finance l’achat d’un site, pas une location. Si vous comptez sur cette aide, l’achat est la bonne formule.",
  },
  {
    question: "Quels sites peut-on louer ?",
    answer:
      "La plupart des sites : vitrine, réservation, commandes, paiement en ligne, avec leur espace de gestion. Pour une application ou un outil plus important, la mensualité est indiquée sur devis.",
  },
  {
    question: "Comment se passe le paiement ?",
    answer: `${offreLocation.signature} € à la signature, puis ${offreLocation.parMois} € chaque mois à la même date, y compris pendant la création, par prélèvement automatique ou virement permanent. Sans engagement. Vous recevez une facture tous les mois.`,
  },
  {
    question: "Combien de temps faut-il ?",
    answer:
      "En général 1 à 2 semaines après réception de vos textes et de vos photos. Pour un projet plus important, le délai est écrit dans le devis.",
  },
];

function LocationPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="gws-grid pointer-events-none absolute inset-0 opacity-30" />
        <div className="gws-aurore pointer-events-none absolute right-[-14rem] top-[-6rem] h-[34rem] w-[34rem] rounded-full bg-[#54d7c8]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1280px]">
          <p className="gws-rise text-sm font-bold text-[#54d7c8]">Location de site internet</p>
          <h1
            {...rise(1)}
            className="gws-rise mt-3 max-w-3xl font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.05em]"
          >
            Votre site sur mesure, sans tout payer d’un coup.
          </h1>
          <p
            {...rise(2)}
            className="gws-rise mt-4 max-w-2xl text-base leading-relaxed text-white/68 sm:text-[17px]"
          >
            Je crée votre site à votre image, comme pour un achat, et vous le louez au mois.
            L’hébergement, le nom de domaine et l’entretien sont compris.
          </p>
          <dl {...rise(3)} className="gws-rise mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            {chiffres.map((chiffre) => (
              <div
                key={chiffre.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <dt className="text-[13px] font-semibold text-white/60">{chiffre.label}</dt>
                <dd className="mt-0.5 font-display text-2xl font-extrabold text-[#54d7c8]">
                  {chiffre.value}
                </dd>
              </div>
            ))}
          </dl>
          <div {...rise(4)} className="gws-rise mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/demo-gratuite?src=location"
              className="gws-button-primary inline-flex min-h-13 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
              data-cta="location-demo"
            >
              Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={whatsappLink(
                `Bonjour, la location de site à ${offreLocation.parMois} € par mois m’intéresse. Mon commerce : `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/45 hover:bg-white/[0.06]"
              data-cta="location-whatsapp"
            >
              <WhatsAppIcon /> Une question sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f3eb] px-5 py-14 text-[#152820] sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <div {...reveal()}>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Ce que comprennent les {offreLocation.parMois} €
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#4a5d56] sm:text-base">
              Un seul prix par mois, sans surprise. Tout est écrit dans le devis avant de signer.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {compris.map((item, index) => (
              <li key={item.title} {...reveal(index % 2)} className="flex gap-3">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-[#1c6358]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-extrabold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-[#4a5d56]">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <h2
            {...reveal()}
            className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]"
          >
            Acheter ou louer ?
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article
              {...reveal()}
              className="rounded-3xl border border-white/12 bg-[#13211e] p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em]">Acheter</h3>
              <p className="mt-1 text-sm font-bold text-[#54d7c8]">Sites à partir de 550 €</p>
              <ul className="mt-5 grid gap-2.5 text-[15px] leading-snug text-white/80">
                {[
                  "Payé en trois fois : 40 % à la commande, 40 % à la validation, 20 % à la mise en ligne",
                  "Le site est à vous une fois payé",
                  "Nom de domaine et hébergement à part, au prix réel du fournisseur",
                  "Finançable par le chèque TIC de la Région Guadeloupe, si vous y êtes éligible",
                ].map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-[#54d7c8]"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
            <article
              {...reveal(1)}
              className="rounded-3xl border border-[#54d7c8]/45 bg-[#13211e] p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em]">Louer</h3>
              <p className="mt-1 text-sm font-bold text-[#54d7c8]">
                {offreLocation.signature} € à la signature, puis {offreLocation.parMois} € par mois
              </p>
              <ul className="mt-5 grid gap-2.5 text-[15px] leading-snug text-white/80">
                {[
                  "Pas de grosse somme à sortir au départ",
                  "Hébergement, nom de domaine et entretien compris",
                  `Sans engagement : vous arrêtez avec ${offreLocation.preavisMois} mois de préavis`,
                  "Le site reste à Gwada Web Studio ; vous pouvez l’acheter à tout moment, sur devis",
                ].map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <Check
                      className="mt-1 h-3.5 w-3.5 shrink-0 text-[#54d7c8]"
                      strokeWidth={3}
                      aria-hidden="true"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {nonCompris.map((item, index) => (
              <li key={item.title} {...reveal(index)} className="flex gap-3">
                <Minus
                  className="mt-1 h-4 w-4 shrink-0 text-[#ffae96]"
                  strokeWidth={3}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-extrabold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/62">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#102019] px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-[1280px]">
          <div {...reveal()}>
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
              Une location claire, sans piège
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/62 sm:text-base">
              Vous restez libre, et rien de ce qui vous appartient ne vous est retiré.
            </p>
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {garanties.map((item, index) => (
              <li key={item.title} {...reveal(index % 2)} className="flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#54d7c8] text-[#0d1715]">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-extrabold tracking-[-0.01em]">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-white/62">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={questions} title="Vos questions sur la location" />

      <section className="px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div
          {...reveal("zoom")}
          className="mx-auto flex max-w-[1280px] flex-col gap-6 rounded-[2rem] bg-[#54d7c8] p-7 text-[#0d271f] sm:p-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Voyez d’abord votre site. Vous choisirez ensuite : acheter ou louer.
          </h2>
          <a
            href="/demo-gratuite?src=location"
            className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-full bg-[#102b23] px-7 text-sm font-extrabold text-white transition hover:bg-[#18483a]"
            data-cta="location-demo-bas"
          >
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    </div>
  );
}
