# Design language — Nueve-inspired apartment site

Reference: [https://nueve.gr/en/](https://nueve.gr/en/)

## Mood

Quiet luxury. Editorial hospitality. Earthy, calm, photographic. Not a real-estate classifieds grid.

## First viewport (hero budget)

Only:

1. Brand / wordmark (hero-level signal)
2. One short headline (can be typographic: e.g. “không đâu bằng / nhà.” energy — adapt to Vietnamese brand voice)
3. One supporting sentence
4. One CTA group (Contact / View apartments)
5. One dominant **full-bleed** image (edge-to-edge background or plane)

No stats strips, no card grids, no floating badges on the hero image, no inset rounded media cards in the hero.

## Section rhythm (home)

Mirror Nueve’s calm sequence:

1. **Hero** — brand + home statement
2. **Intro / deco** — short editorial copy about the collection
3. **Residences** — named apartment types / featured units (Classic · Mini · Village energy → adapt to project names)
4. **Gallery** — large photography, Embla where multiple shots
5. **Amenities** — sparse icon/label list, one line of support copy
6. **Contact** — mail, phone, Zalo, form

One job per section: one headline, usually one short supporting sentence.

## Typography

- Expressive display + readable body. Avoid Inter / Roboto / Arial / system-only stacks.
- Prefer a distinctive Google/local font pair loaded via `next/font` (e.g. display serif or refined grotesque + clean sans). Document chosen pair in CSS variables.
- Headlines can be lowercase with trailing period (Nueve: “home.” “deco.” “gallery.”) — use sparingly, not on every heading.

## Color & atmosphere

Define CSS variables in `app/globals.css`:

```css
:root {
  --bg: #e8e4d9; /* warm stone (Nueve-like) */
  --fg: #141414;
  --muted: #5c584f;
  --accent: #1a1a1a;
  --line: #d4d0c4;
  --gallery: #1a1a1a;
}
```

Typography: **Playfair** (`--font-display`, Vietnamese + optical size) + **Be Vietnam Pro** (`--font-body`). Both via `next/font` with `vietnamese` subset — Melodrama/Manrope dropped because stacked marks clipped or fell back at hero sizes.

Hero pattern: Be Vietnam Pro extrabold line + Playfair italic accent + centered **arch** that scrubs into deco (not full-bleed). Line reveals use `.hero-line-mask` so diacritics aren’t cropped. Page **inverts to dark** when gallery enters (`data-theme="dark"`). Gallery: tabs + `25px` rounded portraits + pinned horizontal scrub.

Light mode first. Dark only if brand asks.

## Layout rules

- Full-bleed hero by default.
- Cards: default **no**. Cards only when they wrap a clear interaction (listing card → detail).
- Generous whitespace; large type; photography does the selling.
- Mobile: same hierarchy; collapse nav to minimal; keep CTAs thumb-reachable.

## Motion

- Smooth page scroll: Lenis (or equivalent) integrated with ScrollTrigger scrub carefully.
- 2–3 intentional motions site-wide: hero reveal, section headline fade/slide, gallery parallax or opacity scrub.
- Prefer GSAP + ScrollTrigger for scroll-tied sequences; Motion for UI micro-interactions.
- Respect `prefers-reduced-motion`: disable Lenis smooth + scrub animations.

## Imagery

- Real apartment / place photography from Sanity.
- Use Sanity CDN with width/quality params; provide `sizes` on `next/image` or Sanity-backed Image component.
- Gallery: Embla — loop optional, dots/progress subtle, keyboard accessible.

## Interaction chrome

- Nav: Home · Apartments · Contact (+ locale EN/VI). Optional “book now” analogue → **Contact**.
- Footer: phone, email, Zalo, legal links, © year.
- No marketplace filters overload on home; keep listing filters minimal if present.
