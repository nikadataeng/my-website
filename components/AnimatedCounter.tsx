"use client";

/**
 * AnimatedCounter — Chartmetric-inspired count-up animation.
 *
 * Counts from 0 (or `from`) to `to` when the element enters the viewport.
 * Supports a prefix (e.g. "$") and suffix (e.g. "K+" or " tools").
 * Uses requestAnimationFrame for smooth, frame-perfect counting.
 */

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  to: number;
  from?: number;
  duration?: number; // ms, default 1400
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Delay before counting starts (ms). Default 0. */
  delay?: number;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function AnimatedCounter({
  to,
  from = 0,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  style,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(from);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!inView || hasStarted.current) return;
    hasStarted.current = true;

    const startTime = performance.now() + delay;

    function tick(now: number) {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutExpo(t);
      const current = from + (to - from) * easedT;
      setValue(parseFloat(current.toFixed(decimals)));
      if (t < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [inView, from, to, duration, delay, decimals]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{display}{suffix}
    </span>
  );
}
