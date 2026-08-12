"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Below-the-fold video: shows a poster until the section is ~200px from
 * entering the viewport, then starts loading/playing. Avoids spending
 * bandwidth on a video that may never be scrolled to, and keeps it out of
 * the critical initial-load path.
 */
export default function LazyVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload={shouldLoad ? "auto" : "none"}
      poster={poster}
      className={className}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
    </video>
  );
}
