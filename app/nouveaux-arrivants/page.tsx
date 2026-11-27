import Link from "next/link";
import EntetePages from "@/components/EntetePages";
import { MANTRA_INVESTISSEUR, NOUVEAUX_ENTREPRENEURS, NOUVEAUX_MENTORS, type Arrivant } from "@/lib/communaute";

export const metadata = {
  title: "Nouveaux arrivants | Businesseur",
  description: "Les entrepreneurs et mentors qui viennent de rejoindre Businesseur.",
};

function Carte({ a }: { a: Arrivant }) {
  return (
    <figure className="temoignage">
      <blockquote>{a.texte}</blockquote>
      <figcaption>
        <span className="mini-avatar">{a.initiales}</span>
        <div><strong>{a.nom}</strong><small>{a.detail}</small></div>
      </figcaption>
    </figure>
  );
}

export default function NouveauxArrivantsPage() {
  const m = MANTRA_INVESTISSEUR;
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">Bienvenue dans l&apos;oasis</p>
              <h1>Les nouveaux arrivants</h1>
              <p>Chaque semaine, de nouveaux entrepreneurs et mentors rejoignent Businesseur.</p>
            </header>

            <h2 className="titre-groupe">Entrepreneurs</h2>
            <div className="temoignages">
              {NOUVEAUX_ENTREPRENEURS.map((a) => <Carte key={a.nom} a={a} />)}
            </div>

            <h2 className="titre-groupe">Mentors</h2>
            <div className="temoignages">
              {NOUVEAUX_MENTORS.map((a) => <Carte key={a.nom} a={a} />)}
            </div>
          </div>
        </section>

        <section className="section section--nuit">
          <div className="conteneur mantra">
            <p className="surtitre">Le mantra de l&apos;investisseur</p>
            <blockquote>« {m.mantra} »</blockquote>
            <div className="mantra__auteur">
              <span className="mini-avatar">{m.initiales}</span>
              <div><strong>{m.nom}</strong><small>{m.role}</small></div>
            </div>
            <h2>Ses 3 conseils aux entrepreneurs</h2>
            <ol className="mantra__conseils">
              {m.conseils.map((c) => <li key={c}>{c}</li>)}
            </ol>
            <Link href="/connexion?mode=inscription" className="bouton bouton--or bouton--grand">
              Rejoindre l&apos;oasis
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
