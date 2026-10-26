import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "localeString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone (display)",
      type: "string",
      description: "e.g. 0908 985 844",
    }),
    defineField({
      name: "phoneE164",
      title: "Phone (E.164)",
      type: "string",
      description: "e.g. +84908985844 for tel: links",
    }),
    defineField({
      name: "zaloUrl",
      title: "Zalo URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (r) => r.email(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "localeString",
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "network",
              type: "string",
              title: "Network",
            }),
            defineField({ name: "url", type: "url", title: "URL" }),
          ],
          preview: {
            select: { title: "network", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "localeString", title: "Title" }),
        defineField({
          name: "description",
          type: "localeText",
          title: "Description",
        }),
        defineField({
          name: "ogImage",
          type: "image",
          title: "OG image",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "brandName.vi" },
    prepare: ({ title }) => ({ title: title || "Site settings" }),
  },
});
