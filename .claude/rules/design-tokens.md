---
description: Design token reference - colors, typography, spacing, utility classes
globs: app/globals.css,components/**/*.tsx
---

# Design Token Reference

## Color System

Two themes swap via `[data-view]` on `<html>`:

| Token | Career | Personal | Nika's Name |
|-------|--------|----------|-------------|
| `--color-bg` | `#FAF9F7` | `#FFFFFF` | warm cream / pure white |
| `--color-ink` | `#4A4440` | `#4A4440` | "shilajit" |
| `--color-accent` | `#2B4D8C` | `#944D5E` | "Rajput blue" / burgundy |
| `--color-muted` | `#6B6862` | `#6B6862` | lighter grey |
| `--color-surface` | `#FFFFFF` | `#F8F7F5` | card bg |
| `--color-border` | `#EEECE8` | `#E8E6E0` | borders |
| `--color-caption` | - | `#A8A49E` | personal only |
| `--color-green` | `#4A7C59` | - | career only |

### Monet Palette (personal view only)
```
--monet-lily-green:  #89A89E
--monet-mauve:       #B5B0C5
--monet-blush:       #CCB8C2
--monet-sage:        #9FAE98
--monet-wheat:       #EAD992
--monet-sky:         #9FB8C8
```

## Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--text-hero` | `clamp(48px, 8vw, 96px)` | Hero headings |
| `--text-section` | `clamp(32px, 4.5vw, 58px)` | Section headings |
| `--text-heading` | `26px` | Card headings |
| `--text-body` | `17px` | Body copy |
| `--text-label` | `11px` | Uppercase labels |

### Font Families
- `var(--font-inter)` - all body text, labels, UI elements
- `var(--font-noto-display)` - career view section headings (`--font-display` resolves to this in career)
- `var(--font-cormorant)` - personal view display font, elegant serif
- `var(--font-playfair)` - career serif accents (pull quotes, etc.)

### Font Classes
- `.text-hero` - responsive hero with serif italic styling
- `.text-section` - section headings
- `.text-heading` - 26px bold
- `.text-label` - 11px uppercase tracking
- `.text-pullquote` - serif italic, 22-34px

## Spacing
- `--section-gap`: `clamp(80px, 12vw, 140px)` career / `clamp(80px, 10vw, 120px)` personal

## Utility Classes (reuse these)
- `.card-lift` - hover shadow + translateY
- `.link-underline` - animated underline on hover via pseudo-element
- `.editorial-rule` - 3px solid top border
- `.pullquote-block` - bordered top/bottom, padding
- `.drop-cap::first-letter` - large serif initial
- `.gradient-wash` - soft impressionist gradient (personal only)

## Rules
- NEVER use raw hex values. Always `var(--token-name)`.
- Check globals.css before inventing new classes.
- When Nika says "shilajit" she means `--color-ink` (#4A4440).
- When Nika says "Rajput blue" she means `--color-accent` in career view (#2B4D8C).
