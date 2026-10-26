# Stack reference

| Concern | Library | Notes |
|---------|---------|-------|
| Framework | `next` (App Router) | Read `node_modules/next/dist/docs/` for this major |
| UI | React 19 + Tailwind v4 | `@import "tailwindcss"` |
| CMS | `next-sanity` + `sanity` | Embedded Studio optional under `/studio` |
| Images | `@sanity/image-url` + `next/image` | Always set width/quality |
| i18n | `next-intl` | `vi` default, `en` |
| Smooth scroll | `lenis` | Pause when `prefers-reduced-motion` |
| Scroll scenes | `gsap` + ScrollTrigger | Kill tweens on unmount |
| Micro UI motion | `motion` | Buttons, drawers |
| Carousel | `embla-carousel-react` | Apartment galleries |
| Email | `resend` | Contact form |
| Validation | `zod` | Contact payload |
| Hosting | Vercel (preview) · fly.io (prod) | See `bds-deploy` |

## Env keys (document in `.env.example`)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=          # if private dataset
NEXT_PUBLIC_SITE_URL=

RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=

NEXT_PUBLIC_PHONE_E164=         # e.g. +8490...
NEXT_PUBLIC_ZALO_OA_ID=         # or full Zalo chat URL
```

Phone/Zalo may instead come solely from Sanity `siteSettings` — prefer CMS as source of truth when Studio is live; env as fallback for bootstrap.
