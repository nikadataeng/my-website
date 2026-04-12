"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

import projectsData from "@/content/career/projects.json";

const projects = projectsData;

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
        {/* Replaced → Built headline */}
        <div className="mb-3">
          <h3
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(24px, 3.5vw, 40px)",
              fontWeight: 400,
              color: "var(--color-ink)",
              lineHeight: 1.15,
            }}
          >
            <span style={{ color: "var(--color-muted)", fontWeight: 300 }}>
              {project.replaced.replace("REPLACED: ", "")}
            </span>
            <span style={{ color: "var(--color-accent)", margin: "0 0.4em" }}>→</span>
            <span style={{ color: "var(--color-ink)" }}>{project.name}</span>
          </h3>
        </div>

        {/* Meta row: tag + period + org */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span
            className="text-label"
            style={{
              color: "var(--color-accent)",
              border: "1px solid var(--color-accent)",
              padding: "2px 8px",
              opacity: 0.8,
            }}
          >
            {project.tag}
          </span>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            {project.period}
          </span>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            {project.org}
            {project.partners && (
              <> · {project.partners.join(" · ")}</>
            )}
          </span>
        </div>

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

        {/* CTA — only show if project has a link */}
        {project.href && (
          <div className="mt-5">
            <a
              href={project.href}
              className="text-label font-bold inline-flex items-center gap-2 group/link"
              style={{ color: "var(--color-accent)" }}
            >
              Read more
              <motion.span
                className="inline-block"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                →
              </motion.span>
            </a>
          </div>
        )}
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
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            Work
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
