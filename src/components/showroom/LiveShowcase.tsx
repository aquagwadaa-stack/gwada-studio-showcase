import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ACCENT_PRESETS,
  PROFILE_OPTIONS,
  SITE_TYPES,
  STYLE_OPTIONS,
  useShowroom,
  type ProfileKey,
  type SiteType,
  type StyleKey,
} from "@/context/showroom-context";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Eye,
  Heart,
  Laptop,
  LayoutGrid,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Monitor,
  Plus,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
} from "lucide-react";

type Profile = {
  brand: string;
  eyebrow: string;
  title: string;
  description: string;
  action: string;
  image: string;
  location: string;
  metric: string;
  metricLabel: string;
  offers: { title: string; text: string }[];
  products: { name: string; detail: string; price: string; image: string }[];
};

const PROFILES: Record<ProfileKey, Profile> = {
  services: {
    brand: "Atelier Horizon",
    eyebrow: "Conseil · Expertise · Sur mesure",
    title: "Des solutions pensées autour de votre projet.",
    description:
      "Un accompagnement clair, humain et exigeant, de la première idée jusqu'à la réalisation.",
    action: "Parler de mon projet",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85",
    location: "Guadeloupe",
    metric: "4,9/5",
    metricLabel: "Avis clients",
    offers: [
      {
        title: "Diagnostic",
        text: "Un premier échange pour cadrer votre besoin et vos priorités.",
      },
      {
        title: "Accompagnement",
        text: "Une solution construite avec vous, sans formule toute faite.",
      },
      { title: "Suivi", text: "Un interlocuteur disponible avant, pendant et après le projet." },
    ],
    products: [
      {
        name: "Formule Essentielle",
        detail: "Pour avancer avec une base claire",
        price: "Sur devis",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Formule Signature",
        detail: "Un accompagnement complet et personnalisé",
        price: "Sur devis",
        image:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Session Conseil",
        detail: "Une réponse ciblée à une problématique précise",
        price: "90 €",
        image:
          "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  commerce: {
    brand: "Maison Kalina",
    eyebrow: "Sélection · Création · Savoir-faire",
    title: "Une sélection qui ne ressemble qu'à vous.",
    description:
      "Des pièces choisies avec soin, une expérience fluide et des conseils qui font la différence.",
    action: "Découvrir la collection",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85",
    location: "Saint-François",
    metric: "48 h",
    metricLabel: "Retrait disponible",
    offers: [
      { title: "Nouveautés", text: "Les dernières pièces arrivées en boutique." },
      {
        title: "Conseil personnalisé",
        text: "Des recommandations selon vos envies et votre budget.",
      },
      {
        title: "Retrait rapide",
        text: "Commandez en ligne et récupérez votre sélection sur place.",
      },
    ],
    products: [
      {
        name: "Édition Sable",
        detail: "Série limitée · Disponible",
        price: "89 €",
        image:
          "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Collection Rivage",
        detail: "Nouveauté · 4 variantes",
        price: "64 €",
        image:
          "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Pièce Signature",
        detail: "Fabrication soignée · Sur commande",
        price: "129 €",
        image:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  food: {
    brand: "Casa Manguier",
    eyebrow: "Cuisine fraîche · Saveurs locales",
    title: "Le goût des îles, servi comme on l'aime.",
    description:
      "Une cuisine généreuse, des produits frais et la possibilité de réserver ou commander en quelques secondes.",
    action: "Voir la carte",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    location: "Le Moule",
    metric: "20 min",
    metricLabel: "Commande à emporter",
    offers: [
      { title: "Sur place", text: "Une ambiance chaleureuse et une équipe aux petits soins." },
      { title: "À emporter", text: "Commandez en ligne et choisissez votre heure de retrait." },
      { title: "Événements", text: "Des formules adaptées aux groupes et aux occasions." },
    ],
    products: [
      {
        name: "Assiette Créole",
        detail: "Poisson, riz parfumé, légumes pays",
        price: "18 €",
        image:
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Burger Manguier",
        detail: "Pain brioché, sauce maison, frites",
        price: "16 €",
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Douceur Coco",
        detail: "Dessert du moment · Fait maison",
        price: "8 €",
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  mobility: {
    brand: "Azura Motors",
    eyebrow: "Automobile · Nautisme · Sélection",
    title: "Trouvez le modèle qui ouvre de nouvelles routes.",
    description:
      "Des véhicules sélectionnés, des fiches détaillées et un accompagnement simple jusqu'à la prise en main.",
    action: "Explorer les modèles",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
    location: "Baie-Mahault",
    metric: "24 h",
    metricLabel: "Réponse commerciale",
    offers: [
      {
        title: "Sélection contrôlée",
        text: "Chaque modèle est présenté avec ses informations essentielles.",
      },
      {
        title: "Essai sur rendez-vous",
        text: "Choisissez votre créneau directement depuis le catalogue.",
      },
      {
        title: "Reprise & financement",
        text: "Une demande structurée pour recevoir une proposition adaptée.",
      },
    ],
    products: [
      {
        name: "Crossover Horizon",
        detail: "2025 · Hybride · 12 400 km",
        price: "36 900 €",
        image:
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Cabriolet Azur",
        detail: "2024 · Essence · 8 200 km",
        price: "42 500 €",
        image:
          "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Day Cruiser 28",
        detail: "8,5 m · 300 ch · Disponible",
        price: "Sur demande",
        image:
          "https://images.unsplash.com/photo-1540946485063-a40da27545f8?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
  wellness: {
    brand: "Studio Anasa",
    eyebrow: "Mouvement · Soin · Équilibre",
    title: "Votre prochain rendez-vous avec vous-même.",
    description:
      "Des séances adaptées à votre rythme, une équipe attentive et une réservation disponible 24 h/24.",
    action: "Réserver une séance",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85",
    location: "Sainte-Anne",
    metric: "7/7",
    metricLabel: "Réservation en ligne",
    offers: [
      { title: "Découverte", text: "Une première séance pour définir vos objectifs." },
      { title: "Programme suivi", text: "Un accompagnement progressif et ajusté à vos besoins." },
      { title: "Accès libre", text: "Des formules flexibles pour avancer à votre rythme." },
    ],
    products: [
      {
        name: "Séance Découverte",
        detail: "45 min · Tous niveaux",
        price: "25 €",
        image:
          "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Programme Équilibre",
        detail: "8 séances · Suivi personnalisé",
        price: "149 €",
        image:
          "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Pass Mensuel",
        detail: "Accès illimité · Sans engagement",
        price: "69 €",
        image:
          "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
};

const MODULE_ICONS: Record<SiteType, typeof Store> = {
  vitrine: Store,
  reservation: CalendarDays,
  catalogue: LayoutGrid,
  boutique: ShoppingBag,
};

export function LiveShowcase() {
  const { modules, toggleModule, profile, setProfile, style, setStyle, accent, setAccent } =
    useShowroom();
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");

  return (
    <section id="apercu" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="mb-10 max-w-3xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] gws-accent-text">
            <Sparkles className="h-4 w-4" />
            Démonstration sur mesure
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
            Composez un site, pas une case.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Un même projet peut présenter une activité, prendre des rendez-vous, afficher un
            catalogue et vendre en ligne. Activez ce qui vous intéresse : l'aperçu se reconstruit
            instantanément.
          </p>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[350px_minmax(0,1fr)]">
          <aside className="space-y-4 xl:sticky xl:top-24">
            <ControlPanel title="1. Ce que le site doit faire">
              <div className="grid grid-cols-2 gap-2">
                {SITE_TYPES.map((module) => {
                  const Icon = MODULE_ICONS[module.key];
                  const active = modules.includes(module.key);
                  return (
                    <button
                      key={module.key}
                      type="button"
                      onClick={() => toggleModule(module.key)}
                      aria-pressed={active}
                      className={`rounded-xl border p-3 text-left transition ${
                        active
                          ? "gws-accent-border bg-[var(--gws-accent)]/5 ring-2 ring-[var(--gws-accent)]/20"
                          : "border-border bg-background hover:border-foreground/30"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <Icon className={`h-4 w-4 ${active ? "gws-accent-text" : ""}`} />
                        {active && <Check className="h-4 w-4 gws-accent-text" />}
                      </div>
                      <div className="mt-3 text-sm font-semibold">{module.label}</div>
                      <div className="mt-1 text-xs leading-snug text-muted-foreground">
                        {module.short}
                      </div>
                    </button>
                  );
                })}
              </div>
            </ControlPanel>

            <ControlPanel title="2. Adapter le contenu">
              <div className="flex flex-wrap gap-2">
                {PROFILE_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setProfile(option.key)}
                    aria-pressed={profile === option.key}
                    className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                      profile === option.key
                        ? "gws-accent-bg gws-accent-border"
                        : "border-border bg-background hover:border-foreground/30"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </ControlPanel>

            <ControlPanel title="3. Choisir une direction">
              <div className="grid grid-cols-2 gap-2">
                {STYLE_OPTIONS.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setStyle(option.key)}
                    aria-pressed={style === option.key}
                    className={`rounded-xl border p-2.5 text-left transition ${
                      style === option.key
                        ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/20"
                        : "border-border hover:border-foreground/30"
                    }`}
                  >
                    <StyleSample styleKey={option.key} />
                    <div className="mt-2 text-xs font-semibold leading-tight">{option.label}</div>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
                <span className="mr-auto text-xs text-muted-foreground">Couleur d'accent</span>
                {ACCENT_PRESETS.slice(0, 5).map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    aria-label={preset.label}
                    aria-pressed={accent === preset.value}
                    onClick={() => setAccent(preset.value, preset.fg)}
                    className={`h-6 w-6 rounded-full border-2 transition ${
                      accent === preset.value ? "scale-110 border-foreground" : "border-background"
                    }`}
                    style={{ backgroundColor: preset.value }}
                  />
                ))}
              </div>
            </ControlPanel>
          </aside>

          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4 gws-accent-text" />
                Aperçu interactif
                <span className="hidden sm:inline">
                  · {modules.length} module{modules.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
                <DeviceButton
                  active={device === "desktop"}
                  label="Ordinateur"
                  onClick={() => setDevice("desktop")}
                  icon={Monitor}
                />
                <DeviceButton
                  active={device === "mobile"}
                  label="Mobile"
                  onClick={() => setDevice("mobile")}
                  icon={Smartphone}
                />
              </div>
            </div>

            <div className="showcase-stage rounded-[2rem] border border-border bg-[#111318] p-2 shadow-2xl sm:p-3">
              <div className="flex h-8 items-center gap-1.5 px-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="mx-auto rounded-md bg-white/10 px-10 py-1 text-[10px] text-white/45">
                  votre-entreprise.fr
                </div>
              </div>
              <div
                className={`mx-auto overflow-hidden bg-background text-foreground transition-all duration-500 ${
                  device === "mobile"
                    ? "h-[720px] max-w-[390px] rounded-[1.6rem]"
                    : "h-[760px] w-full rounded-[1.35rem]"
                }`}
              >
                <div className="h-full overflow-y-auto">
                  <LiveSite
                    profile={PROFILES[profile]}
                    modules={modules}
                    mobile={device === "mobile"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function DeviceButton({
  active,
  label,
  onClick,
  icon: Icon,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  icon: typeof Laptop;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active ? "gws-accent-bg" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function StyleSample({ styleKey }: { styleKey: StyleKey }) {
  const backgrounds: Record<StyleKey, string> = {
    minimal: "linear-gradient(135deg, #fff 0 62%, #dbeafe 62%)",
    tropical: "linear-gradient(135deg, #ffedd5, #fde047 48%, #0f766e)",
    editorial: "linear-gradient(135deg, #f5efe6 0 65%, #aa8d70 65%)",
    bold: "linear-gradient(135deg, #111 0 58%, #eaff47 58%)",
    organic: "linear-gradient(135deg, #eee2cf 0 58%, #829774 58%)",
    night: "linear-gradient(135deg, #071321, #16385c 65%, #33e1cc)",
  };
  return (
    <div
      className="h-8 rounded-lg border border-black/5"
      style={{ background: backgrounds[styleKey] }}
    />
  );
}

function LiveSite({
  profile,
  modules,
  mobile,
}: {
  profile: Profile;
  modules: SiteType[];
  mobile: boolean;
}) {
  const [cartCount, setCartCount] = useState(0);
  const has = (module: SiteType) => modules.includes(module);

  return (
    <div className={`demo-site min-h-full ${mobile ? "is-mobile" : ""}`}>
      <header className="demo-nav sticky top-0 z-20 flex items-center border-b border-border/60 bg-background/90 px-5 py-4 backdrop-blur md:px-8">
        <div className="font-display text-base font-bold tracking-tight sm:text-lg">
          {profile.brand}
        </div>
        <nav
          className={`${mobile ? "hidden" : "ml-auto hidden items-center gap-5 text-xs md:flex"}`}
        >
          <a href="#demo-about" className="hover:gws-accent-text">
            L'expérience
          </a>
          {has("reservation") && (
            <a href="#demo-booking" className="hover:gws-accent-text">
              Réserver
            </a>
          )}
          {has("catalogue") && (
            <a href="#demo-catalogue" className="hover:gws-accent-text">
              Catalogue
            </a>
          )}
          {has("boutique") && (
            <a href="#demo-shop" className="hover:gws-accent-text">
              Boutique
            </a>
          )}
        </nav>
        {has("boutique") && (
          <button
            type="button"
            aria-label={`Voir le panier, ${cartCount} article${cartCount > 1 ? "s" : ""}`}
            className="relative ml-auto mr-2 grid h-9 w-9 place-items-center rounded-full border border-border md:ml-5"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full gws-accent-bg px-1 text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
        )}
        <button
          aria-label="Ouvrir le menu de l'aperçu"
          className={`${mobile ? "grid" : "grid md:hidden"} h-9 w-9 place-items-center rounded-full border border-border`}
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      <section
        className={`demo-hero relative overflow-hidden ${mobile ? "min-h-[520px]" : "min-h-[560px]"}`}
      >
        <img src={profile.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/10" />
        <div
          className={`relative z-10 flex min-h-[inherit] max-w-3xl flex-col justify-end p-6 text-white ${mobile ? "" : "md:p-14"}`}
        >
          <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/75">
            {profile.eyebrow}
          </div>
          <h1
            className={`font-display font-bold leading-[0.98] tracking-tight ${mobile ? "text-4xl" : "text-4xl sm:text-6xl lg:text-7xl"}`}
          >
            {profile.title}
          </h1>
          <p
            className={`mt-5 max-w-xl leading-relaxed text-white/80 ${mobile ? "text-sm" : "text-base"}`}
          >
            {profile.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <button className="rounded-full gws-accent-bg px-5 py-3 text-xs font-semibold">
              {profile.action}
            </button>
            <button className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-xs font-semibold text-white backdrop-blur">
              Nous contacter
            </button>
          </div>
          <div className="mt-8 flex items-center gap-5 border-t border-white/20 pt-5 text-xs text-white/75">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> {profile.location}
            </span>
            <span>
              <strong className="text-white">{profile.metric}</strong> {profile.metricLabel}
            </span>
          </div>
        </div>
      </section>

      {has("vitrine") && (
        <section id="demo-about" className="px-5 py-14 md:px-10 md:py-20">
          <div className={`${mobile ? "" : "grid items-end gap-8 md:grid-cols-[1fr_0.9fr]"}`}>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] gws-accent-text">
                Une présence qui inspire confiance
              </div>
              <h2
                className={`mt-3 font-display font-bold leading-tight ${mobile ? "text-3xl" : "text-4xl md:text-5xl"}`}
              >
                L'essentiel compris en quelques secondes.
              </h2>
            </div>
            <p className={`text-sm leading-relaxed text-muted-foreground ${mobile ? "mt-4" : ""}`}>
              Votre histoire, vos points forts, vos avis et vos informations pratiques sont
              organisés pour guider naturellement le visiteur vers la bonne action.
            </p>
          </div>
          <div className={`mt-8 grid gap-3 ${mobile ? "" : "md:grid-cols-3"}`}>
            {profile.offers.map((offer, index) => (
              <article
                key={offer.title}
                className="demo-card rounded-2xl border border-border bg-card p-5"
              >
                <div className="mb-8 text-xs font-semibold gws-accent-text">0{index + 1}</div>
                <h3 className="font-display text-lg font-bold">{offer.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{offer.text}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {has("catalogue") && (
        <section id="demo-catalogue" className="bg-muted/45 px-5 py-14 md:px-10 md:py-20">
          <SectionHeading
            eyebrow="Catalogue filtrable"
            title="Explorez l'offre en un coup d'œil."
          />
          <div className="mt-6 flex gap-2 overflow-hidden">
            {["Tous", "Nouveautés", "Disponibles", "Sur mesure"].map((filter, index) => (
              <span
                key={filter}
                className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] font-medium ${
                  index === 0 ? "gws-accent-bg gws-accent-border" : "border-border bg-background"
                }`}
              >
                {filter}
              </span>
            ))}
          </div>
          <div className={`mt-6 grid gap-3 ${mobile ? "" : "sm:grid-cols-3"}`}>
            {profile.products.map((product) => (
              <article
                key={product.name}
                className="demo-card overflow-hidden rounded-2xl border border-border bg-card"
              >
                <img
                  src={product.image}
                  alt=""
                  className={`w-full object-cover ${mobile ? "h-48" : "h-40"}`}
                />
                <div className="p-4">
                  <h3 className="font-display font-bold">{product.name}</h3>
                  <p className="mt-1 text-[10px] text-muted-foreground">{product.detail}</p>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-sm font-bold gws-accent-text">{product.price}</span>
                    <button
                      aria-label={`Voir les détails de ${product.name}`}
                      className="grid h-8 w-8 place-items-center rounded-full border border-border"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 text-xs font-semibold gws-accent-text"
            >
              Tester le catalogue complet <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      )}

      {has("reservation") && (
        <section id="demo-booking" className="px-5 py-14 md:px-10 md:py-20">
          <div className={`${mobile ? "" : "grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]"}`}>
            <div>
              <SectionHeading
                eyebrow="Réservation 24 h/24"
                title="Un rendez-vous en moins d'une minute."
              />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Le client choisit une prestation, une date et un créneau disponible. Vous gardez la
                maîtrise de votre agenda.
              </p>
              <Link
                to="/reservation"
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold gws-accent-text"
              >
                Tester le parcours complet <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div
              className={`demo-card rounded-3xl border border-border bg-card p-5 shadow-lg ${mobile ? "mt-7" : ""}`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Choisir un créneau
                  </div>
                  <div className="mt-1 font-display text-lg font-bold">Cette semaine</div>
                </div>
                <CalendarDays className="h-5 w-5 gws-accent-text" />
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {[
                  ["Mar", "16"],
                  ["Mer", "17"],
                  ["Jeu", "18"],
                  ["Ven", "19"],
                ].map(([day, date], index) => (
                  <button
                    key={day}
                    className={`rounded-xl border px-2 py-3 text-center ${
                      index === 1 ? "gws-accent-bg gws-accent-border" : "border-border"
                    }`}
                  >
                    <span className="block text-[9px] opacity-70">{day}</span>
                    <strong className="mt-1 block text-sm">{date}</strong>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["09:30", "11:00", "14:30", "15:30", "16:00", "17:30"].map((time, index) => (
                  <button
                    key={time}
                    className={`rounded-lg border px-2 py-2 text-[10px] ${
                      index === 3 ? "gws-accent-border bg-[var(--gws-accent)]/5" : "border-border"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl gws-accent-bg py-3 text-xs font-semibold">
                <Clock3 className="h-3.5 w-3.5" /> Continuer
              </button>
            </div>
          </div>
        </section>
      )}

      {has("boutique") && (
        <section id="demo-shop" className="bg-muted/45 px-5 py-14 md:px-10 md:py-20">
          <div className="flex items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Vente en ligne"
              title="Du produit au paiement, sans friction."
            />
            <span className="hidden text-xs text-muted-foreground md:block">
              Stock · Livraison · Retrait
            </span>
          </div>
          <div className={`mt-7 grid gap-3 ${mobile ? "" : "sm:grid-cols-3"}`}>
            {profile.products.map((product, index) => (
              <article
                key={product.name}
                className="demo-card rounded-2xl border border-border bg-card p-3"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt=""
                    className={`w-full object-cover ${mobile ? "h-52" : "h-36"}`}
                  />
                  {index === 0 && (
                    <span className="absolute left-2 top-2 rounded-full bg-background/90 px-2 py-1 text-[9px] font-semibold backdrop-blur">
                      Coup de cœur
                    </span>
                  )}
                  <button
                    aria-label={`Ajouter ${product.name} aux favoris`}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-background/90 backdrop-blur"
                  >
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="px-1 pb-1 pt-3">
                  <h3 className="font-display text-sm font-bold">{product.name}</h3>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <strong className="text-xs">{product.price}</strong>
                    <button
                      type="button"
                      onClick={() => setCartCount((count) => count + 1)}
                      className="flex h-8 items-center gap-1 rounded-full gws-accent-bg px-3 text-[10px] font-semibold"
                    >
                      <Plus className="h-3 w-3" /> Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4">
            <div>
              <div className="text-xs font-semibold">Panier de démonstration</div>
              <div className="mt-1 text-[10px] text-muted-foreground">
                Ajoutez un article pour tester l'interaction.
              </div>
            </div>
            <div className="flex items-center gap-2">
              {cartCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCartCount((count) => Math.max(0, count - 1))}
                  className="grid h-8 w-8 place-items-center rounded-full border border-border"
                >
                  <Minus className="h-3 w-3" />
                </button>
              )}
              <Link
                to="/boutique"
                className="rounded-full gws-accent-bg px-4 py-2 text-[10px] font-semibold"
              >
                Ouvrir la boutique ({cartCount})
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="px-5 py-14 text-center md:px-10 md:py-20">
        <div className="mx-auto max-w-xl">
          <div className="flex justify-center gap-1 gws-accent-text">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <blockquote className="mt-4 font-display text-2xl font-bold leading-tight">
            « Une expérience claire, rapide et vraiment agréable sur mobile. »
          </blockquote>
          <p className="mt-3 text-xs text-muted-foreground">
            Avis client · Exemple de présentation
          </p>
        </div>
      </section>

      <footer className="border-t border-border bg-card px-5 py-8 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <div className="font-display font-bold">{profile.brand}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {profile.location} · Site de démonstration
            </div>
          </div>
          <div className="flex gap-2">
            <button
              aria-label="Contacter par message"
              className="grid h-9 w-9 place-items-center rounded-full border border-border"
            >
              <MessageCircle className="h-4 w-4" />
            </button>
            <button className="rounded-full gws-accent-bg px-4 text-[10px] font-semibold">
              Nous contacter
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] gws-accent-text">
        {eyebrow}
      </div>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
