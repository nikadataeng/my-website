# Animation Review — Chartmetric-Inspired Polish

**Branch:** `feature/chartmetric-animations`  
**Status:** Staged for review — not pushed, not deployed.

---

## What I Found on the Chartmetric Site

The Chartmetric 2024 Year in Music report (https://reports.chartmetric.com/2024/chartmetric-year-in-music-2024) uses these key design and animation patterns:

1. **Word-by-word stagger reveals** — Large display copy (section headers, data callouts) reveals word-by-word with a spring ease curve. Creates a "broadcast" feel — words feel like they're being announced, not just appearing.

2. **Large-number stat callouts** — Numbers like "11,382,018 artists tracked" are displayed at dramatic display scale with tabular-numeral fonts. Often paired with a count-up animation on scroll.

3. **Layered depth / parallax** — Background elements (ridge layers, image panels) scroll at a slightly different rate than foreground copy, creating cinematic depth without heavy JS.

4. **Gradient section breaks** — Subtle full-width gradient washes separate major content categories instead of hard borders. Usually very low-opacity, just enough to create visual breathing room.

5. **Staggered list/data reveals** — Any repeating list (tier labels, platform stats) cascades in with per-item delays — no item animates before the one above it finishes.

6. **Clip-path text wipes** — Headlines are revealed via `clipPath: inset(-10% 100% -10% 0)` → `inset(-10% 0% -10% 0)`, a left-to-right wipe that feels editorial.

7. **Section pacing via generous whitespace** — 120–160px section gaps. Each major category (Artists / Tracks / Genres) feels like a new page.

8. **Clean typographic hierarchy** — Display numbers enormous, label caps tiny (10–11px, 0.2em tracking), body modest. No middle-ground sizes.

---

## What Was Implemented

### New Components

| File | What it does |
|------|-------------|
| `components/AnimatedWord.tsx` | Splits any string into words, reveals each with a spring-eased `y: 110% → 0%` stagger on scroll entry. Used in `POV.tsx` on the blockquote. |
| `components/AnimatedCounter.tsx` | Count-up animation from `from` to `to` using `easeOutExpo` on `requestAnimationFrame`. Triggers once in view via Framer Motion `useInView`. |
| `components/GradientDivider.tsx` | Full-width 2px gradient rule that wipes in (scaleX) when scrolled to. Sits between sections in `page.tsx` as a visual breath. |

### Modified Components

| File | What changed |
|------|-------------|
| `components/ScrollReveal.tsx` | Added `variant` prop: `"fade-up"` (default, unchanged), `"fade-left"`, `"clip-wipe"` (clipPath left→right), `"scale-up"` (opacity + scale 0.96→1). Backward-compatible — all existing usages unchanged. |
| `components/Hero.tsx` | Added `useScroll` + `useTransform` parallax on the sublines block: as you scroll down, sublines drift upward by -30px and fade to 0 opacity. Creates layered depth without touching the headline animations. Everything else unchanged. |
| `components/IdentityBlock.tsx` | Replaced the single `ScrollReveal` wrapper around each list with a `StaggeredList` component: each `//` list item fades + slides in from x: -16 with a 70ms per-item cascade. Headshot now uses `variant="scale-up"` for a subtle entrance. |
| `components/POV.tsx` | Blockquote now uses `AnimatedWord` (word-by-word reveal, 40ms stagger). Added a three-column stat row below the copy with `AnimatedCounter` callouts: `$100K+` (SaaS spend replaced), `4` (systems in production), `3 yrs` (building AI). Stats are grounded in the actual project content. |
| `app/page.tsx` | Added `<GradientDivider />` between Hero→About, About→Journey, and Projects→POV. Purely cosmetic. |
| `app/globals.css` | Added `scroll-behavior: smooth` on `html`, `.cm-reveal` GPU compositing hint, `.cm-stat` tabular-numeral font features, and a `prefers-reduced-motion` override that disables `will-change`. |

---

## What Was Intentionally Skipped

| Pattern | Why skipped |
|---------|-------------|
| **Character-by-character reveal** | Too granular for Nika's copy length — makes long sentences feel slow/gimmicky. Word-by-word is the right resolution. |
| **Full parallax image sections** | There are no hero images in the career view, so there's nothing to parallax. The CareerMountain already has a GSAP far-ridge parallax. Personal view has its own design language. |
| **Heatmap / gauge / Sankey data visualizations** | These are data-specific to Chartmetric's music content. Nika's site doesn't have tabular data to visualize this way. Adding fake charts would clutter. |
| **GSAP for the new animations** | GSAP is already used (well) in CareerMountain. Everything new uses Framer Motion to stay consistent with the rest of the career view. No reason to mix paradigms outside CareerMountain. |
| **Personal view modifications** | The personal view has a completely different design language (Vanity Fair editorial). Chartmetric patterns would clash. Kept it clean. |
| **Horizontal carousel / Previous+Next navigation** | Chartmetric uses this for artist sections. No content structure on Nika's site warrants it. |

---

## How to Preview

```bash
cd ~/Documents/My\ Website
npm run dev
```

Then open http://localhost:3000

**What to look at:**
1. **Hero** — scroll down slowly after load; notice sublines drift upward and fade (parallax depth)
2. **About section** — watch the `// GTM automation systems` list items cascade in from the left
3. **POV section** — scroll to it slowly; blockquote words reveal one-by-one, then stat numbers count up
4. **Section dividers** — the thin gradient rules between Hero/About and About/Journey

---

## Deploy Command (once approved)

```bash
# On Vercel (via CLI):
vercel --prod

# Or push the branch and merge via GitHub → Vercel auto-deploys main
git push origin feature/chartmetric-animations
# Then open a PR and merge
```

---

## Summary

Five files changed, three new components added — all additive. The existing hero wipe, CareerMountain GSAP scroll story, Projects stagger, and personal editorial view are completely untouched. The new layer adds Chartmetric's signature word-stagger + count-up + gradient-breath patterns to the career view sections that previously had either no animation or just a simple fade.
