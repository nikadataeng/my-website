"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/#work",  label: "work"  },
  { href: "/blog",   label: "blog"  },
  { href: "/about",  label: "about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        style={{ borderBottom: "1px solid var(--color-border)" }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Name */}
          <Link
            href="/"
            className="font-bold text-sm tracking-tight"
            style={{ color: "var(--color-ink)" }}
          >
            ayonika
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="link-underline text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="https://www.linkedin.com/in/ayonikabose/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="linkedin-icon"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </Link>
            <Link
              href="mailto:hello@ayonika.dev"
              className="text-sm font-medium"
              style={{ color: "var(--color-accent)" }}
            >
              say hello →
            </Link>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-full bg-current origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-full bg-current"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-full bg-current origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-5xl font-800"
                    style={{
                      fontSize: "48px",
                      fontWeight: 800,
                      color: "var(--color-ink)",
                    }}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: links.length * 0.06 }}
              >
                <Link
                  href="mailto:hello@ayonika.dev"
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "var(--color-accent)",
                  }}
                >
                  say hello →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
