"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

export type CarouselSlide = {
  src: string;
  alt: string;
};

type Props = {
  slides: CarouselSlide[];
  /** Large editorial home gallery vs detail gallery */
  variant?: "home" | "detail";
  autoplay?: boolean;
  className?: string;
};

export function ImageCarousel({
  slides,
  variant = "detail",
  autoplay = false,
  className = "",
}: Props) {
  const t = useTranslations("a11y");
  const plugins = useMemo(
    () =>
      autoplay
        ? [
            Autoplay({
              delay: 4500,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: true,
            }),
          ]
        : [],
    [autoplay],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: slides.length > 1, align: "start" },
    plugins,
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (slides.length === 0) return null;

  const aspect =
    variant === "home" ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3] md:aspect-[16/10]";

  return (
    <div
      className={`relative ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("carouselDot", { index: selected + 1 })}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              className={`relative min-w-0 shrink-0 grow-0 basis-full ${aspect} bg-line/40`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0 && variant === "home"}
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between page-x">
            <button
              type="button"
              aria-label={t("carouselPrev")}
              className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center border border-bg-elevated/40 bg-fg/40 text-bg-elevated backdrop-blur-sm transition hover:bg-fg/55"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              aria-label={t("carouselNext")}
              className="pointer-events-auto inline-flex min-h-11 min-w-11 items-center justify-center border border-bg-elevated/40 bg-fg/40 text-bg-elevated backdrop-blur-sm transition hover:bg-fg/55"
              onClick={() => emblaApi?.scrollNext()}
            >
              <span aria-hidden>→</span>
            </button>
          </div>

          <div
            className="mt-4 flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label={t("carouselDot", { index: selected + 1 })}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={t("carouselDot", { index: i + 1 })}
                className={`h-2.5 min-h-11 min-w-11 px-1 ${
                  i === selected ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => emblaApi?.scrollTo(i)}
              >
                <span
                  className={`mx-auto block h-px w-6 ${
                    i === selected ? "bg-fg" : "bg-muted"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
