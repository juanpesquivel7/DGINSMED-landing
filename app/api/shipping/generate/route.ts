import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/types/cart";
import { ORIGIN_ADDRESS, type EnviaAddress } from "@/lib/envia";

// Genera la guía de envío en Envia.com tras confirmar el pago.
// Punto de extensión: llamar desde el webhook de Mercado Pago
// (evento payment con status "approved") pasando destination, items
// y el `carrier`/`service` de la tarifa que el cliente eligió en checkout.
export async function POST(request: NextRequest) {
  const ENVIA_BASE_URL =
    process.env.ENVIA_API_ENV === "production"
      ? "https://api.envia.com"
      : "https://api-test.envia.com";

  const apiKey = process.env.ENVIA_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Falta configurar ENVIA_API_KEY en .env.local" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const destination = body.destination as EnviaAddress;
  const items = body.items as CartItem[];
  const carrier = body.carrier as string;
  const service = body.service as string;

  if (!destination || !items?.length || !carrier || !service) {
    return NextResponse.json(
      {
        error:
          "Faltan destination, items, carrier o service en la solicitud",
      },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${ENVIA_BASE_URL}/ship/generate/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        origin: ORIGIN_ADDRESS,
        destination,
        packages: items.map((item) => ({
          type: "box",
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
        })),
        shipment: { type: 1, carrier, service },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Envia.com generate error (${response.status}): ${text}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 502 }
    );
  }
}
