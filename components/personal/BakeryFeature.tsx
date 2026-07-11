"use client";

/**
 * BakeryFeature — landscape signage shot runs as a header (the way
 * a real bakery feature would open), then the interior/food shots
 * fall below sized to their own native orientation: portraits stay
 * tall and narrow, the landscape spread shot stays wide.
 */

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";
import EditorialImage from "../EditorialImage";

type Photo = { src: string; alt: string; caption: string };

type Props = {
  header: Photo;
  portraits: Photo[];
  landscape: Photo;
};

export default function BakeryFeature({ header, portraits, landscape }: Props) {
  return (
    <div style={{ marginTop: "1.75rem" }}>
      <ScrollReveal variant="scale-up">
        <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}>
          <Image
            src={header.src}
            alt={header.alt}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            priority
            style={{ objectFit: "cover", filter: "contrast(1.03) saturate(1.03)" }}
          />
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            color: "var(--color-muted)",
            marginTop: "0.6rem",
          }}
        >
          {header.caption}
        </p>
      </ScrollReveal>

      <div className="flex flex-col sm:flex-row" style={{ gap: "1rem", marginTop: "1.5rem" }}>
        {portraits.map((p, i) => (
          <ScrollReveal key={p.src} delay={i * 0.08} style={{ flex: "1 1 0", minWidth: 0 }}>
            <EditorialImage
              src={p.src}
              alt={p.alt}
              ratio="portrait"
              caption={p.caption}
              sizes="(max-width: 640px) 90vw, 280px"
            />
          </ScrollReveal>
        ))}
        <ScrollReveal delay={portraits.length * 0.08} style={{ flex: "1.6 1 0", minWidth: 0 }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}>
            <Image
              src={landscape.src}
              alt={landscape.alt}
              fill
              sizes="(max-width: 640px) 90vw, 440px"
              style={{ objectFit: "cover", filter: "contrast(1.03) saturate(1.03)" }}
            />
          </div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              color: "var(--color-muted)",
              marginTop: "0.6rem",
            }}
          >
            {landscape.caption}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
