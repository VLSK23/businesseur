"use client";

import { useEffect } from "react";
import { traduire } from "@/lib/traductions";
import { lireLangue, EVENEMENT_LANGUE, type Langue } from "@/lib/langue";

// Traduit tout le site en anglais quand le visiteur choisit EN.
// Les textes français restent dans le code : on remplace seulement ce qui s'affiche,
// et on remet le français quand le visiteur reclique sur FR.
// Rien ne change dans ce qui est envoyé à Supabase.

const ATTRIBUTS = ["placeholder", "aria-label", "alt", "title"];
const A_IGNORER = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE"]);

type Souvenir = { fr: string; en: string };

export default function Traduction() {
  useEffect(() => {
    const textes = new Map<Text, Souvenir>();
    const attributs = new Map<Element, Map<string, Souvenir>>();
    let langue: Langue = lireLangue();
    let enCours = false;

    const ignore = (el: Element | null) => !!el?.closest("[translate='no'], [data-pas-traduire]");

    function traduireTexte(noeud: Text) {
      const parent = noeud.parentElement;
      if (!parent || A_IGNORER.has(parent.tagName) || ignore(parent)) return;
      const actuel = noeud.data;
      const souvenir = textes.get(noeud);
      if (souvenir && actuel === souvenir.en) return; // déjà traduit
      const en = traduire(actuel);
      if (en === null) {
        textes.delete(noeud);
        return;
      }
      const debut = actuel.match(/^\s*/)![0];
      const fin = actuel.match(/\s*$/)![0];
      // « Bienvenue, Vicky ! » : pas d'espace avant ! ou ? en anglais
      const texteEn = (/^[!?]$/.test(en) ? "" : debut) + en + fin;
      textes.set(noeud, { fr: actuel, en: texteEn });
      noeud.data = texteEn;
    }

    function traduireAttributs(el: Element) {
      if (ignore(el)) return;
      for (const nom of ATTRIBUTS) {
        const actuel = el.getAttribute(nom);
        if (actuel === null) continue;
        let liste = attributs.get(el);
        const souvenir = liste?.get(nom);
        if (souvenir && actuel === souvenir.en) continue;
        const en = traduire(actuel);
        if (en === null) continue;
        if (!liste) attributs.set(el, (liste = new Map()));
        liste.set(nom, { fr: actuel, en });
        el.setAttribute(nom, en);
      }
    }

    function traduireTitre() {
      const titre = traduire(document.title);
      if (titre && titre !== document.title) document.title = titre;
    }

    function parcourir(racine: Node) {
      if (racine.nodeType === Node.TEXT_NODE) return traduireTexte(racine as Text);
      if (racine.nodeType !== Node.ELEMENT_NODE) return;
      const el = racine as Element;
      if (A_IGNORER.has(el.tagName)) return;
      traduireAttributs(el);
      el.querySelectorAll("*").forEach(traduireAttributs);
      const marcheur = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (marcheur.nextNode()) traduireTexte(marcheur.currentNode as Text);
    }

    function toutTraduire() {
      enCours = true;
      parcourir(document.body);
      traduireTitre();
      document.documentElement.lang = "en";
      enCours = false;
    }

    function toutRemettre() {
      enCours = true;
      textes.forEach((s, noeud) => {
        if (noeud.data === s.en) noeud.data = s.fr;
      });
      attributs.forEach((liste, el) =>
        liste.forEach((s, nom) => {
          if (el.getAttribute(nom) === s.en) el.setAttribute(nom, s.fr);
        }),
      );
      textes.clear();
      attributs.clear();
      document.documentElement.lang = "fr";
      enCours = false;
    }

    // Quand React affiche un nouveau texte (message de Fairy, erreur, autre page…), on le traduit aussi.
    const observateur = new MutationObserver((changements) => {
      if (langue !== "en" || enCours) return;
      enCours = true;
      for (const c of changements) {
        if (c.type === "characterData") traduireTexte(c.target as Text);
        else if (c.type === "attributes") traduireAttributs(c.target as Element);
        else c.addedNodes.forEach(parcourir);
        if (c.target.nodeName === "TITLE" || c.target.parentNode?.nodeName === "TITLE") traduireTitre();
      }
      enCours = false;
    });
    const options = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRIBUTS };
    observateur.observe(document.body, options);
    observateur.observe(document.head, { childList: true, subtree: true, characterData: true });

    function appliquer(nouvelle: Langue) {
      langue = nouvelle;
      if (langue === "en") toutTraduire();
      else toutRemettre();
      document.documentElement.classList.remove("traduction-en-attente");
    }

    // On attend que React ait fini d'afficher la page (hydratation) avant de traduire.
    // (au plus tard après 1 seconde, si les images sont longues à charger)
    let attente = 0;
    let lance = false;
    const demarrer = () => {
      if (lance) return;
      lance = true;
      window.clearTimeout(attente);
      attente = window.setTimeout(() => appliquer(langue), 30);
    };
    if (document.readyState === "complete") demarrer();
    else {
      window.addEventListener("load", demarrer, { once: true });
      attente = window.setTimeout(demarrer, 1000);
    }
    const changer = (e: Event) => appliquer((e as CustomEvent<Langue>).detail);
    window.addEventListener(EVENEMENT_LANGUE, changer);
    return () => {
      observateur.disconnect();
      window.clearTimeout(attente);
      window.removeEventListener("load", demarrer);
      window.removeEventListener(EVENEMENT_LANGUE, changer);
    };
  }, []);

  return null;
}
