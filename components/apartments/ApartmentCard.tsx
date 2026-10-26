import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { tLocale } from "@/lib/sanity/localize";
import type { ApartmentListItem, AppLocale } from "@/lib/sanity/types";

type Props = {
  apartment: ApartmentListItem;
  locale: AppLocale;
  index: number;
};

function formatIndex(n: number) {
  return String(n + 1).padStart(2, "0");
}

/** Editorial residence row — photography-led, navigates to detail. */
export async function ApartmentCard({ apartment, locale, index }: Props) {
  const t = await getTranslations("apartments");
  const tCta = await getTranslations("cta");
  const title = tLocale(apartment.title, locale);
  const location = tLocale(apartment.location, locale);
  const price = tLocale(apartment.priceLabel, locale);
  const summary = tLocale(apartment.summary, locale);
  const img = urlForImage(apartment.heroImage, { width: 1400, height: 1000 });
  const alt = imageAlt(apartment.heroImage, locale, title);
  const flip = index % 2 === 1;

  const specs = apartment.specs;
  const meta: string[] = [];
  if (specs?.bedrooms != null) {
    meta.push(`${specs.bedrooms} ${t("specs.bedrooms").toLowerCase()}`);
  }
  if (specs?.areaM2 != null) {
    meta.push(`${specs.areaM2} ${t("specs.areaShort")}`);
  }
  if (specs?.floor) {
    meta.push(`${t("specs.floor")} ${specs.floor}`);
  }

  return (
    <article data-reveal>
      <Link
        href={`/apartments/${apartment.slug}`}
        className="group grid items-end gap-6 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg md:grid-cols-12 md:gap-10 lg:gap-14"
      >
        <div
          className={`relative aspect-[5/4] overflow-hidden bg-line/35 md:aspect-[4/3] md:col-span-7 ${
            flip ? "md:order-2" : "md:order-1"
          }`}
        >
          {img ? (
            <Image
              src={img}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : null}
        </div>

        <div
          className={`flex flex-col gap-4 md:col-span-5 md:pb-2 ${
            flip ? "md:order-1 md:items-end md:text-right" : "md:order-2"
          }`}
        >
          <p className="font-body text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
            {formatIndex(index)}
            <span className="mx-2 opacity-40" aria-hidden>
              /
            </span>
            {t(`status.${apartment.status}`)}
          </p>

          <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.02em]">
            {title}
          </h2>

          {location ? (
            <p className="text-sm tracking-wide text-muted">{location}</p>
          ) : null}

          {meta.length > 0 ? (
            <p className="text-sm text-muted">
              {meta.join(" · ")}
            </p>
          ) : null}

          {summary ? (
            <p
              className={`max-w-sm text-[0.95rem] leading-relaxed text-muted ${
                flip ? "md:ml-auto" : ""
              }`}
            >
              {summary}
            </p>
          ) : null}

          <div
            className={`mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2 ${
              flip ? "md:justify-end" : ""
            }`}
          >
            {price ? (
              <p className="font-body text-sm font-medium tracking-wide">
                {price}
              </p>
            ) : null}
            <span className="text-sm tracking-[0.08em] text-fg/70 transition group-hover:text-fg">
              {tCta("viewApartment")}
              <span
                aria-hidden
                className="ml-2 inline-block transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
