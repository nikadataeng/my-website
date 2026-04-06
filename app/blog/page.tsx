"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedRule from "@/components/AnimatedRule";

const springEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface BlogPost {
  title: string;
  description: string;
  date: string;
  author: string;
  url: string;
  image: string;
  source: string;
}

const posts: BlogPost[] = [
  {
    title: "How Snowflake's Connector for Google Analytics Centralizes Marketing Data",
    description:
      "How Snowflake's connector for Google Analytics raw data solved the challenge of migrating from Universal Analytics to GA4 — addressing data sampling limitations with a unified approach to granular marketing data.",
    date: "Feb 8, 2024",
    author: "Ayonika Bose",
    url: "https://www.sigmacomputing.com/blog/how-snowflakes-connector-for-google-analytics-got-sigma-all-our-raw-data",
    image: "https://cdn.prod.website-files.com/666bbba4ff7240a20f4cccf8/67042b77b3d8d057467bb6b6_666bbba4ff7240a20f4ce9dd_image2.avif",
    source: "Sigma Computing Blog",
  },
];

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
        {/* Header */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>Writing</span>
        </ScrollReveal>
        <div style={{ margin: "12px 0 16px", maxWidth: 200 }}>
          <AnimatedRule />
        </div>
        <ScrollReveal delay={0.1}>
          <h1 className="text-section" style={{ marginBottom: "clamp(32px, 5vh, 56px)" }}>
            Things I&apos;ve written.
          </h1>
        </ScrollReveal>

        {/* Blog posts */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {posts.map((post, i) => (
            <motion.a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: springEase, delay: 0.2 + i * 0.1 }}
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: 16,
                overflow: "hidden",
                transition: "transform 200ms ease, box-shadow 200ms ease",
              }}
              className="card-lift"
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: 0,
                  paddingBottom: "50%",
                  overflow: "hidden",
                  background: "var(--color-border)",
                }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 800px"
                  unoptimized
                />
              </div>

              {/* Content */}
              <div style={{ padding: "24px 28px" }}>
                {/* Source + Date */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                    }}
                  >
                    {post.source}
                  </span>
                  <span style={{ color: "var(--color-border)", fontSize: 11 }}>·</span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--color-muted)",
                    }}
                  >
                    {post.date}
                  </span>
                </div>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: 500,
                    color: "var(--color-ink)",
                    lineHeight: 1.25,
                    margin: "0 0 10px",
                  }}
                >
                  {post.title}
                </h2>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "var(--color-muted)",
                    lineHeight: 1.6,
                    margin: "0 0 14px",
                  }}
                >
                  {post.description}
                </p>

                {/* Read link */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "var(--color-accent)",
                  }}
                >
                  Read on {post.source} →
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
