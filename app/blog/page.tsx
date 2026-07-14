import Link from "next/link";
import { articles } from "@/data/articles";

export const metadata = {
  title: "Blog | DG-INSMED",
  description:
    "Guías sobre autoinyección: GLP-1, insulina, terapia inyectable y cómo elegir el dispositivo de aplicación adecuado.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-2xl font-semibold text-brand-400">Blog</h1>
      <p className="mb-10 text-sm text-foreground/60">
        Guías sobre autoinyección y tratamientos de aplicación frecuente.
      </p>
      <div className="flex flex-col gap-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="rounded-2xl border border-border p-6 transition-colors hover:border-brand-500"
          >
            <p className="mb-1 text-xs text-foreground/40">
              {article.readingTime} de lectura
            </p>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              {article.title}
            </h2>
            <p className="text-sm text-foreground/70">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
