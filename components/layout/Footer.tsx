import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { resolveContact } from "@/lib/sanity/contact";
import { getSiteSettings } from "@/lib/sanity/fetch";
import type { AppLocale } from "@/lib/sanity/types";

async function copyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tContact = await getTranslations("contact");
  const tCta = await getTranslations("cta");
  const year = await copyrightYear();
  const locale = (await getLocale()) as AppLocale;
  const settings = await getSiteSettings();
  const contact = resolveContact(settings, locale);

  return (
    <footer className="mt-auto border-t border-line bg-bg-elevated">
      <div className="page-x section-y grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <p className="font-display text-2xl tracking-tight">{contact.brand}</p>
          <p className="max-w-sm text-sm text-muted">{t("inquiryOnly")}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted">
            {tNav("home")}
          </p>
          <Link href="/" className="min-h-11 inline-flex items-center text-fg">
            {tNav("home")}
          </Link>
          <Link
            href="/apartments"
            className="min-h-11 inline-flex items-center text-fg"
          >
            {tNav("apartments")}
          </Link>
          <Link
            href="/contact"
            className="min-h-11 inline-flex items-center text-fg"
          >
            {tNav("contact")}
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted">
            {tNav("contact")}
          </p>
          <a
            href={contact.phoneTelHref}
            className="min-h-11 inline-flex items-center text-fg"
          >
            {tCta("call")}: {contact.phoneDisplay}
          </a>
          <a
            href={contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-center text-fg"
          >
            {tCta("zalo")}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="min-h-11 inline-flex items-center text-fg"
          >
            {contact.email}
          </a>
          <a
            href={contact.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 inline-flex items-start text-fg"
          >
            <span>
              {tContact("address")}: {contact.address}
            </span>
          </a>
        </div>
      </div>

      <div className="page-x border-t border-line py-5 text-xs text-muted">
        {t("rights", { year })}
      </div>
    </footer>
  );
}
