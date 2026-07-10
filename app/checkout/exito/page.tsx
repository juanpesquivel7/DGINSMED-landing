"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function CheckoutSuccessPage() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        {t("successTitle")}
      </h1>
      <p className="text-foreground/70">{t("successMessage")}</p>
      <Link
        href="/rastreo"
        className="rounded-full bg-action-500 px-6 py-3 text-sm font-semibold text-white hover:bg-action-600"
      >
        {t("successCta")}
      </Link>
    </div>
  );
}
