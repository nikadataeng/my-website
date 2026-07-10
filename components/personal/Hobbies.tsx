"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

import obsessions from "@/content/personal/hobbies.json";

export default function Hobbies() {
  return (
    <section
      id="life"
      data-screen-label="06 Hobbies"
      style={{
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "var(--section-gap, 100px)",
        paddingBottom: "var(--section-gap, 100px)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* ── Section kicker ── */}
        <ScrollReveal>
          <div
            style={{
              borderTop: "3px solid var(--color-ink)",
              paddingTop: "1rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span className="text-label" style={{ color: "var(--color-accent)" }}>
              Life &amp; Obsessions
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Currently Obsessing Over
            </span>
          </div>
        </ScrollReveal>

        {/* ── Feature card: Labubu with image ── */}
        <ScrollReveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-px"
            style={{
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Image side */}
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                background: "var(--color-surface)",
                overflow: "hidden",
              }}
            >
              {obsessions[0].image && (
                <Image
                  src={obsessions[0].image}
                  alt={obsessions[0].title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
            {/* Text side */}
            <motion.div
              className="p-8 md:p-12 flex flex-col justify-center"
              style={{ background: "var(--color-bg)" }}
              whileHover={{ background: "var(--color-surface)" }}
              transition={{ duration: 0.2 }}
            >
              <span
                className="text-label block mb-5"
                style={{ color: "var(--color-accent)" }}
              >
                {obsessions[0].tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(36px, 4.5vw, 64px)",
                  fontWeight: 300,
                  color: "var(--color-ink)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.02em",
                  marginBottom: "1rem",
                }}
              >
                {obsessions[0].title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  color: "var(--color-muted)",
                  lineHeight: 1.75,
                  maxWidth: "38ch",
                }}
              >
                {obsessions[0].desc}
              </p>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* ── In Rotation — magazine list with hanging numerals ── */}
        <div className="mt-16">
          <ScrollReveal>
            <p
              className="text-label"
              style={{ color: "var(--color-muted)", marginBottom: "1rem" }}
            >
              In Rotation
            </p>
          </ScrollReveal>
          {obsessions.slice(1).map(({ tag, title, desc }, i) => (
            <ScrollReveal key={tag} delay={i * 0.05}>
              <div
                className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_16rem_1fr] gap-x-4 md:gap-x-8 items-baseline py-6"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 300,
                    color: "var(--color-accent)",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 400,
                    color: "var(--ink-display)",
                    lineHeight: 1.15,
                  }}
                >
                  {title}
                </h3>
                <div className="col-start-2 md:col-start-3">
                  <span
                    className="text-label block mb-1"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {tag}
                  </span>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--color-muted)",
                      lineHeight: 1.75,
                      maxWidth: "60ch",
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
