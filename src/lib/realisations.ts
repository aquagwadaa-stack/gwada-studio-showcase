export type Realisation = {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  features: string[];
  url: string;
  /** Texte affiché dans la barre d'adresse de l'aperçu. */
  address: string;
  /** Chemin de l'image, sans la largeur ni l'extension. */
  image: string;
  alt: string;
  /** Projet du studio, et non d'un client. */
  own?: boolean;
  /** Extrait mot pour mot d'un témoignage publié sur l'accueil. */
  quote?: { text: string; author: string };
};

export const realisations: Realisation[] = [
  {
    slug: "kafe-ceramik",
    name: "Kafé Céramik",
    kind: "Café-atelier à Saint-François",
    summary:
      "Un site à l’image du lieu : on découvre la carte et les ateliers, puis on réserve sa venue en ligne.",
    features: ["Réservation en ligne", "Carte et ateliers", "Espace de gestion"],
    url: "https://kafeceramik.fr/",
    address: "kafeceramik.fr",
    image: "/realisations/kafe-ceramik",
    alt: "Page d’accueil du site Kafé Céramik",
    quote: {
      text: "Il nous a trouvé des solutions à chaque étape et le résultat est magnifique : le site correspond parfaitement à ce que nous souhaitions.",
      author: "Kafe Ceramik",
    },
  },
  {
    slug: "crystal-beach",
    name: "Crystal Beach Courbaril",
    kind: "Location de vacances à Saint-François",
    summary:
      "Un appartement présenté avec ses photos, ses alentours et un guide du séjour, avec les disponibilités et la réservation directe.",
    features: ["Réservation directe", "Disponibilités", "Guide du séjour"],
    url: "https://crystalbeachcourbaril.fr/",
    address: "crystalbeachcourbaril.fr",
    image: "/realisations/crystal-beach",
    alt: "Page d’accueil du site Crystal Beach Courbaril",
    quote: {
      text: "Le site correspond tout à fait à ce que je souhaitais, et je suis ravie du résultat.",
      author: "Appart Courbaril",
    },
  },
  {
    slug: "memo-revision",
    name: "Mémo Révision",
    kind: "Application créée par le studio",
    summary:
      "Une application pour les étudiants en médecine : ils importent leurs cours, elle en tire des QCM corrigés et des examens blancs.",
    features: ["Application web", "Comptes et abonnements", "QCM créés depuis les cours"],
    url: "https://memo-revision.fr/",
    address: "memo-revision.fr",
    image: "/realisations/memo-revision",
    alt: "Page d’accueil de l’application Mémo Révision",
    own: true,
  },
  {
    slug: "cabinet-medical",
    name: "Cabinet médical",
    kind: "Médecine générale à Saint-François",
    summary:
      "Un site clair pour les patients : rendez-vous, horaires, plan d’accès et informations pratiques au même endroit.",
    features: ["Prise de rendez-vous", "Horaires et accès", "Contenus modifiables"],
    url: "https://docaubry.fr/",
    address: "Site du cabinet",
    image: "/realisations/cabinet-medical",
    alt: "Partie rendez-vous de la page d’accueil du site du cabinet médical",
    quote: {
      text: "Les échanges ont été simples et efficaces, avec une bonne compréhension des besoins liés à mon activité.",
      author: "J.-J. A.",
    },
  },
];

export const realisationsClients = realisations.filter((item) => !item.own);
export const memoRevision = realisations.find((item) => item.own)!;
