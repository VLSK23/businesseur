"use client";

import { useState, type FormEvent } from "react";
import { MESSAGE_NON_CONFIGURE, supabase, supabaseConfigure } from "@/lib/supabase";

// Inscription à la newsletter d'UN projet : enregistre l'e-mail et le projet
// dans la table projet_abonnes de Supabase.
export default function SuiviProjetForm({ projet, nomProjet }: { projet: string; nomProjet: string }) {
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [retour, setRetour] = useState<{ ok: boolean; texte: string } | null>(null);

  async function envoyer(e: FormEvent) {
    e.preventDefault();
    if (!supabaseConfigure) return setRetour({ ok: false, texte: MESSAGE_NON_CONFIGURE });
    setEnvoi(true);
    setRetour(null);
    const { error } = await supabase
      .from("projet_abonnes")
      .insert({ projet, email: email.trim().toLowerCase(), nom: nom.trim() || null });
    setEnvoi(false);

    if (error && error.code === "23505") {
      setRetour({ ok: true, texte: `Vous suivez déjà ${nomProjet}.` });
    } else if (error) {
      setRetour({ ok: false, texte: "Oups, l'inscription a échoué. Réessayez dans un instant." });
    } else {
      setRetour({ ok: true, texte: `Merci ! Vous recevrez les nouvelles de ${nomProjet}.` });
      setEmail("");
      setNom("");
    }
  }

  return (
    <form className="formulaire" onSubmit={envoyer}>
      <p className="surtitre surtitre--sombre">Newsletter du projet</p>
      <h2>Se tenir informé de {nomProjet}</h2>
      <p className="auth__intro">
        Prototype, levée de fonds, lancement : recevez chaque étape du projet par e-mail.
        Un message par mois au maximum.
      </p>
      <div className="champ">
        <label htmlFor="suivi-nom">Prénom (facultatif)</label>
        <input id="suivi-nom" value={nom} onChange={(e) => setNom(e.target.value)} autoComplete="given-name" placeholder="Sarah" />
      </div>
      <div className="champ">
        <label htmlFor="suivi-email">E-mail</label>
        <input
          id="suivi-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          placeholder="sarah@exemple.fr"
        />
      </div>
      {retour && (
        <p className={`message-form ${retour.ok ? "message-form--ok" : "message-form--erreur"}`} role="status">
          {retour.texte}
        </p>
      )}
      <button type="submit" className="bouton bouton--or bouton--grand" disabled={envoi}>
        {envoi ? "Un instant…" : "Je veux être informé"}
      </button>
    </form>
  );
}
