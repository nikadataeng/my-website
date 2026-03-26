"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ScrollReveal from "../ScrollReveal";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const VISITED_CODES = new Set([
  "840", // USA
  "356", // India
  "392", // Japan
  "156", // China
  "410", // South Korea
  "764", // Thailand
  "702", // Singapore
  "704", // Vietnam
  "484", // Mexico
  "826", // UK
]);

const COUNTRY_COUNT = VISITED_CODES.size;

export default function WorldMap() {
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
          <div className="mb-12">
            <div
              className="mb-4"
              style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: "1rem" }}
            >
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                Passport Stamps
              </span>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-section" style={{ color: "var(--color-ink)" }}>
                The world,<br />so far.
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                  fontSize: "clamp(48px, 6vw, 72px)",
                  fontWeight: 900,
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {COUNTRY_COUNT}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Map */}
        <ScrollReveal delay={0.1}>
          <div style={{ overflow: "hidden" }}>
            <ComposableMap
              projectionConfig={{ scale: 140, center: [20, 10] }}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const id: string = String(geo.id ?? geo.properties?.["numeric"] ?? "");
                    const visited = VISITED_CODES.has(id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={visited ? "#C8F135" : "rgba(255,255,255,0.06)"}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            outline: "none",
                            fill: visited ? "#D9FF50" : "rgba(255,255,255,0.12)",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>
        </ScrollReveal>

        {/* Country list */}
        <ScrollReveal delay={0.2}>
          <p
            className="mt-6 text-label"
            style={{ color: "var(--color-muted)" }}
          >
            USA · India · Japan · China · South Korea · Thailand · Singapore · Vietnam · Mexico · UK
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
