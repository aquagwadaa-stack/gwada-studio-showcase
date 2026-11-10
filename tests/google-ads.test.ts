import assert from "node:assert/strict";
import { webcrypto } from "node:crypto";
import test from "node:test";
import {
  ADVERTISING_CONSENT_CHANGED_EVENT,
  ADVERTISING_CONSENT_MAX_AGE_MS,
  ADVERTISING_CONSENT_STORAGE_KEY,
  ADS_CONVERSION_LABEL,
  ADS_DESTINATION_ID,
  GTM_CONTAINER_ID,
  getAdvertisingConsentChoice,
  initAdvertisingTracking,
  readAdvertisingConsent,
  setAdvertisingConsent,
  trackSuccessfulLead,
} from "../src/lib/google-ads.ts";

class MemoryStorage {
  values = new Map<string, string>();
  failReads = false;
  failWrites = false;
  getItem(key: string) {
    if (this.failReads) throw new Error("Storage blocked");
    return this.values.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    if (this.failWrites) throw new Error("Storage blocked");
    this.values.set(key, value);
  }
  removeItem(key: string) {
    if (this.failWrites) throw new Error("Storage blocked");
    this.values.delete(key);
  }
}

interface ScriptStub {
  id: string;
  async: boolean;
  src: string;
  referrerPolicy: string;
  remove: () => void;
}

class BrowserStub extends EventTarget {
  dataLayer: unknown[] | undefined;
  gtag: ((...args: unknown[]) => void) | undefined;
  localStorage = new MemoryStorage();
  sessionStorage = new MemoryStorage();
  crypto = webcrypto;
  reloads = 0;
  location = {
    hostname: "gwadawebstudio.fr",
    origin: "https://gwadawebstudio.fr",
    pathname: "/contact",
    search: "?email=private%40example.com&gclid=not-for-our-events",
    hash: "#private-person",
    reload: () => {
      this.reloads++;
    },
  };
  history = {
    state: {} as Record<string, unknown>,
    replaceState: (value: Record<string, unknown>) => {
      this.history.state = value;
    },
  };
}

function fixture() {
  const w = new BrowserStub();
  const scripts: ScriptStub[] = [];
  const cookies = new Map<string, string>();
  const cookieWrites: string[] = [];
  let appendFailure = false;
  const documentStub = {
    head: {
      appendChild(script: ScriptStub) {
        if (appendFailure) throw new Error("Script blocked");
        scripts.push(script);
        return script;
      },
    },
    createElement(tag: string): ScriptStub {
      assert.equal(tag, "script");
      const script: ScriptStub = {
        id: "",
        async: false,
        src: "",
        referrerPolicy: "",
        remove: () => {
          const index = scripts.indexOf(script);
          if (index >= 0) scripts.splice(index, 1);
        },
      };
      return script;
    },
    getElementById(id: string) {
      return scripts.find((script) => script.id === id) ?? null;
    },
    get cookie() {
      return Array.from(cookies, ([key, value]) => `${key}=${value}`).join("; ");
    },
    set cookie(value: string) {
      cookieWrites.push(value);
      const [pair] = value.split(";");
      const [key, cookieValue] = pair.split("=");
      if (value.includes("Max-Age=0")) cookies.delete(key);
      else cookies.set(key, cookieValue);
    },
  };
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const previousDocument = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "window", { configurable: true, value: w });
  Object.defineProperty(globalThis, "document", { configurable: true, value: documentStub });
  return {
    w,
    scripts,
    cookies,
    cookieWrites,
    blockScript: () => {
      appendFailure = true;
    },
    restore() {
      if (previousWindow) Object.defineProperty(globalThis, "window", previousWindow);
      else Reflect.deleteProperty(globalThis, "window");
      if (previousDocument) Object.defineProperty(globalThis, "document", previousDocument);
      else Reflect.deleteProperty(globalThis, "document");
    },
  };
}

