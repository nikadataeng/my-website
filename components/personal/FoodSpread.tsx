"use client";

/**
 * FoodSpread — full-bleed splash spread ("Lunch at Pujol."). Every
 * shot here (the OOTD, the pre-app, every course) was taken as a
 * portrait phone photo, so the layout is two rows of tall 3:4 frames
 * rather than a landscape grid — nothing gets stretched into a shape
 * it wasn't shot in. The lead portrait and the pre-app run big in
 * the top row since they're the most color-forward shots; the rest
 * sit smaller in a supporting row below. A numbered legend runs
 * underneath instead of per-photo captions.
 */

import Image from "next/image";
import ScrollReveal from "../ScrollReveal";

type Course = { src: string; alt: string; caption: string; number: string };
type Lead = { src: string; alt: string; caption: string };

type Props = {
  courses: Course[];
  lead?: Lead;
  kicker?: string;
  headline?: string;
};

function Tile({
  src,
  alt,
  number,
  flex,
  priority,
}: {
  src: string;
  alt: string;
  number?: string;
  flex: number;
  priority?: boolean;
}) {
  return (
    <figure style={{ margin: 0, position: "relative", flex: `${flex} 1 0`, minWidth: 0 }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "3 / 4",
          overflow: "hidden",
          background: "var(--color-bg)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 900px) 45vw, 420px"
          priority={priority}
          style={{ objectFit: "cover", filter: "contrast(1.03) saturate(1.03)" }}
        />
        {number && (
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "0.75rem",
              left: "0.75rem",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "#F5F2ED",
              background: "rgba(20,17,14,0.55)",
              borderRadius: "999px",
              width: 26,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {number}
          </span>
        )}
      </div>
    </figure>
  );
}

export default function FoodSpread({ courses, lead, kicker, headline }: Props) {
  const [heroCourse, ...restCourses] = courses;

  return (
    <div
      style={{
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
        marginTop: "2rem",
        marginBottom: "1rem",
        background: "var(--color-surface)",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
          paddingRight: "clamp(1.5rem, 4vw, 4rem)",
        }}
      >
        {kicker && (
          <p className="text-label" style={{ color: "var(--color-accent)", marginBottom: "0.75rem" }}>
            {kicker}
          </p>
        )}
        {headline && (
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(30px, 4.5vw, 52px)",
              color: "var(--color-ink)",
              marginBottom: "2rem",
            }}
          >
            {headline}
          </h3>
        )}

        {/* ── Hero row: the OOTD and the pre-app, both run big ── */}
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row" style={{ gap: "1rem", marginBottom: "1rem" }}>
            {lead && <Tile src={lead.src} alt={lead.alt} flex={1} priority />}
            {heroCourse && (
              <Tile src={heroCourse.src} alt={heroCourse.alt} number={heroCourse.number} flex={1} priority />
            )}
          </div>
        </ScrollReveal>

        {/* ── Supporting row: the rest of the courses, smaller ── */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row" style={{ gap: "0.85rem" }}>
            {restCourses.map((course) => (
              <Tile key={course.src} src={course.src} alt={course.alt} number={course.number} flex={0.72} />
            ))}
          </div>
        </ScrollReveal>

        {/* ── Numbered legend, footer-style ── */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--color-border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            rowGap: "0.6rem",
            columnGap: "1.5rem",
          }}
        >
          {lead && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--color-muted)",
                margin: 0,
                lineHeight: 1.5,
                fontStyle: "italic",
              }}
            >
              {lead.caption}
            </p>
          )}
          {courses.map((course) => (
            <p
              key={course.src}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                color: "var(--color-muted)",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>
                {course.number}.
              </span>{" "}
              {course.caption}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
