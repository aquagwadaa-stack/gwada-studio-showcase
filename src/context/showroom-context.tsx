import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SiteType = "vitrine" | "reservation" | "catalogue" | "boutique";
export type StyleKey = "minimal" | "tropical" | "editorial" | "bold" | "organic" | "night";
export type ProfileKey = "services" | "commerce" | "food" | "mobility" | "wellness";
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
  {
    key: "vitrine",
    label: "Présentation",
    short: "Expliquer l'activité et rassurer",
    href: "/vitrine",
  },
  {
    key: "reservation",
    label: "Réservation",
    short: "Proposer des créneaux en ligne",
    href: "/reservation",
  },
  {
    key: "catalogue",
    label: "Catalogue",
    short: "Présenter une offre avec des filtres",
    href: "/catalogue",
  },
  {
    key: "boutique",
    label: "Vente en ligne",
    short: "Vendre, encaisser et organiser le retrait",
    href: "/boutique",
  },
];

export const STYLE_OPTIONS: { key: StyleKey; label: string; description: string }[] = [
  { key: "minimal", label: "Clair & précis", description: "Sobre, lisible et très professionnel." },
  {
    key: "tropical",
    label: "Solaire & tropical",
    description: "Chaleureux, vivant et ancré dans les Antilles.",
  },
  {
    key: "editorial",
    label: "Éditorial & premium",
    description: "Raffiné, spacieux et haut de gamme.",
  },
  {
    key: "bold",
    label: "Audacieux & graphique",
    description: "Contrastes francs et forte personnalité.",
  },
  {
    key: "organic",
    label: "Doux & naturel",
    description: "Tons chauds, formes souples et accueil humain.",
  },
  {
    key: "night",
    label: "Tech & nocturne",
    description: "Sombre, lumineux et résolument contemporain.",
  },
];

export const PROFILE_OPTIONS: { key: ProfileKey; label: string; short: string }[] = [
  { key: "services", label: "Services", short: "Artisan, agence, indépendant" },
  { key: "commerce", label: "Commerce", short: "Magasin, marque, concept store" },
  { key: "food", label: "Restauration", short: "Restaurant, fast-food, traiteur" },
  { key: "mobility", label: "Auto & nautisme", short: "Véhicules, location, yachts" },
  { key: "wellness", label: "Bien-être & sport", short: "Salon, coach, salle, soins" },
];

type State = {
  siteType: SiteType;
  modules: SiteType[];
  profile: ProfileKey;
  style: StyleKey;
  accent: string;
  accentFg: string;
  configOpen: boolean;
};

type Ctx = State & {
  setSiteType: (v: SiteType) => void;
  toggleModule: (v: SiteType) => void;
  setProfile: (v: ProfileKey) => void;
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
    modules: ["vitrine", "reservation"],
    profile: "services",
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
        const validStyles = STYLE_OPTIONS.map((option) => option.key);
        const validProfiles = PROFILE_OPTIONS.map((option) => option.key);
        const validModules = SITE_TYPES.map((option) => option.key);
        const modules = Array.isArray(parsed.modules)
          ? parsed.modules.filter((module: SiteType) => validModules.includes(module))
          : [parsed.siteType ?? "vitrine"];
        setState((s) => ({
          ...s,
          ...parsed,
          modules: modules.length ? modules : s.modules,
          profile: validProfiles.includes(parsed.profile) ? parsed.profile : s.profile,
          style: validStyles.includes(parsed.style) ? parsed.style : s.style,
          configOpen: false,
        }));
      }
    } catch {
      // The showroom still works when browser storage is unavailable.
    }
  }, []);

  // Persist + apply data-style + accent CSS var
  useEffect(() => {
    try {
      const { configOpen, ...persist } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {
      // Persisting preferences is optional.
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-style", state.style);
      document.documentElement.style.setProperty("--gws-accent", state.accent);
      document.documentElement.style.setProperty("--gws-accent-fg", state.accentFg);
    }
  }, [state]);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      setSiteType: (v) =>
        setState((s) => ({
          ...s,
          siteType: v,
          modules: s.modules.includes(v) ? s.modules : [...s.modules, v],
        })),
      toggleModule: (v) =>
        setState((s) => {
          if (s.modules.includes(v)) {
            if (s.modules.length === 1) return s;
            const modules = s.modules.filter((module) => module !== v);
            return {
              ...s,
              modules,
              siteType: s.siteType === v ? modules[0] : s.siteType,
            };
          }
          return { ...s, modules: [...s.modules, v], siteType: v };
        }),
      setProfile: (v) => setState((s) => ({ ...s, profile: v })),
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
