"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-primary mb-3">
          ¡Pago exitoso!
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Tu compra fue procesada correctamente. Te enviamos un email de confirmación
          con el resumen del pedido. ¡Gracias por comprar en TuTienda!
        </p>

        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-800 text-sm">¿Qué pasa ahora?</p>
              <p className="text-green-700 text-sm mt-1 leading-relaxed">
                Estamos preparando tu pedido. Cuando sea despachado por Andreani,
                te enviaremos el número de tracking para seguir tu paquete en tiempo real.
              </p>
            </div>
          </div>
        </div>

        <Link href="/">
          <Button size="lg" fullWidth>
            Volver a la tienda
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
