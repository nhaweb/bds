"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { CarouselSlide } from "@/components/gallery/ImageCarousel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type Props = {
  title: string;
  body: string;
  slides: CarouselSlide[];
  groups?: { id: string; label: string; slides: CarouselSlide[] }[];
};

const ease = [0.22, 1, 0.36, 1] as const;
/** Same duration + travel for in and out so the handoff feels even. */
const WIPE_MS = 0.5;
const WIPE_Y = 32;

/** Tabbed 3×2 portrait grid — matches Nueve gallery band. */
export function HomeGallery({ title, body, slides, groups }: Props) {
  const t = useTranslations("home");
  const reduced = usePrefersReducedMotion();
  const tabs = useMemo(() => {
    if (groups && groups.length > 0) return groups;
    return [{ id: "all", label: t("galleryTabAll"), slides }];
  }, [groups, slides, t]);

  const [active, setActive] = useState(tabs[0]?.id ?? "all");

  const activeSlides = (
    tabs.find((tab) => tab.id === active)?.slides ?? slides
  ).slice(0, 6);

  if (slides.length === 0 && (!groups || groups.length === 0)) return null;

  const instant = reduced === true;

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
                    className={`font-display relative min-h-11 text-[clamp(1.1rem,2vw,1.65rem)] tracking-tight transition-opacity ${
                      selected ? "opacity-100" : "opacity-40 hover:opacity-75"
                    } ${tab.id === tabs[0]?.id ? "italic" : ""}`}
                    onClick={() => {
                      if (tab.id !== active) setActive(tab.id);
                    }}
                  >
                    {tab.label}
                    {selected ? (
                      <motion.span
                        layoutId="gallery-tab-underline"
                        className="absolute inset-x-0 -bottom-1 h-px bg-current"
                        transition={
                          instant
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 36 }
                        }
                      />
                    ) : null}
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

      {/*
        mode="wait": exit finishes, then enter.
        One wipe direction for every tab change (index-based reverse
        made “back” to earlier residences feel flipped + rushed).
      */}
      <div className="page-x relative mx-auto max-w-[90rem] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            role="tabpanel"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5"
            initial={
              instant
                ? false
                : {
                    clipPath: "inset(100% 0 0 0)",
                    y: WIPE_Y,
                  }
            }
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              transition: instant
                ? { duration: 0 }
                : { duration: WIPE_MS, ease },
            }}
            exit={
              instant
                ? undefined
                : {
                    clipPath: "inset(0 0 100% 0)",
                    y: -WIPE_Y,
                    transition: { duration: WIPE_MS, ease },
                  }
            }
          >
            {activeSlides.map((slide, i) => (
              <figure
                key={`${active}-${slide.src}-${i}`}
                className="relative aspect-[4/5] overflow-hidden rounded-[25px] bg-fg/5"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={instant ? false : { scale: 1.08 }}
                  animate={{
                    scale: 1,
                    transition: instant
                      ? { duration: 0 }
                      : { duration: WIPE_MS, ease },
                  }}
                  exit={
                    instant
                      ? undefined
                      : {
                          scale: 1.08,
                          transition: { duration: WIPE_MS, ease },
                        }
                  }
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-700 hover:scale-[1.03]"
                  />
                </motion.div>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
