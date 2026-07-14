import { Resend } from "resend";

interface OrderItem {
  title: string;
  quantity: number;
  unitPrice: number;
}

interface OrderNotification {
  paymentId: string;
  status: string;
  payerName?: string;
  payerEmail?: string;
  payerPhone?: string;
  items: OrderItem[];
  total: number;
  currency: string;
}

export async function sendOrderNotification(order: OrderNotification) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !to) {
    console.error(
      "No se pudo enviar la notificación de pedido: falta RESEND_API_KEY o ORDER_NOTIFICATION_EMAIL"
    );
    return;
  }

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM_EMAIL || "DG-INSMED <onboarding@resend.dev>";

  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr><td style="padding:4px 8px;">${item.title}</td><td style="padding:4px 8px;text-align:center;">${item.quantity}</td><td style="padding:4px 8px;text-align:right;">$${item.unitPrice.toLocaleString("es-AR")}</td></tr>`
    )
    .join("");

  await resend.emails.send({
    from,
    to,
    subject: `Nuevo pedido pago (${order.status}) - $${order.total.toLocaleString("es-AR")} ${order.currency}`,
    html: `
      <h2>Nuevo pedido en DG-INSMED</h2>
      <p><strong>Pago ID:</strong> ${order.paymentId}</p>
      <p><strong>Estado:</strong> ${order.status}</p>
      <p><strong>Cliente:</strong> ${order.payerName ?? "-"}</p>
      <p><strong>Email:</strong> ${order.payerEmail ?? "-"}</p>
      <p><strong>Teléfono:</strong> ${order.payerPhone ?? "-"}</p>
      <table style="border-collapse:collapse;margin-top:12px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:4px 8px;">Producto</th>
            <th style="padding:4px 8px;">Cant.</th>
            <th style="text-align:right;padding:4px 8px;">Precio</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p style="margin-top:12px;"><strong>Total: $${order.total.toLocaleString("es-AR")} ${order.currency}</strong></p>
    `,
  });
}
