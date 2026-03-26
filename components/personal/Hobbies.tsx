"use client";

import ScrollReveal from "../ScrollReveal";

const hobbies = [
  { emoji: "🏓", label: "Table Tennis" },
  { emoji: "🏺", label: "Ceramics" },
  { emoji: "🌸", label: "Ikebana" },
  { emoji: "🔭", label: "Astronomy" },
  { emoji: "🚀", label: "Space" },
];

export default function Hobbies() {
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
            Things I Love
          </span>
        </ScrollReveal>

        <div className="flex flex-wrap gap-4">
          {hobbies.map(({ emoji, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.07}>
              <div
                className="flex items-center gap-3 px-5 py-3 rounded-full"
                style={{
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span style={{ fontSize: "22px" }}>{emoji}</span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                  }}
                >
                  {label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
