"use client";

import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

const whatIBuild = [
  "GTM automation systems",
  "Pipeline & forecast intelligence",
  "Slack-native AI agents",
  "Warehouse-native CRM tooling",
  "Internal AI frameworks",
];

const currentStack = [
  "Snowflake Cortex",
  "LLM APIs (OpenAI, Anthropic)",
  "Sigma Computing",
  "Slack API",
  "Python · SQL",
];

export default function IdentityBlock() {
  return (
    <section
      id="about"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            About
          </span>
        </ScrollReveal>

        {/* Animated rule */}
        <div className="mt-4 mb-12">
          <AnimatedRule />
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Bio */}
          <ScrollReveal delay={0.05} className="md:col-span-1">
            <p
              className="leading-relaxed"
              style={{ color: "var(--color-ink)", fontSize: "var(--text-body)" }}
            >
              I build AI systems that make GTM and RevOps teams independent of
              the SaaS vendors they used to pay for.
            </p>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: "var(--color-ink)", fontSize: "var(--text-body)" }}
            >
              At Sigma Computing, I work directly with the CMO, COO, and CEO to
              replace external tools — pipeline intelligence platforms, deal
              management software, reporting automation — with warehouse-native
              AI built on Snowflake and Sigma. My systems don&apos;t supplement
              the existing stack. They replace it.
            </p>
            <p
              className="mt-6 font-bold"
              style={{ color: "var(--color-ink)", fontSize: "var(--text-body)" }}
            >
              I build systems that ship.
            </p>
          </ScrollReveal>

          {/* What I build */}
          <ScrollReveal delay={0.1}>
            <p
              className="text-label mb-5"
              style={{ color: "var(--color-muted)" }}
            >
              What I build
            </p>
            <ul className="space-y-2">
              {whatIBuild.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: "var(--text-body)",
                    color: "var(--color-ink)",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>//</span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Current stack */}
          <ScrollReveal delay={0.15}>
            <p
              className="text-label mb-5"
              style={{ color: "var(--color-muted)" }}
            >
              Current stack
            </p>
            <ul className="space-y-2">
              {currentStack.map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: "var(--text-body)",
                    color: "var(--color-ink)",
                  }}
                >
                  <span style={{ color: "var(--color-muted)" }}>//</span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
