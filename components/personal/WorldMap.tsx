"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ScrollReveal from "../ScrollReveal";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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
  "116", // Cambodia
  "104", // Myanmar
  "418", // Laos
  "144", // Sri Lanka
  "608", // Philippines
  "360", // Indonesia
  "524", // Nepal
  "064", // Bhutan
  "458", // Malaysia
  "344", // Hong Kong
]);

const COUNTRY_COUNT = VISITED_CODES.size;

export default function WorldMap() {
  return (
    <section
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
              Travel: World Map
            </span>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>
              Passport Stamps
            </span>
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="text-section">
              The world,<br />so far.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 300,
                color: "var(--color-accent)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {COUNTRY_COUNT}
            </p>
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
                    const id: string = String(
                      geo.id ?? geo.properties?.["numeric"] ?? ""
                    );
                    const visited = VISITED_CODES.has(id);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={visited ? "#944D5E" : "#E8E6E0"}
                        stroke="#FAFAF8"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            outline: "none",
                            fill: visited ? "#7B3D4E" : "#D5D2CC",
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
            USA &nbsp;·&nbsp; India &nbsp;·&nbsp; Japan &nbsp;·&nbsp; China
            &nbsp;·&nbsp; South Korea &nbsp;·&nbsp; Thailand &nbsp;·&nbsp;
            Singapore &nbsp;·&nbsp; Vietnam &nbsp;·&nbsp; Mexico &nbsp;·&nbsp;
            UK &nbsp;·&nbsp; Cambodia &nbsp;·&nbsp; Myanmar &nbsp;·&nbsp;
            Laos &nbsp;·&nbsp; Sri Lanka &nbsp;·&nbsp; Philippines &nbsp;·&nbsp;
            Indonesia &nbsp;·&nbsp; Nepal &nbsp;·&nbsp; Bhutan &nbsp;·&nbsp;
            Malaysia &nbsp;·&nbsp; Hong Kong
          </p>
        </ScrollReveal>

      </div>
    </section>
  );
}
