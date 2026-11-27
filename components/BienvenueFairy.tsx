"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Fee from "@/components/Fee";
import { LIEN_APPLICATION } from "@/lib/application";

// Fenêtre qui s'ouvre juste après une inscription réussie :
// Fairy souhaite la bienvenue au nouveau Businesseur et l'invite à télécharger l'application.
export default function BienvenueFairy({
  prenom,
  confirmationEmail,
  onFermer,
}: {
  prenom: string;
  confirmationEmail: boolean; // true si Supabase demande de cliquer sur le lien reçu par e-mail
  onFermer: () => void;
}) {
  const bouton = useRef<HTMLButtonElement>(null);

  // Place le focus dans la fenêtre et permet de la fermer avec Échap
  useEffect(() => {
    bouton.current?.focus();
    const touche = (e: KeyboardEvent) => e.key === "Escape" && onFermer();
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [onFermer]);

  return (
    <div className="bienvenue" role="dialog" aria-modal="true" aria-labelledby="bienvenue-titre">
      <div className="bienvenue__fenetre">
        <Fee className="bienvenue__fee" />

        <div className="bienvenue__bulle">
          <p className="surtitre surtitre--sombre">Fairy, votre fée guide</p>
          <h2 id="bienvenue-titre">Bienvenue dans l&apos;oasis{prenom ? `, ${prenom}` : ""} !</h2>
          <p>
            Je suis Fairy. Vous êtes maintenant un Businesseur : je vais vous aider à trouver les bonnes
            rencontres pour faire grandir votre projet.
          </p>
          {confirmationEmail && (
            <p className="bienvenue__note">
              ✉️ Dernière étape : cliquez sur le lien que je viens de vous envoyer par e-mail pour activer votre compte.
            </p>
          )}
        </div>

        <div className="bienvenue__appli">
          <Link href={LIEN_APPLICATION} className="bienvenue__icone" aria-label="Télécharger l'application Businesseur">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Images/logo-businesseur.png" alt="" />
          </Link>
          <div>
            <strong>Emportez l&apos;oasis partout</strong>
            <p>Touchez le palmier pour télécharger l&apos;application Businesseur.</p>
          </div>
        </div>

        <button ref={bouton} type="button" className="bouton bouton--or bouton--grand" onClick={onFermer}>
          {confirmationEmail ? "J'ai compris" : "Entrer dans mon espace"}
        </button>
      </div>
    </div>
  );
}
