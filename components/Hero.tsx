"use client";

/**
 * Hero — career cover, "The Profile Issue."
 * Editorial cover treatment shared with the personal view (ed-cover classes);
 * same masthead logic, navy accent, career cover lines.
 */

import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const COVER_LINES = [
  { roman: "I",   kicker: "Profile",  href: "#about",   title: "The Engineer Who Replaces Software" },
  { roman: "II",  kicker: "Ascent",   href: "#journey", title: "Minneapolis to San Francisco, in Five Peaks" },
  { roman: "III", kicker: "Systems",  href: "#systems", title: "Anatomy of a Multi-Agent Stack" },
  { roman: "IV",  kicker: "Features", href: "#work",    title: "The Work: Built, Shipped, Replaced" },
  { roman: "V",   kicker: "Opinion",  href: "#pov",     title: "You're Just Renting the Logic" },
];

function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 56;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Hero() {
  return (
    <section className="ed-page ed-page--bleed ed-cover" data-screen-label="01 Cover">
      {/* ── LEFT PANE ── */}
      <div className="ed-cover__left">
        {/* Masthead */}
        <motion.div
          className="ed-cover__masthead"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="ed-cover__masthead-title">The Profile Issue</span>
          <div className="ed-cover__masthead-meta">
            <span>Vol. I · Issue 01</span>
            <span>Spring 2026</span>
            <span>San Francisco</span>
          </div>
        </motion.div>

        {/* Cover-story stack */}
        <div className="ed-cover__stack">
          <motion.div
            className="ed-cover__kicker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <span className="ed-cover__kicker-mark">¶</span>
            <span>Cover Story</span>
          </motion.div>

          <motion.h1
            className="ed-cover__name"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EASE, delay: 0.25 }}
          >
            <span className="ed-cover__name-first">Ayonika</span>
            <span className="ed-cover__name-last">Bose.</span>
          </motion.h1>

          <motion.p
            className="ed-cover__alias"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            AI Applications Engineer
          </motion.p>

          <motion.p
            className="ed-cover__deck"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
          >
            Builds AI systems that replace software — multi-agent applications
            on the modern data stack, at Sigma Computing.
          </motion.p>
        </div>

        {/* Cover lines */}
        <motion.nav
          className="ed-cover__lines"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
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
        transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
      >
        <Image
          src="/images/headshot.png"
          alt="Editorial portrait of Ayonika Bose"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "50% 20%" }}
        />
        <div className="ed-cover__overlay" aria-hidden />

        {/* Faux barcode */}
        <div className="ed-cover__barcode" aria-hidden>
          <div className="ed-cover__barcode-bars">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <div className="ed-cover__barcode-label">PR · 26 · 01</div>
        </div>

        {/* Caption */}
        <div className="ed-cover__caption">
          <p className="ed-cover__caption-quote">
            &ldquo;👀 ×12, the week this shipped internally.&rdquo;
          </p>
          <p className="ed-cover__caption-meta">
            As seen on Slack · Sigma Computing · 2026
          </p>
        </div>
      </motion.div>
    </section>
  );
}
