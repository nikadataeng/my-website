"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "10", label: "countries visited" },
  { value: "2",  label: "cats in charge" },
  { value: "∞",  label: "tabs open" },
];

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PersonalHero() {
  return (
    <section
      className="min-h-[100dvh] flex flex-col px-6 md:px-12 lg:px-20 pt-24 pb-10"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">

        {/* ── Masthead strip ── */}
        <motion.div
          className="flex items-center justify-between pb-5 mb-14"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            The Nika Issue
          </span>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            Vol.&nbsp;I &nbsp;·&nbsp; Spring 2026
          </span>
        </motion.div>

        {/* ── Main hero ── */}
        <div className="flex-1 flex flex-col justify-between gap-16">

          {/* Name + descriptors */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0">

            {/* Big name — takes 8 cols */}
            <div className="lg:col-span-8">
              <motion.h1
                className="text-hero"
                style={{ lineHeight: 0.88 }}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
              >
                Nika
                <span style={{ color: "var(--color-accent)" }}>.</span>
              </motion.h1>
            </div>

            {/* Descriptors — takes 4 cols, bottom-aligned */}
            <motion.div
              className="lg:col-span-4 flex items-end"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.5 }}
            >
              <div
                style={{
                  borderLeft: `2px solid var(--color-accent)`,
                  paddingLeft: "1.25rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(16px, 1.8vw, 22px)",
                    color: "var(--color-ink)",
                    lineHeight: 1.6,
                  }}
                >
                  AI engineer.<br />
                  Space nerd.<br />
                  Chronically online.<br />
                  Cat mom x2.
                </p>
                <p
                  className="text-label mt-5"
                  style={{ color: "var(--color-muted)" }}
                >
                  Bay Area, CA
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Stats strip ── */}
          <motion.div
            className="pt-8 grid grid-cols-3 md:flex md:gap-16"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {stats.map(({ value, label }) => (
              <div key={label}>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(36px, 4vw, 56px)",
                    color: "var(--color-accent)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p className="text-label mt-1" style={{ color: "var(--color-muted)" }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
