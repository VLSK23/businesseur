"use client";

import { useState, type FormEvent } from "react";
import { MESSAGE_NON_CONFIGURE, supabase, supabaseConfigure } from "@/lib/supabase";

// Formulaire "La gazette du Businesseur" : enregistre l'e-mail dans la table newsletter_subscribers.
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [retour, setRetour] = useState<{ ok: boolean; texte: string } | null>(null);

  async function envoyer(e: FormEvent) {
    e.preventDefault();
    if (!supabaseConfigure) return setRetour({ ok: false, texte: MESSAGE_NON_CONFIGURE });
    setEnvoi(true);
    setRetour(null);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });
    setEnvoi(false);

    if (error && error.code === "23505") {
      setRetour({ ok: true, texte: "Vous êtes déjà abonné·e à la gazette." });
    } else if (error) {
      setRetour({ ok: false, texte: "Oups, l'inscription a échoué. Réessayez dans un instant." });
    } else {
      setRetour({ ok: true, texte: "Merci ! Vous recevrez la prochaine gazette." });
      setEmail("");
    }
  }

  return (
    <>
      <form className="newsletter__form" onSubmit={envoyer}>
        <label htmlFor="nl-email" className="visuellement-cache">Votre e-mail</label>
        <input
          type="email"
          id="nl-email"
          name="email"
          placeholder="votre@email.fr"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bouton bouton--nuit" disabled={envoi}>
          {envoi ? "…" : "S'abonner"}
        </button>
      </form>
      {retour && (
        <p className={`message-form ${retour.ok ? "message-form--ok" : "message-form--erreur"}`} role="status">
          {retour.texte}
        </p>
      )}
    </>
  );
}
