"use client";

import { HeroReveal } from "@/components/motion/HeroReveal";

type Props = {
  title: string;
  tagline: string;
  imageUrl: string | null;
  imageAlt: string;
};

/**
 * Nueve Classic–style residence hero: Playfair title + tagline
 * flanking a sticky arch that expands to full-bleed on scroll.
 */
export function DetailHero({ title, tagline, imageUrl, imageAlt }: Props) {
  const src = imageUrl || "/images/hero-arch.jpg";
  // Nueve uses short display names (classic. / mini.) — first word + period
  const short =
    title.trim().toLowerCase().split(/\s+/)[0]?.replace(/\.$/, "") || title;
  const display = `${short}.`;

  return (
    <HeroReveal>
      <div data-hero-track className="relative" style={{ height: "240vh" }}>
        <div
          data-hero-sticky
          className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-20 md:pt-24"
        >
          <div
            data-hero-copy
            className="page-x relative z-10 flex flex-1 items-start justify-between gap-6 pt-[10vh] md:items-end md:pb-[42vh] md:pt-0"
          >
            <div className="hero-line-mask">
              <h1
                data-hero-line
                className="font-display text-[length:var(--type-title)] leading-[1.05] font-semibold tracking-[-0.02em]"
              >
                <span className="sr-only">{title}</span>
                <span aria-hidden>{display}</span>
              </h1>
            </div>
            <div className="hero-line-mask pt-3 md:pb-4 md:pt-0">
              <p
                data-hero-line
                className="font-display text-right text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.1] font-light italic tracking-tight text-muted"
              >
                {tagline}
              </p>
            </div>
          </div>

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
