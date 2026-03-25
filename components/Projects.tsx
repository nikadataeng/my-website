"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

const projects = [
  {
    replaced: "REPLACED: Salesforce (CRM + deal management)",
    name: "Vantage — Deal Slack Ops",
    period: "2024–Present",
    org: "Sigma Computing",
    tag: "ONGOING",
    description:
      "Salesforce is a $200B company. We're building the replacement internally. Vantage is Sigma's AI-native CRM suite — Deal Slack Ops is the first shipped app: Slack channels auto-created per opportunity, linked to account and deal context at creation.",
    stack: ["Snowflake", "Sigma", "Slack API", "LLM APIs"],
  },
  {
    replaced: "REPLACED: Rattle · Clari · Gong",
    name: "GTM AI Stack — $100K SaaS Replacement",
    period: "2023",
    org: "Sigma Computing",
    tag: "PRODUCTION",
    description:
      "Replaced external GTM SaaS platforms with warehouse-native AI systems built on Snowflake Cortex and LLM APIs. Outcome: $100K+ annual cost savings. Capabilities: pipeline intelligence, forecasting narratives, lead enrichment, buyer-intent scoring, exec reporting automation.",
    stack: ["Snowflake Cortex", "LLM APIs", "Sigma", "Slack"],
    partners: ["CMO", "COO", "CEO"],
  },
  {
    replaced: "REPLACED: Dependence on a single engineer",
    name: "Internal AI Frameworks + Playbooks",
    period: "2023",
    org: "Sigma Computing",
    tag: "INFRASTRUCTURE",
    description:
      "Built reusable AI app frameworks and API-driven automation pipelines. Then documented them so non-engineering teams could build AI workflows without buying new SaaS. The goal: make the internal AI capability compounding, not dependent on a single engineer.",
    stack: [],
  },
];

function ProjectRow({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="group">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
        className="py-8 md:py-10"
      >
        {/* Replaced label */}
        <p className="mb-1 text-label" style={{ color: "var(--color-muted)" }}>
          {project.replaced}
        </p>

        {/* Top row: name + tag + period */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <h3
            className="font-extrabold leading-tight"
            style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--color-ink)" }}
          >
            {project.name}
          </h3>
          <div className="flex items-center gap-4 pt-1 shrink-0">
            <span
              className="text-label"
              style={{
                color: "var(--color-muted)",
                border: "1px solid var(--color-border)",
                padding: "2px 8px",
              }}
            >
              {project.tag}
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              {project.period}
            </span>
          </div>
        </div>

        {/* Org */}
        <p className="text-label mb-4" style={{ color: "var(--color-muted)" }}>
          {project.org}
          {project.partners && (
            <> · Partners: {project.partners.join(" · ")}</>
          )}
        </p>

        {/* Description */}
        <p
          className="leading-relaxed max-w-3xl"
          style={{ color: "var(--color-ink)", fontSize: "var(--text-body)" }}
        >
          {project.description}
        </p>

        {/* Stack */}
        {project.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-label"
                style={{ color: "var(--color-muted)" }}
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Arrow */}
        <div className="mt-5">
          <motion.span
            className="text-label font-bold"
            style={{ color: "var(--color-accent)", display: "inline-block" }}
            animate={inView ? {} : {}}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.15 }}
          >
            →
          </motion.span>
        </div>
      </motion.div>

      {/* Animated rule between projects */}
      <motion.div
        initial={{ scaleX: 0, originX: "left" }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeInOut", delay: index * 0.07 + 0.1 }}
        style={{
          height: "1px",
          background: "var(--color-border)",
          transformOrigin: "left",
        }}
        className="group-hover:[background:var(--color-accent)] transition-colors duration-150"
      />
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="work"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20 relative overflow-hidden"
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
        02
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            02 —
          </span>
        </ScrollReveal>

        <div className="mt-4 mb-2">
          <AnimatedRule />
        </div>

        {/* Projects list */}
        {projects.map((project, i) => (
          <ProjectRow key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
