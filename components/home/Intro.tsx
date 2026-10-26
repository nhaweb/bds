import { ResidenceLink } from "@/components/home/ResidenceLink";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { imageAlt, urlForImage } from "@/lib/sanity/image";
import { tLocale } from "@/lib/sanity/localize";
import type { ApartmentListItem, AppLocale } from "@/lib/sanity/types";

type Props = {
  title: string;
  body: string;
  bodySecondary: string;
  bodyTertiary: string;
  apartments: ApartmentListItem[];
  locale: AppLocale;
};

/** Nueve “deco.” band: display title + two editorial columns + residence pills. */
export function Intro({
  title,
  body,
  bodySecondary,
  bodyTertiary,
  apartments,
  locale,
}: Props) {
  const featured = apartments.slice(0, 3);

  return (
    <section className="page-x relative z-10 pt-6 pb-[clamp(2.5rem,7vw,4.5rem)] md:pt-10">
      <SectionReveal className="mx-auto max-w-[90rem]">
        <h2
          data-reveal
          className="font-display text-[length:var(--type-display)] leading-[0.82] font-semibold tracking-[-0.02em]"
        >
          {title}
        </h2>

        <div
          data-reveal
          className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-16 lg:gap-24"
        >
          <div className="flex max-w-xl flex-col gap-6 md:gap-8">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {body}
            </p>
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {bodySecondary}
            </p>
          </div>

          <div className="flex max-w-xl flex-col gap-8 md:gap-10 md:justify-between">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {bodyTertiary}
            </p>

            {featured.length > 0 ? (
              <div className="flex flex-wrap items-center gap-3 md:gap-4">
                {featured.map((apt, index) => {
                  const aptTitle = tLocale(apt.title, locale);
                  const img = urlForImage(apt.heroImage, {
                    width: 480,
                    height: 280,
                  });
                  const alt = imageAlt(apt.heroImage, locale, aptTitle);
                  return (
                    <ResidenceLink
                      key={apt._id}
                      href={`/apartments/${apt.slug}`}
                      title={aptTitle.toLowerCase()}
                      imageUrl={img}
                      imageAlt={alt}
                      index={index}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
