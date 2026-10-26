import { defineField, defineType } from "sanity";

/**
 * Field-level i18n (vi / en) — preferred for this site size.
 * Shared apartment slugs stay outside locale objects.
 */

export const localeString = defineType({
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: [
    defineField({ name: "vi", title: "Tiếng Việt", type: "string" }),
    defineField({ name: "en", title: "English", type: "string" }),
  ],
});

export const localeText = defineType({
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: [
    defineField({ name: "vi", title: "Tiếng Việt", type: "text", rows: 4 }),
    defineField({ name: "en", title: "English", type: "text", rows: 4 }),
  ],
});

export const localeBlock = defineType({
  name: "localeBlock",
  title: "Localized rich text",
  type: "object",
  fields: [
    defineField({
      name: "vi",
      title: "Tiếng Việt",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "en",
      title: "English",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
