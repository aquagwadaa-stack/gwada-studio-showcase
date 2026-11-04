import { useMemo, useState, type CSSProperties } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, Sparkle } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsApp";
import { whatsappLink } from "@/lib/contact-info";
import {
  dateLimiteApercu,
  datesApercu,
  euros,
  lireNom,
  lireType,
  modelesApercu,
  typesApercu,
  type ModeleApercu,
  type TypeApercu,
} from "@/lib/apercu-noel";

const POLICE =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&display=swap";

export const Route = createFileRoute("/exemple-commandes-noel")({
  staticData: { sitemap: false },
  validateSearch: (search: Record<string, unknown>): { nom?: string; type?: TypeApercu } => ({
    nom: lireNom(search.nom),
    type: lireType(search.type),
  }),
  head: ({ match }) => {
    const nom = match.search.nom;
    const title = nom
      ? `Aperçu pour ${nom} — commandes de Noël`
      : "Exemple de page de commandes de Noël";
    const description =
      "Aperçu de démonstration d’une page de commandes de Noël : produits et prix d’exemple, aucune commande n’est enregistrée.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "noindex, nofollow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [{ rel: "stylesheet", href: POLICE }],
    };
  },
  component: ApercuPage,
});

const serif = { fontFamily: '"Fraunces", Georgia, "Times New Roman", serif' };

