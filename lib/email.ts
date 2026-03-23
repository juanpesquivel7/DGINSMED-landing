import { Resend } from "resend";
import { Order } from "@/types";
import { formatPrice, formatDate, generateOrderNumber } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

const STORE_NAME = "TuTienda";
const FROM_EMAIL = "ventas@tutienda.com.ar";

export async function sendOrderConfirmationEmail(order: Order): Promise<void> {
  const orderNumber = generateOrderNumber(order.id);
  const itemsHtml = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px;">
          ${item.name}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; text-align: right;">
          ${formatPrice(item.price)}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-size: 14px; text-align: right;">
          ${formatPrice(item.price * item.quantity)}
        </td>
      </tr>
    `
    )
    .join("");

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">

              <!-- Header -->
              <tr>
                <td style="background-color: #1a2744; padding: 32px 40px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">${STORE_NAME}</h1>
                  <p style="margin: 8px 0 0; color: #94a3b8; font-size: 14px;">Confirmación de compra</p>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 40px;">

                  <!-- Greeting -->
                  <h2 style="margin: 0 0 8px; color: #1a2744; font-size: 22px;">¡Gracias por tu compra, ${order.customer_name.split(" ")[0]}!</h2>
                  <p style="margin: 0 0 32px; color: #6b7280; font-size: 15px; line-height: 1.6;">
                    Tu pago fue procesado exitosamente. Aquí tenés el resumen de tu pedido.
                  </p>

                  <!-- Order info -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
                    <tr>
                      <td style="padding: 8px 0;">
                        <span style="color: #6b7280; font-size: 13px;">Número de pedido</span><br>
                        <strong style="color: #1a2744; font-size: 18px;">${orderNumber}</strong>
                      </td>
                      <td style="padding: 8px 0; text-align: right;">
                        <span style="color: #6b7280; font-size: 13px;">Fecha</span><br>
                        <strong style="color: #1a2744; font-size: 14px;">${formatDate(order.created_at)}</strong>
                      </td>
                    </tr>
                  </table>

                  <!-- Products -->
                  <h3 style="margin: 0 0 16px; color: #1a2744; font-size: 16px;">Productos comprados</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; margin-bottom: 32px;">
                    <thead>
                      <tr style="background-color: #f8fafc;">
                        <th style="padding: 12px; text-align: left; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Producto</th>
                        <th style="padding: 12px; text-align: center; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Cant.</th>
                        <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Precio</th>
                        <th style="padding: 12px; text-align: right; font-size: 12px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemsHtml}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="3" style="padding: 12px; text-align: right; font-size: 14px; color: #6b7280;">Subtotal productos</td>
                        <td style="padding: 12px; text-align: right; font-size: 14px;">${formatPrice(subtotal)}</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="padding: 12px; text-align: right; font-size: 14px; color: #6b7280;">Envío</td>
                        <td style="padding: 12px; text-align: right; font-size: 14px;">${order.shipping_cost === 0 ? "Gratis" : formatPrice(order.shipping_cost)}</td>
                      </tr>
                      <tr style="background-color: #1a2744;">
                        <td colspan="3" style="padding: 16px; text-align: right; color: #ffffff; font-weight: 700; font-size: 16px;">TOTAL</td>
                        <td style="padding: 16px; text-align: right; color: #f97316; font-weight: 700; font-size: 18px;">${formatPrice(order.total)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  <!-- Shipping address -->
                  <h3 style="margin: 0 0 16px; color: #1a2744; font-size: 16px;">Dirección de envío</h3>
                  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 32px;">
                    <p style="margin: 0; color: #374151; font-size: 14px; line-height: 2;">
                      ${order.shipping_address.calle} ${order.shipping_address.numero}
                      ${order.shipping_address.piso ? `, Piso ${order.shipping_address.piso}` : ""}
                      ${order.shipping_address.depto ? ` Dpto ${order.shipping_address.depto}` : ""}<br>
                      ${order.shipping_address.ciudad}, ${order.shipping_address.provincia}<br>
                      CP: ${order.shipping_address.cp}
                    </p>
                  </div>

                  <!-- Tracking notice -->
                  <div style="background-color: #eff6ff; border-left: 4px solid #1a2744; border-radius: 4px; padding: 16px; margin-bottom: 32px;">
                    <p style="margin: 0; color: #1a2744; font-size: 14px; line-height: 1.6;">
                      📦 <strong>¿Y ahora qué?</strong><br>
                      Estamos preparando tu pedido. Cuando despachemos tu compra, te enviaremos el número de seguimiento de Andreani para que puedas rastrear tu paquete.
                    </p>
                  </div>

                  <!-- Contact -->
                  <p style="margin: 0; color: #6b7280; font-size: 13px; line-height: 1.6;">
                    ¿Tenés alguna pregunta? Respondé este email o contactanos.
                  </p>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                    © ${new Date().getFullYear()} ${STORE_NAME}. Todos los derechos reservados.<br>
                    Este email fue enviado a ${order.customer_email}
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: `${STORE_NAME} <${FROM_EMAIL}>`,
    to: order.customer_email,
    subject: `¡Tu pedido ${orderNumber} fue confirmado! ✅`,
    html,
  });
}
