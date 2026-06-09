import { createFileRoute } from "@tanstack/react-router";
import { DemoBanner } from "@/components/showroom/DemoBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingBag, Minus, Plus, Trash2, Search, CheckCircle2, Truck, Store } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Démo Boutique — Gwada Web Studio" },
      { name: "description", content: "Démonstration d'une boutique en ligne complète." },
    ],
  }),
  component: BoutiquePage,
});

type Product = {
  id: string;
  name: string;
  cat: string;
  price: number;
  oldPrice?: number;
  stock: number;
  variants: string[];
  seed: number;
};

const CATS = ["Tous", "Nouveautés", "Tendances", "Promotions", "Essentiels"];
const PRODUCT_NAMES = [
  "Chemise Rivage",
  "Sac Mangrove",
  "Bougie Sable chaud",
  "Gourde Horizon",
  "Carnet Alizé",
  "T-shirt Gwada",
  "Coffret Découverte",
  "Casquette Azur",
  "Tote bag Marché",
  "Édition Signature",
];
const PRODUCTS: Product[] = PRODUCT_NAMES.map((name, i) => ({
  id: `p${i + 1}`,
  name,
  cat: CATS[(i % (CATS.length - 1)) + 1],
  price: 19 + ((i * 13) % 100),
  oldPrice: i % 3 === 0 ? 29 + ((i * 13) % 100) : undefined,
  stock: i % 7 === 0 ? 0 : 5 + (i % 8),
  variants: ["Sable", "Corail", "Océan"],
  seed: i,
}));

type CartItem = { product: Product; variant: string; qty: number };

