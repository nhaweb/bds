import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { DetailComfort } from "@/components/apartments/DetailComfort";
import { DetailHero } from "@/components/apartments/DetailHero";
import { DetailPhotoMosaic } from "@/components/apartments/DetailPhotoMosaic";
import { DetailSpecs } from "@/components/apartments/DetailSpecs";
import { InquiryBar } from "@/components/apartments/InquiryBar";
import { resolveContact } from "@/lib/sanity/contact";
import {
  getApartmentBySlug,
  getApartmentSlugs,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { tBlocks, tLocale } from "@/lib/sanity/localize";
import type { AppLocale } from "@/lib/sanity/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getApartmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ApartmentDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<DetailFallback />}>
      <ApartmentDetail params={params} />
    </Suspense>
  );
}

function DetailFallback() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <div className="h-[100svh] w-full bg-line/40" />
    </main>
  );
}

async function ApartmentDetail({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as AppLocale;
  const [apartment, settings] = await Promise.all([
    getApartmentBySlug(slug),
    getSiteSettings(),
  ]);
  if (!apartment) notFound();

  const contact = resolveContact(settings, locale);
  const t = await getTranslations("apartments");
  const title = tLocale(apartment.title, locale);
  const summary = tLocale(apartment.summary, locale);
  const body = tBlocks(apartment.body, locale);
  const hero = urlForImage(apartment.heroImage, { width: 1800, quality: 85 });
  const heroAlt = imageAlt(apartment.heroImage, locale, title);

  const mosaicImages = (apartment.gallery ?? [])
    .map((img) => {
      const src = urlForImage(img, { width: 1400, quality: 85 });
      if (!src) return null;
      return { src, alt: imageAlt(img, locale, title) };
    })
    .filter((s): s is { src: string; alt: string } => Boolean(s));

  // Prefer hero as mosaic lead if gallery is short
  if (hero && mosaicImages.length > 0 && mosaicImages[0].src !== hero) {
    mosaicImages.unshift({ src: hero, alt: heroAlt });
  } else if (hero && mosaicImages.length === 0) {
    mosaicImages.push({ src: hero, alt: heroAlt });
  }

  const amenities = (apartment.amenities ?? []).map((a) => ({
    id: a._id,
    title: tLocale(a.title, locale),
    icon: a.icon,
  }));

  const specs = apartment.specs;
  const specItems = [
    specs?.bedrooms != null
      ? { value: String(specs.bedrooms), label: t("specs.bedrooms") }
      : null,
    specs?.bathrooms != null
      ? { value: String(specs.bathrooms), label: t("specs.bathrooms") }
      : null,
    specs?.areaM2 != null
      ? { value: String(specs.areaM2), label: t("specs.areaShort") }
      : null,
    specs?.floor
      ? { value: String(specs.floor), label: t("specs.floor") }
      : null,
  ].filter((s): s is { value: string; label: string } => Boolean(s));

  return (
    <main id="main" className="flex flex-1 flex-col pb-20 md:pb-0">
      <DetailHero
        title={title}
        tagline={`{${t("taglineComfort")}}`}
        imageUrl={hero}
        imageAlt={heroAlt}
      />

      <div className="page-x pt-6">
        <Link
          href="/apartments"
          className="inline-flex min-h-11 w-fit items-center text-sm text-muted transition hover:text-fg"
        >
          ← {t("backToList")}
        </Link>
      </div>

      <DetailSpecs items={specItems} />

      <DetailPhotoMosaic slug={apartment.slug} images={mosaicImages} />

      <DetailComfort
        title={t("comfortTitle")}
        summary={summary}
        body={body}
        amenities={amenities}
      />

      <InquiryBar
        slug={apartment.slug}
        title={title}
        phoneTelHref={contact.phoneTelHref}
        zaloUrl={contact.zaloUrl}
      />
    </main>
  );
}
