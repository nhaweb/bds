---
name: bds-design
description: >-
  Implements Nueve-inspired editorial luxury UI for the BDS apartment site.
  Use when building pages, heroes, sections, typography, color, or layout;
  when the user mentions Nueve, gallery, deco, or visual polish.
---

# BDS design

## Source of truth

Follow `docs/DESIGN.md` and the live reference [nueve.gr/en](https://nueve.gr/en/).

## Implementation checklist

When building or restyling a page:

1. **Hero budget** — brand, one headline, one sentence, CTA group, full-bleed image only.
2. **Section job** — one purpose, one headline, short support copy.
3. **No hero cards / badges / overlays.**
4. **Typography** — `next/font` pair → CSS variables `--font-display`, `--font-body`.
5. **Color** — CSS variables in `globals.css` (`--bg`, `--fg`, `--muted`, `--accent`, `--line`).
6. **Motion** — at least 2–3 intentional animations site-wide via `bds-motion`; honor reduced motion.
7. **Photography** — Sanity images dominate; UI chrome stays quiet.

## Component mapping (suggested)

| Section | Component |
|---------|-----------|
| Hero | `components/home/Hero.tsx` |
| Intro | `components/home/Intro.tsx` |
| Featured residences | `components/home/FeaturedResidences.tsx` |
| Gallery | `components/home/HomeGallery.tsx` (Embla) |
| Amenities | `components/home/Amenities.tsx` |
| Contact strip | `components/contact/ContactStrip.tsx` |

## Copy tone

Sparse, confident, hospitality-adjacent. Prefer short display words with period cadence when it fits the brand — do not force it on every heading.

## Anti-patterns

- Dashboard / dense filter-first listing on home
- Purple gradients, glow stacks, pill clusters, emoji as decoration
- Inset rounded hero media card
- “Buy now” commerce chrome
