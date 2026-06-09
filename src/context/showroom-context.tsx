import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SiteType = "vitrine" | "reservation" | "catalogue" | "boutique";
export type StyleKey = "minimal" | "dynamic" | "premium";
export type AccentPreset = {
  key: string;
  label: string;
  value: string;
  fg: string;
};

export const ACCENT_PRESETS: AccentPreset[] = [
  { key: "turquoise", label: "Turquoise", value: "#14b8a6", fg: "#ffffff" },
  { key: "ocean", label: "Bleu océan", value: "#2563eb", fg: "#ffffff" },
  { key: "violet", label: "Violet", value: "#7c3aed", fg: "#ffffff" },
  { key: "coral", label: "Corail", value: "#f43f5e", fg: "#ffffff" },
  { key: "gold", label: "Doré", value: "#c9a84c", fg: "#1a1611" },
  { key: "tropic", label: "Vert tropical", value: "#16a34a", fg: "#ffffff" },
];

export const SITE_TYPES: { key: SiteType; label: string; short: string; href: string }[] = [
  { key: "vitrine", label: "Site vitrine", short: "Présenter mon activité", href: "/vitrine" },
  { key: "reservation", label: "Réservation en ligne", short: "Prendre des réservations", href: "/reservation" },
  { key: "catalogue", label: "Catalogue", short: "Afficher un catalogue", href: "/catalogue" },
  { key: "boutique", label: "Boutique en ligne", short: "Vendre en ligne", href: "/boutique" },
];

export const STYLE_OPTIONS: { key: StyleKey; label: string; description: string }[] = [
  { key: "minimal", label: "Moderne & minimaliste", description: "Fond clair, typographie nette, beaucoup d'espace." },
  { key: "dynamic", label: "Dynamique & coloré", description: "Dégradés vifs, formes arrondies, énergie." },
  { key: "premium", label: "Élégant & premium", description: "Sombre, typographie éditoriale, touches dorées." },
];

type State = {
  siteType: SiteType;
  style: StyleKey;
  accent: string;
  accentFg: string;
  configOpen: boolean;
};

type Ctx = State & {
  setSiteType: (v: SiteType) => void;
  setStyle: (v: StyleKey) => void;
  setAccent: (value: string, fg?: string) => void;
  openConfig: () => void;
  closeConfig: () => void;
  toggleConfig: () => void;
};

const ShowroomCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "gws-showroom-v1";

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    siteType: "vitrine",
    style: "minimal",
    accent: ACCENT_PRESETS[0].value,
    accentFg: ACCENT_PRESETS[0].fg,
    configOpen: false,
  });

  // Restore from localStorage on mount (client only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState((s) => ({ ...s, ...parsed, configOpen: false }));
      }
    } catch {}
  }, []);

  // Persist + apply data-style + accent CSS var
  useEffect(() => {
    try {
      const { configOpen, ...persist } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-style", state.style);
      document.documentElement.style.setProperty("--gws-accent", state.accent);
      document.documentElement.style.setProperty("--gws-accent-fg", state.accentFg);
    }
  }, [state]);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      setSiteType: (v) => setState((s) => ({ ...s, siteType: v })),
      setStyle: (v) => setState((s) => ({ ...s, style: v })),
      setAccent: (value, fg) =>
        setState((s) => ({ ...s, accent: value, accentFg: fg ?? s.accentFg })),
      openConfig: () => setState((s) => ({ ...s, configOpen: true })),
      closeConfig: () => setState((s) => ({ ...s, configOpen: false })),
      toggleConfig: () => setState((s) => ({ ...s, configOpen: !s.configOpen })),
    }),
    [state],
  );

  return <ShowroomCtx.Provider value={value}>{children}</ShowroomCtx.Provider>;
}

export function useShowroom() {
  const ctx = useContext(ShowroomCtx);
  if (!ctx) throw new Error("useShowroom must be used within ShowroomProvider");
  return ctx;
}
