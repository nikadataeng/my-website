"use client";

/**
 * GradientDivider — Chartmetric-inspired subtle gradient section break.
 *
 * A full-width interlude strip that uses the site's Monet-palette gradient
 * to visually breathe between sections. Animates in via opacity when it
 * enters the viewport.
 *
 * The gradient only activates in personal view; in career view it renders
 * as a clean horizontal rule consistent with the heritage palette.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface GradientDividerProps {
  height?: number; // px, default 2
  className?: string;
}

export default function GradientDivider({ height = 2, className }: GradientDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className={className}
      style={{ width: "100%", overflow: "hidden", height }}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: "100%",
          width: "100%",
          transformOrigin: "left center",
          /* Career view: accent blue gradient; personal view: Monet palette */
          background: `linear-gradient(
            90deg,
            transparent 0%,
            var(--color-accent, #2B4D8C) 20%,
            var(--color-accent, #2B4D8C) 80%,
            transparent 100%
          )`,
          opacity: 0.18,
        }}
      />
    </div>
  );
}
