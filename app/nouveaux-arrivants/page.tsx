import { permanentRedirect } from "next/navigation";

// Ancienne adresse : la page s'appelle maintenant "Les Businesseurs".
export default function AnciennePageNouveauxArrivants() {
  permanentRedirect("/businesseurs");
}
