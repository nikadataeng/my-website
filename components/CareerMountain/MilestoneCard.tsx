"use client";

import type { Milestone } from "./milestones";

interface MilestoneCardProps {
  milestone: Milestone;
  position: "above" | "below";
  index: number;
  style?: React.CSSProperties;
}

/**
 * Frosted-glass milestone card. Starts invisible — GSAP reveals it on scroll.
 * Staggered child elements cascade in via CSS transition delays once
 * the card's opacity is set to 1 by GSAP.
 */
export default function MilestoneCard({ milestone, position, index, style }: MilestoneCardProps) {
  const yOffset = position === "above" ? -150 : 50;

  return (
    <div
      className={`cm-card cm-card-${index}`}
      style={{
        position: "absolute",
        transform: `translate(-50%, ${yOffset}px)`,
        opacity: 0, /* GSAP controls this */
        width: 230,
        padding: "18px 22px",
        background: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.4)",
        borderRadius: 16,
        boxShadow: "0 12px 40px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.03)",
        zIndex: 20,
        willChange: "transform, opacity",
        pointerEvents: "none",
        ...style,
      }}
    >
      {/* Year */}
      <span
        className="cm-card-child"
        style={{
          display: "block",
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase" as const,
          color: "var(--color-accent, #9FB8C8)",
          opacity: 0,
          transform: "translateY(8px)",
          transition: "opacity 0.4s cubic-bezier(.37,.01,0,.98) 0.06s, transform 0.4s cubic-bezier(.37,.01,0,.98) 0.06s",
        }}
      >
        {milestone.year}
      </span>

      {/* Title */}
      <h3
        className="cm-card-child"
        style={{
          fontFamily: "var(--font-display), sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "var(--color-ink, #4A4440)",
          lineHeight: 1.2,
          margin: "5px 0 3px",
          opacity: 0,
          transform: "translateY(8px)",
          transition: "opacity 0.4s cubic-bezier(.37,.01,0,.98) 0.12s, transform 0.4s cubic-bezier(.37,.01,0,.98) 0.12s",
        }}
      >
        {milestone.title}
      </h3>

      {/* Company */}
      <p
        className="cm-card-child"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--color-accent, #2B4D8C)",
          margin: "0 0 6px",
          opacity: 0,
          transform: "translateY(8px)",
          transition: "opacity 0.4s cubic-bezier(.37,.01,0,.98) 0.18s, transform 0.4s cubic-bezier(.37,.01,0,.98) 0.18s",
        }}
      >
        {milestone.company}
      </p>

      {/* Description */}
      <p
        className="cm-card-child"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: "var(--color-muted, #6B6862)",
          lineHeight: 1.55,
          margin: 0,
          opacity: 0,
          transform: "translateY(8px)",
          transition: "opacity 0.4s cubic-bezier(.37,.01,0,.98) 0.24s, transform 0.4s cubic-bezier(.37,.01,0,.98) 0.24s",
        }}
      >
        {milestone.description}
      </p>

      {/* Skill pills */}
      {milestone.skills.length > 0 && (
        <div
          className="cm-card-child"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginTop: 8,
            opacity: 0,
            transform: "translateY(8px)",
            transition: "opacity 0.4s cubic-bezier(.37,.01,0,.98) 0.30s, transform 0.4s cubic-bezier(.37,.01,0,.98) 0.30s",
          }}
        >
          {milestone.skills.map((skill) => (
            <span
              key={skill}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 500,
                color: "var(--color-muted, #7A7468)",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid var(--color-border, #D8D3C8)",
                borderRadius: 10,
                padding: "2px 8px",
                lineHeight: 1.6,
                whiteSpace: "nowrap",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}
