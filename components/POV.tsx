"use client";

import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

export default function POV() {
  return (
    <section
      className="py-32 md:py-48 px-6 md:px-12 lg:px-20 relative overflow-hidden"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      {/* Decorative number */}
      <div
        aria-hidden="true"
        className="absolute top-8 left-4 select-none pointer-events-none"
        style={{
          fontSize: "240px",
          fontWeight: 900,
          color: "var(--color-ink)",
          opacity: 0.04,
          lineHeight: 1,
        }}
      >
        03
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            03 —
          </span>
        </ScrollReveal>

        <div className="mt-4 mb-16 md:mb-24">
          <AnimatedRule />
        </div>

        {/* Pull quote */}
        <ScrollReveal delay={0.1}>
          <blockquote
            style={{
              fontSize: "clamp(28px, 4.5vw, 52px)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
              maxWidth: "900px",
            }}
          >
            &ldquo;The SaaS tools sitting on top of your data warehouse are the
            most replaceable software ever built. You already own the data.
            You&apos;re just renting the logic.&rdquo;
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
      </div>
    </section>
  );
}
