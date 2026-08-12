"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

const LINE_PADDING = 14;
const TRAIL_RADIUS = 110;
const TRAIL_DECAY = 0.96; // per animation frame — closer to 1 = slower fade
const TRAIL_MIN_DIST = 8; // px moved before a new trail point is added

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Selected Work", href: "#work" },
  { label: "Software Products", href: "#software" },
  { label: "What We Build", href: "#build" },
  { label: "How We Work", href: "#process" },
];
const NAV_CTA = { label: "Start a Project", href: "#contact" };

// Per-hole corner radii [top-left, top-right, bottom-right, bottom-left] —
// heading curves at the top, CTA curves at the bottom, tagline stays sharp.
const HOLE_RADII: [number, number, number, number][] = [
  [32, 32, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 18, 18],
];

function roundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  [tl, tr, br, bl]: [number, number, number, number]
): string {
  tl = Math.min(tl, w / 2, h / 2);
  tr = Math.min(tr, w / 2, h / 2);
  br = Math.min(br, w / 2, h / 2);
  bl = Math.min(bl, w / 2, h / 2);

  return [
    `M${x + tl},${y}`,
    `H${x + w - tr}`,
    tr ? `A${tr},${tr} 0 0 1 ${x + w},${y + tr}` : "",
    `V${y + h - br}`,
    br ? `A${br},${br} 0 0 1 ${x + w - br},${y + h}` : "",
    `H${x + bl}`,
    bl ? `A${bl},${bl} 0 0 1 ${x},${y + h - bl}` : "",
    `V${y + tl}`,
    tl ? `A${tl},${tl} 0 0 1 ${x + tl},${y}` : "",
    "Z",
  ]
    .filter(Boolean)
    .join(" ");
}

type TrailPoint = { x: number; y: number; alpha: number };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [clipPath, setClipPath] = useState<string>("none");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<TrailPoint[]>([]);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const last = lastPointRef.current;
    if (last) {
      const dist = Math.hypot(x - last.x, y - last.y);
      if (dist < TRAIL_MIN_DIST) return;
    }
    lastPointRef.current = { x, y };
    trailRef.current.push({ x, y, alpha: 1 });
  }

  const measure = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const sectionRect = section.getBoundingClientRect();

    const lines: (HTMLElement | null)[] = [
      headingRef.current,
      taglineRef.current,
      ctaRef.current,
    ];
    const holes = lines
      .map((el, i) => (el ? { el, radii: HOLE_RADII[i] } : null))
      .filter((entry): entry is { el: HTMLElement; radii: typeof HOLE_RADII[number] } => entry !== null)
      .map(({ el, radii }) => {
        const r = el.getBoundingClientRect();
        return roundedRectPath(
          r.left - sectionRect.left - LINE_PADDING,
          r.top - sectionRect.top - LINE_PADDING,
          r.width + LINE_PADDING * 2,
          r.height + LINE_PADDING * 2,
          radii
        );
      });

    if (!holes.length) return;

    const outer = `M0,0 H${sectionRect.width} V${sectionRect.height} H0 Z`;
    setClipPath(`path(evenodd, "${outer} ${holes.join(" ")}")`);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Trail render loop: paints a fading circle of the live video at each
  // recent cursor position. Circles decay in place (no re-tracking needed)
  // so the reveal naturally "heals" back to the marble as they fade out.
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!canvas || !section || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas || !section) return;
      const rect = section.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let raf: number;
    function draw() {
      if (!ctx || !canvas || !video) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const vw = video.videoWidth;
      const vh = video.videoHeight;
      if (vw && vh) {
        const scale = Math.max(canvas.width / vw, canvas.height / vh);
        const drawW = vw * scale;
        const drawH = vh * scale;
        const offsetX = (canvas.width - drawW) / 2;
        const offsetY = (canvas.height - drawH) / 2;

        trailRef.current = trailRef.current.filter((p) => p.alpha > 0.02);
        for (const point of trailRef.current) {
          ctx.save();
          ctx.globalAlpha = point.alpha;
          ctx.beginPath();
          ctx.arc(point.x, point.y, TRAIL_RADIUS, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(video, offsetX, offsetY, drawW, drawH);
          ctx.restore();
          point.alpha *= TRAIL_DECAY;
        }
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
    >
      {/*
        Firefly video sits behind the marble hero image. The marble has a
        permanent clip-path hole hugging each text line (measured from the
        actual DOM). A canvas layered above the marble paints a fading trail
        of the live video at recent cursor positions — each circle decays in
        place after being drawn, so the reveal slowly heals back to marble
        rather than snapping shut, without needing a fixed instantaneous
        cursor-follow mask.
      */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/firefly-poster.webp"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/firefly.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0" style={{ clipPath }}>
        <Image
          src="/hero-top.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Softens the hard cut into the next (dark) section below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />

      <nav className="absolute inset-x-0 top-0 z-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-6 text-xs uppercase tracking-[0.15em] text-white">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-glow-silver transition-opacity hover:opacity-70"
          >
            {link.label}
          </a>
        ))}
        <a
          href={NAV_CTA.href}
          className="text-glow-silver border border-white/70 bg-white/5 px-4 py-1.5 tracking-[0.15em] transition-colors hover:bg-white hover:text-charcoal"
        >
          {NAV_CTA.label}
        </a>
      </nav>

      <motion.h1
        ref={headingRef}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onAnimationComplete={measure}
        className="text-glow-gold relative z-10 mt-8 font-serif uppercase tracking-[0.15em] text-[clamp(2rem,5vw,4rem)] leading-[1.05] text-[#FFD700]"
      >
        {hero.wordmark}
      </motion.h1>

      {/* R3F HERO CENTERPIECE — v2: hand holding a small classical temple, rendered with react-three-fiber, goes here */}

      <motion.p
        ref={taglineRef}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        onAnimationComplete={measure}
        className="text-glow-gold relative z-10 mt-8 max-w-md text-xl font-medium text-white/80"
      >
        {hero.tagline}
      </motion.p>

      <motion.a
        ref={ctaRef}
        href={hero.ctaHref}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        onAnimationComplete={measure}
        className="text-glow-gold relative z-10 mt-8 inline-block border border-white px-8 py-3 text-sm uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-charcoal"
      >
        {hero.ctaLabel}
      </motion.a>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="h-10 w-px bg-white" />
        <span className="text-glow-gold text-[10px] uppercase tracking-[0.2em] text-white">
          Scroll
        </span>
      </div>
    </section>
  );
}
