"use client";

import ScrollReveal from "../ScrollReveal";

const ENTRIES = [
  {
    roman:     "¶",
    ornament:  "¶",
    kicker:    "Letter",
    title:     "A letter, between issues",
    deck:      "Nika, on slowing down enough to write the season instead of just living it.",
    page:      "06",
    href:      "#letter",
  },
  {
    roman:     "I",
    ornament:  "¶",
    kicker:    "Travel",
    title:     "Soccer Interrupted Our Shopping Weekend",
    deck:      "FIFA fever, Casa Azul, and a Pujol tasting menu — five days in Mexico City.",
    page:      "10",
    href:      "#travel",
  },
  {
    roman:     "II",
    ornament:  "✦",
    kicker:    "Culture",
    title:     "What She's Reading This Month",
    deck:      "The book on the nightstand, the pull-quote in the margin.",
    page:      "18",
    href:      "#culture",
  },
  {
    roman:     "III",
    ornament:  "◆",
    kicker:    "Life",
    title:     "Currently Obsessing Over",
    deck:      "Hobbies, small joys, the things that take up the corners of the day.",
    page:      "22",
    href:      "#life",
  },
  {
    roman:     "IV",
    ornament:  "§",
    kicker:    "Reading",
    title:     "Worth Your Time",
    deck:      "The curated list — essays and articles she keeps coming back to.",
    page:      "28",
    href:      "#reading",
  },
];

function scrollToHash(hash: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(hash);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 56;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Contents() {
  return (
    <section
      id="contents"
      className="ed-page ed-contents"
      data-screen-label="02 Contents"
    >
      <div className="ed-folio">
        <span>The Life of Nika · Contents</span>
        <span>¶ Summer 2026</span>
      </div>

      <ScrollReveal>
        <header className="ed-contents__header">
          <p className="ed-contents__kicker">¶ Table of Contents</p>
          <h2 className="ed-contents__title">In this issue.</h2>
          <p className="ed-contents__deck">
            Five entries, one season — read straight through, or pick a page.
          </p>
        </header>
      </ScrollReveal>

      <ol className="ed-toc">
        {ENTRIES.map((entry, i) => (
          <ScrollReveal key={entry.href} delay={i * 0.06}>
            <li className="ed-toc__row">
              <a
                href={entry.href}
                className="ed-toc__link"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(entry.href);
                }}
              >
                <span className="ed-toc__roman">{entry.roman}</span>
                <span className="ed-toc__kicker">
                  <span className="ed-toc__ornament" aria-hidden>{entry.ornament}</span>
                  {entry.kicker}
                </span>
                <span className="ed-toc__title">{entry.title}</span>
                <span className="ed-toc__deck">{entry.deck}</span>
                <span className="ed-toc__page">{entry.page}</span>
              </a>
            </li>
          </ScrollReveal>
        ))}
      </ol>

      <div className="ed-page-num">02</div>
    </section>
  );
}
