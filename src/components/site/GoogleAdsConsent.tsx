import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ADVERTISING_CONSENT_CHANGED_EVENT,
  getAdvertisingConsentChoice,
  initAdvertisingTracking,
  setAdvertisingConsent,
} from "@/lib/google-ads";

const preferencesEvent = "gws:advertising-preferences";

export function AdvertisingPreferencesButton() {
  return (
    <button
      type="button"
      className="text-left transition hover:text-white"
      onClick={() => window.dispatchEvent(new Event(preferencesEvent))}
    >
      Préférences cookies
    </button>
  );
}

export function GoogleAdsConsent() {
  const [choice, setChoice] = useState<"granted" | "denied" | null>();
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    const refresh = () => setChoice(getAdvertisingConsentChoice());
    const open = () => setPreferencesOpen(true);
    refresh();
    initAdvertisingTracking();
    window.addEventListener(ADVERTISING_CONSENT_CHANGED_EVENT, refresh);
    window.addEventListener(preferencesEvent, open);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(ADVERTISING_CONSENT_CHANGED_EVENT, refresh);
      window.removeEventListener(preferencesEvent, open);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (choice === undefined || (choice !== null && !preferencesOpen)) return null;

  const choose = (value: "granted" | "denied") => {
    setChoice(value);
    setPreferencesOpen(false);
    setAdvertisingConsent(value);
  };

  const buttonClass =
    "min-h-11 flex-1 rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54d7c8]";

  return (
    <section
      aria-label="Choix des cookies publicitaires"
      data-testid="advertising-consent"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-white/20 bg-[#13211e] p-5 text-[#f7f7ef] shadow-[0_15px_60px_rgba(0,0,0,.5)] sm:inset-x-5 sm:bottom-5 sm:p-6"
    >
      <h2 className="text-base font-extrabold">Mesurer nos publicités</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/75">
        Avec votre accord, Google Ads utilise des cookies pour savoir si nos publicités vous ont
        amené à envoyer une demande. Vous pouvez refuser et utiliser tout le site, puis changer
        d’avis dans « Préférences cookies ».
      </p>
      <Link
        to="/confidentialite"
        className="mt-2 inline-block text-sm text-[#54d7c8] underline underline-offset-4"
      >
        En savoir plus
      </Link>
      <div className="mt-4 flex gap-3">
        <button type="button" className={buttonClass} onClick={() => choose("denied")}>
          Refuser
        </button>
        <button type="button" className={buttonClass} onClick={() => choose("granted")}>
          Accepter
        </button>
      </div>
    </section>
  );
}
