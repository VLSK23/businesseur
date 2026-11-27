import Link from "next/link";
import Langue from "@/components/Langue";

// English version: a short presentation of Businesseur.
// The full site (projects, members, Gazette, sign-up) is in French.
export const metadata = {
  title: "Businesseur | The oasis for entrepreneurs",
  description: "Businesseur connects entrepreneurs, mentors and investors, guided by Fairy, our AI fairy.",
};

const PROFILES = [
  {
    badge: "Entrepreneurs",
    title: "Grow your project",
    text: "Present your project, get targeted advice and meet the investors who believe in your vision.",
  },
  {
    badge: "Mentors",
    title: "Share your experience",
    text: "Help founders avoid the mistakes you made, on the topics you know best: marketing, sales, finance…",
  },
  {
    badge: "Investors",
    title: "Find the right teams",
    text: "Discover projects that have been prepared and supported by our mentors, at every stage.",
  },
];

const STEPS = [
  { title: "1. Create your profile", text: "In five minutes, tell us who you are, what you are looking for and what you can bring." },
  { title: "2. Meet Fairy", text: "Our AI fairy suggests the mentors, partners or projects that fit you best." },
  { title: "3. Move forward together", text: "One-to-one meetings, guides from the Gazette and a community that has your back." },
];

export default function EnglishHome() {
  return (
    <div lang="en">
      <header className="entete">
        <div className="conteneur entete__contenu">
          <Link href="/en" className="logo" aria-label="Businesseur, home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Images/logo-businesseur.png" alt="" className="logo__icone" />
            <span>Business<em>eur</em></span>
          </Link>
          <nav className="nav-pages" aria-label="Pages">
            <Langue active="en" />
            <Link href="/connexion">Log in</Link>
            <Link href="/connexion?mode=inscription" className="bouton bouton--or">Sign up</Link>
          </nav>
        </div>
      </header>

      <main className="page-contenu">
        <section className="section">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">Welcome to Businesseur</p>
              <h1>Push the door of the oasis</h1>
              <p>
                Businesseur connects entrepreneurs, mentors and investors, guided by Fairy, our AI fairy.
                Like an oasis in the desert, it is the place where projects find what they need to grow.
              </p>
            </header>

            <div className="grille-cartes">
              {PROFILES.map((p) => (
                <div key={p.badge} className="carte">
                  <span className="carte__badge">{p.badge}</span>
                  <h2>{p.title}</h2>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--sable">
          <div className="conteneur">
            <header className="section__tete">
              <p className="surtitre surtitre--sombre">How it works</p>
              <h2>Three steps across the desert</h2>
            </header>
            <div className="grille-cartes">
              {STEPS.map((s) => (
                <div key={s.title} className="carte">
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="conteneur section__tete">
            <h2>Ready to join the oasis?</h2>
            <p>The rest of the website is in French for now. Our projects, members and the Gazette are waiting for you.</p>
            <p>
              <Link href="/connexion?mode=inscription" className="bouton bouton--or bouton--grand">Sign up</Link>{" "}
              <Link href="/" className="bouton bouton--nuit bouton--grand">Visit the French site</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
