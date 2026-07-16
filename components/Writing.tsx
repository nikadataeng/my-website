"use client";

/**
 * Writing — OpenAI "Recent news" grid: square thumbnail, title, source + date.
 * Used on the homepage (below About) and reused on /blog for the full list.
 */

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import postsData from "@/content/blog/posts.json";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const GRADIENTS = ["news-thumb--g1", "news-thumb--g2", "news-thumb--g3", "news-thumb--g4"];

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

export default function Writing({
  limit,
  showViewAll = false,
}: {
  /** Cap the number of posts shown. Omit to show all. */
  limit?: number;
  /** Show a "View all" link to /blog in the header. */
  showViewAll?: boolean;
}) {
  const items = limit ? posts.slice(0, limit) : posts;

  return (
    <section
      id="writing"
      className="px-6 md:px-12 lg:px-20 py-24 md:py-36"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "0.5rem",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "1.5rem",
              marginBottom: "clamp(32px, 5vh, 56px)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                fontWeight: 700,
                color: "var(--ink-display)",
              }}
            >
              Things I&apos;ve written
            </h2>
            {showViewAll ? (
              <Link href="/blog" className="text-label link-underline" style={{ color: "var(--color-muted)" }}>
                View all
              </Link>
            ) : (
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                Published elsewhere
              </span>
            )}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {items.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              className="flex items-center gap-5"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                className={`news-thumb ${GRADIENTS[i % GRADIENTS.length]}`}
                style={{
                  width: 96,
                  height: 96,
                  ...(post.image
                    ? { backgroundImage: `url(${post.image})`, background: undefined }
                    : {}),
                }}
              />
              <div>
                <span
                  className="link-underline"
                  style={{
                    display: "block",
                    fontFamily: "var(--font-sans)",
                    fontSize: "17px",
                    fontWeight: 500,
                    color: "var(--ink-display)",
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </span>
                <span
                  className="text-label"
                  style={{ display: "block", marginTop: "0.5rem", color: "var(--color-muted)" }}
                >
                  {post.source} · {post.date}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
