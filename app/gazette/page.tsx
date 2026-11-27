import Link from "next/link";
import EntetePages from "@/components/EntetePages";
import { ARTICLES, imageArticle } from "@/lib/articles";

export const metadata = {
  title: "La Gazette du Businesseur | Businesseur",
  description: "Guides et conseils pour entreprendre : idée, statut, pitch, financement, premiers clients.",
};

export default function GazettePage() {
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">La bibliothèque de l&apos;entrepreneur</p>
              <h1>La Gazette du Businesseur</h1>
              <p>Des guides courts et concrets, écrits par nos mentors, pour avancer à chaque étape de votre projet.</p>
            </header>

            <div className="grille-cartes">
              {ARTICLES.map((a) => (
                <Link key={a.slug} href={`/gazette/${a.slug}`} className="carte carte--image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="carte__image" src={imageArticle(a.slug)} alt="" />
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
