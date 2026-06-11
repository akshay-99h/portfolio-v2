import type { Project } from "@/types/project";

export const PROJECTS: Project[] = [
  {
    slug: "vastutva",
    name: "Vastutva",
    group: "lifestyle",
    platform: "Android / iOS app",
    summary:
      "A mobile lifestyle product engagement covering app structure, user flows, and a release-ready mobile experience.",
    details:
      "Delivered as a mobile-first build with attention to core task completion, app architecture, and a product surface that stayed easy to use as features expanded.",
    stack: ["Android", "iOS", "Product Scope", "Mobile Delivery"],
    year: "2026",
  },
  {
    slug: "verve",
    name: "Verve",
    group: "lifestyle",
    platform: "Android / iOS app",
    summary:
      "A consumer mobile app built for quick repeat interactions and dependable everyday use.",
    details:
      "The work focused on streamlining the key action flow, shaping the supporting app logic, and keeping the release small enough to ship quickly.",
    stack: ["Android", "iOS", "Interaction Flows", "Mobile Systems"],
    year: "2026",
  },
  {
    slug: "relume",
    name: "Relume",
    group: "lifestyle",
    platform: "Android / iOS app",
    summary:
      "A lifestyle mobile product engagement centered on utility, retention, and clear action paths.",
    details:
      "Built as a compact product system with mobile-first decisions around task hierarchy, feature scope, and future iteration.",
    stack: ["Android", "iOS", "Mobile Product", "Iteration Planning"],
    year: "2026",
  },
  {
    slug: "zen-imf",
    name: "ZenIMF",
    group: "community",
    platform: "Web platform",
    summary:
      "A web platform engagement for a community initiative that needed a clear public presence and maintainable structure.",
    details:
      "The scope covered information architecture, implementation, deployment, and a content setup that non-technical stakeholders could keep current.",
    stack: ["Next.js", "Web Platform", "Content Systems", "Deployment"],
    year: "2026",
    link: {
      label: "zenimf.akxost.com",
      href: "https://zenimf.akxost.com",
    },
  },
  {
    slug: "carpool",
    name: "Carpool",
    group: "community",
    platform: "Web platform",
    summary:
      "A community web product built to support coordination, browsing, and straightforward contribution flows.",
    details:
      "Structured around direct actions, operational clarity, and a lightweight codebase that could evolve without a rewrite.",
    stack: ["Next.js", "Community Platform", "Operations", "Web Delivery"],
    year: "2026",
    link: {
      label: "carpool.akxost.com",
      href: "https://carpool.akxost.com",
    },
  },
  {
    slug: "garima-setu",
    name: "Garima Setu",
    group: "community",
    platform: "Public website",
    summary:
      "A public website for a community organization that needed to communicate its mission clearly and stay easy to maintain.",
    details:
      "Delivered with a focus on narrative clarity, accessible structure, and a publishing setup that supported ongoing updates.",
    stack: ["Website", "Content Strategy", "Community", "Accessibility"],
    year: "2026",
    link: {
      label: "garimasetu.org",
      href: "https://www.garimasetu.org/",
    },
  },
];

export const PROJECT_GROUPS = [
  {
    id: "lifestyle" as const,
    label: "Lifestyle",
    description: "Mobile product work for consumer-facing use cases",
  },
  {
    id: "community" as const,
    label: "Community",
    description: "Platforms and websites for public-facing organizations",
  },
] as const;
