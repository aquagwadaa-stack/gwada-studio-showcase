// Aperçu de page de commandes de Noël, envoyé à un commerce pour lui montrer ce qu'il aurait.
// Produits, prix et dates sont des exemples : la page le dit en permanence.

export type TypeApercu = "traiteur" | "patisserie" | "fleuriste" | "epicerie";

export type ProduitApercu = { id: string; nom: string; detail: string; prix: number };

export type ModeleApercu = {
  libelle: string;
  accroche: string;
  sousTitre: string;
  couleurs: {
    profond: string;
    fond: string;
    encre: string;
    doux: string;
    accent: string;
    or: string;
  };
  produits: ProduitApercu[];
  selection: Record<string, number>;
};

export const typesApercu: TypeApercu[] = ["traiteur", "patisserie", "fleuriste", "epicerie"];

export const modelesApercu: Record<TypeApercu, ModeleApercu> = {
  traiteur: {
    libelle: "Traiteur",
    accroche: "Le réveillon, sans passer la journée en cuisine.",
    sousTitre: "Choisissez vos plats et votre date : tout sera prêt pour vous.",
    couleurs: {
      profond: "#12372a",
      fond: "#fbf6ea",
      encre: "#1c2a24",
      doux: "#5a6a62",
      accent: "#a8342b",
      or: "#d9b44a",
    },
    produits: [
      { id: "boudin", nom: "Boudin créole", detail: "La douzaine, prêt à réchauffer", prix: 18 },
      { id: "accras", nom: "Accras de morue", detail: "Les 30 pièces", prix: 21 },
      {
        id: "jambon",
        nom: "Jambon de Noël à l’ananas",
        detail: "La part, avec sa sauce",
        prix: 14,
      },
      { id: "pois", nom: "Pois d’angole et igname", detail: "La part", prix: 8 },
      { id: "menu", nom: "Menu réveillon pour 4", detail: "Entrée, plat et dessert", prix: 96 },
    ],
    selection: { boudin: 1, jambon: 4 },
  },
  patisserie: {
    libelle: "Pâtisserie",
    accroche: "Vos douceurs de Noël, réservées à l’avance.",
    sousTitre: "Choisissez vos gâteaux et votre date de retrait : ils vous attendent.",
    couleurs: {
      profond: "#3a2118",
      fond: "#fdf5e9",
      encre: "#2d1e17",
      doux: "#6d5a50",
      accent: "#c2513a",
      or: "#e0b65a",
    },
    produits: [
      { id: "coco", nom: "Bûche coco-passion", detail: "6 parts", prix: 36 },
      { id: "choco", nom: "Bûche chocolat-banane", detail: "6 parts", prix: 36 },
      { id: "tourments", nom: "Tourments d’amour", detail: "La boîte de 6", prix: 15 },
      { id: "patate", nom: "Gâteau patate", detail: "Le gâteau entier", prix: 20 },
      { id: "sables", nom: "Sablés à la cannelle", detail: "La boîte cadeau", prix: 12 },
    ],
    selection: { coco: 1, tourments: 2 },
  },
  fleuriste: {
    libelle: "Fleuriste",
    accroche: "Vos fleurs de Noël, prêtes le jour choisi.",
    sousTitre: "Choisissez votre composition et votre date : en boutique ou livrée chez vous.",
    couleurs: {
      profond: "#3b1f36",
      fond: "#fbf4f1",
      encre: "#2a1a27",
      doux: "#6c5a68",
      accent: "#b42a5c",
      or: "#dcae5c",
    },
    produits: [
      {
        id: "couronne",
        nom: "Couronne de porte",
        detail: "Feuillages tropicaux et fruits séchés",
        prix: 45,
      },
      {
        id: "centre",
        nom: "Centre de table de fêtes",
        detail: "Pour une table de 6 à 8",
        prix: 55,
      },
      { id: "anthuriums", nom: "Bouquet d’anthuriums", detail: "Taille moyenne", prix: 38 },
      { id: "rouge", nom: "Bouquet rouge et or", detail: "Grande taille", prix: 60 },
      { id: "pot", nom: "Petite composition à offrir", detail: "En pot, prête à offrir", prix: 25 },
    ],
    selection: { couronne: 1, centre: 1 },
  },
  epicerie: {
    libelle: "Épicerie fine",
    accroche: "Vos coffrets de fêtes, prêts à offrir.",
    sousTitre: "Composez vos cadeaux en quelques gestes : on les prépare pour la date choisie.",
    couleurs: {
      profond: "#1f2d4d",
      fond: "#f8f5ec",
      encre: "#1b2334",
      doux: "#5d6577",
      accent: "#b5651d",
      or: "#dcb255",
    },
    produits: [
      {
        id: "saveurs",
        nom: "Coffret saveurs créoles",
        detail: "Confitures, épices et sirops",
        prix: 35,
      },
      { id: "cafe", nom: "Coffret café et cacao", detail: "Café, cacao et biscuits", prix: 32 },
      { id: "panier", nom: "Panier gourmand", detail: "Pour 4 personnes", prix: 65 },
      { id: "epices", nom: "Coffret d’épices", detail: "6 mélanges à offrir", prix: 24 },
      {
        id: "entreprise",
        nom: "Coffret d’entreprise",
        detail: "L’unité, dès 10 coffrets",
        prix: 18,
      },
    ],
    selection: { saveurs: 2, panier: 1 },
  },
};

export const datesApercu = ["Mercredi 23 décembre", "Jeudi 24 décembre", "Jeudi 31 décembre"];
export const dateLimiteApercu = "20 décembre";

const NOM_MAX = 80;

// Le nom vient de l'adresse : on ne garde que ce qu'un nom de commerce peut contenir.
export function lireNom(valeur: unknown): string | undefined {
  if (typeof valeur !== "string" && typeof valeur !== "number") return undefined;
  const nom = String(valeur)
    .replace(/[^\p{L}\p{N}\s'’&.,()-]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
  if (nom.length <= NOM_MAX) return nom || undefined;
  return nom.slice(0, nom.lastIndexOf(" ", NOM_MAX)).trim() || nom.slice(0, NOM_MAX);
}

export function lireType(valeur: unknown): TypeApercu | undefined {
  return typesApercu.find((type) => type === valeur);
}

export const euros = (montant: number) => `${montant} €`;
