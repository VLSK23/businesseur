import Link from "next/link";
import EntetePages from "@/components/EntetePages";
import PhotoProfil from "@/components/PhotoProfil";
import { MANTRA_INVESTISSEUR, NOUVEAUX_ENTREPRENEURS, NOUVEAUX_MENTORS, type Arrivant, type Visage } from "@/lib/communaute";

export const metadata = {
  title: "Les Businesseurs | Businesseur",
  description: "Les entrepreneurs, mentors et investisseurs de la communauté Businesseur.",
};

// Carte d'un entrepreneur : l'image de son projet en haut
function CarteEntrepreneur({ a }: { a: Arrivant & { visages: Visage[] } }) {
  return (
    <figure className="temoignage temoignage--image">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="temoignage__image" src={a.image} alt={`Illustration du projet ${a.detail.split(" · ")[0]}`} />
      <blockquote>{a.texte}</blockquote>
      <figcaption>
        <span className="visages">
          {a.visages.map((v) => (
            <PhotoProfil key={v.nom} className="avatar-photo" photo={v.photo} initiales={v.initiales} alt={`Portrait de ${v.nom}`} />
          ))}
        </span>
        <div><strong>{a.nom}</strong><small>{a.detail}</small></div>
      </figcaption>
    </figure>
  );
}

// Carte d'un mentor : son visage (illustration d'un personnage fictif)
function CarteMentor({ a }: { a: Arrivant }) {
  return (
    <figure className="temoignage">
      <blockquote>{a.texte}</blockquote>
      <figcaption>
        <PhotoProfil className="avatar-photo" photo={a.photo} dessin={a.image} alt={`Portrait de ${a.nom}`} />
        <div><strong>{a.nom}</strong><small>{a.detail}</small></div>
      </figcaption>
    </figure>
  );
}

export default function BusinesseursPage() {
  const m = MANTRA_INVESTISSEUR;
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">La communauté de l&apos;oasis</p>
              <h1>Les Businesseurs</h1>
              <p>Entrepreneurs, mentors et investisseurs : découvrez celles et ceux qui font vivre Businesseur.</p>
            </header>

            <h2 className="titre-groupe">Entrepreneurs</h2>
            <div className="temoignages">
              {NOUVEAUX_ENTREPRENEURS.map((a) => <CarteEntrepreneur key={a.nom} a={a} />)}
            </div>

            <h2 className="titre-groupe">Mentors</h2>
            <div className="temoignages">
              {NOUVEAUX_MENTORS.map((a) => <CarteMentor key={a.nom} a={a} />)}
            </div>
            <p className="mention-fictif">Profils et photos fictifs, créés pour la démonstration.</p>
          </div>
        </section>

        <section className="section section--nuit">
          <div className="conteneur mantra">
            <p className="surtitre">Le mantra de l&apos;investisseur</p>
            <blockquote>« {m.mantra} »</blockquote>
            <div className="mantra__auteur">
              <PhotoProfil className="avatar-photo" photo={m.photo} dessin={m.image} alt={`Portrait de ${m.nom}`} />
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
