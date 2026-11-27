import Link from "next/link";
import type { ReactNode } from "react";
import Langue from "@/components/Langue";

// En-tête des pages Connexion et Mon compte (logo + une action à droite).
export default function EnteteSimple({ children }: { children?: ReactNode }) {
  return (
    <header className="entete entete--simple">
      <div className="conteneur entete__contenu">
        <Link href="/" className="logo" aria-label="Businesseur, retour à l'accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/logo-businesseur.png" alt="" className="logo__icone" />
          <span>Business<em>eur</em></span>
        </Link>
        <div className="entete__droite">
          <Langue />
          {children ?? (
            <Link href="/" className="lien-discret">← <span className="masque-mobile">Retour à l&apos;</span>accueil</Link>
          )}
        </div>
      </div>
    </header>
  );
}
