# Personal View — Wireframe & Spec

**Theme:** Vanity Fair Editorial — pure white canvas, Playfair Display serif-forward, Monet sky-blue accent (#9FB8C8)  
**Audience:** Friends, collaborators, curious visitors — the human behind the engineer  
**Tone:** Witty, warm, opinionated. Magazine feature, not resume.  
**URL state:** Activated when `view === "personal"` in ViewContext

---

## 0. Design Language Alignment

This section documents gaps between what the wireframe currently specifies and what Nika's canonical design language calls for. All items below are **additive** — they clarify or extend the existing spec without invalidating what's built. Use `**Design Language Note:**` callouts throughout the document to cross-reference.

---

### 0.1 Font Correction — Display Typeface

**Current wireframe:** All display/hero typography is specified as "Playfair Display" throughout.

**Canonical spec:** The design language designates **Cormorant Garamond** (or Cormorant) as the display/hero serif. Playfair Display is not part of the canonical type system.

| Role | Current (built) | Canonical |
|---|---|---|
| `.text-hero` | Playfair Display, 700, italic | Cormorant Garamond, **weight 300–400**, italic |
| `.text-section` | Playfair Display, 700, italic | Cormorant Garamond, **weight 300–400**, italic |
| `.text-pullquote` | Playfair Display, 400, italic | Cormorant Garamond, **weight 300–400**, italic |
| `.drop-cap::first-letter` | Playfair Display, 900 | Cormorant Garamond, **weight 300–400** |
| Book title (BookOfTheMonth) | Playfair italic, ~32–40px | Cormorant Garamond, weight 300–400, italic |

**Additional rules:**
- Cormorant Garamond must **never** be set bold (above weight 400).
- Letter-spacing on headings at size `2xl` and above: `-0.02em`.
- Letter-spacing on ALL CAPS labels (`.text-label`): `+0.04em` (note: wireframe specifies `0.2em` — this should be corrected to `0.04em` per canonical spec).
- The editorial signature of this view is: Cormorant Garamond display + Inter body. Mixing these two is intentional and load-bearing to the aesthetic.

---

### 0.2 Monet Accent Palette

**Current wireframe:** Only `--color-accent: #C8102E` (burgundy-red) is specified.

**Canonical spec:** The personal view uses the full **Monet Accent Palette** drawn from *Water Lilies*. No more than 2–3 Monet accents should appear per view simultaneously.

```
--monet-lily-green:   #89A89E   ← primary accent for badges, hover glows, thin accent lines
--monet-mauve:        #B5B0C5   ← decorative moments, secondary accent lines
--monet-blush:        #CCB8C2   ← soft decorative use only
--monet-sage:         #9FAE98   ← background washes, subtle fills
--monet-wheat:        #EAD992   ← highlights, warm decorative moments
--monet-sky:          #9FB8C8   ← cool accent, map unvisited fill candidate
```

**Where Monet accents apply in this view:**

| Element | Canonical accent |
|---|---|
| Section tag badges / `.text-label` pills | `--monet-lily-green` wash (see § 0.7) |
| Editorial header accent line (under/beside title) | `--monet-lily-green` or `--monet-mauve`, 1px |
| Card hover glow ring | `--monet-lily-green` at 15% opacity (see § 0.3) |
| Hero gradient wash background | Impressionist gradient (see § 0.8) |
| World Map — visited country fill | Keep existing dark burgundy `#7B1C2E` (matches `--color-accent`) |
| World Map — unvisited country fill | `--monet-sky` (`#9FB8C8`) or current beige — both are acceptable |
| Stat numbers / accent numbers | `--color-accent` (#C8102E) — keep as-is, this is intentional editorial red |

The burgundy `--color-accent` is intentional for editorial drop caps, stat numbers, and the world map. The Monet palette supplements it for softer UI moments; they are not interchangeable.

---

### 0.3 Frosted Glass Surface Treatment

**Current wireframe:** Cards specify `--color-surface` background + `border: 1px solid var(--color-border)` + `card-lift` hover (translateY -2px + box-shadow). The surface material is not specified.

**Canonical spec:** In the personal/website view, **frosted glass is the default card surface**.

```css
/* Default card surface */
.card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: var(--radius-lg);  /* 16px */
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
}

/* Hover state — glow ring replaces simple lift */
.card:hover {
  box-shadow: 0 0 0 3px rgba(137, 168, 158, 0.15),
              0 8px 24px rgba(0, 0, 0, 0.06);
}
```

This applies to: Hobbies featured card, Hobbies grid cards, BookOfTheMonth card, any future card-pattern sections.

The existing `translateY(-2px)` card-lift on hover is compatible and can be kept alongside the glow ring.

---

### 0.4 Border Radius Tokens

**Current wireframe:** Border radius is not specified — components use ad-hoc values.

**Canonical token table:**

| Token | Value | Typical use |
|---|---|---|
| `--radius-sm` | `6px` | Small chips, inline badges |
| `--radius-md` | `10px` | Input fields, small cards |
| `--radius-lg` | `16px` | Standard cards (default for frosted glass cards) |
| `--radius-xl` | `24px` | Large feature cards, modals |
| `--radius-full` | `9999px` | Pills, tags, toggle indicators |

The Hobbies grid cards and BookOfTheMonth card should use `--radius-lg` (16px). Section tag badges / pills use `--radius-full`.

---

### 0.5 Spacing Tokens (8px Base Grid)

**Current wireframe:** Spacing is loosely specified as Tailwind classes (`px-6`, `md:px-12`, `lg:px-20`) and a single `--section-gap` token.

**Canonical token table:**

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` |
| `--space-24` | `96px` |

**Key layout rules from canonical spec:**
- Minimum internal padding on cards: **24px** (`--space-6`)
- Section padding: **48px** (`--space-12`)
- Hero padding: **80px** (`--space-20`)
- Max content width: **1200px** (wireframe currently specifies `7xl` = 1280px — canonical is 1200px)
- Prose max-width: **680px** (see also § 0.10)

---

### 0.6 Animation — Canonical Easings

**Current wireframe:** Uses `[0.16, 1, 0.3, 1]` as the easing for ScrollReveal fade + y-translate.

**Canonical easing tokens:**

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | Exits, page transitions, most hover states |
| `--ease-in-out` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | AnimatedRule scale, symmetric transitions |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | ViewToggle pill, interactive micro-animations |

**Canonical duration tokens:**

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | `150ms` | Hover color changes, opacity flickers |
| `--duration-base` | `220ms` | Default UI transitions (card lift, arrow reveal) |
| `--duration-slow` | `350ms` | Page cross-fade, AnimatedRule |
| `--duration-reveal` | `600ms` | ScrollReveal entrance animations |

**Mapping current patterns to canonical:**

| Current spec | Canonical mapping |
|---|---|
| Fade + y-translate `[0.16, 1, 0.3, 1]`, 0.5s | Use `--ease-out` + `--duration-reveal` (600ms) |
| Card lift, 200ms ease | `--duration-base` (220ms) + `--ease-out` |
| Page cross-fade, 0.3s easeOut | `--duration-slow` (350ms) + `--ease-out` |
| AnimatedRule, 0.5s easeInOut | `--duration-slow` (350ms) + `--ease-in-out` |
| Toggle pill spring | `--ease-spring` — Framer Motion spring values compatible |
| Arrow reveal (WorthReading), 200ms ease | `--duration-base` (220ms) + `--ease-out` |

**Canonical entrance animation keyframe:**
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
```
Note: current wireframe uses `translateY(20px→0)`. Canonical is **12px**. Either is acceptable; prefer 12px for new components.

**Stagger canonical values:**
- nth-child(1): 0ms delay
- nth-child(2): 80ms delay
- nth-child(3): 160ms delay
- Current wireframe uses 0.06–0.08s (60–80ms) increments — compatible.

---

### 0.7 Badge / Tag Treatment

**Current wireframe:** `.text-label` is specified as Inter, 10px, 500 weight, 0.2em tracking, all-caps. No visual surface (color, background, pill shape) is defined for the tag/badge component.

**Canonical spec — Accent Badge:**
```css
.badge {
  background: rgba(137, 168, 158, 0.12);  /* --monet-lily-green wash */
  color: #5A8A7A;                          /* darkened monet-lily-green for legibility */
  font-family: Inter;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 9999px;                   /* --radius-full */
}
```

This replaces or supplements the bare `.text-label` spec for all section tag badges in this view (section kickers like "Feature — Travel", "Culture — Books", "Dispatch — Tech", etc.). The Monet-lily-green wash is the default; muted/neutral variants are acceptable for secondary tags inside cards.

**Corrected tracking:** The canonical spec defines `0.06em` for badge/tag tracking. The wireframe specifies `0.2em` for `.text-label` tracking — this is substantially wider. `0.06em` is the canonical value; `0.04em` is the general ALL CAPS rule.

---

### 0.8 Gradient Wash Backgrounds

**Current wireframe:** No gradient backgrounds are specified. Sections use `--color-surface` (`#F7F5F0`) flat fills.

**Canonical spec — Hero / decorative gradient:**
```css
/* Hero sections and decorative moments */
background: linear-gradient(135deg, #F8F7F5 0%, #EEE9F0 50%, #E8EEF0 100%);

/* Full-page gradient wash (personal view background) */
background: linear-gradient(160deg, #FFFFFF 0%, #F0EDF5 40%, #E8EFF3 80%, #FFFFFF 100%);
```

**Where gradient washes apply in this view:**

| Location | Gradient |
|---|---|
| PersonalHero section background | `linear-gradient(135deg, ...)` — impressionist wash behind masthead |
| Page-level background (behind all sections) | `linear-gradient(160deg, ...)` — subtle, near-white |
| Empty state / placeholder containers | `linear-gradient(135deg, ...)` |
| Decorative moments between sections | Gradient wash; never a flat `--color-surface` block |

These gradients are intentionally subtle — the 160deg variant reads as near-white at most viewport positions.

---

### 0.9 `prefers-reduced-motion`

**Current wireframe:** No mention of reduced-motion handling.

**Canonical requirement:** All animations in this view must respect the `prefers-reduced-motion: reduce` media query. This is non-negotiable per the design language.

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable or minimize all transitions and animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Implementation notes:**
- ScrollReveal component should check `window.matchMedia('(prefers-reduced-motion: reduce)')` before animating.
- Framer Motion: use `useReducedMotion()` hook and set `animate` to final state immediately when true.
- UI animations cap at **400ms**. Page reveal animations cap at **800ms**.
- The canonical `--duration-reveal` is 600ms — within the 800ms page reveal budget.

---

### 0.10 Prose Max-Width

**Current wireframe:** Body copy max-width is described loosely as `max-w-2xl` / `max-w-3xl` (Tailwind), which corresponds to 672px or 768px depending on config.

**Canonical spec:** Readable prose max-width is **680px**.

```css
.prose { max-width: 680px; }
```

This applies to:
- Editorial Feature body copy paragraphs
- BookOfTheMonth review body
- Currently Learning item descriptions
- Worth Reading excerpts
- Any other flowing body text in a single column

Card-based content (Hobbies grid, hero stats) is not prose and does not apply this constraint.

---

## 1. Design System

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background — pure white |
| `--color-ink` | `#0D0D0D` | Body text, headings, icons |
| `--color-accent` | `#9FB8C8` | Drop caps, links, hover underlines, stat numbers |
| `--color-muted` | `#6B6B6B` | Labels, secondary text, captions |
| `--color-surface` | `#F7F5F0` | Card backgrounds, section fills |
| `--color-border` | `#E0DDD7` | Divider lines, card outlines, pullquote rules |
| `--color-caption` | `#9A9490` | Image captions, fine print |

Special accent used only in Nav/Toggle:
- `--monet-lily-green` (`#89A89E`) — Monet lily-green pill in ViewToggle (active Personal indicator)

**Design Language Note:** The canonical system also maps these tokens to its base palette: `--color-bg` → `--background` (#FFFFFF), `--color-surface` → `--surface` (#F8F7F5), `--color-border` → `--border` (#E8E6E0), `--color-muted` → `--text-secondary` (#6B6862). Minor value differences exist (e.g. `--color-ink` is #0D0D0D vs canonical `--text-primary` #1A1917) — pure black should be avoided per the design language; prefer #1A1917 for new elements.

**Canonical spec — Monet Accent Palette (supplement to above):** See § 0.2 for full token list and usage mapping. These tokens are additive to the existing color table and should be added to `globals.css` for the personal view.

### Typography

| Class | Font | Size | Weight | Style | Tracking | Leading |
|---|---|---|---|---|---|---|
| `.text-hero` | Playfair Display | `clamp(56px, 9vw, 130px)` | 700 | italic | -0.02em | 0.9 |
| `.text-section` | Playfair Display | `clamp(36px, 5vw, 72px)` | 700 | italic | -0.015em | 1.0 |
| `.text-pullquote` | Playfair Display | `clamp(22px, 3vw, 34px)` | 400 | italic | — | 1.4 |
| `.text-label` | Inter | `10px` | 500 | normal | 0.2em | — |
| `.drop-cap::first-letter` | Playfair Display | `clamp(56px, 6vw, 80px)` | 900 | normal | — | — |
| body | Inter | `17px` | 400 | normal | — | 1.7 |

**Design Language Note — font correction:** The canonical display typeface is **Cormorant Garamond** (weight 300–400), not Playfair Display. See § 0.1 for the full correction table. The Playfair Display entries above reflect the current build; Cormorant Garamond is the target spec. Weight should be 300–400 — never bold. The `.drop-cap::first-letter` weight 900 is not compatible with the canonical spec and should move to weight 300–400 when the font is swapped.

**Design Language Note — `.text-label` tracking:** The canonical value for ALL CAPS label tracking is `0.04em`. The badge/pill variant uses `0.06em`. The current `0.2em` specified here is substantially wider than canonical — use `0.04em` for new label elements. See § 0.7 for the full badge spec.

**Canonical spec — Editorial Header pattern:** Cormorant Garamond display headline + Inter subtitle, left-aligned, with a thin `1px` accent line in `--monet-lily-green` or `--monet-mauve` underneath or beside the title. This decorative line is the editorial signature of section headers.

**Drop cap:** Floated left, `--color-accent`, margin-right 0.12em, margin-top 0.08em. Applied to opening paragraphs in editorial sections.

**Pullquote block (`.pullquote-block`):**
- `border-top: 1px solid var(--color-border)`
- `border-bottom: 1px solid var(--color-border)`
- `padding: 1.5rem 0`, `margin: 2rem 0`

**Design Language Note — dividers:** Per canonical spec, never use `<hr>` elements. Use `border-top: 1px solid var(--color-border)` with `margin: 32px 0` (i.e. `--space-8`). The pullquote block borders above are compatible with this rule.

### Spacing

| Token | Value |
|---|---|
| `--section-gap` | `clamp(80px, 10vw, 120px)` |
| Container max-width | `7xl` = 1280px |
| Horizontal padding | `px-6` → `md:px-12` → `lg:px-20` |

**Design Language Note:** Canonical max content width is **1200px** (vs `7xl` / 1280px currently). For new sections, target 1200px. See § 0.5 for the full 8px grid token table. Key minimums: card internal padding ≥ 24px, section padding ≥ 48px, hero padding ≥ 80px. Prose body copy max-width: **680px** (see § 0.10).

### Motion Catalog

| Pattern | Duration | Easing | Used In |
|---|---|---|---|
| Fade + y-translate (20→0px) | 0.5s | `[0.16, 1, 0.3, 1]` | ScrollReveal (all sections) |
| Staggered list/card items | 0.06–0.08s delay increments | same | Country list, obsessions grid, reading list |
| AnimatedRule scale | 0.5s | `easeInOut` | Section separators |
| Card lift | 200ms | ease | `translateY(-2px)` + `box-shadow: 0 6px 24px rgba(0,0,0,0.08)` |
| Page cross-fade | 0.3s | `easeOut` | View switch (AnimatePresence) |
| Toggle pill spring | stiffness 500, damping 40 | spring | ViewToggle → Monet lily-green pill |
| Map hover | — | — | Country highlight on WorldMap |

**Design Language Note — canonical easing alignment:** See § 0.6 for the full canonical easing token table and a mapping of each pattern above to its canonical equivalent. Key changes: ScrollReveal should use `--ease-out` (cubic-bezier(0.0, 0.0, 0.2, 1)) at `--duration-reveal` (600ms); card lift should use `--ease-out` at `--duration-base` (220ms); page cross-fade should use `--ease-out` at `--duration-slow` (350ms). The canonical fade-up translate distance is **12px**, not 20px — prefer 12px for new components.

**Button scale interactions (canonical, not yet in wireframe):** Hover → `scale(1.02)`, Active → `scale(0.98)`. Duration: `--duration-fast` (150ms).

**Design Language Note — `prefers-reduced-motion`:** All animations in this catalog must be disabled or minimized when `prefers-reduced-motion: reduce` is set. See § 0.9 for implementation requirements. UI animations hard-cap at 400ms; page reveals cap at 800ms.

---

## 2. Global Components

### Nav — `components/Nav.tsx`

```
┌──────────────────────────────────────────────────────────────────────┐
│ Ayonika Bose     work · blog · about    [Career|Personal]  🔗 say hello → │
└──────────────────────────────────────────────────────────────────────┘
```

- **Position:** Fixed, `z-50`, `backdrop-blur`
- **Background (personal):** `rgba(255,255,255,0.85)` — semi-transparent white with blur
- **Border-bottom:** `1px solid var(--color-border)` — slightly warmer/lighter than career
- **ViewToggle:** Active = Monet lily-green (`--monet-lily-green` / #89A89E) animated pill on "Personal" side
- Same structure as career view — see career wireframe for full Nav spec

### Footer — `components/Footer.tsx`

Same structure as career view. Colors switch via CSS variables.

### Utility Components

**ScrollReveal — `components/ScrollReveal.tsx`**  
Same as career — fade + y-translate on scroll entry. `once: true`.

**AnimatedRule — `components/AnimatedRule.tsx`**  
Same as career — scales from left. Used as section dividers throughout personal view.

---

## 3. Page Layout (ASCII Wireframe)

```
╔══════════════════════════════════════════════════════════════════╗
║  NAV (fixed, 56px)                                               ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  PERSONAL HERO                         (full viewport)           ║
║  ┌─────────────────────────────┬──────────────────────────────┐  ║
║  │ THE LIFE OF NIKA            │                              │  ║
║  │ Vol. I · Spring 2026        │   ┌────────────────────┐     │  ║
║  │ Bay Area, CA                │   │                    │     │  ║
║  │                             │   │   [cover photo]    │     │  ║
║  │ Ayonika                     │   │   4:5 ratio        │     │  ║
║  │ ("Nika")                    │   │                    │     │  ║
║  │                             │   └────────────────────┘     │  ║
║  │ Applied AI engineer. Space nerd...  │   Ayonika Bose · Bay Area     │  ║
║  │                             │                              │  ║
║  │ In this issue ──────────    │                              │  ║
║  │ TRAVEL · CULTURE            │                              │  ║
║  │ LIFE · DISPATCH             │                              │  ║
║  │                             │                              │  ║
║  │ ┌──────┬──────┬──────────┐  │                              │  ║
║  │ │  19  │  2   │    ∞     │  │                              │  ║
║  │ │Cntry │ Cats │ Tabs open│  │                              │  ║
║  │ └──────┴──────┴──────────┘  │                              │  ║
║  └─────────────────────────────┴──────────────────────────────┘  ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  EDITORIAL FEATURE — Travel                                      ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ Feature — Travel, Passport Stamps                        │    ║
║  │ ┌──────────────────────┐  Nineteen countries, one passport.   │    ║
║  │ │  [travel image 3:2]  │                                 │    ║
║  │ └──────────────────────┘  ── pullquote ──                │    ║
║  │                            body text (drop cap)          │    ║
║  │  Country list (2-col):                                   │    ║
║  │  Japan · India · Thailand · South Korea · Singapore      │    ║
║  │  Vietnam · UK · Mexico · China · USA                     │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  WORLD MAP                                                       ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ Travel — World Map                             19        │    ║
║  │ The world, so far.                                       │    ║
║  │                                                          │    ║
║  │         [interactive react-simple-maps SVG]              │    ║
║  │         visited = dark burgundy / unvisited = beige      │    ║
║  │                                                          │    ║
║  │ USA · India · Japan · China · South Korea ·              │    ║
║  │ Thailand · Singapore · Vietnam · Mexico · UK             │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  BOOK OF THE MONTH                                               ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ Culture — Books, March 2026                              │    ║
║  │                                                          │    ║
║  │  ┌────────┐  The Remains of the Day                      │    ║
║  │  │ [book  │  Kazuo Ishiguro · 1989                       │    ║
║  │  │ cover  │  ★★★★★  Finished                             │    ║
║  │  │  2:3   │                                              │    ║
║  │  └────────┘  ── pullquote ──                             │    ║
║  │              review text                                 │    ║
║  │              By NIKA · March 2026                        │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  HOBBIES / OBSESSIONS                                            ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ Life & Obsessions, Currently Obsessing Over              │    ║
║  │                                                          │    ║
║  │ ┌──────────────────────┬──────────────────────────────┐  │    ║
║  │ │  [Labubu image]      │ COLLECTIBLES                 │  │    ║
║  │ │                      │ Labubu                       │  │    ║
║  │ │                      │ "The blind box addiction..." │  │    ║
║  │ └──────────────────────┴──────────────────────────────┘  │    ║
║  │                                                          │    ║
║  │ ┌──────────┬──────────┬──────────┬──────────┬─────────┐  │    ║
║  │ │  Space   │The Girls │Ceramics  │  Table   │Internet │  │    ║
║  │ │          │          │& Ikebana │  Tennis  │         │  │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  CURRENTLY LEARNING                                              ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ Dispatch — Tech, Brain Rot, Productive Edition           │    ║
║  │ Deep in it.                                              │    ║
║  │                                                          │    ║
║  │  01  MCPs                                                │    ║
║  │  02  Subagents                                           │    ║
║  │  03  Skills                                              │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║  WORTH READING                                                   ║
║  ┌──────────────────────────────────────────────────────────┐    ║
║  │ The Reading List, Worth Your Time                        │    ║
║  │ Worth your time.                                         │    ║
║  │                                                          │    ║
║  │  01  "The Most Important Thing..." — George Mack   →     │    ║
║  │  02  "The Bitter Lesson" — Rich Sutton             →     │    ║
║  │  03  "You and Your Research" — Richard Hamming     →     │    ║
║  └──────────────────────────────────────────────────────────┘    ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║  FOOTER                                                          ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 4. Section-by-Section Breakdown

---

### PERSONAL HERO — `components/personal/PersonalHero.tsx`

**Layout:** Two-column grid (left: masthead + content, right: cover image). Full viewport height.

**Left Column — Masthead:**
```
Kicker:    THE LIFE OF NIKA
           Vol. I · Spring 2026 · Bay Area, CA

Name:      Ayonika          ← large serif italic, .text-hero
           ("Nika")         ← muted gray, smaller

Byline:    Applied AI engineer. Space nerd. Chronically online. Cat mom ×2.
           Nineteen countries and counting.

Cover lines (IN THIS ISSUE):
  ─────────────────────────────
  TRAVEL   Nineteen countries, one passport
  CULTURE  The book that broke me (in a good way)
  LIFE     Labubu, ceramics, and other obsessions
  DISPATCH Currently deep in: MCPs, subagents, skills
  ─────────────────────────────

Stats grid:
  ┌──────────┬──────────┬──────────────┐
  │    19    │    2     │      ∞       │
  │ Countries│  Cats in │  Tabs open   │
  │          │  charge  │              │
  └──────────┴──────────┴──────────────┘
  (numbers in --color-accent, labels in --color-muted)
```

**Right Column — Cover Image:**
```
Placeholder: 4:5 aspect ratio image container
Caption:     "Ayonika Bose · Bay Area"  (--color-caption, 11px)
```

**Design:**
- Masthead kicker: `.text-label`, all-caps, muted, 0.2em tracking
- Name: `.text-hero` (`clamp(56px, 9vw, 130px)`), Playfair italic
- `("Nika")` subtitle: ~60% hero size, `--color-muted`
- Byline: Inter, 15–17px, `--color-muted`
- Cover lines: 2-column flex, section tag in accent, description in ink
- Thin horizontal rule above "In this issue"
- Stats: accent-colored numbers (~48px), muted labels below

**Design Language Note — hero display font:** `.text-hero` should use Cormorant Garamond weight 300–400 (see § 0.1). The editorial pairing is Cormorant Garamond name display + Inter byline.

**Design Language Note — hero background:** The hero section background should use the impressionist gradient wash rather than a flat white or surface fill. See § 0.8 for exact CSS. This creates the "Monet garden" atmosphere behind the masthead.

**Design Language Note — section tag badges:** The "In this issue" cover line section tags (TRAVEL, CULTURE, LIFE, DISPATCH) should use the Monet-wash badge style from § 0.7: `--monet-lily-green` wash background, `border-radius: 9999px`, 11px Inter, 0.06em tracking.

**Design Language Note — hero padding:** Canonical hero internal padding is 80px (`--space-20`).

**Animations:**
- Masthead lines: staggered fade-in (scroll reveal on load)
- Stats grid: slight stagger between cells

**TODO:**
- Replace placeholder with actual photo (4:5 portrait)
- "In this issue" cover lines should link to their respective sections (smooth scroll)
- Stats could eventually be dynamic (travel count updates with new countries)

---

### EDITORIAL FEATURE — `components/personal/EditorialFeature.tsx`

**Layout:** Two-column (image left, text right) at top; then full-width body copy + 2-col country list below.

**Content:**
```
Section tag:  Feature — Travel, Passport Stamps

Image:        3:2 aspect ratio placeholder
Caption:      "Nineteen countries across three continents"

Headline:     Nineteen countries, one passport.

Pullquote:    "Every airport is a new sentence. Every city, a new paragraph."
              (thin border-top + border-bottom, centered, italic)

Body copy (with drop cap on first paragraph):
  "I travel the way I code: ship fast, break things, iterate. 
   [remaining travel philosophy paragraph]"
  [second paragraph about travel experience]

Country list (2 columns):
  Japan         Cherry blossoms & vending machine everything
  India         Where the chaos is the point
  Thailand      Best pad thai, no debate
  South Korea   K-beauty, K-food, K-everything
  Singapore     The most orderly city I've ever loved
  Vietnam       Hạ Long Bay at sunrise
  UK            London fog and the Tate Modern
  Mexico        Tacos and cenotes
  China         The Great Wall at dusk
  USA           Home base, Bay Area edition
```

**Design:**
- Section tag: `.text-label`, 10px, 0.2em tracking, muted
- Headline: `.text-section` (`clamp(36px, 5vw, 72px)`), Playfair italic
- Pullquote: `.pullquote-block` + `.text-pullquote`, thin top/bottom rules
- Body: Inter, 17px, line-height 1.7. First paragraph has `.drop-cap`
- Country list: left column = country name (bold ink), right = description (muted)
- Thin `--color-border` rule between each country row
- Country number/flag emoji optional (currently text-only)

**Design Language Note — section tag:** The "Feature — Travel, Passport Stamps" kicker should use the Monet-wash badge style (§ 0.7): `--monet-lily-green` wash, pill shape (`border-radius: 9999px`), 11px, 0.06em tracking.

**Design Language Note — headline font:** `.text-section` should be Cormorant Garamond weight 300–400 with letter-spacing `-0.02em` (see § 0.1). A thin 1px `--monet-lily-green` or `--monet-mauve` accent line should appear beneath or beside the headline per the Editorial Header pattern.

**Design Language Note — body prose max-width:** Body copy paragraphs should be constrained to **680px** max-width (§ 0.10), not `max-w-2xl` or `max-w-3xl`.

**Animations:**
- Image + headline: ScrollReveal, base delay
- Body paragraphs: staggered ScrollReveal
- Country list rows: stagger 0.06s × index

**TODO:**
- Replace image placeholder with actual travel photo
- Country descriptions could link to travel notes/blog posts
- Could add a "next destination" teaser at the bottom

---

### WORLD MAP — `components/personal/WorldMap.tsx`

**Layout:** Full-width section. Large number accent top-right. Map SVG below. Country list below map.

**Content:**
```
Section tag:  Travel — World Map, Passport Stamps
Headline:     The world, so far.
Accent number: 10  (large, --color-accent)

Map:          Interactive SVG world map via react-simple-maps
              Visited countries: dark burgundy (#7B1C2E)
              Unvisited countries: light beige (#F0EDE6 or similar)
              Hover: slight brightness change

Country list (single row, spaced):
  USA · India · Japan · China · South Korea ·
  Thailand · Singapore · Vietnam · Mexico · UK
```

**Visited country codes (numeric):**
```
840  (USA)
356  (India)
392  (Japan)
156  (China)
410  (South Korea)
764  (Thailand)
702  (Singapore)
704  (Vietnam)
484  (Mexico)
826  (United Kingdom)
```

**Dependencies:** `react-simple-maps` v3, types in `types/react-simple-maps.d.ts`

**Design:**
- Section tag: `.text-label`
- Headline: `.text-section`, Playfair italic
- `10` accent number: ~80–100px, weight 900, `--color-accent`, right-aligned or inline
- Map: full container width, responsive height (~450–500px desktop)
- Country list: Inter, 13–14px, `--color-muted`, dot separators

**Design Language Note — section tag:** Use Monet-wash badge (§ 0.7) for "Travel — World Map" kicker.

**Design Language Note — headline font:** `.text-section` → Cormorant Garamond weight 300–400 (§ 0.1). Add thin 1px `--monet-lily-green` accent line beside/below headline per Editorial Header pattern.

**Design Language Note — map colors:** Canonical suggests `--monet-sky` (#9FB8C8) as an alternative to the current beige for unvisited countries. The existing dark burgundy (#7B1C2E) for visited countries is editorially appropriate and compatible with `--color-accent`.

**Animations:**
- Section enters via ScrollReveal
- Map fades in after section enters
- No per-country animation currently

**TODO:**
- Tooltip on country hover showing country name + visit note
- Click on country → expand a brief trip note or photo
- Mobile: map can feel small — consider a simplified mobile treatment

---

### BOOK OF THE MONTH — `components/personal/BookOfTheMonth.tsx`

**Layout:** Two-column (book cover left, review right). Below: pullquote + body review.

**Content:**
```
Section tag:   Culture — Books, March 2026

Book cover:    2:3 aspect ratio placeholder image
Rating:        ★★★★★ (5 stars)
Status badge:  "Finished"

Title:         The Remains of the Day
Author:        Kazuo Ishiguro
Year / Genre:  1989 · Literary Fiction

Pullquote:     "It is, I believe, a matter of crucial importance that one 
               does not embarrass one's employer."

Review body:
  [Analysis of Ishiguro's unreliable narrator, Stevens' suppression of 
  emotion, reading experience, why it resonated — ~2–3 paragraphs]

Byline:        By NIKA · March 2026
```

**Design:**
- Section tag: `.text-label`
- Book title: Playfair italic, ~32–40px
- Author / meta: Inter, muted
- Stars: rendered as Unicode ★ in accent color, or SVG icons
- Status badge: bordered pill, muted
- Pullquote: `.pullquote-block` + `.text-pullquote`
- Review: Inter, 17px, line-height 1.7
- Byline: Inter, uppercase, small, muted — "By NIKA · March 2026"

**Design Language Note — section tag:** Use Monet-wash badge (§ 0.7) for "Culture — Books, March 2026" kicker.

**Design Language Note — book title font:** Should be Cormorant Garamond weight 300–400, italic (see § 0.1). Not Playfair Display.

**Design Language Note — card surface:** The card wrapping this section should use frosted glass (§ 0.3): `background: rgba(255,255,255,0.72)`, `backdrop-filter: blur(16px) saturate(180%)`, `border-radius: 16px` (`--radius-lg`).

**Design Language Note — review prose max-width:** Review body paragraphs capped at 680px (§ 0.10).

**Animations:**
- Cover + metadata: ScrollReveal, base delay
- Review text: ScrollReveal, 0.1s delay

**TODO:**
- Replace book cover placeholder with actual cover image (can scrape from Open Library API)
- This section should update monthly — consider making it data-driven
- Could add "previously read" shelf section below
- Link to Goodreads or a dedicated reading list page

---

### HOBBIES / OBSESSIONS — `components/personal/Hobbies.tsx`

**Layout:** Featured card (2-col with image) at top, then 5-item grid (3 col desktop, 2 col tablet, 1 col mobile) below.

**Content:**

**Featured card — Labubu:**
```
Tag:         COLLECTIBLES
Title:       Labubu
Image:       Left column, square or 4:5 ratio placeholder
Description: "The blind box addiction is real. PopMart has my wallet held 
             hostage and I am not even remotely sorry about it."
```

**Grid of 5 secondary obsessions:**
```
1. Space
   Tag:  THE UNIVERSE
   Body: "Orbital mechanics. James Webb images. The cosmos is the original 
         algorithm and I am obsessed."

2. The Girls
   Tag:  HOME BASE
   Body: "Two cats. Zero respect for my sleep schedule. Absolute rulers of 
         the apartment."

3. Ceramics & Ikebana
   Tag:  SLOW CRAFT
   Body: "Making things with my hands while my brain runs inference. Clay 
         therapy, essentially."

4. Table Tennis
   Tag:  IRL SPORT
   Body: "Yes it's a real sport. No I will not be taking questions at this 
         time."

5. The Internet
   Tag:  ALWAYS LOGGED ON
   Body: "TikTok rabbit holes. GitHub at 2am. Discord servers for niche 
         things. Terminally, chronically, proudly online."
```

**Design:**
- Section tag: `.text-label`
- Section headline: `.text-section`, Playfair italic
- Featured card: `--color-surface` background, `border: 1px solid var(--color-border)`
- Featured card image: left half, object-fit cover
- Tag within cards: `.text-label`, accent or muted color
- Card title: Inter, bold, 18–22px
- Card body: Inter, 14–15px, `--color-muted`
- Grid cards: same surface + border treatment, min-height ~180px, `card-lift` on hover
- Hover: `translateY(-2px)` + subtle box shadow

**Design Language Note — section tag:** Use Monet-wash badge (§ 0.7) for "Life & Obsessions" kicker.

**Design Language Note — section headline font:** `.text-section` → Cormorant Garamond weight 300–400 (§ 0.1). Thin 1px `--monet-lily-green` accent line below headline.

**Design Language Note — card surface:** Both the featured card and grid cards should use frosted glass (§ 0.3): `background: rgba(255,255,255,0.72)`, `backdrop-filter: blur(16px) saturate(180%)`, `border: 1px solid rgba(255,255,255,0.4)`, `border-radius: 16px` (`--radius-lg`), `box-shadow: 0 4px 24px rgba(0,0,0,0.06)`. The current `--color-surface` flat background and hard border should be replaced with the frosted glass treatment.

**Design Language Note — card hover:** Replace the current `0 6px 24px rgba(0,0,0,0.08)` box-shadow with the canonical hover glow ring: `box-shadow: 0 0 0 3px rgba(137,168,158,0.15), 0 8px 24px rgba(0,0,0,0.06)`. The `translateY(-2px)` lift can remain alongside it.

**Design Language Note — in-card tags:** Tags within obsession cards (COLLECTIBLES, THE UNIVERSE, HOME BASE, etc.) should use the Monet-wash badge style from § 0.7.

**Design Language Note — card border radius:** Grid cards `--radius-lg` (16px); no border on every element — rely on shadow and frosted glass surface. See § 0.4.

**Animations:**
- Featured card: ScrollReveal, base delay
- Grid cells: stagger 0.07s × index

**TODO:**
- Replace all image placeholders with real photos (Labubu collection, cats, ceramics, etc.)
- Cards could link to longer posts/content about each obsession
- Could add an "and also:" micro-section for quick-hit interests

---

### CURRENTLY LEARNING — `components/personal/CurrentlyLearning.tsx`

**Layout:** Single column, numbered list. Clean, minimal. Left-aligned.

**Content:**
```
Section tag:  Dispatch — Tech, Brain Rot, Productive Edition
Headline:     Deep in it.

01  MCPs — Model Context Protocol
    "Anthropic's standard for connecting AI models to tools and data 
    sources. The plumbing that makes agents actually useful."

02  Subagents
    "Orchestrating fleets of specialized AI agents for complex multi-step 
    workflows. Delegation, but make it artificial."

03  Skills
    "Building reusable, composable AI capabilities that can be invoked 
    like functions. Modular intelligence."
```

**Design:**
- Section tag: `.text-label`
- Headline: `.text-section`, Playfair italic
- Item number: large, `--color-accent`, weight 900, ~48–64px — decorative, left-aligned
- Item title: Inter, bold, 20–24px, `--color-ink`
- Item description: Inter, 15–17px, `--color-muted`, max-width ~prose
- Thin `--color-border` rule between items
- No cards — open list treatment

**Design Language Note — section tag:** Use Monet-wash badge (§ 0.7) for "Dispatch — Tech" kicker.

**Design Language Note — headline font:** `.text-section` → Cormorant Garamond weight 300–400 (§ 0.1). Thin 1px accent line below headline.

**Design Language Note — divider:** The `--color-border` rule between items should be `border-top: 1px solid var(--color-border)` with `margin: 32px 0` (`--space-8`). No `<hr>` element.

**Design Language Note — item description prose:** Max-width 680px per § 0.10. The current "~prose" notation maps to exactly 680px canonically.

**Animations:**
- Items stagger on scroll: 0.08s × index via ScrollReveal

**TODO:**
- This should update as learning focus changes — consider making data-driven
- Could link to relevant resources, projects, or notes per item
- Add a "completed / graduated from" section below (things mastered)

---

### WORTH READING — `components/personal/WorthReading.tsx`

**Layout:** Single column numbered list with hover-reveal arrow. Clean editorial list.

**Content:**
```
Section tag:  The Reading List, Worth Your Time
Headline:     Worth your time.

01  "The Most Important Thing I've Learned About High Agency"
    Author:  George Mack (georgemack.com)
    Excerpt: "High agency is the ability to find a way around constraints. 
             Ask 'how could I make this happen?' rather than accepting no 
             as a final answer."
    Link:    georgemack.com article (external)

02  "The Bitter Lesson"
    Author:  Rich Sutton (incompleteideas.net)
    Excerpt: "General methods that leverage computation always win. A lesson 
             the AI field keeps having to re-learn."
    Link:    incompleteideas.net article (external)

03  "You and Your Research"
    Author:  Richard Hamming (Bell Labs Lecture, 1986)
    Excerpt: "What separates people who do great work from people who do 
             merely good work."
    Link:    external link to transcript
```

**Design:**
- Section tag: `.text-label`
- Headline: `.text-section`, Playfair italic
- Item number: Inter, small, muted (`01`, `02`, `03`)
- Article title: Inter or Playfair, bold, 18–20px
- Author line: Inter, small, `--color-muted`
- Excerpt: Inter, 15px, `--color-muted`, italic, max-width ~prose
- Row: full-width clickable link, `border-bottom: 1px solid var(--color-border)`
- Arrow `→`: right-aligned, appears on hover with slide-in animation

**Design Language Note — section tag:** Use Monet-wash badge (§ 0.7) for "The Reading List, Worth Your Time" kicker.

**Design Language Note — headline font:** `.text-section` → Cormorant Garamond weight 300–400 (§ 0.1). Thin 1px `--monet-lily-green` or `--monet-mauve` accent line below headline.

**Design Language Note — article title font:** If using a serif for article titles, use Cormorant Garamond weight 300–400. Inter bold is also acceptable for the title role here since these are external article names (not editorial headlines). Do not use Playfair Display.

**Design Language Note — excerpt prose max-width:** Excerpt text capped at **680px** (§ 0.10).

**Design Language Note — arrow animation:** Canonical spec maps this to `--duration-base` (220ms) + `--ease-out`. Current "200ms ease" is very close — update to 220ms + `cubic-bezier(0.0, 0.0, 0.2, 1)` for new builds.

**Animations:**
- Rows enter staggered via ScrollReveal: 0.07s × index
- Arrow: opacity 0→1 + translateX -8px→0 on row hover, 200ms ease

**TODO:**
- Add more items (list currently has 3 — could expand to 6–8)
- Add categories/tags per item (AI, philosophy, career, etc.)
- Could eventually live on a dedicated `/reading` page with full notes

---

## 5. Content Inventory

### All Live Copy

| Section | Item | Content |
|---|---|---|
| Hero | Kicker | "THE LIFE OF NIKA · Vol. I · Spring 2026 · Bay Area, CA" |
| Hero | Name | "Ayonika" |
| Hero | Subtitle | `("Nika")` |
| Hero | Byline | "Applied AI engineer. Space nerd. Chronically online. Cat mom ×2. Nineteen countries and counting." |
| Hero | Cover lines | TRAVEL, CULTURE, LIFE, DISPATCH (4 items) |
| Hero | Stat 1 | 10 Countries |
| Hero | Stat 2 | 2 Cats in charge |
| Hero | Stat 3 | ∞ Tabs open |
| Editorial Feature | Headline | "Nineteen countries, one passport." |
| Editorial Feature | Pullquote | "Every airport is a new sentence. Every city, a new paragraph." |
| Editorial Feature | Body | travel philosophy copy (drop cap paragraph + following) |
| Editorial Feature | Countries | 19 countries with descriptions (see section above) |
| World Map | Headline | "The world, so far." |
| World Map | Country list | USA · India · Japan · China · South Korea · Thailand · Singapore · Vietnam · Mexico · UK |
| Book of Month | Book | "The Remains of the Day" by Kazuo Ishiguro, 1989, Literary Fiction |
| Book of Month | Pullquote | "It is, I believe, a matter of crucial importance..." |
| Book of Month | Byline | "By NIKA · March 2026" |
| Hobbies | Featured | Labubu — COLLECTIBLES |
| Hobbies | Grid 1 | Space — THE UNIVERSE |
| Hobbies | Grid 2 | The Girls — HOME BASE |
| Hobbies | Grid 3 | Ceramics & Ikebana — SLOW CRAFT |
| Hobbies | Grid 4 | Table Tennis — IRL SPORT |
| Hobbies | Grid 5 | The Internet — ALWAYS LOGGED ON |
| Currently Learning | Headline | "Deep in it." |
| Currently Learning | Item 1 | MCPs — Model Context Protocol |
| Currently Learning | Item 2 | Subagents |
| Currently Learning | Item 3 | Skills |
| Worth Reading | Headline | "Worth your time." |
| Worth Reading | Article 1 | "The Most Important Thing..." — George Mack |
| Worth Reading | Article 2 | "The Bitter Lesson" — Rich Sutton |
| Worth Reading | Article 3 | "You and Your Research" — Richard Hamming |

### Images — All Currently Placeholder

| Section | Placeholder | Intended replacement |
|---|---|---|
| Hero | 4:5 container | Portrait photo of Nika, Bay Area |
| Editorial Feature | 3:2 container | Travel photo — landscape/destination |
| Book of Month | 2:3 container | Actual book cover art |
| Hobbies (Labubu) | square/4:5 | Photo of Labubu collection |
| Hobbies (grid cells) | none currently | Optional per-card images |

### External Links

| Section | Destination | Status |
|---|---|---|
| Worth Reading — article 1 | georgemack.com (high agency) | External, active |
| Worth Reading — article 2 | incompleteideas.net (bitter lesson) | External, active |
| Worth Reading — article 3 | Bell Labs / Hamming transcript | External, active |
| Nav — say hello | `mailto:hello@ayonika.dev` | Active |
| Nav — LinkedIn | `https://linkedin.com/in/ayonikabose/` | Active |

---

## 6. Future Sections (Planned / Not Yet Built)

| Section | Description |
|---|---|
| **Photo Gallery / Moodboard** | Visual section showing travel photos, ceramics, cats. Could be a masonry grid or horizontal scroll strip between editorial sections. |
| **Monthly Playlist** | Spotify embed or track list — "What I'm listening to this month." Natural extension of the magazine format. |
| **Currently Watching** | Companion to Book of Month — TV show, film, or documentary pick with short review. |
| **Ceramics / Making** | Dedicated section for slow-craft work. Could show pieces with short captions. |
| **Cat Cam / The Girls** | Dedicated "The Girls" section with photos of the cats. Crowd-pleaser. |
| **Travel Log** | Expanded country detail — click a country on the map to see a micro-essay or photo set. |
| **Now Page** | Standard `/now` page pattern — what Nika is currently focused on, reading, building, feeling. Updates every few weeks. |
| **Guest Book / Contact** | A more personal contact section — not a booking form, more like a "say hi" form or guestbook. |
