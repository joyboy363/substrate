# Substrate Studio — Brand Identity Extract

## 1. Color Tokens

### Core palette (`tailwind.config.ts`)
| Token | Hex | Role |
|---|---|---|
| `background` | `#F5F2EC` | Primary background (off-white/marble) — body, footer |
| `charcoal` | `#1A1A1A` | Primary text color, dark overlays, dark section fills |
| `bronze` | `#8B7355` | Accent — numerals, focus states, ornamental SVG, hover accents |

### Body base (`globals.css`)
| Hex | Role |
|---|---|
| `#f5f2ec` | `body` background-color (duplicate of `background` token, set outside Tailwind for pre-hydration paint) |

### Glow/text-shadow palette (`globals.css`, custom utility classes)
| Class | Colors (hex equiv.) | Role |
|---|---|---|
| `.text-glow` | `#FFFFFF` @ 0.8/0.5/0.3 alpha | White glow — default section headings/body on dark backgrounds |
| `.text-glow-magenta` | `#9933C8` @ 1/0.9/0.7/0.5 alpha | Magenta glow — unused in current live markup (retained utility) |
| `.text-glow-silver` | `#FFFFFF` @ 0.95, `#D2D6E0` @ 0.8, `#B4BACA` @ 0.5 | Silver/cool-white glow — Hero nav bar links and CTA |
| `.text-glow-black` | `#000000` @ 0.8/0.5/0.3 alpha | Black glow — "Selected Work" heading + card text (white text, black halo) |
| `.text-glow-gold` | `#FFD700` @ 1, `#FFC328` @ 0.85, `#FFAA14` @ 0.6, `#FF9600` @ 0.4 | Gold glow — Hero wordmark/tagline/CTA/scroll label, Roman numerals |

### Direct/inline hex
| Hex | Role |
|---|---|
| `#FFD700` | Gold text fill — Hero wordmark (`SUBSTRATE STUDIO`), discipline/process Roman numerals (`text-[#FFD700]`) |

### Utility-driven neutrals (Tailwind defaults, used extensively — not custom tokens)
| Color | Role |
|---|---|
| `white` / `white/N%` | Primary text and borders on dark section backgrounds (Work, What We Build, How We Work, Contact, Hero) |
| `black` | Overlay gradients (section-transition fades), Contact/overlay scrims |
| `charcoal/N%` | Border hairlines and fills on light background (Footer, hover states) |

---

## 2. Typography

