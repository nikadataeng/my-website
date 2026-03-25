"use client";

import { motion } from "framer-motion";

/* Rotating text circle ─────────────────────────────────────── */
function RotatingCircle() {
  const text = "BUILDING · VANTAGE · AT · SIGMA · COMPUTING · ";

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-10 right-8 md:bottom-14 md:right-14 w-36 h-36 hidden sm:block"
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <path
            id="circle-path"
            d="M 80,80 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
          />
        </defs>
        <text
          style={{
            fontSize: "11px",
            fontWeight: 300,
            letterSpacing: "0.1em",
            fill: "var(--color-muted)",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#circle-path">{text}</textPath>
        </text>
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const springEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Line 1: "I build AI systems" — clip-path reveal */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-hero"
            style={{ lineHeight: 0.95 }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            I build AI systems
          </motion.h1>
        </div>

        {/* Line 2: "that replace SaaS." — clip-path reveal, delayed */}
        <div className="overflow-hidden" style={{ marginTop: "0.05em" }}>
          <motion.h1
            className="text-hero"
            style={{ lineHeight: 0.95 }}
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 0.6, ease: "easeInOut", delay: 0.12 }}
          >
            <span style={{ color: "var(--color-accent)" }}>that replace SaaS</span>
            <span style={{ color: "var(--color-ink)" }}>.</span>
          </motion.h1>
        </div>

        {/* Subline 1 */}
        <motion.p
          className="mt-8 text-label"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: springEase, delay: 0.5 }}
        >
          AI Applications Engineer at Sigma Computing · San Francisco
        </motion.p>

        {/* Subline 2 */}
        <motion.p
          className="text-label mt-1"
          style={{ color: "var(--color-muted)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: springEase, delay: 0.6 }}
        >
          Currently: replacing Salesforce with internal AI tooling
        </motion.p>
      </div>

      {/* Rotating text circle */}
      <RotatingCircle />
    </section>
  );
}
