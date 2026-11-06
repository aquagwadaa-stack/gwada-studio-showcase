const urlBase = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const cleBase = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

/**
 * Clé Web3Forms du studio, pour recevoir chaque demande par e-mail.
 * Elle n'est pas secrète : elle sert seulement d'adresse d'envoi.
 */
const cleEmail = "";

/** Au-delà, le visiteur a mieux à faire qu'attendre : on lui propose WhatsApp ou l'e-mail. */
const DELAI = 8000;

export type Demande = {
  formulaire: "demo" | "contact";
  source: string;
  entreprise: string;
  telephone?: string;
  email?: string;
  sujet: string;
  /** Ce que le visiteur a rempli, avec le nom de chaque champ en clair. */
  details: Record<string, string>;
};

async function appel(url: string, init: RequestInit) {
  const arret = new AbortController();
  const minuterie = window.setTimeout(() => arret.abort(), DELAI);
  try {
    return await fetch(url, { ...init, signal: arret.signal });
  } finally {
    window.clearTimeout(minuterie);
  }
}

async function enregistrer(demande: Demande) {
  if (!urlBase || !cleBase) return false;
  const { formulaire, source, entreprise, telephone, email, details } = demande;
  const reponse = await appel(`${urlBase}/rest/v1/demandes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: cleBase, Prefer: "return=minimal" },
    body: JSON.stringify({
      formulaire,
      source,
      entreprise,
      telephone: telephone || null,
      email: email || null,
      details,
    }),
  });
  return reponse.ok;
}

async function prevenirParEmail(demande: Demande) {
  if (!cleEmail) return false;
  const reponse = await appel("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: cleEmail,
      subject: demande.sujet,
      from_name: "Site Gwada Web Studio",
      ...(demande.email ? { replyto: demande.email } : {}),
      ...demande.details,
    }),
  });
  const resultat = (await reponse.json().catch(() => null)) as { success?: boolean } | null;
  return reponse.ok && resultat?.success !== false;
}

/** La demande est bien partie dès qu'un des deux chemins a marché. */
export async function envoyerDemande(demande: Demande) {
  const resultats = await Promise.allSettled([enregistrer(demande), prevenirParEmail(demande)]);
  return resultats.some((resultat) => resultat.status === "fulfilled" && resultat.value);
}
