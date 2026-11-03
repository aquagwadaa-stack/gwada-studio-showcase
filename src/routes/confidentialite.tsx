import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { contactInfo } from "@/lib/contact-info";

export const Route = createFileRoute("/confidentialite")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Confidentialité — Gwada Web Studio" },
      {
        name: "description",
        content: "Comment Gwada Web Studio utilise et protège vos données personnelles.",
      },
    ],
    links: [{ rel: "canonical", href: "https://gwadawebstudio.fr/confidentialite" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage title="Confidentialité" updated="novembre 2026">
      <LegalSection title="Qui est responsable de vos données">
        <p>
          Gwada Web Studio, entreprise individuelle, 9 Résidence Carriacou, 97118 Saint-François,
          Guadeloupe. Contact : {contactInfo.email}.
        </p>
      </LegalSection>
      <LegalSection title="Quand vous remplissez un formulaire">
        <p>
          Je reçois ce que vous indiquez : nom du commerce ou prénom, activité, ville, téléphone,
          e-mail, lien vers votre site ou vos réseaux, et votre message. Les champs marqués comme
          obligatoires sont nécessaires pour vous répondre ou préparer votre démonstration.
        </p>
        <p>
          Ces données servent uniquement à répondre à votre demande et à suivre notre échange, sur
          la base de votre demande. Elles sont conservées 3 ans après notre dernier échange, sauf si
          un contrat impose une durée plus longue.
        </p>
      </LegalSection>
      <LegalSection title="Si je vous ai contacté en premier">
        <p>
          Je prospecte des professionnels au sujet de leur activité, sur la base de mon intérêt
          légitime à faire connaître mes services. J’utilise des coordonnées professionnelles
          publiques, trouvées sur les fiches d’établissement Google, les sites internet et les
          réseaux sociaux : nom du commerce, métier, commune, téléphone, e-mail, liens.
        </p>
        <p>
          Vous pouvez refuser à tout moment, par une simple réponse. Votre fiche est alors bloquée
          et vous n’êtes plus contacté. Les fiches jamais utilisées sont effacées après 30 jours,
          les prospects sans suite 3 ans après le dernier contact. La liste des personnes qui ont
          refusé est conservée pour que ce refus reste respecté.
        </p>
      </LegalSection>
      <LegalSection title="Qui reçoit vos données">
        <p>
          Vos données ne sont ni vendues ni louées. Elles passent uniquement par les prestataires
          techniques nécessaires : hébergement et base de suivi, messagerie, envoi des formulaires,
          et WhatsApp si vous m’écrivez par ce canal. Certains de ces services peuvent traiter des
          données hors de l’Union européenne.
        </p>
      </LegalSection>
      <LegalSection title="Vos droits">
        <p>
          Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, leur
          limitation ou leur portabilité, et vous opposer à leur utilisation. Écrivez à{" "}
          {contactInfo.email}. Vous pouvez aussi saisir la CNIL (cnil.fr).
        </p>
      </LegalSection>
      <LegalSection title="Cookies">
        <p>
          Ce site n’utilise pas de cookies publicitaires. Si cela change, votre accord vous sera
          demandé avant tout dépôt.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
