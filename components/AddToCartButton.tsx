"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-3">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-20 rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground"
      />
      <button
        onClick={() => addItem(product, quantity)}
        className="rounded-full bg-action-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-action-600"
      >
        {t("addToCart")}
      </button>
    </div>
  );
}
