"use client";

import ScrollReveal from "../ScrollReveal";
import EditorialImage from "../EditorialImage";
import FullBleedBand from "./FullBleedBand";
import ImageMosaic from "./ImageMosaic";
import FoodSpread from "./FoodSpread";
import BakeryFeature from "./BakeryFeature";
import PlaceSpread from "./PlaceSpread";
import FridaMotif from "./FridaMotif";

import countries from "@/content/personal/countries.json";
import cdmxGallery from "@/content/personal/cdmx-gallery.json";

const bodyText = {
  fontFamily: "var(--font-serif)",
  fontSize: "clamp(15px, 1.4vw, 17px)",
  color: "var(--color-ink)",
  lineHeight: 1.8,
} as const;

const bodyTextMuted = {
  fontFamily: "var(--font-sans)",
  fontSize: "clamp(14px, 1.2vw, 15px)",
  color: "var(--color-muted)",
  lineHeight: 1.8,
} as const;

const dayLabel = {
  color: "var(--color-accent)",
  marginBottom: "1rem",
} as const;

export default function EditorialFeature() {
  return (
    <section
      id="travel"
      data-screen-label="04 Feature"
      style={{
        background: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        paddingTop: "var(--section-gap, 100px)",
        paddingBottom: "var(--section-gap, 100px)",
      }}
    >
      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto" style={{ position: "relative" }}>
        <FridaMotif size={200} style={{ top: "-1rem", right: "0" }} />

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
              CDMX, July 1&ndash;5
            </span>
          </div>
        </ScrollReveal>

        <h2
          className="text-section"
          style={{ marginBottom: "1rem", maxWidth: "16ch" }}
        >
          Soccer interrupted<br />our shopping weekend.
        </h2>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.4vw, 17px)",
            color: "var(--color-muted)",
            marginBottom: "2.5rem",
            maxWidth: "48ch",
          }}
        >
          Just kidding! I loved the FIFA hype — it was amazing to see so many
          communities get along. The world needed some of that.
        </p>
      </div>

      {/* ── Full-bleed opener: arrival ── */}
      <FullBleedBand
        src="/images/cdmx-arrival-tarmac.jpeg"
        alt="Rainy tarmac at Mexico City International Airport, Aeroméxico tails lined up"
        kicker="Arrival · July 1"
        headline="Landed mid-FIFA-fever."
        caption="A large ball acts as the nucleus of the airport — the first thing you see while you're still hunting for your Uber. Even the hand-soap dispensers had FIFA stickers on them."
        objectPosition="50% 40%"
      />

      <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">

        {/* ── Main spread: FIFA ball + intro text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-16 mb-16">
          <ScrollReveal className="lg:col-span-4 lg:order-2" delay={0.1}>
            <div style={{ maxWidth: 300 }}>
              <EditorialImage
                src="/images/fifa-ball-airport.png"
                alt="An oversized FIFA World Cup ball installation hanging over the terminal at Mexico City International Airport"
                ratio="portrait"
                caption="You saw this ball before you saw your Uber"
                sizes="300px"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-8 lg:order-1" delay={0.1}>
            <blockquote className="pullquote-block">
              <p className="text-pullquote">
                &ldquo;Even the Ferris wheel was lit up as a soccer ball.&rdquo;
              </p>
            </blockquote>

            <p className="drop-cap" style={{ ...bodyText, marginBottom: "1.25rem" }}>
              Mexico was hyped, full stop. Z, my best friend and partner in
              every questionable itinerary, and I picked a cute Airbnb in
              Roma Norte, on purpose staying within a two-mile blast radius
              of every bakery and shop we&apos;d pinned on our collaborative
              Google Maps list after scouring TikTok and Instagram for weeks.
            </p>

            <p style={bodyTextMuted}>
              After a grueling 3.5-hour flight from SFO, we went straight to
              the Marquis for the spa, then a quiet dinner before crashing
              for the real itinerary ahead.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Day One: Rosetta → Pujol → Xinu → rooftop ── */}
        <ScrollReveal delay={0.1}>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2.5rem", marginBottom: "4rem" }}>
            <p className="text-label" style={dayLabel}>Day One · Roma Norte &amp; Polanco</p>

            <p style={{ ...bodyText, marginBottom: "1.5rem" }}>
              We started the morning at Panadería Rosetta, currently
              CDMX&apos;s most iconic bakery, for the famous guava roll and
              some eggs. Both were good. I wouldn&apos;t say it changed my
              life — but did it hit? Yeah.
            </p>

            <BakeryFeature
              header={{
                src: "/images/rosetta-signage-hires.jpeg",
                alt: "Panadería Rosetta storefront signage, framed by vines",
                caption: "179A",
              }}
              portraits={[
                { src: "/images/rosetta-shelf-hires.jpeg", alt: "Bakery shelf display at Panadería Rosetta with bread, granola, and flowers", caption: "The shelf, styled better than my apartment" },
                { src: "/images/rosetta-guava-roll-hires.jpeg", alt: "Rosetta's famous guava roll", caption: "The guava roll — did it hit? Yeah." },
              ]}
              landscape={{
                src: "/images/rosetta-spread-hires.jpeg",
                alt: "Breakfast spread at Panadería Rosetta",
                caption: "The rest of the spread",
              }}
            />

            <p style={{ ...bodyText, marginTop: "2.5rem", marginBottom: "2rem" }}>
              We wandered around for a bit after, then cabbed to Polanco for
              Pujol — one of the city&apos;s top Michelin restaurants and one
              of the most renowned tables in the world.
            </p>

            <ScrollReveal delay={0.1}>
              <p style={{ ...bodyTextMuted, marginBottom: "1.5rem" }}>
                Five courses in, we stopped trying to guess what was
                coming next and just let the tasting menu run.
              </p>
            </ScrollReveal>
            <FoodSpread
              courses={cdmxGallery}
              lead={{
                src: "/images/pujol-outfit-hires.jpeg",
                alt: "Nika outside Pujol, Michelin 2025 plaque on the wall",
                caption: "Outside Pujol — Michelin 2025, no reservation regrets",
              }}
              kicker="Pujol · The Tasting Menu"
              headline="Lunch at Pujol."
            />

            <p style={{ ...bodyText, marginTop: "2.5rem", marginBottom: "1.5rem" }}>
              Next door at Xinu Perfumes we walked through a sensory
              deconstruction of their scents — what a fragrance smells like
              the second it hits your skin versus a few hours later, once the
              base notes emerge. Genuinely one of the more interesting things
              I&apos;ve done on a vacation.
            </p>

            <ImageMosaic
              columns={3}
              stretch
              tiles={[
                { src: "/images/xinu-table-hires.jpeg", alt: "Xinu Perfumes tasting table, deconstructed scent elements", caption: "The deconstruction table" },
                { src: "/images/xinu-room-hires.jpeg", alt: "Xinu Perfumes showroom, dark walls and garden windows", caption: "The showroom" },
                { src: "/images/xinu-anthurium-hires.jpeg", alt: "A red anthurium bloom on the ingredient table at Xinu Perfumes", caption: "The anthurium on the ingredient table" },
              ]}
            />
            <ScrollReveal delay={0.16}>
              <div style={{ marginTop: "0.75rem" }}>
                <EditorialImage
                  src="/images/xinu-ingredients-hires.jpeg"
                  alt="Ingredient table at Xinu Perfumes with flowers, dried botanicals, and glass vessels"
                  ratio="spread"
                  caption="The raw materials — flowers, resins, and whatever's in that amber glass"
                  sizes="(max-width: 900px) 100vw, 700px"
                />
              </div>
            </ScrollReveal>

            <p style={{ ...bodyTextMuted, marginTop: "2.5rem" }}>
              Somewhere in there, a mango on a stick from a street cart —
              chile, lime, and all. We closed the day at a rooftop for the
              skyline, Ferris wheel lit up as a soccer ball and all.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Day Two: Casa Azul → mercado → Lucha Libre ── */}
        <ScrollReveal delay={0.1}>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2.5rem", marginBottom: "4rem" }}>
            <p className="text-label" style={dayLabel}>Day Two · Coyoacán &amp; Centro</p>

            <p style={{ ...bodyText, marginBottom: "2rem" }}>
              We visited Frida Kahlo&apos;s home, Casa Azul. It was surreal
              connecting a middle school history lesson to an actual house —
              I recognized her writing, her dolls, the mirror on her bedpost.
              I bought a small vase from the gift shop in the same shade of
              blue as the house, to remember her by.
            </p>

            <PlaceSpread
              kicker="Casa Azul · Coyoacán"
              headline="Frida's House."
              hero={[
                { src: "/images/casa-azul-dresses-hires.jpeg", alt: "A row of Frida Kahlo's Tehuana dresses on display at Casa Azul", caption: "Her wardrobe, still on display" },
                { src: "/images/casa-azul-garden-hires.jpeg", alt: "The garden at Casa Azul, blue and red walls behind a palm and a green door", caption: "The garden, blue and red and green" },
              ]}
              supporting={[
                { src: "/images/casa-azul-kitchen-hires.jpeg", alt: "The yellow and blue tiled kitchen at Casa Azul, pottery hanging on the wall", caption: "The kitchen" },
                { src: "/images/casa-azul-corset-hires.jpeg", alt: "Plaster corsets Frida Kahlo painted and wore, on display at Casa Azul", caption: "The corsets she painted" },
                { src: "/images/casa-azul-courtyard.jpeg", alt: "The blue and red courtyard doors of Casa Azul", caption: "Blue and red, everywhere" },
                { src: "/images/casa-azul-gallery-wall-hires.jpeg", alt: "Portrait gallery wall inside Casa Azul", caption: "The portrait wall" },
              ]}
            />

            <p style={{ ...bodyTextMuted, marginTop: "2.5rem", marginBottom: "2.5rem" }}>
              We spent the afternoon under the plastic tarps of an artesanías
              mercado, where I hunted for a standing fish I&apos;d seen all
              over TikTok. Z was so over it by the end. After lunch in
              Centro, we went to a Lucha Libre match that night — I
              wasn&apos;t entirely sure what was happening, but I cheered on
              plenty of it.
            </p>

            <ImageMosaic
              tiles={[
                { src: "/images/lucha-libre-mascot.jpeg", alt: "Mamá Lucha mascot in the ring at Arena México", caption: "Mamá Lucha makes her entrance" },
                { src: "/images/lucha-libre-champion.jpeg", alt: "A masked luchador holding the championship belt", caption: "Champion of the night" },
              ]}
            />
          </div>
        </ScrollReveal>

        {/* ── Send-off ── */}
        <ScrollReveal delay={0.1}>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "2.5rem" }}>
            <p style={bodyText}>
              We spent our last day shopping before watching the
              Mexico&ndash;England match with ten strangers at our gate,
              waiting for the flight back to San Francisco. Good trip. Would
              do the guava roll again.
            </p>
          </div>
        </ScrollReveal>

        {/* ── Country list ── */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: "2rem",
              marginTop: "3rem",
            }}
          >
            <p
              className="text-label"
              style={{ color: "var(--color-muted)", marginBottom: "1.5rem" }}
            >
              The Running List: 20 countries and counting
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
                      fontWeight: 400,
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
