"use client";

/**
 * Hero — main landing section.
 *
 * Enhanced with Chartmetric-inspired depth effects:
 * - Subtle parallax on the sublines (scroll down, they drift upward slightly)
 *   achieved via Framer Motion useScroll + useTransform — the same technique
 *   Chartmetric uses to create layered depth on their year-in-review sections.
 * - The name/role intro now fades in with the same spring curve used throughout.
 * - Existing clipPath wipe and SlackMessage animations are preserved unchanged.
 */

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Slack emoji reactions ─────────────────────────────────── */
const REACTIONS = [
  { emoji: "👀", count: 12 },
  { emoji: "🔥", count: 8 },
  { emoji: "💯", count: 6 },
  { emoji: "🙌", count: 5 },
  { emoji: "👆", count: 4 },
  { emoji: "🐸", count: 3 },
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
  const slackFont = "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
      style={{
        display: "inline-block",
        transform: "rotate(-1.5deg)",
      }}
    >
      <span
        style={{
          display: "flex",
          gap: 12,
          background: "#FFFFFF",
          border: "1px solid rgba(29,28,29,0.13)",
          borderRadius: 10,
          padding: "16px 20px 14px",
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
            width: 46,
            height: 46,
            minWidth: 46,
            borderRadius: 6,
            background: "#2B4D8C",
            color: "#FFFFFF",
            fontSize: 20,
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
                fontSize: 17,
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
                fontSize: 14,
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
              fontSize: 17,
              fontWeight: 400,
              color: "#1d1c1d",
              lineHeight: 1.46668,
              marginTop: 2,
            }}
          >
            we should use AI
          </span>

          {/* Emoji reactions */}
          <span style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
            {REACTIONS.map((r, i) => (
              <motion.span
                key={r.emoji}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: EASE,
                  delay: 0.9 + i * 0.08,
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(29,28,29,0.04)",
                  border: "1px solid rgba(29,28,29,0.13)",
                  borderRadius: 24,
                  padding: "2px 10px",
                  height: 28,
                  cursor: "default",
                }}
              >
                <span style={{ fontSize: 16, lineHeight: 1 }}>{r.emoji}</span>
                <span
                  style={{
                    fontFamily: slackFont,
                    fontSize: 13.5,
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

/* ─── Hero ──────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-20"
      style={{
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "clamp(48px, 8vh, 100px)",
        paddingBottom: "clamp(48px, 8vh, 100px)",
      }}
    >
      <div className="max-w-6xl w-full mx-auto relative">
        {/* Headshot — corner accent */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
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

        {/* "I turn" */}
        <motion.h1
          className="text-hero"
          style={{ margin: 0 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
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
          style={{ margin: 0 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
        >
          into systems
        </motion.h1>

        {/* "people use every day." */}
        <motion.h1
          className="text-hero"
          style={{ marginTop: "0.15em", marginBottom: 0 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
        >
          <span style={{ color: "var(--ink-display)" }}>people use every day</span>
          <span style={{ color: "var(--ink-display)" }}>.</span>
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
    </section>
  );
}
