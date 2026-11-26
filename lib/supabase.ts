import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Vrai seulement si le fichier .env contient de vraies clés (pas les "xxxx" du modèle).
export const supabaseConfigure =
  !!supabaseUrl && !!supabaseKey && !supabaseUrl.includes("xxxx") && !supabaseKey.includes("xxxx");

if (!supabaseConfigure && typeof window !== "undefined") {
  console.warn(
    "Supabase n'est pas configuré : remplis NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY dans le fichier .env, puis relance npm run dev.",
  );
}

// Le site s'affiche même sans clés : on crée alors un client "vide" qui
// renverra une erreur claire au moment d'envoyer un formulaire.
export const supabase: SupabaseClient = createClient(
  supabaseConfigure ? supabaseUrl! : "https://exemple.supabase.co",
  supabaseConfigure ? supabaseKey! : "cle-manquante",
);

export const MESSAGE_NON_CONFIGURE =
  "La base de données n'est pas encore branchée : ajoute tes clés Supabase dans le fichier .env.";
