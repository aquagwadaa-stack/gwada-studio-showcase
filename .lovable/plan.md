# Showroom Gwada Web Studio

Une seule expérience cohérente : un **configurateur global** (type de site, style visuel, couleur d'accent) pilote l'ensemble du showroom et les 4 démonstrations. transitions élégantes, contenu 100% français.

## Architecture

```
src/
  routes/
    __root.tsx              → shell + nav + ShowroomProvider + bouton flottant "Configurateur"
    index.tsx               → Accueil (hero, types, personnalisation, fonctionnalités, CTA)
    vitrine.tsx             → Démo 1
    reservation.tsx         → Démo 2
    catalogue.tsx           → Démo 3
    catalogue.$id.tsx       → Fiche détaillée
    boutique.tsx            → Démo 4
    fonctionnalites.tsx     → Liste détaillée des fonctionnalités
    contact.tsx             → Formulaire + WhatsApp
  context/
    showroom-context.tsx    → { siteType, style, accentColor } + persistance localStorage
  components/
    showroom/
      Configurator.tsx      → Panneau (sheet sur mobile, sidebar sur desktop)
      ConfiguratorTrigger.tsx → Bouton flottant toujours visible
      StylePreview.tsx      → Applique data-style + --accent dynamiquement
      DemoFrame.tsx         → Wrapper démo avec bandeau "Démonstration"
    site/
      Nav.tsx, Footer.tsx, Hero.tsx, FeatureGrid.tsx, TypeCards.tsx,
      StyleSwitcher.tsx, AccentPicker.tsx, AnimatedPreviewStack.tsx
    demos/
      vitrine/*, reservation/* (steps), catalogue/* (grid, filters, fiche),
      boutique/* (grid, cart, checkout)
  styles.css                → tokens des 3 styles via data-attributes + accent dynamique
```

## Configurateur global (cœur de l'expérience)

- **Provider React** stocke `{ siteType, style, accentColor }`, persistance localStorage, propagé à toute l'app.
- Applique `data-style="minimal|dynamic|premium"` sur `<html>` et une CSS var `--accent` injectée inline.
- **Mobile** : bouton flottant en bas à droite → ouvre un `Sheet` ancré en bas (Drawer shadcn).
- **Desktop** : même bouton → ouvre un panneau latéral.
- Toujours visible sur toutes les pages, y compris démos (bouton "retour configurateur").
- Le type de site sélectionné met en avant la démo correspondante et ajuste les CTA.

## Système de styles (3 thèmes interchangeables)

Dans `src/styles.css`, 3 jeux de tokens via attribute selector :

```css
[data-style="minimal"] { --bg: ...; --fg: ...; --radius: 0.5rem; --font-display: "Inter"; }
[data-style="dynamic"] { --bg: ...; --fg: ...; --radius: 1.25rem; --font-display: "Sora"; }
[data-style="premium"] { --bg: oklch(0.12 0 0); --fg: oklch(0.96 0.02 80); --radius: 0.25rem; --font-display: "Cormorant Garamond"; }
--accent: <injecté dynamiquement>;
```

Fonts chargées via `<link>` dans `__root.tsx`. Transitions CSS sur `background`, `color`, `border-radius` pour basculement fluide.

**Sélecteur de couleur d'accent** : 6 presets (turquoise, bleu, violet, corail, doré, vert tropical) + un input color custom.

## Page d'accueil

1. **Hero** — titre « Imaginez votre entreprise en ligne. », sous-titre, 2 CTA, stack animée de 3 mini-aperçus (cartes mockups) qui changent de style en boucle.
2. **« Quel site correspond à votre besoin ? »** — 4 cartes (Vitrine, Réservation, Catalogue, Boutique) cliquables → sélectionnent le type dans le configurateur + naviguent vers la démo.
3. **Personnalisation** — démo en direct du switch de style sur un même bloc UI (un mockup, 3 styles côte à côte sur desktop, carousel sur mobile).
4. **Fonctionnalités** — grid d'icônes Lucide pour les 14 fonctionnalités listées.
5. **CTA final** — « Votre entreprise mérite un site qui lui ressemble. » + 2 boutons.

## Démo 1 — Vitrine

Sections : hero, à propos, services (3 cartes), galerie (grid d'images), avis (carousel), horaires + carte (placeholder Leaflet-style statique), formulaire, bouton WhatsApp flottant, CTA. Contenu générique « Votre entreprise ».

## Démo 2 — Réservation

Wizard 5 étapes avec état local + Progress :

1. Prestation (3 cartes) 2. Professionnel/option 3. Calendrier (grille du mois) 4. Créneau 5. Coordonnées → écran de confirmation animé.

Bandeau permanent : « Démonstration : aucune réservation réelle ne sera envoyée. »

## Démo 3 — Catalogue

- Liste : recherche, catégories (chips), filtres (Sheet sur mobile), tri, grid de cartes avec badges.
- Données fictives neutres (12 articles : « Article A », caractéristiques génériques, prix ou « Sur demande »).
- Route détaillée `/catalogue/$id` : galerie, specs, CTA infos, WhatsApp, produits similaires.

## Démo 4 — Boutique

- Catégories, recherche, grid produits, variantes (select), badges promo/stock.
- **Panier** (state global via context dédié) en Sheet : quantités, suppression, total.
- Tunnel : livraison/retrait → simulation paiement (form CB factice) → confirmation.
- Bandeau permanent : « Démonstration : aucune commande ni paiement réel. »

## Navigation

- Desktop : nav horizontale (Accueil, Vitrine, Réservation, Catalogue, Boutique, Fonctionnalités, Contact) + bouton « Créer mon site ».
- Mobile : burger → Sheet plein écran élégant + bouton « Créer mon site » en pied.
- Bouton configurateur flottant distinct du burger.

## Contact

Formulaire (nom, entreprise, téléphone, e-mail, type de site (select pré-rempli depuis le configurateur), message), bouton envoi (toast succès, pas de backend), bouton WhatsApp. Coordonnées fictives centralisées dans `src/lib/contact-info.ts` avec commentaires `// REMPLACER`.

## Détails techniques

- Stack : TanStack Start + Tailwind v4 + shadcn (Sheet, Drawer, Dialog, Tabs, Carousel, Form, Sonner).
- Icônes Lucide uniquement.
- Images : Unsplash via URLs neutres (intérieurs, paysages, produits abstraits) ou `imagegen` pour 4-6 hero mockups stylisés.
- Animations : `tw-animate-css` + transitions CSS (pas de lib lourde). Variantes plus marquées pour le style « dynamique », plus lentes pour « premium ».
- Persistance du choix (type/style/couleur) via localStorage, restauré côté client après hydratation.
- Meta `head()` distinct par route (FR).
- Accessibilité : focus visible, aria-labels sur boutons icônes, contrastes vérifiés sur les 3 styles.

## Ce que je ne ferai pas (sauf demande)

- Pas de vrai backend, pas d'auth, pas de paiement réel.
- Pas de Lovable Cloud (rien à persister côté serveur).
- Pas de carte interactive (mapbox/leaflet) — illustration statique stylisée pour rester léger.

Prêt à construire dès validation.