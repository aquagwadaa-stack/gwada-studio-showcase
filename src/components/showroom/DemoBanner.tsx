import { Link } from "@tanstack/react-router";
import { useShowroom, SITE_TYPES, STYLE_OPTIONS } from "@/context/showroom-context";
import { Eye, Settings2 } from "lucide-react";

export function DemoBanner({ note }: { note?: string }) {
  const { modules, style, openConfig } = useShowroom();
  const current = SITE_TYPES.filter((item) => modules.includes(item.key))
    .map((item) => item.label)
    .join(" + ");
  const styleLabel = STYLE_OPTIONS.find((option) => option.key === style)?.label;
  return (
    <div className="sticky top-16 z-30 backdrop-blur bg-background/85 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 gws-accent-bg font-medium">
          <Eye className="h-3 w-3" /> Démonstration
        </span>
        <span className="text-muted-foreground truncate flex-1">
          {note ?? "Exemple personnalisable par Gwada Web Studio."} ·{" "}
          <span className="text-foreground/80">
            {styleLabel} · {current}
          </span>
        </span>
        <button
          onClick={openConfig}
          className="hidden sm:inline-flex items-center gap-1 text-foreground/80 hover:text-foreground"
        >
          <Settings2 className="h-3.5 w-3.5" /> Changer
        </button>
        <Link to="/" hash="apercu" className="text-foreground/80 hover:text-foreground">
          Composition
        </Link>
      </div>
    </div>
  );
}
