"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { ArFlag, GbFlag, BrFlag } from "@/components/Flags";
import type { Locale } from "@/lib/translations";

const LANGUAGES: { code: Locale; Flag: typeof ArFlag; label: string }[] = [
  { code: "es", Flag: ArFlag, label: "ES" },
  { code: "en", Flag: GbFlag, label: "EN" },
  { code: "pt", Flag: BrFlag, label: "PT" },
];

export function Header() {
  const { totalItems, setIsOpen } = useCart();
  const { locale, setLocale, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="DG-INSMED" width={93} height={56} priority />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/80 sm:flex">
          <Link href="/" className="hover:text-brand-400">
            {t("navHome")}
          </Link>
          <Link href="/productos" className="hover:text-brand-400">
            {t("navProducts")}
          </Link>
          <Link href="/rastreo" className="hover:text-brand-400">
            {t("navTracking")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-full bg-navy-900 p-1 sm:flex">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                title={l.label}
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold transition-colors ${
                  locale === l.code
                    ? "bg-brand-500 text-brand-950"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                <l.Flag className="h-3 w-4 rounded-[2px]" />
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-action-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-action-600"
          >
            {t("cart")}
            {totalItems > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-action-600">
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border sm:hidden"
          >
            <span className="sr-only">Menú</span>
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 text-sm font-medium text-foreground/80 sm:hidden">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-brand-400"
          >
            {t("navHome")}
          </Link>
          <Link
            href="/productos"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-brand-400"
          >
            {t("navProducts")}
          </Link>
          <Link
            href="/rastreo"
            onClick={() => setMenuOpen(false)}
            className="rounded-lg px-2 py-2 hover:bg-white/5 hover:text-brand-400"
          >
            {t("navTracking")}
          </Link>
          <div className="mt-2 flex items-center gap-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                  locale === l.code
                    ? "bg-brand-500 text-brand-950"
                    : "bg-navy-900 text-foreground/60"
                }`}
              >
                <l.Flag className="h-3 w-4 rounded-[2px]" />
                {l.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
