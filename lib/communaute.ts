// Membres présentés sur la page /businesseurs (contenu fictif).
// Les images sont des illustrations dessinées (personnages fictifs), dans public/Images/businesseurs.

// photo : visage généré par IA (personne qui n'existe pas), à déposer dans public/Images/businesseurs/photos.
// Tant que le fichier n'existe pas, le site affiche le portrait dessiné (image).
export type Arrivant = { nom: string; initiales: string; detail: string; texte: string; image: string; photo?: string };

export const NOUVEAUX_ENTREPRENEURS: Arrivant[] = [
  { nom: "Léo Marchand & Samy Okafor", initiales: "LS", detail: "Wouf'Home · Prototype", texte: "Deux amis d'enfance qui inventent la niche robotisée : nettoyage automatique et chauffage intelligent.", image: "/Images/businesseurs/woufhome.svg" },
  { nom: "Karim Haddad", initiales: "KH", detail: "Kodama · Levée de fonds", texte: "Il rend la campagne accessible sans voiture grâce au covoiturage entre voisins.", image: "/Images/businesseurs/kodama.svg" },
  { nom: "Manon Robin", initiales: "MR", detail: "Atelier Rebond · Croissance", texte: "Elle donne une seconde vie aux vélos abandonnés et forme des jeunes à la réparation.", image: "/Images/businesseurs/atelier-rebond.svg" },
];

export const NOUVEAUX_MENTORS: Arrivant[] = [
  { nom: "Claire Lefèvre", initiales: "CL", detail: "Marketing & stratégie", texte: "Ex-directrice marketing, elle aide les projets à trouver leurs premiers clients.", image: "/Images/businesseurs/claire-lefevre.svg", photo: "/Images/businesseurs/photos/claire-lefevre.jpg" },
  { nom: "Marc Delorme", initiales: "MD", detail: "Vente & international", texte: "Il a lancé deux marques en grande surface et ouvre maintenant son carnet d'adresses.", image: "/Images/businesseurs/marc-delorme.svg", photo: "/Images/businesseurs/photos/marc-delorme.jpg" },
  { nom: "Fatou Traoré", initiales: "FT", detail: "Finance & impact", texte: "Spécialiste du financement à impact, elle prépare les fondateurs à leur première levée.", image: "/Images/businesseurs/fatou-traore.svg", photo: "/Images/businesseurs/photos/fatou-traore.jpg" },
];

export const MANTRA_INVESTISSEUR = {
  nom: "Thomas Bernard",
  initiales: "TB",
  image: "/Images/businesseurs/thomas-bernard.svg",
  photo: "/Images/businesseurs/photos/thomas-bernard.jpg",
  role: "Business angel, 24 investissements",
  mantra: "Je n'investis pas dans une idée. J'investis dans une équipe qui sait encore apprendre.",
  conseils: [
    "Montrez ce que vous avez appris de vos échecs, pas seulement vos réussites.",
    "Connaissez vos chiffres par cœur : clients, coûts, marge.",
    "Dites clairement combien vous cherchez et ce que vous en ferez.",
  ],
};
