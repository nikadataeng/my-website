"use client";

/**
 * AnimatedWord — Chartmetric-inspired word-by-word stagger reveal.
 *
 * Splits text into words (preserving punctuation) and animates each word
 * in with a fast spring ease, staggered by `staggerDelay` seconds per word.
 * Triggers once the element enters the viewport.
 *
 * Usage:
 *   <AnimatedWord text="The SaaS tools sitting on top of your warehouse" />
 *   <AnimatedWord text={longString} as="p" className="text-hero" staggerDelay={0.04} />
 */

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SPRING_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface AnimatedWordProps {
  text: string;
  /** Root element to render. Defaults to "span" so it can live inside <h1> etc. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  /** Per-word stagger delay in seconds. Default 0.06. */
  staggerDelay?: number;
  /** Initial animation delay before any words appear. Default 0. */
  delay?: number;
  /** Intersection observer margin. Default "-60px". */
  margin?: string;
}

export default function AnimatedWord({
  text,
  as: Tag = "span",
  className,
  style,
  staggerDelay = 0.06,
  delay = 0,
  margin = "-60px",
}: AnimatedWordProps) {
  const ref = useRef<HTMLElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once: true, margin: margin as any });

  const words = text.split(" ");

  // Dynamic tag — ref typing is intentionally loose here
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TagEl = Tag as any;
  return (
    <TagEl ref={ref} className={className} style={{ ...style, display: "block" }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{
              duration: 0.55,
              ease: SPRING_EASE,
              delay: delay + i * staggerDelay,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </TagEl>
  );
}
