import { NextResponse } from "next/server";
import { contactPayloadSchema } from "@/lib/contact/schema";
import { sendInquiryEmail } from "@/lib/contact/send";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const payload = parsed.data;

  // Honeypot filled → pretend success (do not email)
  if (payload.website) {
    return NextResponse.json({ ok: true });
  }

  const result = await sendInquiryEmail(payload);

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  if (result.reason === "not_configured") {
    // Soft failure for local/dev without keys — no secrets leaked
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: false }, { status: 500 });
}

export function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}
