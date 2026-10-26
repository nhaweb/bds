<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PML Resort — Apartment Reference Site

Luxury apartment **reference / inquiry** website for **PML Resort**, inspired by [nueve.gr](https://nueve.gr/en/). Visitors browse apartments and contact the seller; **no cart, checkout, or online purchase**.

## Product non-negotiables

- Site is informational + lead capture only. CTAs: “Liên hệ / Contact”, phone, Zalo — never “Buy now / Thanh toán”.
- Content & images live in **Sanity**. Do not hardcode apartment inventory in React.
- Locales: **vi** (default) + **en** via `next-intl`.
- Prefer third-party libs over hand-rolled complex animation / carousel / CMS / email.

## Stack (locked)

| Layer | Choice |
|-------|--------|
| FE | Next.js App Router + TypeScript + Tailwind CSS v4 |
| CMS | Sanity (images + content) |
| Motion | GSAP + ScrollTrigger and/or Motion; Lenis for smooth scroll |
| Carousel | Embla Carousel |
| i18n | next-intl (`vi`, `en`) |
| Contact | Resend (form email) + `tel:` + Zalo deep link |
| Host | Dev preview: Vercel · Production: fly.io |

## Agent workflow

1. Before UI/feature work, read `docs/PRODUCT.md` and `docs/DESIGN.md`.
2. Apply matching skills under `.cursor/skills/` (architecture, design, sanity, motion, i18n, contact, deploy).
3. After structural / i18n / env / stack changes, run harness: `npm run harness`.
4. Before shipping UI animation or scroll work, follow `bds-motion` skill (prefer libs; keep ScrollTrigger cleanup).
5. Read Next.js docs in `node_modules/next/dist/docs/` when unsure about App Router APIs.

## Target information architecture

```
/[locale]/                 # editorial home (hero → intro → featured residences → gallery → amenities → contact)
/[locale]/apartments       # listing
/[locale]/apartments/[slug]# detail (gallery Embla, amenities, inquiry CTA)
/[locale]/contact          # form (Resend) + phone + Zalo
```

Optional: Experiences / neighborhood section on home (editorial, not booking).

## Repo map (intended)

```
app/                    # Next.js App Router (locale segment)
components/             # UI + motion wrappers
lib/                    # sanity client, resend, constants
messages/               # vi.json, en.json
sanity/                 # schemas, desk structure
public/
scripts/harness/        # agent validation harness
docs/                   # PRODUCT, DESIGN
.cursor/rules/          # persistent rules
.cursor/skills/         # project skills
```

## Skills index

| Skill | When |
|-------|------|
| `bds-architecture` | Scaffold, folders, dependencies, conventions |
| `bds-design` | Visual language, layout, typography (Nueve-inspired) |
| `bds-sanity` | Schemas, queries, image URLs, Studio |
| `bds-motion` | GSAP, ScrollTrigger, Lenis, Motion, Embla |
| `bds-i18n` | next-intl routing, messages, locale switch |
| `bds-contact` | Resend API route, phone, Zalo |
| `bds-deploy` | Vercel preview, fly.io production |
| `bds-harness` | Run / extend validation scripts (`docs/HARNESS.md`) |

## Do / Don't

**Do**

- Keep first viewport brand-forward, full-bleed hero, minimal chrome (see `docs/DESIGN.md`).
- Use Sanity image pipeline (`@sanity/image-url`) with explicit sizes.
- Colocate server actions / route handlers for contact under `app/api/` or `app/[locale]/...`.
- Prefer Embla over custom drag carousels; prefer GSAP plugins over CSS-only scroll theatre when sequencing is complex.

**Don't**

- Add e-commerce, payments, or availability calendars.
- Invent apartment data in components — seed via Sanity.
- Ship purple-gradient / generic AI landing aesthetics; follow earthy editorial direction in DESIGN.md.
- Commit secrets (`.env*`); document required keys in `.env.example` only.
