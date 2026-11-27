"use client";

import { useEffect, useState } from "react";
import { choisirLangue, lireLangue, EVENEMENT_LANGUE, type Langue as LangueSite } from "@/lib/langue";

// Sélecteur de langue FR / EN (en-tête de toutes les pages).
// Le choix traduit tout le site sans changer de page, et reste retenu.
export default function Langue() {
  const [langue, setLangue] = useState<LangueSite>("fr");

  useEffect(() => {
    setLangue(lireLangue());
    const suivre = (e: Event) => setLangue((e as CustomEvent<LangueSite>).detail);
    window.addEventListener(EVENEMENT_LANGUE, suivre);
    return () => window.removeEventListener(EVENEMENT_LANGUE, suivre);
  }, []);

  return (
    <div className="langue" aria-label="Langue / Language" translate="no">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          className={langue === l ? "langue--active" : undefined}
          aria-pressed={langue === l}
          onClick={() => choisirLangue(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
