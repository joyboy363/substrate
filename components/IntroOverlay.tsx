"use client";

import { useEffect, useState } from "react";

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  function dismiss() {
    setFadingOut(true);
    setTimeout(() => setVisible(false), 700);
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-charcoal transition-opacity duration-700 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        autoPlay
        muted
        playsInline
        onEnded={dismiss}
        className="h-full w-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>
      <button
        onClick={dismiss}
        className="absolute bottom-8 right-8 z-10 text-xs uppercase tracking-[0.2em] text-white/70 underline underline-offset-4 hover:text-white"
      >
        Skip
      </button>
    </div>
  );
}
