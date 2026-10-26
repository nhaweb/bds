"use client";

import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { useTranslations } from "next-intl";

export type LightboxImage = {
  src: string;
  alt: string;
};

type Props = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function PhotoLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: Props) {
  const t = useTranslations("a11y");
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index != null && images[index] != null;
  const current = open ? images[index!] : null;

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft" && images.length > 1) {
        e.preventDefault();
        onIndexChange((index! - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight" && images.length > 1) {
        e.preventDefault();
        onIndexChange((index! + 1) % images.length);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, images.length, onClose, onIndexChange]);

  if (!open || !current) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col bg-fg/92 text-bg backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="page-x relative z-10 flex items-center justify-between gap-4 py-3 md:py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p id={titleId} className="truncate text-sm text-bg/70">
          {current.alt}
          <span className="ml-3 tracking-[0.12em] uppercase">
            {index! + 1} / {images.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-bg/25 text-bg transition hover:border-bg hover:bg-bg/10"
          aria-label={t("closeLightbox")}
        >
          ✕
        </button>
      </div>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-16">
        {images.length > 1 ? (
          <button
            type="button"
            aria-label={t("carouselPrev")}
            className="absolute left-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-bg/25 text-bg transition hover:border-bg hover:bg-bg/10 md:left-6"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index! - 1 + images.length) % images.length);
            }}
          >
            ←
          </button>
        ) : null}

        <div
          className="relative h-full max-h-[calc(100svh-7rem)] w-full max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {images.length > 1 ? (
          <button
            type="button"
            aria-label={t("carouselNext")}
            className="absolute right-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-bg/25 text-bg transition hover:border-bg hover:bg-bg/10 md:right-6"
            onClick={(e) => {
              e.stopPropagation();
              onIndexChange((index! + 1) % images.length);
            }}
          >
            →
          </button>
        ) : null}
      </div>
    </div>
  );
}
