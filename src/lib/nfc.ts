// Base fixe imprimée sur les cartes : ne doit jamais changer.
export const NFC_BASE_URL = "https://gwadawebstudio.fr";

export function shortUrlFor(code: string) {
  return `${NFC_BASE_URL}/a/${code}`;
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export type NfcCard = {
  id: string;
  code: string;
  merchant_name: string | null;
  target_url: string | null;
  active: boolean;
  notes: string | null;
};

export type NfcStatus = "libre" | "configuree" | "desactivee";

export function statusOf(card: Pick<NfcCard, "target_url" | "active">): NfcStatus {
  if (!card.target_url) return "libre";
  return card.active ? "configuree" : "desactivee";
}

export const statusLabel: Record<NfcStatus, string> = {
  libre: "Libre",
  configuree: "Configurée",
  desactivee: "Désactivée",
};
