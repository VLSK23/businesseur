import Link from "next/link";
import EntetePages from "@/components/EntetePages";
import { PROJETS } from "@/lib/projets";

export const metadata = {
  title: "Projets | Businesseur",
  description: "Les projets accompagnés sur Businesseur.",
};

export default function ProjetsPage() {
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">Ils grandissent dans l&apos;oasis</p>
              <h1>Les projets Businesseur</h1>
              <p>Découvrez les projets accompagnés par nos mentors, et suivez ceux qui vous inspirent.</p>
            </header>

            <div className="grille-cartes">
              {PROJETS.map((p) => (
                <Link key={p.slug} href={`/projets/${p.slug}`} className="carte carte--image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="carte__image carte__image--projet" src={p.image} alt={`Illustration du projet ${p.nom}`} />
                  <span className="carte__badge">{p.stade}</span>
                  <h2>{p.nom}</h2>
                  <p>{p.accroche}</p>
                  <small>{p.secteur} · {p.ville}</small>
                  <span className="lien-fleche">Voir le projet</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
