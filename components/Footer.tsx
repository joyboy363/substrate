import Image from "next/image";
import { site } from "@/lib/content";
import Fleuron from "./Fleuron";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grid grid-cols-1 items-center gap-8 border-t border-charcoal/10 bg-background px-6 py-16 text-center md:grid-cols-3 md:text-left">
      <Image
        src="/emblem.png"
        alt=""
        width={600}
        height={600}
        className="mx-auto h-40 w-40"
      />

      <div className="flex flex-col items-center gap-4 text-center">
        <p className="font-serif text-sm uppercase tracking-[0.15em]">
          {site.name}
        </p>
        <p className="text-sm text-charcoal/60">{site.location}</p>
        <Fleuron />
        <p className="text-xs text-charcoal/40">
          &copy; {year} Substrate Studio. All rights reserved.
        </p>
      </div>

      <div className="hidden md:block" />
    </footer>
  );
}
