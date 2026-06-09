// Coordonnées affichées par le showroom — REMPLACER par les vraies infos.
export const contactInfo = {
  brand: "Gwada Web Studio",
  tagline: "Création de sites web en Guadeloupe",
  email: "contact@gwadawebstudio.fr",
  phone: "+590 690 00 00 00",
  whatsapp: "590690000000", // format international sans + ni espaces
  address: "Pointe-à-Pitre, Guadeloupe",
  hours: [
    { day: "Lundi – Vendredi", time: "9h – 18h" },
    { day: "Samedi", time: "Sur rendez-vous" },
    { day: "Dimanche", time: "Fermé" },
  ],
} as const;

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${contactInfo.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
