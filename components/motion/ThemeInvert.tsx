"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

/**
 * Flip page to dark theme while the editorial band (deco → amenities) is in view.
 */
export function ThemeInvert({
  triggerId = "editorial-band",
}: {
  triggerId?: string;
}) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const trigger = document.getElementById(triggerId);
    if (!trigger) return;

    const setDark = (on: boolean) => {
      if (on) document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        // Dark while a meaningful portion of the band is visible
        setDark(entry.isIntersecting && entry.intersectionRatio >= 0.12);
      },
      {
        root: null,
        threshold: [0, 0.12, 0.25, 0.5, 0.75],
        rootMargin: "-8% 0px -12% 0px",
      },
    );
    io.observe(trigger);

    return () => {
      io.disconnect();
      document.documentElement.removeAttribute("data-theme");
    };
  }, [triggerId, reduced]);

  return null;
}
