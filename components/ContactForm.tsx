"use client";

import { useState, type FormEvent } from "react";
import { MESSAGE_NON_CONFIGURE, supabase, supabaseConfigure } from "@/lib/supabase";

// Formulaire "Contactez-nous" : enregistre le message dans la table contact_messages.
export default function ContactForm() {
  const [envoi, setEnvoi] = useState(false);
  const [retour, setRetour] = useState<{ ok: boolean; texte: string } | null>(null);

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!supabaseConfigure) return setRetour({ ok: false, texte: MESSAGE_NON_CONFIGURE });
    const form = e.currentTarget;
    const data = new FormData(form);
    setEnvoi(true);
    setRetour(null);

    const { error } = await supabase.from("contact_messages").insert({
      nom: String(data.get("nom") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      profil: String(data.get("profil") ?? "autre"),
      message: String(data.get("message") ?? "").trim(),
    });
    setEnvoi(false);

    if (error) {
      setRetour({ ok: false, texte: "Le message n'est pas parti. Réessayez dans un instant." });
    } else {
      setRetour({ ok: true, texte: "Merci ! Votre message est bien arrivé, nous vous répondons vite." });
      form.reset();
    }
  }

  return (
    <form className="formulaire apparition" onSubmit={envoyer}>
      <h2>Contactez-nous</h2>
      <div className="formulaire__ligne">
        <div className="champ">
          <label htmlFor="nom">Nom complet</label>
          <input type="text" id="nom" name="nom" placeholder="Sarah Martin" required autoComplete="name" />
        </div>
        <div className="champ">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" placeholder="sarah@exemple.fr" required autoComplete="email" />
        </div>
      </div>
      <div className="champ">
        <label htmlFor="profil">Vous êtes</label>
        <select id="profil" name="profil" defaultValue="entrepreneur">
          <option value="entrepreneur">Entrepreneur</option>
          <option value="mentor">Mentor</option>
          <option value="investisseur">Investisseur</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="champ">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={4} placeholder="Parlez-nous de votre projet..." required />
      </div>
      {retour && (
        <p className={`message-form ${retour.ok ? "message-form--ok" : "message-form--erreur"}`} role="status">
          {retour.texte}
        </p>
      )}
      <button type="submit" className="bouton bouton--or bouton--grand" disabled={envoi}>
        {envoi ? "Envoi…" : "Envoyer le message"}
      </button>
    </form>
  );
}
