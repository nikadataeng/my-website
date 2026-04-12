"use client";

interface HighlightBubbleProps {
  text: string;
  rotation: number;
  className: string;
  style?: React.CSSProperties;
}

/**
 * Small floating frosted-glass callout bubble.
 * Appears near a milestone card with a slight rotation.
 * Starts invisible — GSAP controls the reveal.
 */
export default function HighlightBubble({ text, rotation, className, style }: HighlightBubbleProps) {
  return (
    <div
      className={`${className} hidden md:block`}
      style={{
        position: "absolute",
        opacity: 0,
        transform: `rotate(${rotation}deg)`,
        maxWidth: 170,
        padding: "7px 12px",
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(12px) saturate(160%)",
        WebkitBackdropFilter: "blur(12px) saturate(160%)",
        border: "1px solid rgba(255, 255, 255, 0.45)",
        borderRadius: 10,
        boxShadow: "0 4px 16px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)",
        zIndex: 18,
        pointerEvents: "none",
        willChange: "transform, opacity",
        ...style,
      }}
    >
      <p
        style={{
          fontFamily: "'Inter', var(--font-sans), sans-serif",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--color-ink, #4A4440)",
          lineHeight: 1.4,
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </p>
    </div>
  );
}
