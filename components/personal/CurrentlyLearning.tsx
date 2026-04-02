"use client";

import ScrollReveal from "../ScrollReveal";

const items = [
  {
    index: "01",
    title: "MCPs: Model Context Protocol",
    detail:
      "Anthropic's standard for connecting AI models to tools and data sources. The plumbing that makes agents actually useful.",
  },
  {
    index: "02",
    title: "Subagents",
    detail:
      "Orchestrating fleets of specialized AI agents for complex multi-step workflows. Delegation, but make it artificial.",
  },
  {
    index: "03",
    title: "Skills",
    detail:
      "Building reusable, composable AI capabilities that can be invoked like functions. Modular intelligence.",
  },
];

export default function CurrentlyLearning() {
  return (
    <section
      id="dispatch"
      style={{
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "var(--section-gap, 100px)",
        paddingBottom: "var(--section-gap, 100px)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* ── Section kicker ── */}
        <ScrollReveal>
          <div
            style={{
              borderTop: "3px solid var(--color-ink)",
              paddingTop: "1rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span className="text-label" style={{ color: "var(--color-accent)" }}>
              Dispatch: Tech
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Brain Rot, Productive Edition
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <h2 className="text-section" style={{ marginBottom: "3rem" }}>
            Deep in it.
          </h2>
        </ScrollReveal>

        {/* ── Items ── */}
        <div>
          {items.map(({ index, title, detail }, i) => (
            <ScrollReveal key={title} delay={i * 0.08}>
              <div
                className="py-8 grid grid-cols-12 gap-6 items-start"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                {/* Index */}
                <span
                  className="col-span-1 text-label"
                  style={{ color: "var(--color-accent)", paddingTop: "4px" }}
                >
                  {index}
                </span>

                {/* Title */}
                <h3
                  className="col-span-11 md:col-span-4"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </h3>

                {/* Detail */}
                <p
                  className="col-span-11 md:col-span-6 md:col-start-7"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(14px, 1.3vw, 16px)",
                    color: "var(--color-muted)",
                    lineHeight: 1.8,
                  }}
                >
                  {detail}
                </p>
              </div>
            </ScrollReveal>
          ))}

          <div style={{ borderTop: "1px solid var(--color-border)" }} />
        </div>

      </div>
    </section>
  );
}
