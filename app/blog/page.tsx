"use client";

/**
 * Essays — issue-style table of contents. No cards: number, serif title,
 * one-line deck, small-caps date. Each row links out to the published piece.
 */

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

import postsData from "@/content/blog/posts.json";

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
  image: string;
  source: string;
}

const posts: BlogPost[] = postsData;

export default function BlogPage() {
  return (
    <section
      className="px-6 md:px-12 lg:px-20"
      style={{
        paddingTop: "clamp(48px, 8vh, 100px)",
        paddingBottom: "clamp(48px, 8vh, 100px)",
        minHeight: "calc(100vh - 56px)",
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header — section opener with 4px ink rule */}
        <ScrollReveal>
          <div
            style={{
              borderTop: "4px solid var(--ink-display)",
              paddingTop: "1rem",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <span className="text-label" style={{ color: "var(--color-accent)" }}>
              Essays
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Published elsewhere
            </span>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-hero)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--ink-display)",
              margin: "1.5rem 0 clamp(32px, 5vh, 56px)",
            }}
          >
            Things I&apos;ve written.
          </h1>
        </ScrollReveal>

        {/* Index */}
        <div>
          {posts.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.08 }}
              className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr] gap-x-4 md:gap-x-8 py-8"
              style={{
                display: "grid",
                textDecoration: "none",
                color: "inherit",
                borderTop: "1px solid var(--color-border)",
              }}
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
              <span>
                <span
                  className="text-label block"
                  style={{ color: "var(--color-muted)", marginBottom: "0.4rem" }}
                >
                  {post.source} · {post.date}
                </span>
                <span
                  className="link-underline"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(22px, 2.6vw, 32px)",
                    fontWeight: 500,
                    color: "var(--ink-display)",
                    lineHeight: 1.2,
                    display: "inline",
                  }}
                >
                  {post.title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    fontSize: "clamp(15px, 1.5vw, 18px)",
                    color: "var(--color-muted)",
                    lineHeight: 1.6,
                    marginTop: "0.5rem",
                    maxWidth: "60ch",
                  }}
                >
                  {post.description}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
