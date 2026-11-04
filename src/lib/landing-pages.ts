import type { FaqItem } from "@/components/site/FaqSection";

export type LandingReference = { name: string; kind: string; url: string; domain: string };

export type LandingPage = {
  path: string;
  source: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  accent: string;
  intro: string;
  pointsTitle: string;
  points: { title: string; text: string }[];
  reference: LandingReference;
  example?: { label: string; href: string };
  faq: FaqItem[];
};

const crystalBeach: LandingReference = {
  name: "Crystal Beach Courbaril",
  kind: "Un appartement de vacances à Saint-François, avec réservation directe.",
  url: "https://crystalbeachcourbaril.fr/",
  domain: "crystalbeachcourbaril.fr",
};

const kafeCeramik: LandingReference = {
  name: "Kafé Céramik",
  kind: "Un café-atelier à Saint-François, avec réservation des ateliers en ligne.",
  url: "https://kafeceramik.fr/",
  domain: "kafeceramik.fr",
};

const demoFaq: FaqItem = {
  question: "La démonstration est-elle vraiment gratuite ?",
  answer:
    "Oui, et elle ne vous engage à rien. Si vous ne souhaitez pas continuer, vous ne me devez rien.",
};

const priceFaq: FaqItem = {
  question: "Combien coûte un site ?",
  answer:
    "Un site vitrine commence à 550 €. Le prix dépend ensuite de ce qu’il doit faire. Après la démonstration, vous recevez un devis clair, avec ce qui est inclus et ce qui ne l’est pas.",
};

