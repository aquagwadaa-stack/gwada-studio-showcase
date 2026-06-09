import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  useShowroom,
  ACCENT_PRESETS,
  SITE_TYPES,
  STYLE_OPTIONS,
  type StyleKey,
  type SiteType,
} from "@/context/showroom-context";
import { Link } from "@tanstack/react-router";
import { Check, Sparkles, ArrowRight } from "lucide-react";

export function Configurator() {
  const { configOpen, closeConfig, siteType, setSiteType, style, setStyle, accent, setAccent } =
    useShowroom();

  const currentDemo = SITE_TYPES.find((s) => s.key === siteType)!;

  return (
    <Sheet open={configOpen} onOpenChange={(o) => !o && closeConfig()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto p-0 flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-3 border-b">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> Configurateur
          </div>
          <SheetTitle className="text-2xl font-display">Composez votre site</SheetTitle>
          <SheetDescription>
            Choisissez un type, un style et une couleur. L'aperçu se met à jour partout.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-6 py-5 space-y-7">
          {/* Type */}
          <section>
            <h3 className="text-sm font-semibold mb-3">Type de site</h3>
            <div className="grid grid-cols-2 gap-2">
              {SITE_TYPES.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSiteType(s.key as SiteType)}
                  className={`text-left rounded-lg border p-3 text-sm transition gws-themed ${
                    siteType === s.key
                      ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30 bg-[var(--gws-accent)]/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <div className="font-medium">{s.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.short}</div>
                </button>
              ))}
            </div>
          </section>

          {/* Style */}
          <section>
            <h3 className="text-sm font-semibold mb-3">Style visuel</h3>
            <div className="space-y-2">
              {STYLE_OPTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setStyle(s.key as StyleKey)}
                  className={`w-full text-left rounded-lg border p-3 transition flex items-start gap-3 ${
                    style === s.key
                      ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30 bg-[var(--gws-accent)]/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <StyleSwatch styleKey={s.key} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.description}</div>
                  </div>
                  {style === s.key && <Check className="h-4 w-4 gws-accent-text mt-0.5" />}
                </button>
              ))}
            </div>
          </section>

          {/* Accent */}
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
            <Link to={currentDemo.href}>
              Voir la démo : {currentDemo.label}
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
    dynamic: { background: "linear-gradient(135deg, #ec4899, #f59e0b, #3b82f6)" },
    premium: { background: "linear-gradient(135deg, #1a1611, #2d2418)" },
  };
  return (
    <div
      className="h-10 w-10 rounded-md border border-border flex-shrink-0 grid place-items-center text-[10px] font-semibold"
      style={styles[styleKey]}
    >
      {styleKey === "premium" && <span style={{ color: "#d4af37" }}>Aa</span>}
      {styleKey === "minimal" && <span style={{ color: "#0f172a" }}>Aa</span>}
      {styleKey === "dynamic" && <span style={{ color: "#fff" }}>Aa</span>}
    </div>
  );
}
