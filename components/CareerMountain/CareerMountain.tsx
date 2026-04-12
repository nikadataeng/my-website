"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "../ScrollReveal";
import AnimatedRule from "../AnimatedRule";
import MilestoneCard from "./MilestoneCard";
import { milestones } from "./milestones";
import { GraduationCap, TrendingUp, MapPin, HandCoins, Users, Trophy, Wrench, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  SVG geometry — viewBox 0 0 1400 700                                */
/*  Ascending ridge with 5 peaks, each = one milestone                 */
/* ------------------------------------------------------------------ */
const VB_W = 1400;
const VB_H = 700;

/**
 * Far ridge — background depth layer.
 * Gentle, low peaks, barely visible.
 */
const FAR_RIDGE =
  "M 0 580 C 140 560 240 520 360 510 C 480 500 560 530 680 500 C 800 470 880 450 1000 460 C 1120 470 1200 490 1320 470 C 1370 460 1400 480 1400 480 L 1400 700 L 0 700 Z";

/**
 * Main ridge — the primary mountain silhouette.
 * 5 clear peaks ascending left→right. Each peak = one milestone.
 * Peak Y coords (approximate): 460, 360, 260, 180, 120
 * The overall trajectory is upward — the growth story.
 */
const MAIN_RIDGE =
  "M 0 620 C 40 610 80 580 140 540 C 200 500 240 470 280 460 C 320 450 360 470 400 490 C 440 510 480 480 520 440 C 560 400 580 370 620 360 C 660 350 700 380 740 400 C 780 420 800 390 840 350 C 880 310 900 275 940 260 C 980 245 1020 270 1040 290 C 1060 310 1080 280 1120 240 C 1160 200 1180 185 1200 180 C 1220 175 1240 190 1260 200 C 1280 210 1300 170 1320 140 C 1340 110 1360 120 1380 120 C 1390 120 1400 130 1400 130 L 1400 700 L 0 700 Z";

/**
 * Ridge stroke — just the top edge of the main mountain for definition.
 */
const RIDGE_LINE =
  "M 0 620 C 40 610 80 580 140 540 C 200 500 240 470 280 460 C 320 450 360 470 400 490 C 440 510 480 480 520 440 C 560 400 580 370 620 360 C 660 350 700 380 740 400 C 780 420 800 390 840 350 C 880 310 900 275 940 260 C 980 245 1020 270 1040 290 C 1060 310 1080 280 1120 240 C 1160 200 1180 185 1200 180 C 1220 175 1240 190 1260 200 C 1280 210 1300 170 1320 140 C 1340 110 1360 120 1380 120 C 1390 120 1400 130 1400 130";

/**
 * Peak positions — where each milestone sits on the ridge.
 * Each peak is a local maximum on the ridge line.
 * Y values match the ridge path peaks. Cards alternate above/below.
 */
const PEAKS: { x: number; y: number; card: "above" | "below" }[] = [
  { x: 280, y: 460, card: "above" },
  { x: 620, y: 360, card: "below" },
  { x: 940, y: 260, card: "above" },
  { x: 1180, y: 185, card: "above" },
];

/**
 * Scroll thresholds for each milestone reveal.
 * Cards are front-loaded so the last card (AI Apps Engineer) appears
 * with ~50% of scroll runway remaining — plenty of time to read it
 * before the section unpins.
 */
const THRESHOLDS = [0.08, 0.22, 0.36, 0.50];

/* ------------------------------------------------------------------ */
/*  Mobile timeline fallback                                           */
/* ------------------------------------------------------------------ */
function MobileTimeline() {
  return (
    <div style={{ padding: "40px 24px" }}>
      {milestones.map((m, i) => (
        <div
          key={m.id}
          style={{
            position: "relative",
            paddingLeft: 32,
            paddingBottom: i < milestones.length - 1 ? 40 : 0,
            borderLeft: i < milestones.length - 1 ? "2px solid var(--color-border, #E8E6E0)" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -6,
              top: 4,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--color-accent, #2B4D8C)",
              border: "2px solid var(--color-bg, #FFFFFF)",
            }}
          />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent, #2B4D8C)" }}>
            {m.year}
          </span>
          <h3 style={{ fontFamily: "var(--font-serif, 'Cormorant Garamond'), Georgia, serif", fontSize: 22, fontWeight: 700, color: "var(--color-ink, #4A4440)", margin: "4px 0 2px", lineHeight: 1.2 }}>
            {m.title}
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "var(--color-accent, #2B4D8C)", margin: "0 0 6px" }}>
            {m.company}
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "var(--color-muted, #6B6862)", lineHeight: 1.5, margin: 0 }}>
            {m.description}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function CareerMountain() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const farRidgeRef = useRef<SVGGElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mq.matches);
    setReducedMotion(rmq.matches);
    const h1 = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    const h2 = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", h1);
    rmq.addEventListener("change", h2);
    return () => { mq.removeEventListener("change", h1); rmq.removeEventListener("change", h2); };
  }, []);

  /* ---------------------------------------------------------------- */
  /*  GSAP scroll animation                                            */
  /* ---------------------------------------------------------------- */
  useGSAP(
    () => {
      if (isMobile || reducedMotion || !containerRef.current || !sectionRef.current) return;

      const baseTrigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
      };

      /* Far ridge — lazy parallax drift */
      if (farRidgeRef.current) {
        gsap.timeline({
          scrollTrigger: { ...baseTrigger, scrub: 2.5 },
        }).to(farRidgeRef.current, { y: -25, ease: "none", duration: 1 }, 0);
      }

      /* Peak dots — scale up when reached */
      PEAKS.forEach((peak, i) => {
        const dot = containerRef.current!.querySelector(`.cm-dot-${i}`);
        const glow = containerRef.current!.querySelector(`.cm-glow-${i}`);
        if (!dot) return;

        gsap.fromTo(
          dot,
          { scale: 0.6, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: () => `top+=${THRESHOLDS[i] * 100}% top`,
              toggleActions: "play none none reverse",
            },
          },
        );

        if (glow) {
          gsap.fromTo(
            glow,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current!,
                start: () => `top+=${THRESHOLDS[i] * 100}% top`,
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      /* Milestone cards — fade up at each threshold */
      milestones.forEach((_, i) => {
        const card = containerRef.current!.querySelector(`.cm-card-${i}`);
        if (!card) return;

        /* Reveal the card itself */
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current!,
              start: () => `top+=${THRESHOLDS[i] * 100}% top`,
              toggleActions: "play none none reverse",
            },
            onComplete: () => {
              /* Trigger staggered child reveals via CSS class */
              const children = card.querySelectorAll(".cm-card-child, .cm-card-line");
              children.forEach((child) => {
                (child as HTMLElement).style.opacity = "1";
                (child as HTMLElement).style.transform = "translateY(0)";
              });
            },
            onReverseComplete: () => {
              const children = card.querySelectorAll(".cm-card-child, .cm-card-line");
              children.forEach((child) => {
                (child as HTMLElement).style.opacity = "0";
                (child as HTMLElement).style.transform = "translateY(8px)";
              });
            },
          },
        );
      });

      /* Highlight bubbles — all milestones, same pattern as cards */
      THRESHOLDS.forEach((threshold, i) => {
        [0, 1, 2].forEach((j) => {
          const el = containerRef.current!.querySelector(`.cm-hl-${i}-${j}`);
          if (!el) return;
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.85, y: 10 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current!,
                start: () => `top+=${(threshold + 0.02 + j * 0.015) * 100}% top`,
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      });

      /* Scroll hint — fade out */
      const hint = containerRef.current!.querySelector(".cm-scroll-hint");
      if (hint) {
        gsap.to(hint, {
          opacity: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top+=5% top",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [isMobile, reducedMotion] },
  );

  /* --- Reduced motion: static layout --- */
  if (reducedMotion) {
    return (
      <section id="journey" style={{ padding: "80px 24px", borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <span className="text-label" style={{ color: "var(--color-muted)" }}>Journey</span>
          <h2 className="text-section" style={{ margin: "12px 0 48px" }}>The journey, so far.</h2>
          <MobileTimeline />
        </div>
      </section>
    );
  }

  if (isMobile) {
    return (
      <section id="journey" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px 0 0" }}>
          <div style={{ padding: "0 24px" }}>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>Journey</span>
            <div style={{ margin: "12px 0 16px" }}><AnimatedRule /></div>
            <h2 className="text-section" style={{ marginBottom: "2rem" }}>The journey, so far.</h2>
          </div>
          <MobileTimeline />
        </div>
      </section>
    );
  }

  return (
    <section
      id="journey"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "700vh", /* scroll runway — last card at 50%, leaves 350vh of reading buffer */
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Sticky viewport */}
      <div
        ref={containerRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          background: "var(--color-bg, #FAF9F7)",
        }}
      >
        {/* Section heading — top left, compact */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            right: 0,
            zIndex: 25,
            padding: "0 clamp(24px, 5vw, 80px)",
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <ScrollReveal>
            <span className="text-label" style={{ color: "var(--color-muted)" }}>Journey</span>
          </ScrollReveal>
          <div style={{ margin: "6px 0 8px", maxWidth: 200 }}>
            <AnimatedRule />
          </div>
          <ScrollReveal delay={0.1}>
            <h2
              className="text-section"
              style={{ margin: 0, fontSize: "clamp(24px, 3.5vw, 38px)" }}
            >
              The journey, so far.
            </h2>
          </ScrollReveal>
        </div>

        {/* SVG mountain scene */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMax slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
          aria-hidden
        >
          <defs>
            {/* Main mountain gradient — Shilajit to cream */}
            <linearGradient id="cm-main-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A4440" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#6B6862" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FAF9F7" stopOpacity="0.05" />
            </linearGradient>
            {/* Far ridge fill — warm gray, very subtle */}
            <linearGradient id="cm-far-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4A4440" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#EEECE8" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Layer 1: Far ridge — background depth */}
          <g ref={farRidgeRef} style={{ willChange: "transform" }}>
            <path d={FAR_RIDGE} fill="url(#cm-far-grad)" />
          </g>

          {/* Layer 2: Main mountain silhouette */}
          <path d={MAIN_RIDGE} fill="url(#cm-main-grad)" />

          {/* Ridge line — subtle stroke for definition */}
          <path
            d={RIDGE_LINE}
            fill="none"
            stroke="#2B4D8C"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.3}
          />

          {/* Peak dots */}
          {PEAKS.map((peak, i) => (
            <g key={i}>
              {/* Glow ring — starts invisible, GSAP reveals */}
              <circle
                className={`cm-glow-${i}`}
                cx={peak.x}
                cy={peak.y}
                r={18}
                fill="none"
                stroke="#2B4D8C"
                strokeWidth="1"
                opacity={0}
                style={{ transformOrigin: `${peak.x}px ${peak.y}px`, willChange: "transform, opacity" }}
              />
              {/* Dot — starts small/dim, GSAP scales up */}
              <circle
                className={`cm-dot-${i}`}
                cx={peak.x}
                cy={peak.y}
                r={6}
                fill="#2B4D8C"
                stroke="var(--color-bg, #FAF9F7)"
                strokeWidth="2"
                opacity={0.3}
                style={{ transformOrigin: `${peak.x}px ${peak.y}px`, willChange: "transform, opacity" }}
              />
            </g>
          ))}
        </svg>

        {/* Milestone cards — positioned at peaks */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {milestones.map((m, i) => {
            const peak = PEAKS[i];
            if (!peak) return null;
            return (
              <MilestoneCard
                key={m.id}
                milestone={m}
                position={peak.card}
                index={i}
                style={{
                  left: `${(peak.x / VB_W) * 100}%`,
                  top: `${(peak.y / VB_H) * 100}%`,
                }}
              />
            );
          })}
        </div>

        {/* Highlight bubbles — all milestones */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="hidden md:block">
          {(() => {
            const hl = (cls: string, peakIdx: number, ml: number, mt: number, rot: number, icon: React.ReactNode, text: string) => (
              <div
                key={cls}
                className={cls}
                style={{
                  position: "absolute",
                  left: `${(PEAKS[peakIdx].x / VB_W) * 100}%`,
                  top: `${(PEAKS[peakIdx].y / VB_H) * 100}%`,
                  marginLeft: ml,
                  marginTop: mt,
                  opacity: 0,
                  transform: `translate(-50%, 0) rotate(${rot}deg)`,
                  maxWidth: 190,
                  padding: "6px 11px",
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(12px) saturate(160%)",
                  WebkitBackdropFilter: "blur(12px) saturate(160%)",
                  border: "1px solid rgba(255, 255, 255, 0.45)",
                  borderRadius: 10,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  zIndex: 18,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span style={{ flexShrink: 0, color: "var(--color-muted)", opacity: 0.7 }}>{icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 500, color: "var(--color-ink)", lineHeight: 1.35 }}>{text}</span>
              </div>
            );
            return (
              <>
                {/* Ovative (peak 0, card: above) */}
                {hl("cm-hl-0-0", 0, -140, -165, -2, <GraduationCap size={13} />, "First job out of college")}
                {hl("cm-hl-0-1", 0, 120, -120, 1.5, <TrendingUp size={13} />, "Built predictive ROAS models")}

                {/* WITHIN (peak 1, card: below) */}
                {hl("cm-hl-1-0", 1, -170, 260, 1.8, <MapPin size={13} />, "Moved to NYC")}
                {hl("cm-hl-1-1", 1, 140, 310, -1.5, <HandCoins size={13} />, "Pitched Est\u00e9e Lauder \u2014 $2M contract")}

                {/* Sigma AE (peak 2, card: above) */}
                {hl("cm-hl-2-0", 2, -130, -145, -1.5, <Users size={13} />, "Worked with the exec team")}
                {hl("cm-hl-2-1", 2, 125, -120, 2, <Trophy size={13} />, "Sigma hackathon winner")}
                {hl("cm-hl-2-2", 2, -160, -210, 1.2, <MapPin size={13} />, "Moved to San Francisco")}

                {/* Sigma AI (peak 3, card: above) */}
                {hl("cm-hl-3-0", 3, -140, -165, 1.5, <Wrench size={13} />, "Built CRM replacement from scratch")}
                {hl("cm-hl-3-1", 3, 110, -120, -2, <Briefcase size={13} />, "Reports to CMO, COO & CEO")}
              </>
            );
          })()}
        </div>

        {/* Progress indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
            alignItems: "center",
            zIndex: 30,
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 20,
            padding: "6px 14px",
          }}
        >
          {milestones.map((_, i) => (
            <div
              key={i}
              className={`cm-progress-${i}`}
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: "rgba(0,0,0,0.1)",
                transition: "all 0.5s cubic-bezier(.37,.01,0,.98)",
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="cm-scroll-hint"
          style={{
            position: "absolute",
            bottom: 56,
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            opacity: 0.6,
            zIndex: 30,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--color-muted, #6B6862)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Scroll to explore
          </p>
          <svg width="20" height="28" viewBox="0 0 20 28" style={{ margin: "8px auto 0", opacity: 0.5 }}>
            <rect x="6" y="0" width="8" height="16" rx="4" stroke="var(--color-muted, #6B6862)" strokeWidth="1.5" fill="none" />
            <circle cx="10" cy="7" r="1.5" fill="var(--color-muted, #6B6862)">
              <animate attributeName="cy" values="6;10;6" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <path d="M 5 20 L 10 25 L 15 20" stroke="var(--color-muted, #6B6862)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
