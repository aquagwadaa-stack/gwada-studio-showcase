import { Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

function EcranConnexion({ titre }: { titre: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin/nfc` },
        });
        if (error) throw error;
        toast.success("Compte créé. Vérifiez votre boîte mail pour confirmer.");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Connexion impossible");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-svh place-items-center bg-[#0d1715] px-5 text-[#f7f7ef]">
      <form onSubmit={submit} className="w-full max-w-sm space-y-4">
        <div className="text-xs font-black uppercase tracking-[0.18em] text-[#54d7c8]">
          Gwada Web Studio
        </div>
        <h1 className="text-2xl font-black">{titre}</h1>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-[#54d7c8]"
        />
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-[#54d7c8]"
        />
        <button
          disabled={busy}
          className="w-full rounded-xl bg-[#54d7c8] py-3 font-black text-[#0d1715] disabled:opacity-60"
        >
          {busy ? "…" : mode === "in" ? "Se connecter" : "Créer le compte"}
        </button>
        <button
          type="button"
          onClick={() => setMode(mode === "in" ? "up" : "in")}
          className="w-full text-sm text-white/50 underline"
        >
          {mode === "in" ? "Première utilisation : créer le compte" : "J’ai déjà un compte"}
        </button>
      </form>
      <Toaster />
    </div>
  );
}

/** Affiche la page d'administration seulement une fois connecté. */
export function AdminAcces({ titre, children }: { titre: string; children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) return <div className="min-h-svh bg-[#0d1715]" />;
  if (!session) return <EcranConnexion titre={titre} />;
  return <>{children}</>;
}

const ongletActif = { className: "bg-[#54d7c8] text-[#0d1715]" };
const ongletInactif = { className: "bg-white/10 text-white/70" };

/** Passage d'une page d'administration à l'autre. */
export function AdminOnglets() {
  return (
    <nav
      aria-label="Espace administrateur"
      className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold"
    >
      <Link
        to="/admin/demandes"
        activeProps={ongletActif}
        inactiveProps={ongletInactif}
        className="rounded-full py-2 text-center"
      >
        Demandes
      </Link>
      <Link
        to="/admin/nfc"
        activeProps={ongletActif}
        inactiveProps={ongletInactif}
        className="rounded-full py-2 text-center"
      >
        Cartes NFC
      </Link>
    </nav>
  );
}
