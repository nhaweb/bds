---
name: bds-motion
description: >-
  GSAP ScrollTrigger, Lenis smooth scroll, Motion micro-interactions, and Embla
  carousels for the BDS site. Use when adding scroll animation, smooth scrolling,
  galleries, or prefers-reduced-motion behavior.
---

# BDS motion

## Defaults

| Need | Use |
|------|-----|
| Smooth scroll | `lenis` |
| Scroll-tied scenes | `gsap` + `ScrollTrigger` |
| UI micro (hover, mount) | `motion` |
| Image galleries | `embla-carousel-react` |

Do not hand-roll drag carousels or custom inertia scroll.

## Lenis + ScrollTrigger

- Provide a client `LenisProvider` wrapping locale layout content.
- On each Lenis `scroll` event, call `ScrollTrigger.update`.
- Use `gsap.ticker` integration per Lenis docs when combining.
- If `prefers-reduced-motion: reduce` → skip Lenis smooth, use native scroll; skip scrub animations (instant state ok).

## GSAP hygiene

```ts
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// in effect: create tweens/triggers; return () => { ctx.revert(); }
```

- Prefer `gsap.context(() => { ... }, ref)` and `ctx.revert()` on cleanup.
- Never leave ScrollTriggers alive across navigations.

## Motion (library)

- Use for button/press, locale menu, form feedback.
- Keep spring configs subtle; editorial site ≠ playful bounce spam.

## Embla

- Apartment detail gallery + home gallery.
- Plugins: Autoplay only if subtle and paused on hover/focus.
- Provide prev/next buttons with aria-labels from next-intl.
- Sync optional progress dots; keyboard focusable.

## Performance

- Animate `transform` / `opacity` only when possible.
- Don't attach ScrollTrigger to hundreds of nodes — batch section roots.
- Lazy-mount heavy galleries below the fold when practical.
