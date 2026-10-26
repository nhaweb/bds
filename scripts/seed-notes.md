# Seeding PML Resort content

Offline development uses `lib/sanity/fallback.ts` (3 apartments + site settings + home).

When you have a real Sanity project:

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.
2. Run `npm run dev` and open `/studio`.
3. Create singleton **Site settings** (`siteSettings`) and **Home page** (`homePage`) via the desk.
4. Add amenities, then 3 apartments (mark featured; set shared slugs).
5. Upload photography; publish. The site prefers live GROQ results over fixtures.
