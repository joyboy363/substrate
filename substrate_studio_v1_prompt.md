# Substrate Studio — v1 Build Prompt (Claude Code)

## Context
You are building the **v1 landing page** for **Substrate Studio**, a web development and software studio. The brand positioning: *"The layer your business runs on."* We build websites, software, and automation for operators who care about craft.

This is a **first draft**. The goal is a working, deployable foundation with correct structure, typography, layout, and clean conversion sections. Cinematic elements (3D statue in the hero, custom cursor, carve animations, Higgsfield-generated marble textures) will be layered on later — leave clean, well-marked placeholders for them. Do not attempt to generate or approximate those effects now.

## Stack
- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS**
- **Framer Motion** (for basic reveal animations only in v1)
- **Deployment target:** Vercel
- No CMS, no database. Content lives in a single `content.ts` config file so it's easy to edit.

## Aesthetic direction
- **Palette:** off-white background (`#F5F2EC` marble tone), deep charcoal text (`#1A1A1A`), single accent color reserved for CTAs (`#8B7355` — muted bronze/patina). No gradients. No dark mode.
- **Typography:**
  - Headings: a high-contrast serif — use **GT Sectra** if available, otherwise **Cormorant Garamond** from Google Fonts as a stand-in. Large, letter-spaced, engraved-feel.
  - Body: **Inter** from Google Fonts. Clean, neutral.
- **Feel:** Greek temple / Renaissance restraint. Generous whitespace. Symmetry where it fits. One ornamental flourish in the footer only. Everything below the hero is quiet and conversion-focused.

## Page structure

### 1. Hero (full viewport)
- Off-white background.
- **Placeholder div** centered, `id="hero-3d-placeholder"`, dashed border, labeled `/* R3F statue goes here — hand holding a small classical temple */`. Roughly 500px tall on desktop, 320px on mobile.
- Above the placeholder: wordmark **SUBSTRATE STUDIO** in the serif, uppercase, letter-spaced ~0.15em, very large (clamp for responsiveness).
- Below the placeholder: tagline in Inter, medium weight — *"The layer your business runs on."*
- Single CTA button below tagline: **See the work** — bronze accent, understated, links to `#work`.
- Small scroll cue at the bottom of the viewport (a thin vertical line + "scroll" in small caps).

### 2. Work
- Section header: **Selected Work** (serif, left-aligned, with a thin horizontal rule underneath).
- Grid of case study cards. In v1, pull entries from `content.ts`. Seed with one real entry:
  - **Rumba Yacht Rentals** — image placeholder, one-line result: *"Cinematic booking experience for a Toronto-based yacht charter operator."* Link to `https://rumba-yacht.vercel.app`.
- Leave the grid ready to accept 5–8 more entries as they roll out. Two columns on desktop, one on mobile.

### 3. What we build
- Section header: **What we build**.
- Three columns, each with a small serif numeral (I, II, III) as a decorative marker, then a heading and 2–3 lines of copy:
  - **I. Websites** — Cinematic marketing sites, product pages, and landing experiences.
  - **II. Software** — Internal tools, dashboards, and custom applications built for how your business actually runs.
  - **III. Automation** — AI-powered workflows, outreach systems, and back-office automation.

### 4. Process
- Section header: **How we work**.
- Four steps laid out horizontally on desktop, stacked on mobile. Each step: Roman numeral, short title, one sentence.
  - **I. Discovery** — We learn the business, the operator, and the constraints.
  - **II. Brief** — A written design and technical brief you approve before we build.
  - **III. Build** — Rapid, iterative construction with previews at each stage.
  - **IV. Ship** — Deployed, monitored, and handed off with documentation.

### 5. Contact
- Section header: **Start a project**.
- Two-column layout on desktop:
  - Left: one paragraph of copy — something like *"We take on a small number of projects at a time. If you have something you'd like to build, tell us about it."*
  - Right: a simple contact form (Name, Email, Company, Project description). On submit, POST to `/api/contact` — stub the API route to just `console.log` the payload and return 200 for now.
- Alternative: a single mailto link below the form to `hello@substratestudio.com` (placeholder — Diego will update).

### 6. Footer
- Centered layout.
- Wordmark **SUBSTRATE STUDIO** small, at the top.
- One line: *"Toronto — Worldwide."*
- One ornamental flourish SVG below (a simple Renaissance-style horizontal fleuron — use a clean SVG, keep it small and centered).
- Copyright line at the bottom.

## File structure
```
/app
  layout.tsx          # fonts, metadata, global styles
  page.tsx            # composes all sections
  globals.css         # tailwind + font-face if needed
  /api/contact/route.ts
/components
  Hero.tsx
  Work.tsx
  WhatWeBuild.tsx
  Process.tsx
  Contact.tsx
  Footer.tsx
  Fleuron.tsx         # the SVG ornament
/lib
  content.ts          # all copy + case study data, editable in one place
/public
  /placeholders       # any placeholder imagery
```

## Animation (v1 only — keep it minimal)
- Framer Motion `whileInView` fade-up on section headers and case study cards. Duration ~0.6s, ease-out. Nothing more.
- Do **not** add: custom cursor, carve animations, parallax, scroll-linked 3D. Those come in v2 with the R3F pass.

## Metadata
- Page title: `Substrate Studio — The layer your business runs on.`
- Meta description: `A web development and software studio building cinematic sites, internal tools, and automation for operators who care about craft.`
- Open Graph image: leave a placeholder `og-image.png` reference — Diego will supply.

## Deliverables
- Fully working Next.js project that runs with `npm run dev`.
- Deployable to Vercel with zero config.
- All copy in `lib/content.ts` so edits don't require touching component code.
- Clear comments where the R3F hero, custom cursor, and cinematic effects will slot in later.
- Responsive from 375px up to 1920px+.

## Constraints
- No third-party UI libraries beyond Tailwind + Framer Motion.
- No R3F, no Three.js, no GSAP in v1 — placeholder only.
- No image generation or attempts to fake the marble/statue aesthetic with CSS gradients. Leave the hero centerpiece as a clean placeholder box; textures and 3D come from Higgsfield/R3F later.
- Ship clean, readable code. This is a foundation that will be built on iteratively.
