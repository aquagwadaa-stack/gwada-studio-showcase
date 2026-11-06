export const contactInfo = {
  brand: "Gwada Web Studio",
  tagline: "Sites et outils web utiles",
  email: "gwada.web.studio@gmail.com",
  phone: "07 45 47 65 34",
  phoneHref: "+33745476534",
  whatsappNumber: "33745476534",
  location: "Guadeloupe",
  serviceArea: "Guadeloupe, France et projets à distance",
} as const;

export const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/gwada_web_studio/" },
  { name: "Facebook", href: "https://www.facebook.com/GwadaWebStudio" },
  { name: "TikTok", href: "https://www.tiktok.com/@gwada.web.studio" },
] as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
