"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import BienvenueFairy from "@/components/BienvenueFairy";
import EnteteSimple from "@/components/EnteteSimple";
import ListeDeroulanteMultiple from "@/components/ListeDeroulanteMultiple";
import { SPECIALITES_MENTOR, STADES_PROJET } from "@/lib/options";
import { MESSAGE_NON_CONFIGURE, supabase, supabaseConfigure } from "@/lib/supabase";

type Mode = "connexion" | "inscription";
type Profil = "entrepreneur" | "mentor" | "investisseur";

const PROFILS: { valeur: Profil; libelle: string }[] = [
  { valeur: "entrepreneur", libelle: "Entrepreneur" },
  { valeur: "mentor", libelle: "Mentor" },
  { valeur: "investisseur", libelle: "Investisseur" },
];

export default function ConnexionPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("connexion");
  const [profil, setProfil] = useState<Profil>("entrepreneur");
  const [nom, setNom] = useState("");
  const [stade, setStade] = useState("");
  const [specialites, setSpecialites] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  // Après une inscription réussie : Fairy apparaît (avec ou sans confirmation par e-mail)
  const [bienvenue, setBienvenue] = useState<{ confirmationEmail: boolean } | null>(null);

  useEffect(() => {
    // Lit l'adresse, ex. /connexion?mode=inscription&profil=mentor
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "inscription") setMode("inscription");
    const p = params.get("profil");
    if (p === "entrepreneur" || p === "mentor" || p === "investisseur") setProfil(p);

    if (!supabaseConfigure) return;

    // Déjà connecté·e ? On va directement sur « Mon compte ».
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/compte");
    });
  }, [router]);

  async function envoyer(e: FormEvent) {
    e.preventDefault();
    if (!supabaseConfigure) return setErreur(MESSAGE_NON_CONFIGURE);
    setEnvoi(true);
    setErreur(null);
    setInfo(null);

    if (mode === "connexion") {
      const { error } = await supabase.auth.signInWithPassword({ email, password: motDePasse });
      setEnvoi(false);
      if (error) return setErreur(traduire(error.message));
      router.push("/compte");
      return;
    }

    if (profil === "entrepreneur" && !stade) {
      setEnvoi(false);
      return setErreur("Indiquez à quel stade est votre projet.");
    }
    if (profil === "mentor" && specialites.length === 0) {
      setEnvoi(false);
      return setErreur("Choisissez au moins une spécialité à accompagner.");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password: motDePasse,
      options: {
        data: {
          full_name: nom,
          profil,
          stade_projet: profil === "entrepreneur" ? stade : null,
          specialites: profil === "mentor" ? specialites : [],
        },
        emailRedirectTo: `${window.location.origin}/compte`,
      },
    });
    setEnvoi(false);
    if (error) return setErreur(traduire(error.message));
    setBienvenue({ confirmationEmail: !data.session });
  }

  function fermerBienvenue() {
    if (bienvenue && !bienvenue.confirmationEmail) {
      router.push("/compte");
    } else {
      setInfo("Compte créé ! Cliquez sur le lien reçu par e-mail pour l'activer, puis connectez-vous.");
      setMode("connexion");
    }
    setBienvenue(null);
  }

  return (
    <>
      <EnteteSimple />
      <main className="auth">
        <form className="formulaire" onSubmit={envoyer}>
          <p className="surtitre surtitre--sombre">Espace membre</p>
          <h2>{mode === "connexion" ? "Bon retour dans l'oasis" : "Rejoignez l'oasis"}</h2>
          <p className="auth__intro">
            {mode === "connexion"
              ? "Connectez-vous pour retrouver vos rencontres et Fairy."
              : "Inscription gratuite, sans engagement. Fairy vous guide dès la première minute."}
          </p>

          {mode === "inscription" && (
            <>
              <fieldset className="choix-profil">
                <legend>Je suis</legend>
                {PROFILS.map((p) => (
                  <label key={p.valeur}>
                    <input
                      type="radio"
                      name="profil"
                      value={p.valeur}
                      checked={profil === p.valeur}
                      onChange={() => setProfil(p.valeur)}
                    />
                    {p.libelle}
                  </label>
                ))}
              </fieldset>

              {profil === "entrepreneur" && (
                <div className="champ">
                  <label htmlFor="stade">À quel stade de votre projet êtes-vous ?</label>
                  <select id="stade" value={stade} onChange={(e) => setStade(e.target.value)} required>
                    <option value="" disabled>Choisissez une étape…</option>
                    {STADES_PROJET.map((s) => (
                      <option key={s.valeur} value={s.valeur}>{s.libelle}</option>
                    ))}
                  </select>
                </div>
              )}

              {profil === "mentor" && (
                <ListeDeroulanteMultiple
                  label="Quelles spécialités souhaitez-vous accompagner ?"
                  placeholder="Choisissez une ou plusieurs spécialités…"
                  options={SPECIALITES_MENTOR}
                  valeurs={specialites}
                  onChange={setSpecialites}
                />
              )}

              <div className="champ">
                <label htmlFor="nom">Nom complet</label>
                <input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required autoComplete="name" placeholder="Sarah Martin" />
              </div>
            </>
          )}

          <div className="champ">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" placeholder="sarah@exemple.fr" />
          </div>
          <div className="champ">
            <label htmlFor="mdp">Mot de passe</label>
            <input
              id="mdp"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "connexion" ? "current-password" : "new-password"}
            />
          </div>

          {erreur && <p className="message-form message-form--erreur" role="alert">{erreur}</p>}
          {info && <p className="message-form message-form--ok" role="status">{info}</p>}

          <button type="submit" className="bouton bouton--or bouton--grand" disabled={envoi}>
            {envoi ? "Un instant…" : mode === "connexion" ? "Se connecter" : "Créer mon compte"}
          </button>

          <p className="auth__bascule">
            {mode === "connexion" ? "Pas encore de compte ?" : "Déjà membre ?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "connexion" ? "inscription" : "connexion");
                setErreur(null);
              }}
            >
              {mode === "connexion" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </form>
      </main>
      {bienvenue && (
        <BienvenueFairy
          prenom={nom.trim().split(/\s+/)[0] ?? ""}
          confirmationEmail={bienvenue.confirmationEmail}
          onFermer={fermerBienvenue}
        />
      )}
    </>
  );
}

function traduire(message: string) {
  if (message.includes("Invalid login credentials")) return "E-mail ou mot de passe incorrect.";
  if (message.includes("Email not confirmed")) return "Confirmez d'abord votre e-mail grâce au lien reçu.";
  if (message.includes("already registered")) return "Un compte existe déjà avec cet e-mail.";
  if (message.includes("Password should be")) return "Le mot de passe doit faire au moins 6 caractères.";
  return message;
}
