export type CatalogueItem = {
  id: string;
  title: string;
  category: string;
  price: string;
  badge?: "Nouveau" | "Disponible" | "Sur demande";
  specs: { label: string; value: string }[];
  description: string;
  seed: number;
};

export const CATEGORIES = ["Tous", "Véhicules", "Équipements", "Collections", "Prestations"];

const ITEMS = [
  ["Crossover Horizon", "Véhicules", "36 900 €", "2025", "Hybride", "12 400 km"],
  ["Day Cruiser 28", "Véhicules", "Sur demande", "8,5 m", "300 ch", "Disponible"],
  [
    "Équipement Studio Pro",
    "Équipements",
    "1 490 €",
    "Professionnel",
    "Garantie 2 ans",
    "En stock",
  ],
  [
    "Système Compact One",
    "Équipements",
    "890 €",
    "Compact",
    "Installation incluse",
    "Sous 7 jours",
  ],
  [
    "Collection Rivage",
    "Collections",
    "À partir de 64 €",
    "4 variantes",
    "Série limitée",
    "Disponible",
  ],
  ["Édition Signature", "Collections", "129 €", "Finition premium", "Sur commande", "3 coloris"],
  [
    "Formule Essentielle",
    "Prestations",
    "Sur devis",
    "Accompagnement",
    "Personnalisable",
    "Réponse 24 h",
  ],
  [
    "Expérience Premium",
    "Prestations",
    "À partir de 190 €",
    "Sur mesure",
    "Prioritaire",
    "Tout compris",
  ],
  ["Cabriolet Azur", "Véhicules", "42 500 €", "2024", "Essence", "8 200 km"],
  ["Pack Mobilité", "Équipements", "2 390 €", "Tout-en-un", "Livraison incluse", "Disponible"],
  ["Série Mangrove", "Collections", "79 €", "Artisanal", "5 modèles", "Nouveau"],
  ["Session Découverte", "Prestations", "90 €", "60 minutes", "Individuel", "Réservable"],
] as const;

export const CATALOGUE: CatalogueItem[] = ITEMS.map((item, index) => ({
  id: `selection-${index + 1}`,
  title: item[0],
  category: item[1],
  price: item[2],
  badge: index % 3 === 0 ? "Nouveau" : index % 3 === 1 ? "Sur demande" : "Disponible",
  specs: [
    { label: "Référence", value: `GWS-${1000 + index}` },
    { label: "Information 1", value: item[3] },
    { label: "Information 2", value: item[4] },
    { label: "Disponibilité", value: item[5] },
  ],
  description:
    "Cette fiche montre comment présenter clairement une offre, ses caractéristiques, sa disponibilité et les actions utiles au client.",
  seed: index + 3,
}));
