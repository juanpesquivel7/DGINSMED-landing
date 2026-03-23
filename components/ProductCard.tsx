"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
      {/* Image */}
      <Link href={`/productos/${product.slug}`} className="block overflow-hidden aspect-[4/3] bg-gray-50 relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-accent text-white text-xs font-semibold px-2 py-1 rounded-full">
              ¡Últimas unidades!
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/productos/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-primary font-bold text-lg">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
