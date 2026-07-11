"use client";

/**
 * FridaMotif — a faint line-sketch nod to Casa Azul: a five-petal
 * bloom and an ear of corn peeling open, both recurring motifs in
 * Frida Kahlo's garden and still-life paintings. Decorative only.
 */

type Props = {
  style?: React.CSSProperties;
  className?: string;
  size?: number;
};

export default function FridaMotif({ style, className, size = 260 }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 260 260"
      width={size}
      height={size}
      className={className}
      style={{
        position: "absolute",
        opacity: 0.16,
        pointerEvents: "none",
        color: "var(--color-accent)",
        ...style,
      }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Five-petal bloom */}
      <g transform="translate(75 70)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-22"
            rx="12"
            ry="20"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="7" />
        <path d="M0 32 C -4 55, -2 70, 0 92" />
        <path d="M0 55 C -14 58, -20 66, -22 76" />
      </g>

      {/* Ear of corn, husk peeling open */}
      <g transform="translate(178 148)">
        <ellipse cx="0" cy="0" rx="20" ry="46" />
        {[-24, -8, 8, 24].map((y) =>
          [-10, 0, 10].map((x) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="currentColor" stroke="none" />
          ))
        )}
        <path d="M-18 30 C -34 44, -40 66, -30 88" />
        <path d="M0 44 C 0 64, 4 78, 10 92" />
        <path d="M18 30 C 32 42, 36 62, 28 84" />
      </g>
    </svg>
  );
}
