"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/language-context";

const CLIENTS = [
  { name: "Biosidus", src: "/clients/biosidus.png" },
  { name: "Raffo", src: "/clients/raffo.png" },
  { name: "Synthon - Bagó", src: "/clients/synthon-bago.png" },
];

export function Clients() {
  const { t } = useLanguage();
  return (
    <section className="border-t border-border bg-navy-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-foreground/50">
          {t("confiaEnNosotros")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {CLIENTS.map((client) => (
            <div key={client.name} className="flex h-10 w-32 items-center justify-center">
              <Image
                src={client.src}
                alt={client.name}
                width={120}
                height={40}
                className="h-auto w-full object-contain opacity-80 brightness-200"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
