import { defineField, defineType } from "sanity";

export const amenity = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon key",
      type: "string",
      description: "UI maps this key to an icon (e.g. pool, gym, parking).",
    }),
  ],
  preview: {
    select: { title: "title.vi", subtitle: "icon" },
  },
});
