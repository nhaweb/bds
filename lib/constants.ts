/**
 * Seed contact / brand values used until Sanity siteSettings loads.
 * When CMS returns settings, prefer those over these defaults.
 */
export const SITE = {
  brand: "PML Resort",
  phoneDisplay: "0908 985 844",
  phoneE164: "+84908985844",
  phoneTelHref: "tel:+84908985844",
  zaloUrl: "https://zalo.me/0908985844",
  email: "pmluanvn@gmail.com",
  address: "208 Trường Chinh, Phường Tân Bình, TP.Hồ Chí Minh",
  mapsQuery: "208 Trường Chinh, Phường Tân Bình, TP.Hồ Chí Minh",
} as const;

export function mapsUrl(address: string = SITE.address): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
