import { getTranslations } from "next-intl/server";
import type { ContactInfo } from "@/lib/sanity/types";

type Props = {
  contact: ContactInfo & { mapsHref: string };
};

export async function ContactChannels({ contact }: Props) {
  const t = await getTranslations("contact");
  const tCta = await getTranslations("cta");

  return (
    <ul className="flex flex-col gap-1 text-sm">
      <li>
        <a
          href={contact.phoneTelHref}
          className="inline-flex min-h-11 w-full items-center gap-3"
        >
          <span className="w-20 shrink-0 text-muted">{t("hotline")}</span>
          <span>{contact.phoneDisplay}</span>
        </a>
      </li>
      <li>
        <a
          href={contact.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-center gap-3"
        >
          <span className="w-20 shrink-0 text-muted">{t("zalo")}</span>
          <span>{tCta("zalo")}</span>
        </a>
      </li>
      <li>
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex min-h-11 w-full items-center gap-3"
        >
          <span className="w-20 shrink-0 text-muted">{t("email")}</span>
          <span>{contact.email}</span>
        </a>
      </li>
      <li>
        <a
          href={contact.mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 w-full items-start gap-3 py-3"
        >
          <span className="w-20 shrink-0 text-muted">{t("address")}</span>
          <span>
            {contact.address}
            <span className="mt-1 block text-muted underline underline-offset-2">
              {t("openMaps")}
            </span>
          </span>
        </a>
      </li>
    </ul>
  );
}
