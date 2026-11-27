import Link from "next/link";
import { notFound } from "next/navigation";
import EntetePages from "@/components/EntetePages";
import SuiviProjetForm from "@/components/SuiviProjetForm";
import { PROJETS, trouverProjet } from "@/lib/projets";

export function generateStaticParams() {
  return PROJETS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]/suivre">) {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  return { title: projet ? `Suivre ${projet.nom} | Businesseur` : "Suivre un projet | Businesseur" };
}

export default async function SuivreProjetPage({ params }: PageProps<"/projets/[slug]/suivre">) {
  const { slug } = await params;
  const projet = trouverProjet(slug);
  if (!projet) notFound();

  return (
    <>
      <EntetePages />
      <main className="auth">
        <div className="auth__pile">
          <SuiviProjetForm projet={projet.slug} nomProjet={projet.nom} />
          <Link href={`/projets/${projet.slug}`} className="lien-retour lien-retour--clair">
            ← Retour à {projet.nom}
          </Link>
        </div>
      </main>
    </>
  );
}
