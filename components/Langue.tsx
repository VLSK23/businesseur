import Link from "next/link";

// Sélecteur de langue FR / EN (en-tête de toutes les pages).
// FR mène à l'accueil en français, EN à la présentation en anglais (/en).
export default function Langue({ active = "fr" }: { active?: "fr" | "en" }) {
  return (
    <div className="langue" aria-label="Langue / Language">
      <Link href="/" lang="fr" className={active === "fr" ? "langue--active" : undefined} aria-current={active === "fr" ? "page" : undefined}>FR</Link>
      <Link href="/en" lang="en" className={active === "en" ? "langue--active" : undefined} aria-current={active === "en" ? "page" : undefined}>EN</Link>
    </div>
  );
}
