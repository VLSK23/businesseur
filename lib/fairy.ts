// Le « cerveau » de Fairy pour le chat de la page /fairy.
// Pour l'instant, Fairy répond avec des réponses écrites à l'avance, choisies grâce à des mots-clés.
// Plus tard, on pourra remplacer la fonction repondreFairy() par un appel à une vraie IA :
// tant qu'elle renvoie une ReponseFairy, la page de chat n'a pas besoin de changer.

import { LIEN_APPLICATION } from "@/lib/application";
import { PROJETS } from "@/lib/projets";

export type LienFairy = { texte: string; href: string };

export type ReponseFairy = {
  sujet: string; // thème détecté (enregistré dans Supabase pour les statistiques)
  texte: string;
  liens?: LienFairy[];
  suggestions?: string[]; // boutons proposés à l'utilisateur pour continuer
};

// Les suggestions affichées au début de la conversation
export const SUGGESTIONS_ACCUEIL = [
  "Je suis entrepreneur",
  "Je suis mentor",
  "Je suis investisseur",
  "Voir les projets",
  "Lire La Gazette",
  "Télécharger l'appli",
];

export const MESSAGE_ACCUEIL: ReponseFairy = {
  sujet: "accueil",
  texte:
    "Bonjour, je suis Fairy, la fée guide de Businesseur ✨ Mon rôle : connecter les bons projets aux bonnes personnes. Dites-moi qui vous êtes ou ce que vous cherchez !",
  suggestions: SUGGESTIONS_ACCUEIL,
};

