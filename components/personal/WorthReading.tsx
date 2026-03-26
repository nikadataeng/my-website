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
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span
            className="block mb-10"
            style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.1em", color: "var(--color-muted)", textTransform: "uppercase" }}
          >
            Worth Reading
          </span>
        </ScrollReveal>

        <div className="space-y-8">
          {articles.map(({ title, author, source, href, blurb }, i) => (
            <ScrollReveal key={title} delay={i * 0.08}>
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div
                  className="p-6 rounded-none"
                  style={{
                    borderLeft: "2px solid var(--color-border)",
                    transition: "border-color 150ms ease",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-accent)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--color-border)")}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-ink)", lineHeight: 1.3 }}>
                        {title}
                      </p>
                      <p style={{ fontSize: "12px", color: "var(--color-muted)", marginTop: "4px", letterSpacing: "0.05em" }}>
                        {author} · {source}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: "18px",
                        color: "var(--color-accent)",
                        flexShrink: 0,
                        transition: "transform 150ms ease",
                      }}
                      className="group-hover:translate-x-1 inline-block"
                    >
                      →
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "var(--color-muted)", marginTop: "8px", lineHeight: 1.6 }}>
                    {blurb}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
