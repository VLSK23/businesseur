import { permanentRedirect } from "next/navigation";
import { ARTICLES } from "@/lib/articles";

// Ancienne adresse d'un article : redirige vers La Gazette du Businesseur.
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function AncienArticle({ params }: PageProps<"/act-business/[slug]">) {
  const { slug } = await params;
  permanentRedirect(`/gazette/${slug}`);
}
