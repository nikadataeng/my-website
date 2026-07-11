"use client";

import ScrollReveal from "../ScrollReveal";
import FridaMotif from "./FridaMotif";

const CREDITS: Array<{ heading: string; rows: Array<{ label: string; value: string }> }> = [
  {
    heading: "Masthead",
    rows: [
      { label: "Editor",      value: "Ayonika Bose" },
      { label: "Words",       value: "Ayonika Bose" },
      { label: "Photography", value: "Ayonika Bose" },
    ],
  },
  {
    heading: "House style",
    rows: [
      { label: "Type",   value: "Cormorant Garamond · Inter" },
      { label: "Accent", value: "Burgundy · Shilajit" },
      { label: "Paper",  value: "Warm cream, no texture" },
    ],
  },
  {
    heading: "Plant",
    rows: [
      { label: "Built with", value: "Next.js · Tailwind · Framer Motion" },
      { label: "Hosted on",  value: "Vercel" },
      { label: "Refreshed",  value: "Summer 2026" },
    ],
  },
];

export default function Colophon() {
  return (
    <section
      id="colophon"
      className="ed-page ed-colophon"
      data-screen-label="08 Colophon"
      style={{ position: "relative" }}
    >
      <FridaMotif style={{ top: "1rem", right: "-1rem" }} />

      <div className="ed-folio">
        <span>Colophon · Vol. I · Issue 02</span>
        <span>¶ Summer 2026</span>
      </div>

      <ScrollReveal>
        <div className="ed-colophon__head">
          <p className="ed-colophon__ornament" aria-hidden>¶ ✦ ◆ §</p>
          <p className="ed-colophon__label">The Life of Nika · Vol. I · Issue 02</p>
          <h2 className="ed-colophon__title">The Life of Nika</h2>
          <p className="ed-colophon__deck">
            A seasonal magazine of one — written, photographed, edited, and
            (mostly) believed by its subject.
          </p>
        </div>
      </ScrollReveal>

      <dl className="ed-colophon__credits">
        {CREDITS.map((group, i) => (
          <ScrollReveal key={group.heading} delay={i * 0.08} className="ed-colophon__group">
            <p className="ed-colophon__group-heading">{group.heading}</p>
            <div className="ed-colophon__group-body">
              {group.rows.map(({ label, value }) => (
                <div key={label} className="ed-colophon__row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </div>
          </ScrollReveal>
        ))}
      </dl>

      <ScrollReveal delay={0.3}>
        <p className="ed-colophon__signoff">Until fall. —N.</p>
      </ScrollReveal>

      <div className="ed-page-num">08</div>
    </section>
  );
}
