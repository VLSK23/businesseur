import Link from "next/link";
import EntetePages from "@/components/EntetePages";
import Fee from "@/components/Fee";
import NewsletterForm from "@/components/NewsletterForm";
import { LIENS_STORES } from "@/lib/application";

export const metadata = {
  title: "L'application | Businesseur",
  description: "Téléchargez l'application Businesseur et emportez l'oasis partout avec vous.",
};

// Un badge de store : cliquable si le lien existe (lib/application.ts), sinon « bientôt disponible »
function Store({ lien, petit, nom }: { lien: string; petit: string; nom: string }) {
  if (lien) {
    return (
      <a href={lien} className="store" target="_blank" rel="noopener noreferrer">
        <span><small>{petit}</small><strong>{nom}</strong></span>
      </a>
    );
  }
  return (
    <span className="store store--bientot" aria-disabled="true">
      <span><small>Bientôt sur</small><strong>{nom}</strong></span>
    </span>
  );
}

export default function ApplicationPage() {
  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <div className="conteneur application">
            <div>
              <span className="application__icone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Images/logo-businesseur.png" alt="" />
              </span>
              <p className="surtitre surtitre--sombre">L&apos;application Businesseur</p>
              <h1>Emportez l&apos;oasis partout avec vous</h1>
              <p>
                Discutez avec Fairy, recevez vos mises en relation, suivez vos projets préférés et lisez
                La Gazette du Businesseur, où que vous soyez.
              </p>

              <div className="application__stores">
                <Store lien={LIENS_STORES.appStore} petit="Télécharger dans" nom="l'App Store" />
                <Store lien={LIENS_STORES.googlePlay} petit="Disponible sur" nom="Google Play" />
              </div>

              {!(LIENS_STORES.appStore || LIENS_STORES.googlePlay) && (
                <div className="newsletter" style={{ marginTop: 28 }}>
                  <h2>Soyez prévenu·e de la sortie</h2>
                  <p>Laissez votre e-mail : Fairy vous écrira dès que l&apos;application sera disponible.</p>
                  <NewsletterForm />
                </div>
              )}

              <p style={{ marginTop: 24 }}>
                <Link href="/compte" className="lien-fleche">Continuer sur le site</Link>
              </p>
            </div>

            <div className="application__telephone" aria-hidden="true">
              <div className="application__ecran">
                <Fee className="fee-mini" />
                <p>Bonjour ! Je suis Fairy.<br />Prête à trouver votre mentor ?</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
