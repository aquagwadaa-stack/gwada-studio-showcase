import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import QRCode from "qrcode";
import JSZip from "jszip";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import { supabase } from "@/integrations/supabase/client";
import {
  isValidHttpUrl,
  shortUrlFor,
  statusLabel,
  statusOf,
  type NfcCard,
} from "@/lib/nfc";

export const Route = createFileRoute("/admin/nfc")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin cartes NFC — Gwada Web Studio" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Gestion interne des cartes NFC / QR Gwada Web Studio." },
    ],
  }),
  component: AdminNfcPage,
});

const QR_OPTS = { margin: 4, color: { dark: "#000000", light: "#FFFFFF" } } as const;

async function qrPngDataUrl(text: string, width = 1024) {
  return QRCode.toDataURL(text, { ...QR_OPTS, width, errorCorrectionLevel: "M" });
}
async function qrSvg(text: string) {
  return QRCode.toString(text, { ...QR_OPTS, type: "svg", errorCorrectionLevel: "M" });
}
function download(filename: string, href: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/* ---------------------------------- Auth ---------------------------------- */

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
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
        <h1 className="text-2xl font-black">Admin cartes NFC</h1>
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

/* ---------------------------------- Page ---------------------------------- */

function AdminNfcPage() {
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

  if (!ready) {
    return <div className="min-h-svh bg-[#0d1715]" />;
  }
  if (!session) return <LoginScreen />;
  return <AdminDashboard />;
}

function AdminDashboard() {
  const [cards, setCards] = useState<NfcCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"list" | "qrs" | "guide">("list");

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("nfc_cards")
      .select("id, code, merchant_name, target_url, active, notes")
      .order("code");
    if (error) toast.error(error.message);
    setCards((data as NfcCard[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        (c.merchant_name ?? "").toLowerCase().includes(q) ||
        (c.target_url ?? "").toLowerCase().includes(q),
    );
  }, [cards, query]);

  const current = cards.find((c) => c.id === selected) ?? null;

  const counts = useMemo(() => {
    const c = { libre: 0, configuree: 0, desactivee: 0 };
    cards.forEach((card) => (c[statusOf(card)] += 1));
    return c;
  }, [cards]);

  return (
    <div className="min-h-svh bg-[#0d1715] pb-24 text-[#f7f7ef]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d1715]/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#54d7c8]">
              Gwada Web Studio
            </div>
            <h1 className="text-lg font-black">Cartes NFC / QR</h1>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold"
          >
            Déconnexion
          </button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px] font-bold">
          <div className="rounded-lg bg-white/5 py-2">
            Libres<div className="text-base font-black">{counts.libre}</div>
          </div>
          <div className="rounded-lg bg-[#54d7c8]/15 py-2 text-[#54d7c8]">
            Configurées<div className="text-base font-black">{counts.configuree}</div>
          </div>
          <div className="rounded-lg bg-amber-400/15 py-2 text-amber-300">
            Désactivées<div className="text-base font-black">{counts.desactivee}</div>
          </div>
        </div>
        <nav className="mt-3 grid grid-cols-3 gap-2 text-xs font-bold">
          {(
            [
              ["list", "Cartes"],
              ["qrs", "Tous les QR"],
              ["guide", "Guide"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              onClick={() => {
                setView(k);
                setSelected(null);
              }}
              className={`rounded-full py-2 ${
                view === k ? "bg-[#54d7c8] text-[#0d1715]" : "bg-white/10 text-white/70"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      {view === "guide" && <Guide />}
      {view === "qrs" && <AllQrs cards={cards} />}
      {view === "list" && (
        <div className="px-4 pt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un code ou un commerce…"
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-[#54d7c8]"
          />
          {loading ? (
            <p className="mt-6 text-sm text-white/50">Chargement…</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {filtered.map((card) => {
                const s = statusOf(card);
                return (
                  <li key={card.id}>
                    <button
                      onClick={() => setSelected(card.id)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 text-left ring-1 ring-white/10 active:bg-white/10"
                    >
                      <div className="min-w-0">
                        <div className="font-black">{card.code}</div>
                        <div className="truncate text-xs text-white/50">
                          {card.merchant_name || "Aucun commerce"}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          s === "configuree"
                            ? "bg-[#54d7c8]/20 text-[#54d7c8]"
                            : s === "desactivee"
                              ? "bg-amber-400/20 text-amber-300"
                              : "bg-white/10 text-white/60"
                        }`}
                      >
                        {statusLabel[s]}
                      </span>
                    </button>
                  </li>
                );
              })}
              {filtered.length === 0 && (
                <li className="py-6 text-center text-sm text-white/50">Aucune carte trouvée.</li>
              )}
            </ul>
          )}
        </div>
      )}

      {current && (
        <CardSheet
          card={current}
          onClose={() => setSelected(null)}
          onSaved={(updated) => {
            setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
          }}
        />
      )}
      <Toaster />
    </div>
  );
}

