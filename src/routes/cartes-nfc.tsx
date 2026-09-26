import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Mail,
  Palette,
  Phone,
  QrCode,
  Smartphone,
  Star,
  Wifi,
} from "lucide-react";
import { contactInfo } from "@/lib/contact-info";

export const Route = createFileRoute("/cartes-nfc")({
  head: () => ({
    meta: [
      { title: "Cartes NFC pour avis Google — Gwada Web Studio" },
      {
        name: "description",
        content:
          "Cartes NFC + QR pour faciliter les avis Google : version standard à 29,90 € ou personnalisée à 39,90 €, sans abonnement.",
      },
    ],
  }),
  component: CartesNfcPage,
});

const offers = [
  {
    name: "Standard",
    price: "29,90 €",
    accent: "#54d7c8",
    description: "Une carte prête à être posée dans votre commerce.",
    features: [
      "Carte NFC + QR code",
      "Accès direct à votre page d’avis Google",
      "Programmation et configuration incluses",
      "Garantie 1 an",
      "Aucun abonnement",
    ],
  },
  {
    name: "Personnalisée",
    price: "39,90 €",
    accent: "#ff7c6c",
    description: "La même simplicité, avec une carte adaptée à votre identité visuelle.",
    features: [
      "Tout ce qui est inclus dans la version Standard",
      "Design personnalisé",
      "Logo et couleurs de votre entreprise",
      "Garantie 1 an",
      "Aucun abonnement",
    ],
  },
] as const;

function CartesNfcPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="gws-grid absolute inset-0 opacity-20" />
        <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/70">
              <Wifi className="h-3.5 w-3.5 text-[#54d7c8]" />
              Cartes NFC pour avis Google
            </div>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Plus simple de demander un avis.
              <span className="block text-[#ff7c6c]">Plus simple d’en laisser un.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/60">
              Vos clients approchent leur téléphone de la carte ou scannent le QR code. Votre page
              d’avis Google s’ouvre directement, sans recherche ni manipulation compliquée.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["NFC + QR", "Dès 29,90 €", "Sans abonnement", "Garantie 1 an"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/12 px-4 py-2 text-xs font-black text-white/65"
                >
                  {item}
                </span>
              ))}
            </div>
            <a
              href="#offres"
              className="gws-button-primary mt-9 inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
            >
              Voir les deux versions <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <ProductMockup />
        </div>
      </section>

      <section className="bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#65716d]">
              Comment ça marche ?
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Trois secondes suffisent pour comprendre.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: Smartphone,
                title: "Approchez",
                text: "Le client approche son téléphone de la carte.",
              },
              {
                number: "02",
                icon: QrCode,
                title: "Ou scannez",
                text: "Le QR code offre une deuxième façon d’ouvrir le lien.",
              },
              {
                number: "03",
                icon: Star,
                title: "Laissez l’avis",
                text: "La page Google s’ouvre directement pour écrire l’avis.",
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-[1.8rem] border border-[#d6ddd9] bg-white p-6 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#77827e]">{step.number}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#101a18] text-[#54d7c8]">
                    <step.icon className="h-5 w-5" />
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#66716d]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="offres" className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="max-w-3xl">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Les deux versions
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">
              Même fonctionnement.
              <span className="block text-[#f2cb5d]">Deux niveaux de personnalisation.</span>
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.name}
                className={`relative overflow-hidden rounded-[2rem] border p-6 sm:p-8 ${offer.name === "Personnalisée" ? "border-[#ff7c6c]/45 bg-[#ff7c6c]/[0.055]" : "border-white/10 bg-[#13211e]"}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: offer.accent }}
                />
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {offer.name === "Personnalisée" && (
                        <Palette className="h-4 w-4 text-[#ff7c6c]" />
                      )}
                      <h3 className="text-2xl font-black">{offer.name}</h3>
                      {offer.name === "Personnalisée" && (
                        <span className="rounded-full bg-[#ff7c6c]/12 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-[#ff9a8e]">
                          Design à votre image
                        </span>
                      )}
                    </div>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/52">
                      {offer.description}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <div
                      className="text-4xl font-black tracking-[-0.05em]"
                      style={{ color: offer.accent }}
                    >
                      {offer.price}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/35">
                      paiement unique
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-3 border-t border-white/10 pt-6">
                  {offer.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-[15px] font-semibold text-white/68"
                    >
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                        style={{ backgroundColor: `${offer.accent}22`, color: offer.accent }}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                      {feature}
                    </div>
                  ))}
                </div>

                <a
                  href={`mailto:${contactInfo.email}?subject=${encodeURIComponent(`Carte NFC ${offer.name}`)}`}
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-black text-[#101a18]"
                  style={{ backgroundColor: offer.accent }}
                >
                  Choisir {offer.name.toLowerCase()} <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-8 rounded-[2rem] bg-[#f7f7ef] p-7 text-[#101a18] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] text-[#65716d]">
              Une question avant de choisir ?
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-[-0.045em] sm:text-5xl">
              Contactez-moi directement.
            </h2>
            <div className="mt-5 flex flex-col gap-3 text-sm font-bold text-[#4d5a56] sm:flex-row sm:gap-5">
              <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#167f74]" />
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phoneHref}`} className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#167f74]" />
                {contactInfo.phone}
              </a>
            </div>
          </div>
          <Link
            to="/contact"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#101a18] px-7 text-sm font-black text-white"
          >
            Me contacter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProductMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-[650px] lg:ml-auto">
      <div className="absolute -left-4 top-12 h-32 w-32 rounded-full bg-[#54d7c8]/15 blur-3xl" />
      <div className="absolute -right-4 bottom-8 h-36 w-36 rounded-full bg-[#ff7c6c]/15 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white p-2 shadow-[0_30px_80px_rgba(0,0,0,.28)] sm:p-3">
        <img
          src="/carte-nfc-google-avis.webp"
          alt="Carte NFC Gwada Web Studio pour laisser un avis Google"
          className="block h-auto w-full rounded-[1.55rem]"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs font-semibold text-white/40">
        Visuel réel de la carte standard · le QR est associé à votre fiche Google
      </figcaption>
    </figure>
  );
}
