"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type PointerEvent } from "react";
import { Link } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";

type Props = {
  href: `/apartments/${string}`;
  title: string;
  imageUrl: string | null;
  imageAlt: string;
  index: number;
};

/** Pill residence chip under deco (Nueve classic / mini / village). */
export function ResidenceLink({
  href,
  title,
  imageUrl,
  imageAlt,
  index,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 16, mass: 0.3 });
  const sy = useSpring(my, { stiffness: 180, damping: 16, mass: 0.3 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (reduced === true || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 10);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const labelClass =
    index === 1
      ? "font-body text-sm font-bold tracking-wide lowercase md:text-base"
      : "font-display text-sm tracking-wide italic md:text-base";

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-6 py-3 outline-none ring-1 ring-fg/25 transition hover:ring-fg/60"
    >
      {imageUrl ? (
        <motion.span
          style={{ x: sx, y: sy }}
          className="absolute inset-0 block opacity-40 transition-opacity group-hover:opacity-70"
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-fg/55" />
        </motion.span>
      ) : (
        <span aria-hidden className="absolute inset-0 bg-fg/10" />
      )}
      <span className={`relative z-10 text-fg ${labelClass}`}>{title}</span>
      <span className="sr-only">{imageAlt}</span>
    </Link>
  );
}
