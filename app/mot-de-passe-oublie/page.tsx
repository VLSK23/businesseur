"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import EnteteSimple from "@/components/EnteteSimple";
import { MESSAGE_NON_CONFIGURE, supabase, supabaseConfigure } from "@/lib/supabase";

// Mot de passe oublié : Supabase envoie un lien de réinitialisation par e-mail.
// Le lien ouvre la page /nouveau-mot-de-passe.
export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);

  // Reprend l'e-mail déjà tapé sur la page de connexion (?email=...)
  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("email");
    if (e) setEmail(e);
  }, []);

  async function envoyer(e: FormEvent) {
    e.preventDefault();
    if (!supabaseConfigure) return setErreur(MESSAGE_NON_CONFIGURE);
    setEnvoi(true);
    setErreur(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${window.location.origin}/nouveau-mot-de-passe`,
    });
    setEnvoi(false);
    // Trop de demandes d'affilée : on le dit. Sinon, même message que l'adresse existe ou non
    // (on ne révèle jamais si un e-mail est inscrit).
    if (error && (error.status === 429 || /rate limit|security purposes/i.test(error.message))) {
      return setErreur("Trop de demandes d'affilée. Patientez une minute puis réessayez.");
    }
    setEnvoye(true);
  }

  return (
    <>
      <EnteteSimple />
      <main className="auth">
        <form className="formulaire" onSubmit={envoyer}>
          <p className="surtitre surtitre--sombre">Espace membre</p>
          <h2>Mot de passe oublié ?</h2>

          {envoye ? (
            <>
              <p className="message-form message-form--ok" role="status">
                Si un compte existe avec l&apos;adresse <strong>{email}</strong>, vous allez recevoir un e-mail
                avec un lien pour choisir un nouveau mot de passe.
              </p>
              <p className="auth__intro">
                Pensez à regarder dans vos courriers indésirables. Le lien n&apos;est valable qu&apos;une heure.
              </p>
              <Link href="/connexion" className="bouton bouton--or bouton--grand">Retour à la connexion</Link>
            </>
          ) : (
            <>
              <p className="auth__intro">
                Indiquez l&apos;adresse e-mail de votre compte : nous vous envoyons un lien pour choisir un nouveau mot de passe.
              </p>
              <div className="champ">
                <label htmlFor="oubli-email">E-mail</label>
                <input
                  id="oubli-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="sarah@exemple.fr"
                />
              </div>
              {erreur && <p className="message-form message-form--erreur" role="alert">{erreur}</p>}
              <button type="submit" className="bouton bouton--or bouton--grand" disabled={envoi}>
                {envoi ? "Un instant…" : "Recevoir le lien"}
              </button>
              <p className="auth__bascule">
                Vous vous en souvenez ? <Link href="/connexion" className="auth__lien">Se connecter</Link>
              </p>
            </>
          )}
        </form>
      </main>
    </>
  );
}
