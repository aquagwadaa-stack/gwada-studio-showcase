import { ArrowRight, Check, ClipboardCheck, Mail, Send } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { contactInfo } from "@/lib/contact-info";

const needs = [
  "Obtenir plus de demandes",
  "Gérer des réservations",
  "Encaisser un acompte ou un paiement",
  "Présenter un catalogue ou prendre des commandes",
  "Créer un espace client ou une administration",
  "Refondre un site existant",
  "Je ne sais pas encore",
];

type Brief = {
  name: string;
  business: string;
  contact: string;
  website: string;
  need: string;
  details: string;
};

const emptyBrief: Brief = {
  name: "",
  business: "",
  contact: "",
  website: "",
  need: needs[0],
  details: "",
};

function buildMessage(brief: Brief) {
  return [
    "Bonjour Louis,",
    "",
    `Je m'appelle ${brief.name}.`,
    `Mon activité / entreprise : ${brief.business}.`,
    `Mon besoin principal : ${brief.need}.`,
    brief.website ? `Mon site ou réseau actuel : ${brief.website}.` : "",
    brief.details ? `Ce que j'aimerais améliorer : ${brief.details}` : "",
    `Le meilleur moyen de me recontacter : ${brief.contact}.`,
    "",
    "Je souhaite avoir une première orientation pour mon projet.",
  ]
    .filter(Boolean)
    .join("\n");
}

function trackLeadIntent(action: "email" | "copy", need: string) {
  const trackedWindow = window as Window & {
    dataLayer?: Array<Record<string, string>>;
  };

  trackedWindow.dataLayer?.push({
    event: "lead_intent",
    lead_action: action,
    lead_need: need,
  });
}

export function ProjectBriefForm() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [copied, setCopied] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const message = useMemo(() => buildMessage(brief), [brief]);
  const mailto = useMemo(
    () =>
      `mailto:${contactInfo.email}?subject=${encodeURIComponent(`Projet${brief.business ? ` — ${brief.business}` : ""} — Gwada Web Studio`)}&body=${encodeURIComponent(message)}`,
    [brief.business, message],
  );

  const update = (field: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [field]: value }));
    setCopied(false);
    setIsReady(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsReady(true);
    trackLeadIntent("email", brief.need);
    window.location.href = mailto;
  };

  const copyRequest = async () => {
    await navigator.clipboard.writeText(`${message}\n\nÀ envoyer à ${contactInfo.email}`);
    setCopied(true);
    trackLeadIntent("copy", brief.need);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/12 bg-[#13211e] p-5 shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-7"
      data-testid="project-brief-form"
    >
      <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#54d7c8]">
            Demande express
          </div>
          <h3 className="mt-2 text-2xl font-black tracking-[-0.035em]">Donnez-moi le contexte.</h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#54d7c8] text-[#0d1715]">
          <Send className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Votre prénom" htmlFor="brief-name">
          <input
            id="brief-name"
            name="name"
            value={brief.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="Ex. Marie"
            autoComplete="name"
            required
            className="gws-input"
          />
        </Field>
        <Field label="Votre activité" htmlFor="brief-business">
          <input
            id="brief-business"
            name="business"
            value={brief.business}
            onChange={(event) => update("business", event.target.value)}
            placeholder="Ex. restaurant, cabinet…"
            autoComplete="organization"
            required
            className="gws-input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Votre besoin principal" htmlFor="brief-need">
          <select
            id="brief-need"
            name="need"
            value={brief.need}
            onChange={(event) => update("need", event.target.value)}
            className="gws-input"
          >
            {needs.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="E-mail ou téléphone" htmlFor="brief-contact">
          <input
            id="brief-contact"
            name="contact"
            value={brief.contact}
            onChange={(event) => update("contact", event.target.value)}
            placeholder="Pour vous répondre"
            autoComplete="email"
            required
            className="gws-input"
          />
        </Field>
        <Field label="Site ou réseau actuel" htmlFor="brief-website" optional>
          <input
            id="brief-website"
            name="website"
            value={brief.website}
            onChange={(event) => update("website", event.target.value)}
            placeholder="Lien Instagram, site…"
            autoComplete="url"
            className="gws-input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Qu’aimeriez-vous améliorer ?" htmlFor="brief-details" optional>
          <textarea
            id="brief-details"
            name="details"
            value={brief.details}
            onChange={(event) => update("details", event.target.value)}
            placeholder="Quelques phrases suffisent."
            rows={4}
            className="gws-input resize-none"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="gws-button-primary mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-black uppercase tracking-[0.08em]"
        data-cta="brief-email"
      >
        Préparer ma demande <ArrowRight className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={copyRequest}
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/70 transition hover:border-white/35 hover:text-white"
        data-cta="brief-copy"
      >
        {copied ? (
          <Check className="h-4 w-4 text-[#54d7c8]" />
        ) : (
          <ClipboardCheck className="h-4 w-4" />
        )}
        {copied ? "Demande copiée" : "Copier la demande"}
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/42">
        <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Votre messagerie s’ouvre avec la demande déjà structurée. Vous gardez la main avant l’envoi.
      </p>
      <p className="sr-only" aria-live="polite">
        {isReady ? "Votre demande est prête dans votre messagerie." : ""}
        {copied ? "Votre demande a été copiée." : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional = false,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 flex items-center justify-between gap-3 text-xs font-bold text-white/72">
        {label}
        {optional && (
          <span className="text-[9px] font-black uppercase tracking-wider text-white/28">
            Facultatif
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
