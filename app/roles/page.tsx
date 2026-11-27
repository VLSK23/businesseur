import Link from "next/link";
import EntetePages from "@/components/EntetePages";

export const metadata = {
  title: "Le rôle de chacun | Businesseur",
  description: "Entrepreneurs, mentors, investisseurs et Fairy : le rôle de chacun dans l'oasis Businesseur.",
};

type Role = {
  id: string;
  profil: string;
  titre: string;
  accroche: string;
  apporte: string[];
  gagne: string[];
  etapes: { titre: string; texte: string }[];
  bouton: string;
  couleur: "sable" | "oasis" | "nuit";
};

// Le contenu de chaque rôle : pour modifier un texte, change-le ici.
const ROLES: Role[] = [
  {
    id: "entrepreneur",
    profil: "entrepreneur",
    titre: "Entrepreneur",
    accroche: "Vous portez un projet, de la simple idée à la levée de fonds.",
    apporte: [
      "Un projet, une idée ou une entreprise qui démarre",
      "Votre énergie et votre envie d'apprendre",
      "Des nouvelles régulières de vos avancées",
    ],
    gagne: [
      "Des mentors qui connaissent votre secteur",
      "Une page projet pour vous faire connaître",
      "Des rencontres avec des investisseurs, au bon moment",
    ],
    etapes: [
      { titre: "Présentez votre projet", texte: "Décrivez votre idée, votre stade d'avancement et ce dont vous avez besoin." },
      { titre: "Rencontrez vos mentors", texte: "Fairy vous propose les mentors les plus utiles pour votre prochaine étape." },
      { titre: "Préparez votre levée", texte: "Quand vous êtes prêt·e, vous présentez votre projet aux investisseurs de l'oasis." },
    ],
    bouton: "Je m'inscris comme entrepreneur",
    couleur: "sable",
  },
  {
    id: "mentor",
    profil: "mentor",
    titre: "Mentor",
    accroche: "Vous avez de l'expérience et vous voulez la transmettre.",
    apporte: [
      "Votre expérience et vos conseils concrets",
      "Quelques heures par mois, à votre rythme",
      "Votre carnet d'adresses, quand c'est utile",
    ],
    gagne: [
      "Des projets choisis selon vos spécialités",
      "Le plaisir de voir grandir de jeunes entreprises",
      "Un badge de mentor certifié et une communauté de pairs",
    ],
    etapes: [
      { titre: "Choisissez vos spécialités", texte: "Marketing, finance, vente, juridique… Indiquez ce que vous savez le mieux faire." },
      { titre: "Recevez des projets", texte: "Fairy vous présente les projets qui ont besoin de vos compétences." },
      { titre: "Accompagnez", texte: "Des rendez-vous réguliers pour aider l'entrepreneur à avancer." },
    ],
    bouton: "Je m'inscris comme mentor",
    couleur: "oasis",
  },
  {
    id: "investisseur",
    profil: "investisseur",
    titre: "Investisseur",
    accroche: "Vous cherchez des projets solides dans lesquels investir.",
    apporte: [
      "Un financement pour faire grandir les projets",
      "Votre regard exigeant sur les chiffres et l'équipe",
      "Votre réseau pour ouvrir des portes",
    ],
    gagne: [
      "Des projets déjà accompagnés par nos mentors",
      "Des informations claires : jauge de financement, chiffres, besoins",
      "Des rencontres en tête à tête avec les fondateurs",
    ],
    etapes: [
      { titre: "Décrivez vos critères", texte: "Secteurs, montants, stade des projets : dites ce que vous recherchez." },
      { titre: "Découvrez les projets", texte: "Fairy vous présente les projets qui correspondent à votre thèse d'investissement." },
      { titre: "Rencontrez les fondateurs", texte: "Échangez directement avec les équipes et suivez leurs progrès." },
    ],
    bouton: "Je m'inscris comme investisseur",
    couleur: "nuit",
  },
];

export default function RolesPage() {
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">Comment ça marche</p>
              <h1>Le rôle de chacun dans l&apos;oasis</h1>
              <p>Businesseur réunit trois profils qui ont besoin les uns des autres, avec Fairy pour les guider.</p>
            </header>

            <nav className="roles__sommaire" aria-label="Les rôles">
              {ROLES.map((r) => (
                <a key={r.id} href={`#${r.id}`} className={`roles__pastille roles__pastille--${r.couleur}`}>{r.titre}</a>
              ))}
              <a href="#fairy" className="roles__pastille roles__pastille--fairy">Fairy</a>
            </nav>

            {ROLES.map((r) => (
              <article key={r.id} id={r.id} className={`role role--${r.couleur}`}>
                <header className="role__tete">
                  <h2>{r.titre}</h2>
                  <p>{r.accroche}</p>
                </header>

                <div className="role__colonnes">
                  <div>
                    <h3>Ce qu&apos;il apporte</h3>
                    <ul className="profil__liste">
                      {r.apporte.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3>Ce qu&apos;il y gagne</h3>
                    <ul className="profil__liste">
                      {r.gagne.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                </div>

                <h3>Comment ça se passe</h3>
                <ol className="role__etapes">
                  {r.etapes.map((e, i) => (
                    <li key={e.titre}>
                      <span className="etape__numero">{`0${i + 1}`}</span>
                      <h4>{e.titre}</h4>
                      <p>{e.texte}</p>
                    </li>
                  ))}
                </ol>

                <Link href={`/connexion?mode=inscription&profil=${r.profil}`} className="bouton bouton--or bouton--grand">
                  {r.bouton}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="fairy" className="section section--nuit">
          <div className="conteneur role-fairy">
            <p className="surtitre">Et Fairy dans tout ça ?</p>
            <h2>La fée qui relie tout le monde</h2>
            <p>
              Fairy est l&apos;assistante IA de Businesseur. Elle lit les profils, comprend les besoins de chacun
              et propose les bonnes rencontres au bon moment.
            </p>
            <ul className="role-fairy__liste">
              <li>Elle présente aux entrepreneurs les mentors qui connaissent leur secteur.</li>
              <li>Elle envoie aux mentors les projets qui ont besoin de leurs spécialités.</li>
              <li>Elle signale aux investisseurs les projets prêts à lever des fonds.</li>
              <li>Elle répond aux questions de tous, à toute heure.</li>
            </ul>
            <Link href="/fairy" className="bouton bouton--or bouton--grand">Discuter avec Fairy</Link>
          </div>
        </section>
      </main>
    </>
  );
}
