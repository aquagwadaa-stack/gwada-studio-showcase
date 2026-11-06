import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Mail, Phone, RefreshCw, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { AdminAcces, AdminOnglets } from "@/components/site/AdminAcces";
import { WhatsAppIcon } from "@/components/site/WhatsApp";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/demandes")({
  staticData: { sitemap: false },
  ssr: false,
  head: () => ({
    meta: [
      { title: "Demandes reçues — Gwada Web Studio" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Demandes envoyées depuis le site." },
    ],
  }),
  component: AdminDemandesPage,
});

type Demande = {
  id: string;
  recue_le: string;
  formulaire: string;
  source: string | null;
  entreprise: string;
  telephone: string | null;
  email: string | null;
  details: Record<string, string>;
  traitee: boolean;
};

const dateHeure = new Intl.DateTimeFormat("fr-FR", {
  timeZone: "America/Guadeloupe",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

/** Déjà visible en haut de la fiche, ou sans intérêt. */
const champsMasques = new Set(["Commerce", "Entreprise / activité", "E-mail", "Source"]);

/** Numéro pour WhatsApp, avec l'indicatif qui correspond au début du portable. */
function numeroWhatsApp(telephone: string) {
  const chiffres = telephone.replace(/[^\d+]/g, "");
  if (chiffres.startsWith("+")) return chiffres.slice(1);
  if (chiffres.startsWith("00")) return chiffres.slice(2);
  if (!/^0[67]\d{8}$/.test(chiffres)) return null;
  const debut = chiffres.slice(0, 4);
  const indicatifs: Record<string, string> = {
    "0690": "590",
    "0691": "590",
    "0696": "596",
    "0697": "596",
    "0694": "594",
    "0692": "262",
    "0693": "262",
    "0639": "262",
  };
  return `${indicatifs[debut] ?? "33"}${chiffres.slice(1)}`;
}

function lienWhatsApp(demande: Demande) {
  const numero = demande.telephone ? numeroWhatsApp(demande.telephone) : null;
  if (!numero) return null;
  const texte = `Bonjour, c'est Louis, de Gwada Web Studio. J'ai bien reçu votre demande pour ${demande.entreprise}. `;
  return `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;
}

function AdminDemandesPage() {
  return (
    <AdminAcces titre="Demandes reçues">
      <ListeDemandes />
    </AdminAcces>
  );
}

function ListeDemandes() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [chargement, setChargement] = useState(true);
  const [vue, setVue] = useState<"a_traiter" | "toutes">("a_traiter");

  const charger = useCallback(async () => {
    setChargement(true);
    const { data, error } = await supabase
      .from("demandes")
      .select("id, recue_le, formulaire, source, entreprise, telephone, email, details, traitee")
      .order("recue_le", { ascending: false })
      .limit(300);
    if (error) toast.error("Impossible de charger les demandes. Réessayez.");
    setDemandes((data as Demande[] | null) ?? []);
    setChargement(false);
  }, []);

  useEffect(() => {
    void charger();
  }, [charger]);

  const aTraiter = useMemo(() => demandes.filter((demande) => !demande.traitee), [demandes]);
  const affichees = vue === "a_traiter" ? aTraiter : demandes;

  const marquer = async (demande: Demande, traitee: boolean) => {
    setDemandes((liste) => liste.map((d) => (d.id === demande.id ? { ...d, traitee } : d)));
    const { error } = await supabase.from("demandes").update({ traitee }).eq("id", demande.id);
    if (error) {
      toast.error("Le changement n’a pas été enregistré. Réessayez.");
      void charger();
    }
  };

  return (
    <div className="min-h-svh bg-[#0d1715] pb-24 text-[#f7f7ef]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d1715]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#54d7c8]">
                Gwada Web Studio
              </div>
              <h1 className="text-lg font-black">Demandes reçues</h1>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="rounded-full bg-white/10 px-3 py-2 text-xs font-bold"
            >
              Déconnexion
            </button>
          </div>
          <AdminOnglets />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-4">
        <div className="flex items-center gap-2">
          {(
            [
              ["a_traiter", `À traiter (${aTraiter.length})`],
              ["toutes", `Toutes (${demandes.length})`],
            ] as const
          ).map(([cle, libelle]) => (
            <button
              key={cle}
              onClick={() => setVue(cle)}
              aria-pressed={vue === cle}
              className={`rounded-full px-4 py-2 text-xs font-bold ${
                vue === cle ? "bg-white text-[#0d1715]" : "bg-white/10 text-white/70"
              }`}
            >
              {libelle}
            </button>
          ))}
          <button
            onClick={() => void charger()}
            aria-label="Actualiser la liste"
            className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/70"
          >
            <RefreshCw className={`h-4 w-4 ${chargement ? "animate-spin" : ""}`} />
          </button>
        </div>

        {!chargement && affichees.length === 0 && (
          <p className="mt-10 text-center text-sm leading-relaxed text-white/55">
            {vue === "a_traiter" && demandes.length > 0
              ? "Tout est traité."
              : "Aucune demande pour l’instant. Celles envoyées depuis le site arrivent ici et par e-mail."}
          </p>
        )}

        <ul className="mt-4 space-y-3">
          {affichees.map((demande) => {
            const whatsapp = lienWhatsApp(demande);
            const details = Object.entries(demande.details ?? {}).filter(
              ([champ, valeur]) => !champsMasques.has(champ) && valeur !== "Non renseigné",
            );
            return (
              <li
                key={demande.id}
                className={`rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 ${
                  demande.traitee ? "opacity-60" : ""
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h2 className="text-base font-black">{demande.entreprise}</h2>
                  <span className="text-xs text-white/50">
                    {dateHeure.format(new Date(demande.recue_le))}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-[#54d7c8]">
                  {demande.formulaire === "demo" ? "Démo gratuite" : "Contact"}
                  {demande.source && demande.source !== "contact"
                    ? `, depuis ${demande.source}`
                    : ""}
                </p>

                {details.length > 0 && (
                  <dl className="mt-3 space-y-1.5 text-sm">
                    {details.map(([champ, valeur]) => (
                      <div key={champ}>
                        <dt className="text-xs text-white/45">{champ}</dt>
                        <dd className="break-words text-white/85">{valeur}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                  {whatsapp && (
                    <a
                      href={whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#54d7c8] px-3.5 py-2 text-[#0d1715]"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  )}
                  {demande.telephone && !whatsapp && (
                    <a
                      href={`tel:${demande.telephone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2"
                    >
                      <Phone className="h-3.5 w-3.5" /> {demande.telephone}
                    </a>
                  )}
                  {demande.email && (
                    <a
                      href={`mailto:${demande.email}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 break-all"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" /> {demande.email}
                    </a>
                  )}
                  <button
                    onClick={() => void marquer(demande, !demande.traitee)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2"
                  >
                    {demande.traitee ? (
                      <>
                        <RotateCcw className="h-3.5 w-3.5" /> Remettre à traiter
                      </>
                    ) : (
                      <>
                        <Check className="h-3.5 w-3.5" /> Traitée
                      </>
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <Toaster />
    </div>
  );
}
