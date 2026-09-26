import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Mail,
  Palette,
  Phone,
  QrCode,
  ShieldCheck,
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
    description: "Le modèle Gwada Web Studio, configuré pour votre fiche Google.",
    tag: "Prête à l’emploi",
    features: [
      "Carte NFC + QR code",
      "Lien direct vers vos avis Google",
      "Programmation et configuration incluses",
      "Garantie 1 an",
      "Aucun abonnement",
    ],
  },
  {
    name: "Personnalisée",
    price: "39,90 €",
    accent: "#ff7c6c",
    description: "Le même fonctionnement avec un visuel adapté à votre entreprise.",
    tag: "Design à votre image",
    features: [
      "Tout ce qui est inclus dans la version Standard",
      "Logo de votre entreprise",
      "Couleurs adaptées à votre identité",
      "Garantie 1 an",
      "Aucun abonnement",
    ],
  },
] as const;

function CartesNfcPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="gws-grid absolute inset-0 opacity-20" />

        <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.88fr_1.12fr] lg:items-center">
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
              Une carte posée sur votre comptoir suffit : vos clients approchent leur téléphone ou
              scannent le QR code et arrivent directement sur votre page d’avis Google.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                ["NFC + QR", Wifi],
                ["Dès 29,90 €", Star],
                ["Sans abonnement", Check],
                ["Garantie 1 an", ShieldCheck],
              ].map(([label, Icon]) => {
                const BadgeIcon = Icon as typeof Wifi;
                return (
                  <span
                    key={label as string}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.025] px-4 py-2 text-xs font-black text-white/65"
                  >
                    <BadgeIcon className="h-3.5 w-3.5 text-[#54d7c8]" />
                    {label as string}
                  </span>
                );
              })}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#offres"
                className="gws-button-primary inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-sm font-black"
              >
                Voir les deux versions <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/[0.05]"
              >
                Me contacter
              </Link>
            </div>
          </div>

          <ProductShowcase />
        </div>
      </section>

      <section id="offres" className="bg-[#f7f7ef] px-5 py-20 text-[#101a18] sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <div className="text-xs font-black uppercase tracking-[0.18em] text-[#65716d]">
                Deux versions
              </div>
              <h2 className="mt-4 font-display text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-6xl">
                Même fonctionnement.
                <span className="block text-[#ef6f61]">Le design fait la différence.</span>
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#5f6b67] lg:justify-self-end lg:text-right sm:text-lg">
              La version Standard reprend le modèle Gwada Web Studio. La version Personnalisée
              conserve exactement le même fonctionnement, avec votre logo et vos couleurs.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {offers.map((offer) => (
              <article
                key={offer.name}
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border p-6 shadow-[0_18px_50px_rgba(27,46,40,.07)] sm:p-8 ${offer.name === "Personnalisée" ? "border-[#efb8b2] bg-[#fff9f7]" : "border-[#d2dad5] bg-white"}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{ backgroundColor: offer.accent }}
                />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {offer.name === "Personnalisée" && (
                        <Palette className="h-4 w-4 text-[#ef6f61]" />
                      )}
                      <h3 className="text-2xl font-black">{offer.name}</h3>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider"
                        style={{
                          backgroundColor: `${offer.accent}18`,
                          color: offer.name === "Personnalisée" ? "#b94f45" : "#167f74",
                        }}
                      >
                        {offer.tag}
                      </span>
                    </div>
                    <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#64716c]">
                      {offer.description}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <div
                      className="text-4xl font-black tracking-[-0.05em]"
                      style={{ color: offer.name === "Personnalisée" ? "#ef6f61" : "#167f74" }}
                    >
                      {offer.price}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#7b8783]">
                      paiement unique
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-3 border-t border-[#e1e6e3] pt-6">
                  {offer.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-[15px] font-semibold text-[#3f4d48]"
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
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#101a18] px-5 text-sm font-black text-white transition hover:-translate-y-0.5"
                >
                  Me contacter pour la {offer.name.toLowerCase()}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-[1.4rem] border border-[#d6ddd9] bg-white/65 px-5 py-4 text-sm text-[#5f6b67] sm:flex-row sm:items-center sm:justify-between">
            <span>
              <strong className="text-[#101a18]">Dans les deux cas :</strong> la carte est configurée
              pour votre fiche Google avant utilisation.
            </span>
            <span className="shrink-0 text-xs font-black uppercase tracking-wider text-[#167f74]">
              Aucun abonnement
            </span>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-white/40">
              Pourquoi c’est utile ?
            </div>
            <h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-5xl">
              Retirer les étapes inutiles entre le client et votre page d’avis.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/55">
              Plus besoin de chercher votre établissement sur Google ou de retrouver un lien :
              l’accès à la page d’avis est déjà prêt sur la carte.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["01", Smartphone, "Approchez", "Le téléphone détecte la carte NFC."],
              ["02", QrCode, "Ou scannez", "Le QR code reste disponible en alternative."],
              ["03", Star, "Laissez l’avis", "La page Google s’ouvre directement."],
            ].map(([number, Icon, title, text]) => {
              const StepIcon = Icon as typeof Smartphone;
              return (
                <article
                  key={number as string}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white/25">{number as string}</span>
                    <StepIcon className="h-4.5 w-4.5 text-[#54d7c8]" />
                  </div>
                  <h3 className="mt-6 text-lg font-black">{title as string}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/48">{text as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8 sm:pb-28 lg:px-12">
        <div className="mx-auto grid max-w-[1380px] gap-8 rounded-[2rem] bg-[#54d7c8] p-7 text-[#101a18] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] opacity-60">
              Une question avant de choisir ?
            </div>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-black tracking-[-0.045em] sm:text-5xl">
              Vérifions ensemble votre fiche Google et la version qui vous convient.
            </h2>

            <div className="mt-5 flex flex-col gap-3 text-sm font-bold sm:flex-row sm:gap-5">
              <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a href={`tel:${contactInfo.phoneHref}`} className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
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

function ProductShowcase() {
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

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["01", "Approchez"],
          ["02", "Google s’ouvre"],
          ["03", "Laissez l’avis"],
        ].map(([number, label]) => (
          <div
            key={number}
            className="rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-center"
          >
            <div className="text-[9px] font-black uppercase tracking-wider text-[#54d7c8]">
              {number}
            </div>
            <div className="mt-1 text-[11px] font-black text-white/65 sm:text-xs">{label}</div>
          </div>
        ))}
      </div>

      <figcaption className="mt-3 text-center text-xs font-semibold text-white/38">
        Visuel réel de la carte standard · emplacement QR configuré pour votre commerce
      </figcaption>
    </figure>
  );
}
