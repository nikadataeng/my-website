"use client";

/**
 * ScrollReveal — scroll-triggered entrance animation.
 *
 * Enhanced with Chartmetric-inspired variants:
 *  - "fade-up"    (default) — opacity + translateY, classic and clean
 *  - "fade-left"  — opacity + translateX from right
 *  - "clip-wipe"  — clipPath wipe reveal left→right (same as hero headlines)
 *  - "scale-up"   — opacity + subtle scale from 0.96
 *
 * All variants use the same spring ease curve [0.16, 1, 0.3, 1] for
 * consistency with the hero and CareerMountain animations.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export type ScrollRevealVariant = "fade-up" | "fade-left" | "clip-wipe" | "scale-up";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Animation variant. Default: "fade-up". */
  variant?: ScrollRevealVariant;
  /** Distance for fade-up/fade-left (px). Default: 24. */
  distance?: number;
  /** Intersection margin before triggering. Default: "-80px". */
  margin?: string;
}

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

function getVariantProps(variant: ScrollRevealVariant, distance: number) {
  switch (variant) {
    case "fade-left":
      return {
        initial: { opacity: 0, x: distance },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.9, ease: EASE },
      };
    case "clip-wipe":
      return {
        initial: { clipPath: "inset(-10% 100% -10% 0)", opacity: 1 },
        animate: { clipPath: "inset(-10% 0% -10% 0)", opacity: 1 },
        transition: { duration: 1.0, ease: EASE },
      };
    case "scale-up":
      return {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.9, ease: EASE },
      };
    case "fade-up":
    default:
      return {
        initial: { opacity: 0, y: distance },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.9, ease: EASE },
      };
  }
}

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  variant = "fade-up",
  distance = 24,
  margin = "-80px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inView = useInView(ref, { once: true, margin: margin as any });

  const { initial, animate, transition } = getVariantProps(variant, distance);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : {}}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
