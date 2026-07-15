"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ secret }: { secret: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const password = new FormData(e.currentTarget).get("password");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(`/admin/${secret}/dashboard`);
      router.refresh();
    } else {
      setError("Incorrect password.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-charcoal">
      <h1 className="font-serif text-3xl">Admin</h1>
      <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xs flex-col gap-4">
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          autoFocus
          className="border-b border-charcoal/30 bg-transparent py-2 outline-none placeholder:text-charcoal/40 focus:border-bronze"
        />
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="mt-2 border border-bronze px-8 py-3 text-sm uppercase tracking-[0.1em] text-bronze transition-colors hover:bg-bronze hover:text-background disabled:opacity-50"
        >
          {submitting ? "Checking..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
