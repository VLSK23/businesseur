import EntetePages from "@/components/EntetePages";
import ChatFairy from "@/components/ChatFairy";

export const metadata = {
  title: "Rencontrer Fairy | Businesseur",
  description: "Discutez avec Fairy, la fée guide de Businesseur : elle vous oriente vers les bons projets et les bonnes personnes.",
};

export default function FairyPage() {
  return (
    <>
      <EntetePages />
      <main className="auth fairy-page">
        <div className="fairy-page__contenu">
          <header className="fairy-page__tete">
            <p className="surtitre">Rencontrer Fairy</p>
            <h1>Votre fée guide dans l&apos;oasis</h1>
          </header>
          <ChatFairy />
          <p className="fairy-page__note">
            Fairy répond avec des réponses préparées par l&apos;équipe. Vos messages nous aident à l&apos;améliorer.
          </p>
        </div>
      </main>
    </>
  );
}
