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

export const CATEGORIES = ["Tous", "Catégorie A", "Catégorie B", "Catégorie C", "Catégorie D"];

export const CATALOGUE: CatalogueItem[] = Array.from({ length: 12 }, (_, i) => {
  const cats = ["Catégorie A", "Catégorie B", "Catégorie C", "Catégorie D"];
  const badges: ("Nouveau" | "Disponible" | "Sur demande")[] = ["Nouveau", "Disponible", "Sur demande"];
  return {
    id: `item-${i + 1}`,
    title: `Article ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    category: cats[i % cats.length],
    price: i % 4 === 3 ? "Sur demande" : `${(199 + i * 87) % 4000 + 199} €`,
    badge: badges[i % badges.length],
    specs: [
      { label: "Référence", value: `REF-${1000 + i}` },
      { label: "Caractéristique 1", value: ["Compact", "Standard", "Premium"][i % 3] },
      { label: "Caractéristique 2", value: ["Léger", "Robuste", "Élégant"][i % 3] },
      { label: "Disponibilité", value: i % 5 === 0 ? "2 semaines" : "Immédiate" },
    ],
    description:
      "Description générique de l'article. Adaptable à tout type de produit, véhicule, bien ou service.",
    seed: i + 3,
  };
});
