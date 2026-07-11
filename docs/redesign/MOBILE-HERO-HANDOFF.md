# Handoff: Mobile Redesign — Personal Homepage Hero ("The Life of Nika")

**For:** a Sonnet executor agent. All design decisions are final — execute, verify, don't redesign.
**Date:** 2026-07-11 · Planned by Fable 5 with the `designing-beautiful-websites` skill.

## Problem

On phones, the personal homepage opens with a wall of misaligned text: the magazine-cover grid stacks the text pane first and buries the Casa Azul photo below it at a forced `80vh`. The name clamp (64px floor) overflows narrow screens; the masthead meta, photo caption, and cover-line grid misalign.

## Target

**Image-first mobile hero:** Casa Azul fills the first viewport below the nav, with **"Ayonika Bose." in white overlapping the lower third of the photo**. Remaining text (kicker → alias → deck → 5 section links) follows below in a compact block. On mobile only, hide: the caption quote, the faux barcode, the "San Francisco Fog · Mexico City Sun · New York City" masthead line, and the FridaMotif SVG (user-approved). Desktop ≥901px must render identically to today. Career side untouched.

## Files touched (nothing else)

- `app/globals.css` — bulk of the work (`ed-*` selectors only)
- `components/personal/PersonalHero.tsx` — two tiny edits
- `components/Nav.tsx` — one style fix

## Architecture decision (final)

CSS-only restructure. `.ed-cover` is a grid with `__left`/`__right` as direct children, so `order: -1` on `.ed-cover__right` inside the existing `@media (max-width: 900px)` block puts the image first with no DOM change. The real `<h1 class="ed-cover__name">` stays in the left pane's DOM (h1 near top for screen readers) but on mobile is absolutely positioned over the image row, whose height is known (`calc(100svh - 56px)` — nav is fixed h-14, `<main>` has `pt-14`). No duplicated text, no desktop-layout flattening.

## Step 1 — `components/personal/PersonalHero.tsx`

1. Add a class to the decorative motif so CSS can hide it: `<FridaMotif className="ed-cover__motif" ... />` (component already accepts className).
2. Reduced motion: `const reduce = useReducedMotion();` (framer-motion) and pass `initial={reduce ? false : {...existing}}` on each motion element in the hero.

## Step 2 — `app/globals.css`: rewrite the ≤900px cover block (currently ~lines 671–685)

```css
@media (max-width: 900px) {
  .ed-cover {
    grid-template-columns: 1fr;
    position: relative;            /* anchor for the overlaid name */
    min-height: auto;
    overflow-x: clip;              /* belt-and-braces vs decorative overflow */
  }

  /* Image first, fills first viewport below the 56px fixed nav */
  .ed-cover__right {
    order: -1;
    height: calc(100svh - 56px);
    min-height: 420px;
    max-height: 820px;
  }

  /* Name overlays the photo, bottom-pinned to the image row */
  .ed-cover__name {
    position: absolute;
    z-index: 3;
    left: 20px;
    right: 20px;
    top: calc(100svh - 56px);
    transform: translateY(-100%);
    padding-bottom: 88px;          /* clears caption meta; if overlap at 375px, raise this — don't move the anchor */
    color: #FFFFFF;
    pointer-events: none;
  }
  .ed-cover__name-last { color: #FFFFFF; } /* accent color fails contrast on photo */
  .ed-cover__name-first { font-size: clamp(44px, 11vw, 88px); }
  .ed-cover__name-last  { font-size: clamp(40px, 10vw, 80px); }

  .ed-cover__left {
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    min-height: auto;
    padding: 28px 20px 40px;
    gap: 24px;
  }
  .ed-cover__stack { margin: 0; gap: 0.75rem; }

  /* Masthead stacks; hide the long three-city line */
  .ed-cover__masthead {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    padding-bottom: 0.7rem;
  }
  .ed-cover__masthead-meta { flex-direction: row; flex-wrap: wrap; align-items: flex-start; gap: 0.18rem 1rem; }
  .ed-cover__masthead-meta span:last-child { display: none; }

  /* Caption: no collisions; quote hidden (name owns the image) */
  .ed-cover__caption {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    left: 20px; right: 20px; bottom: 16px;
  }
  .ed-cover__caption-quote { display: none; }
  .ed-cover__caption-meta { white-space: normal; text-align: left; }

  /* Hide decorations */
  .ed-cover__motif   { display: none; }
  .ed-cover__barcode { display: none; }

  /* Cover lines: room for titles + 44px touch targets */
  .ed-cover__line { grid-template-columns: 24px 1fr 20px; gap: 0.75rem; padding: 1rem 0; }
  .ed-cover__line-kicker { display: none; }

  /* Scrim: white display type ≥3:1, caption meta ≥4.5:1 */
  .ed-cover__overlay {
    background: linear-gradient(180deg,
      rgba(0,0,0,0.10) 0%,
      rgba(0,0,0,0)    30%,
      rgba(0,0,0,0)    52%,
      rgba(0,0,0,0.38) 74%,
      rgba(0,0,0,0.66) 100%);
  }
}
```

With the h1 out of flow, the text block below the image reads: kicker (¶ Cover Story) → alias → deck → 5 section links. Use `100svh`, never `100vh` (iOS URL-bar jump).

## Step 3 — `app/globals.css`: append a new phone tier

```css
@media (max-width: 640px) {
  .ed-cover__name-first { font-size: clamp(40px, 12.5vw, 52px); }
  .ed-cover__name-last  { font-size: clamp(36px, 11.5vw, 48px); }
  .ed-cover__alias { font-size: 18px; }
  .ed-cover__deck  { font-size: 15px; max-width: none; padding-left: 0.9rem; }
  .ed-cover__masthead-title { font-size: 17px; }
  .ed-cover__left { padding: 24px 20px 36px; }
}
```

If "Ayonika" wraps at 320px, drop the floor to 38px.

## Step 4 — `components/Nav.tsx`

Change the two hardcoded `fontSize: "48px"` in the mobile overlay menu (~lines 132, 151) to `fontSize: "clamp(32px, 9vw, 48px)"`. Nav height stays 56px, so the hardcoded `-56` smooth-scroll offset and `pt-14` on `<main>` remain correct.

## Step 5 — Accessibility (all viewports, benign on desktop)

Add `.ed-cover__line:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }`. Keep the existing alt text and text-shadow. H1 stays near the top of the DOM (no duplication).

## Gotchas

- Turbopack root is pinned in `next.config.ts`; if the dev server misbehaves (000 responses / module resolution errors), wipe `.next` fully and restart.
- This repo's CLAUDE.md is partly stale (old fonts/component names) — trust `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.
- Don't edit anything outside the `ed-*` selectors and the files listed; the career side shares `app/page.tsx` and the Nav.

## Verification checklist

1. `npm run build` passes clean.
2. `next dev`, Chrome device emulation at **375px** and **390px** (spot-check 320, 768, 1280):
   - First paint: Casa Azul fills the viewport below the nav; "Ayonika / Bose." in white at the image's lower third; no horizontal scroll.
   - Below the fold: kicker → alias → deck → 5 cover lines; no barcode/motif/quote/city-line; nothing clipped.
   - Cover-line taps scroll to the right sections with correct offset.
   - **≥1280px pixel-identical to before** (only diff: focus-visible outline). Career view unchanged.
   - `prefers-reduced-motion: reduce`: hero renders without entrance animation.
   - Hamburger menu at 320px: links fit.
3. Only after visual verification: commit and push to `main` (Vercel auto-deploys), then re-check production on an actual phone.