function BoutiquePage() {
  const [cat, setCat] = useState("Tous");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState<"cart" | "delivery" | "payment" | "done">("cart");
  const [mode, setMode] = useState<"livraison" | "retrait">("livraison");

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (cat === "Tous" || p.cat === cat) &&
          (query === "" || p.name.toLowerCase().includes(query.toLowerCase())),
      ),
    [cat, query],
  );

  const total = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const count = cart.reduce((sum, c) => sum + c.qty, 0);

  const add = (p: Product, variant: string) => {
    if (p.stock === 0) {
      toast.error("Article en rupture de stock.");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === p.id && c.variant === variant);
      if (existing) return prev.map((c) => (c === existing ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { product: p, variant, qty: 1 }];
    });
    toast.success(`${p.name} ajouté au panier.`);
  };

  const updateQty = (i: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c, idx) => (idx === i ? { ...c, qty: Math.max(0, c.qty + delta) } : c))
        .filter((c) => c.qty > 0),
    );
  };

  const remove = (i: number) => setCart((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div>
      <DemoBanner note="Démonstration : aucune commande ni aucun paiement réel ne sera effectué." />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">Boutique</h1>
            <p className="mt-2 text-muted-foreground">
              Une expérience d'achat complète, prête à être personnalisée.
            </p>
          </div>
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button className="gws-accent-bg hover:opacity-90 relative">
                <ShoppingBag className="h-4 w-4 mr-2" /> Panier
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-foreground text-background text-xs grid place-items-center font-bold">
                    {count}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
              <SheetHeader className="p-6 border-b">
                <SheetTitle className="font-display text-2xl">
                  {checkout === "done"
                    ? "Commande confirmée"
                    : checkout === "payment"
                      ? "Paiement"
                      : checkout === "delivery"
                        ? "Livraison"
                        : "Votre panier"}
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6">
                {checkout === "cart" &&
                  (cart.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      Votre panier est vide.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map((c, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg border border-border">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <ProductThumb seed={c.product.seed} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{c.product.name}</div>
                            <div className="text-xs text-muted-foreground">{c.variant}</div>
                            <div className="text-sm font-semibold mt-1 gws-accent-text">
                              {c.product.price.toFixed(2)} €
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <button
                              onClick={() => remove(i)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateQty(i, -1)}
                                className="h-6 w-6 rounded border border-border grid place-items-center"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-medium">{c.qty}</span>
                              <button
                                onClick={() => updateQty(i, +1)}
                                className="h-6 w-6 rounded border border-border grid place-items-center"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                {checkout === "delivery" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setMode("livraison")}
                        className={`p-4 rounded-lg border text-left ${mode === "livraison" ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30" : "border-border"}`}
                      >
                        <Truck className="h-5 w-5 mb-2 gws-accent-text" />
                        <div className="font-medium">Livraison</div>
                        <div className="text-xs text-muted-foreground">à domicile</div>
                      </button>
                      <button
                        onClick={() => setMode("retrait")}
                        className={`p-4 rounded-lg border text-left ${mode === "retrait" ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30" : "border-border"}`}
                      >
                        <Store className="h-5 w-5 mb-2 gws-accent-text" />
                        <div className="font-medium">Retrait</div>
                        <div className="text-xs text-muted-foreground">en magasin</div>
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label>Nom</Label>
                        <Input placeholder="Votre nom" />
                      </div>
                      <div>
                        <Label>E-mail</Label>
                        <Input type="email" placeholder="vous@exemple.fr" />
                      </div>
                      {mode === "livraison" && (
                        <div>
                          <Label>Adresse</Label>
                          <Input placeholder="Adresse de livraison" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {checkout === "payment" && (
                  <div className="space-y-3">
                    <div>
                      <Label>Numéro de carte</Label>
                      <Input placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Expiration</Label>
                        <Input placeholder="MM/AA" />
                      </div>
                      <div>
                        <Label>CVC</Label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                    <div className="rounded-lg border border-border p-3 text-xs text-muted-foreground">
                      Paiement simulé — aucune transaction réelle n'est effectuée.
                    </div>
                  </div>
                )}

                {checkout === "done" && (
                  <div className="text-center py-8">
                    <div className="h-16 w-16 rounded-full gws-accent-bg grid place-items-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-display text-xl font-bold">Merci pour votre commande !</h3>
                    <p className="text-muted-foreground mt-2">
                      N° de commande : <strong>GWS-{Math.floor(Math.random() * 100000)}</strong>
                    </p>
                  </div>
                )}
              </div>

              {checkout !== "done" && cart.length > 0 && (
                <div className="border-t p-6 space-y-3 bg-card">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total</span>
                    <span className="text-2xl font-display font-bold gws-accent-text">
                      {total.toFixed(2)} €
                    </span>
                  </div>
                  <Button
                    className="w-full gws-accent-bg hover:opacity-90"
                    onClick={() => {
                      if (checkout === "cart") setCheckout("delivery");
                      else if (checkout === "delivery") setCheckout("payment");
                      else if (checkout === "payment") {
                        setCheckout("done");
                        toast.success("Commande confirmée (démonstration).");
                      }
                    }}
                  >
                    {checkout === "cart"
                      ? "Passer commande"
                      : checkout === "delivery"
                        ? "Vers le paiement"
                        : "Confirmer le paiement"}
                  </Button>
                </div>
              )}
              {checkout === "done" && (
                <div className="border-t p-6 bg-card">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setCart([]);
                      setCheckout("cart");
                      setCartOpen(false);
                    }}
                  >
                    Continuer mes achats
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            placeholder="Rechercher un produit..."
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition ${
                cat === c
                  ? "gws-accent-bg gws-accent-border"
                  : "border-border hover:gws-accent-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={add} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (p: Product, v: string) => void;
}) {
  const [variant, setVariant] = useState(product.variants[0]);
  const promo = product.oldPrice && product.oldPrice > product.price;
  const out = product.stock === 0;

  return (
    <Card className="overflow-hidden gws-themed p-0 group">
      <div className="aspect-[4/3] relative">
        <ProductThumb seed={product.seed} />
        {promo && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold bg-rose-500 text-white">
            Promo
          </span>
        )}
        {out && (
          <div className="absolute inset-0 bg-background/70 grid place-items-center text-sm font-medium">
            Rupture de stock
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-muted-foreground">{product.cat}</div>
        <h3 className="font-display font-semibold mt-1">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold gws-accent-text">{product.price.toFixed(2)} €</span>
          {promo && (
            <span className="text-xs line-through text-muted-foreground">
              {product.oldPrice!.toFixed(2)} €
            </span>
          )}
        </div>
        <select
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          className="mt-3 w-full text-sm border border-border rounded-md px-2 py-1.5 bg-background"
        >
          {product.variants.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        <Button
          size="sm"
          disabled={out}
          onClick={() => onAdd(product, variant)}
          className="mt-3 w-full gws-accent-bg hover:opacity-90"
        >
          Ajouter au panier
        </Button>
        <div className="mt-2 text-xs text-muted-foreground">
          {out ? "Indisponible" : `${product.stock} en stock`}
        </div>
      </div>
    </Card>
  );
}

function ProductThumb({ seed }: { seed: number }) {
  const images = [
    "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1602874801006-e26c8b14b8bf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1597484662317-9bd7bdda2907?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  ];
  return <img src={images[seed % images.length]} alt="" className="h-full w-full object-cover" />;
}
