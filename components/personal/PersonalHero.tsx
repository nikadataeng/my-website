"use client";

import { motion } from "framer-motion";

const springEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PersonalHero() {
  return (
    <section
      className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl w-full mx-auto">
        <div className="overflow-hidden">
          <motion.h1
            className="text-hero"
            style={{ lineHeight: 0.95, color: "var(--color-ink)" }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            Hi, I&apos;m{" "}
            <span style={{ color: "var(--color-accent)" }}>Nika.</span>
          </motion.h1>
        </div>

        <motion.p
          className="mt-8 text-label"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: springEase, delay: 0.45 }}
        >
          AI engineer. Traveler. Curious human. Bay Area.
        </motion.p>
      </div>
    </section>
  );
}
