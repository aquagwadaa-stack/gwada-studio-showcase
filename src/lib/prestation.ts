export type LigneInclus = { title: string; text: string };

/** Ce que comprend chaque prestation, de la démonstration au suivi. */
export const etapesInclus: { title: string; items: LigneInclus[] }[] = [
  {
    title: "Avant de commencer",
    items: [
      {
        title: "Une démonstration gratuite",
        text: "Une première version à vos couleurs, à ouvrir sur votre téléphone, sans engagement.",
      },
      {
        title: "Un vrai échange sur votre activité",
        text: "On regarde ensemble ce dont vous avez besoin, par WhatsApp, téléphone, visio ou sur place.",
      },
      {
        title: "Un devis clair",
        text: "Ce qui est inclus, ce qui ne l’est pas, le prix et le délai : tout est écrit avant de démarrer.",
      },
    ],
  },
  {
    title: "Pendant la création",
    items: [
      {
        title: "Un résultat à votre image",
        text: "Vos couleurs, vos photos et votre façon de parler à vos clients, pas un modèle recopié.",
      },
      {
        title: "Pensé pour le téléphone",
        text: "Votre site s’affiche et s’utilise bien sur téléphone, sur tablette et sur ordinateur.",
      },
      {
        title: "Un espace pour tout gérer vous-même",
        text: "Il est inclus sur chaque site, plus ou moins complet selon le projet. Vous modifiez vos contenus sans toucher au code.",
      },
      {
        title: "Les bases pour Google et les IA",
        text: "Titres, descriptions et structure du site sont soignés pour que Google et les assistants IA comprennent votre activité.",
      },
      {
        title: "Deux séries de corrections",
        text: "Vous regroupez vos remarques, je les applique. Deux séries sont prévues dans le prix.",
      },
    ],
  },
  {
    title: "À la mise en ligne",
    items: [
      {
        title: "Des tests avant de publier",
        text: "Je vérifie les pages, les liens et les formulaires, sur téléphone et sur ordinateur.",
      },
      {
        title: "La mise en ligne",
        text: "Je publie le site à votre adresse et je vérifie que tout fonctionne.",
      },
      {
        title: "Une prise en main",
        text: "Je vous montre comment utiliser votre espace, sur ce que vous ferez vraiment au quotidien.",
      },
      {
        title: "Vos accès",
        text: "Vous recevez vos accès et un récapitulatif simple de ce qui a été mis en place.",
      },
    ],
  },
  {
    title: "Après la mise en ligne",
    items: [
      {
        title: "Les bugs sont corrigés",
        text: "Si un problème vient du site que j’ai livré, je le corrige, sans limite de durée, tant que personne d’autre n’y a touché.",
      },
      {
        title: "Le même interlocuteur",
        text: "Vous écrivez directement à la personne qui a créé votre site, ici en Guadeloupe.",
      },
    ],
  },
];

/** Ce qui n'est pas inclus, toujours annoncé dans le devis. */
export const horsInclus: LigneInclus[] = [
  {
    title: "Nom de domaine, hébergement et services externes",
    text: "E-mail, SMS, paiement en ligne : facturés au prix réel du fournisseur, sans marge.",
  },
  {
    title: "Les nouvelles fonctions",
    text: "Une évolution ou une refonte après la mise en ligne a son propre prix, que vous acceptez avant.",
  },
  {
    title: "Vos textes et vos photos",
    text: "Vous me les confiez, et le calendrier démarre quand je les ai.",
  },
  {
    title: "Photos, vidéos et réseaux sociaux",
    text: "Je ne les propose pas : je me consacre aux sites, aux applications et aux outils.",
  },
];

/** Échéancier habituel d'un devis. */
export const echeances = [
  { part: 40, title: "À la commande", text: "Une fois le devis signé." },
  { part: 40, title: "À la validation", text: "Quand vous avez validé le fonctionnement." },
  { part: 20, title: "À la mise en ligne", text: "Quand votre site est publié." },
];

/** Version courte, reprise sur l'accueil et les pages de services. */
export const inclusEssentiel = [
  "Une démonstration gratuite, avant toute décision",
  "Un devis clair, avec le prix et le délai",
  "Un résultat à votre image, pensé pour le téléphone",
  "Un espace pour tout gérer vous-même",
  "Les bases pour Google et les IA",
  "Deux séries de corrections incluses",
  "La mise en ligne et une prise en main",
  "Le même interlocuteur, et les bugs corrigés après la mise en ligne",
];
