"use client";

import ScrollReveal from "./ScrollReveal";

const replacements = [
  { before: "Salesforce", after: "Internal AI CRM" },
  { before: "Rattle · Clari (pipeline intelligence)", after: "Snowflake-native forecasting" },
  { before: "FinOps SaaS", after: "Warehouse-native reporting" },
  { before: "RevOps platforms", after: "LLM-powered workflow automation" },
];

export default function WhatIReplace() {
  return (
    <section
      className="py-16 md:py-20 px-6 md:px-12 lg:px-20"
      style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span
            className="block mb-8"
            style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.1em", color: "var(--color-muted)", textTransform: "uppercase" }}
          >
            What I Replace
          </span>
        </ScrollReveal>

        <ul className="space-y-4">
          {replacements.map(({ before, after }, i) => (
            <ScrollReveal key={before} delay={i * 0.06}>
              <li className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span style={{ fontSize: "var(--text-body)", color: "var(--color-muted)" }}>
                  {before}
                </span>
                <span style={{ fontSize: "var(--text-body)", color: "var(--color-accent)", fontWeight: 700 }}>
                  →
                </span>
                <span style={{ fontSize: "var(--text-body)", color: "var(--color-ink)", fontWeight: 700 }}>
                  {after}
                </span>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
