"use client";

import { motion } from "framer-motion";
import { useView } from "@/context/ViewContext";

export default function ViewToggle() {
  const { view, setView } = useView();
  const isPersonal = view === "personal";

  return (
    <button
      onClick={() => setView(isPersonal ? "career" : "personal")}
      aria-label={`Switch to ${isPersonal ? "career" : "personal"} view`}
      className="relative flex items-center gap-0 rounded-full shrink-0"
      style={{
        background: isPersonal ? "rgba(255,255,255,0.12)" : "#F2F2F2",
        border: `1px solid ${isPersonal ? "rgba(255,255,255,0.25)" : "#E0E0E0"}`,
        padding: "3px",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.05em",
        cursor: "pointer",
      }}
    >
      {/* Sliding pill */}
      <motion.span
        layout
        layoutId="toggle-pill"
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        style={{
          position: "absolute",
          top: "3px",
          left: isPersonal ? "calc(50% + 3px)" : "3px",
          width: "calc(50% - 3px)",
          height: "calc(100% - 6px)",
          borderRadius: "9999px",
          background: isPersonal ? "#89A89E" : "#FFFFFF",
          boxShadow: isPersonal ? "none" : "0 1px 3px rgba(0,0,0,0.12)",
          zIndex: 0,
        }}
      />
      <span
        style={{
          position: "relative",
          zIndex: 1,
          padding: "4px 12px",
          borderRadius: "9999px",
          color: !isPersonal
            ? "#0A0A0A"
            : isPersonal
            ? "rgba(255,255,255,0.6)"
            : "#6E6E6E",
          transition: "color 200ms ease",
          whiteSpace: "nowrap",
        }}
      >
        Career
      </span>
      <span
        style={{
          position: "relative",
          zIndex: 1,
          padding: "4px 12px",
          borderRadius: "9999px",
          color: isPersonal ? "#0A0A0A" : "#6E6E6E",
          transition: "color 200ms ease",
          whiteSpace: "nowrap",
        }}
      >
        Personal
      </span>
    </button>
  );
}
