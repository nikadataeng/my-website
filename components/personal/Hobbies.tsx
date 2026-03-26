"use client";

import { motion } from "framer-motion";
import ScrollReveal from "../ScrollReveal";

const obsessions = [
  {
    tag: "COLLECTIBLES",
    title: "Labubu.",
    desc: "The blind box addiction is real. PopMart has my wallet held hostage and I am not even remotely sorry about it.",
    size: "feature", // takes more space
  },
  {
    tag: "THE UNIVERSE",
    title: "Space.",
    desc: "Orbital mechanics. James Webb images. The cosmos is the original algorithm and I am obsessed.",
    size: "regular",
  },
  {
    tag: "HOME BASE",
    title: "The Girls.",
    desc: "Two cats. Zero respect for my sleep schedule. Absolute rulers of the apartment.",
    size: "regular",
  },
  {
    tag: "ALWAYS LOGGED ON",
    title: "The Internet.",
    desc: "TikTok rabbit holes. GitHub at 2am. Discord servers for niche things. Terminally, chronically, proudly online.",
    size: "regular",
  },
  {
    tag: "SLOW CRAFT",
    title: "Ceramics & Ikebana.",
    desc: "Making things with my hands while my brain runs inference. Clay therapy, essentially.",
    size: "regular",
  },
  {
    tag: "IRL SPORT",
    title: "Table Tennis.",
    desc: "Yes it's a real sport. No I will not be taking questions at this time.",
    size: "regular",
  },
];

export default function Hobbies() {
  return (
    <section
      className="px-6 md:px-12 lg:px-20"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        paddingTop: "var(--section-gap)",
        paddingBottom: "var(--section-gap)",
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <ScrollReveal>
          <div className="mb-14">
            <div
              className="mb-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1rem" }}
            >
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                Currently Obsessing Over
              </span>
            </div>
            <h2
              className="text-section"
              style={{ color: "var(--color-ink)" }}
            >
              Obsessions.
            </h2>
          </div>
        </ScrollReveal>

        {/* Feature card — Labubu gets a full-width spotlight */}
        <ScrollReveal>
          <motion.div
            className="mb-6 p-8 md:p-12 group"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "default",
            }}
            whileHover={{ borderColor: "var(--color-accent)" }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <span
                  className="text-label block mb-6"
                  style={{ color: "var(--color-accent)" }}
                >
                  {obsessions[0].tag}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(48px, 6vw, 80px)",
                    fontWeight: 900,
                    color: "var(--color-ink)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {obsessions[0].title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "17px",
                  color: "var(--color-muted)",
                  lineHeight: 1.7,
                  maxWidth: "420px",
                }}
              >
                {obsessions[0].desc}
              </p>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Regular grid — 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {obsessions.slice(1).map(({ tag, title, desc }, i) => (
            <ScrollReveal key={tag} delay={i * 0.06}>
              <motion.div
                className="p-6 md:p-8 h-full group"
                style={{ background: "#000", cursor: "default" }}
                whileHover={{ background: "rgba(200,241,53,0.04)" }}
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
                    fontSize: "clamp(22px, 2.5vw, 30px)",
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
                    lineHeight: 1.7,
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
