"use client";

import { motion } from "framer-motion";
import { disciplines } from "@/lib/content";

export default function WhatWeBuild() {
  return (
    <section id="build" className="px-6 py-24 md:px-16 lg:px-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-glow mb-14 font-serif text-4xl text-white md:text-5xl"
      >
        What we build
      </motion.h2>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
        {disciplines.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
          >
            <span className="text-glow-gold font-serif text-2xl text-[#FFD700]">
              {item.numeral}.
            </span>
            <h3 className="text-glow mt-3 font-serif text-2xl text-white">
              {item.title}
            </h3>
            <p className="text-glow mt-3 text-white/70">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
