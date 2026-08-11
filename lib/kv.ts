import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

// Vercel's Upstash integration names these KV_REST_API_URL/TOKEN rather than
// the UPSTASH_REDIS_REST_URL/TOKEN names @upstash/redis's fromEnv() expects
// by default, so the client is built explicitly to match what's actually
// provisioned.
const kv = new Redis({
  url: process.env.KV_REST_API_URL ?? "",
  token: process.env.KV_REST_API_TOKEN ?? "",
});

export type CaseStudyCategory = "work" | "software";

export type CaseStudyEntry = {
  id: string;
  name: string;
  href: string;
  result: string;
  category: CaseStudyCategory;
};

const KV_KEY = "substrate:case-studies";

const seedCaseStudies: CaseStudyEntry[] = [
  {
    id: "seed-rumba",
    name: "Rumba Yacht Rentals",
    href: "https://rumba-yacht.vercel.app",
    result:
      "Cinematic booking experience for a Toronto-based yacht charter operator.",
    category: "work",
  },
];

export async function getCaseStudies(): Promise<CaseStudyEntry[]> {
  try {
    const existing = await kv.get<CaseStudyEntry[]>(KV_KEY);
    if (existing) {
      // Entries persisted before the "category" field existed don't have
      // one — treat them as "work" so they keep showing up where they
      // always did.
      return existing.map((entry) => ({
        ...entry,
        category: entry.category ?? "work",
      }));
    }
    await kv.set(KV_KEY, seedCaseStudies);
    return seedCaseStudies;
  } catch {
    // Upstash Redis isn't configured yet (see .env.local.example) — fall back
    // to the seed data so the site still renders during local setup.
    return seedCaseStudies;
  }
}

export async function addCaseStudy(
  entry: Omit<CaseStudyEntry, "id">
): Promise<CaseStudyEntry[]> {
  const list = await getCaseStudies();
  const next = [...list, { id: randomUUID(), ...entry }];
  await kv.set(KV_KEY, next);
  return next;
}

export async function deleteCaseStudy(id: string): Promise<CaseStudyEntry[]> {
  const list = await getCaseStudies();
  const next = list.filter((entry) => entry.id !== id);
  await kv.set(KV_KEY, next);
  return next;
}
