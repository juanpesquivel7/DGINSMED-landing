"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <Link
        href={`/productos/${product.slug}`}
        className="relative flex aspect-square items-center justify-center bg-[#cccccc]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-contain p-4"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="text-sm font-semibold text-card-foreground group-hover:text-brand-400">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-baseline gap-2">
          {product.originalPrice && (
            <span className="text-xs text-card-foreground/40 line-through">
              ${product.originalPrice.toLocaleString("es-AR")}
            </span>
          )}
          <span className="text-base font-semibold text-brand-400">
            ${product.price.toLocaleString("es-AR")}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <div className="flex items-center overflow-hidden rounded-full border border-border">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 text-sm text-card-foreground/70 hover:bg-white/5"
              aria-label="Restar"
            >
              −
            </button>
            <span className="px-2 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 text-sm text-card-foreground/70 hover:bg-white/5"
              aria-label="Sumar"
            >
              +
            </button>
          </div>
          <button
            onClick={() => addItem(product, quantity)}
            className="flex-1 rounded-full bg-action-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-action-600"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
