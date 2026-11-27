import Link from "next/link";
import ACompleter from "@/components/ACompleter";
import EnteteSimple from "@/components/EnteteSimple";

export const metadata = {
  title: "Conditions d'utilisation et droits | Businesseur",
  description: "Conditions générales d'utilisation et propriété intellectuelle du site Businesseur.",
};

export default function Conditions() {
  return (
    <>
      <EnteteSimple />
      <main className="auth">
        <article className="page-texte">
          <p className="surtitre surtitre--sombre">Tous droits réservés</p>
          <h1>Conditions d&apos;utilisation et droits</h1>
          <p className="page-texte__avertissement">
            Modèle de page : relisez et complétez les zones surlignées avant la mise en ligne définitive.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            © 2026 Businesseur. Tous droits réservés. Les textes, le logo, les illustrations, les images
            et la mise en page de ce site appartiennent à <ACompleter>nom du titulaire des droits</ACompleter>.
          </p>
          <p>
            Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.
          </p>

          <h2>Objet de la plateforme</h2>
          <p>
            Businesseur met en relation des entrepreneurs, des mentors et des investisseurs. La
            plateforme facilite les rencontres mais ne garantit ni le financement ni le résultat d&apos;un
            projet.
          </p>

          <h2>Compte membre</h2>
          <ul>
            <li>L&apos;inscription est gratuite et réservée aux personnes majeures.</li>
            <li>Vous vous engagez à donner des informations exactes et à garder votre mot de passe secret.</li>
            <li>Vous pouvez modifier votre profil à tout moment depuis « Mon compte ».</li>
            <li>
              Pour supprimer votre compte, écrivez à <ACompleter>adresse e-mail de contact</ACompleter>.
            </li>
          </ul>

          <h2>Bonne conduite</h2>
          <p>
            Les échanges doivent rester respectueux. Businesseur peut suspendre un compte en cas
            d&apos;abus, de fausse identité ou de contenu illicite.
          </p>

          <h2>Fairy, l&apos;assistante IA</h2>
          <p>
            Les recommandations de Fairy sont des suggestions. Elles ne remplacent pas un conseil
            juridique, financier ou fiscal professionnel.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Ces conditions sont soumises au droit français. Dernière mise à jour :{" "}
            <ACompleter>date</ACompleter>.
          </p>

          <div className="page-texte__liens">
            <Link href="/mentions-legales" className="lien-fleche">Mentions légales</Link>
            <Link href="/" className="lien-fleche">Retour à l&apos;accueil</Link>
          </div>
        </article>
      </main>
    </>
  );
}
