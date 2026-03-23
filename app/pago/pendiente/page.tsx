"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Clock, Mail, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Button from "@/components/ui/Button";

export default function PaymentPendingPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-100 rounded-full mb-6">
          <Clock className="h-10 w-10 text-amber-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-primary mb-3">
          Pago pendiente
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Tu pago está siendo procesado. Esto puede tardar algunas horas,
          especialmente si elegiste pagar por transferencia bancaria.
        </p>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Te avisaremos por email</p>
              <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                Cuando tu pago sea confirmado por Mercado Pago, recibirás un email
                con el detalle de tu compra y el seguimiento del envío.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm">Tiempo de acreditación</p>
              <p className="text-amber-700 text-sm mt-1 leading-relaxed">
                Las transferencias bancarias pueden demorar hasta 1 día hábil.
                Los pagos en efectivo (PagoFácil, Rapipago) hasta 2 días hábiles.
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
