"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";

export function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } =
    useCart();
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        aria-label={t("cartClose")}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/60"
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-navy-900 text-foreground shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">{t("cartTitle")}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm text-foreground/60 hover:text-foreground"
          >
            {t("cartClose")}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="text-sm text-foreground/60">{t("cartEmpty")}</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li
                  key={item.product.slug}
                  className="flex items-center gap-3 border-b border-border pb-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#cccccc]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-foreground/60">
                      ${item.product.price.toLocaleString("es-AR")} ARS
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.slug,
                            Number(e.target.value)
                          )
                        }
                        className="w-16 rounded border border-border bg-navy-950 px-2 py-1 text-sm"
                      />
                      <button
                        onClick={() => removeItem(item.product.slug)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        {t("cartRemove")}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-4">
          <div className="mb-4 flex items-center justify-between text-sm font-semibold">
            <span>{t("cartSubtotal")}</span>
            <span>${subtotal.toLocaleString("es-AR")} ARS</span>
          </div>
          <Link
            href="/checkout"
            onClick={() => setIsOpen(false)}
            className={`block rounded-full px-4 py-3 text-center text-sm font-semibold text-white transition-colors ${
              items.length === 0
                ? "pointer-events-none bg-foreground/20"
                : "bg-action-500 hover:bg-action-600"
            }`}
          >
            {t("cartGoToCheckout")}
          </Link>
        </div>
      </div>
    </div>
  );
}