export const landingPages = {
  guadeloupe: {
    path: "/creation-site-internet-guadeloupe",
    source: "seo-guadeloupe",
    title: "Création de site internet en Guadeloupe, démo gratuite — Gwada Web Studio",
    description:
      "Site vitrine, réservation, paiement : je crée votre site internet en Guadeloupe. Démonstration gratuite à vos couleurs, vous voyez le résultat avant de payer.",
    eyebrow: "Création de site internet · Guadeloupe",
    headline: "Votre site internet,",
    accent: "créé en Guadeloupe.",
    intro:
      "Je suis basé à Saint-François, et je crée des sites pour les commerces, artisans, hébergements et professionnels de toute la Guadeloupe. Vous voyez une démonstration à vos couleurs avant de décider.",
    pointsTitle: "Ce qui change avec un studio sur place",
    points: [
      {
        title: "Un interlocuteur à côté de chez vous",
        text: "On peut se voir, s’appeler ou s’écrire sur WhatsApp. Et je reste joignable après la mise en ligne.",
      },
      {
        title: "Votre activité, pas un modèle",
        text: "Vos services, vos photos, vos horaires, votre façon de parler à vos clients.",
      },
      {
        title: "Pensé pour le téléphone",
        text: "Vos clients vous cherchent sur leur téléphone. Le site leur donne vite ce qu’ils veulent savoir.",
      },
      {
        title: "Réservation, acompte, commande",
        text: "Si votre activité en a besoin, le site peut prendre des réservations, encaisser un acompte ou recevoir des commandes.",
      },
    ],
    reference: kafeCeramik,
    faq: [
      {
        question: "Travaillez-vous dans toute la Guadeloupe ?",
        answer:
          "Oui. Je suis à Saint-François et je travaille avec toute la Guadeloupe, sur place ou à distance.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  martinique: {
    path: "/creation-site-internet-martinique",
    source: "seo-martinique",
    title: "Création de site internet en Martinique, démo gratuite — Gwada Web Studio",
    description:
      "Un site internet pour votre activité en Martinique, créé à distance depuis la Guadeloupe. Démonstration gratuite à vos couleurs, sans engagement.",
    eyebrow: "Création de site internet · Martinique",
    headline: "Un site à votre image,",
    accent: "pour votre activité en Martinique.",
    intro:
      "Je suis basé en Guadeloupe et je travaille à distance avec les entreprises des Antilles. Même fuseau horaire, échanges par WhatsApp ou en visio, et une démonstration à vos couleurs avant toute décision.",
    pointsTitle: "Comment on travaille à distance",
    points: [
      {
        title: "Même heure, mêmes habitudes",
        text: "Vous m’écrivez pendant votre journée, je vous réponds pendant la mienne.",
      },
      {
        title: "Vous voyez avant de décider",
        text: "La démonstration s’ouvre sur votre téléphone. Vous pouvez la montrer autour de vous.",
      },
      {
        title: "Un seul interlocuteur",
        text: "Du premier échange au suivi après la mise en ligne, vous parlez toujours à la même personne.",
      },
      {
        title: "Votre site évolue avec vous",
        text: "Il peut commencer simple, puis accueillir réservation, paiement ou catalogue.",
      },
    ],
    reference: crystalBeach,
    faq: [
      {
        question: "Peut-on travailler sans se voir ?",
        answer:
          "Oui. Tout se fait facilement par WhatsApp, téléphone ou visio, et vous suivez chaque étape en ligne.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  restaurant: {
    path: "/site-internet-restaurant",
    source: "seo-restaurant",
    title: "Site internet pour restaurant et traiteur, démo gratuite — Gwada Web Studio",
    description:
      "Votre carte, vos horaires, vos réservations ou commandes en direct, sur un site à votre image. Démonstration gratuite pour votre restaurant ou votre activité de traiteur.",
    eyebrow: "Restaurants, traiteurs, pâtisseries",
    headline: "Un site qui donne faim,",
    accent: "et envie de réserver.",
    intro:
      "Vos clients veulent voir votre carte, vos horaires et comment vous joindre, sans chercher. Je crée un site à l’image de votre cuisine et de votre lieu, et je vous le montre avant que vous décidiez.",
    pointsTitle: "Ce que votre site peut faire",
    points: [
      {
        title: "Votre carte, toujours lisible",
        text: "Sur téléphone, sans PDF à télécharger ni photo floue d’un menu.",
      },
      {
        title: "Réservations ou commandes en direct",
        text: "Vos clients réservent ou commandent chez vous, selon ce qui convient à votre organisation.",
      },
      {
        title: "Vos horaires et votre adresse en un geste",
        text: "Un bouton pour appeler, un bouton pour venir.",
      },
      {
        title: "Vos menus de fêtes et de groupes",
        text: "Une page pour vos menus de Noël, vos buffets et vos événements, avec les demandes au même endroit.",
      },
    ],
    reference: kafeCeramik,
    faq: [
      {
        question: "J’ai déjà Facebook et Instagram, pourquoi un site ?",
        answer:
          "Vos réseaux restent utiles. Le site réunit tout au même endroit, et il aide à vous trouver quand on cherche un restaurant sur Google.",
      },
      {
        question: "Pourrai-je modifier ma carte ?",
        answer:
          "Oui si vous le souhaitez : c’est prévu au devis. Sinon, vous m’envoyez vos changements et je m’en occupe.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  artisan: {
    path: "/site-internet-artisan",
    source: "seo-artisan",
    title: "Site internet pour artisan, demandes de devis, démo gratuite — Gwada Web Studio",
    description:
      "Électriciens, climatisation, rénovation, jardins : un site pour montrer vos réalisations et recevoir des demandes de devis. Démonstration gratuite, sans engagement.",
    eyebrow: "Artisans et entreprises de services",
    headline: "Vos chantiers parlent pour vous.",
    accent: "Votre site aussi.",
    intro:
      "Quand on cherche un artisan, on regarde qui il est, ce qu’il a déjà fait et comment le joindre. Je crée un site simple qui répond à ces trois questions, et je vous le montre avant que vous décidiez.",
    pointsTitle: "Ce que votre site peut faire",
    points: [
      {
        title: "Vos services et votre secteur",
        text: "Ce que vous faites, où vous intervenez, clairement écrit pour vos clients et pour Google.",
      },
      {
        title: "Vos réalisations en photos",
        text: "Une galerie de vos chantiers, ajoutés au fil du temps.",
      },
      {
        title: "Une demande de devis simple",
        text: "Un formulaire court qui vous donne les bonnes informations avant de rappeler.",
      },
      {
        title: "Un bouton pour vous appeler",
        text: "Sur téléphone, votre client vous joint en un geste, même depuis un chantier.",
      },
    ],
    reference: crystalBeach,
    faq: [
      {
        question: "Je n’ai pas le temps de m’en occuper.",
        answer:
          "C’est prévu : je prépare tout à partir de ce qui existe déjà, et je vous demande seulement de valider.",
      },
      {
        question: "Je n’ai pas beaucoup de photos.",
        answer:
          "Quelques photos prises au téléphone suffisent pour commencer. On pourra en ajouter ensuite.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  locationSaisonniere: {
    path: "/site-internet-location-saisonniere",
    source: "seo-location",
    title: "Site de réservation directe pour gîte et location, démo gratuite — Gwada Web Studio",
    description:
      "Un site à votre nom pour votre gîte, votre chambre d’hôtes ou votre location saisonnière, avec réservation directe, en plus d’Airbnb et de Booking. Démonstration gratuite.",
    eyebrow: "Gîtes, locations, chambres d’hôtes",
    headline: "Votre location mérite",
    accent: "son propre site.",
    intro:
      "Un site à votre nom présente votre lieu comme vous le voyez, et permet de réserver en direct, en plus de vos annonces. Je vous prépare une démonstration avant toute décision.",
    pointsTitle: "Ce que votre site peut faire",
    points: [
      {
        title: "Réservation directe",
        text: "Vos voyageurs réservent chez vous, sans passer par une plateforme pour chaque séjour.",
      },
      {
        title: "Vos photos, votre histoire",
        text: "Le lieu, les environs, vos conseils : ce qu’une annonce ne permet pas de raconter.",
      },
      {
        title: "Acompte en ligne",
        text: "Le site peut encaisser un acompte, sur votre propre compte, selon les règles que vous fixez.",
      },
      {
        title: "Un lien à donner à vos anciens voyageurs",
        text: "Ceux qui ont aimé votre lieu peuvent revenir directement chez vous.",
      },
    ],
    reference: crystalBeach,
    faq: [
      {
        question: "Dois-je quitter Airbnb ou Booking ?",
        answer:
          "Non. Votre site vient en plus de vos annonces. Vous gardez vos plateformes et vous ajoutez un canal à vous.",
      },
      {
        question: "Comment éviter les doubles réservations ?",
        answer:
          "Le calendrier du site se règle selon votre organisation. On regarde ensemble ce qu’il faut relier à vos plateformes actuelles.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  beaute: {
    path: "/site-internet-salon-institut",
    source: "seo-beaute",
    title: "Site internet pour salon de coiffure et institut, démo gratuite — Gwada Web Studio",
    description:
      "Vos prestations, vos tarifs, vos réalisations et vos rendez-vous en ligne, sur un site à votre image. Démonstration gratuite pour votre salon ou votre institut.",
    eyebrow: "Coiffure, onglerie, institut, bien-être",
    headline: "Votre talent se voit.",
    accent: "Votre site doit le montrer.",
    intro:
      "Vos clientes vous découvrent sur Instagram, puis cherchent vos prestations, vos prix et comment prendre rendez-vous. Je crée un site qui répond à tout cela, et je vous le montre avant que vous décidiez.",
    pointsTitle: "Ce que votre site peut faire",
    points: [
      {
        title: "Vos prestations et vos tarifs",
        text: "Clairs et à jour, pour répondre aux questions avant même qu’on vous les pose.",
      },
      {
        title: "Rendez-vous en ligne",
        text: "Vos clientes choisissent un créneau à toute heure, même quand vous travaillez.",
      },
      {
        title: "Vos plus belles réalisations",
        text: "Une galerie à votre image, à côté de votre compte Instagram.",
      },
      {
        title: "Bons cadeaux",
        text: "Une page pour vendre vos bons cadeaux, pratique pour les fêtes.",
      },
    ],
    reference: kafeCeramik,
    faq: [
      {
        question: "J’ai déjà un compte Instagram qui marche bien.",
        answer:
          "Tant mieux, il reste votre vitrine. Le site aide les gens à passer à l’action : voir les prix, réserver, vous trouver sur Google.",
      },
      {
        question: "Puis-je garder mon outil de rendez-vous actuel ?",
        answer: "Oui, on peut le relier au site s’il vous convient.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  antillais: {
    path: "/site-internet-commerce-antillais",
    source: "seo-antillais",
    title: "Site internet pour commerce antillais en métropole, démo gratuite — Gwada Web Studio",
    description:
      "Restaurant créole, traiteur antillais, épicerie, salon, association : un site créé depuis la Guadeloupe, qui garde le goût des Antilles. Démonstration gratuite.",
    eyebrow: "Commerces antillais en métropole",
    headline: "Un site qui a le goût des Antilles,",
    accent: "où que vous soyez.",
    intro:
      "Restaurant créole, traiteur, épicerie, salon, association : vous faites vivre les Antilles en métropole. Je vis en Guadeloupe, je connais cet univers, et je crée votre site à distance.",
    pointsTitle: "Pourquoi travailler avec un studio de Guadeloupe",
    points: [
      {
        title: "Pas besoin de tout expliquer",
        text: "Vos plats, vos produits, vos clients : on se comprend vite, et le site le montre.",
      },
      {
        title: "Tout se fait à distance",
        text: "WhatsApp, téléphone ou visio, à l’heure qui vous arrange.",
      },
      {
        title: "Vos commandes et vos événements",
        text: "Menus, traiteur, réservations, boutique : le site s’adapte à votre activité.",
      },
      {
        title: "Vous voyez avant de décider",
        text: "Je vous prépare une démonstration à vos couleurs, sans engagement.",
      },
    ],
    reference: kafeCeramik,
    faq: [
      {
        question: "Vous êtes en Guadeloupe, comment ça se passe ?",
        answer:
          "Très simplement : on échange par WhatsApp ou en visio. La métropole a quelques heures d’avance, et je m’organise pour vous répondre sur vos horaires.",
      },
      demoFaq,
      priceFaq,
    ],
  },
  noel: {
    path: "/site-commandes-noel",
    source: "seo-noel",
    title: "Site de commandes de Noël pour traiteur et pâtissier, démo gratuite — Gwada Web Studio",
    description:
      "Traiteurs, pâtissiers, restaurateurs, fleuristes : une page à votre image pour présenter vos menus de fêtes et recevoir les commandes de Noël. Démonstration gratuite.",
    eyebrow: "Traiteurs, pâtissiers, restaurateurs, fleuristes",
    headline: "Vos commandes de Noël,",
    accent: "au même endroit.",
    intro:
      "Une page à votre image où vos clients voient vos menus de fêtes et passent commande, sans dizaines de messages à suivre. Je vous prépare une démonstration avant toute décision.",
    pointsTitle: "Ce que votre page peut faire",
    points: [
      {
        title: "Vos menus et vos coffrets",
        text: "Photos, prix, quantités et ce qui est inclus, clairement présentés sur téléphone.",
      },
      {
        title: "Les commandes au même endroit",
        text: "Chaque demande arrive complète : nom, téléphone, plats, date de retrait ou de livraison.",
      },
      {
        title: "Vos dates limites",
        text: "Vos clients voient jusqu’à quand commander et quand récupérer leur commande.",
      },
      {
        title: "Un acompte si vous le souhaitez",
        text: "La page peut encaisser un acompte sur votre propre compte, selon vos règles.",
      },
    ],
    reference: kafeCeramik,
    example: { label: "Voir un exemple de page de commandes", href: "/exemple-commandes-noel" },
    faq: [
      {
        question: "Est-ce que ce sera prêt à temps ?",
        answer:
          "Plus on démarre tôt, plus vos clients ont le temps de commander. On fixe la date ensemble avant de signer le devis.",
      },
      {
        question: "Et après les fêtes ?",
        answer:
          "La page peut devenir un vrai site à votre image, ou resservir pour vos prochains événements.",
      },
      demoFaq,
      priceFaq,
    ],
  },
} satisfies Record<string, LandingPage>;

export function landingHead(page: LandingPage) {
  return {
    meta: [
      { title: page.title },
      { name: "description", content: page.description },
      { property: "og:title", content: page.title },
      { property: "og:description", content: page.description },
    ],
    links: [{ rel: "canonical", href: `https://gwadawebstudio.fr${page.path}` }],
  };
}
