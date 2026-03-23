"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Truck } from "lucide-react";

interface Props {
  orderId: string;
}

export default function MarkAsShippedButton({ orderId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMarkAsShipped = async () => {
    if (!confirm("¿Marcar este pedido como enviado?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/admin/mark-shipped`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) throw new Error("Error al actualizar el pedido");

      setSuccess(true);
      router.refresh();
    } catch (err) {
      alert("Error al actualizar el pedido. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold">
        <Truck className="h-3.5 w-3.5" />
        Marcado como enviado
      </span>
    );
  }

  return (
    <Button
      onClick={handleMarkAsShipped}
      loading={loading}
      variant="secondary"
      size="sm"
    >
      <Truck className="h-3.5 w-3.5" />
      Marcar como enviado
    </Button>
  );
}
