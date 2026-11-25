import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
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
  const bannerRef = useRef<HTMLElement>(null);
  const visible = choice === null || (choice !== undefined && preferencesOpen);

  // Le bouton WhatsApp flottant remonte au-dessus du bandeau tant qu’il est affiché.
  useEffect(() => {
    const root = document.documentElement;
    const banner = bannerRef.current;
    if (!visible || !banner) {
      root.style.removeProperty("--gws-consent-h");
      return;
    }
    const update = () => root.style.setProperty("--gws-consent-h", `${banner.offsetHeight + 12}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(banner);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--gws-consent-h");
    };
  }, [visible]);

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

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    setChoice(value);
    setPreferencesOpen(false);
    setAdvertisingConsent(value);
  };

  const buttonClass =
    "min-h-10 flex-1 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#54d7c8] sm:min-h-11 sm:px-5 sm:py-2.5";

  return (
    <section
      ref={bannerRef}
      aria-label="Choix des cookies publicitaires"
      data-testid="advertising-consent"
      className="fixed inset-x-2 bottom-2 z-[60] mx-auto max-w-xl rounded-2xl border border-white/20 bg-[#13211e] px-4 py-3 text-[#f7f7ef] shadow-[0_15px_60px_rgba(0,0,0,.5)] sm:inset-x-5 sm:bottom-5 sm:p-6"
    >
      <h2 className="sr-only sm:not-sr-only sm:text-base sm:font-extrabold">
        Mesurer nos publicités
      </h2>
      <p className="text-[13px] leading-snug text-white/75 sm:mt-2 sm:text-sm sm:leading-relaxed">
        Avec votre accord, Google Ads utilise des cookies pour savoir si nos publicités vous ont
        amené ici et à envoyer une demande. Refuser ne change rien au site, et vous pourrez changer
        d’avis en bas de page (« Préférences cookies »).{" "}
        <Link to="/confidentialite" className="text-[#54d7c8] underline underline-offset-4">
          En savoir plus
        </Link>
      </p>
      <div className="mt-3 flex gap-2.5 sm:mt-4 sm:gap-3">
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
