"use client";

import { useLanguage } from "@/lib/language-context";

// Número tomado del sitio Wix (+54 9 341 5621580). Ajustar formato/mensaje con el cliente.
const WHATSAPP_NUMBER = "5493415621580";
const DEFAULT_MESSAGE = "Hola, quiero hacer una consulta sobre los autoinyectores DG-Ject.";

export function WhatsAppButton() {
  const { t } = useLanguage();
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsappAria")}
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-2xl text-brand-950 shadow-lg transition-transform hover:scale-105"
    >
      💬
    </a>
  );
}
