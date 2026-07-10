"use client";

/**
 * PageTransition — page-turn wipe. An accent-colored panel sweeps
 * across as the view mounts, reading as turning to another section
 * of the issue. Falls back to a plain fade under reduced motion.
 */

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: "relative" }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "var(--color-accent)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
