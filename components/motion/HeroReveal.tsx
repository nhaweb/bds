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

/**
 * Sticky track + centered expand:
 * Flex slot keeps the arch centered; we only grow width/height/top/radius.
 */
export function HeroReveal({ children, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const track = root.querySelector<HTMLElement>("[data-hero-track]");
    const slot = root.querySelector<HTMLElement>("[data-hero-arch-slot]");
    const arch = root.querySelector<HTMLElement>("[data-hero-arch]");
    const media = root.querySelector<HTMLElement>("[data-hero-media]");
    const copy = root.querySelector<HTMLElement>("[data-hero-copy]");
    const lines = root.querySelectorAll<HTMLElement>("[data-hero-line]");
    if (!track || !slot || !arch) return;

    const startW = arch.getBoundingClientRect().width;
    const startH = arch.getBoundingClientRect().height;

    const ctx = gsap.context(() => {
      gsap.set(slot, { top: "58%", bottom: "auto" });
      gsap.set(arch, {
        width: startW,
        height: startH,
        borderRadius: "500px 500px 0px 0px",
        opacity: 1,
        force3D: true,
      });
      if (media) gsap.set(media, { scale: 1.12, opacity: 1 });

      if (reduced === false && lines.length) {
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 1.05,
            stagger: 0.1,
            ease: "power3.out",
          },
        );
      }

      ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const w = gsap.utils.interpolate(startW, window.innerWidth, p);
          const h = gsap.utils.interpolate(startH, window.innerHeight, p);
          const top = gsap.utils.interpolate(58, 0, p);
          const radius = gsap.utils.interpolate(500, 0, p);

          // Slot stays full-width + flex centered → no horizontal drift
          gsap.set(slot, { top: `${top}%` });
          gsap.set(arch, {
            width: w,
            height: h,
            borderRadius: `${radius}px ${radius}px 0px 0px`,
          });

          if (media) {
            gsap.set(media, {
              scale: gsap.utils.interpolate(1.12, 1, p),
            });
          }

          if (copy) {
            const cp = Math.min(1, p / 0.4);
            gsap.set(copy, {
              opacity: 1 - cp,
              y: -48 * cp,
            });
          }
        },
      });

      root.setAttribute("data-hero-ready", "1");
      ScrollTrigger.refresh();
    }, root);

    const sync = () => ScrollTrigger.update();
    window.addEventListener("scroll", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      ctx.revert();
      root.removeAttribute("data-hero-ready");
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
