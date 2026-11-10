/** Advertising measurement is opt-in and limited to the public production site. */
export const GTM_CONTAINER_ID = "GTM-K6T9BN4Q";
export const ADS_DESTINATION_ID = "AW-18567431868";
// Filled only with the conversion label verified in this Google Ads account.
export const ADS_CONVERSION_LABEL = "gLS6CPrd5LUdELyN0pVF";
export const ADVERTISING_CONSENT_STORAGE_KEY = "gws-advertising-consent-v1";
export const ADVERTISING_CONSENT_CHANGED_EVENT = "gws:advertising-consent-changed";
export const ADVERTISING_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;

export type AdvertisingConsentChoice = "granted" | "denied";
export interface AdvertisingConsent {
  version: 1;
  choice: AdvertisingConsentChoice;
  decidedAt: number;
  expiresAt: number;
}
export interface SuccessfulLead {
  form: "demo" | "contact";
}

type Gtag = (...args: unknown[]) => void;
type TrackingWindow = Window & {
  dataLayer?: unknown[];
  gtag?: Gtag;
};
interface RuntimeState {
  memory: AdvertisingConsent | null;
  memoryOverride: boolean;
  initialized: boolean;
  granted: boolean;
  scriptStarted: boolean;
  revoking: boolean;
  listening: boolean;
}

const states = new WeakMap<Window, RuntimeState>();
const SCRIPT_ID = "gws-google-tag-manager";
const REVOCATION_KEY = "gws-advertising-revocation-v1";
const DENIED = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

function browser(): TrackingWindow | null {
  return typeof window !== "undefined" && typeof document !== "undefined"
    ? (window as TrackingWindow)
    : null;
}

function stateFor(w: Window): RuntimeState {
  let state = states.get(w);
  if (!state) {
    state = {
      memory: null,
      memoryOverride: false,
      initialized: false,
      granted: false,
      scriptStarted: false,
      revoking: false,
      listening: false,
    };
    states.set(w, state);
  }
  return state;
}

function validConsent(value: unknown): AdvertisingConsent | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Partial<AdvertisingConsent>;
  const now = Date.now();
  if (
    item.version !== 1 ||
    (item.choice !== "granted" && item.choice !== "denied") ||
    typeof item.decidedAt !== "number" ||
    typeof item.expiresAt !== "number" ||
    !Number.isFinite(item.decidedAt) ||
    !Number.isFinite(item.expiresAt) ||
    item.decidedAt > now ||
    item.expiresAt !== item.decidedAt + ADVERTISING_CONSENT_MAX_AGE_MS ||
    item.expiresAt <= now
  ) {
    return null;
  }
  return item as AdvertisingConsent;
}

function parseConsent(value: string | null): AdvertisingConsent | null {
  try {
    return value ? validConsent(JSON.parse(value)) : null;
  } catch {
    return null;
  }
}

/** A failed write must not restore an older grant when this tab reloads. */
function readRevocation(w: Window): AdvertisingConsent | null {
  try {
    const record = parseConsent(w.sessionStorage.getItem(REVOCATION_KEY));
    if (record?.choice === "denied") return record;
  } catch {
    // Some browsers block both storage mechanisms; history state is a tab-local fallback.
  }
  try {
    const record = validConsent(w.history.state?.[REVOCATION_KEY]);
    if (record?.choice === "denied") return record;
  } catch {
    // Storage restrictions must never break the site.
  }
  return null;
}

export function readAdvertisingConsent(): AdvertisingConsent | null {
  const w = browser();
  if (!w) return null;
  const state = stateFor(w);
  if (state.memoryOverride) return validConsent(state.memory);
  const revocation = readRevocation(w);
  if (revocation) return revocation;
  try {
    return parseConsent(w.localStorage.getItem(ADVERTISING_CONSENT_STORAGE_KEY));
  } catch {
    // If storage is unavailable, only the explicit choice in this page's memory is usable.
  }
  return validConsent(state.memory);
}

export function getAdvertisingConsentChoice(): AdvertisingConsentChoice | null {
  return readAdvertisingConsent()?.choice ?? null;
}

export function isAdvertisingExcludedPath(pathname: string): boolean {
  return ["/admin", "/a/", "/exemple-", "/coq"].some((prefix) => pathname.startsWith(prefix));
}

export function hasAdvertisingTrackingLoaded(): boolean {
  const w = browser();
  return Boolean(w && stateFor(w).scriptStarted);
}

function allowedPage(w: Window): boolean {
  const { hostname, pathname } = w.location;
  if (hostname !== "gwadawebstudio.fr" && hostname !== "www.gwadawebstudio.fr") return false;
  return !isAdvertisingExcludedPath(pathname);
}

function consentNotification(w: Window): void {
  try {
    w.dispatchEvent(new Event(ADVERTISING_CONSENT_CHANGED_EVENT));
  } catch {
    // Measurement/UI notifications must not affect a successful form submission.
  }
}

function initializeQueue(w: TrackingWindow, state: RuntimeState): void {
  if (state.initialized) return;
  w.dataLayer = w.dataLayer || [];
  const queue = w.dataLayer;
  w.gtag =
    w.gtag ||
    function (..._args: unknown[]) {
      // Google consumes an Arguments object, as in its documented gtag bootstrap.
      // eslint-disable-next-line prefer-rest-params -- Preserve Google's gtag command format.
      queue.push(arguments);
    };
  w.gtag("consent", "default", { ...DENIED });
  w.gtag("set", "allow_ad_personalization_signals", false);
  w.gtag("set", "ads_data_redaction", true);
  w.gtag("set", {
    page_location: `${w.location.origin}${w.location.pathname}`,
    page_referrer: "",
  });
  state.initialized = true;
}

