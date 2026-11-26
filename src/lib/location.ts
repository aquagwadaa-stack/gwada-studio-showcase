/**
 * Location d'un site sur mesure : un seul service, personnalisé.
 * Prix décidés par Louis le 25/11/2026 ; sans engagement depuis le 26/11/2026 (décision de Louis).
 * Les changer ici les change partout sur le site.
 *
 * Cadre (audit juridique du 25/11/2026) : c'est un abonnement de service. Le site reste à
 * Gwada Web Studio, le nom de domaine est au nom du client, et l'achat du site se fait
 * sur devis au prix du moment, sans prix de rachat fixé d'avance ni déduction des loyers.
 */
export const offreLocation = {
  /** Payé à la signature. */
  signature: 99,
  /** Chaque mois ensuite, à la date de la signature, dès le mois suivant. */
  parMois: 89,
  /** Sans engagement : préavis pour arrêter, en mois. */
  preavisMois: 1,
} as const;

export const prixLocation = `${offreLocation.signature} € à la signature, puis ${offreLocation.parMois} € par mois`;

export const questionLocation = {
  question: "Puis-je louer mon site au lieu de l’acheter ?",
  answer: `Oui. Je crée votre site sur mesure de la même façon, et vous le louez : ${prixLocation}, avec l’hébergement, le nom de domaine et l’entretien compris. Sans engagement : vous arrêtez quand vous voulez, avec ${offreLocation.preavisMois} mois de préavis. Le site reste à Gwada Web Studio, et vous pouvez l’acheter à tout moment, sur devis.`,
};
