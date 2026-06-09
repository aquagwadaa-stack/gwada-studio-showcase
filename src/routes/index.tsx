import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  ShoppingBag,
  LayoutGrid,
  Store,
  MessageCircle,
  Mail,
  Image as ImageIcon,
  Star,
  MapPin,
  CreditCard,
  Boxes,
  Truck,
  FileText,
  UserCircle,
  Smartphone,
  Search,
  Sparkles,
  Palette,
} from "lucide-react";
import { useShowroom, SITE_TYPES, STYLE_OPTIONS, type StyleKey } from "@/context/showroom-context";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gwada Web Studio — Imaginez votre entreprise en ligne" },
      {
        name: "description",
        content:
          "Showroom interactif pour explorer plusieurs types de sites et styles graphiques. Vitrine, réservation, catalogue, boutique.",
      },
    ],
  }),
  component: HomePage,
});

const SITE_ICONS: Record<string, any> = {
  vitrine: Store,
  reservation: Calendar,
  catalogue: LayoutGrid,
  boutique: ShoppingBag,
};

const FEATURES = [
  { icon: MessageCircle, label: "Contact WhatsApp" },
  { icon: Mail, label: "Formulaire de contact" },
  { icon: ImageIcon, label: "Galerie" },
  { icon: Star, label: "Avis clients" },
  { icon: MapPin, label: "Carte & horaires" },
  { icon: Calendar, label: "Réservation" },
  { icon: LayoutGrid, label: "Catalogue avec filtres" },
  { icon: CreditCard, label: "Paiement en ligne" },
  { icon: Boxes, label: "Gestion des stocks" },
  { icon: Truck, label: "Commande & retrait" },
  { icon: FileText, label: "Demande de devis" },
  { icon: UserCircle, label: "Espace client" },
  { icon: Smartphone, label: "Site responsive" },
  { icon: Search, label: "Référencement naturel" },
];

function HomePage() {
  const { openConfig, setSiteType } = useShowroom();

  return (
    <div>
      <Hero onCta={openConfig} />
      <TypesSection onPick={(k) => setSiteType(k)} />
      <PersonalisationSection />
      <FeaturesSection />
      <FinalCta onCta={openConfig} />
    </div>
  );
}

/* ============= Hero ============= */
function Hero({ onCta }: { onCta: () => void }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gws-surface" />
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl -z-10"
        style={{ background: "var(--gws-accent)" }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-border bg-card mb-6">
            <Sparkles className="h-3.5 w-3.5 gws-accent-text" />
            Showroom interactif — Gwada Web Studio
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] tracking-tight">
            Imaginez votre <span className="gws-display-grad gws-accent-text">entreprise</span> en ligne.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            Explorez différents types de sites, testez plusieurs styles et découvrez les fonctionnalités
            adaptées à votre activité — depuis votre téléphone.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button size="lg" onClick={onCta} className="gws-accent-bg hover:opacity-90">
              Explorer les démonstrations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Discuter de mon projet</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center gap-6 text-xs text-muted-foreground">
            <span>4 types de sites</span>
            <span className="h-3 w-px bg-border" />
            <span>3 styles visuels</span>
            <span className="h-3 w-px bg-border" />
            <span>14 fonctionnalités</span>
          </div>
        </div>

        <AnimatedPreviewStack />
      </div>
    </section>
  );
}

