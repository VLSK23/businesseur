// Repère visuel pour les informations à remplir (surlignées en orange sur la page).
export default function ACompleter({ children }: { children: React.ReactNode }) {
  return <span className="a-completer">[À compléter : {children}]</span>;
}
