import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Traduction from "@/components/Traduction";
import "./globals.css";

// Polices de Businesseur : Fraunces (titres) + Inter (texte)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Businesseur | L'oasis des entrepreneurs, mentors et investisseurs",
  description:
    "Businesseur met en relation entrepreneurs, mentors et investisseurs, guidés par Fairy, notre fée IA.",
};

// Si le visiteur a choisi l'anglais, on cache la page le temps de la traduire
// (pour ne pas voir le français une fraction de seconde). Sécurité : réaffichée après 1,5 s.
const SCRIPT_LANGUE = `try{if(localStorage.getItem("langue")==="en"||document.cookie.indexOf("langue=en")>-1){var h=document.documentElement;h.lang="en";h.classList.add("traduction-en-attente");setTimeout(function(){h.classList.remove("traduction-en-attente")},1500)}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_LANGUE }} />
      </head>
      <body>
        {children}
        <Traduction />
      </body>
    </html>
  );
}
