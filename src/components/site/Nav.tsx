import { Link, useRouterState } from "@tanstack/react-router";
import { useShowroom } from "@/context/showroom-context";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Sparkles } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/reservation", label: "Réservation" },
  { to: "/catalogue", label: "Catalogue" },
  { to: "/boutique", label: "Boutique" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { openConfig } = useShowroom();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-base">
          <span className="h-8 w-8 rounded-lg gws-accent-bg grid place-items-center">
            <Sparkles className="h-4 w-4" />
          </span>
          <span>Gwada Web Studio</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => {
            const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 rounded-md text-sm transition ${
                  active
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
                {active && <span className="block h-0.5 mt-0.5 gws-accent-bg rounded-full" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={openConfig}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium gws-accent-bg hover:opacity-90 transition"
          >
            Composer une démo
          </button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden h-10 w-10 grid place-items-center rounded-md border border-border"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-80">
              <SheetTitle className="font-display text-xl mb-6">Navigation</SheetTitle>
              <nav className="flex flex-col gap-1">
                {NAV.map((n) => {
                  const active = n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-3 rounded-lg text-base transition ${
                        active
                          ? "gws-accent-bg"
                          : "hover:bg-muted text-foreground/80 hover:text-foreground"
                      }`}
                    >
                      {n.label}
                    </Link>
                  );
                })}
              </nav>
              <button
                onClick={() => {
                  setOpen(false);
                  openConfig();
                }}
                className="mt-6 w-full px-4 py-3 rounded-full text-sm font-medium gws-accent-bg"
              >
                Composer une démo
              </button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
