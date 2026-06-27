"use client";

/**
 * POV — Point of View section.
 *
 * Enhanced with Chartmetric-inspired patterns:
 * - Word-by-word stagger reveal on the blockquote
 * - Animated stat counters (count-up) in a three-column stat row
 * - Subtle gradient rule above the stat row
 *
 * Stats are grounded in the actual project content:
 *   $100K+ — annual SaaS spend replaced (from GTM AI Stack project)
 *   4       — AI systems shipped to production
 *   3       — years building AI applications
 */

import ScrollReveal from "./ScrollReveal";
import AnimatedWord from "./AnimatedWord";
import AnimatedCounter from "./AnimatedCounter";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const STATS = [
  {
    prefix: "$",
    to: 100,
    suffix: "K+",
    label: "Annual SaaS spend replaced",
  },
  {
    prefix: "",
    to: 4,
    suffix: "",
    label: "AI systems in production",
  },
  {
    prefix: "",
    to: 3,
    suffix: " yrs",
    label: "Building AI applications",
  },
];

function StatItem({
  stat,
  index,
}: {
  stat: (typeof STATS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.35rem",
        padding: "clamp(20px, 3vw, 32px) 0",
        borderTop: index === 0 ? "none" : undefined,
      }}
    >
      <AnimatedCounter
        to={stat.to}
        prefix={stat.prefix}
        suffix={stat.suffix}
        duration={1600}
        delay={index * 100}
        style={{
          fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(40px, 6vw, 72px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: "var(--color-ink)",
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase" as const,
          color: "var(--color-muted)",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function POV() {
  return (
    <section
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Blockquote — word-by-word reveal (Chartmetric pattern) */}
        <blockquote
          style={{
            fontSize: "clamp(28px, 4.5vw, 52px)",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
            maxWidth: "900px",
            margin: 0,
          }}
        >
          <AnimatedWord
            text="The SaaS tools sitting on top of your data warehouse are the most replaceable software ever built. You already own the data. You're just renting the logic."
            staggerDelay={0.04}
            delay={0.05}
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
            }}
          />
        </blockquote>

        {/* Expanding paragraph */}
        <ScrollReveal delay={0.2}>
          <p
            className="mt-10 leading-relaxed max-w-2xl"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--color-ink)",
            }}
          >
            GTM tools, RevOps platforms, FinOps dashboards — they&apos;re all
            doing the same thing: querying data you own and calling it a
            product. At Sigma, I&apos;ve replaced that entire category, one
            contract at a time, with systems that cost less, do more, and
            don&apos;t have a renewal date.
          </p>
        </ScrollReveal>

        {/* Stat row — Chartmetric-style large-number callouts with count-up */}
        <div
          style={{
            marginTop: "clamp(48px, 8vw, 80px)",
            paddingTop: "clamp(24px, 4vw, 40px)",
            borderTop: "1px solid var(--color-border)",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(24px, 4vw, 48px)",
          }}
        >
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