function clearAdvertisingCookies(w: Window): void {
  try {
    const names = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("=")[0])
      .filter((name) => /^_gcl/.test(name));
    const domains = [
      "",
      w.location.hostname,
      `.${w.location.hostname}`,
      "gwadawebstudio.fr",
      ".gwadawebstudio.fr",
    ];
    const segments = w.location.pathname.split("/").filter(Boolean);
    const paths = [
      "/",
      ...segments.map((_, index) => `/${segments.slice(0, index + 1).join("/")}`),
    ];
    for (const name of names) {
      for (const domain of new Set(domains)) {
        for (const path of paths) {
          document.cookie = `${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=${path}${domain ? `; Domain=${domain}` : ""}; SameSite=Lax`;
        }
      }
    }
  } catch {
    // Cookie access can be blocked independently of localStorage.
  }
}

function revokeLoadedTracking(w: TrackingWindow, state: RuntimeState): void {
  if (state.revoking) return;
  state.revoking = true;
  state.granted = false;
  try {
    w.gtag?.("consent", "update", { ...DENIED });
  } catch {
    // Continue to cookie cleanup and reload even if a third-party script throws.
  }
  clearAdvertisingCookies(w);
  try {
    document.getElementById(SCRIPT_ID)?.remove();
  } catch {
    // Reload also unloads any collectors that have already executed.
  }
  try {
    w.location.reload();
  } catch {
    // For example, sandboxed browsers can forbid navigation. Events remain disabled.
  }
}

export function initAdvertisingTracking(): void {
  const w = browser();
  if (!w) return;
  try {
    const state = stateFor(w);
    if (state.revoking || !allowedPage(w)) return;
    initializeQueue(w, state);
    if (!state.listening) {
      w.addEventListener("storage", (event) => {
        if (event.key !== ADVERTISING_CONSENT_STORAGE_KEY && event.key !== null) return;
        state.memoryOverride = false;
        const choice = getAdvertisingConsentChoice();
        consentNotification(w);
        if (choice !== "granted" && state.scriptStarted) revokeLoadedTracking(w, state);
        else if (choice === "granted") initAdvertisingTracking();
      });
      state.listening = true;
    }
    if (getAdvertisingConsentChoice() !== "granted") {
      if (state.scriptStarted) revokeLoadedTracking(w, state);
      return;
    }
    if (!state.granted) {
      w.gtag?.("consent", "update", {
        ...DENIED,
        ad_storage: "granted",
        ad_user_data: "granted",
      });
      state.granted = true;
    }
    if (state.scriptStarted || document.getElementById(SCRIPT_ID)) {
      state.scriptStarted = true;
      return;
    }
    // Consent and privacy settings are queued before any Google script can execute.
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.referrerPolicy = "origin";
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
    w.dataLayer?.push({ "gtm.start": Date.now(), event: "gtm.js" });
    document.head.appendChild(script);
    state.scriptStarted = true;
  } catch {
    // Blocked scripts, storage and browser extensions must not interrupt the site.
  }
}

export function setAdvertisingConsent(choice: AdvertisingConsentChoice): void {
  const w = browser();
  if (!w || (choice !== "granted" && choice !== "denied")) return;
  const state = stateFor(w);
  const decidedAt = Date.now();
  const record: AdvertisingConsent = {
    version: 1,
    choice,
    decidedAt,
    expiresAt: decidedAt + ADVERTISING_CONSENT_MAX_AGE_MS,
  };
  state.memory = record;
  state.memoryOverride = true;
  try {
    w.localStorage.setItem(ADVERTISING_CONSENT_STORAGE_KEY, JSON.stringify(record));
    state.memoryOverride = false;
  } catch {
    // Equal treatment for acceptance and refusal when persistent storage is unavailable.
  }
  try {
    if (choice === "denied") w.sessionStorage.setItem(REVOCATION_KEY, JSON.stringify(record));
    else w.sessionStorage.removeItem(REVOCATION_KEY);
  } catch {
    // Keep the in-memory choice when session storage is also blocked.
  }
  try {
    const nextState = { ...(w.history.state || {}) };
    if (choice === "denied") nextState[REVOCATION_KEY] = record;
    else delete nextState[REVOCATION_KEY];
    w.history.replaceState(nextState, "");
  } catch {
    // No URL/query-string marker is used for consent.
  }
  consentNotification(w);
  if (choice === "denied" && state.scriptStarted) {
    revokeLoadedTracking(w, state);
  } else {
    initAdvertisingTracking();
  }
}

/** Call only after the backend confirms that it saved/sent the lead successfully. */
export function trackSuccessfulLead(lead: SuccessfulLead): void {
  const w = browser();
  if (!w) return;
  try {
    if (
      !allowedPage(w) ||
      getAdvertisingConsentChoice() !== "granted" ||
      (lead.form !== "demo" && lead.form !== "contact")
    )
      return;
    initAdvertisingTracking();
    const state = stateFor(w);
    if (state.revoking || !state.scriptStarted) return;
    const transactionId = w.crypto.randomUUID();
    // Only this two-value enum is copied from the caller; never spread form values.
    w.dataLayer?.push({
      event: "gws_lead_success",
      form_type: lead.form,
      transaction_id: transactionId,
    });
    if (!ADS_CONVERSION_LABEL) return;
    w.gtag?.("event", "conversion", {
      send_to: `${ADS_DESTINATION_ID}/${ADS_CONVERSION_LABEL}`,
      transaction_id: transactionId,
      form_type: lead.form,
      page_location: `${w.location.origin}${w.location.pathname}`,
      page_referrer: "",
      allow_ad_personalization_signals: false,
    });
  } catch {
    // Conversion measurement is best-effort and must never turn success into an error.
  }
}
