import { Suspense } from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ContactForm } from "@/components/contact/ContactForm";
import { resolveContact } from "@/lib/sanity/contact";
import { getSiteSettings } from "@/lib/sanity/fetch";
import type { AppLocale } from "@/lib/sanity/types";

type SearchProps = {
  searchParams: Promise<{ apartment?: string }>;
};

export default function ContactPage({ searchParams }: SearchProps) {
  return (
    <Suspense fallback={<ContactFallback />}>
      <ContactContent searchParams={searchParams} />
    </Suspense>
  );
}

function ContactFallback() {
  return (
    <main
      id="main"
      className="page-x section-y mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8"
    >
      <div className="h-8 w-40 bg-line/60" />
      <div className="h-10 w-64 bg-line/60" />
      <div className="grid gap-10 md:grid-cols-2">
        <div className="h-64 bg-line/60" />
        <div className="h-64 bg-line/60" />
      </div>
    </main>
  );
}

async function ContactContent({ searchParams }: SearchProps) {
  const { apartment } = await searchParams;
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("contact");
  const settings = await getSiteSettings();
  const contact = resolveContact(settings, locale);

  return (
    <main
      id="main"
      className="page-x section-y mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10"
    >
      <div className="max-w-2xl">
        <h1 className="font-display text-[length:var(--type-title)] font-medium tracking-tight">
          {t("title")}
        </h1>
        <p className="mt-4 text-muted">{t("body")}</p>
      </div>

      <div className="grid gap-12 border-t border-line pt-10 md:grid-cols-2 md:gap-16">
        <ContactForm apartmentSlug={apartment} />
        <div className="flex flex-col gap-6">
          <h2 className="font-display text-2xl tracking-tight">
            {t("hotline")}
          </h2>
          <ContactChannels contact={contact} />
        </div>
      </div>
    </main>
  );
}
