import Link from "next/link";
import ACompleter from "@/components/ACompleter";
import EnteteSimple from "@/components/EnteteSimple";

export const metadata = {
  title: "Mentions légales | Businesseur",
  description: "Mentions légales du site Businesseur.",
};

export default function MentionsLegales() {
  return (
    <>
      <EnteteSimple />
      <main className="auth">
        <article className="page-texte">
          <p className="surtitre surtitre--sombre">Informations légales</p>
          <h1>Mentions légales</h1>
          <p className="page-texte__avertissement">
            Modèle de page : remplacez les zones surlignées par vos vraies informations avant la mise en ligne définitive.
          </p>

          <h2>Éditeur du site</h2>
          <p>
            Le site Businesseur est édité par <ACompleter>nom de la société ou de la personne</ACompleter>,{" "}
            <ACompleter>forme juridique et capital</ACompleter>, immatriculée sous le numéro{" "}
            <ACompleter>SIREN / RCS</ACompleter>.
          </p>
          <p>
            Adresse : <ACompleter>adresse postale</ACompleter>. Contact :{" "}
            <ACompleter>adresse e-mail</ACompleter>.
          </p>
          <p>Responsable de la publication : <ACompleter>nom et prénom</ACompleter>.</p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (
            <a href="https://vercel.com" target="_blank" rel="noreferrer">vercel.com</a>).
          </p>

          <h2>Données personnelles</h2>
          <p>
            Les informations saisies sur le site (inscription, newsletter, formulaire de contact) sont
            enregistrées dans une base de données gérée par Supabase (
            <a href="https://supabase.com" target="_blank" rel="noreferrer">supabase.com</a>), région{" "}
            <ACompleter>région du projet Supabase, ex. Europe (Francfort)</ACompleter>.
          </p>
          <p>
            Elles servent uniquement à gérer votre compte, à envoyer la gazette du Businesseur et à
            répondre à vos messages. Elles ne sont ni vendues ni cédées.
          </p>
          <p>
            Conformément au RGPD, vous pouvez demander l&apos;accès, la correction ou la suppression de
            vos données en écrivant à <ACompleter>adresse e-mail de contact</ACompleter>. Vous pouvez
            aussi vous désinscrire de la gazette à tout moment.
          </p>

          <h2>Cookies</h2>
          <p>
            Le site utilise uniquement le stockage nécessaire pour garder votre session ouverte après
            connexion. Aucun cookie publicitaire n&apos;est utilisé.
          </p>

          <div className="page-texte__liens">
            <Link href="/conditions" className="lien-fleche">Conditions d&apos;utilisation et droits</Link>
            <Link href="/" className="lien-fleche">Retour à l&apos;accueil</Link>
          </div>
        </article>
      </main>
    </>
  );
}
