import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, MessageCircle, Send, Target, WandSparkles } from "lucide-react";
import { whatsappUrl } from "@/lib/contact-info";
import { useState } from "react";
import { useShowroom, SITE_TYPES, type SiteType } from "@/context/showroom-context";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gwada Web Studio" },
      { name: "description", content: "Discutons de votre projet de site web." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { modules } = useShowroom();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    modules,
    message: "",
  });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest gws-accent-text font-semibold mb-3">
          Contact
        </div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
          Parlons de votre projet.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Décrivez-moi votre activité et vos besoins. Je vous répondrai avec une première
          orientation claire, sans jargon inutile.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 sm:p-8 gws-themed">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Message envoyé. À très vite !");
                setForm({ ...form, message: "" });
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Nom *" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Entreprise" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Téléphone *" type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <Field label="E-mail *" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              </div>
              <div>
                <Label className="mb-2 block">Fonctionnalités envisagées</Label>
                <div className="grid grid-cols-2 gap-2">
                  {SITE_TYPES.map((item) => {
                    const active = form.modules.includes(item.key);
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            modules: active
                              ? form.modules.filter((module) => module !== item.key)
                              : [...form.modules, item.key as SiteType],
                          })
                        }
                        className={`rounded-xl border p-3 text-left text-sm transition ${
                          active
                            ? "gws-accent-border bg-[var(--gws-accent)]/5"
                            : "border-border hover:border-foreground/30"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2 font-medium">
                          {item.label}
                          {active && <Check className="h-4 w-4 gws-accent-text" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label htmlFor="msg" className="mb-1.5 block">Votre projet *</Label>
                <Textarea
                  id="msg"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Votre activité, ce que vous souhaitez améliorer et les résultats attendus..."
                />
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" className="gws-accent-bg hover:opacity-90">
                  <Send className="mr-2 h-4 w-4" /> Envoyer le message
                </Button>
                <Button type="button" variant="outline" asChild>
                  <a href={whatsappUrl("Bonjour, je souhaite discuter d'un projet de site.")}>
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 gws-themed">
            <Target className="h-5 w-5 gws-accent-text" />
            <h3 className="font-display text-lg font-semibold mt-4">Un premier échange utile</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Nous parlerons de vos clients, de vos objectifs et des actions que le site devra faciliter.
            </p>
          </Card>
          <Card className="p-6 gws-themed">
            <WandSparkles className="h-5 w-5 gws-accent-text" />
            <h3 className="font-display text-lg font-semibold mt-4">Une proposition adaptée</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Vous saurez quelles fonctionnalités privilégier, quelle approche visuelle choisir et comment avancer.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", required, value, onChange }: {
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label className="mb-1.5 block">{label}</Label>
      <Input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
