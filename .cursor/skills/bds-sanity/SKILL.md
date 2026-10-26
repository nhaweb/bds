---
name: bds-sanity
description: >-
  Defines and wires Sanity CMS for BDS apartments, site settings, images, and
  GROQ queries. Use when adding schemas, Studio, content models, or fetching
  apartment data.
---

# BDS Sanity

## Read also

- [schemas.md](schemas.md) — field-level schema sketch

## Setup outline

1. Create Sanity project; set `NEXT_PUBLIC_SANITY_PROJECT_ID` + `DATASET`.
2. Add `sanity/` schemas + `lib/sanity/client.ts` (server client).
3. Optional: embed Studio at `app/studio/[[...tool]]/page.tsx` via `next-sanity`.
4. Seed 1–3 apartments + `siteSettings` before building UI against mocks.

## Client pattern

```ts
// lib/sanity/client.ts
import { createClient } from "next-sanity";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  useCdn: true,
});
```

Use a token + `useCdn: false` only when preview/draft is required.

## Image helper

```ts
import imageUrlBuilder from "@sanity/image-url";
import { sanity } from "./client";

const builder = imageUrlBuilder(sanity);
export const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);
```

Always chain `.width().height().quality()` (or fit) before `.url()`.

## Query rules

- Colocate GROQ in `lib/sanity/queries.ts`.
- Return only fields the UI needs.
- Listing query: slug, title, location, hero image, priceLabel, status.
- Detail query: + gallery, amenities, body, SEO.

## Localization

Pick **one**:

1. **Field-level**: `title.vi` / `title.en` (or `localeString` type).
2. **Document-level**: separate docs per locale linked by `translation.slug`.

Prefer field-level for this site size. Document the choice in schema comments.

## Do not

- Store secrets in Sanity documents
- Fetch Sanity from the browser with a write token
- Hardcode fallback apartment arrays once Studio has content
