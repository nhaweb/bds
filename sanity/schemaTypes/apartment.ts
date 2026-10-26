import { defineField, defineType } from "sanity";

export const apartment = defineType({
  name: "apartment",
  title: "Apartment",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Shared across vi/en.",
      options: { source: "title.vi", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Reserved", value: "reserved" },
          { title: "Sold", value: "sold" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "localeString",
    }),
    defineField({
      name: "priceLabel",
      title: "Price label",
      type: "localeString",
      description: "Display-only (e.g. Liên hệ / Contact for price). Not a checkout amount.",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "localeText",
    }),
    defineField({
      name: "specs",
      title: "Specs",
      type: "object",
      fields: [
        defineField({ name: "bedrooms", type: "number", title: "Bedrooms" }),
        defineField({ name: "bathrooms", type: "number", title: "Bathrooms" }),
        defineField({ name: "areaM2", type: "number", title: "Area (m²)" }),
        defineField({ name: "floor", type: "string", title: "Floor" }),
      ],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "localeString",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery preview",
      description: "Mosaic on the residence page (featured + 2×2).",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "localeString",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "rooms",
      title: "Rooms (photo stories)",
      description: "Room-by-room detail opened from VIEW PHOTOS.",
      type: "array",
      of: [
        {
          type: "object",
          name: "room",
          fields: [
            defineField({
              name: "title",
              title: "Room title",
              type: "localeString",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "localeText",
            }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    defineField({
                      name: "alt",
                      title: "Alt text",
                      type: "localeString",
                    }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title.vi", media: "images.0" },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "localeBlock",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [
        { field: "order", direction: "asc" },
        { field: "title.vi", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title.vi",
      subtitle: "status",
      media: "heroImage",
    },
  },
});
