# Career View — Wireframe & Spec

**Theme:** The Atlantic — warm cream editorial, Playfair Display + Inter, burgundy-red accent  
**Audience:** Hiring managers, potential collaborators, technical peers  
**Tone:** Direct, confident, measured. No fluff. Outcomes-first.  
**URL state:** Default view, also activated when `view === "career"` in ViewContext

---

## 0. Design Language Alignment

This section documents gaps between what is currently built and the canonical design language. Items marked **Canonical spec:** represent the intended direction; items marked **Current implementation:** describe what exists today. The wireframe sections below are accurate to what is built — this section tells you where they diverge from canonical.

---

### 0.1 Display Font — Playfair Display → Cormorant Garamond

**Current implementation:** All display/hero headings use Playfair Display at weight 700, italic.

**Design Language Note:** The canonical display font is **Cormorant Garamond** (or Cormorant), weight **300–400**, never bold. The aesthetic goal is an elegant, light editorial serif — not a heavy-weight newspaper serif. Playfair at 700 is heavier and more compressed than intended.

**Canonical spec:**
```css
font-family: 'Cormorant Garamond', serif;
font-weight: 300; /* or 400 — never 700 */
letter-spacing: -0.02em; /* on headings ≥ 26px */
```

**Migration note:** Every instance of `font-family: 'Playfair Display'` in Hero, Projects `ProjectRow` titles, and POV pull quote should be replaced with Cormorant Garamond at 300–400. The italic style is preserved — Cormorant Garamond Italic at 300 reads as equally editorial but lighter and more refined.

---

### 0.2 Monospace Font — `// code comments` → JetBrains Mono

**Current implementation:** The `// comment` style lists in IdentityBlock (What I Build, Current Stack columns) are rendered in Inter, described in the wireframe as "monospace-style (still Inter)."

**Design Language Note:** The canonical mono font is **JetBrains Mono**, used for code, technical labels, timestamps, and data values. The `// item` lists in IdentityBlock are exactly this use case.

**Canonical spec:**
```css
font-family: 'JetBrains Mono', monospace;
font-size: 13px; /* --text-sm */
color: var(--color-muted); /* #7A7468 / --text-secondary */
```

Apply to: IdentityBlock columns 2 and 3 (`// GTM automation systems`, `// Snowflake Cortex`, etc.)

---

### 0.3 Monet Accent Palette — Missing

**Current implementation:** The color system defines a single accent: `--color-accent: #C41230` (burgundy-red). No secondary palette exists.

**Design Language Note:** The canonical design language adds a full **Monet accent palette** drawn from Monet's Water Lilies series. These are low-saturation, impressionist-inspired accent colors used sparingly — no more than 2–3 per view.

**Canonical Monet palette:**
```
--monet-lily-green:   #89A89E   (primary accent for badges, section lines, hover glows)
--monet-mauve:        #B5B0C5   (secondary — decorative moments, subtle highlights)
--monet-blush:        #CCB8C2   (tertiary — soft backgrounds, empty states)
--monet-sage:         #9FAE98
--monet-wheat:        #EAD992
--monet-sky:          #9FB8C8
```

**Recommended application in career view:**

| Element | Monet token | Usage |
|---|---|---|
| Project tags (ONGOING, PRODUCTION, INFRASTRUCTURE) | `--monet-lily-green` | Monet-wash badge fill (see §0.8) |
| Section accent line (under editorial headers) | `--monet-lily-green` or `--monet-mauve` | Thin `1px` decorative rule |
| Card hover glow | `--monet-lily-green` at 15% opacity | Replaces hard black shadow (see §0.4) |
| AnimatedRule dividers | Can remain `--color-border` | No change needed |
| Decorative moments (hero gradient wash) | `--monet-mauve` + `--monet-sky` | See §0.11 |

Limit: Use at most 2 Monet accents in the career view — lily-green for interactive/badge states, mauve for decorative/gradient use.

---

### 0.4 Surface Spec — Soft Depth (Canonical) vs. Current Card-Lift

**Current implementation:** Cards use a "card-lift" on hover:
```css
/* Current — harder editorial feel */
.card:hover {
  transform: translateY(-2px);
  box-shadow: 3px 3px 0 #1A1A1A;
}
```
This produces a graphic, almost brutalist offset shadow — deliberately editorial and high-contrast.

**Design Language Note:** The canonical surface mode for the career view is **Soft Depth** — warmer, more refined, still has lift but with a diffuse shadow instead of a hard offset.

**Canonical spec — Soft Depth:**
```css
/* Canonical default card */
.card {
  background: #FFFFFF;
  border: 1px solid var(--border);       /* #E8E6E0 */
  border-radius: var(--radius-md);       /* 10px */
  box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04);
}

/* Canonical hover — Soft Depth with optional Monet glow */
.card:hover {
  box-shadow:
    0 0 0 3px rgba(137, 168, 158, 0.15),  /* monet-lily-green glow */
    0 8px 24px rgba(0,0,0,0.06);
  transform: translateY(-1px);            /* softer than current -2px */
  transition: all 0.2s ease;
}
```

