"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Props = {
  slug: string;
  title: string;
  phoneTelHref: string;
  zaloUrl: string;
};

export function InquiryBar({ slug, title, phoneTelHref, zaloUrl }: Props) {
  const t = useTranslations("apartments");
  const tCta = useTranslations("cta");

  return (
    <section className="page-x section-y">
      <div className="mx-auto flex max-w-[90rem] flex-col items-center gap-8 text-center md:gap-10">
        <p className="max-w-md text-muted">
          {t("inquiryCta")}
          <span className="sr-only"> {title}</span>
        </p>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href={`/contact?apartment=${encodeURIComponent(slug)}`}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-fg px-8 text-sm text-bg transition hover:opacity-90"
          >
            {tCta("contact")}
          </Link>
          <a
            href={phoneTelHref}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-fg/25 px-8 text-sm transition hover:border-fg"
          >
            {tCta("call")}
          </a>
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-fg/25 px-8 text-sm transition hover:border-fg"
          >
            {tCta("zalo")}
          </a>
        </div>
      </div>

      {/* Mobile sticky strip */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
        <div className="page-x flex gap-2 py-3">
          <Link
            href={`/contact?apartment=${encodeURIComponent(slug)}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-fg text-sm text-bg"
          >
            {tCta("contact")}
          </Link>
          <a
            href={phoneTelHref}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line text-sm"
          >
            {tCta("call")}
          </a>
          <a
            href={zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-line text-sm"
          >
            {tCta("zalo")}
          </a>
        </div>
      </div>
    </section>
  );
}
