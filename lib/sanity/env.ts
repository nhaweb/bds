export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";

export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export const sanityApiVersion = "2025-01-01";

/** True when a real project id is configured (not empty / placeholder). */
export function hasSanityProject(): boolean {
  return Boolean(
    sanityProjectId &&
      sanityProjectId !== "pmlplaceholder" &&
      sanityProjectId !== "placeholder",
  );
}
