import type { Project } from "@/types/project";

/**
 * Preview palettes and headlines are lifted from each project's own
 * entry page and globals.css so the home-page plates render as
 * miniatures of the real product.
 */
export const PROJECTS: Project[] = [
  // --- Featured (first 8 surface on the home index) ------------------------
  {
    slug: "akxost-os",
    name: "Akxost OS",
    group: "product",
    platform: "Desktop app (Electron)",
    summary:
      "An AI-native conversational operating surface for planning, learning, and execution — chat-first, with a built-in editor.",
    details:
      "Electron + React desktop build with multi-provider AI (Anthropic, OpenAI, xAI, Ollama), a Monaco editor surface, and a three-pane workspace: navigation, chat thread, and live context panel.",
    stack: ["Electron", "React", "AI SDK", "Monaco"],
    year: "2026",
    preview: {
      frame: "desktop",
      bg: "#061019",
      fg: "#dbe7f5",
      accent: "#f97316",
      muted: "#8ba3bf",
      font: "sans",
      headline: "Chat-first operating surface for planning and execution.",
    },
  },
  {
    slug: "tool-selector",
    name: "Tool Selector",
    group: "product",
    platform: "Web platform",
    summary:
      "A roadmap generator for developers evolving their stack — deterministic recommendations across seven delivery stages.",
    details:
      "Next.js 16 platform with Clerk auth and Drizzle/Postgres. Intake answers produce a staged roadmap: Requirements, Design, Verify, Develop, Pipeline, Deploy, Observe.",
    stack: ["Next.js", "Drizzle", "PostgreSQL", "Clerk"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#171a23",
      fg: "#eef0f4",
      accent: "#818cf8",
      muted: "#3a4054",
      font: "sans",
      headline: "The roadmap generator for developers evolving their stack.",
    },
  },
  {
    slug: "supplier-catalog-cleaner",
    name: "Catalog Cleaner",
    group: "product",
    platform: "SaaS web app",
    summary:
      "Turns messy supplier CSV/XLSX catalogs into clean, Shopify-ready import projects with mapping and validation.",
    details:
      "Production SaaS on Cloudflare via OpenNext: Clerk auth and billing, Prisma with Neon Postgres, R2 file storage, and an upload → map → validate → export pipeline.",
    stack: ["Next.js", "Prisma", "Cloudflare", "Clerk"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#fbfaf3",
      fg: "#132028",
      accent: "#14584c",
      muted: "#dde7df",
      font: "sans",
      headline: "Turn messy supplier catalogs into clean import projects.",
    },
  },
  {
    slug: "big-buck-real-estates",
    name: "Big Buck",
    group: "product",
    platform: "Web product",
    summary:
      "AI-assisted broker follow-up and listing operations for small Indian real-estate brokers.",
    details:
      "Lead inbox, follow-up automation, and listing rewrites in one operational surface — built so a broker converts more rental enquiries without hiring another salesperson.",
    stack: ["Next.js", "React", "AI Workflows", "Operations"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#f6f0e4",
      fg: "#182014",
      accent: "#315c39",
      muted: "#c5d86d",
      font: "serif",
      headline:
        "Convert more rental enquiries without hiring another salesperson.",
    },
  },
  {
    slug: "vastutva",
    name: "Vastutva",
    group: "lifestyle",
    platform: "Android / iOS app",
    summary:
      "A Vastu Shastra compass and floor-plan analysis app with live heading detection and zone insights.",
    details:
      "Expo build around the device magnetometer: a tactile compass dial, floor-plan grid overlays (3×3 to 9×9), zone insight cards, and room guides — wrapped in a warm temple-earth visual language.",
    stack: ["Expo", "React Native", "Sensors", "SQLite"],
    year: "2026",
    preview: {
      frame: "phone",
      bg: "#f6e2bf",
      fg: "#2a160d",
      accent: "#d97909",
      muted: "#8b694c",
      font: "serif",
      headline:
        "Vastu compass and floor-plan analysis, with live zone insights.",
    },
  },
  {
    slug: "chrono-explorers",
    name: "Chrono Explorers",
    group: "product",
    platform: "Web game",
    summary:
      "An educational game where children repair Math Planet by solving playful puzzles across time-broken worlds.",
    details:
      "Next.js + Three.js game with GSAP-driven scenes, Zustand state, and Dexie local saves — narrative-led math practice with Mira the Guide unlocking each time bridge.",
    stack: ["Next.js", "Three.js", "GSAP", "Dexie"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#eaf9ff",
      fg: "#2d2a5f",
      accent: "#ff6b6b",
      muted: "#ffc857",
      font: "rounded",
      headline: "Repair Math Planet by solving playful puzzles.",
    },
  },
  {
    slug: "verve",
    name: "Verve",
    group: "lifestyle",
    platform: "iOS / Android + Web",
    summary:
      "Conversational prompts for the moment right before you send — sharper openers, stronger replies, lighter small talk.",
    details:
      "Expo app with a full Next.js web counterpart: auth, saved libraries, auto-rotating prompt decks, and an editorial warm-paper interface built for fast trust.",
    stack: ["Expo", "Next.js", "PostgreSQL", "GSAP"],
    year: "2025",
    preview: {
      frame: "phone",
      bg: "#f5efe8",
      fg: "#2f1f15",
      accent: "#c56648",
      muted: "#dbb895",
      font: "sans",
      headline: "Better words for better timing.",
    },
  },
  {
    slug: "routine-forge",
    name: "Routine Forge",
    group: "product",
    platform: "macOS app",
    summary:
      "A macOS-first SwiftUI app for building a daily coding-by-hand habit, with language-aware AI planning.",
    details:
      "Native Swift 6 build on SwiftData: onboarding, daily routine view, and workflow automation — package-based architecture, no web shell anywhere.",
    stack: ["Swift 6", "SwiftUI", "SwiftData", "macOS"],
    year: "2026",
    preview: {
      frame: "note",
      bg: "#f4f4f6",
      fg: "#1c1c1e",
      accent: "#0a84ff",
      muted: "#8e8e93",
      font: "sans",
      headline:
        "A daily coding-by-hand habit, planned by language-aware AI. Native SwiftUI — drawn here as a spec, not a screen.",
    },
  },

  // --- Full index -----------------------------------------------------------
  {
    slug: "voxa",
    name: "Voxa",
    group: "lifestyle",
    platform: "iOS / Android + Web",
    summary:
      "Dating-profile prompts, Hinge and Bumble answers, and Instagram caption ideas in one browsable library.",
    details:
      "Expo app with a matching Next.js web build — captions, bios, and hook ideas with saved collections, sharing one product structure across mobile and web.",
    stack: ["Expo", "Next.js", "TypeScript", "PWA"],
    year: "2025",
    preview: {
      frame: "phone",
      bg: "#fffdf8",
      fg: "#102126",
      accent: "#f06b4f",
      muted: "#0f5c63",
      font: "sans",
      headline: "Sharper lines for better profiles and stronger captions.",
    },
  },
  {
    slug: "relume",
    name: "Relume",
    group: "lifestyle",
    platform: "iOS / Android + Web",
    summary:
      "Relationship-repair prompts and rituals for long-term couples rebuilding warmth and connection.",
    details:
      "Spark prompts, repair scripts, and rituals filtered by situation — an intimate plum-and-rose product carried identically across Expo mobile and Next.js web.",
    stack: ["Expo", "Next.js", "TypeScript", "Content Systems"],
    year: "2025",
    preview: {
      frame: "phone",
      bg: "#fff9f6",
      fg: "#2a171c",
      accent: "#b75f75",
      muted: "#5d2f3d",
      font: "sans",
      headline: "Words for repair, warmth, and coming back together.",
    },
  },
  {
    slug: "flair",
    name: "Flair",
    group: "lifestyle",
    platform: "iOS / Android + Web",
    summary:
      "Friend-making conversation starters, social charm lines, and public-speaking hooks.",
    details:
      "A directory product for better first impressions — browse, save what fits your style, and keep the same structure on mobile and web.",
    stack: ["Expo", "Next.js", "TypeScript", "Design System"],
    year: "2025",
    preview: {
      frame: "phone",
      bg: "#fcf8f1",
      fg: "#1b2530",
      accent: "#b56a2e",
      muted: "#1e3957",
      font: "sans",
      headline: "Better first impressions for rooms, friendships, and stages.",
    },
  },
  {
    slug: "v-day-2026",
    name: "Valentine Week",
    group: "lifestyle",
    platform: "Web experience",
    summary:
      "A gentle, playful Valentine's ask unfolding across seven days — rose to promise to the question itself.",
    details:
      "Date-aware day-by-day reveals, a breathing pause animation, comfort slider, and soft confetti on yes — GSAP and canvas built to feel calm, never pushy.",
    stack: ["Next.js", "GSAP", "Canvas", "Tailwind"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#fff7f7",
      fg: "#3a2b2f",
      accent: "#d77f8f",
      muted: "#f6e1e6",
      font: "serif",
      headline: "A few quiet moments, spread across a week.",
    },
  },
  {
    slug: "zen-imf",
    name: "ZenIMF",
    group: "product",
    platform: "Web platform",
    summary:
      "An insurance, mutual-fund, and loan comparison destination — seventeen product lines reviewed in one place.",
    details:
      "Next.js 16 marketing and comparison platform with a deep-blue hero, pastel product tiles with hover-reveal detail, and a structure stakeholders can keep current.",
    stack: ["Next.js", "Tailwind v4", "shadcn", "Playwright"],
    year: "2026",
    link: {
      label: "zenimf.akxost.com",
      href: "https://zenimf.akxost.com",
    },
    preview: {
      frame: "browser",
      bg: "#f4f7fb",
      fg: "#16253f",
      accent: "#1f65d6",
      muted: "#f8eed6",
      font: "sans",
      headline:
        "Compare insurance, loans, mutual funds, and investments in one place.",
    },
  },
  {
    slug: "carpool",
    name: "Carpool PG2",
    group: "community",
    platform: "Web platform",
    summary:
      "A mobile-first carpool platform for Panchsheel Greens 2 residents — rides without the WhatsApp clutter.",
    details:
      "Monorepo with a Next.js PWA and Expo scaffold: daily and one-time rides, instant seat requests, OTP and Google sign-in, Prisma on Postgres underneath.",
    stack: ["Next.js", "Prisma", "PWA", "Expo"],
    year: "2025",
    link: {
      label: "carpool.akxost.com",
      href: "https://carpool.akxost.com",
    },
    preview: {
      frame: "browser",
      bg: "#f7f9fb",
      fg: "#1d2e24",
      accent: "#216941",
      muted: "#d4dce4",
      font: "sans",
      headline: "Shared rides, designed for everyday PG2 commuting.",
    },
  },
  {
    slug: "garima-setu",
    name: "Garima Setu",
    group: "community",
    platform: "Public website",
    summary:
      "The public site for a non-profit trust supporting domestic workers through verification, training, and ethical placement.",
    details:
      "A dignity-first narrative: verify → train → support pathways, program showcases, and a trust-process explainer kept easy for non-technical stakeholders to update.",
    stack: ["Website", "Content Strategy", "Accessibility", "Community"],
    year: "2026",
    link: {
      label: "garimasetu.org",
      href: "https://www.garimasetu.org/",
    },
    preview: {
      frame: "browser",
      bg: "#fafaf8",
      fg: "#1c1c1a",
      accent: "#0f766e",
      muted: "#e4e2dc",
      font: "sans",
      headline:
        "Trusted domestic workforce support with dignity at the center.",
    },
  },
];

export const PROJECT_GROUPS = [
  {
    id: "product" as const,
    label: "Products & Tools",
    description: "SaaS, developer tooling, and operational product systems",
  },
  {
    id: "lifestyle" as const,
    label: "Lifestyle",
    description: "Consumer apps and experiences across mobile and web",
  },
  {
    id: "community" as const,
    label: "Community",
    description: "Platforms and websites for public-facing organizations",
  },
] as const;
