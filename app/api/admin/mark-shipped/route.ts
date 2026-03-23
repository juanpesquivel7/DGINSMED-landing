import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId es requerido" },
        { status: 400 }
      );
    }

    await updateOrderStatus(orderId, "shipped");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[mark-shipped] Error:", error);
    return NextResponse.json(
      { error: "Error al actualizar el pedido" },
      { status: 500 }
    );
  }
}
