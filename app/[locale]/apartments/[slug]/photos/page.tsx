import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { RoomPhotos } from "@/components/apartments/RoomPhotos";
import {
  getApartmentBySlug,
  getApartmentSlugs,
} from "@/lib/sanity/fetch";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { tLocale } from "@/lib/sanity/localize";
import type { AppLocale, ApartmentRoom, CmsImage } from "@/lib/sanity/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getApartmentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ApartmentPhotosPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main id="main" className="flex flex-1 flex-col">
          <div className="page-x section-y h-64 bg-line/30" />
        </main>
      }
    >
      <PhotosContent params={params} />
    </Suspense>
  );
}

function mapImages(images: CmsImage[] | undefined, locale: AppLocale, fallback: string) {
  return (images ?? [])
    .map((img) => {
      const src = urlForImage(img, { width: 1400, quality: 85 });
      if (!src) return null;
      return { src, alt: imageAlt(img, locale, fallback) };
    })
    .filter((s): s is { src: string; alt: string } => Boolean(s));
}

function roomsFromApartment(
  rooms: ApartmentRoom[] | undefined,
  gallery: CmsImage[] | undefined,
  locale: AppLocale,
  title: string,
  fallbackDescription: string,
) {
  if (rooms && rooms.length > 0) {
    return rooms
      .map((room) => {
        const roomTitle = tLocale(room.title, locale) || title;
        const images = mapImages(room.images, locale, roomTitle);
        if (images.length === 0) return null;
        return {
          id: room._key,
          title: roomTitle,
          description: tLocale(room.description, locale) || "",
          images,
        };
      })
      .filter((r): r is NonNullable<typeof r> => Boolean(r));
  }

  const images = mapImages(gallery, locale, title);
  if (images.length === 0) return [];
  return [
    {
      id: "gallery",
      title,
      description: fallbackDescription,
      images,
    },
  ];
}

async function PhotosContent({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as AppLocale;
  const apartment = await getApartmentBySlug(slug);
  if (!apartment) notFound();

  const t = await getTranslations("apartments");
  const title = tLocale(apartment.title, locale);
  const rooms = roomsFromApartment(
    apartment.rooms,
    apartment.gallery,
    locale,
    title,
    tLocale(apartment.summary, locale) || "",
  );

  if (rooms.length === 0) notFound();

  return (
    <main id="main" className="flex flex-1 flex-col pb-16 md:pb-24">
      <div className="page-x pt-24 md:pt-28">
        <Link
          href={`/apartments/${slug}`}
          className="inline-flex min-h-11 min-w-11 items-center justify-center text-fg transition hover:opacity-70"
          aria-label={t("backToApartment")}
        >
          <span aria-hidden className="text-xl leading-none">
            ←
          </span>
        </Link>
      </div>

      <div className="page-x section-y pt-6 md:pt-10">
        <RoomPhotos rooms={rooms} />
      </div>
    </main>
  );
}
