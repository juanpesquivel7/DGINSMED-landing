import { NextRequest, NextResponse } from "next/server";
import type { CartItem } from "@/types/cart";
import type { EnviaAddress, EnviaRate } from "@/lib/envia";

export async function POST(request: NextRequest) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "Falta configurar MERCADOPAGO_ACCESS_TOKEN en .env.local" },
      { status: 500 }
    );
  }

  const body = await request.json();
  const items = body.items as CartItem[];
  const address = body.address as EnviaAddress;
  const shipping = body.shipping as EnviaRate;

  if (!items?.length || !address || !shipping) {
    return NextResponse.json(
      { error: "Faltan items, address o shipping en la solicitud" },
      { status: 400 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  // Mercado Pago rechaza auto_return si las back_urls no son un dominio
  // público (falla con localhost) — solo lo activamos fuera de desarrollo.
  const isLocalUrl = siteUrl.includes("localhost") || siteUrl.includes("127.0.0.1");

  const preferenceItems = [
    ...items.map((item) => ({
      title: item.product.name,
      quantity: item.quantity,
      unit_price: item.product.price,
      currency_id: "ARS",
    })),
    {
      title: `Envío - ${shipping.carrierDescription} (${shipping.serviceDescription})`,
      quantity: 1,
      unit_price: Number(shipping.totalPrice),
      currency_id: "ARS",
    },
  ];

  try {
    const response = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: preferenceItems,
          payer: {
            name: address.name,
            phone: { number: address.phone },
            email: address.email || undefined,
          },
          back_urls: {
            success: `${siteUrl}/checkout/exito`,
            failure: `${siteUrl}/checkout`,
            pending: `${siteUrl}/checkout`,
          },
          ...(isLocalUrl
            ? {}
            : {
                auto_return: "approved",
                notification_url: `${siteUrl}/api/webhooks/mercadopago`,
              }),
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Mercado Pago error (${response.status}): ${text}`);
    }

    const preference = await response.json();
    return NextResponse.json({ initPoint: preference.init_point });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 502 }
    );
  }
}
