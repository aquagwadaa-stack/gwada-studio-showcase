import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { contactInfo } from "@/lib/contact-info";

export const Route = createFileRoute("/mentions-legales")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Mentions légales — Gwada Web Studio" },
      { name: "description", content: "Mentions légales du site gwadawebstudio.fr." },
    ],
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/mentions-legales" }],
  }),
  component: LegalNoticePage,
});

function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales" updated="novembre 2026">
      <LegalSection title="Éditeur du site">
        <p>
          Gwada Web Studio, entreprise individuelle (EI).
          <br />9 Résidence Carriacou, 97118 Saint-François, Guadeloupe.
          <br />
          SIREN 102 386 141 R.C.S. Pointe-à-Pitre.
          <br />
          TVA non applicable, art. 293 B du CGI.
        </p>
        <p>
          E-mail : {contactInfo.email}
          <br />
          Téléphone : {contactInfo.phone}
        </p>
      </LegalSection>
      <LegalSection title="Propriété intellectuelle">
        <p>
          Les textes, visuels et éléments graphiques de ce site appartiennent à Gwada Web Studio ou
          à leurs auteurs. Toute reproduction demande une autorisation écrite. Les noms et sites des
          clients cités restent leur propriété.
        </p>
      </LegalSection>
      <LegalSection title="Données personnelles">
        <p>
          Le traitement de vos données est décrit dans la{" "}
          <Link to="/confidentialite" className="text-[#54d7c8] underline underline-offset-2">
            politique de confidentialité
          </Link>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
