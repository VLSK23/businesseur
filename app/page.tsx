import type { CSSProperties } from "react";
import ContactForm from "@/components/ContactForm";
import NewsletterForm from "@/components/NewsletterForm";
import Langue from "@/components/Langue";

// Page d'accueil Businesseur (convertie depuis SitewebBusinesseur/index.html).
// Les liens "S'inscrire" mènent à /connexion, et les formulaires
// Newsletter et Contact enregistrent les données dans Supabase.

export default function Accueil() {
  return (
    <>
      {/* =========================================================
         EN-TÊTE
         Le menu mobile fonctionne SANS JavaScript grâce à une case
         à cocher cachée (#menu-toggle) : cliquer sur l'icône la coche,
         et le CSS affiche alors le menu.
         ========================================================= */}
      <header className="entete">
        <div className="conteneur entete__contenu">
          <a href="#accueil" className="logo" aria-label="Businesseur, retour à l'accueil">
            {/* Logo dessiné en SVG : un palmier sous une étoile */}
            <img src="/Images/logo-businesseur.png" alt="" className="logo__icone" />
            <span>Business<em>eur</em></span>
          </a>
          <input type="checkbox" id="menu-toggle" className="menu-toggle" />
          <label htmlFor="menu-toggle" className="burger" aria-label="Ouvrir le menu"><span /></label>
          <nav className="nav">
            <ul className="nav__liens">
              <li><a href="#histoire">Notre histoire</a></li>
              <li><a href="/roles">Les rôles</a></li>
              <li><a href="/projets">Projets</a></li>
              <li><a href="/businesseurs">Les Businesseurs</a></li>
              <li><a href="/gazette">La Gazette</a></li>
            </ul>
            <div className="nav__actions">
              <Langue />
              <a href="/connexion" className="lien-discret">Se connecter</a>
              <a href="/connexion?mode=inscription" className="bouton bouton--or">S'inscrire</a>
            </div>
          </nav>
        </div>
      </header>
      <main>
        {/* =========================================================
         1. HERO : coucher de soleil sur les dunes, la fée s'envole
         ========================================================= */}
        {/* =========================================================
         INTRO IMMERSIVE : LA PORTE DE L'OASIS
         Une porte se dresse dans les nuages. En faisant défiler la page :
         1. les textes s'effacent et les nuages s'écartent,
         2. les deux battants de la porte s'ouvrent,
         3. on "entre" : la porte grossit jusqu'à remplir l'écran,
         4. on arrive dans le vrai désert (section suivante).
         Tout est en CSS (animation-timeline), sans JavaScript.
         Navigateurs sans cette fonction : l'intro est simplement masquée.
         ========================================================= */}
        <section className="intro" aria-label="Entrée dans l'oasis Businesseur">
          <div className="intro__scene">
            {/* Nuages (formes floues superposées) */}
            <div className="intro__nuages" aria-hidden="true">
              <span className="nuage nuage--1" />
              <span className="nuage nuage--2" />
              <span className="nuage nuage--3" />
              <span className="nuage nuage--4" />
              <span className="nuage nuage--5" />
              <span className="nuage nuage--6" />
              <span className="nuage nuage--7" />
              <span className="nuage nuage--8" />
            </div>
            <div className="intro__texte">
              <p className="surtitre">Bienvenue chez Businesseur</p>
              <h2>Poussez la porte de l'oasis</h2>
              {/* "Businesseur" écrit avec la même police que le logo de l'en-tête */}
              <p className="intro__logo">Business<em>eur</em></p>
            </div>
            {/* La porte : encadrement + battants + marches */}
            <div className="intro__porte">
              <div className="intro__cadre">
                {/* Ce qu'on voit derrière la porte : le désert */}
                <img className="intro__vue" src="/Images/desert-complet.jpg" alt="" />
                {/* Les deux battants */}
                <div className="battant battant--gauche"><i /></div>
                <div className="battant battant--droite"><i /></div>
              </div>
              <div className="intro__marches" aria-hidden="true">
                <i /><i /><i />
              </div>
            </div>
            <p className="intro__defiler" aria-hidden="true">
              <span>Faites défiler pour entrer</span>
              <i />
            </p>
          </div>
        </section>
        <section id="accueil" className="hero">
          {/* Étoiles qui scintillent (de simples points animés) */}
          <div className="etoiles" aria-hidden="true">
            <i style={{"--x": "8%", "--y": "12%", "--d": "0s"} as CSSProperties} /><i style={{"--x": "22%", "--y": "6%", "--d": "1.2s"} as CSSProperties} />
            <i style={{"--x": "35%", "--y": "18%", "--d": ".6s"} as CSSProperties} /><i style={{"--x": "52%", "--y": "9%", "--d": "2s"} as CSSProperties} />
            <i style={{"--x": "66%", "--y": "15%", "--d": "1.6s"} as CSSProperties} /><i style={{"--x": "78%", "--y": "5%", "--d": ".3s"} as CSSProperties} />
            <i style={{"--x": "90%", "--y": "20%", "--d": "2.4s"} as CSSProperties} /><i style={{"--x": "14%", "--y": "28%", "--d": "1.9s"} as CSSProperties} />
            <i style={{"--x": "84%", "--y": "32%", "--d": ".9s"} as CSSProperties} /><i style={{"--x": "44%", "--y": "30%", "--d": "2.8s"} as CSSProperties} />
          </div>
          <div className="conteneur hero__contenu">
            <div className="hero__texte">
              <p className="surtitre"><span className="pastille" /> La plateforme qui fait fleurir les projets</p>
              <h1>Dans le désert des idées,<br /><span className="degrade">trouvez votre oasis.</span></h1>
              <p className="hero__intro">
                Businesseur réunit <strong>entrepreneurs</strong>, <strong>mentors</strong> et{" "}
                <strong>investisseurs</strong>. Fairy, notre fée IA, vous guide vers les bonnes
                rencontres, au bon moment.
              </p>
              <div className="hero__boutons">
                <a href="/connexion?mode=inscription&profil=entrepreneur" className="bouton bouton--or bouton--grand">
                  Je lance mon projet
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </a>
                <a href="/connexion?mode=inscription&profil=mentor" className="bouton bouton--verre bouton--grand">Je veux accompagner</a>
              </div>
              <ul className="chiffres">
                <li><strong>2 400+</strong><span>entrepreneurs</span></li>
                <li><strong>380</strong><span>mentors certifiés</span></li>
                <li><strong>12 M€</strong><span>levés sur la plateforme</span></li>
              </ul>
            </div>
          </div>
          {/* =========================================================
       PAYSAGE RÉALISTE EN PLUSIEURS PLANS
       Les images ont été générées par ordinateur (rendu 3D de dunes
       éclairées par le soleil couchant). Chaque plan bouge à une
       vitesse différente au défilement : effet de profondeur.
       Tous les plans sont dans le même SVG pour que les voyageurs
       restent posés exactement sur la crête de la dune du premier plan.
       ========================================================= */}
          <svg className="paysage-reel" viewBox="0 0 2400 1350" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <defs>
              <radialGradient id="gFairyMini">
                <stop offset={0} stopColor="#FFF4D6" />
                <stop offset=".4" stopColor="#DDB463" stopOpacity=".7" />
                <stop offset={1} stopColor="#D38A45" stopOpacity={0} />
              </radialGradient>
            </defs>
            <g className="plan plan--ciel"><image href="/Images/desert-ciel.jpg" width={2400} height={1350} /></g>
            <g className="plan plan--loin"><image href="/Images/desert-loin.webp" width={2400} height={1350} /></g>
            <g className="plan plan--milieu">
              <image href="/Images/desert-milieu.webp" width={2400} height={1350} />
              {/* Fairy veille sur l'oasis : une lueur qui flotte */}
              <g className="fairy-oasis">
                <circle cx={1540} cy={740} r={26} fill="url(#gFairyMini)" />
                <circle cx={1540} cy={740} r={4} fill="#FFF4D6" />
                <animateTransform attributeName="transform" type="translate" values="0 0; 30 -18; 60 0; 30 14; 0 0" dur="9s" repeatCount="indefinite" />
              </g>
            </g>
            <g className="plan plan--pres">
              <image href="/Images/desert-pres.webp" width={2400} height={1350} />
              {/* =====================================================
           Les voyageurs : femmes et hommes d'affaires qui traversent
           le désert. Chaque personnage est défini une seule fois
           (dans <defs>), puis réutilisé avec <use>.
           Animations SVG natives, sans JavaScript :
           - cuisses et tibias articulés (hanche + genou)
           - bras qui se balancent, léger rebond du corps
           - animateMotion : déplacement le long de la dune
           Fairy suit discrètement le premier voyageur.
           ===================================================== */}
              <defs>
                <g id="homme">
                  <g>
                    <path d="M-2.5 -30 L2.5 -30 L2.0 -15 L-2.0 -15Z" fill="#2A2452" />
                    <g>
                      <path d="M-2.0 -15.5 L2.0 -15.5 L1.6 -1.2 L-1.6 -1.2Z" fill="#2A2452" />
                      <path d="M-2 -1.6 h5.4 q1.4 0 1.4 1.6 h-6.8z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -15;4 0 -15;38 0 -15;2 0 -15" keyTimes="0;.5;.75;1" dur="1.1s" begin="-0.55s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -30;20 0 -30;-22 0 -30" dur="1.1s" begin="-0.55s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-1.6 -49 L1.6 -49 L1.0 -26 L-1.0 -26Z" fill="#2A2452" />
                    <circle cx={0} cy={-25} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -49;-16 0 -49;18 0 -49" dur="1.1s" begin="0s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-2.5 -30 L2.5 -30 L2.0 -15 L-2.0 -15Z" fill="#231D4F" />
                    <g>
                      <path d="M-2.0 -15.5 L2.0 -15.5 L1.6 -1.2 L-1.6 -1.2Z" fill="#231D4F" />
                      <path d="M-2 -1.6 h5.4 q1.4 0 1.4 1.6 h-6.8z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -15;4 0 -15;38 0 -15;2 0 -15" keyTimes="0;.5;.75;1" dur="1.1s" begin="0s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -30;20 0 -30;-22 0 -30" dur="1.1s" begin="0s" repeatCount="indefinite" />
                  </g>
                  {/* Veste cintrée */}
                  <path d="M-5.6 -50 Q0 -52 5.6 -50 L6 -38 L5 -27 L-5 -27 L-6 -38Z" fill="#231D4F" />
                  <path d="M-1.8 -50.5 L0 -45 L1.8 -50.5" fill="#FFF4D6" />
                  <path d="M0 -49.5 l1 1.2 -.6 7 -.4 .8 -.4 -.8 -.6 -7z" fill="#4F7DB5" />
                  <rect x="-1.4" y="-53.5" width="2.8" height="3.5" fill="#3A2A5C" />
                  <ellipse cx=".4" cy={-57} rx="3.4" ry={4} fill="#3A2A5C" />
                  <path d="M-3 -58.5 Q0 -62.5 3.8 -58.6 Q3.4 -60.8 0 -61.2 Q-3.2 -61 -3 -58.5z" fill="#18143A" />
                  <g>
                    <path d="M-1.6 -49 L1.6 -49 L1.0 -26 L-1.0 -26Z" fill="#231D4F" />
                    <circle cx={0} cy={-25} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -49;-16 0 -49;18 0 -49" dur="1.1s" begin="-0.55s" repeatCount="indefinite" />
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="0 0;0 -.9;0 0;0 -.9;0 0" dur="1.1s" repeatCount="indefinite" />
                </g>
                <g id="femme">
                  <g>
                    <path d="M-1.7 -27 L1.7 -27 L1.3 -14 L-1.3 -14Z" fill="#3A2A5C" />
                    <g>
                      <path d="M-1.3 -14.5 L1.3 -14.5 L0.95 -1.2 L-0.95 -1.2Z" fill="#3A2A5C" />
                      <path d="M-1.4 -1.8 l4.6 .8 q.8 .4 .6 1 h-4.2 l-1 -1.6z M-1.3 -1.6 v1.6 h.8 z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -14;4 0 -14;38 0 -14;2 0 -14" keyTimes="0;.5;.75;1" dur="1.0s" begin="-0.5s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -27;20 0 -27;-22 0 -27" dur="1.0s" begin="-0.5s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-1.4 -46 L1.4 -46 L0.7999999999999999 -25 L-0.7999999999999999 -25Z" fill="#352C68" />
                    <circle cx={0} cy={-24} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -46;-16 0 -46;18 0 -46" dur="1.0s" begin="0s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-1.7 -27 L1.7 -27 L1.3 -14 L-1.3 -14Z" fill="#3A2A5C" />
                    <g>
                      <path d="M-1.3 -14.5 L1.3 -14.5 L0.95 -1.2 L-0.95 -1.2Z" fill="#3A2A5C" />
                      <path d="M-1.4 -1.8 l4.6 .8 q.8 .4 .6 1 h-4.2 l-1 -1.6z M-1.3 -1.6 v1.6 h.8 z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -14;4 0 -14;38 0 -14;2 0 -14" keyTimes="0;.5;.75;1" dur="1.0s" begin="0s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -27;20 0 -27;-22 0 -27" dur="1.0s" begin="0s" repeatCount="indefinite" />
                  </g>
                  {/* Jupe crayon */}
                  <path d="M-4.6 -32 L4.6 -32 L4 -18 L-4 -18Z" fill="#231D4F" />
                  {/* Blazer */}
                  <path d="M-4.6 -46.5 Q0 -48.2 4.6 -46.5 L4.4 -36 L5.2 -30.5 L-5.2 -30.5 L-4.4 -36Z" fill="#352C68" />
                  <path d="M-2 -47 Q0 -44 2 -47 Q1.8 -48.4 0 -48.4 Q-1.8 -48.4 -2 -47z" fill="#B3627F" />
                  <rect x="-1.1" y={-50} width="2.2" height={3} fill="#3A2A5C" />
                  <ellipse cx=".3" cy="-53.4" rx={3} ry="3.6" fill="#3A2A5C" />
                  <path d="M-3.2 -53 Q-3.6 -57.8 .4 -57.6 Q3.6 -57.6 3.4 -54.4 Q1 -56 -1.6 -54.6 L-2 -51.2z" fill="#18143A" />
                  <circle cx="-3.4" cy="-55.6" r="1.9" fill="#18143A" />
                  <g>
                    <path d="M-1.4 -46 L1.4 -46 L0.7999999999999999 -25 L-0.7999999999999999 -25Z" fill="#352C68" />
                    <circle cx={0} cy={-24} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -46;-16 0 -46;18 0 -46" dur="1.0s" begin="-0.5s" repeatCount="indefinite" />
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="0 0;0 -.9;0 0;0 -.9;0 0" dur="1.0s" repeatCount="indefinite" />
                </g>
                <g id="homme2">
                  <g>
                    <path d="M-2.5 -30 L2.5 -30 L2.0 -15 L-2.0 -15Z" fill="#352C68" />
                    <g>
                      <path d="M-2.0 -15.5 L2.0 -15.5 L1.6 -1.2 L-1.6 -1.2Z" fill="#352C68" />
                      <path d="M-2 -1.6 h5.4 q1.4 0 1.4 1.6 h-6.8z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -15;4 0 -15;38 0 -15;2 0 -15" keyTimes="0;.5;.75;1" dur="1.15s" begin="-0.575s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -30;20 0 -30;-22 0 -30" dur="1.15s" begin="-0.575s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-1.6 -49 L1.6 -49 L1.0 -26 L-1.0 -26Z" fill="#2A2452" />
                    <circle cx={0} cy={-25} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -49;-16 0 -49;18 0 -49" dur="1.15s" begin="0s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-2.5 -30 L2.5 -30 L2.0 -15 L-2.0 -15Z" fill="#352C68" />
                    <g>
                      <path d="M-2.0 -15.5 L2.0 -15.5 L1.6 -1.2 L-1.6 -1.2Z" fill="#352C68" />
                      <path d="M-2 -1.6 h5.4 q1.4 0 1.4 1.6 h-6.8z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -15;4 0 -15;38 0 -15;2 0 -15" keyTimes="0;.5;.75;1" dur="1.15s" begin="0s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -30;20 0 -30;-22 0 -30" dur="1.15s" begin="0s" repeatCount="indefinite" />
                  </g>
                  <path d="M-5.6 -50 Q0 -52 5.6 -50 L6 -38 L5 -27 L-5 -27 L-6 -38Z" fill="#2A2452" />
                  <path d="M-2.4 -50.5 L0 -40 L2.4 -50.5" fill="#BFE0FF" />
                  <rect x="-1.4" y="-53.5" width="2.8" height="3.5" fill="#3A2A5C" />
                  <ellipse cx=".4" cy={-57} rx="3.4" ry={4} fill="#3A2A5C" />
                  <path d="M-3.2 -57.5 Q-1 -62.8 4 -58.8 Q2 -60 -.4 -59.4 Q-2.6 -59 -3.2 -57.5z" fill="#18143A" />
                  <g>
                    <path d="M-1.6 -49 L1.6 -49 L1 -26 L-1 -26Z" fill="#2A2452" />
                    <rect x="-3.4" y={-26} width={8} height={6} rx={1} fill="#18143A" /><rect x="-.6" y="-27.4" width="2.4" height="1.6" rx=".6" fill="none" stroke="#18143A" strokeWidth=".6" />
                    <animateTransform attributeName="transform" type="rotate" values="-6 0 -49;6 0 -49;-6 0 -49" dur="1.15s" repeatCount="indefinite" />
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="0 0;0 -.9;0 0;0 -.9;0 0" dur="1.15s" repeatCount="indefinite" />
                </g>
                <g id="femme2">
                  <g>
                    <path d="M-1.9 -28 L1.9 -28 L1.5 -14.5 L-1.5 -14.5Z" fill="#231D4F" />
                    <g>
                      <path d="M-1.5 -15.0 L1.5 -15.0 L1.1 -1.2 L-1.1 -1.2Z" fill="#231D4F" />
                      <path d="M-1.4 -1.8 l4.6 .8 q.8 .4 .6 1 h-4.2 l-1 -1.6z M-1.3 -1.6 v1.6 h.8 z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -14.5;4 0 -14.5;38 0 -14.5;2 0 -14.5" keyTimes="0;.5;.75;1" dur="1.05s" begin="-0.525s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -28;20 0 -28;-22 0 -28" dur="1.05s" begin="-0.525s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-1.4 -46 L1.4 -46 L0.7999999999999999 -25 L-0.7999999999999999 -25Z" fill="#5C4A86" />
                    <circle cx={0} cy={-24} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -46;-16 0 -46;18 0 -46" dur="1.05s" begin="0s" repeatCount="indefinite" />
                  </g>
                  <g>
                    <path d="M-1.9 -28 L1.9 -28 L1.5 -14.5 L-1.5 -14.5Z" fill="#231D4F" />
                    <g>
                      <path d="M-1.5 -15.0 L1.5 -15.0 L1.1 -1.2 L-1.1 -1.2Z" fill="#231D4F" />
                      <path d="M-1.4 -1.8 l4.6 .8 q.8 .4 .6 1 h-4.2 l-1 -1.6z M-1.3 -1.6 v1.6 h.8 z" fill="#18143A" />
                      <animateTransform attributeName="transform" type="rotate" values="2 0 -14.5;4 0 -14.5;38 0 -14.5;2 0 -14.5" keyTimes="0;.5;.75;1" dur="1.05s" begin="0s" repeatCount="indefinite" />
                    </g>
                    <animateTransform attributeName="transform" type="rotate" values="-22 0 -28;20 0 -28;-22 0 -28" dur="1.05s" begin="0s" repeatCount="indefinite" />
                  </g>
                  <path d="M-4.6 -46.5 Q0 -48.2 4.6 -46.5 L4.6 -36 L5.4 -26 L-5.4 -26 L-4.6 -36Z" fill="#5C4A86" />
                  <path d="M-4.8 -33 L4.8 -33" stroke="#D38A45" strokeWidth={1} />
                  <rect x="-1.1" y={-50} width="2.2" height={3} fill="#3A2A5C" />
                  <ellipse cx=".3" cy="-53.4" rx={3} ry="3.6" fill="#3A2A5C" />
                  <path d="M-3.4 -53 Q-3.8 -58 .4 -57.6 Q3.8 -57.4 3.4 -54 Q1 -55.6 -1.4 -54.6 L-1.6 -46 Q-4.2 -47 -3.4 -53z" fill="#18143A" />
                  <g>
                    <path d="M-1.4 -46 L1.4 -46 L0.7999999999999999 -25 L-0.7999999999999999 -25Z" fill="#5C4A86" />
                    <circle cx={0} cy={-24} r="1.5" fill="#3A2A5C" />
                    <animateTransform attributeName="transform" type="rotate" values="18 0 -46;-16 0 -46;18 0 -46" dur="1.05s" begin="-0.525s" repeatCount="indefinite" />
                  </g>
                  <animateTransform attributeName="transform" type="translate" values="0 0;0 -.9;0 0;0 -.9;0 0" dur="1.05s" repeatCount="indefinite" />
                </g>
              </defs>
              <g>
                <g transform="scale(1.50)"><use href="#homme" /></g>
                {/* Fairy : petite lueur ailée qui flotte derrière lui */}
                <g className="fairy-mini" transform="translate(-30 -70)">
                  <g>
                    <circle r={9} fill="url(#gFairyMini)" />
                    <ellipse cx={-3} cy={-2} rx="3.2" ry="1.4" fill="none" stroke="#FFFFFF" strokeWidth=".6" opacity=".8" transform="rotate(-30 -3 -2)" />
                    <ellipse cx={3} cy={-2} rx="3.2" ry="1.4" fill="none" stroke="#FFFFFF" strokeWidth=".6" opacity=".8" transform="rotate(30 3 -2)" />
                    <circle r="1.8" fill="#FFF4D6" />
                    {/* Petite traînée de lumière */}
                    <circle cx={-7} cy={3} r=".9" fill="#DDB463"><animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite" /></circle>
                    <circle cx={-12} cy={5} r=".6" fill="#8BAACF"><animate attributeName="opacity" values="0;1;0" dur="1.6s" repeatCount="indefinite" /></circle>
                    <animateTransform attributeName="transform" type="translate" values="0 0; 3 -6; 0 0; -2 -3; 0 0" dur="3.2s" repeatCount="indefinite" />
                  </g>
                </g>
                <animateMotion dur="110s" begin="-30s" repeatCount="indefinite" rotate={0} path="M-150 1166 L0 1166 L60 1160 L120 1153 L180 1145 L240 1138 L300 1130 L360 1121 L420 1113 L480 1104 L540 1094 L600 1084 L660 1076 L720 1078 L780 1082 L840 1084 L900 1085 L960 1079 L1020 1070 L1080 1061 L1140 1051 L1200 1041 L1260 1030 L1320 1019 L1380 1008 L1440 1007 L1500 1012 L1560 1017 L1620 1022 L1680 1028 L1740 1049 L1800 1071 L1860 1091 L1920 1105 L1980 1114 L2040 1122 L2100 1128 L2160 1133 L2220 1131 L2280 1125 L2340 1118 L2399 1111 L2550 1111" />
              </g>
              <g>
                <g transform="scale(1.42)"><use href="#femme" /></g>
                <animateMotion dur="110s" begin="-8s" repeatCount="indefinite" rotate={0} path="M-150 1166 L0 1166 L60 1160 L120 1153 L180 1145 L240 1138 L300 1130 L360 1121 L420 1113 L480 1104 L540 1094 L600 1084 L660 1076 L720 1078 L780 1082 L840 1084 L900 1085 L960 1079 L1020 1070 L1080 1061 L1140 1051 L1200 1041 L1260 1030 L1320 1019 L1380 1008 L1440 1007 L1500 1012 L1560 1017 L1620 1022 L1680 1028 L1740 1049 L1800 1071 L1860 1091 L1920 1105 L1980 1114 L2040 1122 L2100 1128 L2160 1133 L2220 1131 L2280 1125 L2340 1118 L2399 1111 L2550 1111" />
              </g>
              <g>
                <g transform="scale(1.53)"><use href="#homme2" /></g>
                <animateMotion dur="110s" begin="-47s" repeatCount="indefinite" rotate={0} path="M-150 1166 L0 1166 L60 1160 L120 1153 L180 1145 L240 1138 L300 1130 L360 1121 L420 1113 L480 1104 L540 1094 L600 1084 L660 1076 L720 1078 L780 1082 L840 1084 L900 1085 L960 1079 L1020 1070 L1080 1061 L1140 1051 L1200 1041 L1260 1030 L1320 1019 L1380 1008 L1440 1007 L1500 1012 L1560 1017 L1620 1022 L1680 1028 L1740 1049 L1800 1071 L1860 1091 L1920 1105 L1980 1114 L2040 1122 L2100 1128 L2160 1133 L2220 1131 L2280 1125 L2340 1118 L2399 1111 L2550 1111" />
              </g>
              <g>
                <g transform="scale(1.44)"><use href="#femme2" /></g>
                <animateMotion dur="110s" begin="-72s" repeatCount="indefinite" rotate={0} path="M-150 1166 L0 1166 L60 1160 L120 1153 L180 1145 L240 1138 L300 1130 L360 1121 L420 1113 L480 1104 L540 1094 L600 1084 L660 1076 L720 1078 L780 1082 L840 1084 L900 1085 L960 1079 L1020 1070 L1080 1061 L1140 1051 L1200 1041 L1260 1030 L1320 1019 L1380 1008 L1440 1007 L1500 1012 L1560 1017 L1620 1022 L1680 1028 L1740 1049 L1800 1071 L1860 1091 L1920 1105 L1980 1114 L2040 1122 L2100 1128 L2160 1133 L2220 1131 L2280 1125 L2340 1118 L2399 1111 L2550 1111" />
              </g>
            </g>
          </svg>
          {/* Brume qui dérive lentement devant les dunes */}
          <div className="brume" aria-hidden="true">
            <span className="brume__nappe brume__nappe--1" />
            <span className="brume__nappe brume__nappe--2" />
            <span className="brume__nappe brume__nappe--3" />
          </div>
          {/* =========================================================
       TRANSITION DOUCE VERS LA SUITE DE LA PAGE
       Une dernière dune couleur crème monte du bas et se fond
       dans le fond de la page, avec quelques grains de sable fins
       qui tombent quand on défile.
       ========================================================= */}
          <div className="fondu" aria-hidden="true">
            <svg className="fondu__dune" viewBox="0 0 1440 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gFondu" x1={0} y1={0} x2={0} y2={1}>
                  <stop offset={0} stopColor="#F8EEDF" stopOpacity={0} />
                  <stop offset=".45" stopColor="#F8EEDF" stopOpacity=".85" />
                  <stop offset={1} stopColor="#F8EEDF" />
                </linearGradient>
              </defs>
              <path d="M0 120 C220 70 420 60 640 92 C860 124 1080 70 1260 64 C1340 62 1400 70 1440 78 V200 H0Z" fill="url(#gFondu)" />
            </svg>
            <div className="sable-chute">
              <i style={{"--x": "46.3%", "--t": "0.37", "--taille": "1.5px", "--duree": "3.6s"} as CSSProperties} />
              <i style={{"--x": "67.7%", "--t": "0.34", "--taille": "2px", "--duree": "5.7s"} as CSSProperties} />
              <i style={{"--x": "8.1%", "--t": "0.55", "--taille": "1px", "--duree": "5.2s"} as CSSProperties} />
              <i style={{"--x": "16.9%", "--t": "0.95", "--taille": "2px", "--duree": "3.5s"} as CSSProperties} />
              <i style={{"--x": "23.8%", "--t": "0.11", "--taille": "1px", "--duree": "5.3s"} as CSSProperties} />
              <i style={{"--x": "38.4%", "--t": "0.75", "--taille": "1px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "20.5%", "--t": "0.22", "--taille": "2px", "--duree": "5.7s"} as CSSProperties} />
              <i style={{"--x": "77.3%", "--t": "0.91", "--taille": "2px", "--duree": "3.8s"} as CSSProperties} />
              <i style={{"--x": "81.0%", "--t": "0.20", "--taille": "1px", "--duree": "5.6s"} as CSSProperties} />
              <i style={{"--x": "5.5%", "--t": "0.38", "--taille": "2px", "--duree": "3.4s"} as CSSProperties} />
              <i style={{"--x": "23.7%", "--t": "0.74", "--taille": "1px", "--duree": "5.9s"} as CSSProperties} />
              <i style={{"--x": "0.4%", "--t": "0.76", "--taille": "1.5px", "--duree": "5.7s"} as CSSProperties} />
              <i style={{"--x": "20.3%", "--t": "0.01", "--taille": "1px", "--duree": "3.4s"} as CSSProperties} />
              <i style={{"--x": "91.8%", "--t": "0.50", "--taille": "2px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "19.8%", "--t": "0.07", "--taille": "1.5px", "--duree": "4.9s"} as CSSProperties} />
              <i style={{"--x": "9.3%", "--t": "0.58", "--taille": "1.5px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "72.0%", "--t": "0.04", "--taille": "1.5px", "--duree": "4.7s"} as CSSProperties} />
              <i style={{"--x": "60.6%", "--t": "0.15", "--taille": "1.5px", "--duree": "5.2s"} as CSSProperties} />
              <i style={{"--x": "57.5%", "--t": "0.03", "--taille": "2px", "--duree": "5.9s"} as CSSProperties} />
              <i style={{"--x": "23.7%", "--t": "0.61", "--taille": "1px", "--duree": "5.2s"} as CSSProperties} />
              <i style={{"--x": "84.6%", "--t": "0.52", "--taille": "1px", "--duree": "5.6s"} as CSSProperties} />
              <i style={{"--x": "11.0%", "--t": "0.88", "--taille": "1.5px", "--duree": "4.4s"} as CSSProperties} />
              <i style={{"--x": "40.2%", "--t": "0.99", "--taille": "1px", "--duree": "4.1s"} as CSSProperties} />
              <i style={{"--x": "60.8%", "--t": "0.00", "--taille": "1px", "--duree": "3.6s"} as CSSProperties} />
              <i style={{"--x": "44.4%", "--t": "0.32", "--taille": "1px", "--duree": "3.9s"} as CSSProperties} />
              <i style={{"--x": "28.5%", "--t": "0.52", "--taille": "1px", "--duree": "3.1s"} as CSSProperties} />
              <i style={{"--x": "78.1%", "--t": "0.81", "--taille": "2px", "--duree": "4.0s"} as CSSProperties} />
              <i style={{"--x": "77.8%", "--t": "0.57", "--taille": "1px", "--duree": "4.3s"} as CSSProperties} />
              <i style={{"--x": "23.1%", "--t": "0.96", "--taille": "2px", "--duree": "4.5s"} as CSSProperties} />
              <i style={{"--x": "95.6%", "--t": "0.56", "--taille": "1.5px", "--duree": "5.0s"} as CSSProperties} />
              <i style={{"--x": "17.1%", "--t": "0.84", "--taille": "1.5px", "--duree": "3.1s"} as CSSProperties} />
              <i style={{"--x": "93.9%", "--t": "0.81", "--taille": "1.5px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "98.6%", "--t": "0.61", "--taille": "1px", "--duree": "3.1s"} as CSSProperties} />
              <i style={{"--x": "45.0%", "--t": "0.79", "--taille": "1.5px", "--duree": "4.8s"} as CSSProperties} />
              <i style={{"--x": "96.6%", "--t": "0.35", "--taille": "1.5px", "--duree": "4.4s"} as CSSProperties} />
              <i style={{"--x": "27.8%", "--t": "0.96", "--taille": "1.5px", "--duree": "5.1s"} as CSSProperties} />
              <i style={{"--x": "6.6%", "--t": "0.45", "--taille": "2px", "--duree": "4.8s"} as CSSProperties} />
              <i style={{"--x": "80.3%", "--t": "0.66", "--taille": "1.5px", "--duree": "5.3s"} as CSSProperties} />
              <i style={{"--x": "88.0%", "--t": "0.49", "--taille": "1px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "27.7%", "--t": "0.13", "--taille": "1px", "--duree": "3.5s"} as CSSProperties} />
              <i style={{"--x": "79.0%", "--t": "0.86", "--taille": "1.5px", "--duree": "3.5s"} as CSSProperties} />
              <i style={{"--x": "45.7%", "--t": "0.56", "--taille": "2px", "--duree": "3.2s"} as CSSProperties} />
              <i style={{"--x": "54.9%", "--t": "0.59", "--taille": "1.5px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "94.1%", "--t": "0.03", "--taille": "2px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "52.3%", "--t": "0.54", "--taille": "1px", "--duree": "5.6s"} as CSSProperties} />
              <i style={{"--x": "57.4%", "--t": "0.96", "--taille": "1px", "--duree": "5.2s"} as CSSProperties} />
              <i style={{"--x": "72.1%", "--t": "0.10", "--taille": "2px", "--duree": "4.4s"} as CSSProperties} />
              <i style={{"--x": "49.0%", "--t": "0.64", "--taille": "1px", "--duree": "5.0s"} as CSSProperties} />
              <i style={{"--x": "2.9%", "--t": "0.24", "--taille": "2px", "--duree": "3.7s"} as CSSProperties} />
              <i style={{"--x": "82.3%", "--t": "0.73", "--taille": "2px", "--duree": "5.6s"} as CSSProperties} />
              <i style={{"--x": "3.6%", "--t": "0.60", "--taille": "1px", "--duree": "5.0s"} as CSSProperties} />
              <i style={{"--x": "40.7%", "--t": "0.07", "--taille": "1.5px", "--duree": "3.1s"} as CSSProperties} />
              <i style={{"--x": "75.3%", "--t": "0.08", "--taille": "1px", "--duree": "4.1s"} as CSSProperties} />
              <i style={{"--x": "47.0%", "--t": "0.54", "--taille": "1px", "--duree": "5.1s"} as CSSProperties} />
              <i style={{"--x": "7.5%", "--t": "0.08", "--taille": "1.5px", "--duree": "3.0s"} as CSSProperties} />
              <i style={{"--x": "95.4%", "--t": "0.59", "--taille": "2px", "--duree": "6.0s"} as CSSProperties} />
              <i style={{"--x": "83.3%", "--t": "0.11", "--taille": "1.5px", "--duree": "5.0s"} as CSSProperties} />
              <i style={{"--x": "45.1%", "--t": "0.13", "--taille": "1.5px", "--duree": "3.3s"} as CSSProperties} />
              <i style={{"--x": "5.3%", "--t": "0.07", "--taille": "1px", "--duree": "4.1s"} as CSSProperties} />
              <i style={{"--x": "74.1%", "--t": "0.47", "--taille": "1.5px", "--duree": "4.1s"} as CSSProperties} />
              <i style={{"--x": "63.5%", "--t": "0.24", "--taille": "1.5px", "--duree": "5.3s"} as CSSProperties} />
              <i style={{"--x": "68.3%", "--t": "0.02", "--taille": "1.5px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "2.2%", "--t": "0.10", "--taille": "2px", "--duree": "3.2s"} as CSSProperties} />
              <i style={{"--x": "25.1%", "--t": "0.85", "--taille": "1.5px", "--duree": "4.9s"} as CSSProperties} />
              <i style={{"--x": "68.1%", "--t": "0.13", "--taille": "1px", "--duree": "5.4s"} as CSSProperties} />
              <i style={{"--x": "97.6%", "--t": "0.79", "--taille": "2px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "87.7%", "--t": "0.92", "--taille": "1px", "--duree": "3.1s"} as CSSProperties} />
              <i style={{"--x": "43.9%", "--t": "0.42", "--taille": "1.5px", "--duree": "4.5s"} as CSSProperties} />
              <i style={{"--x": "34.7%", "--t": "0.84", "--taille": "2px", "--duree": "4.3s"} as CSSProperties} />
              <i style={{"--x": "7.9%", "--t": "0.30", "--taille": "2px", "--duree": "4.8s"} as CSSProperties} />
              <i style={{"--x": "56.8%", "--t": "0.44", "--taille": "1.5px", "--duree": "4.0s"} as CSSProperties} />
              <i style={{"--x": "5.9%", "--t": "0.09", "--taille": "1.5px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "18.9%", "--t": "0.71", "--taille": "1.5px", "--duree": "5.8s"} as CSSProperties} />
              <i style={{"--x": "8.6%", "--t": "0.97", "--taille": "2px", "--duree": "3.6s"} as CSSProperties} />
              <i style={{"--x": "54.2%", "--t": "0.34", "--taille": "1px", "--duree": "5.0s"} as CSSProperties} />
              <i style={{"--x": "42.2%", "--t": "0.23", "--taille": "1.5px", "--duree": "5.3s"} as CSSProperties} />
              <i style={{"--x": "79.9%", "--t": "0.50", "--taille": "2px", "--duree": "5.2s"} as CSSProperties} />
              <i style={{"--x": "28.5%", "--t": "0.53", "--taille": "1px", "--duree": "3.7s"} as CSSProperties} />
              <i style={{"--x": "98.3%", "--t": "0.31", "--taille": "1px", "--duree": "3.4s"} as CSSProperties} />
              <i style={{"--x": "16.3%", "--t": "0.10", "--taille": "2px", "--duree": "4.9s"} as CSSProperties} />
              <i style={{"--x": "39.5%", "--t": "0.89", "--taille": "1.5px", "--duree": "4.5s"} as CSSProperties} />
              <i style={{"--x": "35.7%", "--t": "0.95", "--taille": "1.5px", "--duree": "4.0s"} as CSSProperties} />
              <i style={{"--x": "38.5%", "--t": "0.18", "--taille": "1.5px", "--duree": "4.7s"} as CSSProperties} />
              <i style={{"--x": "0.9%", "--t": "0.68", "--taille": "1px", "--duree": "3.8s"} as CSSProperties} />
              <i style={{"--x": "52.3%", "--t": "0.75", "--taille": "2px", "--duree": "5.7s"} as CSSProperties} />
              <i style={{"--x": "75.5%", "--t": "0.27", "--taille": "1.5px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "47.9%", "--t": "0.99", "--taille": "1.5px", "--duree": "4.0s"} as CSSProperties} />
              <i style={{"--x": "74.8%", "--t": "0.35", "--taille": "1px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "92.9%", "--t": "0.03", "--taille": "1.5px", "--duree": "4.6s"} as CSSProperties} />
              <i style={{"--x": "95.1%", "--t": "0.76", "--taille": "2px", "--duree": "3.4s"} as CSSProperties} />
            </div>
          </div>
        </section>
        {/* =========================================================
         NOTRE HISTOIRE
         ========================================================= */}
        <section id="histoire" className="section histoire">
          <div className="conteneur histoire__grille">
            <div className="apparition">
              <p className="surtitre surtitre--sombre titre-sable">Notre histoire</p>
              <h2>Née d'un constat : les bonnes idées se perdent dans le désert</h2>
            </div>
            <div className="apparition">
              <p>
                Trop de porteurs de projets avancent seuls, sans repères ni réseau. Businesseur est né
                pour créer l'oasis qui leur manquait : un lieu où entrepreneurs, mentors et investisseurs
                se rencontrent, échangent et construisent ensemble.
              </p>
              <p>
                Guidée par Fairy, notre intelligence artificielle, chaque rencontre est choisie avec
                soin pour faire grandir les projets qui comptent.
              </p>
              {/* Notre ambition, mise en avant */}
              <p className="histoire__ambition">
                Notre ambition est simple : connecter les bons projets aux bonnes personnes.
              </p>
            </div>
          </div>
        </section>
        {/* =========================================================
         2. LES TROIS PROFILS
         ========================================================= */}
        <section id="profils" className="section">
          <div className="conteneur">
            <header className="section__tete apparition">
              <p className="surtitre surtitre--sombre titre-sable">Trois profils, un même écosystème</p>
              <h2>Chacun trouve sa place dans l'oasis</h2>
              <p>Que vous ayez une idée, de l'expérience ou des capitaux, Businesseur crée les rencontres qui comptent.</p>
            </header>
            <div className="profils">
              <article className="profil apparition">
                <div className="profil__icone profil__icone--sable">
                  {/* Graine qui germe */}
                  <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42V22" /><path d="M24 26c-8 0-12-6-12-12 8 0 12 5 12 12z" /><path d="M24 22c0-8 5-12 12-12 0 8-5 12-12 12z" /><path d="M14 42h20" /></svg>
                </div>
                <h3>Entrepreneurs</h3>
                <p>Présentez votre projet, recevez des conseils ciblés et rencontrez les investisseurs qui croient en votre vision.</p>
                <ul className="profil__liste">
                  <li>Profil projet et pitch en ligne</li>
                  <li>Mentors recommandés par Fairy</li>
                  <li>Accès aux appels à financement</li>
                </ul>
                <a href="/connexion?mode=inscription&profil=entrepreneur" className="lien-fleche">Créer mon espace entrepreneur</a>
              </article>
              <article className="profil profil--vedette apparition">
                <span className="etiquette">Le plus demandé</span>
                <div className="profil__icone profil__icone--oasis">
                  {/* Boussole */}
                  <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx={24} cy={24} r={17} /><path d="M30 18l-4 8-8 4 4-8z" /><circle cx={24} cy={24} r="1.5" /></svg>
                </div>
                <h3>Mentors</h3>
                <p>Partagez votre savoir, guidez la nouvelle génération et choisissez les projets qui vous inspirent.</p>
                <ul className="profil__liste">
                  <li>Agenda de sessions intégré</li>
                  <li>Projets filtrés selon votre expertise</li>
                  <li>Badge de mentor certifié</li>
                </ul>
                <a href="/connexion?mode=inscription&profil=mentor" className="lien-fleche">Devenir mentor</a>
              </article>
              <article className="profil apparition">
                <div className="profil__icone profil__icone--nuit">
                  {/* Diamant */}
                  <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 18l6-8h12l6 8-12 20z" /><path d="M12 18h24M18 10l6 28M30 10l-6 28" /></svg>
                </div>
                <h3>Investisseurs</h3>
                <p>Accédez à des projets qualifiés, suivez leurs progrès et investissez avec des données claires.</p>
                <ul className="profil__liste">
                  <li>Deal flow trié et vérifié</li>
                  <li>Tableaux de bord de suivi</li>
                  <li>Rencontres en tête à tête</li>
                </ul>
                <a href="/connexion?mode=inscription&profil=investisseur" className="lien-fleche">Rejoindre les investisseurs</a>
              </article>
            </div>
          </div>
        </section>
        {/* =========================================================
         3. COMMENT ÇA MARCHE : un chemin de caravane en 3 étapes
         ========================================================= */}
        <section id="etapes" className="section section--sable">
          <div className="conteneur">
            <header className="section__tete apparition">
              <p className="surtitre surtitre--sombre titre-sable">Le chemin vers l'oasis</p>
              <h2>Trois étapes, pas une de plus</h2>
            </header>
            <ol className="etapes">
              <li className="etape apparition">
                <span className="etape__numero">01</span>
                <h3>Créez votre profil</h3>
                <p>En cinq minutes, décrivez qui vous êtes, ce que vous cherchez et ce que vous pouvez apporter.</p>
              </li>
              <li className="etape apparition">
                <span className="etape__numero">02</span>
                <h3>Fairy vous oriente</h3>
                <p>Notre fée IA analyse votre profil et vous propose les rencontres les plus prometteuses.</p>
              </li>
              <li className="etape apparition">
                <span className="etape__numero">03</span>
                <h3>Faites grandir le projet</h3>
                <p>Échangez, planifiez vos rendez-vous et suivez chaque avancée depuis votre tableau de bord.</p>
              </li>
            </ol>
            <div className="centre apparition">
              <a href="/connexion?mode=inscription" className="bouton bouton--nuit bouton--grand">Commencer gratuitement</a>
            </div>
          </div>
        </section>
        {/* =========================================================
         4. LUMIA, LA FÉE IA : démonstration de conversation
         ========================================================= */}
        <section id="lumia" className="section section--nuit">
          <div className="conteneur lumia">
            <div className="lumia__texte apparition">
              <p className="surtitre">Votre guide dans le désert</p>
              <h2>Voici Fairy, la fée qui connaît chaque chemin</h2>
              <p>
                Fairy est l'agent IA de Businesseur. Elle comprend votre projet, repère les bons
                interlocuteurs et vous accompagne à chaque étape, de l'idée à la levée de fonds.
              </p>
              <ul className="atouts">
                <li><span>✦</span> Recommandations personnalisées de mentors et d'investisseurs</li>
                <li><span>✦</span> Aide à la rédaction de votre pitch</li>
                <li><span>✦</span> Rappels et conseils au bon moment</li>
              </ul>
              <a href="/fairy" className="bouton bouton--or bouton--grand">Rencontrer Fairy</a>
            </div>
            {/* Fausse fenêtre de chat : les bulles apparaissent l'une après l'autre */}
            <div className="chat apparition" aria-label="Exemple de conversation avec Fairy">
              <div className="chat__entete">
                <span className="chat__avatar">F</span>
                <div>
                  <strong>Fairy</strong>
                  <small><span className="pastille" /> en ligne</small>
                </div>
              </div>
              <div className="chat__corps">
                <p className="bulle bulle--fee" style={{"--ordre": "1"} as CSSProperties}>Bonjour Sarah ! J'ai lu votre projet de cosmétiques solides. Puis-je vous aider ?</p>
                <p className="bulle bulle--moi" style={{"--ordre": "2"} as CSSProperties}>Oui, je cherche un mentor en distribution.</p>
                <p className="bulle bulle--fee" style={{"--ordre": "3"} as CSSProperties}>J'ai trouvé 3 mentors parfaits pour vous. Marc a lancé deux marques en grande surface</p>
                <div className="bulle bulle--carte" style={{"--ordre": "4"} as CSSProperties}>
                  <span className="mini-avatar">MD</span>
                  <div><strong>Marc Delorme</strong><small>Mentor · Retail &amp; distribution</small></div>
                  <span className="score">96%</span>
                </div>
                <p className="bulle bulle--fee bulle--ecrit" style={{"--ordre": "5"} as CSSProperties}><i /><i /><i /></p>
              </div>
            </div>
          </div>
        </section>
        {/* =========================================================
         5. TÉMOIGNAGES
         ========================================================= */}
        <section id="temoignages" className="section">
          <div className="conteneur">
            <header className="section__tete apparition">
              <p className="surtitre surtitre--sombre titre-sable">Ils ont trouvé leur oasis</p>
              <h2>Des rencontres qui changent tout</h2>
            </header>
            <div className="temoignages">
              <figure className="temoignage apparition">
                <blockquote>« En trois semaines, Fairy m'a présenté le mentor qui a transformé mon business plan. »</blockquote>
                <figcaption><span className="mini-avatar">IN</span><div><strong>Inès N.</strong><small>Fondatrice, Atlas Food</small></div></figcaption>
              </figure>
              <figure className="temoignage apparition">
                <blockquote>« Je reçois enfin des projets qui correspondent vraiment à ma thèse d'investissement. »</blockquote>
                <figcaption><span className="mini-avatar">TB</span><div><strong>Thomas B.</strong><small>Business angel</small></div></figcaption>
              </figure>
              <figure className="temoignage apparition">
                <blockquote>« Accompagner des jeunes entrepreneurs n'a jamais été aussi simple et gratifiant. »</blockquote>
                <figcaption><span className="mini-avatar">CL</span><div><strong>Claire L.</strong><small>Mentor, ex-directrice marketing</small></div></figcaption>
              </figure>
            </div>
          </div>
        </section>
        {/* =========================================================
         6. GRAND APPEL À L'INSCRIPTION
         ========================================================= */}
        <section className="appel">
          <div className="conteneur appel__boite apparition">
            <div className="appel__lune" aria-hidden="true" />
            <h2>Votre oasis vous attend.</h2>
            <p>Inscription gratuite, sans engagement. Fairy vous guide dès la première minute.</p>
            <div className="hero__boutons centre">
              <a href="/connexion?mode=inscription&profil=entrepreneur" className="bouton bouton--or bouton--grand">Je suis entrepreneur</a>
              <a href="/connexion?mode=inscription&profil=mentor" className="bouton bouton--verre bouton--grand">Je suis mentor</a>
              <a href="/connexion?mode=inscription&profil=investisseur" className="bouton bouton--verre bouton--grand">Je suis investisseur</a>
            </div>
          </div>
        </section>
        {/* =========================================================
         7. NEWSLETTER + CONTACT
         (Les formulaires sont visuels : sans serveur, ils n'envoient rien.)
         ========================================================= */}
        <section id="contact" className="section section--sable">
          <div className="conteneur contact">
            <div id="gazette" className="newsletter apparition">
              <p className="surtitre surtitre--sombre">La Gazette du Businesseur</p>
              <h2>Recevez nos pépites chaque mois</h2>
              <p>Conseils d'experts, appels à projets et portraits d'entrepreneurs, directement dans votre boîte mail.</p>
              <NewsletterForm />
              <small>Un e-mail par mois, désinscription en un clic.</small>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      {/* =========================================================
         PIED DE PAGE
         ========================================================= */}
      <footer className="pied">
        <div className="conteneur pied__grille">
          <div>
            <a href="#accueil" className="logo"><img src="/Images/logo-businesseur.png" alt="" className="logo__icone" /><span>Business<em>eur</em></span></a>
            <p>L'oasis où les idées rencontrent l'expérience et le capital.</p>
          </div>
          <div>
            <h4>Plateforme</h4>
            <a href="/connexion?mode=inscription&profil=entrepreneur">Entrepreneurs</a>
            <a href="/connexion?mode=inscription&profil=mentor">Mentors</a>
            <a href="/connexion?mode=inscription&profil=investisseur">Investisseurs</a>
          </div>
          <div>
            <h4>Ressources</h4>
            <a href="/projets">Les projets</a>
            <a href="/businesseurs">Les Businesseurs</a>
            <a href="/gazette">La Gazette du Businesseur</a>
            <a href="#lumia">Fairy, la fée IA</a>
            <a href="/roles">Comment ça marche</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Rejoindre</h4>
            <a href="/connexion?mode=inscription" className="bouton bouton--or">Créer mon compte</a>
          </div>
        </div>
        <p className="pied__bas">
          © 2026 Businesseur · <a href="/conditions">Tous droits réservés</a> · <a href="/mentions-legales">Mentions légales</a>
        </p>
      </footer>
    </>
  );
}
