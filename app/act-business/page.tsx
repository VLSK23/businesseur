import Link from "next/link";
import EntetePages from "@/components/EntetePages";
import { ARTICLES } from "@/lib/articles";

export const metadata = {
  title: "Act-Business | Businesseur",
  description: "Guides et conseils pour entreprendre : idée, statut, pitch, financement, premiers clients.",
};

export default function ActBusinessPage() {
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">La bibliothèque de l&apos;entrepreneur</p>
              <h1>Act-Business</h1>
              <p>Des guides courts et concrets, écrits par nos mentors, pour avancer à chaque étape de votre projet.</p>
            </header>

            <div className="grille-cartes">
              {ARTICLES.map((a) => (
                <Link key={a.slug} href={`/act-business/${a.slug}`} className="carte">
                  <span className="carte__badge">{a.categorie}</span>
                  <h2>{a.titre}</h2>
                  <p>{a.resume}</p>
                  <small>{a.lecture} de lecture · {a.auteur}</small>
                  <span className="lien-fleche">Lire l&apos;article</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
