"use client";

import { useEffect, useRef, useState } from "react";

// Affiche la photo d'un profil (public/Images/businesseurs/photos/...).
// On essaie le fichier en .jpg, puis .jpeg, .png et .webp.
// Si aucune photo n'a été ajoutée, on garde le portrait dessiné, ou à défaut les initiales.
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function candidats(photo?: string, dessin?: string) {
  const liste: string[] = [];
  if (photo) {
    const base = photo.replace(/\.(jpe?g|png|webp)$/i, "");
    liste.push(photo, ...EXTENSIONS.map((e) => base + e).filter((p) => p !== photo));
  }
  if (dessin) liste.push(dessin);
  return liste;
}

export default function PhotoProfil({
  photo,
  dessin,
  initiales,
  alt,
  className,
}: {
  photo?: string;
  dessin?: string;
  initiales?: string;
  alt: string;
  className?: string;
}) {
  const sources = candidats(photo, dessin);
  const [rang, setRang] = useState(0);
  const img = useRef<HTMLImageElement>(null);
  const suivant = () => setRang((r) => r + 1);

  // La photo a pu échouer avant que la page soit interactive : on vérifie une fois chargée
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) suivant();
  }, [rang]);

  if (rang >= sources.length) {
    return <span className={`mini-avatar ${className ?? ""}`} role="img" aria-label={alt}>{initiales}</span>;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={img} className={className} src={sources[rang]} alt={alt} onError={suivant} />
  );
}
