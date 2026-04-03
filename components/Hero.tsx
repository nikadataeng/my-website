"use client";

import { motion } from "framer-motion";

/* ─── Slack emoji reactions ─────────────────────────────────── */
const REACTIONS = [
  { emoji: "👀", count: 12 },
  { emoji: "🔥", count: 8 },
  { emoji: "💯", count: 6 },
  { emoji: "🙌", count: 5 },
  { emoji: "👆", count: 4 },
  { emoji: "🧠", count: 3 },
];

/**
 * Inline Slack message — built from actual Slack design specs:
 * - Font: Lato / system fallback (Slack uses Slack-Lato)
 * - Avatar: 36×36, border-radius 4px (Slack's signature rounded square)
 * - Username: 15px, weight 900
 * - Timestamp: 12px, weight 400, color #616061
 * - Body: 15px, weight 400, color #1d1c1d, line-height 1.46668
 * - Reactions: 24px tall pills, border-radius 24px, 12px count text
 * - Layout: 8px gap between avatar and text column
 */
function SlackMessage() {
  const springEase = [0.16, 1, 0.3, 1] as [number, number, number, number];
  const slackFont = "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: springEase, delay: 0.5 }}
      style={{
        display: "inline-block",
        transform: "rotate(-1.5deg)",
      }}
    >
      <span
        style={{
          display: "flex",
          gap: 10,
          background: "#FFFFFF",
          border: "1px solid rgba(29,28,29,0.13)",
          borderRadius: 10,
          padding: "14px 18px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.04)",
          /* Reset the hero text styles so they don't bleed in */
          fontFamily: slackFont,
          fontStyle: "normal",
          fontWeight: 400,
          fontSize: 16,
          letterSpacing: "0em",
          lineHeight: 1.46668,
          color: "#1d1c1d",
          textTransform: "none" as const,
        }}
      >
        {/* Avatar — Slack's signature rounded square */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            minWidth: 42,
            borderRadius: 5,
            background: "#2B4D8C",
            color: "#FFFFFF",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: slackFont,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          J
        </span>

        {/* Text column */}
        <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Name + timestamp row */}
          <span style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span
              style={{
                fontFamily: slackFont,
                fontSize: 16,
                fontWeight: 900,
                color: "#1d1c1d",
                lineHeight: 1.46668,
                whiteSpace: "nowrap",
              }}
            >
              James
            </span>
            <span
              style={{
                fontFamily: slackFont,
                fontSize: 13,
                fontWeight: 400,
                color: "#616061",
                lineHeight: 1.46668,
                whiteSpace: "nowrap",
              }}
            >
              10:13 AM
            </span>
          </span>

          {/* Message body */}
          <span
            style={{
              fontFamily: slackFont,
              fontSize: 16,
              fontWeight: 400,
              color: "#1d1c1d",
              lineHeight: 1.46668,
              marginTop: 1,
            }}
          >
            we should use AI
          </span>

          {/* Emoji reactions */}
          <span style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>
            {REACTIONS.map((r, i) => (
              <motion.span
                key={r.emoji}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: springEase,
                  delay: 0.9 + i * 0.08,
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(29,28,29,0.04)",
                  border: "1px solid rgba(29,28,29,0.13)",
                  borderRadius: 24,
                  padding: "1px 9px",
                  height: 26,
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>{r.emoji}</span>
                <span
                  style={{
                    fontFamily: slackFont,
                    fontSize: 13,
                    fontWeight: 400,
                    color: "#616061",
                    lineHeight: 1,
                  }}
                >
                  {r.count}
                </span>
              </motion.span>
            ))}
          </span>
        </span>
      </span>
    </motion.span>
  );
}

/* ─── Rotating text circle ──────────────────────────────────── */
function RotatingCircle() {
  const text = "Building AI systems everyday · Building AI systems everyday · ";

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

/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  const springEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

  return (
    <section
      className="relative min-h-[calc(100vh-56px)] flex flex-col justify-center px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* "I turn" */}
        <motion.h1
          className="text-hero"
          style={{ lineHeight: 1.2, margin: 0 }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          I turn
        </motion.h1>

        {/* Slack message — its own row, slightly indented */}
        <div style={{ paddingLeft: "clamp(16px, 2.5vw, 36px)", margin: "12px 0" }}>
          <SlackMessage />
        </div>

        {/* "into systems" */}
        <motion.h1
          className="text-hero"
          style={{ lineHeight: 1.2, margin: 0 }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.08 }}
        >
          into systems
        </motion.h1>

        {/* "people use every day." */}
        <motion.h1
          className="text-hero"
          style={{ lineHeight: 1.2, margin: "0.05em 0 0" }}
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.6, ease: "easeInOut", delay: 0.14 }}
        >
          <span style={{ color: "#4A4440" }}>people use every day</span>
          <span style={{ color: "#4A4440" }}>.</span>
        </motion.h1>

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
          Shipped: CRM Replacement · Multi-Agent Deal Intelligence · Automated GTM Workflows
        </motion.p>

        {/* CTA link */}
        <motion.a
          href="#work"
          className="text-sm font-medium"
          style={{ color: "var(--color-accent)", display: "inline-block", marginTop: "1.5rem" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: springEase, delay: 0.7 }}
        >
          see what I&apos;ve built →
        </motion.a>
      </div>

      {/* Rotating text circle */}
      <RotatingCircle />
    </section>
  );
}
