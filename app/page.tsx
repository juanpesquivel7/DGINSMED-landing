"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Clients } from "@/components/Clients";
import { products } from "@/data/products";
import { useLanguage } from "@/lib/language-context";

export default function Home() {
  const { t } = useLanguage();
  const featured = products.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-navy-950">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              {t("heroTitle1")}
              <br />
              <span className="text-brand-400">{t("heroTitle2")}</span>
            </h1>
            <p className="max-w-md text-base text-foreground/70">
              {t("heroSubtitle")}
            </p>
            <Link
              href="/productos"
              className="rounded-full bg-action-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-600"
            >
              {t("heroCta")}
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
            {t("ourProducts")}
          </h2>
          <Link
            href="/productos"
            className="text-sm font-medium text-brand-400 hover:underline"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-semibold text-brand-400">
            {t("shippingNote")}
          </p>
          <a
            href="https://wa.me/5493415621580?text=Hola%2C%20quiero%20consultar%20precios%20al%20por%20mayor%20de%20DG-Ject."
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/60 underline-offset-4 hover:text-foreground hover:underline"
          >
            {t("wholesaleNote")}
          </a>
        </div>
      </section>

      <Clients />
    </div>
  );
}
