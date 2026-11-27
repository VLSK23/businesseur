"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import EnteteSimple from "@/components/EnteteSimple";
import ListeDeroulanteMultiple from "@/components/ListeDeroulanteMultiple";
import { SPECIALITES_MENTOR, STADES_PROJET } from "@/lib/options";
import { supabase, supabaseConfigure } from "@/lib/supabase";

type Profil = {
  email: string | null;
  full_name: string | null;
  phone: string | null;
  profil: string | null;
  stade_projet: string | null;
  specialites: string[] | null;
};

const LIBELLES: Record<string, string> = {
  entrepreneur: "Entrepreneur",
  mentor: "Mentor",
  investisseur: "Investisseur",
};

export default function ComptePage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [profil, setProfil] = useState<Profil | null>(null);
  const [envoi, setEnvoi] = useState(false);
  const [retour, setRetour] = useState<{ ok: boolean; texte: string } | null>(null);

  useEffect(() => {
    async function charger() {
      if (!supabaseConfigure) return router.replace("/connexion");
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      if (!user) return router.replace("/connexion");
      setUserId(user.id);
      const { data: p } = await supabase
        .from("profiles")
        .select("email, full_name, phone, profil, stade_projet, specialites")
        .eq("id", user.id)
        .single();
      setProfil(
        p ?? { email: user.email ?? null, full_name: null, phone: null, profil: "entrepreneur", stade_projet: null, specialites: [] },
      );
    }
    charger();
  }, [router]);

  async function enregistrer(e: FormEvent) {
    e.preventDefault();
    if (!userId || !profil) return;
    setEnvoi(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profil.full_name,
        phone: profil.phone,
        profil: profil.profil,
        stade_projet: profil.profil === "entrepreneur" ? profil.stade_projet || null : null,
        specialites: profil.profil === "mentor" ? profil.specialites ?? [] : [],
      })
      .eq("id", userId);
    setEnvoi(false);
    setRetour(error ? { ok: false, texte: "Erreur : " + error.message } : { ok: true, texte: "Profil enregistré." });
  }

  async function deconnexion() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      <EnteteSimple>
        <button type="button" onClick={deconnexion} className="bouton bouton--verre">
          Se déconnecter
        </button>
      </EnteteSimple>
      <main className="auth">
        {!profil ? (
          <p className="surtitre">Chargement…</p>
        ) : (
          <form className="formulaire" onSubmit={enregistrer}>
            <p className="surtitre surtitre--sombre">
              Mon espace {profil.profil ? LIBELLES[profil.profil]?.toLowerCase() : ""}
            </p>
            <h2>Bonjour{profil.full_name ? `, ${profil.full_name}` : ""}</h2>
            <p className="auth__intro">{profil.email}</p>

            <div className="champ">
              <label htmlFor="nom">Nom complet</label>
              <input id="nom" value={profil.full_name ?? ""} onChange={(e) => setProfil({ ...profil, full_name: e.target.value })} />
            </div>
            <div className="champ">
              <label htmlFor="tel">Téléphone</label>
              <input id="tel" type="tel" value={profil.phone ?? ""} onChange={(e) => setProfil({ ...profil, phone: e.target.value })} />
            </div>
            <div className="champ">
              <label htmlFor="profil">Je suis</label>
              <select id="profil" value={profil.profil ?? "entrepreneur"} onChange={(e) => setProfil({ ...profil, profil: e.target.value })}>
                <option value="entrepreneur">Entrepreneur</option>
                <option value="mentor">Mentor</option>
                <option value="investisseur">Investisseur</option>
              </select>
            </div>

            {profil.profil === "entrepreneur" && (
              <div className="champ">
                <label htmlFor="stade">À quel stade de votre projet êtes-vous ?</label>
                <select
                  id="stade"
                  value={profil.stade_projet ?? ""}
                  onChange={(e) => setProfil({ ...profil, stade_projet: e.target.value })}
                >
                  <option value="" disabled>Choisissez une étape…</option>
                  {STADES_PROJET.map((s) => (
                    <option key={s.valeur} value={s.valeur}>{s.libelle}</option>
                  ))}
                </select>
              </div>
            )}

            {profil.profil === "mentor" && (
              <ListeDeroulanteMultiple
                label="Quelles spécialités souhaitez-vous accompagner ?"
                placeholder="Choisissez une ou plusieurs spécialités…"
                options={SPECIALITES_MENTOR}
                valeurs={profil.specialites ?? []}
                onChange={(v) => setProfil({ ...profil, specialites: v })}
              />
            )}

            {retour && (
              <p className={`message-form ${retour.ok ? "message-form--ok" : "message-form--erreur"}`} role="status">
                {retour.texte}
              </p>
            )}
            <button type="submit" className="bouton bouton--or bouton--grand" disabled={envoi}>
              {envoi ? "Enregistrement…" : "Enregistrer"}
            </button>
          </form>
        )}
      </main>
    </>
  );
}
