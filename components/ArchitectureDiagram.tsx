"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import DiagramNode from "./DiagramNode";
import architectureData from "@/content/career/architecture.json";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CARD_W = 190;
const CARD_H = 52;
const JUNCTION_W = 220;
const JUNCTION_H = 58;
const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ------------------------------------------------------------------ */
/*  Arrow helpers                                                      */
/* ------------------------------------------------------------------ */

// Find where a line from (cx, cy) toward (tx, ty) exits a rect of size w×h
// centered on (cx, cy). Adds buffer so arrow heads don't touch the bubble.
function boxEdgePoint(
  cx: number,
  cy: number,
  tx: number,
  ty: number,
  w: number,
  h: number,
  buffer = 6,
) {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const halfW = w / 2 + buffer;
  const halfH = h / 2 + buffer;
  const tX = Math.abs(dx) / halfW;
  const tY = Math.abs(dy) / halfH;
  const t = Math.max(tX, tY);
  if (t === 0) return { x: cx, y: cy };
  return { x: cx + dx / t, y: cy + dy / t };
}

// Smooth cubic bezier between two points, biased along the dominant axis.
function curvedPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const horizontal = Math.abs(dx) > Math.abs(dy);
  let cx1: number, cy1: number, cx2: number, cy2: number;
  if (horizontal) {
    const pull = Math.abs(dx) * 0.45;
    cx1 = x1 + Math.sign(dx) * pull;
    cy1 = y1;
    cx2 = x2 - Math.sign(dx) * pull;
    cy2 = y2;
  } else {
    const pull = Math.abs(dy) * 0.45;
    cx1 = x1;
    cy1 = y1 + Math.sign(dy) * pull;
    cx2 = x2;
    cy2 = y2 - Math.sign(dy) * pull;
  }
  return `M ${x1},${y1} C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
}

/* Column x-centers as % of container width */
const COL_X: Record<number, number> = {
  0: 0.1,      // Data layer left
  0.5: 0.22,   // Framework left
  1: 0.35,     // Intelligence
  1.5: 0.475,  // Junction / Hooks / Rules center
  2: 0.6,      // Apps left
  2.5: 0.68,   // Framework right
  3: 0.85,     // Apps right (Slack)
};

/* Row y-centers as px from top of diagram area */
const ROW_Y: Record<number, number> = {
  0: 60,
  0.5: 100,
  1: 140,
  2.2: 240,
  3.2: 330,
  4.2: 410,
  5: 480,
  5.8: 550,
};

/* ------------------------------------------------------------------ */
/*  Helper: compute absolute positions                                 */
/* ------------------------------------------------------------------ */

function getNodePositions(containerWidth: number) {
  const positions: Record<
    string,
    { x: number; y: number; w: number; h: number }
  > = {};

  for (const node of architectureData.nodes) {
    const isJunction = node.zone === "junction";
    const w = isJunction ? JUNCTION_W : CARD_W;
    const h = isJunction ? JUNCTION_H : CARD_H;
    const xPct = COL_X[node.col] ?? 0.5;
    const yPx = ROW_Y[node.row] ?? 300;

    positions[node.id] = {
      x: xPct * containerWidth,
      y: yPx,
      w,
      h,
    };
  }
  return positions;
}

/* ------------------------------------------------------------------ */
/*  Helper: delay for a node based on its zone/col                     */
/* ------------------------------------------------------------------ */

function nodeDelay(node: (typeof architectureData.nodes)[0]): number {
  if (node.zone === "production") return 0.15 + node.col * 0.12 + node.row * 0.05;
  if (node.zone === "junction") return 0.8;
  return 1.0 + (node.row - 3) * 0.1 + (node.col > 1.5 ? 0.05 : 0);
}

/* ------------------------------------------------------------------ */
/*  Mobile fallback                                                    */
/* ------------------------------------------------------------------ */

function MobileArchitecture() {
  const productionNodes = architectureData.nodes.filter(
    (n) => n.zone === "production"
  );
  const junctionNode = architectureData.nodes.find(
    (n) => n.zone === "junction"
  );
  const frameworkNodes = architectureData.nodes.filter(
    (n) => n.zone === "framework"
  );

  return (
    <div className="space-y-6">
      {/* Production */}
      <ScrollReveal>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 500,
            fontStyle: "italic",
            color: "var(--color-accent)",
            display: "block",
            marginBottom: 12,
          }}
        >
          What I Build
        </span>
      </ScrollReveal>
      <div className="space-y-3">
        {productionNodes.map((node, i) => (
          <ScrollReveal key={node.id} delay={i * 0.06}>
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderLeft: "3px solid var(--color-accent)",
                borderRadius: 14,
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                }}
              >
                {node.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-muted)",
                  marginTop: 1,
                }}
              >
                {node.sublabel}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Junction */}
      {junctionNode && (
        <ScrollReveal delay={0.3}>
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(43, 77, 140, 0.04)",
              border: "1px solid rgba(43, 77, 140, 0.2)",
              borderRadius: 14,
              margin: "16px 0",
            }}
          >
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              {junctionNode.label}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--color-muted)",
                marginTop: 1,
              }}
            >
              {junctionNode.sublabel}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Framework */}
      <ScrollReveal delay={0.4}>
        <span
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 500,
            fontStyle: "italic",
            color: "var(--color-muted)",
            display: "block",
            marginBottom: 12,
          }}
        >
          How I Build It
        </span>
      </ScrollReveal>
      <div className="space-y-3">
        {frameworkNodes.map((node, i) => (
          <ScrollReveal key={node.id} delay={0.45 + i * 0.06}>
            <div
              style={{
                padding: "14px 18px",
                background: "rgba(250, 249, 247, 0.85)",
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                borderLeft: "3px solid var(--color-muted)",
                borderRadius: 14,
                boxShadow: "0 8px 32px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--color-ink)",
                }}
              >
                {node.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--color-muted)",
                  marginTop: 1,
                }}
              >
                {node.sublabel}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function ArchitectureDiagram() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1100);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const mqr = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mql.matches);
    setReducedMotion(mqr.matches);

    const handleMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const handleMotion = (e: MediaQueryListEvent) =>
      setReducedMotion(e.matches);
    mql.addEventListener("change", handleMobile);
    mqr.addEventListener("change", handleMotion);

    return () => {
      mql.removeEventListener("change", handleMobile);
      mqr.removeEventListener("change", handleMotion);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const nodePositions = useMemo(
    () => getNodePositions(containerWidth),
    [containerWidth]
  );

  const diagramHeight = 600;
  const effectiveInView = reducedMotion || inView;

  return (
    <section
      id="systems"
      className="py-24 md:py-36 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Section heading */}
        <ScrollReveal>
          <span
            className="text-label"
            style={{ color: "var(--color-muted)" }}
          >
            Systems
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2
            className="text-section"
            style={{ marginTop: 8, marginBottom: isMobile ? 32 : 48 }}
          >
            How the systems connect.
          </h2>
        </ScrollReveal>

        {isMobile ? (
          <MobileArchitecture />
        ) : (
          /* Desktop diagram */
          <div
            ref={containerRef}
            style={{
              position: "relative",
              width: "100%",
              height: diagramHeight,
              overflow: "visible",
            }}
          >
            {/* SVG dot grid background */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
              aria-hidden
            >
              <defs>
                <pattern
                  id="arch-dot-grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="0.7"
                    fill="var(--color-border)"
                    opacity="0.6"
                  />
                </pattern>
              </defs>
              <motion.rect
                width="100%"
                height="100%"
                fill="url(#arch-dot-grid)"
                rx="16"
                initial={{ opacity: 0 }}
                animate={effectiveInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </svg>

            {/* Connection arrows (Obsidian-style mind map) */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 4,
                overflow: "visible",
              }}
              aria-hidden
            >
              <defs>
                <marker
                  id="arch-arrow-tip"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path
                    d="M 0 1 L 9 5 L 0 9 z"
                    fill="var(--color-muted)"
                    fillOpacity="0.45"
                  />
                </marker>
              </defs>
              {architectureData.connections.map((conn, i) => {
                const from = nodePositions[conn.from];
                const to = nodePositions[conn.to];
                if (!from || !to) return null;
                const start = boxEdgePoint(
                  from.x,
                  from.y,
                  to.x,
                  to.y,
                  from.w,
                  from.h,
                  4,
                );
                const end = boxEdgePoint(
                  to.x,
                  to.y,
                  from.x,
                  from.y,
                  to.w,
                  to.h,
                  8,
                );
                const d = curvedPath(start.x, start.y, end.x, end.y);
                const isCross = conn.zone === "crossdomain";
                return (
                  <motion.path
                    key={`${conn.from}-${conn.to}`}
                    d={d}
                    stroke="var(--color-muted)"
                    strokeOpacity={isCross ? 0.28 : 0.32}
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={conn.dashed ? "4 5" : undefined}
                    markerEnd="url(#arch-arrow-tip)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={
                      effectiveInView ? { pathLength: 1, opacity: 1 } : {}
                    }
                    transition={{
                      pathLength: {
                        duration: 1.1,
                        delay: 0.35 + i * 0.04,
                        ease: "easeOut",
                      },
                      opacity: {
                        duration: 0.5,
                        delay: 0.35 + i * 0.04,
                      },
                    }}
                  />
                );
              })}
            </svg>

            {/* Zone labels */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={effectiveInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASING, delay: 0.1 }}
              style={{
                position: "absolute",
                top: -8,
                left: 0,
                fontFamily:
                  "var(--font-serif)",
                fontSize: 15,
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--color-accent)",
              }}
            >
              What I Build
            </motion.span>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={effectiveInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: EASING, delay: 0.9 }}
              style={{
                position: "absolute",
                top: 288,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily:
                  "var(--font-serif)",
                fontSize: 15,
                fontWeight: 500,
                fontStyle: "italic",
                color: "var(--color-muted)",
              }}
            >
              How I Build It
            </motion.span>

            {/* Column labels */}
            {[
              { label: "Data", x: COL_X[0] },
              { label: "Intelligence", x: COL_X[1] },
              { label: "Apps", x: COL_X[2] },
            ].map(({ label, x }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0 }}
                animate={effectiveInView ? { opacity: 0.5 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                style={{
                  position: "absolute",
                  top: 10,
                  left: `${x * 100}%`,
                  transform: "translateX(-50%)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  color: "var(--color-muted)",
                }}
              >
                {label}
              </motion.span>
            ))}

            {/* Junction glow */}
            {nodePositions["claude-code"] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={effectiveInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  position: "absolute",
                  left: nodePositions["claude-code"].x,
                  top: nodePositions["claude-code"].y,
                  transform: "translate(-50%, -50%)",
                  width: 280,
                  height: 140,
                  background:
                    "radial-gradient(ellipse, rgba(43,77,140,0.06) 0%, transparent 70%)",
                  borderRadius: "50%",
                  pointerEvents: "none",
                  zIndex: 5,
                }}
              />
            )}

            {/* Node cards */}
            {architectureData.nodes.map((node, i) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;
              return (
                <div
                  key={node.id}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    transform: "translate(-50%, -50%)",
                    zIndex: node.zone === "junction" ? 15 : 10,
                  }}
                >
                  <DiagramNode
                    node={node}
                    delay={reducedMotion ? 0 : nodeDelay(node)}
                    inView={effectiveInView}
                    isJunction={node.zone === "junction"}
                    floatDelay={reducedMotion ? 0 : (i % 5) * 0.35}
                    floatAmplitude={reducedMotion ? 0 : 3}
                  />
                </div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}
