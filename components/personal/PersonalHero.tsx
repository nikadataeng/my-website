"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PersonalHero() {
  return (
    <section
      style={{
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* ── Masthead bar ── */}
      <div
        style={{
          borderBottom: "3px solid var(--color-ink)",
          padding: "0.6rem 0",
        }}
      >
        <div
          className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto flex items-center justify-between"
        >
          <motion.span
            className="text-label"
            style={{ color: "var(--color-muted)", letterSpacing: "0.22em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            The Life of Nika
          </motion.span>
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Vol. I
            </span>
            <span
              style={{
                width: 1,
                height: 10,
                background: "var(--color-border)",
                display: "inline-block",
              }}
            />
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Spring 2026
            </span>
            <span
              style={{
                width: 1,
                height: 10,
                background: "var(--color-border)",
                display: "inline-block",
              }}
            />
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              SF · NYC
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Hero spread ── */}
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left: big editorial headline ── */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              {/* Kicker */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 28,
                    height: 2,
                    background: "var(--color-accent)",
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-label"
                  style={{ color: "var(--color-accent)", letterSpacing: "0.22em" }}
                >
                  Cover Story
                </span>
              </motion.div>

              {/* Name headline */}
              <motion.h1
                className="text-hero"
                style={{ lineHeight: 0.9, marginBottom: "1.5rem" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.1 }}
              >
                Ayonika
              </motion.h1>
              <motion.h1
                className="text-hero"
                style={{
                  lineHeight: 0.9,
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "clamp(28px, 4vw, 56px)",
                  letterSpacing: "0.02em",
                  marginBottom: "2rem",
                  color: "var(--color-muted)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 0.2 }}
              >
                &ldquo;Nika&rdquo;
              </motion.h1>

              {/* Deck / subtitle */}
              <motion.p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  color: "var(--color-ink)",
                  lineHeight: 1.6,
                  borderLeft: "2px solid var(--color-accent)",
                  paddingLeft: "1.25rem",
                  marginBottom: "2.5rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Applied AI engineer. Space nerd.<br />
                Chronically online. Cat mom ×2.<br />
                Twenty countries and counting.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 pt-8"
              style={{ borderTop: "1px solid var(--color-border)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                { value: "20", label: "Countries" },
                { value: "2", label: "Cats in charge" },
                { value: "∞", label: "Tabs open" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(28px, 3.5vw, 48px)",
                      fontWeight: 300,
                      color: "var(--color-accent)",
                      lineHeight: 1,
                    }}
                  >
                    {value}
                  </p>
                  <p className="text-label mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Center: hero photograph ── */}
          <motion.div
            className="lg:col-span-4 relative"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "4 / 5",
                background: "var(--color-surface)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/hero photo.jpeg"
                alt="Editorial portrait of Nika"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            {/* Photo caption */}
            <p
              className="mt-2 text-label"
              style={{ color: "var(--color-caption, #9A9490)", textAlign: "center" }}
            >
              Ayonika Bose &nbsp;·&nbsp; SF · NYC
            </p>
          </motion.div>

          {/* ── Right: cover lines ── */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-6 lg:pt-2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.5 }}
          >
            <p
              className="text-label"
              style={{
                borderBottom: "1px solid var(--color-border)",
                paddingBottom: "0.5rem",
                marginBottom: "0.25rem",
                color: "var(--color-muted)",
              }}
            >
              In this issue
            </p>

            {[
              { tag: "TRAVEL", href: "#travel", title: "Twenty Countries, One Passport" },
              { tag: "CULTURE", href: "#culture", title: "What She's Reading This Month" },
              { tag: "LIFE", href: "#life", title: "Currently Obsessing Over" },
              { tag: "READING", href: "#reading", title: "Worth Your Time" },
            ].map(({ tag, href, title }) => (
              <a
                key={tag}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  paddingBottom: "0.75rem",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                <span
                  className="text-label"
                  style={{ color: "var(--color-accent)", flexShrink: 0 }}
                >
                  {tag}
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(14px, 1.2vw, 17px)",
                    fontWeight: 400,
                    color: "var(--color-ink)",
                    lineHeight: 1.3,
                    transition: "color 150ms ease",
                  }}
                  className="group-hover:opacity-60"
                >
                  {title}
                </p>
              </a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