/* -------------------------------- Card sheet ------------------------------- */

function CardSheet({
  card,
  onClose,
  onSaved,
}: {
  card: NfcCard;
  onClose: () => void;
  onSaved: (c: NfcCard) => void;
}) {
  const [merchant, setMerchant] = useState(card.merchant_name ?? "");
  const [target, setTarget] = useState(card.target_url ?? "");
  const [notes, setNotes] = useState(card.notes ?? "");
  const [busy, setBusy] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const short = shortUrlFor(card.code);

  useEffect(() => {
    setMerchant(card.merchant_name ?? "");
    setTarget(card.target_url ?? "");
    setNotes(card.notes ?? "");
  }, [card]);

  const update = async (patch: Partial<NfcCard>, msg: string) => {
    setBusy(true);
    const { data, error } = await supabase
      .from("nfc_cards")
      .update(patch)
      .eq("id", card.id)
      .select("id, code, merchant_name, target_url, active, notes")
      .single();
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    onSaved(data as NfcCard);
    toast.success(msg);
  };

  const save = async () => {
    const url = target.trim();
    if (url && !isValidHttpUrl(url)) {
      toast.error("Le lien doit commencer par http:// ou https://");
      return;
    }
    await update(
      {
        merchant_name: merchant.trim() || null,
        target_url: url || null,
        notes: notes.trim() || null,
        active: url ? card.active : false,
      },
      "Carte enregistrée",
    );
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(short);
      toast.success("URL courte copiée");
    } catch {
      toast.error("Copie impossible");
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex flex-col bg-[#0d1715]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div>
          <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#54d7c8]">
            Carte
          </div>
          <h2 className="text-xl font-black">{card.code}</h2>
        </div>
        <button onClick={onClose} className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold">
          Fermer
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 pb-28">
        <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
          <div className="text-[11px] uppercase tracking-wide text-white/40">URL courte fixe</div>
          <div className="mt-1 break-all font-mono text-sm">{short}</div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
            <button onClick={copy} className="rounded-lg bg-white/10 py-2">
              Copier l’URL
            </button>
            <a
              href={short}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-white/10 py-2 text-center"
            >
              Tester la redirection
            </a>
          </div>
        </div>

        <Field label="Nom du commerce">
          <input
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            placeholder="Ex. Boulangerie du Bourg"
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-[#54d7c8]"
          />
        </Field>

        <PlaceSearch
          initialQuery={merchant}
          onPick={(name, uri) => {
            setMerchant(name);
            setTarget(uri);
            toast.success("Lien d’avis récupéré");
          }}
        />

        <Field label="Lien Google Reviews (destination)">
          <input
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            inputMode="url"
            autoCapitalize="none"
            placeholder="https://g.page/r/..."
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-[#54d7c8]"
          />
          {isValidHttpUrl(target.trim()) && (
            <a
              href={target.trim()}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block rounded-lg bg-white/10 px-3 py-2 text-xs font-bold"
            >
              Ouvrir le lien d’avis
            </a>
          )}
        </Field>

        <Field label="Notes internes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full rounded-xl bg-white/5 px-4 py-3 text-base outline-none ring-1 ring-white/10 focus:ring-[#54d7c8]"
          />
        </Field>

        <div className="grid gap-2">
          <button
            disabled={busy}
            onClick={save}
            className="rounded-xl bg-[#54d7c8] py-3 font-black text-[#0d1715] disabled:opacity-60"
          >
            Enregistrer
          </button>
          <button
            disabled={busy || !card.target_url}
            onClick={() =>
              update({ active: !card.active }, card.active ? "Carte désactivée" : "Carte activée")
            }
            className="rounded-xl bg-white/10 py-3 font-bold disabled:opacity-40"
          >
            {card.active ? "Désactiver la carte" : "Activer la carte"}
          </button>

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="rounded-xl bg-red-500/15 py-3 font-bold text-red-300"
            >
              Remettre à zéro
            </button>
          ) : (
            <div className="rounded-xl bg-red-500/10 p-3 text-sm ring-1 ring-red-500/30">
              <p className="font-bold text-red-200">Effacer commerce, lien et notes ?</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="rounded-lg bg-white/10 py-2"
                >
                  Annuler
                </button>
                <button
                  onClick={async () => {
                    await update(
                      { merchant_name: null, target_url: null, notes: null, active: false },
                      "Carte remise à zéro",
                    );
                    setConfirmReset(false);
                  }}
                  className="rounded-lg bg-red-500 py-2 text-white"
                >
                  Confirmer
                </button>
              </div>
            </div>
          )}
        </div>

        <QrBlock code={card.code} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-white/40">
        {label}
      </span>
      {children}
    </label>
  );
}

/* ----------------------------------- QR ----------------------------------- */

function QrBlock({ code }: { code: string }) {
  const [png, setPng] = useState<string | null>(null);
  const short = shortUrlFor(code);

  useEffect(() => {
    let alive = true;
    qrPngDataUrl(short, 512).then((d) => alive && setPng(d));
    return () => {
      alive = false;
    };
  }, [short]);

  return (
    <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="text-[11px] uppercase tracking-wide text-white/40">QR code de la carte</div>
      <div className="mt-3 flex justify-center">
        {png ? (
          <img src={png} alt={`QR code ${code}`} className="h-44 w-44 rounded-lg bg-white" />
        ) : (
          <div className="h-44 w-44 rounded-lg bg-white/10" />
        )}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold">
        <button
          onClick={async () => download(`${code}.png`, await qrPngDataUrl(short, 2048))}
          className="rounded-lg bg-white/10 py-2"
        >
          Télécharger PNG
        </button>
        <button
          onClick={async () => {
            const svg = await qrSvg(short);
            download(`${code}.svg`, URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })));
          }}
          className="rounded-lg bg-white/10 py-2"
        >
          Télécharger SVG
        </button>
      </div>
    </div>
  );
}

