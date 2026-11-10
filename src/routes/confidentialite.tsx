import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/site/LegalPage";
import { contactInfo } from "@/lib/contact-info";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/confidentialite")({
  staticData: { sitemap: true },
  head: () =>
    pageHead({
      path: "/confidentialite",
      title: "Confidentialité — Gwada Web Studio",
      description: "Comment Gwada Web Studio utilise et protège vos données personnelles.",
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
      <LegalSection title="Cookies et mesure des publicités">
        <p>
          Avec votre accord, Google Ads, chargé via Google Tag Manager, mesure les visites issues de
          nos publicités et les demandes envoyées avec succès. Le suivi publicitaire reste désactivé
          tant que vous n’avez pas accepté. Refuser ne change pas le fonctionnement des formulaires
          ni l’accès au site.
        </p>
        <p>
          Pour une demande envoyée, nous transmettons le type de formulaire et un identifiant
          technique aléatoire. Google reçoit aussi les informations techniques nécessaires à la
          mesure : page consultée, identifiants publicitaires, adresse IP et informations du
          navigateur. Nous ne transmettons pas les noms, e-mails, téléphones ni messages saisis dans
          les formulaires. La personnalisation publicitaire et le partage de ces coordonnées pour
          les conversions améliorées sont désactivés.
        </p>
        <p>
          Votre choix est conservé pendant six mois dans votre navigateur. Vous pouvez le modifier
          ou retirer votre accord à tout moment via « Préférences cookies », en bas de chaque page.
          Le retrait arrête le suivi publicitaire pour les prochaines visites. Google peut traiter
          les données de mesure hors de l’Union européenne. Pour en savoir plus, consultez la{" "}
          <a href="https://policies.google.com/privacy" className="underline underline-offset-2">
            politique de confidentialité de Google
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
