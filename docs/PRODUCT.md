# Product brief — PML Resort

## One-liner

Editorial website for **PML Resort** showcasing apartments for sale. Buyers browse and inquire; deals happen offline.

## Goals

1. Present apartments with luxury hospitality aesthetics (reference: [Nueve Residences](https://nueve.gr/en/)).
2. Make contacting the seller frictionless (form → Resend email, phone tap, Zalo).
3. Support Vietnamese (default) and English.
4. Let non-developers update copy and photos via Sanity Studio.

## Non-goals

- Online purchase, deposits, escrow, or booking calendars
- User accounts / CRM beyond email leads
- Multi-seller marketplace

## Primary user journeys

1. **Browse home** → scroll editorial sections → open a featured apartment → inquire.
2. **Listing** → filter/skim cards → detail → gallery → contact.
3. **Direct contact** → phone or Zalo from header/footer.

## Content entities (Sanity)

| Type | Purpose |
|------|---------|
| `siteSettings` | Brand name, phone, Zalo, email, socials, SEO defaults |
| `homePage` | Hero, intro (“deco.”-style), featured apartments refs, amenities blurb |
| `apartment` | Title, slug, location, price display string, status, specs, amenities, gallery, body |
| `amenity` | Shared amenity labels/icons (optional reusable) |
| `page` | Legal (privacy/cookies) if needed |

Price is **display text** (e.g. “Liên hệ” / “Contact for price” or formatted VND string) — not a checkout amount.

## CTA copy rules

| Locale | Preferred | Avoid |
|--------|-----------|-------|
| vi | Liên hệ, Nhắn Zalo, Gọi ngay, Xem căn hộ | Mua ngay, Thanh toán, Đặt cọc online |
| en | Contact, Chat on Zalo, Call, View apartment | Buy now, Checkout, Book |

## Success metrics (manual)

- Sanity publish → apartment appears on site without deploy
- Contact form delivers email via Resend
- Phone / Zalo links open correctly on mobile
- `vi` / `en` parity for UI chrome; CMS fields localized where needed
- `npm run harness` green before PR
