import { getLocale, getTranslations } from "next-intl/server";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { ContactStrip } from "@/components/contact/ContactStrip";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { resolveContact } from "@/lib/sanity/contact";
import { getApartments, getSiteSettings } from "@/lib/sanity/fetch";
import type { AppLocale } from "@/lib/sanity/types";

export default async function ApartmentsPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("apartments");
  const tHome = await getTranslations("home");
  const [apartments, settings] = await Promise.all([
    getApartments(),
    getSiteSettings(),
  ]);
  const contact = resolveContact(settings, locale);
  const count = apartments.length;

  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="page-x pt-[clamp(6rem,14vw,9rem)] pb-[clamp(2.5rem,6vw,4rem)]">
        <SectionReveal className="mx-auto max-w-[90rem]">
          <p
            data-reveal
            className="font-body text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase"
          >
            {count > 0
              ? t("count", { count })
              : t("eyebrow")}
          </p>
          <h1
            data-reveal
            className="font-display mt-4 text-[length:var(--type-display)] leading-[0.82] font-semibold tracking-[-0.02em]"
          >
            {t("title")}
          </h1>
          <p
            data-reveal
            className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-muted md:mt-8 md:text-base"
          >
            {t("body")}
          </p>
        </SectionReveal>
      </section>

      {count === 0 ? (
        <p className="page-x mx-auto w-full max-w-[90rem] border-t border-line py-16 text-sm text-muted">
          {t("empty")}
        </p>
      ) : (
        <SectionReveal className="page-x mx-auto flex w-full max-w-[90rem] flex-col gap-[clamp(3.5rem,10vw,7rem)] pb-[clamp(4rem,12vw,8rem)]">
          {apartments.map((apt, index) => (
            <ApartmentCard
              key={apt._id}
              apartment={apt}
              locale={locale}
              index={index}
            />
          ))}
        </SectionReveal>
      )}

      <ContactStrip
        title={tHome("contactTitle")}
        body={t("contactPrompt")}
        contact={contact}
      />
    </main>
  );
}
