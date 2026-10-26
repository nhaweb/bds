import { createClient, type SanityClient } from "next-sanity";
import {
  hasSanityProject,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "./env";

let client: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!hasSanityProject()) return null;
  if (!client) {
    client = createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
      perspective: "published",
    });
  }
  return client;
}
