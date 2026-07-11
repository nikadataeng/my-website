"use client";

/**
 * ImageMosaic — glossy multi-image grid (2 or 4 up), each tile with
 * its own caption. Used for CDMX spread moments that need more than
 * one photo side by side (Rosetta, Xinu, Casa Azul, Lucha Libre).
 */

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type Tile = { src: string; alt: string; caption?: string; ratio?: "portrait" | "square" | "landscape" };

type Props = {
  tiles: Tile[];
  columns?: 2 | 3 | 4;
  /** Fill the full row width instead of capping each tile's max width. */
  stretch?: boolean;
};

const RATIO: Record<NonNullable<Tile["ratio"]>, string> = {
  portrait: "3 / 4",
  square: "1 / 1",
  landscape: "4 / 3",
};

export default function ImageMosaic({ tiles, columns = 2, stretch = false }: Props) {
  const reduceMotion = useReducedMotion();
  const maxTile = columns === 4 ? 260 : 340;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: stretch
          ? `repeat(${columns}, 1fr)`
          : `repeat(${columns}, minmax(140px, ${maxTile}px))`,
        gap: "1rem",
      }}
    >
      {tiles.map((tile, i) => (
        <motion.figure
          key={tile.src + i}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
          style={{ margin: 0 }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: RATIO[tile.ratio ?? "portrait"],
              overflow: "hidden",
              background: "var(--color-surface)",
            }}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes={stretch ? `${Math.ceil(100 / columns)}vw` : `${maxTile}px`}
              style={{ objectFit: "cover", filter: "contrast(1.03) saturate(1.02)" }}
            />
          </div>
          {tile.caption && (
            <figcaption
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                color: "var(--color-muted)",
                marginTop: "0.5rem",
              }}
            >
              {tile.caption}
            </figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
