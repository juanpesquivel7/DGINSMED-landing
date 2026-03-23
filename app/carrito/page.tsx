"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Truck, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface ShippingQuote {
  price: number;
  estimatedDays: string;
  service: string;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalWeight } = useCart();
  const [postalCode, setPostalCode] = useState("");
  const [shippingQuote, setShippingQuote] = useState<ShippingQuote | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingError, setShippingError] = useState("");

  const handleShippingQuote = async () => {
    if (!postalCode || postalCode.length < 4) {
      setShippingError("Ingresá un código postal válido.");
      return;
    }
    setShippingError("");
    setLoadingShipping(true);
    setShippingQuote(null);

    try {
      const res = await fetch("/api/andreani-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postalCode, weight: totalWeight }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al cotizar");
      setShippingQuote(data);
    } catch (err) {
      setShippingError(
        err instanceof Error ? err.message : "No se pudo cotizar el envío. Intentá de nuevo."
      );
    } finally {
      setLoadingShipping(false);
    }
  };

  const finalTotal = totalPrice + (shippingQuote?.price || 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-3">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">
          Aún no agregaste productos. ¡Explorá nuestra tienda!
        </p>
        <Link href="/#productos">
          <Button size="lg">
            Ver productos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-8">
        Mi carrito ({items.length} {items.length === 1 ? "producto" : "productos"})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items list */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <Link
                href={`/productos/${item.product.slug}`}
                className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  href={`/productos/${item.product.slug}`}
                  className="font-semibold text-gray-900 hover:text-primary transition-colors text-sm line-clamp-2 block mb-1"
                >
                  {item.product.name}
                </Link>
                {item.selectedVariants &&
                  Object.entries(item.selectedVariants).map(([k, v]) => (
                    <span
                      key={k}
                      className="text-xs text-gray-500 block"
                    >
                      {k}: {v}
                    </span>
                  ))}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      aria-label="Disminuir cantidad"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="font-semibold text-sm w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                      className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-40"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Eliminar del carrito"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="space-y-4">
          {/* Shipping quote */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-gray-900">Calcular envío</h2>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Código postal"
                value={postalCode}
                onChange={(e) =>
                  setPostalCode(e.target.value.replace(/\D/g, "").slice(0, 8))
                }
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                onKeyDown={(e) => e.key === "Enter" && handleShippingQuote()}
              />
              <Button
                onClick={handleShippingQuote}
                loading={loadingShipping}
                size="md"
              >
                Cotizar
              </Button>
            </div>
            {shippingError && (
              <p className="text-red-500 text-xs mt-2">{shippingError}</p>
            )}
            {shippingQuote && (
              <div className="mt-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-sm font-semibold text-green-800">
                  Envío: {formatPrice(shippingQuote.price)}
                </p>
                <p className="text-xs text-green-600 mt-0.5">
                  {shippingQuote.service} · {shippingQuote.estimatedDays}
                </p>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-4">Resumen del pedido</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal productos</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>
                  {shippingQuote
                    ? formatPrice(shippingQuote.price)
                    : "Calculá el envío"}
                </span>
              </div>
              <div className="border-t border-gray-100 pt-2 mt-2 flex justify-between font-bold text-base text-primary">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" fullWidth className="mt-4">
                Ir al checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            <p className="text-xs text-gray-400 text-center mt-3">
              🔒 Pago seguro con Mercado Pago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
