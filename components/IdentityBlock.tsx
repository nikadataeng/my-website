"use client";

/**
 * IdentityBlock — About section, OpenAI mission-statement style.
 * Large serif statement, plain bio, capabilities as numbered ruled rows.
 * No photo (Hero already has one), no decorative bullets.
 */

import ScrollReveal from "./ScrollReveal";
import identity from "@/content/career/identity.json";

export default function IdentityBlock() {
  return (
    <section
      id="about"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            About
          </span>
        </ScrollReveal>

        {/* Statement */}
        <ScrollReveal delay={0.05}>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              color: "var(--ink-display)",
              maxWidth: "820px",
              marginTop: "1.5rem",
            }}
          >
            {identity.statement}
          </p>
        </ScrollReveal>

        {/* Bio + capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mt-16">
          {/* Bio */}
          <ScrollReveal delay={0.1}>
            <div>
              {identity.bio.map((p, i) => (
                <p
                  key={i}
                  className={i > 0 ? "mt-4" : ""}
                  style={{
                    color: "var(--color-ink)",
                    fontSize: "var(--text-body)",
                    lineHeight: 1.7,
                    fontWeight: i === identity.bio.length - 1 ? 600 : 400,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>

          {/* What I build — numbered ruled rows */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="text-label mb-4" style={{ color: "var(--color-muted)" }}>
                What I build
              </p>
            </ScrollReveal>
            <div>
              {identity.whatIBuild.map((item, i) => (
                <ScrollReveal key={item.title} delay={0.12 + i * 0.03}>
                  <div
                    className="py-4"
                    style={{
                      borderBottom:
                        i < identity.whatIBuild.length - 1
                          ? "1px solid var(--color-border)"
                          : "none",
                    }}
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-label" style={{ color: "var(--color-muted)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-body)",
                          fontWeight: 500,
                          color: "var(--color-ink)",
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    <p
                      className="mt-1"
                      style={{
                        fontSize: "14px",
                        color: "var(--color-muted)",
                        paddingLeft: "calc(11px + 0.75rem)",
                      }}
                    >
                      {item.outcome}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Current stack — quiet line beneath */}
            <ScrollReveal delay={0.3}>
              <p className="mt-6 text-label" style={{ color: "var(--color-muted)" }}>
                Stack — {identity.stack.join(" · ")}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
