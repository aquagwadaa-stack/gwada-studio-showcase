import {
  AlertCircle,
  ArrowRight,
  Check,
  CircleCheck,
  ClipboardCheck,
  LoaderCircle,
  Mail,
  RotateCcw,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { contactInfo } from "@/lib/contact-info";

const formEndpoint = `https://formsubmit.co/ajax/${contactInfo.email}`;

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
  email: string;
  phone: string;
  website: string;
  need: string;
  details: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const emptyBrief: Brief = {
  name: "",
  business: "",
  email: "",
  phone: "",
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
    `Mon e-mail : ${brief.email}.`,
    brief.phone ? `Mon téléphone : ${brief.phone}.` : "",
    "",
    "Je souhaite avoir une première orientation pour mon projet.",
  ]
    .filter(Boolean)
    .join("\n");
}

function trackLeadIntent(action: "submitted" | "error" | "copy", need: string) {
  const trackedWindow = window as Window & {
    dataLayer?: Array<Record<string, string>>;
    gtag?: (command: string, eventName: string, parameters: Record<string, string>) => void;
  };

  trackedWindow.dataLayer?.push({
    event: action === "submitted" ? "generate_lead" : "lead_intent",
    lead_action: action,
    lead_need: need,
  });

  if (action === "submitted") {
    trackedWindow.gtag?.("event", "generate_lead", {
      method: "contact_form",
      lead_need: need,
    });
  }
}

export function ProjectBriefForm() {
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [honeypot, setHoneypot] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const message = useMemo(() => buildMessage(brief), [brief]);
  const mailto = useMemo(
    () =>
      `mailto:${contactInfo.email}?subject=${encodeURIComponent(`Projet${brief.business ? ` — ${brief.business}` : ""} — Gwada Web Studio`)}&body=${encodeURIComponent(message)}`,
    [brief.business, message],
  );

  const update = (field: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [field]: value }));
    setCopied(false);
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData();
    formData.append("Prénom", brief.name);
    formData.append("Entreprise / activité", brief.business);
    formData.append("email", brief.email);
    formData.append("Téléphone", brief.phone || "Non renseigné");
    formData.append("Besoin principal", brief.need);
    formData.append("Site ou réseau actuel", brief.website || "Non renseigné");
    formData.append("Détails du projet", brief.details || "Non renseigné");
    formData.append("_subject", `Nouvelle demande — ${brief.business} — Gwada Web Studio`);
    formData.append("_template", "table");
    formData.append("_honey", honeypot);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
      } | null;

      if (!response.ok || result?.success === false) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      trackLeadIntent("submitted", brief.need);
      window.dispatchEvent(
        new CustomEvent("gws:lead", {
          detail: { need: brief.need, source: "contact_form" },
        }),
      );
    } catch {
      setStatus("error");
      trackLeadIntent("error", brief.need);
    }
  };

  const copyRequest = async () => {
    await navigator.clipboard.writeText(`${message}\n\nÀ envoyer à ${contactInfo.email}`);
    setCopied(true);
    trackLeadIntent("copy", brief.need);
  };

  const resetForm = () => {
    setBrief(emptyBrief);
    setHoneypot("");
    setCopied(false);
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div
        className="grid min-h-[650px] place-items-center rounded-[2rem] border border-[#54d7c8]/35 bg-[#13211e] p-7 text-center shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-10"
        data-testid="project-brief-success"
      >
        <div className="max-w-md">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#54d7c8] text-[#0d1715]">
            <CircleCheck className="h-8 w-8" />
          </span>
          <div className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-[#54d7c8]">
            Demande transmise
          </div>
          <h3 className="mt-3 text-3xl font-black tracking-[-0.04em]">
            Merci {brief.name}, j’ai bien reçu votre projet.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Je vais regarder votre activité et votre besoin avant de revenir vers vous
            personnellement.
          </p>
          <button
            type="button"
            onClick={resetForm}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/70 transition hover:border-white/35 hover:text-white"
          >
            <RotateCcw className="h-4 w-4" /> Envoyer une autre demande
          </button>
        </div>
      </div>
    );
  }

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

      <input
        type="text"
        name="company_website"
        value={honeypot}
        onChange={(event) => setHoneypot(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

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
        <Field label="Votre e-mail" htmlFor="brief-email">
          <input
            id="brief-email"
            name="email"
            type="email"
            value={brief.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="vous@entreprise.fr"
            autoComplete="email"
            required
            className="gws-input"
          />
        </Field>
        <Field label="Votre téléphone" htmlFor="brief-phone" optional>
          <input
            id="brief-phone"
            name="phone"
            type="tel"
            value={brief.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="Pour être rappelé"
            autoComplete="tel"
            className="gws-input"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Site ou réseau actuel" htmlFor="brief-website" optional>
          <input
            id="brief-website"
            name="website"
            value={brief.website}
            onChange={(event) => update("website", event.target.value)}
            placeholder="Lien Instagram, Facebook, site…"
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

      {status === "error" && (
        <div
          className="mt-5 flex items-start gap-3 rounded-2xl border border-[#ff7c6c]/30 bg-[#ff7c6c]/10 p-4 text-sm text-white/72"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7c6c]" />
          <span>
            L’envoi n’a pas abouti. Vous pouvez réessayer ou utiliser l’e-mail direct ci-dessous.
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="gws-button-primary mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full px-7 text-sm font-black uppercase tracking-[0.08em] disabled:cursor-wait disabled:opacity-70"
        data-cta="brief-submit"
      >
        {status === "submitting" ? (
          <>
            Envoi en cours <LoaderCircle className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Envoyer ma demande <ArrowRight className="h-4 w-4" />
          </>
        )}
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
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Vos informations sont transmises par e-mail et utilisées uniquement pour répondre à votre
        demande.
      </p>

      {status === "error" && (
        <a
          href={mailto}
          className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-[#54d7c8]"
        >
          <Mail className="h-3.5 w-3.5" /> Écrire directement à {contactInfo.email}
        </a>
      )}

      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Envoi de votre demande en cours." : ""}
        {status === "error" ? "L’envoi de votre demande a échoué." : ""}
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
