"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import EnteteSimple from "@/components/EnteteSimple";
import { MESSAGE_NON_CONFIGURE, supabase, supabaseConfigure } from "@/lib/supabase";

type Etat = "verification" | "pret" | "invalide";

// Page ouverte par le lien de l'e-mail « Mot de passe oublié » :
// Supabase reconnaît le lien et connecte temporairement la personne pour qu'elle choisisse un nouveau mot de passe.
export default function NouveauMotDePassePage() {
  const router = useRouter();
  const [etat, setEtat] = useState<Etat>("verification");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseConfigure) {
      setErreur(MESSAGE_NON_CONFIGURE);
      setEtat("invalide");
      return;
    }
    // Lien expiré ou déjà utilisé : Supabase l'indique dans l'adresse (#error=...)
    if (window.location.hash.includes("error")) {
      setEtat("invalide");
      return;
    }
    const { data } = supabase.auth.onAuthStateChange((evenement, session) => {
      if (evenement === "PASSWORD_RECOVERY" || session) setEtat("pret");
    });
    supabase.auth.getSession().then(({ data: d }) => {
      if (d.session) setEtat("pret");
    });
    // Sans session au bout de quelques secondes, le lien n'est pas valide
    const minuteur = window.setTimeout(() => setEtat((e) => (e === "verification" ? "invalide" : e)), 4000);
    return () => {
      data.subscription.unsubscribe();
      window.clearTimeout(minuteur);
    };
  }, []);

  async function enregistrer(e: FormEvent) {
    e.preventDefault();
    setErreur(null);
    if (motDePasse.length < 6) return setErreur("Le mot de passe doit faire au moins 6 caractères.");
    if (motDePasse !== confirmation) return setErreur("Les deux mots de passe ne sont pas identiques.");
    setEnvoi(true);
    const { error } = await supabase.auth.updateUser({ password: motDePasse });
    setEnvoi(false);
    if (error) {
      if (/different from the old/i.test(error.message)) return setErreur("Choisissez un mot de passe différent de l'ancien.");
      return setErreur("Le mot de passe n'a pas pu être changé. Redemandez un lien et réessayez.");
    }
    router.push("/compte");
  }

  return (
    <>
      <EnteteSimple />
      <main className="auth">
        <form className="formulaire" onSubmit={enregistrer}>
          <p className="surtitre surtitre--sombre">Espace membre</p>
          <h2>Choisir un nouveau mot de passe</h2>

          {etat === "verification" && <p className="auth__intro">Vérification du lien…</p>}

          {etat === "invalide" && (
            <>
              <p className="message-form message-form--erreur" role="alert">
                {erreur ?? "Ce lien a expiré ou a déjà été utilisé."}
              </p>
              <Link href="/mot-de-passe-oublie" className="bouton bouton--or bouton--grand">Recevoir un nouveau lien</Link>
            </>
          )}

          {etat === "pret" && (
            <>
              <div className="champ">
                <label htmlFor="nouveau-mdp">Nouveau mot de passe</label>
                <input id="nouveau-mdp" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required minLength={6} autoComplete="new-password" />
              </div>
              <div className="champ">
                <label htmlFor="confirmation-mdp">Confirmez le mot de passe</label>
                <input id="confirmation-mdp" type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} required minLength={6} autoComplete="new-password" />
              </div>
              {erreur && <p className="message-form message-form--erreur" role="alert">{erreur}</p>}
              <button type="submit" className="bouton bouton--or bouton--grand" disabled={envoi}>
                {envoi ? "Un instant…" : "Enregistrer et me connecter"}
              </button>
            </>
          )}
        </form>
      </main>
    </>
  );
}
