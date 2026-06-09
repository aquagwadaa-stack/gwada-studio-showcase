import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useShowroom,
  ACCENT_PRESETS,
  SITE_TYPES,
  STYLE_OPTIONS,
  PROFILE_OPTIONS,
  type StyleKey,
  type SiteType,
  type ProfileKey,
} from "@/context/showroom-context";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles, ArrowRight, Layers3 } from "lucide-react";

export function Configurator() {
  const {
    configOpen,
    closeConfig,
    modules,
    toggleModule,
    profile,
    setProfile,
    style,
    setStyle,
    accent,
    setAccent,
  } = useShowroom();

  return (
    <Sheet open={configOpen} onOpenChange={(o) => !o && closeConfig()}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-3 border-b">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Configurateur
          </div>
          <SheetTitle className="text-2xl font-display">Composez votre site</SheetTitle>
          <SheetDescription>
            Combinez vos besoins, puis choisissez l'univers et la direction artistique.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-6 py-5 space-y-7">
          <section>
            <div className="flex items-center justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold">Fonctionnalités</h3>
              <span className="text-xs text-muted-foreground">
                {modules.length} sélectionnée{modules.length > 1 ? "s" : ""}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SITE_TYPES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => toggleModule(s.key as SiteType)}
                  className={`text-left rounded-lg border p-3 text-sm transition gws-themed ${
                    modules.includes(s.key)
                      ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30 bg-[var(--gws-accent)]/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-medium">{s.label}</div>
                    {modules.includes(s.key) && <Check className="h-4 w-4 gws-accent-text" />}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.short}</div>
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Exemple : présentation + réservation, ou catalogue + vente en ligne.
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-3">Univers de contenu</h3>
            <div className="grid grid-cols-2 gap-2">
              {PROFILE_OPTIONS.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setProfile(option.key as ProfileKey)}
                  className={`text-left rounded-lg border p-3 transition ${
                    profile === option.key
                      ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30 bg-[var(--gws-accent)]/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div className="text-sm font-medium">{option.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{option.short}</div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-3">Style visuel</h3>
            <div className="grid grid-cols-2 gap-2">
              {STYLE_OPTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStyle(s.key as StyleKey)}
                  className={`w-full text-left rounded-lg border p-3 transition ${
                    style === s.key
                      ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30 bg-[var(--gws-accent)]/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <StyleSwatch styleKey={s.key} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium leading-tight">{s.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-snug">
                        {s.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold mb-3">Couleur d'accent</h3>
            <div className="flex flex-wrap gap-2.5">
              {ACCENT_PRESETS.map((p) => {
                const active = accent.toLowerCase() === p.value.toLowerCase();
                return (
                  <button
                    key={p.key}
                    type="button"
                    aria-label={p.label}
                    onClick={() => setAccent(p.value, p.fg)}
                    className={`h-9 w-9 rounded-full border-2 transition relative ${
                      active ? "border-foreground scale-110" : "border-border hover:scale-105"
                    }`}
                    style={{ backgroundColor: p.value }}
                  >
                    {active && (
                      <Check className="h-4 w-4 absolute inset-0 m-auto" style={{ color: p.fg }} />
                    )}
                  </button>
                );
              })}
              <label className="h-9 w-9 rounded-full border-2 border-dashed border-border grid place-items-center cursor-pointer hover:border-foreground/40 relative overflow-hidden">
                <input
                  type="color"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  aria-label="Couleur personnalisée"
                />
                <span className="text-[10px] text-muted-foreground">+</span>
              </label>
            </div>
          </section>
        </div>

        <div className="border-t p-4 space-y-2 bg-card sticky bottom-0">
          <Button asChild className="w-full gws-accent-bg hover:opacity-90" onClick={closeConfig}>
            <Link to="/" hash="apercu">
              <Layers3 className="mr-2 h-4 w-4" />
              Voir ma composition
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={closeConfig}>
            Fermer
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function StyleSwatch({ styleKey }: { styleKey: StyleKey }) {
  const styles: Record<StyleKey, React.CSSProperties> = {
    minimal: { background: "linear-gradient(135deg, #ffffff, #f1f5f9)", color: "#0f172a" },
    tropical: { background: "linear-gradient(135deg, #f97316, #facc15 50%, #0d9488)" },
    editorial: { background: "linear-gradient(135deg, #f2eadf, #c8b69e)" },
    bold: { background: "linear-gradient(135deg, #111111 50%, #f4ff54 50%)" },
    organic: { background: "linear-gradient(135deg, #efe5d3, #9fb38f)" },
    night: { background: "linear-gradient(135deg, #07111f, #142c4c 60%, #26d9c7)" },
  };
  return (
    <div
      className="h-10 w-10 rounded-md border border-border flex-shrink-0 grid place-items-center text-[10px] font-semibold"
      style={styles[styleKey]}
    >
      <span
        style={{
          color: styleKey === "bold" ? "#ffffff" : styleKey === "night" ? "#8ff8ef" : "#172033",
        }}
      >
        Aa
      </span>
    </div>
  );
}
