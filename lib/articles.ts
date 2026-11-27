// Articles de la page Act-Business (documentation sur l'entrepreneuriat).
// Pour ajouter un article : copie un bloc { ... } et change le "slug" (l'adresse de la page).

export type Article = {
  slug: string;
  titre: string;
  categorie: string;
  lecture: string;
  resume: string;
  auteur: string;
  sections: { titre: string; paragraphes: string[] }[];
};

export const ARTICLES: Article[] = [
  {
    slug: "valider-son-idee",
    titre: "Valider son idée en 7 jours, sans dépenser un euro",
    categorie: "Lancer son projet",
    lecture: "6 min",
    resume: "Avant de coder, de déposer des statuts ou de commander du stock, vérifiez que quelqu'un veut vraiment votre produit.",
    auteur: "Claire Lefèvre, mentor marketing",
    sections: [
      {
        titre: "Jour 1 et 2 : écrire le problème, pas la solution",
        paragraphes: [
          "Décrivez en une phrase le problème que vous résolvez et pour qui. « Les propriétaires de chiens qui vivent en maison n'ont pas le temps de nettoyer la niche » est plus utile que « une niche connectée ».",
          "Listez ensuite 20 personnes qui vivent ce problème et que vous pouvez contacter cette semaine.",
        ],
      },
      {
        titre: "Jour 3 à 5 : parler à de vrais clients",
        paragraphes: [
          "Menez 10 entretiens de 15 minutes. Ne présentez pas votre idée : demandez comment la personne gère le problème aujourd'hui, combien cela lui coûte, et ce qu'elle a déjà essayé.",
          "Si personne n'a jamais cherché de solution, le problème n'est peut-être pas assez douloureux.",
        ],
      },
      {
        titre: "Jour 6 et 7 : tester l'envie de payer",
        paragraphes: [
          "Créez une page simple qui présente l'offre et son prix, avec un bouton « Je réserve ». Partagez-la aux personnes interrogées et dans deux groupes en ligne.",
          "Un bon signal : au moins 10 % des visiteurs laissent leur e-mail, et quelques-uns acceptent de payer un acompte.",
        ],
      },
    ],
  },
  {
    slug: "choisir-son-statut",
    titre: "Micro-entreprise, SASU, SAS : quel statut choisir ?",
    categorie: "Juridique",
    lecture: "8 min",
    resume: "Le statut juridique change vos impôts, votre protection sociale et la façon d'accueillir des associés.",
    auteur: "Julien Girard, mentor juridique",
    sections: [
      {
        titre: "La micro-entreprise pour tester",
        paragraphes: [
          "C'est le statut le plus simple : inscription en ligne, comptabilité légère, cotisations calculées sur le chiffre d'affaires. Il convient bien pour démarrer seul une activité de service.",
          "Ses limites : un plafond de chiffre d'affaires, aucune déduction des frais, et l'impossibilité d'accueillir un associé ou un investisseur.",
        ],
      },
      {
        titre: "La SASU quand on est seul mais ambitieux",
        paragraphes: [
          "La société par actions simplifiée unipersonnelle sépare votre patrimoine de celui de l'entreprise. Vous pouvez vous verser un salaire ou des dividendes.",
          "Elle demande une vraie comptabilité, souvent avec l'aide d'un expert-comptable.",
        ],
      },
      {
        titre: "La SAS pour lever des fonds à plusieurs",
        paragraphes: [
          "C'est le statut préféré des investisseurs : on peut faire entrer des associés, créer différentes catégories d'actions et prévoir des règles dans un pacte d'associés.",
          "Avant de signer, faites relire vos statuts et votre pacte par un professionnel : ils vous engagent pour des années.",
        ],
      },
    ],
  },
  {
    slug: "pitch-deck",
    titre: "Les 10 slides d'un pitch qui convainc",
    categorie: "Financement",
    lecture: "5 min",
    resume: "Un investisseur passe en moyenne moins de 3 minutes sur un pitch deck. Voici l'ordre qui fonctionne.",
    auteur: "Thomas Bernard, business angel",
    sections: [
      {
        titre: "Le fil de l'histoire",
        paragraphes: [
          "1. Le problème. 2. Votre solution. 3. Pourquoi maintenant. 4. La taille du marché. 5. Le produit en images.",
          "6. Le modèle économique. 7. La traction (clients, chiffres). 8. La concurrence. 9. L'équipe. 10. Le montant recherché et son utilisation.",
        ],
      },
      {
        titre: "Les erreurs qui font décrocher",
        paragraphes: [
          "Trop de texte, un marché présenté en milliards sans explication, et l'absence de concurrents (il y en a toujours, même indirects).",
          "Une slide = une idée. Si vous devez la lire à voix haute, elle est trop chargée.",
        ],
      },
      {
        titre: "Avant d'envoyer",
        paragraphes: [
          "Faites relire votre deck par deux personnes qui ne connaissent pas votre projet. Si elles ne peuvent pas le résumer en une phrase, simplifiez.",
        ],
      },
    ],
  },
  {
    slug: "trouver-un-mentor",
    titre: "Trouver (et garder) le bon mentor",
    categorie: "Accompagnement",
    lecture: "4 min",
    resume: "Un bon mentor fait gagner des mois. Encore faut-il savoir quoi lui demander.",
    auteur: "Marc Delorme, mentor retail",
    sections: [
      {
        titre: "Chercher une expérience précise",
        paragraphes: [
          "Ne cherchez pas « un mentor », cherchez quelqu'un qui a déjà résolu votre prochain problème : entrer en grande surface, recruter un premier salarié, lever des fonds.",
        ],
      },
      {
        titre: "Préparer chaque rendez-vous",
        paragraphes: [
          "Arrivez avec trois questions écrites et vos chiffres à jour. Après la séance, envoyez un court résumé avec ce que vous allez faire.",
          "Un mentor reste quand il voit ses conseils appliqués.",
        ],
      },
      {
        titre: "Savoir dire merci",
        paragraphes: [
          "Donnez des nouvelles, même quand tout va bien. Et le jour où vous réussissez, devenez mentor à votre tour sur Businesseur.",
        ],
      },
    ],
  },
  {
    slug: "premiere-levee",
    titre: "Love money, prêts d'honneur, business angels : les étapes d'une première levée",
    categorie: "Financement",
    lecture: "7 min",
    resume: "On ne commence pas par un fonds d'investissement. Voici l'ordre habituel des financements d'un jeune projet.",
    auteur: "Fatou Traoré, mentor finance",
    sections: [
      {
        titre: "1. Le cercle proche",
        paragraphes: [
          "La « love money » vient de la famille et des amis. Formalisez toujours ces apports par écrit, même entre proches.",
        ],
      },
      {
        titre: "2. Les prêts d'honneur et les aides publiques",
        paragraphes: [
          "Des réseaux associatifs accordent des prêts personnels sans intérêt aux créateurs. Ils rassurent ensuite les banques.",
          "Les régions et Bpifrance proposent aussi des aides à l'innovation. Renseignez-vous auprès de votre chambre de commerce.",
        ],
      },
      {
        titre: "3. Les business angels",
        paragraphes: [
          "Ce sont des particuliers qui investissent leur propre argent et apportent leur réseau. Ils regardent d'abord l'équipe, puis la traction.",
          "Préparez votre pitch, un prévisionnel sur trois ans et une idée claire de ce que vous ferez de l'argent.",
        ],
      },
    ],
  },
  {
    slug: "dix-premiers-clients",
    titre: "Décrocher ses 10 premiers clients",
    categorie: "Ventes",
    lecture: "5 min",
    resume: "Les premiers clients ne viennent pas de la publicité. Ils viennent de vous.",
    auteur: "Inès Benali, fondatrice de Terre & Bocal",
    sections: [
      {
        titre: "Faire des choses qui ne passent pas à l'échelle",
        paragraphes: [
          "Appelez, rencontrez, livrez vous-même. Chez Terre & Bocal, les 50 premiers paniers ont été livrés en main propre, avec un mot écrit à la main.",
        ],
      },
      {
        titre: "Transformer chaque client en ambassadeur",
        paragraphes: [
          "Demandez un avis, une photo, une recommandation. Un client satisfait qui en parle vaut dix publicités.",
        ],
      },
      {
        titre: "Mesurer dès le premier jour",
        paragraphes: [
          "Notez d'où vient chaque client, combien il a payé et s'il revient. Avec 10 clients, vous savez déjà quel canal fonctionne.",
        ],
      },
    ],
  },
];

export function trouverArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}
