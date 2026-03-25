"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedRule({ color = "var(--color-border)" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ width: "100%", height: "1px", background: "var(--color-border)", overflow: "hidden" }}>
      <motion.div
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ height: "100%", background: color, transformOrigin: "left" }}
      />
    </div>
  );
}
