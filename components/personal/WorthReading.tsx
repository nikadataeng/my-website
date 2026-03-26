"use client";

import Link from "next/link";
import ScrollReveal from "../ScrollReveal";

const articles = [
  {
    title: "The Most Important Thing I've Learned About High Agency",
    author: "George Mack",
    source: "georgemack.com",
    href: "https://www.georgemack.com/2021/02/high-agency/",
    blurb: "High agency is the ability to find a way around constraints. Ask 'how could I make this happen?' rather than accepting no as a final answer.",
  },
  {
    title: "The Bitter Lesson",
    author: "Rich Sutton",
    source: "incompleteideas.net",
    href: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
    blurb: "General methods that leverage computation always win. A lesson the AI field keeps having to re-learn.",
  },
  {
    title: "You and Your Research",
    author: "Richard Hamming",
    source: "Bell Labs Lecture, 1986",
    href: "https://www.cs.virginia.edu/~robins/YouAndYourResearch.html",
    blurb: "What separates people who do great work from people who do merely good work.",
  },
];

export default function WorthReading() {
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
                The Reading List
              </span>
            </div>
            <h2 className="text-section" style={{ color: "var(--color-ink)" }}>
              Worth your time.
            </h2>
          </div>
        </ScrollReveal>

        {/* Articles */}
        <div>
          {articles.map(({ title, author, source, href, blurb }, i) => (
            <ScrollReveal key={title} delay={i * 0.07}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-8"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">

                  {/* Number */}
                  <span
                    className="text-label md:col-span-1"
                    style={{ color: "var(--color-accent)", paddingTop: "3px" }}
                  >
                    0{i + 1}
                  </span>

                  {/* Title + author */}
                  <div className="md:col-span-4">
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontStyle: "italic",
                        fontSize: "clamp(18px, 1.8vw, 22px)",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                        lineHeight: 1.3,
                        transition: "color 150ms ease",
                      }}
                      className="group-hover:text-[#C8F135]"
                    >
                      {title}
                    </h3>
                    <p
                      className="text-label mt-2"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {author} · {source}
                    </p>
                  </div>

                  {/* Blurb */}
                  <p
                    className="md:col-span-6 md:col-start-7"
                    style={{
                      fontSize: "15px",
                      color: "var(--color-muted)",
                      lineHeight: 1.7,
                    }}
                  >
                    {blurb}
                  </p>

                  {/* Arrow */}
                  <span
                    className="hidden md:block md:col-span-1 text-right group-hover:translate-x-1 transition-transform"
                    style={{ color: "var(--color-accent)", fontSize: "20px" }}
                  >
                    →
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} />
        </div>

      </div>
    </section>
  );
}
