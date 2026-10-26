"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { PhotoLightbox } from "@/components/apartments/PhotoLightbox";
import { SectionReveal } from "@/components/motion/SectionReveal";

export type RoomPhoto = {
  src: string;
  alt: string;
};

export type RoomSection = {
  id: string;
  title: string;
  description: string;
  images: RoomPhoto[];
};

type Props = {
  rooms: RoomSection[];
};

function PhotoButton({
  image,
  onOpen,
  className,
  sizes,
  priority,
}: {
  image: RoomPhoto;
  onOpen: () => void;
  className: string;
  sizes: string;
  priority?: boolean;
}) {
  const t = useTranslations("a11y");

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t("openPhoto", { alt: image.alt })}
      className={`group relative block w-full overflow-hidden rounded-2xl bg-line/40 text-left md:rounded-[1.25rem] ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
    </button>
  );
}

function RoomImageGrid({
  images,
  startIndex,
  onOpen,
}: {
  images: RoomPhoto[];
  startIndex: number;
  onOpen: (index: number) => void;
}) {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <PhotoButton
        image={images[0]}
        onOpen={() => onOpen(startIndex)}
        className="aspect-[16/10]"
        sizes="(max-width: 1024px) 100vw, 60vw"
        priority
      />
    );
  }

  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-2 md:gap-2.5">
        {images.map((img, i) => (
          <PhotoButton
            key={img.src}
            image={img}
            onOpen={() => onOpen(startIndex + i)}
            className="aspect-[4/3]"
            sizes="30vw"
          />
        ))}
      </div>
    );
  }

  if (images.length === 3) {
    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:gap-2.5">
        {images.map((img, i) => (
          <PhotoButton
            key={img.src}
            image={img}
            onOpen={() => onOpen(startIndex + i)}
            className="aspect-[4/3]"
            sizes="(max-width: 640px) 100vw, 20vw"
          />
        ))}
      </div>
    );
  }

  const [a, b, c, ...more] = images;
  return (
    <div className="flex flex-col gap-2 md:gap-2.5">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-[1.15fr_1fr] md:gap-2.5">
        <PhotoButton
          image={a}
          onOpen={() => onOpen(startIndex)}
          className="aspect-[4/5] md:aspect-auto md:min-h-[22rem]"
          sizes="(max-width: 768px) 50vw, 35vw"
          priority
        />
        <div className="grid grid-rows-2 gap-2 md:gap-2.5">
          {[b, c].filter(Boolean).map((img, i) => (
            <PhotoButton
              key={img.src}
              image={img}
              onOpen={() => onOpen(startIndex + 1 + i)}
              className="min-h-[8rem]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ))}
        </div>
      </div>
      {more.length > 0 ? (
        <div
          className={`grid gap-2 md:gap-2.5 ${
            more.length === 1
              ? "grid-cols-1"
              : more.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
          }`}
        >
          {more.slice(0, 3).map((img, i) => (
            <PhotoButton
              key={img.src}
              image={img}
              onOpen={() => onOpen(startIndex + 3 + i)}
              className="aspect-[4/3]"
              sizes="30vw"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function RoomPhotos({ rooms }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const flatImages = useMemo(
    () => rooms.flatMap((room) => room.images),
    [rooms],
  );

  const roomOffsets = useMemo(() => {
    const offsets: number[] = [];
    let n = 0;
    for (const room of rooms) {
      offsets.push(n);
      n += room.images.length;
    }
    return offsets;
  }, [rooms]);

  if (rooms.length === 0) return null;

  return (
    <>
      <div className="mx-auto flex max-w-[90rem] flex-col gap-16 md:gap-24">
        {rooms.map((room, index) => (
          <SectionReveal key={room.id}>
            <article className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12 xl:gap-16">
              <div className="flex flex-col">
                <h2
                  data-reveal
                  className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.02em]"
                >
                  {room.title}
                </h2>
                {room.description ? (
                  <p
                    data-reveal
                    className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-muted md:mt-6 md:text-base"
                  >
                    {room.description}
                  </p>
                ) : null}
                {index === 0 ? (
                  <span
                    data-reveal
                    className="mt-8 inline-block h-2 w-2 rounded-full bg-fg"
                    aria-hidden
                  />
                ) : null}
              </div>

              <div data-reveal>
                <RoomImageGrid
                  images={room.images}
                  startIndex={roomOffsets[index] ?? 0}
                  onOpen={setLightboxIndex}
                />
              </div>
            </article>
          </SectionReveal>
        ))}
      </div>

      <PhotoLightbox
        images={flatImages}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
