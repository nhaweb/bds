"use client";

import { useLocale, useTranslations } from "next-intl";
import { useId, useState, useTransition, type FormEvent } from "react";

type Props = {
  apartmentSlug?: string;
};

type Status = "idle" | "success" | "error" | "invalid" | "not_configured";

export function ContactForm({ apartmentSlug }: Props) {
  const t = useTranslations("contact.form");
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.reportValidity()) {
      setStatus("invalid");
      return;
    }

    const data = new FormData(form);

    startTransition(async () => {
      setStatus("idle");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: String(data.get("name") || "").trim(),
            email: String(data.get("email") || "").trim(),
            phone: String(data.get("phone") || "").trim() || undefined,
            message: String(data.get("message") || "").trim(),
            apartmentSlug: apartmentSlug || undefined,
            locale,
            website: String(data.get("website") || ""),
          }),
        });

        if (res.ok) {
          setStatus("success");
          form.reset();
          return;
        }

        let reason: string | undefined;
        try {
          const body = (await res.json()) as { reason?: string };
          reason = body.reason;
        } catch {
          reason = undefined;
        }

        if (res.status === 400) {
          setStatus("invalid");
          return;
        }
        if (res.status === 503 && reason === "not_configured") {
          setStatus("not_configured");
          return;
        }
        setStatus("error");
      } catch {
        setStatus("error");
      }
    });
  }

  const feedback =
    status === "success"
      ? t("success")
      : status === "invalid"
        ? t("invalid")
        : status === "not_configured"
          ? t("notConfigured")
          : status === "error"
            ? t("error")
            : null;

  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className="flex flex-col gap-4"
      noValidate
    >
      {apartmentSlug ? (
        <p className="text-sm text-muted">
          {tContact("apartmentRef")}:{" "}
          <span className="font-medium text-fg">{apartmentSlug}</span>
        </p>
      ) : null}

      {/* Honeypot — leave empty */}
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span>{t("name")}</span>
        <input
          name="name"
          required
          autoComplete="name"
          maxLength={120}
          className="min-h-11 border border-line bg-bg-elevated px-3 outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span>{t("email")}</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={160}
          className="min-h-11 border border-line bg-bg-elevated px-3 outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span>{t("phone")}</span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={40}
          className="min-h-11 border border-line bg-bg-elevated px-3 outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span>{t("message")}</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={2000}
          className="border border-line bg-bg-elevated px-3 py-3 outline-none focus:border-accent"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center bg-accent px-5 text-sm text-bg-elevated disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit")}
      </button>

      <div aria-live="polite" className="min-h-5">
        {feedback ? (
          <p
            className={`text-sm ${
              status === "success" ? "text-accent" : "text-red-800"
            }`}
            role={status === "success" ? "status" : "alert"}
          >
            {feedback}
          </p>
        ) : null}
      </div>
    </form>
  );
}
