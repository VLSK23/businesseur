// Jauge de financement d'un projet : montant levé, objectif et montant qui manque.
// Les montants sont dans lib/projets.ts (champ "financement").

// 62000 -> "62 000" (espaces simples, plus faciles à traduire)
function euros(n: number) {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function JaugeFinancement({ leve, objectif, compacte = false }: { leve: number; objectif: number; compacte?: boolean }) {
  const pourcentage = Math.min(100, Math.round((leve / objectif) * 100));
  const manque = Math.max(0, objectif - leve);
  return (
    <div className={`jauge${compacte ? " jauge--compacte" : ""}`}>
      <div className="jauge__haut">
        <span className="jauge__titre">Financement</span>
        <span className="jauge__pourcentage">{`${pourcentage} %`}</span>
      </div>
      <div
        className="jauge__barre"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pourcentage}
        aria-label={`Financement : ${pourcentage} % de l'objectif`}
      >
        <span className="jauge__rempli" style={{ width: `${pourcentage}%` }} />
      </div>
      <div className="jauge__montants">
        <strong>{`${euros(leve)} € levés`}</strong>
        <span>{`sur ${euros(objectif)} €`}</span>
      </div>
      <p className="jauge__manque">
        {manque > 0 ? `Il manque ${euros(manque)} € pour atteindre l'objectif` : "Objectif atteint !"}
      </p>
    </div>
  );
}
