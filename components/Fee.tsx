// Fairy, la fée IA de Businesseur, dessinée en SVG (ailes qui battent, baguette étoilée).
export default function Fee({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="feeLueur">
          <stop offset="0" stopColor="#FFF6D8" />
          <stop offset=".55" stopColor="#F3D48A" stopOpacity=".55" />
          <stop offset="1" stopColor="#F3D48A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="feeAile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE3F2" stopOpacity=".95" />
          <stop offset="1" stopColor="#B9A2DA" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id="feeRobe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DDB463" />
          <stop offset="1" stopColor="#9C5670" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="92" fill="url(#feeLueur)" />
      {/* Ailes */}
      <g className="fee__aile fee__aile--gauche">
        <path d="M96 92C70 50 30 52 34 82c3 22 34 26 62 14z" fill="url(#feeAile)" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M96 100c-24 6-46 22-36 40 10 14 30 0 38-30z" fill="url(#feeAile)" stroke="#FFFFFF" strokeWidth="2" />
      </g>
      <g className="fee__aile fee__aile--droite">
        <path d="M104 92c26-42 66-40 62-10-3 22-34 26-62 14z" fill="url(#feeAile)" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M104 100c24 6 46 22 36 40-10 14-30 0-38-30z" fill="url(#feeAile)" stroke="#FFFFFF" strokeWidth="2" />
      </g>
      {/* Robe */}
      <path d="M100 86c-10 0-16 10-20 30l-8 34h56l-8-34c-4-20-10-30-20-30z" fill="url(#feeRobe)" />
      {/* Tête et chignon */}
      <circle cx="100" cy="68" r="17" fill="#F2D0B8" />
      <path d="M83 66c0-14 8-22 17-22s18 8 17 22c-6-6-12-8-17-8s-12 2-17 8z" fill="#4A2E45" />
      <circle cx="100" cy="44" r="7" fill="#4A2E45" />
      <circle cx="94" cy="69" r="1.8" fill="#2B1B2A" />
      <circle cx="106" cy="69" r="1.8" fill="#2B1B2A" />
      <path d="M95 75q5 4 10 0" stroke="#8E3B4F" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Baguette */}
      <path d="M118 112l30-34" stroke="#DDB463" strokeWidth="3" strokeLinecap="round" />
      <path className="fee__etoile" d="M150 62l4 9 10 1-8 6 3 10-9-5-9 5 3-10-8-6 10-1z" fill="#FFE59A" stroke="#DDB463" strokeWidth="1.5" />
      {/* Paillettes */}
      <g fill="#FFFFFF">
        <circle className="fee__paillette" cx="166" cy="96" r="2.5" />
        <circle className="fee__paillette" cx="140" cy="48" r="2" />
        <circle className="fee__paillette" cx="174" cy="60" r="1.8" />
      </g>
    </svg>
  );
}
