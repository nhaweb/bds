import type { PortableTextBlock } from "@portabletext/types";

export type AppLocale = "vi" | "en";

export type LocaleString = {
  vi?: string;
  en?: string;
};

export type LocaleText = LocaleString;

export type LocaleBlock = {
  vi?: PortableTextBlock[];
  en?: PortableTextBlock[];
};

export type ApartmentStatus = "available" | "reserved" | "sold";

/** Image as returned from GROQ or mirrored in fallback fixtures. */
export type CmsImage = {
  alt?: LocaleString;
  /** Sanity asset; prefer resolving via `urlForImage`. */
  asset?: { _ref: string; _type?: string };
  /** Pre-resolved URL used by offline fixtures (Unsplash etc.). */
  url?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type AmenityDoc = {
  _id: string;
  title: LocaleString;
  icon?: string;
};

export type ApartmentSpecs = {
  bedrooms?: number;
  bathrooms?: number;
  areaM2?: number;
  floor?: string;
};

export type ApartmentListItem = {
  _id: string;
  title: LocaleString;
  slug: string;
  status: ApartmentStatus;
  location?: LocaleString;
  priceLabel?: LocaleString;
  summary?: LocaleText;
  specs?: ApartmentSpecs;
  heroImage?: CmsImage | null;
  featured?: boolean;
  order?: number;
};

/** Room / area photo group for the photos detail page. */
export type ApartmentRoom = {
  _key: string;
  title: LocaleString;
  description?: LocaleText;
  images?: CmsImage[];
};

export type ApartmentDetail = ApartmentListItem & {
  amenities?: AmenityDoc[];
  /** Flat preview images for the mosaic on the residence page. */
  gallery?: CmsImage[];
  /** Room-by-room photo stories (VIEW PHOTOS destination). */
  rooms?: ApartmentRoom[];
  body?: LocaleBlock;
};

export type SiteSettings = {
  brandName: LocaleString;
  phone?: string;
  phoneE164?: string;
  zaloUrl?: string;
  email?: string;
  address?: LocaleString;
  socials?: { network?: string; url?: string }[];
  seo?: {
    title?: LocaleString;
    description?: LocaleText;
    ogImage?: CmsImage | null;
  };
};

export type HomePage = {
  hero?: {
    headline?: LocaleString;
    subcopy?: LocaleText;
    image?: CmsImage | null;
    ctaTarget?: "contact" | "apartments";
  };
  intro?: {
    title?: LocaleString;
    body?: LocaleText;
  };
  featuredApartments?: ApartmentListItem[];
  galleryTitle?: LocaleString;
  gallery?: CmsImage[];
  amenitiesIntro?: {
    title?: LocaleString;
    body?: LocaleText;
  };
  amenities?: AmenityDoc[];
};

export type ContactInfo = {
  brand: string;
  phoneDisplay: string;
  phoneE164: string;
  phoneTelHref: string;
  zaloUrl: string;
  email: string;
  address: string;
};
