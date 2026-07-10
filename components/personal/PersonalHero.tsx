"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const COVER_LINES = [
  { roman: "¶",   kicker: "Letter",  href: "#letter",  title: "A letter, between issues" },
  { roman: "I",   kicker: "Travel",  href: "#travel",  title: "Twenty Countries, One Passport" },
  { roman: "II",  kicker: "Culture", href: "#culture", title: "What She's Reading This Month" },
  { roman: "III", kicker: "Life",    href: "#life",    title: "Currently Obsessing Over" },
  { roman: "IV",  kicker: "Reading", href: "#reading", title: "Worth Your Time" },
];

function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 56;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function PersonalHero() {
  return (
    <section className="ed-page ed-page--bleed ed-cover" data-screen-label="01 Cover">
      {/* ── LEFT PANE ── */}
      <div className="ed-cover__left">
        {/* Masthead */}
        <motion.div
          className="ed-cover__masthead"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="ed-cover__masthead-title">The Life of Nika</span>
          <div className="ed-cover__masthead-meta">
            <span>Vol. I · Issue 01</span>
            <span>Spring 2026</span>
            <span>SF / NYC</span>
          </div>
        </motion.div>

        {/* Cover-story stack */}
        <div className="ed-cover__stack">
          <motion.div
            className="ed-cover__kicker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          >
            <span className="ed-cover__kicker-mark">¶</span>
            <span>Cover Story</span>
          </motion.div>

          <motion.h1
            className="ed-cover__name"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
          >
            <span className="ed-cover__name-first">Ayonika</span>
            <span className="ed-cover__name-last">Bose.</span>
          </motion.h1>

          <motion.p
            className="ed-cover__alias"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            &ldquo;Nika&rdquo;
          </motion.p>

          <motion.p
            className="ed-cover__deck"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
          >
            An applied AI engineer, a space nerd, a cat mom of two, and a
            chronically online twenty-country traveler — caught between issues.
          </motion.p>
        </div>

        {/* Cover lines */}
        <motion.nav
          className="ed-cover__lines"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
          aria-label="In this issue"
        >
          {COVER_LINES.map(({ roman, kicker, href, title }) => (
            <a
              key={href}
              href={href}
              className="ed-cover__line"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash(href);
              }}
            >
              <span className="ed-cover__line-roman">{roman}</span>
              <span className="ed-cover__line-kicker">{kicker}</span>
              <span className="ed-cover__line-title">{title}</span>
              <span className="ed-cover__line-arrow" aria-hidden>→</span>
            </a>
          ))}
        </motion.nav>
      </div>

      {/* ── RIGHT PANE ── */}
      <motion.div
        className="ed-cover__right"
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        <Image
          src="/images/hero photo.jpeg"
          alt="Editorial portrait of Nika"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "32% 26%" }}
        />
        <div className="ed-cover__overlay" aria-hidden />

        {/* Faux barcode */}
        <div className="ed-cover__barcode" aria-hidden>
          <div className="ed-cover__barcode-bars">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="ed-cover__barcode-label">SP · 26 · 01</div>
        </div>

        {/* Caption */}
        <div className="ed-cover__caption">
          <p className="ed-cover__caption-quote">
            &ldquo;The cover story this season is one I&apos;ve been writing
            quietly all year.&rdquo;
          </p>
          <p className="ed-cover__caption-meta">
            Photographed in San Francisco · Spring 2026
          </p>
        </div>
      </motion.div>
    </section>
  );
}
