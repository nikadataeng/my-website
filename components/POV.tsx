"use client";

/**
 * POV — Opinion page. Atlantic-style pull quote: 4px ink rule,
 * serif italic, no counters, no word-stagger. Figures set as static
 * print numerals in a "by the numbers" row.
 */

import ScrollReveal from "./ScrollReveal";

const STATS = [
  { value: "$100K+", label: "Annual SaaS spend replaced" },
  { value: "4", label: "AI systems in production" },
  { value: "3 yrs", label: "Building AI applications" },
];

export default function POV() {
  return (
    <section
      id="pov"
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Kicker */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-accent)" }}>
            Opinion
          </span>
        </ScrollReveal>

        {/* Pull quote — 4px rule, serif italic */}
        <ScrollReveal delay={0.1}>
          <blockquote
            style={{
              borderTop: "4px solid var(--ink-display)",
              marginTop: "1rem",
              paddingTop: "2rem",
              margin: "1rem 0 0",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(28px, 4.5vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing: "-0.015em",
                color: "var(--ink-display)",
                maxWidth: "900px",
              }}
            >
              The SaaS tools sitting on top of your data warehouse are the most
              replaceable software ever built. You already own the data.
              You&apos;re just renting the logic.
            </p>
          </blockquote>
        </ScrollReveal>

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

        {/* By the numbers — static print numerals */}
        <ScrollReveal delay={0.25}>
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
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(40px, 6vw, 72px)",
                    fontWeight: 400,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    color: "var(--ink-display)",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-label" style={{ color: "var(--color-muted)" }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