function commands(w: BrowserStub): unknown[][] {
  return (w.dataLayer ?? [])
    .filter((entry) => Object.prototype.toString.call(entry) === "[object Arguments]")
    .map((entry) => Array.from(entry as IArguments));
}

function successfulEvents(w: BrowserStub) {
  return (w.dataLayer ?? []).filter(
    (entry) => (entry as { event?: string }).event === "gws_lead_success",
  );
}

test("SSR import and calls do not need a browser", () => {
  assert.equal(typeof window, "undefined");
  assert.equal(readAdvertisingConsent(), null);
  assert.equal(getAdvertisingConsentChoice(), null);
  assert.doesNotThrow(() => {
    initAdvertisingTracking();
    setAdvertisingConsent("granted");
    trackSuccessfulLead({ form: "contact" });
  });
});

test("no choice or refusal loads no Google script, and no lead is replayed after acceptance", (t) => {
  const f = fixture();
  t.after(f.restore);
  initAdvertisingTracking();
  trackSuccessfulLead({ form: "demo" });
  assert.equal(f.scripts.length, 0);
  setAdvertisingConsent("denied");
  trackSuccessfulLead({ form: "contact" });
  assert.equal(f.scripts.length, 0);
  assert.equal(successfulEvents(f.w).length, 0);
  setAdvertisingConsent("granted");
  assert.equal(f.scripts.length, 1);
  assert.equal(successfulEvents(f.w).length, 0);
});

