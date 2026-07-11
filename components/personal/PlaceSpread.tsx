"use client";

/**
 * PlaceSpread — full-bleed splash spread for a place feature (mirrors
 * FoodSpread's treatment): a hero row of two big photos, a supporting
 * row of smaller ones beneath, each with its own caption directly
 * under the frame. All tiles assume portrait (3:4) source photos.
 */

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

type Photo = { src: string; alt: string; caption: string };

type Props = {
  hero: Photo[];
  supporting: Photo[];
  kicker?: string;
  headline?: string;
};

function Tile({ photo, flex, priority }: { photo: Photo; flex: number; priority?: boolean }) {
  return (
    <figure style={{ margin: 0, flex: `${flex} 1 0`, minWidth: 0 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "var(--color-bg)",
          boxShadow: priority ? "0 10px 30px rgba(0,0,0,0.12)" : "none",
        }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 900px) 45vw, 420px"
          priority={priority}
          style={{ objectFit: "cover", filter: "contrast(1.03) saturate(1.03)" }}
        />
      </div>
      <figcaption
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          color: "var(--color-muted)",
          marginTop: "0.6rem",
        }}
      >
        {photo.caption}
      </figcaption>
    </figure>
  );
}

export default function PlaceSpread({ hero, supporting, kicker, headline }: Props) {
  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        marginTop: "2rem",
        marginBottom: "1rem",
        background: "var(--color-surface)",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        {kicker && (
          <p className="text-label" style={{ color: "var(--color-accent)", marginBottom: "0.75rem" }}>
            {kicker}
          </p>
        )}
        {headline && (
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(30px, 4.5vw, 52px)",
              color: "var(--color-ink)",
              marginBottom: "2rem",
            }}
          >
            {headline}
          </h3>
        )}

        <ScrollReveal>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
            {hero.map((photo, i) => (
              <Tile key={photo.src} photo={photo} flex={1} priority={i === 0} />
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div style={{ display: "flex", gap: "0.85rem" }}>
            {supporting.map((photo) => (
              <Tile key={photo.src} photo={photo} flex={0.72} />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
