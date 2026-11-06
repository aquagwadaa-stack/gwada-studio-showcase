import type { AnyRouteMatch } from "@tanstack/react-router";

type BaliseMeta = NonNullable<AnyRouteMatch["meta"]>[number];

/** Adresse publique du site, sans barre finale. */
export const SITE_URL = "https://gwadawebstudio.fr";

/** Image affichée quand un lien du site est partagé (WhatsApp, Facebook…), 1200 × 630. */
export const IMAGE_PARTAGE = `${SITE_URL}/partage-gwada-web-studio.jpg`;

const ZONES = ["Guadeloupe", "Martinique", "France"];

export type ServiceSeo = {
  name: string;
  /** Zones visées par la page, si elle ne couvre pas toutes les zones du studio. */
  zones?: string[];
  prixDepart?: number;
};

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  /** Titre et description du lien partagé, s'ils diffèrent de ceux de Google. */
  partage?: { title: string; description: string };
  /** Nom de la page dans le fil d'Ariane. Sans nom, pas de fil d'Ariane. */
  nom?: string;
  service?: ServiceSeo;
  /** Autres données structurées propres à la page. */
  donnees?: Record<string, unknown>[];
};

function filAriane(url: string, nom: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: nom, item: url },
    ],
  };
}

function donneesService(url: string, description: string, service: ServiceSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description,
    url,
    provider: { "@id": `${SITE_URL}/#studio` },
    areaServed: service.zones ?? ZONES,
    ...(service.prixDepart
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: service.prixDepart,
              priceCurrency: "EUR",
            },
          },
        }
      : {}),
  };
}

/** Titre, description, lien canonique, partage et données structurées d'une page. */
export function pageHead(page: PageSeo) {
  const { path, title, description, partage, nom, service, donnees = [] } = page;
  const url = `${SITE_URL}${path}`;
  const titrePartage = partage?.title ?? title;
  const descriptionPartage = partage?.description ?? description;
  const structurees = [
    ...(nom ? [filAriane(url, nom)] : []),
    ...(service ? [donneesService(url, description, service)] : []),
    ...donnees,
  ];

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: titrePartage },
      { property: "og:description", content: descriptionPartage },
      { property: "og:url", content: url },
      { name: "twitter:title", content: titrePartage },
      { name: "twitter:description", content: descriptionPartage },
      // Le routeur écrit ces objets dans la page en JSON-LD, sans passer par une balise meta.
      ...structurees.map((objet) => ({ "script:ld+json": objet }) as unknown as BaliseMeta),
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
