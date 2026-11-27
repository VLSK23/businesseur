import Link from "next/link";
import { notFound } from "next/navigation";
import EntetePages from "@/components/EntetePages";
import NewsletterForm from "@/components/NewsletterForm";
import { ARTICLES, imageArticle, trouverArticle } from "@/lib/articles";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/gazette/[slug]">) {
  const { slug } = await params;
  const article = trouverArticle(slug);
  return { title: article ? `${article.titre} | La Gazette du Businesseur` : "La Gazette du Businesseur", description: article?.resume };
}

export default async function ArticlePage({ params }: PageProps<"/gazette/[slug]">) {
  const { slug } = await params;
  const article = trouverArticle(slug);
  if (!article) notFound();

  const autres = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <EntetePages />
      <main className="page-contenu">
        <section className="section">
          <article className="conteneur article">
            <Link href="/gazette" className="lien-retour">← Tous les articles de la Gazette</Link>
            <p className="surtitre surtitre--sombre">{article.categorie} · {article.lecture} de lecture</p>
            <h1>{article.titre}</h1>
            <p className="article__chapo">{article.resume}</p>
            <p className="article__auteur">Par {article.auteur}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="article__image" src={imageArticle(article.slug)} alt="" />

            {article.sections.map((s) => (
              <div key={s.titre}>
                <h2>{s.titre}</h2>
                {s.paragraphes.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            ))}

            <div className="article__newsletter newsletter">
              <p className="surtitre surtitre--sombre">La gazette du Businesseur</p>
              <h2>Vous avez aimé cet article ?</h2>
              <p>Recevez chaque mois nos nouveaux guides, des appels à projets et des portraits d&apos;entrepreneurs.</p>
              <NewsletterForm />
              <small>Un e-mail par mois, désinscription en un clic.</small>
            </div>

            <h2>À lire aussi</h2>
            <ul className="article__autres">
              {autres.map((a) => (
                <li key={a.slug}>
                  <Link href={`/gazette/${a.slug}`} className="lien-fleche">{a.titre}</Link>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </>
  );
}
