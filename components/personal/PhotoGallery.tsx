"use client";

/**
 * PhotoGallery — full grid of images with captions, editorial style.
 * Everything is visible at once; no horizontal scroll to discover.
 */

import Image from "next/image";

type GalleryItem = { src: string; caption: string };

type Props = {
  items: GalleryItem[];
  label?: string;
};

export default function PhotoGallery({ items, label = "Gallery" }: Props) {
  return (
    <div style={{ marginTop: "2.5rem" }}>
      {label && (
        <p
          className="text-label"
          style={{ color: "var(--color-muted)", marginBottom: "1rem" }}
        >
          {label}
        </p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "0.85rem",
        }}
      >
        {items.map((item, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                overflow: "hidden",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 640px) 45vw, 220px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <figcaption
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                color: "var(--color-muted)",
                marginTop: "0.5rem",
              }}
            >
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
