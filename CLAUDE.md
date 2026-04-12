@AGENTS.md

# Ayonika's Portfolio Website

Dual-themed portfolio site: **career** (warm cream, navy accent) and **personal** (white, burgundy accent). Built with Next.js 16 App Router, React 19, Tailwind 4, Framer Motion + GSAP.

## How to Run
```bash
cd "/Users/ayonika/Documents/My Website"
npm run dev          # Dev server (localhost:3000)
npm run build        # Production build (Vercel)
```

## Two Views, One Page

The site renders two completely different views from a single `app/page.tsx`. View state lives in `context/ViewContext.tsx` and switches via the ViewToggle button in the Nav.

| View | URL | Accent | Display Font | Personality |
|------|-----|--------|-------------|-------------|
| Career | `/` or `/career` | Rajput blue `#2B4D8C` | Noto Sans Display | Professional, heritage |
| Personal | `/personal` | Burgundy `#944D5E` | Cormorant Garamond | Editorial, warm |

Theme switching happens via `data-view="career|personal"` on `<html>`. CSS custom properties swap accordingly.

## Page Layout

**Career view:**
`Hero -> IdentityBlock -> CareerMountain -> Projects -> POV -> Footer`

**Personal view:**
`PersonalHero -> EditorialFeature -> BookOfTheMonth -> Hobbies -> WorthReading -> Footer`

**Blog** (`/blog`): Standalone page listing published articles.

## File Tree (what matters)

```
app/
  globals.css          # All design tokens + utility classes
  layout.tsx           # Font loading (Inter, Playfair, Cormorant, Noto Sans Display)
  page.tsx             # Career/personal view switch
  blog/page.tsx        # Blog listing

components/
  # Shared
  Nav.tsx              # Fixed header, hamburger, ViewToggle
  Footer.tsx           # "Say hello" + email + LinkedIn + Calendly
  ScrollReveal.tsx     # Framer Motion fade-in wrapper
  AnimatedRule.tsx     # Animated horizontal divider
  PageTransition.tsx   # Opacity fade wrapper
  ViewToggle.tsx       # Career/personal pill toggle
  CalendlyButton.tsx   # react-calendly popup

  # Career view
  Hero.tsx             # Slack-style message with emoji reactions
  IdentityBlock.tsx    # About section (what she builds, stack)
  CareerMountain/      # Scroll-animated mountain ridge timeline
    CareerMountain.tsx #   Main SVG + GSAP scroll triggers
    MilestoneCard.tsx  #   Frosted-glass cards at peaks
    HighlightBubble.tsx#   Floating callout bubbles
    milestones.ts      #   Data import from JSON
  Projects.tsx         # Work section (replaced X -> built Y)
  WhatIReplace.tsx     # Before/after replacement list
  POV.tsx              # Pull quote
  MiscGrid.tsx         # 4-col info grid

  # Personal view
  personal/
    PersonalHero.tsx   # Masthead
    EditorialFeature.tsx # Travel + world map
    WorldMap.tsx        # react-simple-maps visualization
    BookOfTheMonth.tsx  # Current read feature
    Hobbies.tsx         # 6-hobby grid
    WorthReading.tsx    # Curated reading list
    CurrentlyLearning.tsx # Learning cards

content/               # ALL display data lives here as JSON
  career/
    milestones.json    # Mountain timeline (company, title, year, skills, highlights)
    projects.json      # Work section (replaced, name, stack, description)
    misc.json          # MiscGrid items
  personal/
    book.json          # Book of the month
    countries.json     # Countries visited
    hobbies.json       # Hobby cards
    reading-list.json  # Worth reading articles
  blog/
    posts.json         # Blog post list

context/
  ViewContext.tsx       # Career/personal state + URL sync
```

## Design Tokens (from globals.css)

**Never use raw hex. Always `var(--token-name)`.**

| Token | Career | Personal | What it's for |
|-------|--------|----------|---------------|
| `--color-bg` | `#FAF9F7` | `#FFFFFF` | Page background |
| `--color-ink` | `#4A4440` | `#4A4440` | Primary text (a.k.a. "shilajit") |
| `--color-accent` | `#2B4D8C` | `#944D5E` | Links, highlights, accent |
| `--color-muted` | `#6B6862` | `#6B6862` | Secondary text, faded states |
| `--color-surface` | `#FFFFFF` | `#F8F7F5` | Card backgrounds |
| `--color-border` | `#EEECE8` | `#E8E6E0` | Borders, dividers |

**Personal-only Monet palette:** `--monet-lily-green`, `--monet-mauve`, `--monet-blush`, `--monet-sage`, `--monet-wheat`, `--monet-sky`

**Typography tokens:**
| Token | Value | Usage |
|-------|-------|-------|
| `--text-hero` | `clamp(48px, 8vw, 96px)` | Hero headings |
| `--text-section` | `clamp(32px, 4.5vw, 58px)` | Section headings |
| `--text-heading` | `26px` | Card headings |
| `--text-body` | `17px` | Body copy |
| `--text-label` | `11px` | Uppercase labels |

**Four font families:**
- `var(--font-inter)` - body text, labels, UI
- `var(--font-cormorant)` - personal view display, elegant serif
- `var(--font-playfair)` - career view serif accents
- `var(--font-noto-display)` - career view headings

## CSS Classes (check before adding new ones)

Key utility classes already in globals.css:
- `.text-hero`, `.text-section`, `.text-heading`, `.text-label`, `.text-pullquote`
- `.card-lift` - hover transform + shadow
- `.link-underline` - animated underline on hover
- `.editorial-rule` - 3px solid top border
- `.pullquote-block` - bordered quote block
- `.drop-cap::first-letter` - large serif initial
- `.gradient-wash` - impressionist background (personal only)

## Animation Stack

- **Framer Motion**: Basic reveals, fades, layout transitions (ScrollReveal, ViewToggle)
- **GSAP + ScrollTrigger**: Complex scroll-driven animations (CareerMountain only)
- Standard easing: `[0.16, 1, 0.3, 1]` (spring-like cubic bezier)

## Content Updates

All display data lives in `content/**/*.json`. To update what the site shows (projects, books, hobbies, countries, blog posts), edit the JSON files. Component code only needs to change for layout/styling.

There is also a `/update` skill that can classify unstructured notes and write to the correct JSON file.

## Working Rules

1. **Design tokens only** - never raw hex in JSX or CSS. Exception: inline dynamic values.
2. **Check globals.css** before adding CSS classes - reuse existing utility classes.
3. **Content vs code** - if it's display text, it belongs in `content/*.json`, not hardcoded in TSX.
4. **Both views** - changes to shared components (Nav, Footer, ScrollReveal) affect both career and personal. Test both.
5. **No em dashes** - use regular dashes, commas, or rewrite.
6. **No company names in work descriptions** - the Projects/WhatIReplace sections use generic labels (e.g., "Legacy CRM" not "Salesforce"). Mountain milestones DO use real company names.
7. **CareerMountain highlight bubbles** are hardcoded in CareerMountain.tsx (not from JSON). GSAP animation loops through indices `[0, 1, 2]` per peak.

## Deployment

Hosted on Vercel. `npm run build` must pass before deploy. Vercel auto-deploys from git push.

---

## Contextual Rules (auto-loaded)

These `.claude/rules/` files load automatically when editing matching paths:

- **`.claude/rules/career-mountain.md`** - Peak geometry, GSAP scroll thresholds, highlight positioning
- **`.claude/rules/design-tokens.md`** - Full token reference, font stack, color naming
- **`.claude/rules/content-schema.md`** - JSON schemas for all content files

*Last updated: April 12, 2026.*
