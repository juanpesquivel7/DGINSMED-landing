import { NextRequest, NextResponse } from "next/server";
import { getShippingRates, type EnviaAddress } from "@/lib/envia";
import type { CartItem } from "@/types/cart";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const destination = body.destination as EnviaAddress;
  const items = body.items as CartItem[];

  if (!destination || !items?.length) {
    return NextResponse.json(
      { error: "Faltan destination o items en el cuerpo de la solicitud" },
      { status: 400 }
    );
  }

  try {
    const rates = await getShippingRates(destination, items);
    return NextResponse.json({ rates });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 502 }
    );
  }
}
