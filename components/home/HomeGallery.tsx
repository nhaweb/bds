"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { CarouselSlide } from "@/components/gallery/ImageCarousel";
import { SectionReveal } from "@/components/motion/SectionReveal";

type Props = {
  title: string;
  body: string;
  slides: CarouselSlide[];
  groups?: { id: string; label: string; slides: CarouselSlide[] }[];
};

/** Tabbed 3×2 portrait grid — matches Nueve gallery band. */
export function HomeGallery({ title, body, slides, groups }: Props) {
  const t = useTranslations("home");
  const tabs = useMemo(() => {
    if (groups && groups.length > 0) return groups;
    return [{ id: "all", label: t("galleryTabAll"), slides }];
  }, [groups, slides, t]);

  const [active, setActive] = useState(tabs[0]?.id ?? "all");
  const activeSlides = (
    tabs.find((tab) => tab.id === active)?.slides ?? slides
  ).slice(0, 6);

  if (slides.length === 0 && (!groups || groups.length === 0)) return null;

  return (
    <section className="relative section-y pt-4 md:pt-8">
      <SectionReveal className="page-x mx-auto mb-10 max-w-[90rem] md:mb-14">
        <div className="flex flex-col gap-6 md:items-end md:text-right">
          <h2
            data-reveal
            className="font-display text-[length:var(--type-display)] leading-[0.82] font-semibold tracking-[-0.02em]"
          >
            {title || t("galleryTitle")}
          </h2>

          {tabs.length > 1 ? (
            <div
              data-reveal
              className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-end"
              role="tablist"
              aria-label={title || t("galleryTitle")}
            >
              {tabs.map((tab) => {
                const selected = tab.id === active;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={`font-display min-h-11 text-[clamp(1.1rem,2vw,1.65rem)] tracking-tight transition-opacity ${
                      selected
                        ? "underline decoration-1 underline-offset-8 opacity-100"
                        : "opacity-40 hover:opacity-75"
                    } ${tab.id === tabs[0]?.id ? "italic" : ""}`}
                    onClick={() => setActive(tab.id)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
        <p data-reveal className="sr-only">
          {body || t("galleryBody")}
        </p>
      </SectionReveal>

      <div className="page-x mx-auto max-w-[90rem]">
        <div
          key={active}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5"
        >
          {activeSlides.map((slide, i) => (
            <figure
              key={`${active}-${slide.src}-${i}`}
              data-reveal
              className="relative aspect-[4/5] overflow-hidden rounded-[25px] bg-fg/5"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-700 hover:scale-[1.03]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
