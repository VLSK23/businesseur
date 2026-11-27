// Choix proposés à l'inscription. La "valeur" est enregistrée dans Supabase,
// le "libelle" est affiché sur le site. Si tu ajoutes une valeur ici,
// ajoute-la aussi dans la migration SQL (liste "check").

export const STADES_PROJET = [
  { valeur: "idee", libelle: "J'ai une idée" },
  { valeur: "prototype", libelle: "Prototype / premier produit" },
  { valeur: "lancement", libelle: "Lancé, premiers clients" },
  { valeur: "croissance", libelle: "En croissance" },
  { valeur: "levee_de_fonds", libelle: "Je lève des fonds" },
] as const;

export const SPECIALITES_MENTOR = [
  { valeur: "strategie", libelle: "Stratégie & business model" },
  { valeur: "marketing", libelle: "Marketing & communication" },
  { valeur: "vente", libelle: "Vente & distribution" },
  { valeur: "finance", libelle: "Finance & levée de fonds" },
  { valeur: "juridique", libelle: "Juridique" },
  { valeur: "tech", libelle: "Tech & produit" },
  { valeur: "rh", libelle: "RH & management" },
  { valeur: "international", libelle: "International" },
  { valeur: "impact", libelle: "Impact & RSE" },
] as const;
