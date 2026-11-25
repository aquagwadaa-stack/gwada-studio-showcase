/**
 * Location d'un site sur mesure : un seul service, personnalisé.
 * Prix décidés par Louis le 25/11/2026. Les changer ici les change partout sur le site.
 *
 * Cadre (audit juridique du 25/11/2026) : c'est un abonnement de service. Le site reste à
 * Gwada Web Studio, le nom de domaine est au nom du client, et l'achat du site se fait
 * sur devis au prix du moment, sans prix de rachat fixé d'avance ni déduction des loyers.
 */
export const offreLocation = {
  /** Payé à la signature. */
  signature: 99,
  /** Chaque mois ensuite, dès le mois suivant la signature. */
  parMois: 89,
  /** Durée minimale, en mois, à partir de la signature. */
  engagementMois: 12,
  /** Préavis une fois l'engagement terminé, en mois. */
  preavisMois: 1,
} as const;

export const prixLocation = `${offreLocation.signature} € à la signature, puis ${offreLocation.parMois} € par mois`;

export const questionLocation = {
  question: "Puis-je louer mon site au lieu de l’acheter ?",
  answer: `Oui. Je crée votre site sur mesure de la même façon, et vous le louez : ${prixLocation}, avec l’hébergement, le nom de domaine et l’entretien compris. L’engagement est de ${offreLocation.engagementMois} mois. Le site reste à Gwada Web Studio, et vous pouvez l’acheter à tout moment, sur devis.`,
};
