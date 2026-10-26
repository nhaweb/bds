import { Resend } from "resend";
import type { ContactPayload } from "./schema";

const DEFAULT_TO = "pmluanvn@gmail.com";
const DEFAULT_FROM = "PML Resort <onboarding@resend.dev>";

export type SendInquiryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "send_failed" };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function buildSubject(payload: ContactPayload): string {
  const parts = ["PML Resort inquiry"];
  if (payload.apartmentSlug) parts.push(`· ${payload.apartmentSlug}`);
  if (payload.locale) parts.push(`· ${payload.locale}`);
  return parts.join(" ");
}

function buildText(payload: ContactPayload): string {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.apartmentSlug ? `Apartment: ${payload.apartmentSlug}` : null,
    payload.locale ? `Locale: ${payload.locale}` : null,
    "",
    payload.message,
  ]
    .filter((line): line is string => line != null)
    .join("\n");
}

function buildHtml(payload: ContactPayload): string {
  const rows: [string, string][] = [
    ["Name", payload.name],
    ["Email", payload.email],
  ];
  if (payload.phone) rows.push(["Phone", payload.phone]);
  if (payload.apartmentSlug) rows.push(["Apartment", payload.apartmentSlug]);
  if (payload.locale) rows.push(["Locale", payload.locale]);

  const meta = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#5a6358;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#1a1f1a">
      <p style="margin:0 0 16px"><strong>New inquiry — PML Resort</strong></p>
      <table style="border-collapse:collapse;margin:0 0 20px">${meta}</table>
      <p style="margin:0 0 8px;color:#5a6358">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
    </div>
  `.trim();
}

/**
 * Send inquiry email via Resend. Never throw Resend/API details to callers.
 */
export async function sendInquiryEmail(
  payload: ContactPayload,
): Promise<SendInquiryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY missing — inquiry not emailed");
    return { ok: false, reason: "not_configured" };
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject: buildSubject(payload),
      text: buildText(payload),
      html: buildHtml(payload),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return { ok: false, reason: "send_failed" };
    }

    return { ok: true };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { ok: false, reason: "send_failed" };
  }
}
