import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { getSanityClient } from "./client";
import { sanityDataset, sanityProjectId } from "./env";
import type { CmsImage } from "./types";

function getBuilder() {
  const client = getSanityClient();
  if (client) return createImageUrlBuilder(client);
  if (sanityProjectId) {
    return createImageUrlBuilder({
      projectId: sanityProjectId,
      dataset: sanityDataset,
    });
  }
  return null;
}

/**
 * Resolve a CMS image to a URL.
 * Fixtures may set `url` directly; Sanity images use the image pipeline.
 */
export function urlForImage(
  source: CmsImage | null | undefined,
  opts: { width: number; height?: number; quality?: number } = { width: 1200 },
): string | null {
  if (!source) return null;
  if (source.url) return source.url;

  const b = getBuilder();
  if (!b || !source.asset) return null;

  let img = b
    .image(source as SanityImageSource)
    .width(opts.width)
    .quality(opts.quality ?? 80);
  if (opts.height) img = img.height(opts.height);
  return img.url() || null;
}

export function imageAlt(
  source: CmsImage | null | undefined,
  locale: "vi" | "en",
  fallback = "",
): string {
  if (!source?.alt) return fallback;
  return source.alt[locale] || source.alt.vi || source.alt.en || fallback;
}
