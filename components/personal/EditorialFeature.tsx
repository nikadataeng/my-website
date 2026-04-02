"use client";

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

const countries = [
  { name: "Japan", note: "Cherry blossoms & vending machine everything" },
  { name: "India", note: "Where the chaos is the point" },
  { name: "Thailand", note: "Best pad thai, no debate" },
  { name: "South Korea", note: "K-beauty, K-food, K-everything" },
  { name: "Singapore", note: "The most orderly city I've ever loved" },
  { name: "Vietnam", note: "Hạ Long Bay at sunrise" },
  { name: "UK", note: "London fog and the Tate Modern" },
  { name: "Mexico", note: "Tacos and cenotes" },
  { name: "China", note: "The Great Wall at dusk" },
  { name: "Cambodia", note: "Angkor Wat at dawn" },
  { name: "Myanmar", note: "Temples as far as the eye can see" },
  { name: "Laos", note: "The slow life on the Mekong" },
  { name: "Sri Lanka", note: "Tea country and train rides" },
  { name: "Philippines", note: "Island-hopping paradise" },
  { name: "Indonesia", note: "Bali sunsets and temple mornings" },
  { name: "Nepal", note: "The Himalayas up close" },
  { name: "Bhutan", note: "Happiness is a national policy" },
  { name: "Malaysia", note: "Street food capital of the world" },
  { name: "Hong Kong", note: "Neon skyline meets dim sum" },
  { name: "USA", note: "Home base, Bay Area edition" },
];

export default function EditorialFeature() {
  return (
    <section
      id="travel"
      style={{
        background: "var(--color-bg)",
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
              Feature: Travel
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Passport Stamps
            </span>
          </div>
        </ScrollReveal>

        {/* ── Main spread: large image + text column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">

          {/* Big photo */}
          <ScrollReveal className="lg:col-span-7">
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "3 / 4",
                background: "var(--color-surface)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/mom and me in nyc.jpg"
                alt="Travel photography"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <p
              className="text-label mt-2"
              style={{ color: "var(--color-muted)" }}
            >
              Above: Twenty countries across four continents
            </p>
          </ScrollReveal>

          {/* Text column */}
          <ScrollReveal className="lg:col-span-5" delay={0.1}>
            <h2
              className="text-section"
              style={{ marginBottom: "1.5rem" }}
            >
              Twenty countries,<br />one passport.
            </h2>

            {/* Pullquote — thin rules top/bottom, VF style */}
            <blockquote className="pullquote-block">
              <p className="text-pullquote">
                &ldquo;I still have all of my boarding passes from each flight to a new country.&rdquo;
              </p>
            </blockquote>

            <p
              className="drop-cap"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(15px, 1.4vw, 17px)",
                color: "var(--color-ink)",
                lineHeight: 1.8,
                marginBottom: "1.25rem",
              }}
            >
              My first flights were long ones. I was the kid in the middle seat
              with an activity book and a juice box while my parents crossed oceans
              to build a new life for our family. I didn&apos;t understand it then, but
              those early trips planted something: the idea that the world is bigger
              than any one place, and that leaving home is sometimes how you find it.
              Twenty countries later, I still think about that little girl coloring
              at 35,000 feet. She&apos;d be proud of where the stamps have taken her.
            </p>

            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(14px, 1.2vw, 15px)",
                color: "var(--color-muted)",
                lineHeight: 1.8,
              }}
            >
              Every trip since has been a quiet thank-you to the parents who made
              the first one possible. Now I book my own flights, pack my own bags,
              and navigate my own layovers. The world got bigger, and so did I.
              Next up: wherever the map says I haven&apos;t been yet.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Country list ── */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "2rem",
            }}
          >
            <p
              className="text-label"
              style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}
            >
              The List: 20 countries visited
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {countries.map(({ name, note }, i) => (
                <div
                  key={name}
                  className="flex items-baseline gap-4 py-3"
                  style={{
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    className="text-label"
                    style={{
                      color: "var(--color-accent)",
                      minWidth: "1.5rem",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(15px, 1.4vw, 18px)",
                      fontWeight: 700,
                      color: "var(--color-ink)",
                      minWidth: "120px",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--color-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
