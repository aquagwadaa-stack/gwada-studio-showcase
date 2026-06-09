import { useShowroom } from "@/context/showroom-context";
import { Settings2 } from "lucide-react";

export function ConfiguratorTrigger() {
  const { openConfig } = useShowroom();
  return (
    <button
      type="button"
      onClick={openConfig}
      className="fixed z-40 bottom-5 right-5 h-14 w-14 sm:h-12 sm:w-auto sm:px-5 rounded-full gws-accent-bg shadow-2xl flex items-center justify-center gap-2 font-medium text-sm hover:scale-105 active:scale-95 transition-transform"
      style={{ boxShadow: "0 10px 30px -5px rgba(0,0,0,0.3), 0 0 0 4px var(--gws-accent, #14b8a6)11" }}
      aria-label="Ouvrir le configurateur"
    >
      <Settings2 className="h-5 w-5" />
      <span className="hidden sm:inline">Configurer</span>
    </button>
  );
}
