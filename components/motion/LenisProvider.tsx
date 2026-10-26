"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

function LenisGsapSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Recalc after fonts/images settle
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

/**
 * Smooth scroll via Lenis (Nueve uses Lenis too).
 * Always on for wheel — reduced-motion only softens lerp / skips scrub elsewhere.
 */
export function LenisProvider({ children }: Props) {
  const reduced = usePrefersReducedMotion();
  const soft = reduced === true;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        // Lower = more glide. Soften when OS asks for reduced motion.
        lerp: soft ? 0.18 : 0.07,
        smoothWheel: true,
        wheelMultiplier: soft ? 1 : 0.9,
        touchMultiplier: 1.4,
        syncTouch: false,
      }}
    >
      <LenisGsapSync />
      {children}
    </ReactLenis>
  );
}
