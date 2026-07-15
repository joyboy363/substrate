"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { CaseStudyEntry } from "@/lib/kv";

export default function Dashboard({
  secret,
  initialCaseStudies,
}: {
  secret: string;
  initialCaseStudies: CaseStudyEntry[];
}) {
  const router = useRouter();
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/admin/case-studies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok) {
      setCaseStudies(json.caseStudies);
      form.reset();
    } else {
      setError(json.error ?? "Something went wrong.");
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    const res = await fetch("/api/admin/case-studies", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    if (res.ok) {
      setCaseStudies(json.caseStudies);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(`/admin/${secret}`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background px-6 py-16 text-charcoal md:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-3xl">Selected Work</h1>
          <button
            onClick={handleLogout}
            className="text-sm uppercase tracking-[0.1em] text-charcoal/60 underline underline-offset-4"
          >
            Log out
          </button>
        </div>

        <form
          onSubmit={handleAdd}
          className="mt-10 flex flex-col gap-4 border-b border-charcoal/20 pb-10"
        >
          <input
            type="text"
            name="name"
            placeholder="Business name"
            required
            className="border-b border-charcoal/30 bg-transparent py-2 outline-none placeholder:text-charcoal/40 focus:border-bronze"
          />
          <input
            type="url"
            name="href"
            placeholder="https://example.com"
            required
            className="border-b border-charcoal/30 bg-transparent py-2 outline-none placeholder:text-charcoal/40 focus:border-bronze"
          />
          <textarea
            name="result"
            placeholder="Brief description"
            rows={2}
            required
            className="border-b border-charcoal/30 bg-transparent py-2 outline-none placeholder:text-charcoal/40 focus:border-bronze"
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 self-start border border-bronze px-8 py-3 text-sm uppercase tracking-[0.1em] text-bronze transition-colors hover:bg-bronze hover:text-background disabled:opacity-50"
          >
            {submitting ? "Adding..." : "Add square"}
          </button>
        </form>

        <ul className="mt-10 flex flex-col gap-6">
          {caseStudies.map((entry) => (
            <li
              key={entry.id}
              className="flex items-start justify-between gap-4 border-b border-charcoal/10 pb-6"
            >
              <div>
                <h3 className="font-serif text-xl">{entry.name}</h3>
                <p className="mt-1 text-sm text-charcoal/60">{entry.href}</p>
                <p className="mt-1 text-charcoal/80">{entry.result}</p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="shrink-0 text-sm uppercase tracking-[0.1em] text-red-700 underline underline-offset-4"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