### Font families (`app/layout.tsx`, `next/font/google`)
| Variable | Font | Weights loaded | Role |
|---|---|---|---|
| `--font-serif` | Cormorant Garamond *(stand-in for GT Sectra — original brief spec'd GT Sectra, unavailable on Google Fonts)* | 400, 500, 600, 700 | All headings (`h1`/`h2`/`h3`), Roman numerals, footer wordmark |
| `--font-sans` | Inter | default (variable) | Body copy, form fields, nav links, buttons, footer meta text |

Tailwind exposure: `font-serif` → `var(--font-serif)`, `font-sans` → `var(--font-sans)` (`tailwind.config.ts`). No display/monospace family defined.

### Type scale in use (by element)
| Element | Classes | Notes |
|---|---|---|
| Hero wordmark (`h1`) | `font-serif uppercase tracking-[0.15em] text-[clamp(2rem,5vw,4rem)] leading-[1.05]` | Only explicit `line-height` override in the codebase (`1.05`) |
| Hero tagline (`p`) | `font-sans (default) text-xl font-medium` | |
| Hero CTA button | `text-sm uppercase tracking-[0.1em]` | |
| Hero scroll label | `text-[10px] uppercase tracking-[0.2em]` | |
| Hero nav links | `text-xs uppercase tracking-[0.15em]` | |
| Section headings (Selected Work / What We Build / How We Work) | `font-serif text-4xl md:text-5xl` | |
| Contact heading | `font-serif text-5xl md:text-6xl` | Largest heading on the site |
| Roman numerals (I–IV) | `font-serif text-2xl` (What We Build) / `text-xl` (How We Work) | |
| Case-study card title (`h3`) | `font-serif text-2xl` | |
| Case-study result / body copy | default sans, `text-white/70` or `text-charcoal/70` | |
| Process step title (`h3`) | `font-serif text-xl` | |
| Process step description | `text-sm` | |
| Contact copy (`p`) | `text-xl` | |
| Contact email link | `text-lg` | |
| Form inputs | default sans, base size | |
| Footer wordmark | `font-serif text-sm uppercase tracking-[0.15em]` | |
| Footer location | `text-sm` | |
| Footer copyright | `text-xs` | |

### Letter-spacing scale
`tracking-[0.05em]` (unused currently) · `tracking-[0.1em]` (CTA/button labels) · `tracking-[0.15em]` (wordmark, nav, footer wordmark) · `tracking-[0.2em]` (scroll cue, intro skip button)

---

## 3. Asset Inventory

### `/public` (active, deployed assets)
| Path | Purpose | Description |
|---|---|---|
| `public/emblem.png` | Logo | Circular seal/crest mark — used in Footer |
| `public/cursor-chisel.png` | Logo/UI | Pixel-art chisel icon, resized to 44×44 — site-wide custom cursor |
| `public/text-logo.png` | Logo | Carved wordmark lockup image — currently unreferenced in code (Hero uses live text instead) |
| `public/hero-top.png` | Hero | Hero background — statues + galaxy composite, masked with per-line clip-path holes, revealed via cursor-trail canvas |
| `public/firefly.mp4` | Hero | Video revealed through Hero's mouse-trail canvas and as the Hero's base background video |
| `public/intro.mp4` | Hero/Intro | Full-screen splash video played once on every page load/reload |
| `public/hands-background.mp4` | Section imagery | "Selected Work" section's sticky background video (marble + hand) |
| `public/stars.jpg` | Section imagery | Starfield background shared by "What We Build" + "How We Work" |
| `public/hand-logo.png` | Section imagery | "Start a Project" (Contact) section background — dithered hand graphic |
| `public/dyson.jpg` | Section imagery (unused) | Dyson-sphere/space image — trialed as How We Work background, reverted; unreferenced in current code |
| `public/frame.png` | Decorative | Ornate silver picture-frame overlay on Selected Work case-study cards |

### `/assets` (raw source uploads — reference/working files, not all deployed)
| Path | Purpose | Description |
|---|---|---|
| `assets/hero top.png` | Hero (superseded) | Early plain-marble hero background candidate |
| `assets/hero filterr.png` | Hero (superseded) | Warm-toned filtered statue hero candidate |
| `assets/img 42.png` | Hero (source) | Source for current `public/hero-top.png` (statues + galaxy) |
| `assets/ASCII 1.png` | Hero (rejected) | ASCII-art bust experiment, reverted |
| `assets/ASCII 2.png` | Hero (rejected) | ASCII-art bust experiment variant, unused |
| `assets/substrate final logo.png` | Logo (unused) | Full logo lockup on black canvas |
| `assets/no background logo.png` | Logo (source) | Source for `public/emblem.png` |
| `assets/text logo.png` | Logo (source) | Source for `public/text-logo.png` |
| `assets/text logo 2.png` | Logo (rejected) | Gold-tone wordmark alternate, reverted |
| `assets/chisel.png` | UI (source) | Source for `public/cursor-chisel.png` |
| `assets/hands background.mp4` | Section imagery (source) | Source for `public/hands-background.mp4` |
| `assets/Firefly.mp4` | Hero (superseded) | Original Firefly video before `backherovideo.mp4` replaced its content |
| `assets/backherovideo.mp4` | Hero (source) | Source for current `public/firefly.mp4` content |
| `assets/dyson.jpg` | Section imagery (source) | Source for unused `public/dyson.jpg` |
| `assets/hand logo.png` | Section imagery (source) | Source for `public/hand-logo.png` |
| `assets/resized-1920x1080.png` | Section imagery (superseded) | 16:9 crop of hand graphic, intermediate Contact-bg iteration |
| `assets/stars.jpg` | Section imagery (source) | Source for `public/stars.jpg` |
| `assets/frame.png` | Decorative (superseded) | First frame-overlay iteration |
| `assets/frame1.png` | Decorative (rejected) | Frame iteration — thin border, opaque (no transparency), unusable |
| `assets/frame2.png` | Decorative (superseded) | Frame iteration — thicker border |
| `assets/frame4.png` | Decorative (source) | Source for current `public/frame.png` |
| `assets/intro.mp4` | Intro (superseded) | Original intro video |
| `assets/intro1.mp4` | Intro (superseded) | Intro iteration 1 |
| `assets/intro2.mp4` | Intro (superseded) | Intro iteration 2 (shorter) |
| `assets/intro4.mp4` | Intro (source) | Source for current `public/intro.mp4` |

### Inline SVG
| Component | Description |
|---|---|
| `components/Fleuron.tsx` | Renaissance-style horizontal fleuron ornament — hand-coded SVG (lines + petal path + center dot), `text-bronze`, footer-only |

---

## 4. Motion Patterns

### Framer Motion — standard fade-up (used on nearly every heading, card, and grid item)
```js
initial={{ opacity: 0, y: 16 }}
whileInView={{ opacity: 1, y: 0 }}   // Hero wordmark uses animate={} instead (fires on mount, not scroll)
viewport={{ once: true }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

**Stagger delays by context:**
| Context | Delay formula |
|---|---|
| Selected Work cards | `index * 0.05` |
| What We Build items | `index * 0.1` |
| How We Work steps | `index * 0.08` |
| Hero tagline / CTA | fixed `0.1` / `0.2` |
| Contact copy / form columns | fixed `0` / `0.1` |

### CSS transition (non-Framer)
- **Intro overlay dismiss**: `opacity-0`/`opacity-100` with `transition-opacity duration-700` (700ms), React-state driven, not scroll-driven.
- **Hover states**: `transition-colors` / `transition-opacity` (buttons, links, nav), default Tailwind duration (150ms) except case-study grayscale hover which uses `duration-500`.

### Custom canvas animation (Hero cursor trail)
Not Framer Motion — a `requestAnimationFrame` loop with manual alpha decay:
- Trail circle radius: `110px`
- Decay rate: `0.96` per frame (~1.5s to fade to invisible)
- New point threshold: `8px` minimum cursor movement before a new trail point is recorded
- Each point draws a clipped circle of the live Firefly video at full opacity, decaying in place (no re-tracking) so the reveal "heals" back to the marble image over time.

---

## 5. Copy Voice

**Hero**
> SUBSTRATE STUDIO
> The layer your business runs on.

**Selected Work**
> Rumba Yacht Rentals
> Cinematic booking experience for a Toronto-based yacht charter operator.

**What We Build**
> I. Websites
> Cinematic marketing sites, product pages, and landing experiences.

**How We Work**
> I. Discovery
> We learn the business, the operator, and the constraints.

**Start a Project**
> Start a project
> We take on a small number of projects at a time. If you have something you'd like to build, tell us about it.

**Meta description**
> A web development and software studio building cinematic sites, internal tools, and automation for operators who care about craft.

---

## 6. Layout Tokens

### Spacing
| Token | Usage |
|---|---|
| `px-6` | Base horizontal padding, all breakpoints |
| `md:px-16` | Horizontal padding ≥768px |
| `lg:px-24` | Horizontal padding ≥1024px |
| `py-24` | Standard section vertical padding (Work, What We Build, How We Work, Contact) |
| `py-16` | Footer vertical padding |
| `gap-10 md:gap-14` | Selected Work 2-col grid |
| `gap-12 md:gap-10` | What We Build 3-col grid |
| `gap-10 md:gap-8` | How We Work 4-col grid |
| `gap-14 md:gap-20` | Contact 2-col grid |
| `gap-8` | Footer 3-col grid |

### Container / sizing
| Token | Usage |
|---|---|
| `max-w-md` | Hero tagline width cap |
| `max-w-sm` | Contact copy width cap |
| `aspect-[4/3]` | Case-study card image ratio |
| `h-screen` / `min-h-screen` / `min-h-[140vh]` | Full-bleed section heights (Hero, sticky video sections, Contact) |

### Border radius
**None used.** No `rounded-*` Tailwind utilities anywhere in the codebase — the design is deliberately sharp-cornered. The only curvature on the entire site is hand-computed via SVG `clip-path` arcs on the Hero's text-reveal holes: `32px` radius on the wordmark hole's top corners, `18px` radius on the CTA hole's bottom corners (all other corners on all other elements are 0).

### Shadows
**No `box-shadow` / `shadow-*` utilities used anywhere.** All "glow" effects are implemented exclusively via multi-layer `text-shadow` (see §1 glow classes) — there is no elevation/drop-shadow system in this design.

### Borders
1px hairlines throughout, no other border widths in use:
`border-white/20`, `border-white/30`, `border-charcoal/10`, `border-charcoal/20`, `border-white`, `border-bronze` (focus state only)
