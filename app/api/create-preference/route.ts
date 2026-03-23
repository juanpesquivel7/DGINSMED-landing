import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "@/lib/supabase";
import { createMercadoPagoPreference } from "@/lib/mercadopago";
import { CartItem, ShippingAddress } from "@/types";

interface RequestBody {
  items: CartItem[];
  shippingCost: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  shippingAddress: ShippingAddress;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { items, shippingCost, customer, shippingAddress } = body;

    if (!items?.length || !customer?.email || !shippingAddress?.cp) {
      return NextResponse.json(
        { error: "Datos incompletos. Revisá el formulario." },
        { status: 400 }
      );
    }

    // Calculate total
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const total = subtotal + (shippingCost || 0);

    // Create order in Supabase
    const orderItems = items.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
      image: item.product.images[0],
    }));

    const order = await createOrder({
      status: "pending",
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: shippingAddress,
      items: orderItems,
      shipping_cost: shippingCost || 0,
      total,
      mp_payment_id: undefined,
      mp_preference_id: undefined,
    });

    // Create Mercado Pago preference
    const preference = await createMercadoPagoPreference({
      orderId: order.id,
      items,
      shippingCost: shippingCost || 0,
      customerEmail: customer.email,
      customerName: customer.name,
      shippingAddress,
    });

    // Update order with preference ID
    const { supabase } = await import("@/lib/supabase");
    await supabase
      .from("orders")
      .update({ mp_preference_id: preference.id })
      .eq("id", order.id);

    return NextResponse.json({
      init_point: preference.init_point,
      preference_id: preference.id,
      order_id: order.id,
    });
  } catch (error) {
    console.error("[create-preference] Error:", error);
    return NextResponse.json(
      {
        error:
          "Ocurrió un error al procesar tu pedido. Por favor intentá de nuevo.",
      },
      { status: 500 }
    );
  }
}
