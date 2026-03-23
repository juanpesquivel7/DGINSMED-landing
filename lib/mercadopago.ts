import MercadoPago, { Preference } from "mercadopago";
import { CartItem, ShippingAddress } from "@/types";

const client = new MercadoPago({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const preference = new Preference(client);

interface CreatePreferenceParams {
  orderId: string;
  items: CartItem[];
  shippingCost: number;
  customerEmail: string;
  customerName: string;
  shippingAddress: ShippingAddress;
}

export async function createMercadoPagoPreference({
  orderId,
  items,
  shippingCost,
  customerEmail,
  customerName,
  shippingAddress,
}: CreatePreferenceParams) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const mpItems = items.map((item) => ({
    id: item.product.id,
    title: item.product.name,
    quantity: item.quantity,
    unit_price: item.product.price,
    currency_id: "ARS",
  }));

  if (shippingCost > 0) {
    mpItems.push({
      id: "shipping",
      title: "Costo de envío",
      quantity: 1,
      unit_price: shippingCost,
      currency_id: "ARS",
    });
  }

  const result = await preference.create({
    body: {
      items: mpItems,
      payer: {
        name: customerName.split(" ")[0],
        surname: customerName.split(" ").slice(1).join(" "),
        email: customerEmail,
        address: {
          street_name: shippingAddress.calle,
          street_number: shippingAddress.numero,
          zip_code: shippingAddress.cp,
        },
      },
      back_urls: {
        success: `${siteUrl}/pago/exitoso`,
        pending: `${siteUrl}/pago/pendiente`,
        failure: `${siteUrl}/pago/fallido`,
      },
      auto_return: "approved",
      notification_url: `${siteUrl}/api/mp-webhook`,
      external_reference: orderId,
      payment_methods: {
        excluded_payment_types: [],
        installments: 12,
      },
    },
  });

  return result;
}

export async function getPaymentInfo(paymentId: string) {
  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching payment: ${response.statusText}`);
  }

  return response.json();
}
