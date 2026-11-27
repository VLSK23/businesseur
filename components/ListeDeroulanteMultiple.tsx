"use client";

import { useEffect, useId, useRef, useState } from "react";

type Option = { valeur: string; libelle: string };

type Props = {
  label: string;
  options: readonly Option[];
  valeurs: string[];
  onChange: (valeurs: string[]) => void;
  placeholder?: string;
};

// Liste déroulante à choix multiples : un menu qui s'ouvre avec des cases à
// cocher, et qui affiche les choix retenus quand il est fermé.
export default function ListeDeroulanteMultiple({
  label,
  options,
  valeurs,
  onChange,
  placeholder = "Choisissez…",
}: Props) {
  const [ouverte, setOuverte] = useState(false);
  const boite = useRef<HTMLDivElement>(null);
  const id = useId();

  // Ferme la liste quand on clique ailleurs ou qu'on appuie sur Échap.
  useEffect(() => {
    if (!ouverte) return;
    function clicDehors(e: MouseEvent) {
      if (boite.current && !boite.current.contains(e.target as Node)) setOuverte(false);
    }
    function echap(e: KeyboardEvent) {
      if (e.key === "Escape") setOuverte(false);
    }
    document.addEventListener("mousedown", clicDehors);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("mousedown", clicDehors);
      document.removeEventListener("keydown", echap);
    };
  }, [ouverte]);

  const choisis = options.filter((o) => valeurs.includes(o.valeur));
  const resume =
    choisis.length === 0
      ? placeholder
      : choisis.length <= 2
        ? choisis.map((o) => o.libelle).join(", ")
        : `${choisis.length} spécialités choisies`;

  function basculer(valeur: string, coche: boolean) {
    onChange(coche ? [...valeurs, valeur] : valeurs.filter((v) => v !== valeur));
  }

  return (
    <div className="champ liste-multiple" ref={boite}>
      <label id={`${id}-label`} htmlFor={`${id}-bouton`}>{label}</label>
      <button
        type="button"
        id={`${id}-bouton`}
        className={`liste-multiple__bouton${choisis.length === 0 ? " liste-multiple__bouton--vide" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={ouverte}
        aria-controls={`${id}-liste`}
        onClick={() => setOuverte(!ouverte)}
      >
        {resume}
      </button>

      {ouverte && (
        <div id={`${id}-liste`} className="liste-multiple__menu" role="group" aria-labelledby={`${id}-label`}>
          {options.map((o) => (
            <label key={o.valeur} className="liste-multiple__option">
              <input
                type="checkbox"
                checked={valeurs.includes(o.valeur)}
                onChange={(e) => basculer(o.valeur, e.target.checked)}
              />
              {o.libelle}
            </label>
          ))}
          <button type="button" className="liste-multiple__ok" onClick={() => setOuverte(false)}>
            Valider
          </button>
        </div>
      )}

      {choisis.length > 2 && <p className="choix-aide">{choisis.map((o) => o.libelle).join(", ")}</p>}
    </div>
  );
}
