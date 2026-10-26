---
name: bds-architecture
description: >-
  Scaffolds and maintains the BDS apartment reference site architecture
  (Next.js App Router, Sanity, next-intl, Resend, Embla, GSAP/Lenis).
  Use when setting up the project, adding folders/deps, or deciding where
  code belongs.
---

# BDS architecture

## Read first

- `AGENTS.md`
- `docs/PRODUCT.md`
- [stack.md](stack.md)

## Intended tree

```
app/
  [locale]/
    layout.tsx
    page.tsx                 # home
    apartments/
      page.tsx
      [slug]/page.tsx
    contact/page.tsx
  api/contact/route.ts       # Resend
  studio/[[...tool]]/        # Sanity Studio embed (optional)
components/
  layout/                    # Header, Footer, LocaleSwitcher
  home/                      # Hero, Intro, Featured, Gallery, Amenities
  apartments/                # Card, Gallery (Embla), Specs
  motion/                    # LenisProvider, Reveal, ScrollSection
  contact/                   # ContactForm, PhoneLink, ZaloLink
lib/
  sanity/                    # client, image, queries, types
  contact/                   # resend helper, validation (zod)
  constants.ts
messages/
  vi.json
  en.json
i18n/
  routing.ts
  request.ts
sanity/
  schemaTypes/
  structure.ts
scripts/harness/
```

## Dependency defaults

Install when scaffolding (adjust versions to current Next 16 / React 19):

```bash
npm i next-intl @sanity/client next-sanity @sanity/image-url sanity styled-components
npm i gsap lenis motion embla-carousel-react embla-carousel-autoplay
npm i resend zod
npm i -D @types/node
```

Optional: `@portabletext/react` for rich text; `sharp` if needed for images.

## Conventions

- Server Components by default; `"use client"` only for Embla, Lenis, GSAP, form state.
- Fetch Sanity on the server; pass serializable props to client islands.
- Route handlers for email only — no Sanity writes from the public site.
- After scaffolding, run `npm run harness`.

## Anti-patterns

- Hardcoded apartment arrays in components
- Locale strings inline without `messages/*.json`
- Custom drag carousel instead of Embla
- Payment or booking modules
