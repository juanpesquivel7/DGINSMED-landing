import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/data/articles";
import { getProductBySlug } from "@/data/products";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | DG-INSMED`,
    description: article.metaDescription,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedProducts = article.relatedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <Link href="/blog" className="text-sm text-brand-400 hover:underline">
        ← Blog
      </Link>
      <p className="mt-4 text-xs text-foreground/40">
        {new Date(article.publishedAt).toLocaleDateString("es-AR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        · {article.readingTime} de lectura
      </p>
      <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground">
        {article.title}
      </h1>
      <p className="mt-4 text-base text-foreground/70">{article.intro}</p>

      <div className="mt-8 flex flex-col gap-8">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-xl font-semibold text-brand-400">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mb-3 text-sm leading-relaxed text-foreground/80">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-2 flex flex-col gap-2 text-sm text-foreground/80">
                {section.list.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-400">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <p className="mt-10 rounded-xl border border-border bg-navy-900 p-4 text-xs text-foreground/50">
        {article.disclaimer}
      </p>

      {relatedProducts.length > 0 && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground/50">
            Productos relacionados
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/productos/${product.slug}`}
                className="rounded-xl border border-border p-4 transition-colors hover:border-brand-500"
              >
                <p className="text-sm font-semibold text-foreground">
                  {product.name}
                </p>
                <p className="mt-1 text-sm text-brand-400">
                  ${product.price.toLocaleString("es-AR")} ARS
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
