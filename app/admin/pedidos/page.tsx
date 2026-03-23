import { getAllOrders } from "@/lib/supabase";
import { formatPrice, formatDate, generateOrderNumber } from "@/lib/utils";
import { Order } from "@/types";
import Link from "next/link";
import { Package, ChevronRight } from "lucide-react";

const statusConfig: Record<
  Order["status"],
  { label: string; className: string }
> = {
  pending: {
    label: "Pendiente",
    className: "bg-amber-100 text-amber-800",
  },
  paid: {
    label: "Pagado",
    className: "bg-green-100 text-green-800",
  },
  shipped: {
    label: "Enviado",
    className: "bg-blue-100 text-blue-800",
  },
  cancelled: {
    label: "Cancelado",
    className: "bg-red-100 text-red-800",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminOrdersPage() {
  let orders: Order[] = [];
  let error = "";

  try {
    orders = await getAllOrders();
  } catch (e) {
    error =
      "No se pudieron cargar los pedidos. Verificá la conexión con Supabase.";
    console.error(e);
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    paid: orders.filter((o) => o.status === "paid").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    revenue: orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <div className="bg-primary text-white px-6 py-4">
        <h1 className="text-xl font-bold">Panel de Administración</h1>
        <p className="text-slate-400 text-sm">TuTienda</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Pedidos</h2>
          <span className="text-sm text-gray-500">
            {orders.length} pedido{orders.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Total pedidos</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Pagados</p>
            <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Enviados</p>
            <p className="text-2xl font-bold text-blue-600">{stats.shipped}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 col-span-2 md:col-span-1">
            <p className="text-xs text-gray-500 mb-1">Ingresos</p>
            <p className="text-lg font-bold text-primary">{formatPrice(stats.revenue)}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
            ❌ {error}
          </div>
        )}

        {orders.length === 0 && !error ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Todavía no hay pedidos.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Pedido
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Fecha
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Cliente
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3 hidden md:table-cell">
                      Productos
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Total
                    </th>
                    <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">
                      Estado
                    </th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders.map((order) => {
                    const status = statusConfig[order.status];
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-semibold text-primary">
                          {generateOrderNumber(order.id)}
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">
                            {order.customer_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {order.customer_email}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell max-w-xs">
                          {order.items.map((item) => (
                            <span key={item.name} className="block truncate">
                              {item.quantity}x {item.name}
                            </span>
                          ))}
                        </td>
                        <td className="px-4 py-3 text-sm font-bold text-primary text-right">
                          {formatPrice(order.total)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Link
                            href={`/admin/pedidos/${order.id}`}
                            className="text-primary hover:text-accent transition-colors"
                            aria-label="Ver detalle"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
