import { z } from "zod";

const emptyToUndefined = (value: string | undefined) => {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : undefined;
};

export const contactPayloadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(160),
  phone: z
    .string()
    .max(40)
    .optional()
    .transform((v) => emptyToUndefined(v)),
  message: z.string().trim().min(1).max(2000),
  apartmentSlug: z
    .string()
    .max(96)
    .optional()
    .transform((v) => emptyToUndefined(v)),
  locale: z.enum(["vi", "en"]).optional(),
  /** Honeypot — bots fill this; humans leave empty */
  website: z.string().max(200).optional().default(""),
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;
