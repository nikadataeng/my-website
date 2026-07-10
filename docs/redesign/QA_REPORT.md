# Editorial Redesign — QA Report

Date: 2026-07-09
Branch: `redesign/editorial`
Tested against: local dev server (`npm run dev`), desktop (1440px) and mobile (375px) widths, via Claude in Chrome.

Note: screenshot save-to-disk was unavailable in this session's browser tooling, so no image files were archived here. Every page below was visually reviewed live and is described in the findings. Re-run a screenshot pass manually if you want image artifacts for this folder.

## Pages checked

- Career cover (`/`) — desktop + 375px
- Personal cover (`/personal`) — desktop + 375px
- Essays index (`/blog`) — desktop + 375px
- Full scroll-through: career (Hero → About → CareerMountain → Projects → POV → Footer)
- Full scroll-through: personal (Hero → Table of Contents → Editor's Letter → Travel spread → Book of the Month → Hobbies "In Rotation" → Worth Reading → Colophon → Footer)

## Result: all pages render correctly

Both covers, the essays index, CareerMountain (all 4 peaks + highlight bubbles), Projects numbering, the travel spread photo, book duotone treatment, and the "In Rotation" hobbies list all look right and match the plan's editorial direction. Mobile (375px) reflows cleanly — hamburger nav appears, single-column layout, no overflow.

**False alarm, worth knowing about:** on first load, both covers and the essays index appear blank/broken for roughly 1-2 seconds before content fades in. This is the new `PageTransition` page-turn wipe working as designed, not a bug — but it's a long enough delay that anyone glancing at the page immediately after a route change (or a synthetic browser test that screenshots too early) will think something's broken. Same story for the travel-spread photo, which uses `EditorialImage`'s scroll-triggered clip-path unmask: it's genuinely blank until it scrolls into view, then wipes in. Worth a gut-check on whether the wipe duration feels right in person — it read as slightly long when testing.

**One tooling oddity, not reproduced on retest:** once, navigating to `/personal` appeared to silently revert to the career view a couple seconds after load. I could not reproduce this on a clean retest (loaded correctly and stayed correctly). Likely a one-off artifact of the automated browser tooling rather than a real app bug, but flagging in case you notice view-switching flakiness during your own click-through.

## Real finding: reduced-motion coverage is incomplete

The handoff notes said `PageTransition`, `ScrollReveal`, and `EditorialImage` all branch on `useReducedMotion`. Checked the code directly:

- `PageTransition.tsx` — branches correctly.
- `EditorialImage.tsx` — branches correctly.
- `ScrollReveal.tsx` — **does not** check `useReducedMotion` or `prefers-reduced-motion` at all. It's used throughout both views for section reveals, so anyone with reduced-motion enabled still gets the full fade/slide/clip-wipe animations from this component.

No global `MotionConfig reducedMotion="user"` wrapper exists either, so this isn't caught upstream. Not fixed as part of this pass since it wasn't asked for — flagging so you can decide whether to patch `ScrollReveal.tsx` before or after this ships.

## Minor: hydration console warning

Every page logs a dev-only React hydration mismatch warning about the `body` tag's inline `font-family` style casing (`fontFamily` vs `font-family`). Cosmetic, dev-only, does not affect rendering. Low priority.

## Photography audit

Checked every active image reference in `content/**/*.json` and `components/**/*.tsx` against `public/images/`. Every slot currently in use maps to one of your real photos:

| Slot | File |
|---|---|
| Career cover / About headshot | `headshot.png` |
| Personal cover masthead | `hero photo.jpeg` |
| Travel spread | `mom and me in nyc.jpg` |
| Hobbies — Space | `artemis2-earthset.jpg` |
| Book of the Month cover | `project-hail-mary-cover.jpg` |

No orphaned `EditorialImage` slots pointing at missing files. There are 4 unused placeholder SVGs left over in `public/images/` (`book-cover.svg`, `hero-portrait.svg`, `hobby-featured.svg`, `travel-feature.svg`) — none are referenced anywhere in the current code, so no action needed unless you want them deleted for cleanliness.

## Build

`npm run build` was not re-verified in this session (sandboxed shell here is Linux; this repo's native deps — `@next/swc-darwin-arm64` — only run on macOS). Confirm locally before merging if it's been a while since the last check mentioned in the handoff.