// Retire les accents et met en minuscules, pour comparer les mots-clés facilement
function normaliser(texte: string) {
  return texte.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

type Regle = { sujet: string; motsCles: string[]; reponse: Omit<ReponseFairy, "sujet"> };

// Chaque règle : si le message contient un des mots-clés, Fairy donne cette réponse.
// L'ordre compte : la première règle qui correspond gagne.
const REGLES: Regle[] = [
  {
    sujet: "salutation",
    motsCles: ["bonjour", "salut", "hello", "coucou", "bonsoir", "hey", "hi", "good morning", "good evening"],
    reponse: {
      texte: "Bonjour et bienvenue dans l'oasis ! Êtes-vous entrepreneur, mentor ou investisseur ?",
      suggestions: ["Je suis entrepreneur", "Je suis mentor", "Je suis investisseur"],
    },
  },
  {
    sujet: "merci",
    motsCles: ["merci", "super", "genial", "top", "parfait", "thanks", "thank you", "great", "perfect", "awesome"],
    reponse: {
      texte: "Avec plaisir ! Je reste là si vous avez une autre question 🌴",
      suggestions: ["Voir les projets", "Lire La Gazette", "S'inscrire"],
    },
  },
  {
    sujet: "mantra",
    motsCles: ["mantra", "conseil d'investisseur", "conseils d'investisseur", "investor tips", "investor advice"],
    reponse: {
      texte: "« Je n'investis pas dans une idée. J'investis dans une équipe qui sait encore apprendre. » C'est le mantra de Thomas Bernard, business angel. Ses 3 conseils sont sur la page Les Businesseurs.",
      liens: [{ texte: "Lire ses conseils", href: "/businesseurs" }],
    },
  },  {
    sujet: "trouver-mentor",
    motsCles: ["trouver un mentor", "besoin d'aide", "aide", "accompagnement", "find a mentor", "need help", "help", "support"],
    reponse: {
      texte: "Je m'en occupe ! Créez votre espace entrepreneur et je vous proposerai les mentors qui connaissent votre secteur. En attendant, voici comment bien choisir :",
      liens: [
        { texte: "Trouver (et garder) le bon mentor", href: "/gazette/trouver-un-mentor" },
        { texte: "Rencontrer nos mentors", href: "/businesseurs" },
      ],
    },
  },  {
    sujet: "entrepreneur",
    motsCles: ["entrepreneur", "mon projet", "ma startup", "creer", "lancer", "idee", "fondateur", "fondatrice", "my project", "my startup", "start", "launch", "idea", "founder"],
    reponse: {
      texte:
        "Merveilleux ! Sur Businesseur, je vous présente des mentors qui connaissent votre secteur, puis des investisseurs quand vous êtes prêt·e. Commencez par créer votre espace : je vous demanderai à quel stade est votre projet.",
      liens: [
        { texte: "Créer mon espace entrepreneur", href: "/connexion?mode=inscription&profil=entrepreneur" },
        { texte: "Valider son idée en 7 jours", href: "/gazette/valider-son-idee" },
      ],
      suggestions: ["Trouver un mentor", "Lever des fonds", "Choisir mon statut"],
    },
  },
  {
    sujet: "mentor",
    motsCles: ["mentor", "accompagner", "partager mon experience", "conseiller", "coach", "share my experience", "advise", "mentoring"],
    reponse: {
      texte:
        "Merci de vouloir transmettre ! Choisissez les spécialités que vous souhaitez accompagner (marketing, finance, vente…) et je vous proposerai les projets qui en ont le plus besoin.",
      liens: [
        { texte: "Devenir mentor", href: "/connexion?mode=inscription&profil=mentor" },
        { texte: "Rencontrer nos mentors", href: "/businesseurs" },
      ],
      suggestions: ["Voir les projets", "Je suis entrepreneur"],
    },
  },
  {
    sujet: "investisseur",
    motsCles: ["investisseur", "investir", "business angel", "investissement", "capital", "investor", "invest", "investment"],
    reponse: {
      texte:
        "Bienvenue ! Je sélectionne pour vous des projets déjà accompagnés par nos mentors, à chaque étape : prototype, premiers clients, levée de fonds.",
      liens: [
        { texte: "Voir les projets", href: "/projets" },
        { texte: "Créer mon espace investisseur", href: "/connexion?mode=inscription&profil=investisseur" },
      ],
      suggestions: ["Le mantra de l'investisseur", "Voir les projets"],
    },
  },

  {
    sujet: "levee",
    motsCles: ["lever", "levee", "fonds", "financement", "argent", "financer", "pret", "raise", "fundraise", "fundraising", "funding", "funds", "money", "loan"],
    reponse: {
      texte:
        "Pour une première levée, on avance par étapes : love money, prêts d'honneur, puis business angels. J'ai deux guides pour vous dans La Gazette.",
      liens: [
        { texte: "Les étapes d'une première levée", href: "/gazette/premiere-levee" },
        { texte: "Les 10 slides d'un pitch qui convainc", href: "/gazette/pitch-deck" },
      ],
      suggestions: ["Je suis investisseur", "Trouver un mentor"],
    },
  },
  {
    sujet: "pitch",
    motsCles: ["pitch", "deck", "presentation"],
    reponse: {
      texte: "Un investisseur passe moins de 3 minutes sur un pitch deck. Voici l'ordre qui fonctionne :",
      liens: [{ texte: "Les 10 slides d'un pitch qui convainc", href: "/gazette/pitch-deck" }],
    },
  },
  {
    sujet: "statut",
    motsCles: ["statut", "sasu", "sas", "micro", "auto-entrepreneur", "juridique", "societe", "legal status", "legal", "company", "business structure"],
    reponse: {
      texte: "Micro-entreprise pour tester, SASU si vous êtes seul·e mais ambitieux·se, SAS pour lever des fonds à plusieurs. Tout est expliqué ici :",
      liens: [{ texte: "Quel statut choisir ?", href: "/gazette/choisir-son-statut" }],
    },
  },

  {
    sujet: "clients",
    motsCles: ["client", "vendre", "vente", "marketing", "customer", "customers", "sell", "sales"],
    reponse: {
      texte: "Les premiers clients se trouvent rarement avec de la publicité. Voici une méthode concrète :",
      liens: [{ texte: "Trouver ses 10 premiers clients", href: "/gazette/dix-premiers-clients" }],
    },
  },
  {
    sujet: "projets",
    motsCles: ["projet", "projets", "startups", "decouvrir", "project", "projects", "discover"],
    reponse: {
      texte: "Voici les projets qui grandissent dans l'oasis : une niche robotisée, une épicerie vrac itinérante, du covoiturage rural et des plats marocains faits maison.",
      liens: [{ texte: "Voir tous les projets", href: "/projets" }],
      suggestions: ["Wouf'Home", "Je suis investisseur"],
    },
  },
  {
    sujet: "gazette",
    motsCles: ["gazette", "article", "articles", "lire", "guide", "newsletter", "actu", "read", "news"],
    reponse: {
      texte: "La Gazette du Businesseur rassemble des guides courts écrits par nos mentors : idée, statut, pitch, financement, premiers clients.",
      liens: [{ texte: "Lire La Gazette", href: "/gazette" }],
    },
  },
  {
    sujet: "application",
    motsCles: ["appli", "application", "telecharger", "mobile", "telephone", "iphone", "android", "app", "download", "phone"],
    reponse: {
      texte: "L'application Businesseur arrive bientôt ! Touchez le palmier pour la découvrir et être prévenu·e de sa sortie.",
      liens: [{ texte: "🌴 Découvrir l'application", href: LIEN_APPLICATION }],
    },
  },
  {
    sujet: "acces-oublie",
    motsCles: ["mot de passe", "identifiant", "oublie", "perdu mon", "reinitialiser", "password", "username", "forgot", "lost my", "reset"],
    reponse: {
      texte:
        "Pas de panique ! Votre identifiant, c'est votre adresse e-mail. Pour le mot de passe, je vous envoie un lien pour en choisir un nouveau :",
      liens: [
        { texte: "Mot de passe oublié", href: "/mot-de-passe-oublie" },
        { texte: "Écrire à l'équipe", href: "/#contact" },
      ],
    },
  },
  {
    sujet: "inscription",
    motsCles: ["inscri", "compte", "rejoindre", "s'inscrire", "connexion", "connecter", "sign up", "signup", "register", "account", "join", "log in", "login"],
    reponse: {
      texte: "Rejoindre l'oasis prend cinq minutes. Je vous accueillerai dès votre inscription !",
      liens: [
        { texte: "S'inscrire", href: "/connexion?mode=inscription" },
        { texte: "Se connecter", href: "/connexion" },
      ],
    },
  },
  {
    sujet: "contact",
    motsCles: ["contact", "humain", "equipe", "parler a", "joindre", "email", "mail", "human", "team", "talk to", "speak to", "reach"],
    reponse: {
      texte: "L'équipe Businesseur vous répond avec plaisir. Laissez-nous un message, on revient vers vous rapidement.",
      liens: [{ texte: "Écrire à l'équipe", href: "/#contact" }],
    },
  },
  {
    sujet: "fairy",
    motsCles: ["qui es-tu", "qui es tu", "fairy", "fee", "robot", "ia", "intelligence", "who are you", "ai"],
    reponse: {
      texte: "Je suis Fairy, la fée guide de Businesseur. Je lis votre profil et je vous oriente vers les mentors, les projets et les investisseurs qui vous correspondent.",
      suggestions: SUGGESTIONS_ACCUEIL.slice(0, 3),
    },
  },
];

// Cherche une règle qui correspond au message et renvoie la réponse de Fairy
export function repondreFairy(message: string): ReponseFairy {
  const texte = normaliser(message);

  // Un projet cité par son nom ? Fairy renvoie vers sa fiche.
  const projet = PROJETS.find((p) => texte.includes(normaliser(p.nom)) || texte.includes(p.slug));
  if (projet) {
    return {
      sujet: `projet:${projet.slug}`,
      texte: `${projet.nom} : ${projet.accroche} Le projet est au stade « ${projet.stade} ».`,
      liens: [
        { texte: `Voir ${projet.nom}`, href: `/projets/${projet.slug}` },
        { texte: "Se tenir informé du projet", href: `/projets/${projet.slug}/suivre` },
      ],
    };
  }

  // Mots entiers pour les mots-clés courts (ex. « ia », « fee »), sinon « contient »
  const mots = new Set(texte.split(/[^a-z0-9'-]+/));
  for (const regle of REGLES) {
    const trouve = regle.motsCles.some((m) => {
      const cle = normaliser(m);
      return cle.length <= 4 && !cle.includes(" ") ? mots.has(cle) : texte.includes(cle);
    });
    if (trouve) return { sujet: regle.sujet, ...regle.reponse };
  }

  return {
    sujet: "autre",
    texte:
      "Je n'ai pas encore la réponse à cette question, mais je progresse chaque jour ! Voici ce que je peux faire pour vous :",
    suggestions: SUGGESTIONS_ACCUEIL,
  };
}
