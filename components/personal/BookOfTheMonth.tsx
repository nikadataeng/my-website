"use client";

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

const book = {
  title: "Project Hail Mary",
  author: "Andy Weir",
  year: "2021",
  genre: "Science Fiction",
  coverPlaceholder: "/images/book-cover.svg",
  pullQuote:
    '"I\'m pretty sure this is a one-way trip. But if I can save Earth, it\'s worth it."',
  review: `If you loved The Martian, this is Andy Weir turning the dial up to interstellar. A lone astronaut wakes up with no memory, millions of miles from home, and the fate of humanity resting on his shoulders. It's funny, it's gripping, and the friendship at the heart of it is one of the best I've read in sci-fi. Perfect for the space nerd in me.`,
  readingStatus: "Currently Reading",
  month: "April 2026",
  rating: 5,
};

export default function BookOfTheMonth() {
  return (
    <section
      id="culture"
      style={{
        background: "var(--color-surface)",
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
              Culture: Books
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              {book.month}
            </span>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* ── Book cover ── */}
          <ScrollReveal className="lg:col-span-3">
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 280,
                aspectRatio: "2 / 3",
                overflow: "hidden",
                boxShadow: "4px 4px 24px rgba(0,0,0,0.12), 0 0 0 1px var(--color-border)",
              }}
            >
              <Image
                src={book.coverPlaceholder}
                alt={`Cover of ${book.title}`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            {/* Rating */}
            <div className="mt-4 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "14px",
                    color: i < book.rating ? "var(--color-accent)" : "var(--color-border)",
                  }}
                >
                  ★
                </span>
              ))}
              <span
                className="text-label ml-2"
                style={{ color: "var(--color-muted)" }}
              >
                {book.readingStatus}
              </span>
            </div>
          </ScrollReveal>

          {/* ── Review column ── */}
          <ScrollReveal className="lg:col-span-9" delay={0.1}>
            <p
              className="text-label"
              style={{ color: "var(--color-muted)", marginBottom: "0.5rem" }}
            >
              {book.genre} &nbsp;·&nbsp; {book.author}, {book.year}
            </p>

            <h2
              className="text-section"
              style={{ marginBottom: "1.75rem" }}
            >
              {book.title}
            </h2>

            {/* Pullquote — thin rules top/bottom, VF style */}
            <blockquote className="pullquote-block">
              <p className="text-pullquote">
                {book.pullQuote}
              </p>
              <footer
                className="text-label mt-3"
                style={{ color: "var(--color-muted)" }}
              >
                , {book.title}
              </footer>
            </blockquote>

            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                color: "var(--color-ink)",
                lineHeight: 1.85,
                maxWidth: "65ch",
              }}
            >
              {book.review}
            </p>

            {/* Byline — VF format: italic "By" + bold all-caps name */}
            <div
              className="flex items-center gap-3 mt-8"
              style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1rem" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "var(--color-muted)",
                }}
              >
                By
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--color-ink)",
                }}
              >
                Nika
              </span>
              <span style={{ color: "var(--color-border)" }}>·</span>
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                {book.month}
              </span>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
