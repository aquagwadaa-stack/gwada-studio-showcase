import { createFileRoute } from "@tanstack/react-router";
import { DemoBanner } from "@/components/showroom/DemoBanner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  Compass,
  Sparkles,
  Crown,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Démo Réservation — Gwada Web Studio" },
      { name: "description", content: "Démonstration d'un système de réservation en ligne." },
    ],
  }),
  component: ReservationPage,
});

const SERVICES = [
  { id: "s1", icon: Compass, name: "Rendez-vous découverte", duration: "30 min", price: "Gratuit" },
  { id: "s2", icon: Sparkles, name: "Prestation personnalisée", duration: "45 min", price: "55 €" },
  { id: "s3", icon: Crown, name: "Expérience signature", duration: "1h15", price: "90 €" },
];
const PROS = [
  { id: "p1", name: "Camille", role: "Spécialiste" },
  { id: "p2", name: "Alex", role: "Conseiller" },
  { id: "p3", name: "Sans préférence", role: "Premier disponible" },
];
const SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "14:00",
  "14:30",
  "15:00",
  "16:00",
  "16:30",
  "17:00",
];

function ReservationPage() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [pro, setPro] = useState<string | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const steps = ["Prestation", "Intervenant", "Date", "Créneau", "Vos informations"];
  const canNext =
    (step === 0 && service) ||
    (step === 1 && pro) ||
    (step === 2 && day !== null) ||
    (step === 3 && slot) ||
    (step === 4 && form.name && form.email && form.phone);

  const confirmed = step === 5;
  const progress = confirmed ? 100 : ((step + 1) / steps.length) * 100;

  return (
    <div>
      <DemoBanner note="Démonstration : aucune réservation réelle ne sera envoyée." />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight">
          Prendre rendez-vous
        </h1>
        <p className="mt-2 text-muted-foreground">
          {confirmed
            ? "Votre rendez-vous est confirmé."
            : `Étape ${step + 1} sur ${steps.length} — ${steps[step]}`}
        </p>
        <Progress value={progress} className="mt-4 h-1.5" />

        <Card className="mt-8 p-5 sm:p-8 gws-themed">
          {step === 0 && (
            <StepGrid>
              {SERVICES.map((s) => (
                <Selectable key={s.id} active={service === s.id} onClick={() => setService(s.id)}>
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg gws-accent-bg grid place-items-center">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {s.duration} · {s.price}
                      </div>
                    </div>
                  </div>
                </Selectable>
              ))}
            </StepGrid>
          )}

          {step === 1 && (
            <StepGrid>
              {PROS.map((p) => (
                <Selectable key={p.id} active={pro === p.id} onClick={() => setPro(p.id)}>
                  <div className="font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.role}</div>
                </Selectable>
              ))}
            </StepGrid>
          )}

          {step === 2 && <CalendarGrid value={day} onChange={setDay} />}

          {step === 3 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSlot(s)}
                  className={`px-3 py-3 rounded-lg border text-sm font-medium transition ${
                    slot === s
                      ? "gws-accent-bg gws-accent-border"
                      : "border-border hover:gws-accent-border"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <div>
                <Label htmlFor="rn">Nom complet</Label>
                <Input
                  id="rn"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="re">E-mail</Label>
                <Input
                  id="re"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rp">Téléphone</Label>
                <Input
                  id="rp"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          )}

          {confirmed && (
            <div className="text-center py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="h-16 w-16 rounded-full gws-accent-bg grid place-items-center mx-auto mb-4">
                <CalendarCheck className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-display font-bold">Rendez-vous confirmé !</h2>
              <p className="mt-2 text-muted-foreground">
                {SERVICES.find((s) => s.id === service)?.name} ·{" "}
                {PROS.find((p) => p.id === pro)?.name}
              </p>
              <p className="text-muted-foreground">
                Le {day} {currentMonthLabel()} à {slot}
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Dans un projet réel, une confirmation serait envoyée à <strong>{form.email}</strong>
                .
              </p>
              <Button
                onClick={() => {
                  setStep(0);
                  setService(null);
                  setPro(null);
                  setDay(null);
                  setSlot(null);
                  setForm({ name: "", email: "", phone: "" });
                }}
                variant="outline"
                className="mt-6"
              >
                Nouvelle réservation
              </Button>
            </div>
          )}

          {!confirmed && (
            <div className="mt-7 flex justify-between gap-3">
              <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour
              </Button>
              <Button
                disabled={!canNext}
                className="gws-accent-bg hover:opacity-90"
                onClick={() => {
                  if (step === 4) {
                    toast.success("Démo : votre demande a été enregistrée.");
                    setStep(5);
                  } else setStep((s) => s + 1);
                }}
              >
                {step === 4 ? "Confirmer" : "Suivant"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}

function StepGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-3">{children}</div>;
}

function Selectable({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-left rounded-xl border p-4 transition relative ${
        active
          ? "gws-accent-border ring-2 ring-[var(--gws-accent)]/30 bg-[var(--gws-accent)]/5"
          : "border-border hover:border-foreground/30"
      }`}
    >
      {active && <Check className="absolute top-3 right-3 h-4 w-4 gws-accent-text" />}
      {children}
    </button>
  );
}

function CalendarGrid({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (d: number) => void;
}) {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = (new Date(year, month - 1, 1).getDay() + 6) % 7; // monday-first
  const days: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="text-center font-medium mb-4">
        {currentMonthLabel()} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs text-muted-foreground text-center mb-2">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (!d) return <div key={i} />;
          const isPast = d < today.getDate();
          const isSelected = value === d;
          return (
            <button
              key={i}
              disabled={isPast}
              onClick={() => onChange(d)}
              className={`aspect-square rounded-md text-sm font-medium transition ${
                isPast
                  ? "text-muted-foreground/40 cursor-not-allowed"
                  : isSelected
                    ? "gws-accent-bg"
                    : "hover:bg-muted"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function currentMonthLabel() {
  return new Date().toLocaleDateString("fr-FR", { month: "long" });
}
