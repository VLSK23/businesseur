import { permanentRedirect } from "next/navigation";

// Ancienne adresse : la page s'appelle maintenant "La Gazette du Businesseur".
export default function AnciennePageActBusiness() {
  permanentRedirect("/gazette");
}
