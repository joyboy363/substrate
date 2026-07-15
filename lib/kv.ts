import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

const kv = Redis.fromEnv();

export type CaseStudyEntry = {
  id: string;
  name: string;
  href: string;
  result: string;
};

const KV_KEY = "substrate:case-studies";

const seedCaseStudies: CaseStudyEntry[] = [
  {
    id: "seed-rumba",
    name: "Rumba Yacht Rentals",
    href: "https://rumba-yacht.vercel.app",
    result:
      "Cinematic booking experience for a Toronto-based yacht charter operator.",
  },
];

export async function getCaseStudies(): Promise<CaseStudyEntry[]> {
  try {
    const existing = await kv.get<CaseStudyEntry[]>(KV_KEY);
    if (existing) return existing;
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
