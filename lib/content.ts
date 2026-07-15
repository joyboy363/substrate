// All copy and case-study data for the site lives here.
// Edit this file to update site content without touching component code.

export const site = {
  name: "SUBSTRATE STUDIO",
  tagline: "The layer your business runs on.",
  title: "Substrate Studio — The layer your business runs on.",
  description:
    "A web development and software studio building cinematic sites, internal tools, and automation for operators who care about craft.",
  contactEmail: "hello@substratestudio.com", // placeholder — Diego will update
  location: "Toronto — Worldwide.",
};

export const hero = {
  wordmark: site.name,
  tagline: site.tagline,
  ctaLabel: "Our work",
  ctaHref: "#work",
};

// Case studies are managed at /admin and stored in Vercel KV — see lib/kv.ts.

export type Discipline = {
  numeral: string;
  title: string;
  description: string;
};

export const disciplines: Discipline[] = [
  {
    numeral: "I",
    title: "Websites",
    description:
      "Cinematic marketing sites, product pages, and landing experiences.",
  },
  {
    numeral: "II",
    title: "Software",
    description:
      "Internal tools, dashboards, and custom applications built for how your business actually runs.",
  },
  {
    numeral: "III",
    title: "Automation",
    description:
      "AI-powered workflows, outreach systems, and back-office automation.",
  },
];

export type ProcessStep = {
  numeral: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    numeral: "I",
    title: "Discovery",
    description: "We learn the business, the operator, and the constraints.",
  },
  {
    numeral: "II",
    title: "Brief",
    description:
      "A written design and technical brief you approve before we build.",
  },
  {
    numeral: "III",
    title: "Build",
    description: "Rapid, iterative construction with previews at each stage.",
  },
  {
    numeral: "IV",
    title: "Ship",
    description: "Deployed, monitored, and handed off with documentation.",
  },
];

export const contact = {
  heading: "Start a project",
  copy: "We take on a small number of projects at a time. If you have something you'd like to build, tell us about it.",
  email: site.contactEmail,
};
