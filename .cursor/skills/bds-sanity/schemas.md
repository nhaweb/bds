# Schema sketch

## `siteSettings` (singleton)

- `brandName` (locale string)
- `phone` (string, E.164 display)
- `zaloUrl` (url)
- `email` (email)
- `socials[]` { network, url }
- `seo` { title, description, ogImage }

## `apartment`

- `title` (locale)
- `slug` (slug — shared across locales unless using doc-level i18n)
- `status` — `available` | `reserved` | `sold` (sold still visible as reference optional)
- `location` (locale short string)
- `priceLabel` (locale — display only)
- `summary` (locale text)
- `specs` { bedrooms, bathrooms, areaM2, floors? }
- `amenities[]` — refs to `amenity` or string list
- `heroImage` (image + alt locale)
- `gallery[]` (images + alt)
- `body` (portable text locale or dual)
- `featured` (boolean)
- `order` (number)

## `amenity`

- `title` (locale)
- `icon` (string key mapped in UI, or SVG upload sparingly)

## `homePage` (singleton)

- `hero` { headline, subcopy, image, ctaLabel → apartments|contact }
- `intro` { title, body }
- `featuredApartments[]` → apartment refs
- `galleryTitle`
- `amenitiesIntro`
- `amenities[]` → amenity refs

## Desk structure

- Settings → Site settings, Home page
- Apartments → list
- Amenities → list
- Legal pages (optional)
