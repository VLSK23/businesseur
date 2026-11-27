"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Fee from "@/components/Fee";
import { MESSAGE_ACCUEIL, repondreFairy, type ReponseFairy } from "@/lib/fairy";
import { supabase, supabaseConfigure } from "@/lib/supabase";

type Message = { id: number; auteur: "fairy" | "moi"; reponse?: ReponseFairy; texte?: string };

// Chat entre Fairy et le visiteur.
// Les réponses viennent de repondreFairy() (lib/fairy.ts) ; chaque message du visiteur
// est enregistré dans la table fairy_messages de Supabase.
export default function ChatFairy() {
  const [messages, setMessages] = useState<Message[]>([{ id: 0, auteur: "fairy", reponse: MESSAGE_ACCUEIL }]);
  const [saisie, setSaisie] = useState("");
  const [ecrit, setEcrit] = useState(false); // Fairy est en train d'écrire
  const sessionId = useRef<string | null>(null);
  const fil = useRef<HTMLDivElement>(null);
  const prochainId = useRef(1);

  useEffect(() => {
    sessionId.current = crypto.randomUUID();
  }, []);

  // Fait défiler le fil jusqu'au dernier message
  useEffect(() => {
    fil.current?.scrollTo({ top: fil.current.scrollHeight, behavior: "smooth" });
  }, [messages, ecrit]);

  function envoyer(texte: string) {
    const contenu = texte.trim().slice(0, 1000);
    if (!contenu || ecrit) return;
    const reponse = repondreFairy(contenu);

    setMessages((m) => [...m, { id: prochainId.current++, auteur: "moi", texte: contenu }]);
    setSaisie("");
    setEcrit(true);

    // Enregistre le message dans Supabase (sans bloquer le chat si ça échoue)
    if (supabaseConfigure && sessionId.current) {
      supabase
        .from("fairy_messages")
        .insert({ session_id: sessionId.current, contenu, sujet: reponse.sujet })
        .then(({ error }) => {
          if (error) console.warn("Message non enregistré :", error.message);
        });
    }

    // Petite pause « Fairy écrit… » avant sa réponse
    const delai = Math.min(1400, 500 + reponse.texte.length * 6);
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: prochainId.current++, auteur: "fairy", reponse }]);
      setEcrit(false);
    }, delai);
  }

  function soumettre(e: FormEvent) {
    e.preventDefault();
    envoyer(saisie);
  }

  const derniere = [...messages].reverse().find((m) => m.auteur === "fairy")?.reponse;

  return (
    <div className="fairy-chat">
      <div className="fairy-chat__entete">
        <Fee className="fairy-chat__avatar" />
        <div>
          <strong>Fairy</strong>
          <small><span className="pastille" /> en ligne · votre fée guide</small>
        </div>
      </div>

      <div className="fairy-chat__fil" ref={fil} aria-live="polite">
        {messages.map((m) =>
          m.auteur === "moi" ? (
            <p key={m.id} className="fairy-bulle fairy-bulle--moi">{m.texte}</p>
          ) : (
            <div key={m.id} className="fairy-bulle fairy-bulle--fee">
              <p>{m.reponse?.texte}</p>
              {m.reponse?.liens && (
                <div className="fairy-bulle__liens">
                  {m.reponse.liens.map((l) => (
                    <Link key={l.href} href={l.href} className="fairy-lien">{l.texte} →</Link>
                  ))}
                </div>
              )}
            </div>
          ),
        )}
        {ecrit && (
          <p className="fairy-bulle fairy-bulle--fee fairy-bulle--ecrit" aria-label="Fairy écrit">
            <i /><i /><i />
          </p>
        )}
      </div>

      {!ecrit && derniere?.suggestions && (
        <div className="fairy-chat__suggestions">
          {derniere.suggestions.map((s) => (
            <button key={s} type="button" onClick={() => envoyer(s)}>{s}</button>
          ))}
        </div>
      )}

      <form className="fairy-chat__saisie" onSubmit={soumettre}>
        <label htmlFor="fairy-saisie" className="visuellement-cache">Votre message à Fairy</label>
        <input
          id="fairy-saisie"
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          maxLength={1000}
          autoComplete="off"
          placeholder="Écrivez à Fairy…"
        />
        <button type="submit" className="bouton bouton--or" disabled={!saisie.trim() || ecrit}>Envoyer</button>
      </form>
    </div>
  );
}
