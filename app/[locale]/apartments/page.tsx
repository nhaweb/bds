import { getLocale, getTranslations } from "next-intl/server";
import { ApartmentCard } from "@/components/apartments/ApartmentCard";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { getApartments } from "@/lib/sanity/fetch";
import type { AppLocale } from "@/lib/sanity/types";

export default async function ApartmentsPage() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("apartments");
  const apartments = await getApartments();

  return (
    <main
      id="main"
      className="page-x section-y mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10"
    >
      <SectionReveal className="max-w-3xl">
        <h1
          data-reveal
          className="font-display text-[length:var(--type-title)] font-medium tracking-tight"
        >
          {t("title")}
        </h1>
        <p data-reveal className="mt-4 text-muted">
          {t("body")}
        </p>
      </SectionReveal>

      {apartments.length === 0 ? (
        <p className="border-t border-line pt-6 text-sm text-muted">
          {t("empty")}
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apt) => (
            <ApartmentCard key={apt._id} apartment={apt} locale={locale} />
          ))}
        </div>
      )}
    </main>
  );
}
