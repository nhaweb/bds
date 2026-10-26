import { getLocale, getTranslations } from "next-intl/server";
import { Amenities } from "@/components/home/Amenities";
import { ContactStrip } from "@/components/contact/ContactStrip";
import { Hero } from "@/components/home/Hero";
import { HomeGallery } from "@/components/home/HomeGallery";
import { Intro } from "@/components/home/Intro";
import { ThemeInvert } from "@/components/motion/ThemeInvert";
import { resolveContact } from "@/lib/sanity/contact";
import { getHomePage, getSiteSettings } from "@/lib/sanity/fetch";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { tLocale } from "@/lib/sanity/localize";
import type { AppLocale, CmsImage } from "@/lib/sanity/types";

function padSlides<T>(items: T[], min: number, pool: T[]): T[] {
  if (items.length >= min) return items.slice(0, min);
  const out = [...items];
  let i = 0;
  while (out.length < min && pool.length > 0) {
    out.push(pool[i % pool.length]);
    i += 1;
  }
  return out;
}

export default async function HomePage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("home");
  const [home, settings] = await Promise.all([
    getHomePage(),
    getSiteSettings(),
  ]);
  const contact = resolveContact(settings, locale);

  const toSlide = (img: CmsImage | null | undefined) => {
    if (!img) return null;
    const src = urlForImage(img, { width: 900, quality: 85 });
    if (!src) return null;
    return {
      src,
      alt: imageAlt(
        img,
        locale,
        tLocale(home.galleryTitle, locale, t("galleryTitle")),
      ),
    };
  };

  const gallerySlides = (home.gallery ?? [])
    .map(toSlide)
    .filter((s): s is { src: string; alt: string } => Boolean(s));

  const featured = home.featuredApartments ?? [];
  const galleryGroups = featured.slice(0, 3).map((apt, index) => {
    const label = `${tLocale(apt.title, locale)}.`;
    const fromApt = [toSlide(apt.heroImage)].filter(
      (s): s is { src: string; alt: string } => Boolean(s),
    );
    const chunk = Math.ceil(
      gallerySlides.length / Math.max(featured.length, 1),
    );
    const pooled = gallerySlides.slice(
      index * chunk,
      index * chunk + chunk + 2,
    );
    const merged = [...fromApt, ...pooled].filter(
      (s, i, arr) => arr.findIndex((x) => x.src === s.src) === i,
    );

    return {
      id: apt.slug,
      label,
      slides: padSlides(merged, 6, gallerySlides),
    };
  });

  const amenities = (home.amenities ?? []).map((a) => ({
    id: a._id,
    title: tLocale(a.title, locale),
    icon: a.icon,
  }));

  return (
    <main id="main" className="flex flex-1 flex-col">
      <Hero
        brand={contact.brand}
        headline={tLocale(home.hero?.headline, locale, t("heroTitle"))}
        accent={t("heroAccent")}
        imageUrl={
          urlForImage(home.hero?.image, { width: 1200, quality: 85 }) ||
          "/images/hero-arch.jpg"
        }
        imageAlt={imageAlt(home.hero?.image, locale, contact.brand)}
      />

      <div id="editorial-band">
        <ThemeInvert triggerId="editorial-band" />

        <Intro
          title={tLocale(home.intro?.title, locale, t("introTitle"))}
          body={tLocale(home.intro?.body, locale, t("introBody"))}
          bodySecondary={t("introBodySecondary")}
          bodyTertiary={t("introBodyTertiary")}
          apartments={featured}
          locale={locale}
        />

        <HomeGallery
          title={tLocale(home.galleryTitle, locale, t("galleryTitle"))}
          body={t("galleryBody")}
          slides={padSlides(gallerySlides, 6, gallerySlides)}
          groups={galleryGroups}
        />

        <Amenities
          title={tLocale(
            home.amenitiesIntro?.title,
            locale,
            t("amenitiesTitle"),
          )}
          body={tLocale(home.amenitiesIntro?.body, locale, t("amenitiesBody"))}
          items={amenities}
        />
      </div>

      <ContactStrip
        title={t("contactTitle")}
        body={t("contactBody")}
        contact={contact}
      />
    </main>
  );
}
