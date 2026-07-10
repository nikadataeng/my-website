"use client";

/**
 * EditorialImage — enforced image treatment for the magazine identity.
 * Portrait (3:4) or spread (16:9) ratios only; grain + contrast lift,
 * optional accent duotone, clip-path unmask on scroll entry, caption line.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Props = {
  src: string;
  alt: string;
  ratio?: "portrait" | "spread";
  duotone?: boolean;
  caption?: string;
  credit?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
};

export default function EditorialImage({
  src,
  alt,
  ratio = "portrait",
  duotone = false,
  caption,
  credit,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 60vw",
  objectPosition = "50% 50%",
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <figure style={{ margin: 0 }}>
      <motion.div
        initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.0, ease: EASE }}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio === "portrait" ? "3 / 4" : "16 / 9",
          overflow: "hidden",
          background: "var(--color-surface)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{
            objectFit: "cover",
            objectPosition,
            filter: "contrast(1.02) saturate(0.96)",
          }}
        />
        {duotone && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--color-accent)",
              mixBlendMode: "multiply",
              opacity: 0.18,
              pointerEvents: "none",
            }}
          />
        )}
        {/* Grain */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.05,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>
      {(caption || credit) && (
        <motion.figcaption
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption, 13px)",
            color: "var(--color-muted)",
            marginTop: "0.6rem",
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "0.5rem",
          }}
        >
          <span>{caption}</span>
          {credit && (
            <span style={{ whiteSpace: "nowrap", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 10 }}>
              {credit}
            </span>
          )}
        </motion.figcaption>
      )}
    </figure>
  );
}
