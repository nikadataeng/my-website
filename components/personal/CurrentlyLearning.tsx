"use client";

import ScrollReveal from "../ScrollReveal";

const items = [
  {
    title: "MCPs (Model Context Protocol)",
    detail: "Anthropic's standard for connecting AI models to tools and data sources",
  },
  {
    title: "Subagents",
    detail: "Orchestrating fleets of specialized AI agents for complex multi-step workflows",
  },
  {
    title: "Skills",
    detail: "Building reusable, composable AI capabilities that can be invoked like functions",
  },
];

export default function CurrentlyLearning() {
  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span
            className="block mb-10"
            style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.1em", color: "var(--color-muted)", textTransform: "uppercase" }}
          >
            Currently Learning
          </span>
        </ScrollReveal>

        <div className="space-y-6">
          {items.map(({ title, detail }, i) => (
            <ScrollReveal key={title} delay={i * 0.08}>
              <div className="flex items-start gap-4">
                <span
                  style={{
                    marginTop: "6px",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    flexShrink: 0,
                    display: "block",
                  }}
                />
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-ink)", lineHeight: 1.3 }}>
                    {title}
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--color-muted)", marginTop: "4px", lineHeight: 1.6 }}>
                    {detail}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
