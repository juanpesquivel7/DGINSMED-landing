import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug, products } from "@/lib/products";
import ProductDetail from "./ProductDetail";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Producto no encontrado" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tutienda.com.ar";

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 600, alt: product.name }],
      url: `${siteUrl}/productos/${product.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "TuTienda",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium line-clamp-1">
            {product.name}
          </span>
        </nav>

        <ProductDetail product={product} />

        {/* Long description */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-6">
            Descripción completa
          </h2>
          <div className="bg-gray-50 rounded-2xl p-8">
            {product.longDescription.split("\n").map((line, i) => (
              <p
                key={i}
                className={line.trim() === "" ? "my-2" : "mb-2 text-gray-700"}
              >
                {line.startsWith("**") && line.endsWith("**") ? (
                  <strong className="text-primary font-semibold">
                    {line.slice(2, -2)}
                  </strong>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
