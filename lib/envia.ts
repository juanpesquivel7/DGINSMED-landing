import type { CartItem } from "@/types/cart";

const ENVIA_BASE_URL =
  process.env.ENVIA_API_ENV === "production"
    ? "https://api.envia.com"
    : "https://api-test.envia.com";

export interface EnviaAddress {
  name: string;
  phone: string;
  email?: string;
  street: string;
  number?: string;
  district?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface EnviaRate {
  carrier: string;
  carrierDescription: string;
  service: string;
  serviceDescription: string;
  deliveryEstimate: string;
  totalPrice: string;
  currency: string;
}

// Origen fijo del negocio. Confirmar con el cliente el número de puerta
// exacto y el código postal de Richieri 1235, Rosario, Santa Fe.
// Nota: "state" debe ir en código de provincia de máx. 2 caracteres
// (la API de Envia.com rechaza nombres completos como "Santa Fe").
export const ORIGIN_ADDRESS: EnviaAddress = {
  name: "DG-INSMED",
  phone: "5493415621580",
  street: "Richieri 1235",
  city: "Rosario",
  state: "SF",
  country: "AR",
  postalCode: "2000",
};

// Transportistas argentinos habilitados en la cuenta de Envia.com para
// probar en la cotización. No todos tienen cobertura para cada origen/
// destino — los que no tienen cobertura se descartan silenciosamente y
// no bloquean el resultado, siempre que al menos uno responda con tarifas.
const CARRIERS_TO_TRY = ["correoargentino", "oca", "andreani", "urbano"];

function packagesFromCart(items: CartItem[]) {
  return items.map((item) => ({
    type: "box" as const,
    content: item.product.name,
    amount: item.quantity,
    weight: item.product.weight,
    weightUnit: item.product.weightUnit,
    dimensions: {
      length: item.product.dimensions.length,
      width: item.product.dimensions.width,
      height: item.product.dimensions.height,
    },
    lengthUnit: item.product.dimensions.lengthUnit,
    declaredValue: item.product.price * item.quantity,
  }));
}

async function rateForCarrier(
  apiKey: string,
  destination: EnviaAddress,
  items: CartItem[],
  carrier: string
): Promise<{ carrier: string; rates?: EnviaRate[]; error?: string }> {
  const response = await fetch(`${ENVIA_BASE_URL}/ship/rate/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      origin: ORIGIN_ADDRESS,
      destination,
      packages: packagesFromCart(items),
      shipment: { type: 1, carrier },
      settings: { currency: "ARS" },
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok || !data || data.meta === "error") {
    return {
      carrier,
      error: data?.error?.message ?? `HTTP ${response.status}`,
    };
  }

  return { carrier, rates: (data.data ?? []) as EnviaRate[] };
}

export async function getShippingRates(
  destination: EnviaAddress,
  items: CartItem[]
): Promise<EnviaRate[]> {
  const apiKey = process.env.ENVIA_API_KEY;
  if (!apiKey) {
    throw new Error("Falta configurar ENVIA_API_KEY en .env.local");
  }

  const results = await Promise.all(
    CARRIERS_TO_TRY.map((carrier) =>
      rateForCarrier(apiKey, destination, items, carrier)
    )
  );

  const rates = results.flatMap((r) => r.rates ?? []);
  if (rates.length === 0) {
    const errors = results.map((r) => `${r.carrier}: ${r.error}`).join(" | ");
    throw new Error(`Envia.com no devolvió tarifas para ningún transportista (${errors})`);
  }

  return rates;
}
