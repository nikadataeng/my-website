"use client";

import { motion } from "framer-motion";

interface DiagramNodeProps {
  node: {
    id: string;
    label: string;
    sublabel: string;
    logo?: string;
    icon?: string;
    zone: string;
  };
  delay: number;
  inView: boolean;
  isJunction?: boolean;
  floatDelay?: number;
  floatAmplitude?: number;
}

const EASING = [0.16, 1, 0.3, 1] as const;

export default function DiagramNode({
  node,
  delay,
  inView,
  isJunction = false,
}: DiagramNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: EASING, delay }}
      style={{ width: isJunction ? 220 : 190 }}
    >
      <div
                style={{
          padding: isJunction ? "14px 22px" : "12px 18px",
          background: isJunction
            ? "rgba(43, 77, 140, 0.06)"
            : node.zone === "framework"
              ? "rgba(250, 249, 247, 0.92)"
              : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          border: isJunction
            ? "1px solid rgba(43, 77, 140, 0.22)"
            : "1px solid var(--color-border)",
          borderRadius: 24,
          boxShadow: isJunction
            ? "0 16px 48px rgba(43,77,140,0.1), 0 4px 12px rgba(0,0,0,0.04)"
            : "0 10px 28px rgba(0,0,0,0.05), 0 2px 6px rgba(0,0,0,0.02)",
          cursor: "default",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: isJunction ? 15 : 13.5,
            fontWeight: 600,
            color: "var(--color-ink)",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {node.label}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 400,
            color: "var(--color-muted)",
            lineHeight: 1.3,
            marginTop: 2,
            whiteSpace: "nowrap",
          }}
        >
          {node.sublabel}
        </div>
      </div>
    </motion.div>
  );
}
