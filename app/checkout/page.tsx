"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import type { EnviaAddress, EnviaRate } from "@/lib/envia";
import { AR_PROVINCES } from "@/lib/ar-provinces";

const emptyAddress: EnviaAddress = {
  name: "",
  phone: "",
  email: "",
  street: "",
  city: "",
  state: "",
  country: "AR",
  postalCode: "",
};

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState<EnviaAddress>(emptyAddress);
  const [rates, setRates] = useState<EnviaRate[] | null>(null);
  const [selectedRate, setSelectedRate] = useState<EnviaRate | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = (field: keyof EnviaAddress, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const calculateShipping = async () => {
    setError(null);
    setLoadingRates(true);
    setRates(null);
    setSelectedRate(null);
    try {
      const res = await fetch("/api/shipping/rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: address, items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo cotizar el envío");
      setRates(data.rates);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoadingRates(false);
    }
  };

  const goToPayment = async () => {
    if (!selectedRate) return;
    setError(null);
    setLoadingPayment(true);
    try {
      const res = await fetch("/api/checkout/mercadopago", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, address, shipping: selectedRate }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo iniciar el pago");
      clear();
      window.location.href = data.initPoint;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setLoadingPayment(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-foreground/70">Tu carrito está vacío.</p>
        <button
          onClick={() => router.push("/productos")}
          className="mt-4 rounded-full bg-action-500 px-6 py-3 text-sm font-semibold text-white"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-semibold text-foreground">Checkout</h1>

        <div className="grid gap-3 rounded-2xl border border-border p-6">
          <h2 className="text-sm font-semibold text-foreground/80">
            Dirección de envío
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Nombre completo"
              value={address.name}
              onChange={(e) => handleAddressChange("name", e.target.value)}
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 sm:col-span-2"
            />
            <input
              placeholder="Teléfono"
              value={address.phone}
              onChange={(e) => handleAddressChange("phone", e.target.value)}
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
            />
            <input
              placeholder="Correo (opcional)"
              value={address.email}
              onChange={(e) => handleAddressChange("email", e.target.value)}
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
            />
            <input
              placeholder="Calle y número"
              value={address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40 sm:col-span-2"
            />
            <input
              placeholder="Ciudad"
              value={address.city}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
            />
            <select
              value={address.state}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground"
            >
              <option value="">Provincia</option>
              {AR_PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              placeholder="Código postal"
              value={address.postalCode}
              onChange={(e) =>
                handleAddressChange("postalCode", e.target.value)
              }
              className="rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
            />
          </div>
          <button
            onClick={calculateShipping}
            disabled={loadingRates}
            className="mt-2 w-fit rounded-full bg-action-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-action-600 disabled:opacity-50"
          >
            {loadingRates ? "Calculando..." : "Calcular envío"}
          </button>
        </div>

        {rates && (
          <div className="rounded-2xl border border-border p-6">
            <h2 className="mb-3 text-sm font-semibold text-foreground/80">
              Opciones de envío
            </h2>
            {rates.length === 0 ? (
              <p className="text-sm text-foreground/60">
                Envia.com no devolvió tarifas disponibles para este destino.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {rates.map((rate, idx) => (
                  <li key={idx}>
                    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border px-4 py-3 text-sm has-[:checked]:border-brand-500 has-[:checked]:bg-brand-500/10">
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="rate"
                          checked={selectedRate === rate}
                          onChange={() => setSelectedRate(rate)}
                        />
                        <span>
                          {rate.carrierDescription} — {rate.serviceDescription}
                          <span className="block text-xs text-foreground/50">
                            {rate.deliveryEstimate}
                          </span>
                        </span>
                      </span>
                      <span className="font-semibold">
                        ${rate.totalPrice} {rate.currency}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      <div className="h-fit rounded-2xl border border-border p-6">
        <h2 className="mb-4 text-sm font-semibold text-foreground/80">
          Resumen del pedido
        </h2>
        <ul className="mb-4 flex flex-col gap-2 text-sm">
          {items.map((item) => (
            <li
              key={item.product.slug}
              className="flex justify-between text-foreground/70"
            >
              <span>
                {item.product.name} x{item.quantity}
              </span>
              <span>
                ${(item.product.price * item.quantity).toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between border-t border-border pt-3 text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toLocaleString("es-AR")} ARS</span>
        </div>
        <div className="flex justify-between pt-1 text-sm">
          <span>Envío</span>
          <span>
            {selectedRate
              ? `$${Number(selectedRate.totalPrice).toLocaleString("es-AR")} ARS`
              : "Por calcular"}
          </span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-semibold">
          <span>Total</span>
          <span>
            $
            {(
              subtotal + (selectedRate ? Number(selectedRate.totalPrice) : 0)
            ).toLocaleString("es-AR")}{" "}
            ARS
          </span>
        </div>
        <button
          onClick={goToPayment}
          disabled={!selectedRate || loadingPayment}
          className="mt-6 w-full rounded-full bg-action-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-600 disabled:opacity-50"
        >
          {loadingPayment ? "Redirigiendo..." : "Pagar con Mercado Pago"}
        </button>
      </div>
    </div>
  );
}
