import { notFound } from "next/navigation";
import Link from "next/link";
import { getOrderById } from "@/lib/supabase";
import { formatPrice, formatDate, generateOrderNumber } from "@/lib/utils";
import { Order } from "@/types";
import { ArrowLeft, Package, Truck } from "lucide-react";
import MarkAsShippedButton from "./MarkAsShippedButton";

const statusConfig: Record<
  Order["status"],
  { label: string; className: string }
> = {
  pending: { label: "Pendiente de pago", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Pagado - Preparar envío", className: "bg-green-100 text-green-800" },
  shipped: { label: "Enviado", className: "bg-blue-100 text-blue-800" },
  cancelled: { label: "Cancelado", className: "bg-red-100 text-red-800" },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const order = await getOrderById(params.id);
  if (!order) notFound();

  const status = statusConfig[order.status];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white px-6 py-4">
        <h1 className="text-xl font-bold">Panel de Administración</h1>
        <p className="text-slate-400 text-sm">TuTienda</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link
          href="/admin/pedidos"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a pedidos
        </Link>

        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Pedido {generateOrderNumber(order.id)}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {formatDate(order.created_at)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${status.className}`}
            >
              {status.label}
            </span>
            {order.status === "paid" && (
              <MarkAsShippedButton orderId={order.id} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Datos del cliente
            </h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-gray-500">Nombre</dt>
                <dd className="font-semibold text-gray-900">{order.customer_name}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="font-semibold text-gray-900">{order.customer_email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Teléfono</dt>
                <dd className="font-semibold text-gray-900">{order.customer_phone}</dd>
              </div>
            </dl>
          </div>

          {/* Shipping address */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              Dirección de envío
            </h3>
            <address className="not-italic text-sm text-gray-900 leading-relaxed">
              {order.shipping_address.calle} {order.shipping_address.numero}
              {order.shipping_address.piso &&
                `, Piso ${order.shipping_address.piso}`}
              {order.shipping_address.depto &&
                ` Dpto ${order.shipping_address.depto}`}
              <br />
              {order.shipping_address.ciudad},{" "}
              {order.shipping_address.provincia}
              <br />
              CP: {order.shipping_address.cp}
            </address>
          </div>

          {/* Payment info */}
          {(order.mp_payment_id || order.mp_preference_id) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Datos de pago (MP)</h3>
              <dl className="space-y-2 text-sm">
                {order.mp_preference_id && (
                  <div>
                    <dt className="text-gray-500">Preference ID</dt>
                    <dd className="font-mono text-xs text-gray-700 break-all">
                      {order.mp_preference_id}
                    </dd>
                  </div>
                )}
                {order.mp_payment_id && (
                  <div>
                    <dt className="text-gray-500">Payment ID</dt>
                    <dd className="font-mono text-xs text-gray-700 break-all">
                      {order.mp_payment_id}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          )}
        </div>

        {/* Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-900">Productos</h3>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                  Producto
                </th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  Cant.
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-4 py-3">
                  P. Unitario
                </th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase px-6 py-3">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-center">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500 text-right">
                    {formatPrice(item.price)}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-gray-100 bg-gray-50">
              <tr>
                <td colSpan={3} className="px-6 py-3 text-sm text-right text-gray-500">
                  Envío
                </td>
                <td className="px-6 py-3 text-sm font-semibold text-right">
                  {order.shipping_cost === 0
                    ? "Gratis"
                    : formatPrice(order.shipping_cost)}
                </td>
              </tr>
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-4 text-base font-bold text-right text-primary"
                >
                  TOTAL
                </td>
                <td className="px-6 py-4 text-base font-bold text-right text-primary">
                  {formatPrice(order.total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
