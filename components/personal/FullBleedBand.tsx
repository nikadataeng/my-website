"use client";

/**
 * FullBleedBand — full-viewport-width image band with a gradient
 * overlay and a kicker/headline, Condé Nast opener-spread style.
 */

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

type Props = {
  src: string;
  alt: string;
  kicker: string;
  headline: string;
  caption?: string;
  objectPosition?: string;
};

export default function FullBleedBand({
  src,
  alt,
  kicker,
  headline,
  caption,
  objectPosition = "50% 50%",
}: Props) {
  return (
    <ScrollReveal variant="fade-up" margin="-40px">
      <div
        style={{
          position: "relative",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          height: "clamp(320px, 58vh, 620px)",
          overflow: "hidden",
          background: "var(--color-ink)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition,
            filter: "contrast(1.05) saturate(1.02)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 45%, rgba(20,17,14,0.82) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "clamp(1.5rem, 4vw, 3.5rem)",
            color: "#F5F2ED",
          }}
        >
          <span
            className="text-label"
            style={{
              color: "#E4C9B6",
              letterSpacing: "0.14em",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            {kicker}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
              fontSize: "clamp(28px, 5vw, 56px)",
              lineHeight: 1.05,
              maxWidth: "18ch",
              marginBottom: caption ? "0.75rem" : 0,
            }}
          >
            {headline}
          </h2>
          {caption && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(13px, 1.2vw, 15px)",
                color: "#D8D2C8",
                maxWidth: "48ch",
                lineHeight: 1.6,
              }}
            >
              {caption}
            </p>
          )}
        </div>
      </div>
    </ScrollReveal>
  );
}