**Delta summary:**
- Current shadow: `3px 3px 0 #1A1A1A` (opaque, offset) → Canonical: `0 8px 24px rgba(0,0,0,0.06)` (diffuse)
- Current lift: `translateY(-2px)` → Canonical: `translateY(-1px)`
- Current glow: none → Canonical: Monet lily-green ring at 15% opacity

**Note:** The current hard-shadow aesthetic is not wrong — it's a deliberate editorial choice consistent with the Atlantic theme. The canonical spec is softer and is the intended future direction, not an urgent bug fix.

---

### 0.5 Border Radius Tokens — Missing

**Current implementation:** Border radius values are applied ad hoc; no token table exists in the wireframe.

**Canonical spec:**
```
--radius-sm:   6px
--radius-md:   10px    ← default for cards (MiscGrid, ProjectRow hover states)
--radius-lg:   16px    ← larger surfaces, modals
--radius-xl:   24px    ← pill-style containers
--radius-full: 9999px  ← badges, tags, ViewToggle pill
```

Apply `--radius-full` to project tags (ONGOING, PRODUCTION, INFRASTRUCTURE) and the ViewToggle pill. Apply `--radius-md` to MiscGrid cards.

---

### 0.6 Spacing Token Table — Missing

**Current implementation:** Spacing is described in Tailwind class names (`gap-16`, `py-8`, `px-6`, etc.) without a token reference.

**Canonical spec — 8px base grid:**
```
--space-1:  4px     --space-2:  8px     --space-3:  12px    --space-4:  16px
--space-5:  20px    --space-6:  24px    --space-8:  32px    --space-10: 40px
--space-12: 48px    --space-16: 64px    --space-20: 80px    --space-24: 96px
```

**Key layout rules:**
- Minimum internal card padding: **24px** (`--space-6`)
- Section vertical padding: **48px** (`--space-12`) minimum
- Hero vertical padding: **80px** (`--space-20`)
- Max content width: **1200px** (current 6xl/1152px is close — acceptable)
- Prose max-width: **680px** (see §0.10)

---

### 0.7 Animation — Canonical Easing Values vs. Custom Easing

**Current implementation:** ScrollReveal and most transitions use a custom cubic-bezier `[0.16, 1, 0.3, 1]` — an aggressive ease-out that overshoots slightly.

**Design Language Note:** The canonical easing tokens are:

```
--ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1)     ← standard deceleration; use for entrances
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1)     ← use for bidirectional transitions (e.g., toggle)
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)  ← slight overshoot; use for interactive "pop" moments
```

**Canonical duration tokens:**
```
--duration-fast:   150ms    ← micro-interactions (icon swaps, color changes)
--duration-base:   220ms    ← standard UI transitions (button hover, card lift)
--duration-slow:   350ms    ← panel transitions, drawer open/close
--duration-reveal: 600ms    ← scroll-triggered section entrances
```

**Canonical fade-up entrance (ScrollReveal):**
```css
from { opacity: 0; transform: translateY(12px); }
to   { opacity: 1; transform: translateY(0); }
/* duration: 600ms (--duration-reveal), easing: --ease-out */
```

**Current vs. canonical delta:**

| Animation | Current | Canonical |
|---|---|---|
| ScrollReveal y-offset | 20px | 12px |
| ScrollReveal duration | 0.5s | 0.6s (`--duration-reveal`) |
| ScrollReveal easing | `[0.16, 1, 0.3, 1]` | `--ease-out` `cubic-bezier(0.0, 0.0, 0.2, 1)` |
| Card hover lift | 200ms, `ease` | 220ms (`--duration-base`), `--ease-out` |
| Stagger increment | 0.06–0.08s | 80ms per child (nth-child: 0ms, 80ms, 160ms…) |
| ViewToggle spring | Framer spring (stiffness 500, damping 40) | `--ease-spring` — matches intent, acceptable |
| Button hover | not specified | `scale(1.02)`, active: `scale(0.98)` |
| Hero clip-path reveal | 0.6s, `easeInOut` | Keep — consistent with `--duration-reveal` |

**Where to use `--ease-spring`:** ViewToggle pill slide, button active press, badge pop-in on hover. Not for scroll entrances — those use `--ease-out`.

---

### 0.8 Badge/Tag Treatment — Bordered Pill → Monet-Wash Badge

**Current implementation:** Project status tags (ONGOING, PRODUCTION, INFRASTRUCTURE) use:
```css
border: 1px solid var(--color-border);
/* plain bordered pill, no fill */
```

**Design Language Note:** The canonical badge style uses a Monet-wash fill with no visible border stroke — subtle background tint with a slightly darker text in the same family.

**Canonical spec:**
```css
.badge {
  background: rgba(137, 168, 158, 0.12);  /* monet-lily-green at 12% */
  color: #5A8A7A;                          /* deeper lily-green for text */
  font-size: 11px;                         /* --text-xs */
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 9999px;                   /* --radius-full */
  border: none;
}
```

