import { NextRequest, NextResponse } from "next/server";
import { sendOrderNotification } from "@/lib/email";

// Mercado Pago llama a esta URL cuando cambia el estado de un pago.
// La registramos como notification_url al crear la preferencia.
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const topic = url.searchParams.get("topic") ?? url.searchParams.get("type");
  const body = await request.json().catch(() => null);
  const paymentId = url.searchParams.get("id") ?? body?.data?.id;

  // Solo nos interesan los eventos de pago; respondemos 200 al resto para
  // que Mercado Pago no siga reintentando notificaciones que no usamos.
  if (topic !== "payment" || !paymentId) {
    return NextResponse.json({ received: true });
  }

  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!accessToken) {
    console.error("Falta MERCADOPAGO_ACCESS_TOKEN para procesar el webhook");
    return NextResponse.json({ received: true });
  }

  try {
    const response = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!response.ok) {
      console.error("No se pudo obtener el pago desde Mercado Pago", await response.text());
      return NextResponse.json({ received: true });
    }

    const payment = await response.json();

    if (payment.status === "approved") {
      await sendOrderNotification({
        paymentId: String(payment.id),
        status: payment.status,
        payerName: [payment.payer?.first_name, payment.payer?.last_name]
          .filter(Boolean)
          .join(" "),
        payerEmail: payment.payer?.email,
        payerPhone: payment.payer?.phone?.number,
        items:
          payment.additional_info?.items?.map((item: { title: string; quantity: string; unit_price: string }) => ({
            title: item.title,
            quantity: Number(item.quantity),
            unitPrice: Number(item.unit_price),
          })) ?? [],
        total: payment.transaction_amount,
        currency: payment.currency_id,
      });
    }
  } catch (error) {
    console.error("Error procesando webhook de Mercado Pago", error);
  }

  return NextResponse.json({ received: true });
}
