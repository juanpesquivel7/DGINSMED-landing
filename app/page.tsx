import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Clients } from "@/components/Clients";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-navy-950">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Un Paso. Sin Stress.
              <br />
              <span className="text-brand-400">Sin Ver Agujas.</span>
            </h1>
            <p className="max-w-md text-base text-foreground/70">
              El autoinyector argentino para semaglutida, tirzepatida,
              insulina, esclerosis múltiple, hormona de crecimiento,
              urología y más.
            </p>
            <Link
              href="/productos"
              className="rounded-full bg-action-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-600"
            >
              Ver catálogo
            </Link>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy-900">
            <Image
              src="/hero-lifestyle.jpg"
              alt="Autoinyector DG-Ject en uso"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-brand-400">
            Nuestros Productos
          </h2>
          <Link
            href="/productos"
            className="text-sm font-medium text-brand-400 hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-semibold text-brand-400">
            Envíos a todo el país y Sudamérica
          </p>
          <a
            href="https://wa.me/5493415621580?text=Hola%2C%20quiero%20consultar%20precios%20al%20por%20mayor%20de%20DG-Ject."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/60 underline-offset-4 hover:text-foreground hover:underline"
          >
            Consultá por precios al por mayor.
          </a>
        </div>
      </section>

      <Clients />
    </div>
  );
}
