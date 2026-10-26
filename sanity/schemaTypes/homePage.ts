import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "headline",
          type: "localeString",
          title: "Headline",
        }),
        defineField({
          name: "subcopy",
          type: "localeText",
          title: "Supporting sentence",
        }),
        defineField({
          name: "image",
          type: "image",
          title: "Background image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "localeString",
              title: "Alt text",
            }),
          ],
        }),
        defineField({
          name: "ctaTarget",
          title: "Primary CTA target",
          type: "string",
          options: {
            list: [
              { title: "Contact", value: "contact" },
              { title: "Apartments", value: "apartments" },
            ],
            layout: "radio",
          },
          initialValue: "contact",
        }),
      ],
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "object",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "body", type: "localeText", title: "Body" }),
      ],
    }),
    defineField({
      name: "featuredApartments",
      title: "Featured apartments",
      type: "array",
      of: [{ type: "reference", to: [{ type: "apartment" }] }],
    }),
    defineField({
      name: "galleryTitle",
      title: "Gallery title",
      type: "localeString",
    }),
    defineField({
      name: "gallery",
      title: "Home gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              type: "localeString",
              title: "Alt text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "amenitiesIntro",
      title: "Amenities intro",
      type: "object",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({ name: "body", type: "localeText", title: "Body" }),
      ],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home page" }),
  },
});
