"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AnimatedRule({ color = "var(--color-border)" }: { color?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ width: "100%", height: "1px", background: "transparent", overflow: "hidden" }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ height: "100%", background: color, transformOrigin: "left center" }}
      />
    </div>
  );
}
