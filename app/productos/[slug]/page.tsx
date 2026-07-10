import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { AddToCartButton } from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 sm:grid-cols-2">
        <div className="relative flex aspect-square items-center justify-center rounded-2xl bg-[#cccccc]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="w-fit rounded-full bg-brand-500/15 px-3 py-1 text-xs font-semibold text-brand-400">
            {product.applicatorType}
          </span>
          <h1 className="text-2xl font-semibold text-foreground">
            {product.name}
          </h1>
          <p className="text-foreground/70">{product.description}</p>
          <div className="flex items-baseline gap-3">
            {product.originalPrice && (
              <span className="text-lg text-foreground/40 line-through">
                ${product.originalPrice.toLocaleString("es-AR")}
              </span>
            )}
            <p className="text-2xl font-bold text-brand-400">
              ${product.price.toLocaleString("es-AR")} ARS
            </p>
          </div>
          <AddToCartButton product={product} />

          <dl className="mt-4 grid gap-3 border-t border-border pt-4 text-sm">
            <div>
              <dt className="font-semibold text-foreground">Tipo de jeringa</dt>
              <dd className="text-foreground/70">{product.syringeType}</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">
                Tratamientos y usos relevantes
              </dt>
              <dd className="text-foreground/70">{product.treatments}</dd>
            </div>
          </dl>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-foreground">
              Características y detalles técnicos
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-foreground/70">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2">
                  <span className="text-brand-400">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-foreground/40">
            Peso: {product.weight} {product.weightUnit} · Dimensiones:{" "}
            {product.dimensions.length}x{product.dimensions.width}x
            {product.dimensions.height} {product.dimensions.lengthUnit}
          </p>
        </div>
      </div>
    </div>
  );
}
