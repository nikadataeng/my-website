"use client";

import Link from "next/link";
import ScrollReveal from "./ScrollReveal";
import AnimatedRule from "./AnimatedRule";

import gridItems from "@/content/career/misc.json";

export default function MiscGrid() {
  return (
    <section
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <ScrollReveal>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>
            04 —
          </span>
        </ScrollReveal>

        <div className="mt-4 mb-12">
          <AnimatedRule />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gridItems.map((item, i) => (
            <ScrollReveal key={item.label} delay={i * 0.07}>
              <div
                className="p-6 h-full flex flex-col justify-between"
                style={{
                  background: "var(--color-surface)",
                  minHeight: "160px",
                }}
              >
                <p
                  className="text-label mb-4"
                  style={{ color: "var(--color-muted)" }}
                >
                  {item.label}
                </p>
                {item.isLink && item.href ? (
                  <Link
                    href={item.href}
                    className="link-underline font-bold leading-snug mt-auto"
                    style={{
                      fontSize: "15px",
                      color: "var(--color-accent)",
                    }}
                  >
                    {item.value} →
                  </Link>
                ) : (
                  <>
                    <p
                      className="font-bold leading-snug"
                      style={{ fontSize: "15px", color: "var(--color-ink)" }}
                    >
                      {item.value}
                    </p>
                    {item.sub && (
                      <p
                        className="mt-2 leading-snug"
                        style={{
                          fontSize: "13px",
                          color: "var(--color-muted)",
                        }}
                      >
                        {item.sub}
                      </p>
                    )}
                  </>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
