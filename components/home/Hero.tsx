"use client";

import { useTranslations } from "next-intl";
import { HeroReveal } from "@/components/motion/HeroReveal";

type Props = {
  brand: string;
  headline: string;
  accent: string;
  imageUrl: string | null;
  imageAlt: string;
};

/**
 * Sticky banner track: scroll expands the arch to full-bleed,
 * then the track ends and deco comes up.
 */
export function Hero({ brand, headline, accent, imageUrl, imageAlt }: Props) {
  const t = useTranslations("home");
  const src = imageUrl || "/images/hero-arch.jpg";

  return (
    <HeroReveal>
      <div data-hero-track className="relative" style={{ height: "280vh" }}>
        <div
          data-hero-sticky
          className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-20 md:pt-24"
        >
          <div
            data-hero-copy
            className="page-x relative z-10 flex flex-1 flex-col items-center justify-center pb-[26vh] text-center md:pb-[30vh]"
          >
            <span className="sr-only">{brand}</span>
            <div className="relative mx-auto w-full max-w-[90rem]">
              <div className="hero-line-mask">
                <p
                  data-hero-line
                  className="font-body text-[length:var(--type-hero-line)] leading-[1.28] font-extrabold tracking-[-0.03em] text-fg"
                >
                  {headline || t("heroTitle")}
                </p>
              </div>
              <div className="hero-line-mask -mt-[0.06em]">
                <p
                  data-hero-line
                  className="font-display text-[length:var(--type-hero-accent)] leading-[1.15] font-light tracking-normal italic"
                >
                  {accent || t("heroAccent")}
                </p>
              </div>
            </div>
          </div>

          {/* Full-width layer keeps the arch centered while width grows */}
          <div
            data-hero-arch-slot
            className="pointer-events-none absolute inset-x-0 top-[58%] z-20 flex justify-center"
          >
            <div
              data-hero-arch
              className="arch-frame relative"
              style={{
                width: "var(--arch-w)",
                height: "var(--arch-h)",
              }}
            >
              <div data-hero-media className="absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={imageAlt}
                  className="h-full w-full object-cover"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroReveal>
  );
}
