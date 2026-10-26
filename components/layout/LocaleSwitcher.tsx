"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("a11y");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="group"
      aria-label={t("localeSwitcher")}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            aria-pressed={active}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
              active
                ? "bg-fg/10 text-fg"
                : "text-muted hover:text-fg"
            }`}
            onClick={() => {
              if (code === locale) return;
              router.replace(pathname, { locale: code as AppLocale });
            }}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
