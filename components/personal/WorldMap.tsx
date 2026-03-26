"use client";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ScrollReveal from "../ScrollReveal";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO numeric country codes for visited countries
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
  "826", // UK (Great Britain)
]);

const COUNTRY_COUNT = VISITED_CODES.size;

export default function WorldMap() {
  return (
    <section
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <span
            className="block mb-2"
            style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.1em", color: "var(--color-muted)", textTransform: "uppercase" }}
          >
            Countries Visited
          </span>
          <p
            className="mb-8 font-bold"
            style={{ fontSize: "clamp(24px, 4vw, 40px)", color: "var(--color-ink)", lineHeight: 1.1 }}
          >
            {COUNTRY_COUNT} countries and counting.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div style={{ borderRadius: "8px", overflow: "hidden" }}>
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
                        fill={visited ? "#00C896" : "rgba(255,255,255,0.1)"}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: visited ? "#00E5A8" : "rgba(255,255,255,0.18)" },
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
      </div>
    </section>
  );
}