The "REPLACED: [tool]" labels above project titles could remain in `.text-label` style (no badge treatment) — the badge style applies specifically to the status tags (ONGOING, PRODUCTION, INFRASTRUCTURE).

---

### 0.9 `prefers-reduced-motion` — Not Documented

**Current implementation:** Not mentioned anywhere in the wireframe or (as of writing) explicitly handled in ScrollReveal or Hero animation code.

**Design Language Note:** All animations must respect the `prefers-reduced-motion: reduce` media query. This is a hard requirement, not a nice-to-have.

**Canonical implementation pattern:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

For Framer Motion components, use the `useReducedMotion()` hook and conditionally disable or snap animations:
```tsx
const prefersReduced = useReducedMotion();
const variants = prefersReduced
  ? { hidden: {}, visible: {} }         // no motion
  : { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };
```

**Apply to:** ScrollReveal, Hero clip-path lines, AnimatedRule, PageTransition, rotating circle decoration, staggered list entrances.

---

### 0.10 Prose Max-Width — `max-w-2xl` / `max-w-3xl` → 680px

**Current implementation:**
- IdentityBlock Bio column: no explicit max-width cap on prose
- POV expansion paragraph: `max-width: max-w-2xl` (Tailwind ≈ 672px — close but not explicit)

**Canonical spec:** Prose max-width is **680px** (`--prose-max: 680px`).

```css
.prose { max-width: 680px; }
```

**Apply to:**
- IdentityBlock Column 1 (Bio): cap prose at 680px within its grid column
- POV expansion paragraph: set explicitly to 680px (rather than relying on Tailwind `2xl` approximation)
- Any future long-form copy blocks

---

### 0.11 Hero Background — Missing Gradient Wash

