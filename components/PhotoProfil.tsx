"use client";

import { useEffect, useRef, useState } from "react";

// Affiche la photo d'un profil (public/Images/businesseurs/photos/...).
// Si la photo n'a pas encore été ajoutée, on garde le portrait dessiné.
export default function PhotoProfil({ photo, dessin, alt, className }: { photo?: string; dessin: string; alt: string; className?: string }) {
  const [src, setSrc] = useState(photo ?? dessin);
  const img = useRef<HTMLImageElement>(null);

  // La photo a pu échouer avant que la page soit interactive : on vérifie une fois chargée
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0 && src !== dessin) setSrc(dessin);
  }, [src, dessin]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img ref={img} className={className} src={src} alt={alt} onError={() => src !== dessin && setSrc(dessin)} />
  );
}
