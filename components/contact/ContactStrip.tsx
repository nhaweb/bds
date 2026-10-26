import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionReveal } from "@/components/motion/SectionReveal";
import type { ContactInfo } from "@/lib/sanity/types";

type Props = {
  title: string;
  body: string;
  contact: ContactInfo;
};

export async function ContactStrip({ title, body, contact }: Props) {
  const t = await getTranslations("home");
  const tCta = await getTranslations("cta");

  return (
    <section className="border-t border-line">
      <SectionReveal className="page-x section-y mx-auto flex w-full max-w-[90rem] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div data-reveal className="max-w-xl">
          <h2 className="font-display text-[length:var(--type-title)] leading-[0.9] font-semibold tracking-tight">
            {title || t("contactTitle")}
          </h2>
          <p className="mt-4 text-muted">{body || t("contactBody")}</p>
        </div>
        <div data-reveal className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-fg px-6 text-sm text-bg"
          >
            {tCta("contact")}
          </Link>
          <a
            href={contact.phoneTelHref}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-fg/30 px-6 text-sm"
          >
            {tCta("call")}
          </a>
          <a
            href={contact.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-fg/30 px-6 text-sm"
          >
            {tCta("zalo")}
          </a>
        </div>
      </SectionReveal>
    </section>
  );
}
