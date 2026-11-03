import { AlertCircle, ArrowRight, CircleCheck, LoaderCircle, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { contactInfo, whatsappLink } from "@/lib/contact-info";
import { WhatsAppIcon } from "@/components/site/WhatsApp";

const formEndpoint = `https://formsubmit.co/ajax/${contactInfo.email}`;

type DemoRequest = {
  business: string;
  activity: string;
  phone: string;
  link: string;
  email: string;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const emptyRequest: DemoRequest = { business: "", activity: "", phone: "", link: "", email: "" };

function readSource(fallback: string) {
  const raw = new URLSearchParams(window.location.search).get("src") ?? "";
  const clean = raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, 40);
  return clean || fallback;
}

function buildWhatsAppText(request: DemoRequest) {
  return [
    "Bonjour, je voudrais une démo gratuite.",
    request.business ? `Mon commerce : ${request.business}.` : "",
    request.activity ? `Activité et ville : ${request.activity}.` : "",
    request.link ? `Mon site ou réseau : ${request.link}.` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function DemoRequestForm({ defaultSource = "site" }: { defaultSource?: string }) {
  const [request, setRequest] = useState<DemoRequest>(emptyRequest);
  const [honeypot, setHoneypot] = useState("");
  const [source, setSource] = useState(defaultSource);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  useEffect(() => {
    setSource(readSource(defaultSource));
  }, [defaultSource]);

  const whatsappHref = useMemo(() => whatsappLink(buildWhatsAppText(request)), [request]);

  const update = (field: keyof DemoRequest, value: string) => {
    setRequest((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData();
    formData.append("Commerce", request.business);
    formData.append("Activité et ville", request.activity);
    formData.append("WhatsApp ou téléphone", request.phone);
    formData.append("Site ou réseau", request.link || "Non renseigné");
    if (request.email) formData.append("email", request.email);
    formData.append("Source", source);
    formData.append("_subject", `Démo gratuite — ${request.business} — ${source}`);
    formData.append("_template", "table");
    formData.append("_honey", honeypot);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean } | null;
      if (!response.ok || result?.success === false) throw new Error("Form submission failed");
      setStatus("success");
      window.dispatchEvent(
        new CustomEvent("gws:lead", { detail: { need: "demo_gratuite", source } }),
      );
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-[1.75rem] border border-[#54d7c8]/35 bg-[#13211e] p-7 text-center shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-9"
        data-testid="demo-success"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#54d7c8] text-[#0d1715]">
          <CircleCheck className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-2xl font-black tracking-[-0.03em]">Merci, c’est bien reçu.</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-white/60">
          Je regarde votre activité et je reviens vers vous personnellement. Pour aller plus vite,
          vous pouvez aussi m’envoyer votre logo et quelques photos sur WhatsApp.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/80 transition hover:border-white/35 hover:text-white"
          data-cta="demo-success-whatsapp"
        >
          <WhatsAppIcon /> Continuer sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      id="demande"
      onSubmit={handleSubmit}
      className="scroll-mt-28 rounded-[1.75rem] border border-white/12 bg-[#13211e] p-5 shadow-[0_28px_80px_rgba(0,0,0,.28)] sm:p-7"
      data-testid="demo-form"
    >
      <h2 className="text-xl font-black tracking-[-0.03em] sm:text-2xl">
        Recevoir ma démo gratuite
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/55">
        Le nom de votre commerce et un numéro suffisent. Je m’occupe du reste.
      </p>

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

      <div className="mt-5 grid gap-3.5">
        <Field label="Nom de votre commerce" htmlFor="demo-business">
          <input
            id="demo-business"
            name="business"
            value={request.business}
            onChange={(event) => update("business", event.target.value)}
            placeholder="Ex. Le Ti Kaz"
            autoComplete="organization"
            required
            className="gws-input"
          />
        </Field>
        <Field label="Votre activité et votre ville" htmlFor="demo-activity">
          <input
            id="demo-activity"
            name="activity"
            value={request.activity}
            onChange={(event) => update("activity", event.target.value)}
            placeholder="Ex. traiteur à Sainte-Anne"
            required
            className="gws-input"
          />
        </Field>
        <Field label="Votre WhatsApp ou téléphone" htmlFor="demo-phone">
          <input
            id="demo-phone"
            name="phone"
            type="tel"
            value={request.phone}
            onChange={(event) => update("phone", event.target.value)}
            placeholder="Pour vous envoyer la démo"
            autoComplete="tel"
            required
            className="gws-input"
          />
        </Field>
        <Field label="Votre site, Instagram, Facebook ou fiche Google" htmlFor="demo-link" optional>
          <input
            id="demo-link"
            name="link"
            value={request.link}
            onChange={(event) => update("link", event.target.value)}
            placeholder="Un lien, si vous en avez un"
            autoComplete="url"
            className="gws-input"
          />
        </Field>
        <Field label="Votre e-mail" htmlFor="demo-email" optional>
          <input
            id="demo-email"
            name="email"
            type="email"
            value={request.email}
            onChange={(event) => update("email", event.target.value)}
            placeholder="vous@entreprise.fr"
            autoComplete="email"
            className="gws-input"
          />
        </Field>
      </div>

      {status === "error" && (
        <div
          className="mt-4 flex items-start gap-3 rounded-2xl border border-[#ff7c6c]/30 bg-[#ff7c6c]/10 p-4 text-sm text-white/72"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#ff7c6c]" />
          <span>L’envoi n’a pas abouti. Réessayez, ou envoyez votre demande sur WhatsApp.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="gws-button-primary mt-5 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-black disabled:cursor-wait disabled:opacity-70"
        data-cta="demo-submit"
      >
        {status === "submitting" ? (
          <>
            Envoi en cours <LoaderCircle className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Recevoir ma démo gratuite <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 px-5 text-sm font-bold text-white/75 transition hover:border-white/35 hover:text-white"
        data-cta="demo-whatsapp"
      >
        <WhatsAppIcon /> Plutôt sur WhatsApp
      </a>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/45">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          Vos informations servent uniquement à préparer votre démonstration et à vous répondre.{" "}
          <Link to="/confidentialite" className="underline underline-offset-2 hover:text-white">
            Confidentialité
          </Link>
        </span>
      </p>

      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Envoi de votre demande en cours." : ""}
        {status === "error" ? "L’envoi de votre demande a échoué." : ""}
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
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 flex items-center justify-between gap-3 text-xs font-bold text-white/72">
        {label}
        {optional && (
          <span className="text-[9px] font-black uppercase tracking-wider text-white/35">
            Facultatif
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
