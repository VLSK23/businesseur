import Link from "next/link";
import { notFound } from "next/navigation";
import EntetePages from "@/components/EntetePages";
import { PROJETS, trouverProjet } from "@/lib/projets";

export function generateStaticParams() {
  return PROJETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  return { title: projet ? `${projet.nom} | Businesseur` : "Projet | Businesseur", description: projet?.accroche };
}

export default async function ProjetPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  if (!projet) notFound();

  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur projet">
            <Link href="/projets" className="lien-retour">← Tous les projets</Link>

            <header className="projet__tete">
              <p className="surtitre surtitre--sombre">{projet.secteur} · {projet.ville}</p>
              <h1>{projet.nom}</h1>
              <p className="projet__accroche">{projet.accroche}</p>
              <div className="projet__actions">
                <Link href={`/projets/${projet.slug}/suivre`} className="bouton bouton--or bouton--grand">
                  Se tenir informé du projet
                </Link>
                <span className="carte__badge">{projet.stade}</span>
              </div>
            </header>

            <ul className="projet__chiffres">
              {projet.chiffres.map((c) => (
                <li key={c.libelle}><strong>{c.valeur}</strong><span>{c.libelle}</span></li>
              ))}
            </ul>

            <div className="projet__grille">
              <div>
                <h2>L&apos;histoire</h2>
                {projet.histoire.map((t, i) => <p key={i}>{t}</p>)}

                <h2>Ce qui le rend unique</h2>
                <div className="projet__points">
                  {projet.points.map((pt) => (
                    <div key={pt.titre} className="projet__point">
                      <h3>{pt.titre}</h3>
                      <p>{pt.texte}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="projet__cote">
                <h2>L&apos;équipe</h2>
                <ul className="projet__equipe">
                  {projet.fondateurs.map((f) => (
                    <li key={f.nom}>
                      <span className="mini-avatar">{f.initiales}</span>
                      <div><strong>{f.nom}</strong><small>{f.role}</small></div>
                    </li>
                  ))}
                </ul>

                <h2>Ce dont le projet a besoin</h2>
                <ul className="profil__liste">
                  {projet.besoins.map((b) => <li key={b}>{b}</li>)}
                </ul>

                <Link href={`/projets/${projet.slug}/suivre`} className="bouton bouton--nuit">
                  Se tenir informé du projet
                </Link>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
