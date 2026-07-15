"use client";

import { motion } from "framer-motion";
import { process } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="px-6 py-24 md:px-16 lg:px-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-glow mb-14 font-serif text-4xl text-white md:text-5xl"
      >
        How we work
      </motion.h2>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
        {process.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
            className="border-t border-white/20 pt-5"
          >
            <span className="text-glow-gold font-serif text-xl text-[#FFD700]">
              {step.numeral}.
            </span>
            <h3 className="text-glow mt-2 font-serif text-xl text-white">
              {step.title}
            </h3>
            <p className="text-glow mt-2 text-sm text-white/70">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
