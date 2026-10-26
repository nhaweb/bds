import { groq } from "next-sanity";

const imageFields = /* groq */ `
  asset,
  hotspot,
  crop,
  alt
`;

const apartmentCardFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  status,
  location,
  priceLabel,
  summary,
  specs,
  featured,
  order,
  heroImage { ${imageFields} }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    brandName,
    phone,
    phoneE164,
    zaloUrl,
    email,
    address,
    socials,
    seo {
      title,
      description,
      ogImage { ${imageFields} }
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0]{
    hero {
      headline,
      subcopy,
      ctaTarget,
      image { ${imageFields} }
    },
    intro,
    galleryTitle,
    gallery[] { ${imageFields} },
    amenitiesIntro,
    "featuredApartments": featuredApartments[]->{ ${apartmentCardFields} },
    "amenities": amenities[]->{
      _id,
      title,
      icon
    }
  }
`;

export const apartmentsListQuery = groq`
  *[_type == "apartment"] | order(order asc, title.vi asc) {
    ${apartmentCardFields}
  }
`;

export const apartmentBySlugQuery = groq`
  *[_type == "apartment" && slug.current == $slug][0]{
    ${apartmentCardFields},
    body,
    gallery[] { ${imageFields} },
    rooms[] {
      _key,
      title,
      description,
      images[] { ${imageFields} }
    },
    "amenities": amenities[]->{
      _id,
      title,
      icon
    }
  }
`;

export const apartmentSlugsQuery = groq`
  *[_type == "apartment" && defined(slug.current)].slug.current
`;
