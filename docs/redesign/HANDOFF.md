# Editorial Redesign — Handoff

**Branch:** `redesign/editorial` (checked out, uncommitted — nothing has been committed yet)
**Plan source:** `_meta/plans/2026-07-07-website-editorial-redesign.md` in Nika's Obsidian vault
**Repo:** `/Users/ayonika/Documents/My Website` (Next.js 16, React 19, Tailwind 4, Framer Motion + GSAP)

## What this is

Full editorial redesign of Nika's personal site — reframing it as a glossy magazine (Vogue/Atlantic feel) across both the career view (navy/cream) and personal view (burgundy/white), while killing the "obviously AI-portfolio" tells. Two-view architecture (career/personal, toggled via `data-view` on `<html>`) and `CareerMountain` are preserved intact per the plan's constraints.

## Status: code changes complete, NOT committed, NOT deployed

All 6 planned phases of code work are done and `npm run build` was passing as of the last verified check. What's left is QA (visual check in a browser), commit, and deploy — see "Remaining work" below.

## What was changed (by area)

### Fonts & tokens
- `app/layout.tsx` — replaced 4 font imports with `Inter` + `Fraunces` (Google Fonts variable font, axes `opsz/SOFT/WONK`, normal+italic). Fraunces is now `--font-fraunces`, mapped to `--font-serif`/`--font-display`.
- `app/globals.css` — new ink tokens `--ink-display: #1A1815`, `--ink-body: #3E3A36`; new type-scale tokens `--text-masthead`, `--text-deck`, `--text-caption`, `--text-body: 18px`. Old Cormorant/Playfair font-stacks swapped to `var(--font-serif)` across the file. Both career and personal theme blocks updated.
- **Non-obvious:** the pre-existing WIP `.ed-*` CSS class system (cover, folio, TOC, letter, colophon) was originally scoped to `[data-view="personal"]` only. It was unscoped (`perl -pi -e 's/\[data-view="personal"\] (\.ed-)/$1/g'`) so the career view's new cover could reuse it too. ~95 rules affected. Theme differences still flow correctly through CSS vars, not through the scoping.
- Note: `@theme inline` block in globals.css still has an old `--color-ink: #4A4440` — this is a Tailwind extension token, intentionally untouched, not a leftover bug.

### Career view
- `components/Hero.tsx` — fully rewritten as an editorial cover ("The Profile Issue"), reusing the `ed-cover` classes. Masthead, name, alias, deck copy, roman-numeral nav (`COVER_LINES`), right-pane headshot with barcode + Slack-mention caption relocated here per plan.
- `components/Projects.tsx` — added "No. 0X" article numbering, 4px ink-rule section opener, slowed row animation.
- `app/blog/page.tsx` — rewritten as an "Essays" issue table of contents (numbered index rows, no card images).
- `components/POV.tsx` — rewritten as an Atlantic-style pull quote with static (non-animated) stat numerals.

### Personal view
- `components/personal/EditorialFeature.tsx` — travel photo now goes through the new `EditorialImage` component.
- `components/personal/BookOfTheMonth.tsx` — duotone overlay + contrast filter on cover, drop-cap on review text.
- `components/personal/Hobbies.tsx` — card grid replaced with an "In Rotation" numbered list (hanging serif numerals, hairline rows).
- `components/personal/PersonalHero.tsx`, `EditorLetter.tsx`, `Contents.tsx`, `Colophon.tsx` — pre-existing WIP on this branch (not written this session) — reviewed and left as-is; they already satisfy the plan's "editor's letter" requirement.

### New component
- `components/EditorialImage.tsx` — enforces the plan's image treatment: 3:4 or 16:9 ratio only, contrast/saturation filter, subtle grain overlay, optional duotone, clip-path scroll-triggered unmask, captioned figcaption, respects `prefers-reduced-motion`.

### Motion pass
- `components/PageTransition.tsx` — rewritten as a page-turn wipe (accent panel sweep) instead of a plain fade.
- `components/ScrollReveal.tsx` — durations slowed to spec (0.9–1.0s, easing `[0.16,1,0.3,1]`).
- Removed 3 components no longer used anywhere: `AnimatedWord.tsx`, `AnimatedCounter.tsx`, `GradientDivider.tsx` (verified zero remaining importers before deleting — `git rm` already staged for these, visible as `D` in git status).
- `card-lift` class removed from `DiagramNode.tsx`; `GradientDivider` usages removed from `app/page.tsx`.

### Bug fixed this session
`next.config.ts` was missing `turbopack: { root: __dirname }`. A stray `package-lock.json` at `/Users/ayonika/Documents` (one directory above the actual project) was causing Next.js/Turbopack to misdetect the workspace root, which broke module resolution for `tailwindcss` and made every page 000/fail to load. Fixed by pinning `turbopack.root` explicitly — confirmed the dev server starts clean with no resolution errors after the fix.

## Remaining work (not started / not finished)

1. **Visual QA** — was about to start when this session was interrupted for a RAM/process-hygiene check. Needs, per the plan's QA checklist:
   - Load both views (`localhost:3000` career, `localhost:3000/personal`) and `/blog` at desktop width and 375px.
   - Confirm `prefers-reduced-motion` fallback paths look sane (PageTransition, ScrollReveal, EditorialImage all branch on `useReducedMotion`).
   - Screenshot both covers, the travel spread, the book page, and the essays index — save to `docs/redesign/` (this folder — it currently only has this handoff file).
2. **Missing photography** — plan says no stock/AI imagery. Site currently only has ~4 real photos (`hero photo.jpeg`, `headshot.png`, `mom and me in nyc.jpg`, `artemis2-earthset.jpg`). Any other `EditorialImage` slots referenced without a matching real photo need Nika to supply one — flag this explicitly to her, don't substitute stock art.
3. **Commit** — nothing on this branch is committed yet. `git status` shows the full diff (modified files, 3 deletions, several new untracked files under `components/` and `components/personal/`). Stage and commit on `redesign/editorial` per repo convention.
4. **Deploy** — user's original instruction was "rebuild the website and deploy," which explicitly overrides the plan's default "deploy only on explicit approval" gate. Vercel auto-deploys from git push. Confirm whether pushing `redesign/editorial` gives a preview deploy or whether production requires merging to `main` first, then proceed accordingly (`npm run build` must pass first).

## Process-hygiene note for whoever picks this up

Don't spawn parallel subagents for this task — Nika flagged that a prior session using several at once spiked her machine's memory. Do the QA/screenshot/commit work directly in one session with a single dev server instance running at a time; kill it when done. The `ps aux` VSZ numbers for `claude`/Electron processes always look huge (400GB+) — that's virtual address space, not real usage; check RSS (`ps aux -m | awk '{sum+=$6} END {print sum/1024/1024}'`) if memory pressure is a concern.
