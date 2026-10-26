import { Suspense, type ReactNode } from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Be_Vietnam_Pro, Playfair } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeaderFallback } from "@/components/layout/HeaderFallback";
import { CursorDot } from "@/components/motion/CursorDot";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { routing } from "@/i18n/routing";
import { resolveContact } from "@/lib/sanity/contact";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { tLocale } from "@/lib/sanity/localize";
import type { AppLocale } from "@/lib/sanity/types";
import "../globals.css";

/**
 * Display: Playfair (Didot-like contrast + Vietnamese marks).
 * Body: Be Vietnam Pro — designed for Vietnamese, keeps bold hero line clean.
 */
const display = Playfair({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-display-loaded",
  display: "swap",
  // variable font + optical size (high contrast at hero sizes)
  axes: ["opsz"],
});

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body-loaded",
  display: "swap",
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = localeParam as AppLocale;
  const settings = await getSiteSettings();
  const contact = resolveContact(settings, locale);
  const description =
    tLocale(settings.seo?.description, locale) ||
    (locale === "vi"
      ? "Tham khảo căn hộ và liên hệ PML Resort."
      : "Browse apartments and contact PML Resort.");

  return {
    title: {
      default: tLocale(settings.seo?.title, locale, contact.brand),
      template: `%s · ${contact.brand}`,
    },
    description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!hasLocale(routing.locales, localeParam)) {
    notFound();
  }

  const locale = (await getLocale()) as AppLocale;
  const messages = await getMessages();
  const settings = await getSiteSettings();
  const contact = resolveContact(settings, locale);

  return (
    <html
      lang={locale}
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        <NextIntlClientProvider messages={messages}>
          <LenisProvider>
            <CursorDot />
            <Suspense fallback={<HeaderFallback brand={contact.brand} />}>
              <Header contact={contact} />
            </Suspense>
            {children}
            <Footer />
          </LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
