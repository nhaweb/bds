import { SITE, mapsUrl } from "@/lib/constants";
import { tLocale } from "./localize";
import type { AppLocale, ContactInfo, SiteSettings } from "./types";

/** Merge Sanity siteSettings over seed constants. */
export function resolveContact(
  settings: SiteSettings,
  locale: AppLocale,
): ContactInfo & { mapsHref: string } {
  const phoneDisplay = settings.phone || SITE.phoneDisplay;
  const phoneE164 = settings.phoneE164 || SITE.phoneE164;
  const address =
    tLocale(settings.address, locale, SITE.address) || SITE.address;

  return {
    brand: tLocale(settings.brandName, locale, SITE.brand) || SITE.brand,
    phoneDisplay,
    phoneE164,
    phoneTelHref: `tel:${phoneE164.replace(/\s/g, "")}`,
    zaloUrl: settings.zaloUrl || SITE.zaloUrl,
    email: settings.email || SITE.email,
    address,
    mapsHref: mapsUrl(address),
  };
}