test("default four denied states precede one consented GTM bootstrap, including repeated init", (t) => {
  const f = fixture();
  t.after(f.restore);
  setAdvertisingConsent("granted");
  initAdvertisingTracking();
  initAdvertisingTracking();
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`);
  assert.equal(f.scripts[0].async, true);
  assert.equal(f.scripts[0].referrerPolicy, "origin");
  assert.deepEqual(commands(f.w)[0], [
    "consent",
    "default",
    {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);
  assert.deepEqual(
    commands(f.w).find((entry) => entry[1] === "update"),
    [
      "consent",
      "update",
      {
        ad_storage: "granted",
        analytics_storage: "denied",
        ad_user_data: "granted",
        ad_personalization: "denied",
      },
    ],
  );
  assert.equal(
    (f.w.dataLayer ?? []).filter((entry) => (entry as { event?: string }).event === "gtm.js")
      .length,
    1,
  );
  assert.ok(
    commands(f.w).some(
      (entry) => entry[1] === "allow_ad_personalization_signals" && entry[2] === false,
    ),
  );
  assert.ok(commands(f.w).some((entry) => entry[1] === "ads_data_redaction" && entry[2] === true));
});

test("acceptance and refusal have identical versioned 180-day expiry and notify the UI", (t) => {
  const f = fixture();
  t.after(f.restore);
  let changes = 0;
  f.w.addEventListener(ADVERTISING_CONSENT_CHANGED_EVENT, () => {
    changes++;
  });
  for (const choice of ["denied", "granted"] as const) {
    setAdvertisingConsent(choice);
    const record = readAdvertisingConsent();
    assert.equal(record?.version, 1);
    assert.equal(record?.choice, choice);
    assert.equal(record!.expiresAt - record!.decidedAt, ADVERTISING_CONSENT_MAX_AGE_MS);
  }
  assert.equal(changes, 2);
});

test("expired, future, malformed and wrong-version stored consent never authorizes tracking", (t) => {
  const f = fixture();
  t.after(f.restore);
  const expired = Date.now() - ADVERTISING_CONSENT_MAX_AGE_MS - 1;
  const future = Date.now() + 100_000;
  for (const raw of [
    "broken-json",
    "true",
    JSON.stringify({ version: 2, choice: "granted" }),
    JSON.stringify({
      version: 1,
      choice: "granted",
      decidedAt: expired,
      expiresAt: expired + ADVERTISING_CONSENT_MAX_AGE_MS,
    }),
    JSON.stringify({
      version: 1,
      choice: "granted",
      decidedAt: future,
      expiresAt: future + ADVERTISING_CONSENT_MAX_AGE_MS,
    }),
  ]) {
    f.w.localStorage.setItem(ADVERTISING_CONSENT_STORAGE_KEY, raw);
    assert.equal(getAdvertisingConsentChoice(), null);
    initAdvertisingTracking();
    assert.equal(f.scripts.length, 0);
  }
});

test("valid previously stored acceptance can load the container", (t) => {
  const f = fixture();
  t.after(f.restore);
  const decidedAt = Date.now() - 1000;
  f.w.localStorage.setItem(
    ADVERTISING_CONSENT_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      choice: "granted",
      decidedAt,
      expiresAt: decidedAt + ADVERTISING_CONSENT_MAX_AGE_MS,
    }),
  );
  initAdvertisingTracking();
  assert.equal(f.scripts.length, 1);
});

test("preview, localhost, admin, redirect and example routes never load or measure", () => {
  for (const hostname of ["localhost", "preview.lovable.app", "evilgwadawebstudio.fr"]) {
    const f = fixture();
    try {
      f.w.location.hostname = hostname;
      setAdvertisingConsent("granted");
      trackSuccessfulLead({ form: "contact" });
      assert.equal(f.scripts.length, 0);
      assert.equal(successfulEvents(f.w).length, 0);
    } finally {
      f.restore();
    }
  }
  for (const pathname of [
    "/admin",
    "/admin/nfc",
    "/a/private-code",
    "/exemple-commandes-noel",
    "/coq",
  ]) {
    const f = fixture();
    try {
      f.w.location.pathname = pathname;
      setAdvertisingConsent("granted");
      trackSuccessfulLead({ form: "demo" });
      assert.equal(f.scripts.length, 0);
      assert.equal(successfulEvents(f.w).length, 0);
    } finally {
      f.restore();
    }
  }
});

test("lead payload is an allowlist and never forwards contact fields, URL queries or hashes", (t) => {
  const f = fixture();
  t.after(f.restore);
  setAdvertisingConsent("granted");
  const input = {
    form: "contact" as const,
    email: "private@example.com",
    name: "Private Person",
    phone: "0690000000",
    source: "/contact?private=1",
    message: "Private message",
    url: "https://private.example",
  };
  trackSuccessfulLead(input);
  assert.equal(successfulEvents(f.w).length, 1);
  assert.deepEqual(Object.keys(successfulEvents(f.w)[0] as object).sort(), [
    "event",
    "form_type",
    "transaction_id",
  ]);
  assert.match(
    (successfulEvents(f.w)[0] as { transaction_id: string }).transaction_id,
    /^[0-9a-f-]{36}$/,
  );
  const serialized = JSON.stringify(f.w.dataLayer);
  for (const secret of [
    "private@example.com",
    "Private Person",
    "0690000000",
    "private=1",
    "Private message",
    "private.example",
    "gclid",
    "private-person",
  ])
    assert.ok(!serialized.includes(secret));
  const conversions = commands(f.w).filter(
    (entry) => entry[0] === "event" && entry[1] === "conversion",
  );
  assert.equal(conversions.length, 1);
});

test("a conversion uses the verified production destination/label and the same random deduplication ID", (t) => {
  const f = fixture();
  t.after(f.restore);
  assert.equal(ADS_DESTINATION_ID, "AW-18567431868");
  assert.equal(ADS_CONVERSION_LABEL, "gLS6CPrd5LUdELyN0pVF");
  setAdvertisingConsent("granted");
  trackSuccessfulLead({ form: "demo" });
  const conversion = commands(f.w).find(
    (entry) => entry[0] === "event" && entry[1] === "conversion",
  );
  const params = conversion?.[2] as Record<string, unknown>;
  assert.equal(params.send_to, "AW-18567431868/gLS6CPrd5LUdELyN0pVF");
  assert.equal(
    params.transaction_id,
    (successfulEvents(f.w)[0] as Record<string, unknown>).transaction_id,
  );
  assert.equal(params.form_type, "demo");
  assert.equal(params.page_location, "https://gwadawebstudio.fr/contact");
  assert.equal(params.page_referrer, "");
  assert.equal(params.allow_ad_personalization_signals, false);
  assert.equal(params.value, undefined);
  assert.ok(!JSON.stringify(params).includes("private"));
});

test("withdrawal persists denial, clears only advertising cookies, and reloads once", (t) => {
  const f = fixture();
  t.after(f.restore);
  setAdvertisingConsent("granted");
  f.cookies.set("_gcl_au", "ad-cookie");
  f.cookies.set("_gcl_aw", "ad-click");
  f.cookies.set("site-session", "essential");
  setAdvertisingConsent("denied");
  assert.equal(getAdvertisingConsentChoice(), "denied");
  assert.equal(f.w.reloads, 1);
  assert.equal(f.scripts.length, 0);
  assert.equal(f.cookies.get("site-session"), "essential");
  assert.equal(f.cookies.has("_gcl_au"), false);
  assert.equal(f.cookies.has("_gcl_aw"), false);
  assert.ok(f.cookieWrites.some((value) => value.includes("Domain=.gwadawebstudio.fr")));
  assert.deepEqual(commands(f.w).at(-1), [
    "consent",
    "update",
    {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    },
  ]);
  trackSuccessfulLead({ form: "contact" });
  initAdvertisingTracking();
  setAdvertisingConsent("denied");
  assert.equal(successfulEvents(f.w).length, 0);
  assert.equal(f.w.reloads, 1);
});

test("storage failures keep an explicit in-memory choice and cannot break forms", (t) => {
  const f = fixture();
  t.after(f.restore);
  f.w.localStorage.failReads = true;
  f.w.localStorage.failWrites = true;
  f.w.sessionStorage.failReads = true;
  f.w.sessionStorage.failWrites = true;
  assert.equal(getAdvertisingConsentChoice(), null);
  initAdvertisingTracking();
  assert.equal(f.scripts.length, 0);
  assert.doesNotThrow(() => setAdvertisingConsent("granted"));
  assert.equal(getAdvertisingConsentChoice(), "granted");
  assert.equal(f.scripts.length, 1);
  assert.doesNotThrow(() => setAdvertisingConsent("denied"));
  assert.equal(getAdvertisingConsentChoice(), "denied");
  assert.equal(f.w.reloads, 1);
  assert.doesNotThrow(() => trackSuccessfulLead({ form: "demo" }));
});

test("a failed denial write cannot revive an old persisted grant after reload", (t) => {
  const f = fixture();
  t.after(f.restore);
  setAdvertisingConsent("granted");
  const oldGrant = f.w.localStorage.getItem(ADVERTISING_CONSENT_STORAGE_KEY)!;
  f.w.localStorage.failWrites = true;
  setAdvertisingConsent("denied");
  assert.equal(f.w.localStorage.getItem(ADVERTISING_CONSENT_STORAGE_KEY), oldGrant);
  const session = f.w.sessionStorage;
  const history = f.w.history.state;
  f.restore();
  const next = fixture();
  t.after(next.restore);
  next.w.localStorage.setItem(ADVERTISING_CONSENT_STORAGE_KEY, oldGrant);
  next.w.sessionStorage = session;
  next.w.history.state = history;
  initAdvertisingTracking();
  assert.equal(getAdvertisingConsentChoice(), "denied");
  assert.equal(next.scripts.length, 0);
});

test("throwing script injection or third-party callbacks cannot throw into form handling", (t) => {
  const f = fixture();
  t.after(f.restore);
  f.blockScript();
  assert.doesNotThrow(() => setAdvertisingConsent("granted"));
  assert.doesNotThrow(() => trackSuccessfulLead({ form: "contact" }));
  f.w.gtag = () => {
    throw new Error("Third party failure");
  };
  assert.doesNotThrow(() => trackSuccessfulLead({ form: "demo" }));
  assert.doesNotThrow(() => setAdvertisingConsent("denied"));
});
