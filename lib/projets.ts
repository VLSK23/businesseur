// Projets présentés sur Businesseur (contenu fictif pour la démonstration).
// Pour ajouter un projet : copie un bloc { ... } et change le "slug" (l'adresse de la page).

export type Projet = {
  slug: string;
  nom: string;
  accroche: string;
  secteur: string;
  stade: string;
  ville: string;
  fondateurs: { nom: string; role: string; initiales: string }[];
  histoire: string[];
  points: { titre: string; texte: string }[];
  chiffres: { valeur: string; libelle: string }[];
  besoins: string[];
};

export const PROJETS: Projet[] = [
  {
    slug: "woufhome",
    nom: "Wouf'Home",
    accroche: "La niche robotisée qui se nettoie toute seule et garde votre chien au chaud.",
    secteur: "Animaux & objets connectés",
    stade: "Prototype",
    ville: "Lyon",
    fondateurs: [
      { nom: "Léo Marchand", role: "Co-fondateur, ingénieur produit", initiales: "LM" },
      { nom: "Samy Okafor", role: "Co-fondateur, ventes & marketing", initiales: "SO" },
    ],
    histoire: [
      "Léo et Samy sont amis depuis le collège. L'hiver dernier, Pixel, le berger australien de Samy, est tombé malade après des nuits passées dans une niche froide et humide.",
      "Léo, ingénieur en robotique, a bricolé un premier prototype dans son garage : un plancher chauffant, un capteur de température et un tapis qui évacue la saleté. Trois mois plus tard, quarante voisins voulaient le même.",
      "Wouf'Home est né : une niche connectée, pensée pour le bien-être du chien et la tranquillité de son maître.",
    ],
    points: [
      {
        titre: "Nettoyage automatique",
        texte: "Un tapis roulant évacue poils et saletés vers un bac amovible. Une lampe UV assainit la niche chaque nuit, quand le chien est sorti.",
      },
      {
        titre: "Chauffage intelligent",
        texte: "Le plancher chauffe à basse tension et garde 18 °C toute l'année. Il s'arrête tout seul dès que le chien quitte la niche.",
      },
      {
        titre: "Application compagnon",
        texte: "Température, temps passé dans la niche, alertes de nettoyage : le maître suit tout depuis son téléphone.",
      },
    ],
    chiffres: [
      { valeur: "412", libelle: "pré-commandes" },
      { valeur: "3", libelle: "prototypes testés" },
      { valeur: "150 k€", libelle: "recherchés" },
    ],
    besoins: [
      "Un mentor en industrialisation pour passer de 3 prototypes à 500 niches",
      "Une levée d'amorçage de 150 000 €",
      "Des partenaires en animalerie et chez les vétérinaires",
    ],
  },
  {
    slug: "terre-et-bocal",
    nom: "Terre & Bocal",
    accroche: "L'épicerie vrac qui vient jusqu'aux villages.",
    secteur: "Alimentation & zéro déchet",
    stade: "Lancé, premiers clients",
    ville: "Rennes",
    fondateurs: [{ nom: "Inès Benali", role: "Fondatrice", initiales: "IB" }],
    histoire: [
      "Ancienne cheffe de rayon, Inès voyait les villages se vider de leurs commerces. Elle a racheté un camion de livraison et l'a transformé en épicerie vrac itinérante.",
      "Chaque semaine, Terre & Bocal passe dans 12 villages d'Ille-et-Vilaine avec 300 produits locaux, sans emballage jetable.",
    ],
    points: [
      { titre: "100 % local", texte: "80 producteurs à moins de 60 km, payés au juste prix." },
      { titre: "Zéro emballage", texte: "Bocaux consignés, sacs en tissu, et une remise pour qui apporte ses contenants." },
      { titre: "Commande en ligne", texte: "On réserve son panier la veille, on le récupère au passage du camion." },
    ],
    chiffres: [
      { valeur: "12", libelle: "villages desservis" },
      { valeur: "640", libelle: "clients réguliers" },
      { valeur: "+18 %", libelle: "de ventes par mois" },
    ],
    besoins: ["Un deuxième camion", "Un mentor en logistique", "Des investisseurs à impact"],
  },
  {
    slug: "kodama",
    nom: "Kodama",
    accroche: "Le covoiturage du quotidien pour les zones rurales.",
    secteur: "Mobilité",
    stade: "Je lève des fonds",
    ville: "Clermont-Ferrand",
    fondateurs: [
      { nom: "Karim Haddad", role: "Fondateur, CEO", initiales: "KH" },
      { nom: "Julie Perrin", role: "Co-fondatrice, CTO", initiales: "JP" },
    ],
    histoire: [
      "À la campagne, sans voiture, on reste chez soi. Karim l'a vécu pendant ses études, à 40 minutes du premier arrêt de bus.",
      "Kodama relie les voisins qui font les mêmes trajets : travail, courses, rendez-vous médicaux. Les mairies financent une partie des trajets.",
    ],
    points: [
      { titre: "Trajets courts", texte: "De 5 à 40 km, réservés la veille ou le matin même." },
      { titre: "Avec les communes", texte: "17 mairies partenaires prennent en charge une partie du prix." },
      { titre: "Simple", texte: "Une appli, mais aussi un numéro de téléphone pour les personnes âgées." },
    ],
    chiffres: [
      { valeur: "17", libelle: "communes partenaires" },
      { valeur: "9 800", libelle: "trajets partagés" },
      { valeur: "400 k€", libelle: "recherchés" },
    ],
    besoins: ["Une levée de 400 000 €", "Un mentor en partenariats publics"],
  },
  {
    slug: "atlas-food",
    nom: "Atlas Food",
    accroche: "Des plats marocains faits maison, livrés surgelés partout en France.",
    secteur: "Alimentation",
    stade: "En croissance",
    ville: "Marseille",
    fondateurs: [{ nom: "Amina Diallo", role: "Fondatrice", initiales: "AD" }],
    histoire: [
      "Les recettes de sa grand-mère ont d'abord été vendues sur les marchés de Marseille. Aujourd'hui, Atlas Food cuisine 2 000 plats par semaine.",
      "Grâce à un mentor rencontré sur Businesseur, Amina a refait son business plan et décroché ses premiers magasins bio.",
    ],
    points: [
      { titre: "Recettes de famille", texte: "Tajines, couscous et pastillas, sans conservateur." },
      { titre: "Surgelé à cœur", texte: "Le goût du fait maison, prêt en 8 minutes." },
      { titre: "Circuit court", texte: "Légumes de Provence et épices importées en direct." },
    ],
    chiffres: [
      { valeur: "2 000", libelle: "plats par semaine" },
      { valeur: "35", libelle: "magasins bio" },
      { valeur: "6", libelle: "salariés" },
    ],
    besoins: ["Un mentor en grande distribution", "Une nouvelle cuisine de production"],
  },
];

export function trouverProjet(slug: string) {
  return PROJETS.find((p) => p.slug === slug);
}
