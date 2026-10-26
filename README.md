# BDS — Apartment reference site

Editorial site to showcase apartments for sale. Inquiry only (form / phone / Zalo) — no online checkout. Visual direction inspired by [Nueve Residences](https://nueve.gr/en/).

## Stack

Next.js App Router · TypeScript · Tailwind v4 · Sanity · GSAP / Lenis / Motion · Embla · next-intl (vi/en) · Resend · Vercel (preview) · fly.io (prod)

## Agent docs

| Path | Role |
|------|------|
| `AGENTS.md` | Agent entrypoint |
| `docs/PRODUCT.md` | Product brief |
| `docs/DESIGN.md` | Design language |
| `.cursor/rules/` | Persistent rules |
| `.cursor/skills/` | Project skills |
| `scripts/harness/` | Validation harness |

## Develop

```bash
npm install
cp .env.example .env.local   # fill Sanity + Resend when ready
npm run dev
```

## Harness

```bash
npm run harness          # bootstrap mode (warns on missing scaffold)
npm run harness:strict   # CI / after scaffold — missing pieces fail
npm run harness:skills   # agent skills present
```

Learning notes: [`docs/HARNESS.md`](docs/HARNESS.md).

## Locales

- `vi` — default
- `en`
