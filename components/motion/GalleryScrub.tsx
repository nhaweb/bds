"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
};

/** Pinned horizontal gallery scrub — Nueve gallery energy. */
export function GalleryScrub({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced !== false) return;

    const track = el.querySelector<HTMLElement>("[data-gallery-track]");
    const pin = el.querySelector<HTMLElement>("[data-gallery-pin]");
    if (!track) return;

    const ctx = gsap.context(() => {
      const getShift = () =>
        Math.max(
          0,
          track.scrollWidth - (pin?.clientWidth || el.clientWidth) + 24,
        );

      gsap.to(track, {
        x: () => -getShift(),
        ease: "none",
        scrollTrigger: {
          trigger: pin || el,
          start: "top 18%",
          end: () =>
            `+=${Math.max(getShift() * 1.15, window.innerHeight * 0.9)}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
