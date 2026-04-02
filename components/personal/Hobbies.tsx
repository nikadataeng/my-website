"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

const obsessions = [
  {
    tag: "THE UNIVERSE",
    title: "Space.",
    desc: "Orbital mechanics. James Webb images. The cosmos is the original algorithm and I am obsessed.",
    image: "/images/hobby-featured.svg",
    wide: true,
  },
  {
    tag: "HOME BASE",
    title: "The Girls.",
    desc: "Two cats. Zero respect for my sleep schedule. Absolute rulers of the apartment.",
    image: null,
    wide: false,
  },
  {
    tag: "SLOW CRAFT",
    title: "Ceramics.",
    desc: "Making things with my hands while my brain runs inference. Clay therapy, essentially.",
    image: null,
    wide: false,
  },
  {
    tag: "ARRANGEMENT",
    title: "Ikebana.",
    desc: "The Japanese art of flower arrangement. Minimalism, intention, and knowing when to stop.",
    image: null,
    wide: false,
  },
  {
    tag: "IRL SPORT",
    title: "Table Tennis.",
    desc: "Yes it's a real sport. No I will not be taking questions at this time.",
    image: null,
    wide: false,
  },
  {
    tag: "ALWAYS LOGGED ON",
    title: "The Internet.",
    desc: "TikTok rabbit holes. GitHub at 2am. Discord servers for niche things. Terminally, chronically, proudly online.",
    image: null,
    wide: false,
  },
];

export default function Hobbies() {
  return (
    <section
      id="life"
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
              <Image
                src="/images/hobby-featured.svg"
                alt="Labubu collection"
                fill
                style={{ objectFit: "cover" }}
              />
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
                  fontWeight: 700,
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

        {/* ── Regular grid — 3 cols ── */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid var(--color-border)", borderTop: "none" }}
        >
          {obsessions.slice(1).map(({ tag, title, desc }, i) => (
            <ScrollReveal key={tag} delay={i * 0.06}>
              <motion.div
                className="p-7 md:p-8 h-full"
                style={{
                  background: "var(--color-bg)",
                  borderRight: i % 3 !== 2 ? "1px solid var(--color-border)" : undefined,
                  borderBottom: i < 3 ? "1px solid var(--color-border)" : undefined,
                }}
                whileHover={{ background: "var(--color-surface)" }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-label block mb-4"
                  style={{ color: "var(--color-accent)" }}
                >
                  {tag}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(20px, 2vw, 26px)",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                    lineHeight: 1.1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--color-muted)",
                    lineHeight: 1.75,
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
