import type { Project } from "@/types/project";

/**
 * Preview palettes, headlines, and start-page chrome (wordmark, kicker,
 * CTAs) are lifted from each project's own entry page and globals.css so
 * the home-page plates render as miniatures of the real product.
 */
export const PROJECTS: Project[] = [
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
      brand: "Akxost OS",
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
      brand: "Tool Selector",
      kicker: "Seven delivery stages",
      sub: "Answer the intake, get a staged roadmap from Requirements through Observe.",
      cta: "Generate roadmap",
      cta2: "View stages",
      art: "card",
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
      brand: "Catalog Cleaner",
      kicker: "CSV/XLSX → Shopify",
      sub: "Upload, map, validate, export — with billing and projects built in.",
      cta: "Upload catalog",
      cta2: "See pipeline",
      art: "card",
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
    link: {
      label: "verve.akxost.com",
      href: "https://verve.akxost.com",
    },
    preview: {
      frame: "phone",
      bg: "#f5efe8",
      fg: "#2f1f15",
      accent: "#c56648",
      muted: "#dbb895",
      font: "sans",
      headline: "Better words for better timing.",
      brand: "Verve",
      sub: "Built for the moment right before you send — sharper openers, stronger replies.",
      cta: "Create account",
      cta2: "Sign in",
      chips: ["Replies", "Openers", "Topics", "Saved"],
      art: "device",
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
    link: {
      label: "voxa.akxost.com",
      href: "https://voxa.akxost.com",
    },
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
    link: {
      label: "relume.akxost.com",
      href: "https://relume.akxost.com",
    },
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
    link: {
      label: "flair.akxost.com",
      href: "https://flair.akxost.com",
    },
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
    link: {
      label: "be-my-valentine.akxost.com",
      href: "https://be-my-valentine.akxost.com",
    },
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
      brand: "Zen IMF",
      kicker: "Insurance + Loans + Mutual Funds",
      sub: "Health, term, motor, travel, home, SIP, and loan options from one destination.",
      cta: "Talk to Expert",
      cta2: "Explore cover",
      art: "carousel",
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
      brand: "Garima Setu Foundation",
      sub: "Worker verification, practical training, awareness, and ethical placement support.",
      cta: "Register / Enquire",
      cta2: "Explore Trust",
      art: "focus",
    },
  },
  {
    slug: "raksha-ai",
    name: "RakshaAI",
    group: "product",
    platform: "Web platform + voice",
    summary:
      "An AI assistant that walks Indian citizens through government services and legal questions — multilingual, voice-first, privacy-first.",
    details:
      "FastAPI + React build with Claude-powered agents for intent, official .gov.in source verification, workflow timelines, and scam detection. Inline Whisper/TTS voice conversation, OCR document analysis, and a strict no-Aadhaar/PAN/OTP data policy.",
    stack: ["FastAPI", "React", "Claude", "Whisper"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#f4f6fb",
      fg: "#1a2238",
      accent: "#6d28d9",
      muted: "#dde3f0",
      font: "sans",
      headline:
        "Step-by-step government services guidance from official sources only.",
      brand: "RakshaAI",
      kicker: "Privacy-first · Official sources only",
      sub: "Describe your need in text or voice — get a verified mission timeline.",
      cta: "Start a mission",
      art: "chat",
    },
  },

  // --- Minigames (Snowflake game buildathon) --------------------------------
  {
    slug: "frost-runner",
    name: "Frost Runner",
    group: "minigames",
    platform: "Web game",
    summary:
      "An infinite runner with tight jump timing, coyote time, and difficulty that adapts to your own run history.",
    details:
      "Deterministic physics with jump buffering, config-driven obstacle and shard spawning, and segment-based personalization — run telemetry feeds a Snowflake-backed difficulty endpoint that retunes speed and spawn cadence.",
    stack: ["Next.js", "Canvas", "Snowflake", "Telemetry"],
    year: "2026",
    link: {
      label: "frost-runner.akxost.com",
      href: "https://frost-runner.akxost.com",
    },
    preview: {
      frame: "browser",
      bg: "#0b1622",
      fg: "#e6f1fb",
      accent: "#5ad1ff",
      muted: "#27405a",
      font: "mono",
      headline: "Ready to sprint",
      brand: "Frost Runner Neo",
      sub: "Tap arena or press Enter · Space/Up jump, P pause",
      cta: "Start Run",
      chips: ["DIST 0m", "SCORE 0", "SHARDS 0", "SPEED ×1"],
      art: "arena",
    },
  },
  {
    slug: "tap-to-thaw",
    name: "Tap-to-Thaw",
    group: "minigames",
    platform: "Web game",
    summary:
      "A rotatable 3D arrow-block puzzle: read the occlusion, then eject blocks in the only order that frees them.",
    details:
      "Seeded 3×3×3 shell puzzles where each block can only leave along its arrow if the lane is clear — combo scoring rewards deliberate sequencing over fast clicking.",
    stack: ["Next.js", "Three.js", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#0e1a26",
      fg: "#e8f3fa",
      accent: "#7dd3fc",
      muted: "#2c4658",
      font: "mono",
      headline: "Inspect, orient, eject — spatial judgment over tap speed.",
    },
  },
  {
    slug: "snow-heist",
    name: "Snow Heist",
    group: "minigames",
    platform: "Web game",
    summary:
      "A branching heist where every choice moves risk, stealth, and tempo — beat the clock without tripping detection.",
    details:
      "A transparent narrative-plus-stat engine: weighted score per choice, clamped stat updates, timer pressure, and dead-end routes, with lifetime run analytics across sessions.",
    stack: ["Next.js", "State Machines", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#101321",
      fg: "#e9ecf6",
      accent: "#a5b4fc",
      muted: "#2c3150",
      font: "mono",
      headline: "Spend stealth to buy tempo — just stay under detection.",
    },
  },
  {
    slug: "avalanche-defense",
    name: "Avalanche Defense",
    group: "minigames",
    platform: "Web game",
    summary:
      "Lane-based tower defense on a 5×8 grid — place cannons, frost, and rails between waves, then watch the board hold.",
    details:
      "A prep-and-execute loop with three tuned tower archetypes, pulse-staggered spawns, escalating leak damage, and a width-versus-depth economy through tiered grid upgrades.",
    stack: ["Next.js", "Simulation", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#0d1726",
      fg: "#e4eefb",
      accent: "#60a5fa",
      muted: "#243a55",
      font: "mono",
      headline:
        "Cannons stabilize, frost controls tempo, rails punish clusters.",
    },
  },
  {
    slug: "blizzard-market",
    name: "Blizzard Market",
    group: "minigames",
    platform: "Web game",
    summary:
      "A turn-based trading sandbox: four commodities, dynamic volatility, and a prediction streak that pays for conviction.",
    details:
      "Stochastic price generation with per-commodity sensitivity, marked-to-market net worth, directional prediction streaks, randomized session quests, and behavioral telemetry on trade-side flips.",
    stack: ["Next.js", "Simulation", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#0c141f",
      fg: "#e7eef7",
      accent: "#34d399",
      muted: "#22364a",
      font: "mono",
      headline: "Manage exposure under uncertainty, not one memorized pattern.",
    },
  },
  {
    slug: "puzzle-drift",
    name: "Puzzle Drift",
    group: "minigames",
    platform: "Web game",
    summary:
      "A 60-second arcade racer where clean drifts and quick arithmetic both fund the nitro you need to keep momentum.",
    details:
      "Sine-generated track curvature, context-sensitive drift events, timed sequence challenges with answer-keyed rewards, and traffic hazards that compound mistakes in dense segments.",
    stack: ["Next.js", "Canvas", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#131022",
      fg: "#ece9f8",
      accent: "#f472b6",
      muted: "#322b52",
      font: "mono",
      headline: "Solve fast, drift clean, convert it all into distance.",
    },
  },
  {
    slug: "ice-climber-clicker",
    name: "Ice Climber Clicker",
    group: "minigames",
    platform: "Web game",
    summary:
      "Drive a mining rig up procedural slopes — mine, invest, survive, then prestige-reset for compounding power.",
    details:
      "Physics-based traversal over layered-sine terrain with fuel and hull integrity, active mining plus idle miner economy, shaft cooldown routing, and altitude-gated prestige resets.",
    stack: ["Next.js", "Canvas", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#0b1a24",
      fg: "#e5f2f8",
      accent: "#fbbf24",
      muted: "#23404f",
      font: "mono",
      headline:
        "Drive, mine, invest, survive — then prestige and climb higher.",
    },
  },
  {
    slug: "squad-rescue-relay",
    name: "Squad Rescue Relay",
    group: "minigames",
    platform: "Web game",
    summary:
      "A top-down rescue relay: carry eight civilians out of spreading fire before heat, hazards, or the clock end the run.",
    details:
      "Carry-state movement penalties, a heat meter with stun-and-drop failure events, once-per-carry bonus detours, and probabilistic fire spread that only fast rescue cadence can contain.",
    stack: ["Next.js", "Canvas", "Snowflake", "Telemetry"],
    year: "2026",
    preview: {
      frame: "browser",
      bg: "#1a1210",
      fg: "#f6ebe4",
      accent: "#fb7185",
      muted: "#4a2e26",
      font: "mono",
      headline: "The fastest line is rarely the safest line.",
    },
  },
];

/**
 * The home-page "Selected work" index — the strongest cross-section of
 * the studio: flagship product work plus live, verifiable deployments.
 */
const FEATURED_SLUGS = [
  "akxost-os",
  "raksha-ai",
  "zen-imf",
  "supplier-catalog-cleaner",
  "frost-runner",
  "verve",
  "tool-selector",
  "garima-setu",
] as const;

export const FEATURED_PROJECTS: Project[] = FEATURED_SLUGS.map((slug) => {
  const project = PROJECTS.find((entry) => entry.slug === slug);
  if (!project) {
    throw new Error(`Featured project missing from index: ${slug}`);
  }
  return project;
});

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
  {
    id: "minigames" as const,
    label: "Minigames",
    description:
      "Telemetry-instrumented browser games from the Snowflake game buildathon",
  },
] as const;
