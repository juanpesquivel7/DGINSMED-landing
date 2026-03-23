"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";

interface FormData {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  calle: string;
  numero: string;
  piso: string;
  depto: string;
  ciudad: string;
  provincia: string;
  cp: string;
}

const PROVINCES = [
  "Buenos Aires",
  "CABA",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    calle: "",
    numero: "",
    piso: "",
    depto: "",
    ciudad: "",
    provincia: "",
    cp: "",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-3">
          No tenés productos en el carrito
        </h1>
        <Link href="/#productos">
          <Button size="lg">Ver productos</Button>
        </Link>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/create-preference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingCost: 0,
          customer: {
            name: `${form.nombre} ${form.apellido}`,
            email: form.email,
            phone: form.telefono,
          },
          shippingAddress: {
            calle: form.calle,
            numero: form.numero,
            piso: form.piso,
            depto: form.depto,
            ciudad: form.ciudad,
            provincia: form.provincia,
            cp: form.cp,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al procesar el pago");
      }

      window.location.href = data.init_point;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error. Por favor intentá de nuevo."
      );
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h1 className="text-2xl md:text-3xl font-extrabold text-primary mb-8">
        Datos de envío
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal data */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">
              Datos personales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className={labelClass}>
                  Nombre *
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  value={form.nombre}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Juan"
                />
              </div>
              <div>
                <label htmlFor="apellido" className={labelClass}>
                  Apellido *
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  required
                  value={form.apellido}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="García"
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="juan@email.com"
                />
              </div>
              <div>
                <label htmlFor="telefono" className={labelClass}>
                  Teléfono *
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="1112345678"
                />
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-bold text-gray-900 mb-5 text-lg">
              Dirección de envío
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="calle" className={labelClass}>
                  Calle *
                </label>
                <input
                  id="calle"
                  name="calle"
                  type="text"
                  required
                  value={form.calle}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Av. Corrientes"
                />
              </div>
              <div>
                <label htmlFor="numero" className={labelClass}>
                  Número *
                </label>
                <input
                  id="numero"
                  name="numero"
                  type="text"
                  required
                  value={form.numero}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="1234"
                />
              </div>
              <div>
                <label htmlFor="cp" className={labelClass}>
                  Código postal *
                </label>
                <input
                  id="cp"
                  name="cp"
                  type="text"
                  required
                  value={form.cp}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="1414"
                />
              </div>
              <div>
                <label htmlFor="piso" className={labelClass}>
                  Piso
                </label>
                <input
                  id="piso"
                  name="piso"
                  type="text"
                  value={form.piso}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="3"
                />
              </div>
              <div>
                <label htmlFor="depto" className={labelClass}>
                  Departamento
                </label>
                <input
                  id="depto"
                  name="depto"
                  type="text"
                  value={form.depto}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="B"
                />
              </div>
              <div>
                <label htmlFor="ciudad" className={labelClass}>
                  Ciudad *
                </label>
                <input
                  id="ciudad"
                  name="ciudad"
                  type="text"
                  required
                  value={form.ciudad}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Buenos Aires"
                />
              </div>
              <div>
                <label htmlFor="provincia" className={labelClass}>
                  Provincia *
                </label>
                <select
                  id="provincia"
                  name="provincia"
                  required
                  value={form.provincia}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Seleccionar provincia</option>
                  {PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              ❌ {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={loading}
          >
            {loading ? "Redirigiendo a Mercado Pago..." : "Continuar al pago →"}
          </Button>

          <p className="text-xs text-gray-400 text-center">
            🔒 Serás redirigido a Mercado Pago para completar el pago de forma segura.
          </p>
        </form>

        {/* Order summary sidebar */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-6 font-bold text-gray-900 hover:bg-gray-50 transition-colors lg:cursor-default"
              onClick={() => setShowOrderSummary(!showOrderSummary)}
            >
              <span>Resumen de pedido</span>
              <span className="lg:hidden">
                {showOrderSummary ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            </button>

            <div className={`${showOrderSummary ? "block" : "hidden"} lg:block border-t border-gray-100`}>
              <div className="p-6 space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-primary font-bold mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600">A calcular</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary text-base border-t border-gray-100 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
