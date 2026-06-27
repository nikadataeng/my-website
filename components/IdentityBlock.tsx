"use client";

/**
 * IdentityBlock — About section.
 *
 * Enhanced with Chartmetric-inspired staggered list item reveals:
 * each "What I build" and "Current stack" item fades+slides in
 * with a per-item delay, creating the cascading data-list feel
 * common in Chartmetric's stat sections.
 *
 * The headshot block now uses a "scale-up" ScrollReveal variant
 * for a subtle Chartmetric-style entrance.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

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

/** Staggered list — each item fades+slides in on a cascade */
function StaggeredList({
  items,
  parentDelay = 0,
}: {
  items: string[];
  parentDelay?: number;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <ul ref={ref} className="space-y-2">
      {items.map((item, i) => (
        <motion.li
          key={item}
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{
            duration: 0.45,
            ease: EASE,
            delay: parentDelay + i * 0.07,
          }}
          style={{
            fontSize: "var(--text-body)",
            color: "var(--color-ink)",
          }}
        >
          <span style={{ color: "var(--color-muted)" }}>//</span>{" "}
          {item}
        </motion.li>
      ))}
    </ul>
  );
}

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
          {/* Bio — scale-up entrance for the headshot, then fade-up for text */}
          <ScrollReveal delay={0.05} variant="scale-up" className="md:col-span-1">
            {/* Headshot */}
            <div
              style={{
                width: "clamp(140px, 18vw, 180px)",
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                backgroundImage: "url(/images/headshot.png)",
                backgroundSize: "145%",
                backgroundPosition: "center 12%",
                backgroundRepeat: "no-repeat",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                marginBottom: 24,
              }}
              aria-label="Photo of Ayonika Bose"
              role="img"
            />
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

          {/* What I build — staggered list */}
          <div>
            <ScrollReveal delay={0.08}>
              <p className="text-label mb-5" style={{ color: "var(--color-muted)" }}>
                What I build
              </p>
            </ScrollReveal>
            <StaggeredList items={whatIBuild} parentDelay={0.12} />
          </div>

          {/* Current stack — staggered list */}
          <div>
            <ScrollReveal delay={0.1}>
              <p className="text-label mb-5" style={{ color: "var(--color-muted)" }}>
                Current stack
              </p>
            </ScrollReveal>
            <StaggeredList items={currentStack} parentDelay={0.14} />
          </div>
        </div>
      </div>
    </section>
  );
}
