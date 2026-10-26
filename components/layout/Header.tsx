"use client";

import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/components/motion/usePrefersReducedMotion";
import { Link, usePathname } from "@/i18n/navigation";
import type { ContactInfo } from "@/lib/sanity/types";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV = [
  { href: "/" as const, key: "home" as const },
  { href: "/apartments" as const, key: "apartments" as const },
  { href: "/contact" as const, key: "contact" as const },
];

const easeOut = [0.22, 1, 0.36, 1] as const;
const easeIn = [0.4, 0, 1, 1] as const;

type Props = {
  contact: ContactInfo;
};

/** Nueve-quiet chrome: wordmark + locale + circular menu. */
export function Header({ contact }: Props) {
  const t = useTranslations("nav");
  const tCta = useTranslations("cta");
  const tA11y = useTranslations("a11y");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  const shortBrand =
    contact.brand.replace(/\s*Resort\s*/i, "").trim().toLowerCase() || "pml";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [open, lenis]);

  const panelTransition =
    reduced === true
      ? { duration: 0.01 }
      : { duration: 0.85, ease: open ? easeOut : easeIn };

  const panelVariants =
    reduced === true
      ? {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
      : {
          hidden: { y: "-100%" },
          visible: { y: 0 },
        };

  return (
    <header className="fixed top-0 right-0 left-0 z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2 focus:text-sm"
      >
        {tA11y("skipToContent")}
      </a>

      <div className="page-x relative z-[60] flex min-h-16 items-center justify-between gap-4 py-4 md:min-h-[4.5rem]">
        <Link
          href="/"
          className={`font-body text-[clamp(1.35rem,2.2vw,1.7rem)] font-bold tracking-[-0.04em] transition-colors ${
            open ? "text-bg" : "text-fg"
          }`}
        >
          {shortBrand}.
          <sup className="ml-0.5 align-super text-[0.55em] font-semibold tracking-normal opacity-55">
            9
          </sup>
        </Link>

        <div className="flex items-center gap-2 md:gap-3">
          <div className={open ? "opacity-0 pointer-events-none" : ""}>
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-105 ${
              open ? "bg-bg text-fg" : "bg-fg text-bg"
            }`}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">
              {open ? t("closeMenu") : t("openMenu")}
            </span>
            <span aria-hidden className="relative block h-3 w-4">
              <span
                className={`absolute top-0 left-0 block h-px w-4 origin-center transition duration-300 ${
                  open ? "translate-y-[5.5px] rotate-45 bg-fg" : "bg-bg"
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-px w-4 origin-center transition duration-300 ${
                  open
                    ? "-translate-y-[5.5px] -rotate-45 bg-fg"
                    : "bg-bg"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            key="nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label={t("openMenu")}
            className="fixed inset-0 z-50 flex flex-col bg-fg text-bg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={panelVariants}
            transition={panelTransition}
          >
            {/* Spacer matching chrome height so links sit below the fixed bar */}
            <div className="min-h-16 shrink-0 md:min-h-[4.5rem]" aria-hidden />

            <nav
              className="page-x flex flex-1 flex-col gap-1 pt-10 md:pt-16"
              aria-label={t("home")}
            >
              {NAV.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={
                      reduced === true
                        ? { opacity: 0 }
                        : { opacity: 0, y: -28 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={
                      reduced === true
                        ? { duration: 0.01 }
                        : {
                            delay: 0.28 + index * 0.1,
                            duration: 0.65,
                            ease: easeOut,
                          }
                    }
                  >
                    <Link
                      href={item.href}
                      className={`font-display block text-[clamp(3.5rem,12vw,6.25rem)] leading-[1.05] font-light tracking-tight transition-opacity ${
                        active
                          ? "opacity-100"
                          : "opacity-45 hover:opacity-100"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {t(item.key).toUpperCase()}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              className="page-x flex flex-col items-end gap-2 pb-10 text-sm opacity-70 md:pb-14"
              initial={reduced === true ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={
                reduced === true
                  ? { duration: 0.01 }
                  : { delay: 0.55, duration: 0.55, ease: easeOut }
              }
            >
              <a href={contact.phoneTelHref}>{tCta("call")}</a>
              <a
                href={contact.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {tCta("zalo")}
              </a>
              <Link href="/contact" onClick={() => setOpen(false)}>
                {tCta("contact")}
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