function AnimatedPreviewStack() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % 3), 2800);
    return () => clearInterval(t);
  }, []);
  const screens = [
    { title: "Restaurant", subtitle: "Réservation en ligne", color: "#f97316" },
    { title: "Boutique mode", subtitle: "Vente en ligne", color: "#ec4899" },
    { title: "Concession auto", subtitle: "Catalogue véhicules", color: "#3b82f6" },
  ];
  return (
    <div className="relative h-[420px] sm:h-[480px]">
      {screens.map((s, i) => {
        const offset = (i - active + 3) % 3;
        return (
          <div
            key={i}
            className="absolute inset-x-0 mx-auto w-[88%] max-w-md rounded-2xl border border-border bg-card gws-shadow overflow-hidden transition-all duration-700 ease-out gws-themed"
            style={{
              top: `${offset * 30}px`,
              transform: `scale(${1 - offset * 0.06}) translateY(${offset * 8}px)`,
              zIndex: 10 - offset,
              opacity: offset === 2 ? 0.5 : 1,
            }}
          >
            <div className="h-32 sm:h-40 relative" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)` }}>
              <div className="absolute bottom-3 left-4 text-white">
                <div className="text-xs opacity-80">Aperçu</div>
                <div className="font-display font-semibold text-lg">{s.title}</div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-muted-foreground">{s.subtitle}</div>
              <div className="h-3 rounded bg-muted w-full" />
              <div className="h-3 rounded bg-muted w-4/5" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-12 rounded-md bg-muted" />
                <div className="h-12 rounded-md bg-muted" />
                <div className="h-12 rounded-md bg-muted" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-8 rounded-full gws-accent-bg w-24" />
                <div className="h-8 rounded-full border border-border w-20" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============= Types ============= */
function TypesSection({ onPick }: { onPick: (k: any) => void }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="Étape 1"
          title="Quel site correspond à votre besoin ?"
          subtitle="Quatre points de départ pour quatre types d'activité. Cliquez pour voir la démo."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SITE_TYPES.map((s) => {
            const Icon = SITE_ICONS[s.key];
            return (
              <Link
                key={s.key}
                to={s.href}
                onClick={() => onPick(s.key)}
                className="group rounded-2xl border border-border bg-card p-6 hover:gws-accent-border hover:-translate-y-1 transition-all duration-300 gws-themed"
              >
                <div className="h-12 w-12 rounded-xl gws-accent-bg grid place-items-center mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                <h3 className="font-display text-xl font-semibold leading-tight">{s.short}</h3>
                <div className="mt-6 inline-flex items-center text-sm gws-accent-text">
                  Voir la démo <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============= Personnalisation ============= */
function PersonalisationSection() {
  return (
    <section className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="Étape 2"
          title="Un même site, plusieurs identités."
          subtitle="Le même contenu peut adopter une ambiance minimaliste, dynamique ou premium. Choisissez celle qui vous ressemble."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {STYLE_OPTIONS.map((s) => (
            <StyleMockup key={s.key} styleKey={s.key} label={s.label} description={s.description} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StyleMockup({
  styleKey,
  label,
  description,
}: {
  styleKey: StyleKey;
  label: string;
  description: string;
}) {
  const { setStyle, openConfig } = useShowroom();
  const presets: Record<StyleKey, { bg: string; fg: string; accent: string; radius: string; font: string }> = {
    minimal: { bg: "#fafbfc", fg: "#0f172a", accent: "#0ea5e9", radius: "8px", font: "Inter, sans-serif" },
    dynamic: {
      bg: "linear-gradient(135deg, #fff1f9 0%, #fef3c7 50%, #dbeafe 100%)",
      fg: "#1a1a2e",
      accent: "#ec4899",
      radius: "20px",
      font: "Sora, sans-serif",
    },
    premium: { bg: "#161310", fg: "#f0e6d2", accent: "#d4af37", radius: "4px", font: "Cormorant Garamond, serif" },
  };
  const p = presets[styleKey];
  return (
    <button
      onClick={() => {
        setStyle(styleKey);
        openConfig();
      }}
      className="text-left rounded-2xl border border-border overflow-hidden hover:-translate-y-1 transition-all duration-300 group"
    >
      <div
        className="p-6 h-72 flex flex-col gap-4"
        style={{ background: p.bg, color: p.fg, fontFamily: p.font, borderRadius: p.radius }}
      >
        <div className="text-[10px] uppercase tracking-widest opacity-60">Votre entreprise</div>
        <div className="text-2xl font-semibold leading-tight" style={{ letterSpacing: styleKey === "dynamic" ? "-0.03em" : "-0.01em" }}>
          Bienvenue chez nous
        </div>
        <div className="text-xs opacity-70 leading-relaxed">
          Découvrez nos services pensés pour vous offrir une expérience unique.
        </div>
        <div className="mt-auto flex items-center gap-2">
          <span
            className="px-3 py-2 text-xs font-medium"
            style={{ background: p.accent, color: styleKey === "premium" ? "#161310" : "#fff", borderRadius: p.radius }}
          >
            Découvrir
          </span>
          <span
            className="px-3 py-2 text-xs"
            style={{ border: `1px solid ${p.fg}33`, borderRadius: p.radius }}
          >
            En savoir plus
          </span>
        </div>
      </div>
      <div className="p-4 bg-card">
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-muted-foreground mt-1">{description}</div>
        <div className="text-xs gws-accent-text mt-2 inline-flex items-center gap-1">
          <Palette className="h-3 w-3" /> Appliquer ce style
        </div>
      </div>
    </button>
  );
}

/* ============= Features ============= */
function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          kicker="Étape 3"
          title="Toutes les fonctionnalités essentielles."
          subtitle="Activez seulement celles dont vous avez besoin. Tout est combinable."
        />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:gws-accent-border transition gws-themed"
            >
              <div className="h-9 w-9 rounded-lg gws-accent-bg grid place-items-center flex-shrink-0">
                <f.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link to="/fonctionnalites">Voir toutes les fonctionnalités <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ============= CTA ============= */
function FinalCta({ onCta }: { onCta: () => void }) {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl p-8 sm:p-14 text-center gws-shadow border border-border bg-card">
          <div className="absolute inset-0 -z-10 opacity-20" style={{ background: "var(--gws-accent)" }} />
          <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-tight">
            Votre entreprise mérite un site qui lui ressemble.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Parlons de votre projet. On vous propose une maquette adaptée à votre activité, votre budget et votre style.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild className="gws-accent-bg hover:opacity-90">
              <Link to="/contact">Parler de mon projet</Link>
            </Button>
            <Button size="lg" variant="outline" onClick={onCta}>
              Continuer à explorer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-3xl">
      {kicker && (
        <div className="text-xs uppercase tracking-widest gws-accent-text mb-3 font-semibold">
          {kicker}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
