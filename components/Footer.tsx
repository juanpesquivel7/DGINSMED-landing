"use client";

import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-border bg-navy-900">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-foreground/70 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <p className="font-semibold text-foreground">DG-INSMED</p>
            <p className="mt-2">{t("footerDesc")}</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">{t("footerContact")}</p>
            <p className="mt-2">contacto@dginsmed.com</p>
            <p>+54 9 (341) 5621580</p>
            <p className="mt-2">Richieri 1235 - 2000 Rosario, Santa Fe, Argentina</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">{t("footerMenu")}</p>
            <ul className="mt-2 flex flex-col gap-1">
              <li>
                <a href="/" className="hover:text-brand-400">{t("navHome")}</a>
              </li>
              <li>
                <a href="/productos" className="hover:text-brand-400">{t("navProducts")}</a>
              </li>
              <li>
                <a href="/rastreo" className="hover:text-brand-400">{t("navTracking")}</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">{t("footerAnmat")}</p>
            <p className="mt-2">
              <span className="font-medium text-foreground">{t("footerHabilitacion")}</span>
              <br />
              Disposición N° 326/12
            </p>
            <p className="mt-2">
              <span className="font-medium text-foreground">{t("footerRegistro")}</span>
              <br />
              Disposición N° 3460
              <br />
              Legajo PM-2035-1
            </p>
            <p className="mt-2">
              <span className="font-medium text-foreground">{t("footerDirectora")}</span>
              <br />
              Bioingeniera Andrea Cattena Mat. N° ICIE 2-3395-1
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-foreground/50">
          © {new Date().getFullYear()} DG-INSMED. {t("footerRights")}
        </p>
      </div>
    </footer>
  );
}