function ApercuPage() {
  const { nom, type } = Route.useSearch();
  const typeChoisi = type ?? "traiteur";
  const modele = modelesApercu[typeChoisi];
  const { couleurs } = modele;
  const variables = {
    "--profond": couleurs.profond,
    "--fond": couleurs.fond,
    "--encre": couleurs.encre,
    "--doux": couleurs.doux,
    "--accent": couleurs.accent,
    "--or": couleurs.or,
  } as CSSProperties;

  return (
    <div style={variables} className="min-h-svh bg-[var(--fond)] text-[var(--encre)]">
      <p
        className="sticky top-0 z-30 m-0 bg-[#f2cb5d] px-4 py-2 text-center text-[13px] font-bold leading-snug text-[#2a2410]"
        data-apercu-bandeau
      >
        Aperçu de démonstration{nom ? ` pour ${nom}` : ""} : produits et prix d’exemple, aucune
        commande n’est enregistrée.
      </p>

      <header className="relative overflow-hidden bg-[var(--profond)] px-5 pb-12 pt-10 text-[var(--fond)] sm:px-8 sm:pb-16 sm:pt-14">
        <Etoiles />
        <div className="relative mx-auto max-w-[60rem]">
          {!nom && (
            <nav aria-label="Choisir un métier" className="mb-8 flex flex-wrap gap-2">
              {typesApercu.map((cle) => (
                <Link
                  key={cle}
                  to="/exemple-commandes-noel"
                  search={{ type: cle }}
                  aria-current={cle === typeChoisi ? "page" : undefined}
                  className={`rounded-full border px-4 py-2 text-[13px] font-bold transition ${
                    cle === typeChoisi
                      ? "border-[var(--or)] bg-[var(--or)] text-[var(--profond)]"
                      : "border-white/25 text-white/80 hover:border-white/60"
                  }`}
                >
                  {modelesApercu[cle].libelle}
                </Link>
              ))}
            </nav>
          )}
          <p className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[var(--or)]">
            Commandes de Noël
          </p>
          <h1
            style={serif}
            className={`mb-0 mt-3 font-bold leading-[1.04] tracking-[-0.02em] [overflow-wrap:anywhere] ${
              (nom?.length ?? 0) > 30
                ? "text-[clamp(2rem,7.5vw,3.4rem)]"
                : "text-[clamp(2.5rem,10vw,4.6rem)]"
            }`}
          >
            {nom ?? "Votre commerce"}
          </h1>
          <p className="mb-0 mt-4 max-w-xl text-lg leading-snug sm:text-xl">{modele.accroche}</p>
          <p className="mb-0 mt-2 max-w-xl text-[15px] leading-relaxed text-white/70">
            {modele.sousTitre}
          </p>
          <p className="mb-0 mt-6 inline-block rounded-full border border-[var(--or)] px-4 py-1.5 text-[13px] font-bold text-[var(--or)]">
            Commandes jusqu’au {dateLimiteApercu}
          </p>
        </div>
      </header>

      <Commande key={typeChoisi} modele={modele} />

      <section className="bg-[#0d1715] px-5 py-14 text-[#f7f7ef] sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[60rem]">
          <p className="m-0 text-xs font-black uppercase tracking-[0.18em] text-[#54d7c8]">
            {nom ? `Pour ${nom}` : "Pour votre commerce"}
          </p>
          <h2 className="mb-0 mt-3 font-display text-[clamp(1.9rem,6vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.04em]">
            Cette page vous plaît ?
          </h2>
          <p className="mb-0 mt-4 max-w-xl text-base leading-relaxed text-white/70">
            Je la prépare avec vos vrais produits, vos prix et vos photos. La démonstration est
            gratuite et sans engagement.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(
                `Bonjour, j’ai vu l’aperçu de Noël${nom ? ` pour ${nom}` : ""}. Je veux bien une démonstration.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="apercu-noel-whatsapp"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-[#54d7c8] px-7 text-sm font-extrabold text-[#0d1715] transition hover:bg-[#f7f7ef]"
            >
              <WhatsAppIcon className="h-5 w-5" /> Répondre sur WhatsApp
            </a>
            <a
              href="/demo-gratuite?src=apercu-noel"
              data-cta="apercu-noel-demo"
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-white/25 px-7 text-sm font-bold text-white transition hover:border-white/60"
            >
              Demander ma démo gratuite <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mb-0 mt-8 text-[13px] text-white/50">
            Aperçu préparé par{" "}
            <a href="/" className="underline underline-offset-2 hover:text-white">
              Gwada Web Studio
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

function Commande({ modele }: { modele: ModeleApercu }) {
  const [quantites, setQuantites] = useState(modele.selection);
  const [mode, setMode] = useState<"Retrait" | "Livraison">("Retrait");
  const [date, setDate] = useState(datesApercu[1]);
  const [envoye, setEnvoye] = useState(false);

  const lignes = useMemo(
    () => modele.produits.filter((produit) => (quantites[produit.id] ?? 0) > 0),
    [modele, quantites],
  );
  const total = lignes.reduce((somme, p) => somme + p.prix * quantites[p.id], 0);

  const changer = (id: string, ecart: number) => {
    setEnvoye(false);
    setQuantites((actuelles) => ({
      ...actuelles,
      [id]: Math.max(0, Math.min(20, (actuelles[id] ?? 0) + ecart)),
    }));
  };

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
      <section aria-labelledby="titre-produits">
        <h2
          id="titre-produits"
          style={serif}
          className="m-0 text-[1.75rem] font-bold tracking-[-0.01em]"
        >
          La carte des fêtes
        </h2>
        <ul className="m-0 mt-4 list-none p-0">
          {modele.produits.map((produit) => {
            const quantite = quantites[produit.id] ?? 0;
            return (
              <li
                key={produit.id}
                className="flex items-center gap-3 border-b border-[var(--or)]/40 py-4"
              >
                <div className="min-w-0 flex-1">
                  <h3 style={serif} className="m-0 text-[1.15rem] font-medium leading-snug">
                    {produit.nom}
                  </h3>
                  <p className="m-0 mt-0.5 text-[14px] leading-snug text-[var(--doux)]">
                    {produit.detail}
                  </p>
                  <p className="m-0 mt-1 text-[15px] font-bold">{euros(produit.prix)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => changer(produit.id, -1)}
                    disabled={quantite === 0}
                    aria-label={`Retirer : ${produit.nom}`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--encre)]/25 text-[var(--encre)] transition disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span aria-live="polite" className="w-6 text-center text-base font-bold">
                    {quantite}
                  </span>
                  <button
                    type="button"
                    onClick={() => changer(produit.id, 1)}
                    aria-label={`Ajouter : ${produit.nom}`}
                    className="grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-white transition hover:opacity-85"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="titre-commande"
        className="self-start rounded-2xl bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,.07)] sm:p-6 lg:sticky lg:top-16"
      >
        <h2 id="titre-commande" style={serif} className="m-0 text-2xl font-bold">
          Votre commande
        </h2>

        <fieldset className="m-0 mt-4 border-0 p-0">
          <legend className="p-0 text-sm font-bold">Comment la récupérer ?</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["Retrait", "Livraison"] as const).map((choix) => (
              <Choix
                key={choix}
                actif={mode === choix}
                onClick={() => {
                  setMode(choix);
                  setEnvoye(false);
                }}
              >
                {choix}
              </Choix>
            ))}
          </div>
        </fieldset>

        <fieldset className="m-0 mt-4 border-0 p-0">
          <legend className="p-0 text-sm font-bold">Pour quelle date ?</legend>
          <div className="mt-2 grid gap-2">
            {datesApercu.map((choix) => (
              <Choix
                key={choix}
                actif={date === choix}
                onClick={() => {
                  setDate(choix);
                  setEnvoye(false);
                }}
              >
                {choix}
              </Choix>
            ))}
          </div>
        </fieldset>

        <p className="m-0 mt-5 flex items-baseline justify-between border-t border-[var(--encre)]/15 pt-4 text-[15px] font-bold">
          <span>Total</span>
          <span aria-live="polite" style={serif} className="text-2xl">
            {euros(total)}
          </span>
        </p>

        {envoye ? (
          <div className="mt-4" role="status">
            <p className="m-0 text-sm font-bold">Voici ce que vous recevriez :</p>
            <div className="mt-2 rounded-xl bg-[#e7f6ec] p-4 text-[14px] leading-relaxed text-[#14281e]">
              <p className="m-0 font-bold">Nouvelle commande</p>
              <ul className="m-0 mt-1 list-none p-0">
                {lignes.map((p) => (
                  <li key={p.id}>
                    {quantites[p.id]} × {p.nom}
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-1">
                {mode} : {date.toLowerCase()}
              </p>
              <p className="m-0 font-bold">Total : {euros(total)}</p>
            </div>
            <p className="m-0 mt-3 text-[13px] leading-snug text-[var(--doux)]">
              Démonstration : rien n’a été envoyé. Sur votre vraie page, chaque commande arrive
              complète, avec le nom et le téléphone du client.
            </p>
          </div>
        ) : (
          <button
            type="button"
            disabled={total === 0}
            onClick={() => setEnvoye(true)}
            data-cta="apercu-noel-commande"
            className="mt-4 min-h-13 w-full rounded-xl bg-[var(--accent)] px-5 text-[15px] font-extrabold text-white transition hover:opacity-90 disabled:opacity-40"
          >
            {total === 0 ? "Choisissez au moins un produit" : "Envoyer ma commande"}
          </button>
        )}
      </section>
    </main>
  );
}

function Choix({
  actif,
  onClick,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={actif}
      onClick={onClick}
      className={`min-h-11 rounded-xl border px-3 text-[14px] font-bold transition ${
        actif
          ? "border-[var(--profond)] bg-[var(--profond)] text-white"
          : "border-[var(--encre)]/20 bg-transparent text-[var(--encre)]"
      }`}
    >
      {children}
    </button>
  );
}

// Sur téléphone, une seule étoile dans le coin : les autres passeraient sur le texte.
const etoiles = [
  { top: "7%", right: "6%", taille: "h-6 w-6 sm:h-7 sm:w-7" },
  { top: "34%", right: "17%", taille: "hidden h-4 w-4 md:block" },
  { top: "60%", right: "5%", taille: "hidden h-5 w-5 md:block" },
  { top: "78%", right: "22%", taille: "hidden h-3.5 w-3.5 md:block" },
  { top: "20%", right: "30%", taille: "hidden h-3 w-3 lg:block" },
];

function Etoiles() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 text-[var(--or)] opacity-70"
    >
      {etoiles.map((etoile) => (
        <Sparkle
          key={etoile.top}
          className={`absolute ${etoile.taille}`}
          style={{ top: etoile.top, right: etoile.right }}
          fill="currentColor"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}
