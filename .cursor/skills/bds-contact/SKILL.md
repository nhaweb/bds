---
name: bds-contact
description: >-
  Implements inquiry contact via Resend email, tel links, and Zalo for the BDS
  apartment site. Use when building contact forms, API routes, phone/Zalo CTAs,
  or lead capture.
---

# BDS contact

## Channels

| Channel | Implementation |
|---------|----------------|
| Form email | `resend` via `POST /api/contact` |
| Phone | `<a href="tel:...">` from Sanity `siteSettings.phone` |
| Zalo | `<a href={zaloUrl}>` (OA or chat URL from Sanity) |

No payments. Form = inquiry only.

## API shape

`app/api/contact/route.ts`:

1. Parse JSON body with **zod**: `name`, `email`, `phone?`, `message`, `apartmentSlug?`, `locale?`
2. Honeypot or simple rate-limit header check if abuse appears (keep minimal)
3. `resend.emails.send({ from, to, replyTo, subject, text/html })`
4. Return `{ ok: true }` or `400`/`500` without leaking internals

Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verified domain).

## UI

- `ContactForm` client component: controlled fields, pending state, success/error via next-intl.
- Prefill hidden/readonly apartment context when submitted from detail page.
- Place phone + Zalo beside form (Nueve contact energy: mail / phone / social).

## Copy

- Submit: “Gửi tin nhắn” / “Send message”
- Success: confirm offline follow-up — not “order received”

## Security

- Validate + sanitize lengths (e.g. message max 2000)
- Never expose Resend key to client
- Optional: Turnstile/hCaptcha later — not required for v1
