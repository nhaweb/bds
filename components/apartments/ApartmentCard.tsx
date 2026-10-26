import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { tLocale } from "@/lib/sanity/localize";
import type { ApartmentListItem, AppLocale } from "@/lib/sanity/types";

type Props = {
  apartment: ApartmentListItem;
  locale: AppLocale;
};

/** Editorial interaction container (card only because it navigates). */
export async function ApartmentCard({ apartment, locale }: Props) {
  const t = await getTranslations("apartments");
  const tCta = await getTranslations("cta");
  const title = tLocale(apartment.title, locale);
  const location = tLocale(apartment.location, locale);
  const price = tLocale(apartment.priceLabel, locale);
  const summary = tLocale(apartment.summary, locale);
  const img = urlForImage(apartment.heroImage, { width: 900, height: 700 });
  const alt = imageAlt(apartment.heroImage, locale, title);

  return (
    <Link
      href={`/apartments/${apartment.slug}`}
      className="group flex flex-col gap-4 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-line/40">
        {img ? (
          <Image
            src={img}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-2xl tracking-tight md:text-[1.65rem]">
            {title}
          </h2>
          <span className="text-xs uppercase tracking-[0.14em] text-muted">
            {t(`status.${apartment.status}`)}
          </span>
        </div>
        {location ? <p className="text-sm text-muted">{location}</p> : null}
        {summary ? (
          <p className="line-clamp-2 text-sm text-muted">{summary}</p>
        ) : null}
        {price ? <p className="pt-1 text-sm">{price}</p> : null}
        <span className="pt-1 text-sm text-accent underline-offset-4 group-hover:underline">
          {tCta("viewApartment")}
        </span>
      </div>
    </Link>
  );
}
