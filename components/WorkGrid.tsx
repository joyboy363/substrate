"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CaseStudyEntry } from "@/lib/kv";

export default function WorkGrid({
  title,
  caseStudies,
}: {
  title: string;
  caseStudies: CaseStudyEntry[];
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-14"
      >
        <h2 className="text-glow-black font-serif text-4xl text-white md:text-5xl">
          {title}
        </h2>
        <div className="mt-4 h-px w-24 bg-white/30" />
      </motion.div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
      {caseStudies.map((project, index) => (
        <motion.a
          key={project.id}
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
          className="group block"
        >
          <div className="relative aspect-[4/3] w-full">
            <div className="absolute inset-0 overflow-hidden bg-charcoal/5">
              {/*
                Live scaled preview of the project's hero — a lightweight stand-in
                for a real screenshot. Swap for a static image asset if the site
                changes or loads slowly.
              */}
              <iframe
                src={project.href}
                title={project.name}
                loading="lazy"
                tabIndex={-1}
                scrolling="no"
                className="pointer-events-none absolute left-0 top-0 h-[300%] w-[300%] origin-top-left scale-[0.3333] overflow-hidden border-0 grayscale transition-all duration-500 group-hover:grayscale-0"
              />
              {/*
                Transparent overlay above the iframe. An embedded page renders
                in its own compositor layer, so the browser can show ITS
                cursor at that pixel even with pointer-events-none set above —
                this catches the hover for cursor purposes while still letting
                clicks bubble up to the wrapping <a>.
              */}
              <div className="absolute inset-0 cursor-pointer" />
            </div>
            {/* Ornate frame overlay, sized/positioned to hug this card exactly */}
            <Image
              src="/frame.png"
              alt=""
              fill
              className="pointer-events-none absolute inset-0 object-fill"
              style={{ transform: "translateX(-24px) scale(1.56, 1.16)" }}
            />
          </div>
          <h3 className="text-glow-black mt-12 font-serif text-2xl text-white">
            {project.name}
          </h3>
          <p className="text-glow-black mt-2 text-white/70">{project.result}</p>
        </motion.a>
      ))}
      </div>
    </>
  );
}
