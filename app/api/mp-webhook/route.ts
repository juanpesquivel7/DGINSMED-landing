import { NextRequest, NextResponse } from "next/server";
import {
  getOrderById,
  getOrderByMpPreferenceId,
  updateOrderStatus,
} from "@/lib/supabase";
import { getPaymentInfo } from "@/lib/mercadopago";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    console.log("[mp-webhook] Received:", { type, data });

    if (type === "payment") {
      const paymentId = data?.id?.toString();
      if (!paymentId) return NextResponse.json({ ok: true });

      const payment = await getPaymentInfo(paymentId);
      console.log("[mp-webhook] Payment status:", payment.status);

      if (payment.status === "approved") {
        const orderId = payment.external_reference;
        if (!orderId) return NextResponse.json({ ok: true });

        const order = await getOrderById(orderId);
        if (!order) {
          console.error("[mp-webhook] Order not found:", orderId);
          return NextResponse.json({ ok: true });
        }

        // Avoid processing twice
        if (order.status === "paid" || order.status === "shipped") {
          return NextResponse.json({ ok: true });
        }

        await updateOrderStatus(orderId, "paid", paymentId);

        // Reload updated order for email
        const updatedOrder = { ...order, status: "paid" as const, mp_payment_id: paymentId };

        // Send confirmation email
        try {
          await sendOrderConfirmationEmail(updatedOrder);
        } catch (emailError) {
          console.error("[mp-webhook] Email error:", emailError);
          // Don't fail the webhook if email fails
        }

        // Send WhatsApp notification
        const whatsappUrl = process.env.WHATSAPP_WEBHOOK_URL;
        if (whatsappUrl) {
          try {
            await fetch(whatsappUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: `🛒 Nuevo pedido pagado!\nID: ${orderId.slice(0, 8).toUpperCase()}\nCliente: ${order.customer_name}\nTotal: $${order.total.toLocaleString("es-AR")}\nEmail: ${order.customer_email}`,
              }),
            });
          } catch (whatsappError) {
            console.error("[mp-webhook] WhatsApp error:", whatsappError);
          }
        }
      }
    } else if (type === "merchant_order") {
      const merchantOrderId = data?.id?.toString();
      if (!merchantOrderId) return NextResponse.json({ ok: true });

      // Fetch the merchant order to get all associated payments
      const moRes = await fetch(
        `https://api.mercadopago.com/merchant_orders/${merchantOrderId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );
      const mo = await moRes.json();

      // Check if all payments are approved and order is paid
      const isPaid =
        mo.order_status === "paid" ||
        mo.payments?.some(
          (p: { status: string }) => p.status === "approved"
        );

      if (isPaid && mo.external_reference) {
        const order = await getOrderById(mo.external_reference);
        if (order && order.status === "pending") {
          await updateOrderStatus(order.id, "paid");
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[mp-webhook] Error:", error);
    // Always return 200 to avoid MP retries on server errors
    return NextResponse.json({ ok: true });
  }
}
