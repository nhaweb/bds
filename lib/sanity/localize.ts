import type { AppLocale, LocaleBlock, LocaleString } from "./types";

export function tLocale(
  value: LocaleString | undefined | null,
  locale: AppLocale,
  fallback = "",
): string {
  if (!value) return fallback;
  return value[locale] || value.vi || value.en || fallback;
}

export function tBlocks(
  value: LocaleBlock | undefined | null,
  locale: AppLocale,
) {
  if (!value) return [];
  return value[locale] || value.vi || value.en || [];
}
