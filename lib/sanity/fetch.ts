import { cache } from "react";
import { getSanityClient } from "./client";
import { hasSanityProject } from "./env";
import {
  fallbackApartmentCards,
  fallbackApartments,
  fallbackHomePage,
  fallbackSiteSettings,
} from "./fallback";
import {
  apartmentBySlugQuery,
  apartmentSlugsQuery,
  apartmentsListQuery,
  homePageQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  ApartmentDetail,
  ApartmentListItem,
  HomePage,
  SiteSettings,
} from "./types";

async function fetchOrNull<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!hasSanityProject()) return null;
  const client = getSanityClient();
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params);
  } catch (err) {
    console.warn("[sanity] fetch failed, using fallback fixtures", err);
    return null;
  }
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const data = await fetchOrNull<SiteSettings>(siteSettingsQuery);
  return data ?? fallbackSiteSettings;
});

export const getHomePage = cache(async (): Promise<HomePage> => {
  const data = await fetchOrNull<HomePage>(homePageQuery);
  if (!data) return fallbackHomePage;
  return {
    ...fallbackHomePage,
    ...data,
    featuredApartments:
      data.featuredApartments?.length
        ? data.featuredApartments
        : fallbackHomePage.featuredApartments,
    gallery: data.gallery?.length ? data.gallery : fallbackHomePage.gallery,
    amenities: data.amenities?.length
      ? data.amenities
      : fallbackHomePage.amenities,
  };
});

export const getApartments = cache(async (): Promise<ApartmentListItem[]> => {
  const data = await fetchOrNull<ApartmentListItem[]>(apartmentsListQuery);
  return data?.length ? data : fallbackApartmentCards;
});

export const getApartmentBySlug = cache(
  async (slug: string): Promise<ApartmentDetail | null> => {
    const data = await fetchOrNull<ApartmentDetail>(apartmentBySlugQuery, {
      slug,
    });
    if (data) return data;
    return fallbackApartments.find((a) => a.slug === slug) ?? null;
  },
);

export const getApartmentSlugs = cache(async (): Promise<string[]> => {
  const data = await fetchOrNull<string[]>(apartmentSlugsQuery);
  if (data?.length) return data;
  return fallbackApartments.map((a) => a.slug);
});
