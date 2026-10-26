---
name: bds-i18n
description: >-
  Configures next-intl for Vietnamese (default) and English on the BDS site.
  Use when adding locales, messages, middleware, locale switcher, or translating UI.
---

# BDS i18n

## Locales

- `vi` — default
- `en`

## Setup outline (App Router)

1. `i18n/routing.ts` — `defineRouting({ locales: ["vi", "en"], defaultLocale: "vi" })`
2. `i18n/request.ts` — `getRequestConfig` loading `messages/${locale}.json`
3. `middleware.ts` — `createMiddleware(routing)` from `next-intl/middleware`
4. Nest pages under `app/[locale]/...`
5. Root `app/layout.tsx` remains thin if required by Next; locale layout sets `lang` + `NextIntlClientProvider`

Follow current `next-intl` docs for the installed version — APIs drift.

## Message files

- `messages/vi.json`, `messages/en.json`
- Identical key trees; harness fails on drift (`npm run harness:i18n`)

Suggested namespaces:

```json
{
  "nav": { "home": "", "apartments": "", "contact": "" },
  "cta": { "contact": "", "zalo": "", "call": "", "viewApartment": "" },
  "home": { "heroTitle": "", "heroBody": "" },
  "apartments": { "title": "", "empty": "", "status": { "available": "", "reserved": "", "sold": "" } },
  "contact": { "title": "", "form": { "name": "", "email": "", "phone": "", "message": "", "submit": "", "success": "", "error": "" } },
  "footer": { "rights": "" }
}
```

## Usage

- Server: `const t = await getTranslations("nav")`
- Client: `const t = useTranslations("nav")`
- Never concatenate locale-specific sentences in code — whole strings in JSON.

## Locale switcher

- Preserve pathname; swap locale prefix.
- For apartment slugs: use **shared slug** across locales (simpler) unless product asks otherwise.

## CMS vs UI strings

- Chrome (nav, buttons, errors) → `messages/*.json`
- Apartment titles/bodies → Sanity localized fields
