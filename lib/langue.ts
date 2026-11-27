// Langue choisie par le visiteur (FR par défaut), retenue dans son navigateur.
export type Langue = "fr" | "en";

export const CLE_LANGUE = "langue";
export const EVENEMENT_LANGUE = "businesseur:langue";

export function lireLangue(): Langue {
  try {
    if (localStorage.getItem(CLE_LANGUE) === "en") return "en";
  } catch {}
  return document.cookie.includes(`${CLE_LANGUE}=en`) ? "en" : "fr";
}

export function choisirLangue(langue: Langue) {
  try {
    localStorage.setItem(CLE_LANGUE, langue);
  } catch {}
  document.cookie = `${CLE_LANGUE}=${langue}; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new CustomEvent(EVENEMENT_LANGUE, { detail: langue }));
}
