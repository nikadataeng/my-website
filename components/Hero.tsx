"use client";

/**
 * Hero — main landing section.
 */

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-20"
      style={{
        paddingTop: "clamp(48px, 8vh, 100px)",
        paddingBottom: "clamp(48px, 8vh, 100px)",
      }}
    >
      <div className="max-w-6xl w-full mx-auto relative">
        {/* Headshot — corner accent */}
        <motion.div
          className="static md:absolute md:top-0 md:right-0 mb-8 md:mb-0"
          style={{
            width: "clamp(160px, 14vw, 210px)",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            backgroundImage: "url(/images/headshot.png)",
            backgroundSize: "145%",
            backgroundPosition: "center 12%",
            backgroundRepeat: "no-repeat",
            boxShadow: "0 20px 50px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
          }}
          aria-label="Photo of Ayonika Bose"
          role="img"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        />

        <div className="md:pr-[240px]">
          {/* Name + role intro */}
          <motion.p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              fontWeight: 500,
              color: "var(--color-muted)",
              margin: "0 0 clamp(24px, 4vh, 48px)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Ayonika Bose — AI Applications Engineer
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-hero"
            style={{ margin: 0 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            I build the AI that runs GTM.
          </motion.h1>

          {/* Subline */}
          <motion.p
            className="text-label"
            style={{ color: "var(--color-muted)", marginTop: "clamp(24px, 4vh, 40px)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
          >
            AI Applications Engineer at Sigma Computing · San Francisco
          </motion.p>

          {/* CTA link */}
          <motion.a
            href="#work"
            className="text-sm font-medium link-underline"
            style={{ color: "var(--color-accent)", display: "inline-block", marginTop: "1.5rem" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.38 }}
          >
            See what I&apos;ve built ›
          </motion.a>
        </div>
      </div>
    </section>
  );
}
