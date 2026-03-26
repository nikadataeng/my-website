"use client";

import ScrollReveal from "../ScrollReveal";

const items = [
  {
    index: "01",
    title: "MCPs — Model Context Protocol",
    detail: "Anthropic's standard for connecting AI models to tools and data sources. The plumbing that makes agents actually useful.",
  },
  {
    index: "02",
    title: "Subagents",
    detail: "Orchestrating fleets of specialized AI agents for complex multi-step workflows. Delegation, but make it artificial.",
  },
  {
    index: "03",
    title: "Skills",
    detail: "Building reusable, composable AI capabilities that can be invoked like functions. Modular intelligence.",
  },
];

export default function CurrentlyLearning() {
  return (
    <section
      className="px-6 md:px-12 lg:px-20"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <div
              className="mb-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1rem" }}
            >
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                Brain Rot, Productive Edition
              </span>
            </div>
            <h2 className="text-section" style={{ color: "var(--color-ink)" }}>
              Deep in it.
            </h2>
          </div>
        </ScrollReveal>

        {/* Items */}
        <div>
          {items.map(({ index, title, detail }, i) => (
            <ScrollReveal key={title} delay={i * 0.08}>
              <div
                className="py-8 grid grid-cols-12 gap-6 items-start"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
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
                    fontSize: "clamp(20px, 2vw, 26px)",
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
                    fontSize: "15px",
                    color: "var(--color-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {detail}
                </p>
              </div>
            </ScrollReveal>
          ))}

          {/* Final rule */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

      </div>
    </section>
  );
}
