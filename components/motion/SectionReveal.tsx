"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  start?: string;
};

/** Scroll-enter for section headlines / intro blocks. */
export function SectionReveal({
  children,
  className = "",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced !== false) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const nodes = targets.length ? targets : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        nodes,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [reduced, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
