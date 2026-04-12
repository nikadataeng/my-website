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
}

const EASING = [0.16, 1, 0.3, 1] as const;

export default function DiagramNode({
  node,
  delay,
  inView,
  isJunction = false,
}: DiagramNodeProps) {
  const isProduction = node.zone === "production";
  const borderColor = isProduction
    ? "var(--color-accent)"
    : "var(--color-muted)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : {}
      }
      transition={{ duration: 0.5, ease: EASING, delay }}
      className="card-lift"
      style={{
        position: "absolute",
        width: isJunction ? 220 : 190,
        padding: isJunction ? "16px 20px" : "12px 16px",
        background: isJunction
          ? "rgba(43, 77, 140, 0.04)"
          : node.zone === "framework"
            ? "rgba(250, 249, 247, 0.85)"
            : "rgba(255, 255, 255, 0.72)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        border: isJunction
          ? "1px solid rgba(43, 77, 140, 0.2)"
          : "1px solid rgba(255, 255, 255, 0.4)",
        borderLeft: `3px solid ${borderColor}`,
        borderRadius: 14,
        boxShadow: isJunction
          ? "0 16px 48px rgba(43,77,140,0.08), 0 4px 12px rgba(0,0,0,0.04)"
          : "0 8px 32px rgba(0,0,0,0.04), 0 2px 6px rgba(0,0,0,0.02)",
        zIndex: isJunction ? 15 : 10,
        cursor: "default",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div style={{ minWidth: 0 }}>
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
