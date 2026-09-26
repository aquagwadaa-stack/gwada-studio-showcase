import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { ProjectBriefForm } from "@/components/site/ProjectBriefForm";
import { contactInfo } from "@/lib/contact-info";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gwada Web Studio" },
      {
        name: "description",
        content:
          "Parlez de votre projet à Gwada Web Studio : site web, outil métier, automatisation ou carte NFC.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="absolute inset-x-0 bottom-0 h-[36rem] bg-[radial-gradient(circle_at_30%_100%,rgba(84,215,200,.14),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="text-xs font-black uppercase tracking-[0.18em] text-[#54d7c8]">
              Contact
            </div>
            <h1 className="mt-5 max-w-2xl font-display text-5xl font-black leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Dites-moi ce que vous aimeriez améliorer.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/58">
              Pas besoin d’avoir déjà défini la solution technique. Expliquez simplement votre
              activité, votre problème ou votre idée : je vous répondrai avec une première
              orientation.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold text-white/70 transition hover:border-white/25 hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#54d7c8]" />
                {contactInfo.email}
              </a>
              <a
                href={`tel:${contactInfo.phoneHref}`}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold text-white/70 transition hover:border-white/25 hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#54d7c8]" />
                {contactInfo.phone}
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold text-white/55">
                <MapPin className="h-4 w-4 text-[#54d7c8]" />
                Basé en Guadeloupe · projets à distance possibles
              </div>
            </div>
          </div>

          <ProjectBriefForm />
        </div>
      </section>
    </div>
  );
}
