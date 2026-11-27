import Link from "next/link";
import Langue from "@/components/Langue";

// En-tête des pages Les rôles, Projets, Les Businesseurs et La Gazette du Businesseur.
export default function EntetePages() {
  return (
    <header className="entete">
      <div className="conteneur entete__contenu">
        <Link href="/" className="logo" aria-label="Businesseur, retour à l'accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Images/logo-businesseur.png" alt="" className="logo__icone" />
          <span>Business<em>eur</em></span>
        </Link>
        <nav className="nav-pages" aria-label="Pages">
          <Link href="/roles">Les rôles</Link>
          <Link href="/projets">Projets</Link>
          <Link href="/businesseurs">Les Businesseurs</Link>
          <Link href="/gazette">La Gazette</Link>
          <Langue />
          <Link href="/connexion">Se connecter</Link>
          <Link href="/connexion?mode=inscription" className="bouton bouton--or">S&apos;inscrire</Link>
        </nav>
      </div>
    </header>
  );
}
