import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { ProjectBriefForm } from "@/components/site/ProjectBriefForm";
import { WhatsAppIcon } from "@/components/site/WhatsApp";
import { rise } from "@/components/site/Motion";
import { contactInfo, whatsappLink } from "@/lib/contact-info";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  staticData: { sitemap: true },
  head: () =>
    pageHead({
      path: "/contact",
      title: "Contact — Gwada Web Studio, Les Abymes, Guadeloupe",
      description:
        "Parlez de votre projet à Gwada Web Studio, aux Abymes : site internet, application, outil sur mesure ou carte d’avis Google. WhatsApp, téléphone ou e-mail.",
      nom: "Contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-[#0d1715] text-[#f7f7ef]">
      <section className="relative overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
        <div className="absolute inset-x-0 bottom-0 h-[36rem] bg-[radial-gradient(circle_at_30%_100%,rgba(84,215,200,.14),transparent_62%)]" />
        <div className="relative mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <h1 className="gws-rise max-w-2xl font-display text-[clamp(2.25rem,4.3vw,3.75rem)] font-extrabold leading-[1.05] tracking-[-0.045em]">
              Dites-moi ce que vous aimeriez améliorer.
            </h1>
            <p
              {...rise(1)}
              className="gws-rise mt-5 max-w-xl text-base leading-relaxed text-white/68 sm:text-[17px]"
            >
              Pas besoin d’avoir déjà défini la solution technique. Expliquez simplement votre
              activité, votre problème ou votre idée : je vous répondrai avec une première
              orientation.
            </p>

            <div {...rise(2)} className="gws-rise mt-9 space-y-3">
              <Link
                to="/demo-gratuite"
                className="flex items-center gap-3 rounded-2xl border border-[#54d7c8]/35 bg-[#54d7c8]/10 px-5 py-4 text-sm font-bold text-[#b9f7e9] transition hover:border-[#54d7c8]"
                data-cta="contact-demo"
              >
                <Sparkles className="h-4 w-4 text-[#54d7c8]" />
                Voir votre site avant de payer : démo gratuite
              </Link>
              <a
                href={whatsappLink("Bonjour, ")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-sm font-bold text-white/70 transition hover:border-white/25 hover:text-white"
                data-cta="contact-whatsapp"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#54d7c8]" />
                WhatsApp : {contactInfo.phone}
              </a>
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
                Basé aux Abymes, en Guadeloupe. Martinique et France à distance
              </div>
            </div>
          </div>

          <ProjectBriefForm />
        </div>
      </section>
    </div>
  );
}
