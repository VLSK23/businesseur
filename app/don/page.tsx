import Link from "next/link";
import EnteteSimple from "@/components/EnteteSimple";

export const metadata = {
  title: "Faire un don | Businesseur",
  description: "Soutenez Businesseur et aidez de nouveaux projets à trouver leur oasis.",
};

export default function DonPage() {
  return (
    <>
      <EnteteSimple />
      <main className="auth">
        <div className="formulaire">
          <p className="surtitre surtitre--sombre">Faire un don</p>
          <h2>Aidez une idée à trouver son oasis</h2>
          <p className="auth__intro">
            Chaque don finance l&apos;accompagnement gratuit de porteurs de projets qui n&apos;ont
            ni réseau ni capital de départ : sessions de mentorat, ateliers et accès à Fairy.
          </p>
          <p className="auth__intro">
            Le paiement en ligne arrive bientôt. En attendant, écrivez-nous et nous vous
            expliquerons comment soutenir Businesseur.
          </p>
          <Link href="/#contact" className="bouton bouton--or bouton--grand">
            Nous écrire pour faire un don
          </Link>
          <p className="auth__bascule">
            <Link href="/" className="lien-fleche">Retour à l&apos;accueil</Link>
          </p>
        </div>
      </main>
    </>
  );
}
