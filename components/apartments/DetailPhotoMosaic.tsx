"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PhotoLightbox } from "@/components/apartments/PhotoLightbox";
import { SectionReveal } from "@/components/motion/SectionReveal";

export type MosaicImage = {
  src: string;
  alt: string;
};

type Props = {
  slug: string;
  images: MosaicImage[];
};

function GridIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden
    >
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

/** Featured + 2×2 mosaic — click image to lightbox; VIEW PHOTOS → rooms page. */
export function DetailPhotoMosaic({ slug, images }: Props) {
  const t = useTranslations("apartments");
  const tA11y = useTranslations("a11y");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const mosaicImages = useMemo(() => {
    if (images.length === 0) return [];
    const [hero, ...rest] = images;
    const tiles = [...rest, ...images].slice(0, 4);
    return [hero, ...tiles];
  }, [images]);

  if (mosaicImages.length === 0) return null;

  const [hero, ...tiles] = mosaicImages;
  const photosHref = `/apartments/${slug}/photos`;

  return (
    <>
      <SectionReveal className="page-x pt-4 pb-6 md:pt-5 md:pb-10">
        <div
          id="residence-gallery"
          data-reveal
          className="relative mx-auto max-w-[90rem] overflow-hidden rounded-[1.75rem] md:rounded-[2.5rem]"
        >
          <div className="grid gap-1.5 md:grid-cols-2 md:gap-2">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              aria-label={tA11y("openPhoto", { alt: hero.alt })}
              className="group relative aspect-[4/5] overflow-hidden bg-line/40 text-left md:aspect-auto md:min-h-[28rem] lg:min-h-[34rem]"
            >
              <Image
                src={hero.src}
                alt={hero.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
                priority
              />
            </button>

            <div className="grid grid-cols-2 gap-1.5 md:gap-2">
              {tiles.map((img, i) => (
                <button
                  type="button"
                  key={`${img.src}-${i}`}
                  onClick={() => setLightboxIndex(i + 1)}
                  aria-label={tA11y("openPhoto", { alt: img.alt })}
                  className="group relative aspect-square overflow-hidden bg-line/40 text-left"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </button>
              ))}
            </div>
          </div>

          <Link
            href={photosHref}
            className="absolute bottom-4 left-4 z-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-bg/85 px-5 text-[0.7rem] font-medium tracking-[0.14em] uppercase text-fg backdrop-blur-md transition hover:bg-bg md:bottom-6 md:left-6"
          >
            <GridIcon />
            {t("viewPhotos")}
          </Link>
        </div>
      </SectionReveal>

      <PhotoLightbox
        images={mosaicImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
