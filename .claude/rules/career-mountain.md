---
description: CareerMountain component architecture - peaks, cards, highlights, GSAP scroll triggers
globs: components/CareerMountain/**
---

# CareerMountain Component

Scroll-pinned SVG mountain ridge with 4 ascending peaks. Each peak has a milestone card and highlight bubbles that reveal on scroll via GSAP ScrollTrigger.

## SVG Geometry

- ViewBox: `1400 x 700`
- Three layers: FAR_RIDGE (background), MAIN_RIDGE (primary), RIDGE_LINE (top stroke)
- Constants: `VB_W = 1400`, `VB_H = 700`

## Peak Positions

Cards are positioned as percentage of viewbox. `card` determines if the frosted-glass card sits above or below the ridge.

```
Peak 0: x=280,  y=460, card=above  (Ovative Group, 2020)
Peak 1: x=620,  y=360, card=below  (WITHIN Co, 2021)
Peak 2: x=940,  y=260, card=above  (Sigma - Analytics Engineer, 2022)
Peak 3: x=1180, y=185, card=above  (Sigma - AI Apps Engineer, 2024)
```

## Scroll Thresholds

Cards reveal at these scroll percentages (front-loaded so last card has reading room):
```
[0.08, 0.22, 0.36, 0.50]
```

## MilestoneCard

- Frosted glass: `rgba(255,255,255,0.72)` + `blur(16px) saturate(180%)`
- Width: 230px, border-radius: 16px
- Y offset: `above = -150px`, `below = +50px` from peak
- Starts `opacity: 0`, GSAP sets to 1
- Child elements cascade in via CSS transition delays (0.06s, 0.12s, 0.18s, 0.24s, 0.30s)

## Highlight Bubbles

Positioned relative to peaks using margin offsets: `hl(className, peakIndex, marginLeft, marginTop, rotation, icon, text)`

The GSAP animation loop iterates `[0, 1, 2]` per peak, so up to 3 highlight bubbles per peak are animated. Class pattern: `cm-hl-{peakIdx}-{bubbleIdx}`

**Current highlights:**
```
Peak 0: "First job out of college", "Built predictive ROAS models"
Peak 1: "Moved to NYC", "Pitched Estee Lauder"  (below card, mt=260/310)
Peak 2: "Worked with exec team", "Sigma hackathon winner", "Moved to San Francisco"
Peak 3: "Built CRM replacement", "Reports to CMO, COO & CEO"
```

## Data Source

Timeline data: `content/career/milestones.json` (imported via `milestones.ts`)
Highlight text: hardcoded in `CareerMountain.tsx` (not from JSON)

## Key Rules

- Highlight bubbles for `below` cards need larger marginTop values (260+) to clear the card
- Adding a new highlight requires updating the GSAP loop range if going beyond index 2
- Icons come from `lucide-react` (GraduationCap, TrendingUp, MapPin, etc.)
- Peak dots have animated glow rings (CSS keyframes in globals.css)
