import { permanentRedirect } from "next/navigation";

// La page « Faire un don » a été retirée : l'ancienne adresse renvoie vers l'accueil.
export default function AnciennePageDon() {
  permanentRedirect("/");
}
