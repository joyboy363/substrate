# Substrate Studio — surgical perf pass

Diagnosis from Lighthouse (mobile, slow 4G):
- Score: **40**
- LCP: **15.6s** (target: <2.5s)
- TBT: **3,320ms** (target: <200ms)
- Total network payload: **36,418 KiB** (target: <3,000 KiB)
- Main thread work: 9.8s, 20 long tasks

The root problem is **image payload — 36 MB total**. Everything else is secondary. Fix in this order; STOP after phase 1 so I can re-measure.

---

## Phase 1 — Image payload (biggest win, DO THIS FIRST)

### Inventory step

1. List every image in `public/`, `src/assets/`, and any other asset directory. For each, report: full path, size in KB, dimensions in pixels, format.
2. Sort by file size, largest first.
3. Report the top 20 by size, plus a total across all images.

### Rules for the fix (apply to EVERY image over 200KB)

- **Longest edge cap: 2400px.** No image on this site needs to be larger. Anything above → resize down preserving aspect ratio.
- **Format: WebP or AVIF.** Convert everything except:
  - PNGs with transparency needed for compositing (keep as PNG-optimized OR use WebP with alpha)
  - SVGs (leave alone — they're vectors)
- **Quality: 80–85.** Do NOT go lower. Substrate's brand is cinematic/marble imagery — over-compression will destroy the aesthetic and defeat the purpose.
- **Prefer Next.js `<Image>` component** for anything not already using it. It handles responsive sizes, lazy loading, and format negotiation automatically.
- **Above-the-fold hero images:** add `priority` prop on `next/image`. Below-the-fold: default lazy loading is fine.

### Do NOT touch

- SVG files
- Logo files (already optimized)
- Any image explicitly used as a texture/overlay where compression would create visible artifacts — flag these, don't compress
- Aspect ratios (never crop, only resize proportionally)
- Any image that's already under 200KB and under 2400px

### Verification

After the pass:
- Report: total image weight before vs after, per-file breakdown of what changed
- Report: any images you deliberately left alone and why
- Confirm `next build` still passes
- Do NOT push or commit — I'll review the diff and re-run Lighthouse first

STOP HERE after phase 1. Do not proceed to phase 2 until I confirm.

---

## Phase 2 — JavaScript execution (only if phase 1 didn't get us to Lighthouse >70)

Only enter this phase if I say "continue." Do NOT preemptively touch JS.

Planned checks:
- Bundle analysis via `next build` output
- Framer Motion import audit (named imports vs full lib)
- Icon library import audit
- Unnecessary `"use client"` directives on static components
- Any large libs importable server-side

---

## Do NOT

- Change visual style, typography, color, or animation timing/feel
- Compress hero imagery below quality 80
- Downsize any image below 1600px longest edge (that's the fallback minimum for retina laptops)
- Convert SVGs
- Refactor components for "cleanliness"
- Enter phase 2 without explicit go-ahead
- Push or commit — I'll review the diff first

Report findings and stop.
