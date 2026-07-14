import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { articles } from "@/data/articles";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dginsmed.online";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/productos", "/rastreo", "/blog"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${SITE_URL}/productos/${product.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.publishedAt,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
