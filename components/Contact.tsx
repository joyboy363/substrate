"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { contact } from "@/lib/content";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">(
    "idle"
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setStatus("sent");
    form.reset();
  }

  return (
    <section id="contact" className="relative">
      {/*
        Background is bounded to this section's own scroll range via the
        sticky + negative-margin technique (same as the Work/WhatWeBuild
        video) — it fills the full viewport for exactly as long as this
        section is being scrolled through, then releases cleanly, so it
        can't bleed into neighboring sections the way a plain `fixed`
        background does.
      */}
      <div className="sticky top-0 -z-10 h-screen w-full">
        <Image src="/hand-logo.webp" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-charcoal/50" />
        {/* Softens the hard cut coming down from the section above */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div className="-mt-[100vh] flex min-h-[140vh] items-center px-6 py-24 md:px-16 lg:px-24">
      <div className="relative z-10 grid w-full grid-cols-1 gap-14 md:grid-cols-2 md:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center bg-charcoal/40 p-8 text-center"
        >
          <h2 className="text-glow mb-14 font-serif text-5xl text-white md:text-6xl">
            {contact.heading}
          </h2>
          <p className="text-glow max-w-sm text-xl text-white/80">
            {contact.copy}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="text-glow mt-6 inline-block text-lg text-white underline underline-offset-4"
          >
            {contact.email}
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="border-b border-white bg-transparent py-2 text-white outline-none placeholder:text-white focus:border-bronze"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="border-b border-white bg-transparent py-2 text-white outline-none placeholder:text-white focus:border-bronze"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="border-b border-white bg-transparent py-2 text-white outline-none placeholder:text-white focus:border-bronze"
          />
          <textarea
            name="project"
            placeholder="Project description"
            rows={4}
            required
            className="border-b border-white bg-transparent py-2 text-white outline-none placeholder:text-white focus:border-bronze"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 self-start border border-white px-8 py-3 text-sm uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-charcoal disabled:opacity-50"
          >
            {status === "sent"
              ? "Sent"
              : status === "submitting"
              ? "Sending..."
              : "Send"}
          </button>
        </motion.form>
      </div>
      </div>
    </section>
  );
}