**Current implementation:** The hero section has a flat `--color-bg` (#F7F4EE) background. No gradient or texture treatment.

**Design Language Note:** The design language recommends a **gradient wash** for hero sections to add depth and impressionist mood without adding imagery.

**Canonical spec — gradient wash:**
```css
/* Option A — canonical gradient wash */
background: linear-gradient(160deg,
  #FFFFFF    0%,
  #F0EDF5   40%,   /* touches monet-mauve territory */
  #E8EFF3   80%,   /* touches monet-sky territory */
  #FFFFFF  100%
);

/* Option B — simpler warm-to-cool */
background: linear-gradient(135deg,
  #F8F7F5   0%,
  #EEE9F0  50%,
  #E8EEF0 100%
);
```

**Recommendation:** Apply as a subtle background to the full hero `<section>` element. The gradient should be almost imperceptible at first glance — it adds dimensionality without drawing attention to itself. Start with Option B (matches the canonical `--surface` gradient) and adjust if the warm cream (`#F7F4EE`) current tone needs to be preserved more strongly.

---

## 1. Design System

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#F7F4EE` | Page background — warm cream |
| `--color-ink` | `#1A1A1A` | Body text, headings, icons |
| `--color-accent` | `#C41230` | CTA links, highlighted words, arrows, hover underlines |
| `--color-muted` | `#7A7468` | Section labels, secondary text, code comments |
| `--color-surface` | `#EDEAE2` | Card backgrounds, WhatIReplace section bg |
| `--color-border` | `#D8D3C8` | Divider lines, card outlines |

Special accent used only in Nav/Toggle:
- `#00C896` — green pill in ViewToggle (Personal indicator)

**Design Language Note — Monet palette (currently missing, canonical additions):**

| Token | Value | Recommended usage in career view |
|---|---|---|
| `--monet-lily-green` | `#89A89E` | Badge fills, section accent lines, hover glow |
| `--monet-mauve` | `#B5B0C5` | Decorative moments, hero gradient |
| `--monet-blush` | `#CCB8C2` | Soft backgrounds, empty states |
| `--monet-sage` | `#9FAE98` | Spare use — tertiary decorative |
| `--monet-wheat` | `#EAD992` | Spare use — data highlights |
| `--monet-sky` | `#9FB8C8` | Hero gradient, decorative washes |

Limit to 2–3 Monet accents per view. For career view: prefer `--monet-lily-green` (interactive) + `--monet-mauve` (decorative).

**Design Language Note — Canonical base palette alignment:**

The design language defines a base palette that maps onto the current implementation as follows:

| Canonical token | Canonical value | Current equivalent |
|---|---|---|
| `--background` | `#FFFFFF` | Not used (career uses `#F7F4EE`) |
| `--surface` | `#F8F7F5` | `--color-bg` (`#F7F4EE` — warmer) |
| `--surface-raised` | `#F2F0EC` | `--color-surface` (`#EDEAE2`) |
| `--border` | `#E8E6E0` | `--color-border` (`#D8D3C8` — slightly warmer) |
| `--text-primary` | `#1A1917` | `--color-ink` (`#1A1A1A` — nearly identical) |
| `--text-secondary` | `#6B6862` | `--color-muted` (`#7A7468` — close) |

The career view's warm-cream palette is intentionally warmer than the canonical base — this is an acceptable and deliberate deviation for the Atlantic theme.

---

### Typography

| Class | Font | Size | Weight | Style | Tracking | Leading |
|---|---|---|---|---|---|---|
| `.text-hero` | Playfair Display | `clamp(64px, 9vw, 112px)` | 700 | italic | -0.025em | 0.95 |
| `.text-section` | Playfair Display | `clamp(32px, 4.5vw, 58px)` | 700 | italic | -0.015em | 1.1 |
| `.text-heading` | Playfair Display | `26px` | 700 | normal | — | — |
| `.text-label` | Inter | `11px` | 500 | normal | 0.12em | — |
| body | Inter | `17px` | 400 | normal | — | 1.7 |

**Design Language Note — Display font direction:** Canonical design language specifies **Cormorant Garamond** at weight 300–400 as the display font, replacing Playfair Display at 700. See §0.1 for full migration notes. The table above reflects current implementation.

**Canonical type scale (for reference):**
```
--text-xs:   11px / 1.5    --text-sm:  13px / 1.5
--text-base: 15px / 1.6    --text-lg:  17px / 1.5
--text-xl:   20px / 1.4    --text-2xl: 26px / 1.3
--text-3xl:  36px / 1.2    --text-4xl: 52px / 1.1
--text-5xl:  72px / 1.0
```

Rules: Cormorant at weight 300–400, never bold. Letter-spacing `-0.02em` on headings ≥ `--text-2xl` (26px). `0.04em` on ALL CAPS labels (current `0.12em` is more aggressive — acceptable for the Atlantic label style). Mix Cormorant display + Inter body = canonical editorial signature.

**Design Language Note — Mono font:** Add JetBrains Mono as the third font in the stack, for `// code comment` lists and technical labels. See §0.2.

---

### Spacing

| Token | Value |
|---|---|
| `--section-gap` | `clamp(80px, 12vw, 140px)` |
| Container max-width | `6xl` = 1152px |
| Horizontal padding | `px-6` → `md:px-12` → `lg:px-20` |

**Design Language Note — 8px grid tokens:** See §0.6 for the full canonical spacing token table. Key rules: min 24px internal card padding, 48px section padding, 80px hero padding, 680px prose max-width.

---

### Motion Catalog

| Pattern | Duration | Easing | Used In |
|---|---|---|---|
| Clip-path reveal | 0.6s | `easeInOut` | Hero title lines |
| Fade + y-translate (20→0px) | 0.5s | `[0.16, 1, 0.3, 1]` | ScrollReveal (all sections) |
| Staggered list items | 0.06–0.08s delay increments | same | WhatIReplace, Projects |
| AnimatedRule scale | 0.5s | `easeInOut` | Section dividers |
| Page fade-in | 0.3s | `easeOut` | PageTransition wrapper |
| Hover card lift | 200ms | ease | Cards: `translateY(-2px)` + `box-shadow: 3px 3px 0 #1A1A1A` |
| Toggle pill spring | stiffness 500, damping 40 | spring | ViewToggle |
| Rotating text circle | 18s loop | linear | Hero bottom-right |
| Arrow hover shift | 200ms | ease | Project rows (→ moves +8px) |

**Design Language Note — Canonical easing values:** See §0.7 for the full canonical easing token set and a delta table comparing current vs. canonical values per animation. Key changes: y-offset 20→12px, ScrollReveal duration 0.5s→0.6s, easing `[0.16,1,0.3,1]`→`--ease-out`. The ViewToggle spring is consistent with `--ease-spring` intent.

**Design Language Note — `prefers-reduced-motion`:** All animations in this catalog must be suppressed or snapped when `prefers-reduced-motion: reduce` is active. See §0.9 for implementation pattern.

---

## 2. Global Components

### Nav — `components/Nav.tsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ ayonika          work · blog · about    [Career|Personal]  🔗 say hello → │
└──────────────────────────────────────────────────────────────────────┘
```

- **Position:** Fixed, `z-50`, full width, `backdrop-blur`
- **Height:** ~56px
- **Background (career):** `rgba(247,244,238,0.85)` — semi-transparent cream with blur
- **Border-bottom:** `1px solid var(--color-border)`
- **Left:** Brand `ayonika` — Inter, small, bold
- **Center (desktop only):** Links — `work` · `blog` · `about` with `.link-underline` hover animation
- **ViewToggle:** Two-button pill toggle ("Career" / "Personal"). Active = white pill. Spring-animated slide.
- **Right:** LinkedIn icon (16×16) + `say hello →` in `--color-accent`
- **Mobile:** Hamburger icon. Taps open full-screen overlay with staggered large-text navigation links.
- **TODO:** Blog and About pages don't exist yet — links are placeholders

### Footer — `components/Footer.tsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│  ayonika · 2026          work · blog · about          🔗  say hello →  │
└──────────────────────────────────────────────────────────────────────┘
```

- **Border-top:** `1px solid var(--color-border)`
- **Padding:** `py-8`
- **Left:** `ayonika · [current year]` — 11px, muted, Inter
- **Center:** Nav links with underline hover
- **Right:** LinkedIn icon + `say hello →` in accent
- **Email:** `hello@ayonika.dev`
- **LinkedIn:** `linkedin.com/in/ayonikabose/`

### Utility Components

**ScrollReveal — `components/ScrollReveal.tsx`**  
Wraps sections. Uses Framer Motion `useInView` with `-80px` margin. Animates `opacity: 0→1, y: 20→0` on scroll. `once: true`. Accepts `delay` prop.

**Design Language Note:** Canonical y-offset is 12px (not 20px). Duration should be 600ms (`--duration-reveal`). Add `useReducedMotion()` guard — see §0.9.

**AnimatedRule — `components/AnimatedRule.tsx`**  
`1px` horizontal rule. Scales `scaleX: 0→1` from left on view entry. Used between every numbered section.

**Design Language Note:** This component fulfills the canonical "Divider" spec — `border-top: 1px solid var(--border)`. Never use `<hr>` per design language. Current implementation is correct.

**PageTransition — `components/PageTransition.tsx`**  
Wraps entire career view. `opacity: 0→1` fade over 0.3s, `easeOut`.

---

## 3. Page Layout (ASCII Wireframe)

```
╔══════════════════════════════════════════════════════════════════╗
║  NAV (fixed, 56px)                                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  HERO                                      (100vh − 56px)        ║
║  ┌────────────────────────────────────┐                          ║
║  │ I build AI systems                 │                          ║
║  │ that replace SaaS.                 │   ╭─────────────╮        ║
║  │                                    │   │  ↻ rotating │        ║
║  │ AI Applications Engineer @ Sigma   │   │    circle   │        ║
║  │ Currently: replacing Salesforce... │   ╰─────────────╯        ║
║  └────────────────────────────────────┘                          ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  WHAT I REPLACE                        (surface bg)              ║
║  ┌────────────────────────────────────────────────────────────┐  ║
║  │ WHAT I REPLACE               →                             │  ║
║  │ Salesforce          →   Internal AI CRM                    │  ║
║  │ Rattle · Clari      →   Snowflake-native forecasting        │  ║
║  │ FinOps SaaS         →   Warehouse-native reporting          │  ║
║  │ RevOps platforms    →   LLM-powered workflow automation     │  ║
║  └────────────────────────────────────────────────────────────┘  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  01 — IDENTITY BLOCK                                             ║
║  ┌──────────────┬──────────────┬──────────────┐                  ║
║  │ Bio          │ What I Build │ Current Stack │                  ║
║  │              │              │               │                  ║
║  │ paragraph    │ // code list │ // code list  │                  ║
║  │ paragraph    │              │               │                  ║
║  └──────────────┴──────────────┴──────────────┘                  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  02 — PROJECTS                                                   ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ Vantage — Deal Slack Ops          2024–Present  ONGOING  │    ║
║  │ description text                                     →   │    ║
║  ├──────────────────────────────────────────────────────────┤    ║
║  │ GTM AI Stack — $100K SaaS Replacement  2023  PRODUCTION  │    ║
║  │ description text                                     →   │    ║
║  ├──────────────────────────────────────────────────────────┤    ║
║  │ Internal AI Frameworks + Playbooks     2023  INFRA       │    ║
║  │ description text                                     →   │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  03 — POV                                                        ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │                                                          │    ║
║  │  "The SaaS tools sitting on top of your data warehouse   │    ║
║  │   are the most replaceable software ever built."         │    ║
║  │                                                          │    ║
║  │  expansion paragraph (max-w-2xl)                         │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  04 — MISC GRID                                                  ║
║  ┌────────────┬────────────┬────────────┬────────────┐           ║
║  │ Currently  │ Latest     │ Last       │ Stack      │           ║
║  │ building   │ post       │ shipped    │            │           ║
║  │            │            │            │            │           ║
║  │ Vantage    │ blog link  │ Deal Slack │ Snowflake  │           ║
║  │            │            │ Ops        │ · Sigma    │           ║
║  └────────────┴────────────┴────────────┴────────────┘           ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  FOOTER                                                          ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 4. Section-by-Section Breakdown

---

### HERO — `components/Hero.tsx`

**Layout:** Full viewport height (`min-h-[calc(100vh-56px)]`), centered left-aligned content

**Content:**
```
Line 1: "I build AI systems"
Line 2: "that replace SaaS."
         ^^^^^^^^^^^^^^^^^ accent color (#C41230)

Subheading 1: "AI Applications Engineer at Sigma Computing · San Francisco"
Subheading 2: "Currently: replacing Salesforce with internal AI tooling"
```

**Design:**
- Font: Playfair Display italic, `.text-hero` (`clamp(64px, 9vw, 112px)`)
- Line-height: 0.95 (tight, editorial)
- "that replace SaaS." — second line, accent red
- Subheadings: Inter, `--text-body` (17px), `--color-muted`, fade in after title

**Design Language Note — Display font:** Canonical direction is Cormorant Garamond 300–400 italic, not Playfair Display 700 italic. See §0.1.

**Design Language Note — Hero background:** Currently flat cream (`#F7F4EE`). Canonical recommendation is a gradient wash for hero sections. See §0.11 for gradient spec.

**Animations:**
- Title lines: clip-path reveal (`clipPath: "inset(0 100% 0 0)" → "inset(0 0% 0 0)"`), 0.6s, staggered (line 2 delayed 0.15s)
- Subheadings: opacity + y fade, delays 0.5s / 0.6s, spring easing

**Design Language Note — Animation:** Subheading y-offset should be 12px (not 20px). Spring easing on subheadings is consistent with `--ease-spring` — this is correct use of spring (interactive pop). Add `useReducedMotion()` guard.

**Bottom-right decoration:**
- Circular SVG with rotating text: `"Taking out SAAS everyday · Taking out SAAS everyday · "`
- 18s linear rotation loop, `--color-muted`, hidden on mobile
- Size: ~120×120px, positioned absolute bottom-right of hero container

**TODO:**
- Consider adding a "scroll down" cue
- Hero image / profile photo (currently text-only)
- Link or CTA below subheadings

---

### WHAT I REPLACE — `components/WhatIReplace.tsx`

**Layout:** Single column, full-width, `--color-surface` background

**Content:**
```
Section label: "WHAT I REPLACE"

Row 1: Salesforce                  →   Internal AI CRM
Row 2: Rattle · Clari              →   Snowflake-native forecasting
Row 3: FinOps SaaS                 →   Warehouse-native reporting
Row 4: RevOps platforms            →   LLM-powered workflow automation
```

**Design:**
- Label: `.text-label` (11px, uppercase, muted, 0.12em tracking)
- Left column (old tools): muted gray
- Arrow `→`: `--color-accent` or green
- Right column (replacements): bold ink
- Rows: `py-4`, `border-bottom: 1px solid var(--color-border)`
- Max container width: 6xl

**Animations:**
- Each row: ScrollReveal with staggered delays (0.06s × index)

**Design Language Note:** Stagger increment should be 80ms per canonical spec (0.08s is already at the upper bound — acceptable).

**TODO:**
- Could expand with quantified outcomes (e.g., "$100K saved") inline
- Consider click-through to relevant project detail

---

### IDENTITY BLOCK — `components/IdentityBlock.tsx`

**Layout:** 3-column grid (1 col mobile, 3 col desktop). Section number `01 —` with AnimatedRule above.

**Decorative element:** Large `"01"` in background — `240px`, `opacity: 0.04`, non-interactive

**Column 1 — Bio:**
```
"I build AI systems that make GTM and RevOps teams independent of 
the SaaS vendors they used to pay for.

At Sigma Computing, I work directly with the CMO, COO, and CEO to 
replace external tools — pipeline intelligence platforms, deal 
management software, reporting automation — with warehouse-native 
AI built on Snowflake and Sigma. My systems don't supplement 
the existing stack. They replace it.

I don't build demos."
```

**Column 2 — What I Build:**
```
// GTM automation systems
// Pipeline & forecast intelligence
// Slack-native AI agents
// Warehouse-native CRM tooling
// Internal AI frameworks
```

**Column 3 — Current Stack:**
```
// Snowflake Cortex
// LLM APIs (OpenAI, Anthropic)
// Sigma Computing
// Slack API
// Python · SQL
```

**Design:**
- Section label `01 —`: `.text-label`
- Body text: Inter, 17px, `--color-ink`, line-height 1.7
- Code lists: `// item` format, `--color-muted`, monospace-style (still Inter)
- Column gap: `gap-16` or similar
- Max-width: full container (6xl)

**Design Language Note — Mono font:** Columns 2 and 3 (`// item` lists) should use **JetBrains Mono** at 13px (`--text-sm`), not Inter. This is the canonical mono font for code and technical labels. See §0.2.

**Design Language Note — Bio prose max-width:** Column 1 body copy should be capped at **680px** (`--prose-max`) within its grid column. See §0.10.

**Design Language Note — Section header:** Canonical editorial headers use a thin `1px` accent line in `--monet-lily-green` or `--monet-mauve` beside or beneath the section title. Consider adding this treatment to the `01 —` label area.

**Animations:**
- Columns staggered: delays 0.05s, 0.1s, 0.15s via ScrollReveal

**TODO:**
- Link to full About page (not yet built)
- Expand stack with more detail or versions

---

### PROJECTS — `components/Projects.tsx`

**Layout:** Single-column rows with horizontal rules between. Section number `02 —`.

**Decorative element:** Large `"02"` — `240px`, `opacity: 0.04`

**Project 1:**
```
Label:       REPLACED: Salesforce (CRM + deal management)
Title:       Vantage — Deal Slack Ops
Period:      2024–Present
Tag:         ONGOING
Description: "Salesforce is a $200B company. We're building the replacement 
             internally. Vantage is Sigma's AI-native CRM suite — Deal Slack 
             Ops is the first shipped app: Slack channels auto-created per 
             opportunity, linked to account and deal context at creation."
Stack:       Snowflake, Sigma, Slack API, LLM APIs
```

**Project 2:**
```
Label:       REPLACED: Rattle · Clari · Gong
Title:       GTM AI Stack — $100K SaaS Replacement
Period:      2023
Tag:         PRODUCTION
Description: "Replaced external GTM SaaS platforms with warehouse-native AI 
             systems built on Snowflake Cortex and LLM APIs. Outcome: $100K+ 
             annual cost savings. Capabilities: pipeline intelligence, 
             forecasting narratives, lead enrichment, buyer-intent scoring, 
             exec reporting automation."
Stack:       Snowflake Cortex, LLM APIs, Sigma, Slack
Partners:    CMO, COO, CEO
```

**Project 3:**
```
Label:       REPLACED: Dependence on a single engineer
Title:       Internal AI Frameworks + Playbooks
Period:      2023
Tag:         INFRASTRUCTURE
Description: "Built reusable AI app frameworks and API-driven automation 
             pipelines. Then documented them so non-engineering teams could 
             build AI workflows without buying new SaaS. The goal: make the 
             internal AI capability compounding, not dependent on a single 
             engineer."
```

**Design (per row — `ProjectRow` sub-component):**
- "REPLACED" label: `.text-label`, `--color-muted`
- Project title: Playfair italic, `clamp(20px, 2.5vw, 32px)`, `--color-ink`
- Period: right-aligned, `--color-muted`, `--text-label`
- Tag: bordered pill — `border: 1px solid var(--color-border)`, small, uppercase
- Description: Inter body, max-width `3xl`, `--color-ink`
- Stack/Partners: `--color-muted`, small
- Arrow `→`: right-aligned, slides +8px on row hover, `--color-accent`
- Dividers between rows: AnimatedRule (scale from left, `--color-border`)

**Design Language Note — Project title font:** Canonical direction is Cormorant Garamond 300–400 italic, not Playfair italic 700. See §0.1.

**Design Language Note — Status tags (ONGOING, PRODUCTION, INFRASTRUCTURE):** Currently use `border: 1px solid var(--color-border)`. Canonical spec is the **Monet-wash badge** style — `rgba(137,168,158,0.12)` fill, `#5A8A7A` text, `--radius-full`, no border. See §0.8 for full CSS.

**Design Language Note — Card hover:** If ProjectRow receives card-style hover treatment, apply Soft Depth spec (see §0.4) rather than the hard `3px 3px 0 #1A1A1A` shadow. The `→` arrow shift (+8px) remains unchanged.

**Animations:**
- Rows stagger: `0.07s × index` delay via ScrollReveal

**TODO:**
- Case study links (currently no `/work/[slug]` routes exist)
- Could add a "view all projects" link to a dedicated work page
- Outcome metrics could be expanded (ARR impact, time saved, etc.)

---

### POV — `components/POV.tsx`

**Layout:** Single column, left-aligned, constrained max-width. Section number `03 —`.

**Decorative element:** Large `"03"` — `240px`, `opacity: 0.04`

**Pull quote:**
```
"The SaaS tools sitting on top of your data warehouse are the 
most replaceable software ever built. You already own the data. 
You're just renting the logic."
```

**Expansion paragraph:**
```
"GTM tools, RevOps platforms, FinOps dashboards — they're all 
doing the same thing: querying data you own and calling it a 
product. At Sigma, I've replaced that entire category, one 
contract at a time, with systems that cost less, do more, and 
don't have a renewal date."
```

**Design:**
- Pull quote: Playfair italic, `clamp(28px, 4vw, 52px)`, weight 900, line-height 1.1, tracking -0.02em
- Expansion: Inter, 17px, max-width `2xl`, `--color-muted` or `--color-ink`
- No card/border — clean white space section

**Design Language Note — Pull quote font:** Canonical direction is Cormorant Garamond 300–400 italic. Weight 900 is inconsistent with the canonical 300–400 range — the editorial lightness of Cormorant at 300 italic replaces the need for heavy weight. See §0.1.

**Design Language Note — Expansion paragraph max-width:** Set explicitly to **680px** (`--prose-max`), not `max-w-2xl` (Tailwind approximation). See §0.10. Current `max-w-2xl` ≈ 672px — functionally close but should be made explicit.

**Animations:**
- Pull quote: ScrollReveal, base delay
- Expansion paragraph: ScrollReveal, 0.2s delay

**TODO:**
- Could link to a longer essay or blog post
- Add more POV statements as the voice develops

---

### MISC GRID — `components/MiscGrid.tsx`

**Layout:** 4-column grid (1 col mobile → 2 col sm → 4 col lg). Section number `04 —`.

**Cards:**

```
Card 1 — Currently building:
  Value:  Vantage — Sigma's internal AI-native CRM suite
  Sub:    Replacing Salesforce, one app at a time

Card 2 — Latest post:
  Value:  I Replaced $100K of GTM SaaS with a Snowflake Schema and Some LLM Calls
  Link:   /blog/replaced-gtm-saas
  (accent color, arrow on hover)

Card 3 — Last shipped:
  Value:  Deal Slack Ops
  Sub:    Auto-creates Slack channels per opportunity with full account + deal context

Card 4 — Stack:
  Value:  Snowflake · Sigma · LLM APIs
  Sub:    Cortex, OpenAI, Anthropic, Slack, Python
```

**Design (per card):**
- Background: `--color-surface`
- Label: `.text-label`, muted, uppercase
- Value: Inter, bold, 15px, `--color-ink`
- Sub: Inter, 13px, `--color-muted`
- Min-height: 160px
- Layout: flex column, `justify-between`
- Link cards: value in `--color-accent` with `→`

**Design Language Note — Card surface and border radius:** Canonical Soft Depth spec calls for `background: #FFFFFF`, `border: 1px solid var(--border)`, `border-radius: var(--radius-md)` (10px), and a diffuse box-shadow. Current cards use `--color-surface` (#EDEAE2) fill without explicit border-radius tokens. See §0.4 and §0.5.

**Design Language Note — Card hover:** Apply Soft Depth hover spec (§0.4) — `translateY(-1px)` with diffuse shadow + optional Monet lily-green glow ring. Current implementation: no hover state documented for MiscGrid cards.

**Animations:**
- Cards stagger: `0.07s × index` via ScrollReveal

**TODO:**
- Blog post link `/blog/replaced-gtm-saas` — page does not exist yet
- "Latest post" should eventually be dynamic (pulled from blog CMS or static files)
- "Currently building" should be easy to update (could be data-driven)

---

## 5. Unused / Available Components

### BookingSection — `components/BookingSection.tsx`

Full Google Calendar availability picker + booking form. Currently not rendered in career view.

**Features:**
- Fetches available slots from `/api/availability`
- Date tab selector (next 5 days)
- Time slot grid (3 columns)
- Form: name, email, notes
- Submits to `/api/book`
- Shows confirmation with Google Meet link

**TODO:**
- Decide where to surface this (bottom of career view? separate `/book` page?)
- Currently wired to actual API routes — needs credentials to function

---

## 6. Content Inventory

### All Live Copy

| Section | Content |
|---|---|
| Hero line 1 | "I build AI systems" |
| Hero line 2 | "that replace SaaS." |
| Hero sub 1 | "AI Applications Engineer at Sigma Computing · San Francisco" |
| Hero sub 2 | "Currently: replacing Salesforce with internal AI tooling" |
| Rotating circle | "Taking out SAAS everyday · Taking out SAAS everyday · " |
| WhatIReplace row 1 | Salesforce → Internal AI CRM |
| WhatIReplace row 2 | Rattle · Clari → Snowflake-native forecasting |
| WhatIReplace row 3 | FinOps SaaS → Warehouse-native reporting |
| WhatIReplace row 4 | RevOps platforms → LLM-powered workflow automation |
| Bio | See IdentityBlock section above |
| What I Build | 5 items (see above) |
| Stack | 5 items (see above) |
| Projects | 3 projects (see above) |
| POV quote | "The SaaS tools sitting on top..." |
| POV expansion | "GTM tools, RevOps platforms..." |
| MiscGrid | 4 cards (see above) |
| Footer email | `hello@ayonika.dev` |
| Footer LinkedIn | `linkedin.com/in/ayonikabose/` |

### Images

All images currently absent (no `<img>` or `<Image>` in career view). Text-only layout.

### Links

| Location | Destination | Status |
|---|---|---|
| Nav — work | `/#work` or `/work` | Placeholder |
| Nav — blog | `/blog` | Page not built |
| Nav — about | `/about` | Page not built |
| Nav — say hello | `mailto:hello@ayonika.dev` | Active |
| Nav — LinkedIn | `https://linkedin.com/in/ayonikabose/` | Active |
| MiscGrid — Latest post | `/blog/replaced-gtm-saas` | Page not built |
| Footer — same as Nav | — | — |

---

## 7. Future Sections (Planned / Not Yet Built)

| Section | Notes |
|---|---|
| **Blog** | `/blog` index + `/blog/[slug]` article pages. "I Replaced $100K of GTM SaaS..." is the intended first post. |
| **About** | Full bio, background, values. Could live as a page or an expanded section on the career view. |
| **Case Studies** | Deep-dive project pages at `/work/[slug]` with outcome data, architecture diagrams, screenshots. |
| **Booking / Contact** | `BookingSection` component is built — needs to be surfaced in the UI. Could be CTA at bottom of career view or dedicated `/book` page. |
| **Writing / Essays** | Longer-form POV content. Could be blog subcategory or separate section. |
| **Open to work indicator** | Status badge in hero or MiscGrid — toggleable, e.g., "Open to senior IC roles" |
