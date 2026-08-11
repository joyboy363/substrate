import Image from "next/image";
import Hero from "@/components/Hero";
import IntroOverlay from "@/components/IntroOverlay";
import Work from "@/components/Work";
import Software from "@/components/Software";
import WhatWeBuild from "@/components/WhatWeBuild";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <IntroOverlay />
      <Hero />

      {/*
        Sticky background video shared by Selected Work + Software Products.
        Pinned via `sticky` for their combined height, then releases
        naturally at the top/bottom edges once the wrapper scrolls out of
        view — extending this shared background to a new section just means
        adding it inside the same `-mt-[100vh]` wrapper below.
      */}
      <div className="relative">
        <div className="sticky top-0 -z-10 h-screen w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/hands-background.mp4" type="video/mp4" />
          </video>
          {/* Softens the hard cut coming down from the Hero section above */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
          {/* Softens the hard cut into the starfield section below */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
        </div>

        <div className="-mt-[100vh]">
          <Work />
          <Software />
        </div>
      </div>

      {/*
        What We Build + How We Work treated as one visual section, sharing a
        single starfield background behind both. Neither section's own
        size/padding changes — the image is just a shared backdrop sized to
        their combined natural height.
      */}
      <div className="relative">
        <Image
          src="/stars.jpg"
          alt=""
          fill
          className="pointer-events-none absolute inset-0 -z-10 object-cover"
        />
        {/* Softens the hard cut coming down from the Selected Work section above */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black to-transparent" />
        {/* Softens the hard cut into the Contact section below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-b from-transparent to-black" />
        <WhatWeBuild />
        <Process />
      </div>
      <Contact />
      <Footer />
    </main>
  );
}
