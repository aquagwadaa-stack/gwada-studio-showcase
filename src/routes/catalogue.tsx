import { createFileRoute, Link } from "@tanstack/react-router";
import { DemoBanner } from "@/components/showroom/DemoBanner";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { CATALOGUE, CATEGORIES } from "@/components/demos/catalogue/data";

export const Route = createFileRoute("/catalogue")({
  head: () => ({
    meta: [
      { title: "Démo Catalogue — Gwada Web Studio" },
      { name: "description", content: "Démonstration d'un catalogue interactif." },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Tous");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let list = CATALOGUE.filter(
      (x) =>
        (cat === "Tous" || x.category === cat) &&
        (query === "" || x.title.toLowerCase().includes(query.toLowerCase())),
    );
    const priceValue = (price: string) => {
      const value = Number(price.replace(/\D/g, ""));
      return value || null;
    };
    if (sort === "asc")
      list = [...list].sort((a, b) => {
        const aPrice = priceValue(a.price);
        const bPrice = priceValue(b.price);
        if (aPrice === null) return 1;
        if (bPrice === null) return -1;
        return aPrice - bPrice;
      });
    if (sort === "desc")
      list = [...list].sort((a, b) => {
        const aPrice = priceValue(a.price);
        const bPrice = priceValue(b.price);
        if (aPrice === null) return 1;
        if (bPrice === null) return -1;
        return bPrice - aPrice;
      });
    return list;
  }, [query, cat, sort]);

  return (
    <div>
      <DemoBanner note="Catalogue : recherche, filtres, fiche détaillée." />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
          Notre catalogue
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} exemples pour montrer différents usages d'un catalogue.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher dans le catalogue..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue placeholder="Tri" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Pertinence</SelectItem>
              <SelectItem value="asc">Prix croissant</SelectItem>
              <SelectItem value="desc">Prix décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {CATEGORIES.map((c) => (
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
          {filtered.map((item) => (
            <Link key={item.id} to="/catalogue/$id" params={{ id: item.id }} className="group">
              <Card className="overflow-hidden hover:-translate-y-1 hover:gws-accent-border transition gws-themed p-0">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Thumb seed={item.seed} />
                  {item.badge && (
                    <span className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold bg-background/95 backdrop-blur">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-muted-foreground">{item.category}</div>
                  <h3 className="font-display font-semibold mt-1 truncate">{item.title}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold gws-accent-text">{item.price}</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center text-muted-foreground">
            Aucun élément ne correspond à votre recherche.
          </div>
        )}
      </section>
    </div>
  );
}

export function Thumb({ seed }: { seed: number }) {
  const h1 = (seed * 47) % 360;
  const h2 = (h1 + 60) % 360;
  return (
    <div
      className="w-full h-full"
      style={{
        background: `linear-gradient(135deg, hsl(${h1} 70% 65%), hsl(${h2} 65% 55%))`,
      }}
    />
  );
}
