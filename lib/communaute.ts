// Nouveaux arrivants présentés sur la page /nouveaux-arrivants (contenu fictif).

export type Arrivant = { nom: string; initiales: string; detail: string; texte: string };

export const NOUVEAUX_ENTREPRENEURS: Arrivant[] = [
  { nom: "Léo Marchand & Samy Okafor", initiales: "LS", detail: "Wouf'Home · Prototype", texte: "Deux amis d'enfance qui inventent la niche robotisée : nettoyage automatique et chauffage intelligent." },
  { nom: "Karim Haddad", initiales: "KH", detail: "Kodama · Levée de fonds", texte: "Il rend la campagne accessible sans voiture grâce au covoiturage entre voisins." },
  { nom: "Manon Robin", initiales: "MR", detail: "Atelier Rebond · Croissance", texte: "Elle donne une seconde vie aux vélos abandonnés et forme des jeunes à la réparation." },
];

export const NOUVEAUX_MENTORS: Arrivant[] = [
  { nom: "Claire Lefèvre", initiales: "CL", detail: "Marketing & stratégie", texte: "Ex-directrice marketing, elle aide les projets à trouver leurs premiers clients." },
  { nom: "Marc Delorme", initiales: "MD", detail: "Vente & international", texte: "Il a lancé deux marques en grande surface et ouvre maintenant son carnet d'adresses." },
  { nom: "Fatou Traoré", initiales: "FT", detail: "Finance & impact", texte: "Spécialiste du financement à impact, elle prépare les fondateurs à leur première levée." },
];

export const MANTRA_INVESTISSEUR = {
  nom: "Thomas Bernard",
  initiales: "TB",
  role: "Business angel, 24 investissements",
  mantra: "Je n'investis pas dans une idée. J'investis dans une équipe qui sait encore apprendre.",
  conseils: [
    "Montrez ce que vous avez appris de vos échecs, pas seulement vos réussites.",
    "Connaissez vos chiffres par cœur : clients, coûts, marge.",
    "Dites clairement combien vous cherchez et ce que vous en ferez.",
  ],
};
