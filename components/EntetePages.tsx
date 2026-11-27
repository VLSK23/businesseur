import Link from "next/link";

// En-tête des pages Projets, Nouveaux arrivants et Act-Business.
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
          <Link href="/projets">Projets</Link>
          <Link href="/nouveaux-arrivants">Nouveaux arrivants</Link>
          <Link href="/act-business">Act-Business</Link>
          <Link href="/connexion?mode=inscription" className="bouton bouton--or">S&apos;inscrire</Link>
        </nav>
      </div>
    </header>
  );
}
