"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { choisirLangue } from "@/lib/langue";

// Ancienne adresse de la version anglaise : on passe le site en anglais
// puis on affiche l'accueil (tout le site est maintenant traduit).
export default function English() {
  const router = useRouter();
  useEffect(() => {
    choisirLangue("en");
    router.replace("/");
  }, [router]);
  return <p style={{ padding: 40, textAlign: "center" }}>Loading…</p>;
}
