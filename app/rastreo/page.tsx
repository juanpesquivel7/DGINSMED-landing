"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function TrackingPage() {
  const { t } = useLanguage();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const track = async () => {
    if (!trackingNumber) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(
        `/api/shipping/track?trackingNumber=${encodeURIComponent(
          trackingNumber
        )}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "No se pudo rastrear el envío");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <h1 className="mb-6 text-2xl font-semibold text-foreground">
        {t("trackingTitle")}
      </h1>
      <div className="flex gap-2">
        <input
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          placeholder={t("trackingPlaceholder")}
          className="flex-1 rounded-lg border border-border bg-navy-900 px-3 py-2 text-sm text-foreground placeholder:text-foreground/40"
        />
        <button
          onClick={track}
          disabled={loading}
          className="rounded-full bg-action-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-action-600 disabled:opacity-50"
        >
          {loading ? t("trackingSearching") : t("trackingButton")}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      {result != null && (
        <pre className="mt-6 overflow-x-auto rounded-lg bg-surface p-4 text-xs text-foreground/80">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
