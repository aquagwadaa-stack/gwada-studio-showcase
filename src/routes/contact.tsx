import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { contactInfo, whatsappUrl } from "@/lib/contact-info";
import { useState } from "react";
import { useShowroom, SITE_TYPES } from "@/context/showroom-context";
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
  const { siteType } = useShowroom();
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    type: siteType,
    message: "",
  });

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-widest gws-accent-text font-semibold mb-3">Contact</div>
        <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">
          Parlons de votre projet.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Décrivez votre activité et vos besoins. On revient vers vous rapidement avec une proposition adaptée.
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
                <Label className="mb-1.5 block">Type de site recherché</Label>
                <Select value={form.type} onValueChange={(v: any) => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SITE_TYPES.map((s) => (
                      <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="msg" className="mb-1.5 block">Votre projet *</Label>
                <Textarea
                  id="msg"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Décrivez votre activité, vos objectifs, vos références..."
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
            <h3 className="font-display text-lg font-semibold mb-4">Coordonnées</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 gws-accent-text" />
                <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 gws-accent-text" />
                <a href={`tel:${contactInfo.phone}`} className="hover:underline">{contactInfo.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 gws-accent-text" />
                <span>{contactInfo.address}</span>
              </li>
            </ul>
          </Card>
          <Card className="p-6 gws-themed">
            <h3 className="font-display text-lg font-semibold mb-3">Horaires</h3>
            <ul className="space-y-2 text-sm">
              {contactInfo.hours.map((h) => (
                <li key={h.day} className="flex justify-between">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-medium">{h.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  required,
  value,
  onChange,
}: {
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