function AllQrs({ cards }: { cards: NfcCard[] }) {
  const [busy, setBusy] = useState(false);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    (async () => {
      const entries = await Promise.all(
        cards.map(async (c) => [c.code, await qrPngDataUrl(shortUrlFor(c.code), 256)] as const),
      );
      if (alive) setPreviews(Object.fromEntries(entries));
    })();
    return () => {
      alive = false;
    };
  }, [cards]);

  const exportZip = async () => {
    setBusy(true);
    try {
      const zip = new JSZip();
      for (const c of cards) {
        const url = shortUrlFor(c.code);
        const dataUrl = await qrPngDataUrl(url, 2048);
        zip.file(`${c.code}.png`, dataUrl.split(",")[1]!, { base64: true });
        zip.file(`${c.code}.svg`, await qrSvg(url));
      }
      zip.file(
        "urls.txt",
        cards.map((c) => `${c.code} -> ${shortUrlFor(c.code)}`).join("\n"),
      );
      const blob = await zip.generateAsync({ type: "blob" });
      download("gwada-qr-codes.zip", URL.createObjectURL(blob));
      toast.success("Export ZIP prêt");
    } catch {
      toast.error("Export impossible");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="px-4 pt-4">
      <button
        disabled={busy}
        onClick={exportZip}
        className="w-full rounded-xl bg-[#54d7c8] py-3 font-black text-[#0d1715] disabled:opacity-60"
      >
        {busy ? "Génération…" : `Télécharger les ${cards.length} QR (ZIP PNG + SVG)`}
      </button>
      <p className="mt-2 text-xs text-white/40">
        Fichiers nommés GW001.png, GW001.svg, etc. Noir sur blanc, quiet zone conforme impression.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.id} className="rounded-xl bg-white/5 p-3 text-center ring-1 ring-white/10">
            {previews[c.code] ? (
              <img
                src={previews[c.code]}
                alt={`QR ${c.code}`}
                className="mx-auto w-full rounded bg-white"
              />
            ) : (
              <div className="aspect-square w-full rounded bg-white/10" />
            )}
            <div className="mt-2 text-xs font-black">{c.code}</div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] font-bold">
              <button
                onClick={async () =>
                  download(`${c.code}.png`, await qrPngDataUrl(shortUrlFor(c.code), 2048))
                }
                className="rounded bg-white/10 py-1.5"
              >
                PNG
              </button>
              <button
                onClick={async () => {
                  const svg = await qrSvg(shortUrlFor(c.code));
                  download(
                    `${c.code}.svg`,
                    URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" })),
                  );
                }}
                className="rounded bg-white/10 py-1.5"
              >
                SVG
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- Guide --------------------------------- */

function Guide() {
  const steps = [
    "Prendre une carte au statut « Libre » dans la liste.",
    "Récupérer le lien Google Reviews du commerçant (fiche Google → Demander des avis).",
    "Coller le lien dans la carte, saisir le nom du commerce, puis Enregistrer.",
    "Activer la carte : la redirection est immédiate.",
    "Programmer la puce NFC avec l’URL courte de la carte (jamais le lien Google).",
    "Tester le NFC et scanner le QR imprimé.",
    "Remettre la carte au commerçant.",
  ];
  return (
    <div className="px-4 pt-4">
      <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
        <h2 className="text-base font-black">Workflow terrain</h2>
        <ol className="mt-3 space-y-3 text-sm text-white/70">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#54d7c8] text-xs font-black text-[#0d1715]">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 rounded-lg bg-[#54d7c8]/10 p-3 text-xs text-[#54d7c8]">
          L’URL courte ne change jamais. Vous pouvez modifier la destination d’une carte à tout
          moment sans réimprimer le QR ni reprogrammer le NFC.
        </p>
      </div>
    </div>
  );
}
