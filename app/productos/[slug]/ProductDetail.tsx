"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Truck, Shield, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface Props {
  product: Product;
}

export default function ProductDetail({ product }: Props) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, 1, selectedVariants);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const allVariantsSelected =
    !product.variants ||
    product.variants.every((v) => selectedVariants[v.name]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
          <Image
            src={product.images[activeImage]}
            alt={`${product.name} - imagen ${activeImage + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImage((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white transition-colors"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setActiveImage((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white transition-colors"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors flex-shrink-0 ${
                  activeImage === idx
                    ? "border-accent"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                aria-label={`Ver imagen ${idx + 1}`}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary leading-tight mb-3">
          {product.name}
        </h1>

        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-sm text-gray-500 ml-1">(32 reseñas)</span>
        </div>

        <div className="text-3xl font-extrabold text-primary mb-6">
          {formatPrice(product.price)}
        </div>

        <p className="text-gray-600 leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Variants */}
        {product.variants &&
          product.variants.map((variant) => (
            <div key={variant.name} className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {variant.name}:{" "}
                <span className="font-normal text-gray-500">
                  {selectedVariants[variant.name] || "Seleccionar"}
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setSelectedVariants((prev) => ({
                        ...prev,
                        [variant.name]: option,
                      }))
                    }
                    className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedVariants[variant.name] === option
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

        {/* Stock */}
        <div className="mb-6">
          {product.stock > 5 ? (
            <span className="text-green-600 text-sm font-medium">
              ✅ En stock ({product.stock} disponibles)
            </span>
          ) : product.stock > 0 ? (
            <span className="text-amber-600 text-sm font-medium">
              ⚠️ ¡Últimas {product.stock} unidades!
            </span>
          ) : (
            <span className="text-red-600 text-sm font-medium">
              ❌ Sin stock
            </span>
          )}
        </div>

        {/* Add to cart */}
        <Button
          size="lg"
          fullWidth
          onClick={handleAddToCart}
          disabled={product.stock === 0 || !allVariantsSelected}
          className="mb-3"
        >
          <ShoppingCart className="h-5 w-5" />
          {added
            ? "¡Agregado al carrito! ✓"
            : product.variants && !allVariantsSelected
            ? "Seleccionar opciones"
            : "Agregar al carrito"}
        </Button>

        {product.variants && !allVariantsSelected && (
          <p className="text-sm text-amber-600 text-center mb-3">
            Por favor seleccioná todas las opciones antes de agregar al carrito.
          </p>
        )}

        <Link href="/carrito">
          <Button variant="outline" size="lg" fullWidth>
            Ver carrito
          </Button>
        </Link>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4 text-primary flex-shrink-0" />
            <span>Envío por Andreani</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4 text-primary flex-shrink-0" />
            <span>Garantía oficial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
