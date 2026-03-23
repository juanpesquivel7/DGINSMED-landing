"use client";

import Link from "next/link";
import { XCircle, RefreshCw, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PaymentFailedPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <XCircle className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-extrabold text-primary mb-3">
          El pago no pudo procesarse
        </h1>
        <p className="text-gray-500 text-lg mb-8 leading-relaxed">
          Hubo un problema con tu método de pago. Por favor revisá los datos
          de tu tarjeta o intentá con otro medio de pago.
        </p>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
          <p className="font-semibold text-red-800 text-sm mb-2">Posibles causas:</p>
          <ul className="text-red-700 text-sm space-y-1 list-disc list-inside">
            <li>Fondos insuficientes</li>
            <li>Tarjeta vencida o datos incorrectos</li>
            <li>Límite de compra online superado</li>
            <li>Pago rechazado por el banco emisor</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/checkout" className="flex-1">
            <Button size="lg" fullWidth>
              <RefreshCw className="h-4 w-4" />
              Intentar de nuevo
            </Button>
          </Link>
          <Link href="/carrito" className="flex-1">
            <Button variant="outline" size="lg" fullWidth>
              <ArrowLeft className="h-4 w-4" />
              Volver al carrito
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          Si el problema persiste, contactanos a{" "}
          <a
            href="mailto:ventas@tutienda.com.ar"
            className="text-primary underline"
          >
            ventas@tutienda.com.ar
          </a>
        </p>
      </div>
    </div>
  );
}
