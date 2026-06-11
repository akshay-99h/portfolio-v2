import type {
  Basics,
  Community,
  Experience,
  Interests,
  PortfolioMeta,
  TechStack,
} from "@/types/resume";

export const BASICS: Basics = {
  name: "Akshay Prabhat Mishra",
  title: "Founder, Akxost Studio",
  location: "New Delhi, India",
  experienceLevel: "Agency Founder & Full-Stack Engineer",
  summary:
    "Akxost Studio is a product engineering agency for teams that need one partner to scope, build, launch, and improve digital products. The work spans product strategy, full-stack web and mobile development, backend systems, deployment, and post-launch iteration.",
  contact: {
    email: "akshayprabhatmishra@gmail.com",
    github: "https://github.com/akshay-99h",
    linkedin: "https://linkedin.com/in/akshay-99h",
    twitter: "https://twitter.com/akshay_99h",
  },
};

export const TECH_STACK: TechStack = {
  languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
  frontend: ["React", "Next.js", "TailwindCSS", "ShadCN UI", "TanStack Query"],
  backend: ["Node.js", "Express", "NestJS"],
  databases: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis"],
  orms: ["Prisma"],
  cloud: [
    "AWS (EC2, ECS, S3, CloudFront, Route53)",
    "Azure (AI Studio, DevOps)",
  ],
  devops: ["Docker", "CI/CD pipelines", "Environment-based deployments"],
  realtimeAndQueues: ["WebSockets", "BullMQ", "Redis-backed job queues"],
  authenticationAndSecurity: [
    "JWT",
    "OAuth 2.0",
    "Session-based authentication",
    "Passport.js",
    "Role-based access control",
    "Basic Auth",
  ],
  observabilityAndQuality: [
    "Sentry",
    "Prometheus",
    "New Relic",
    "Structured logging",
    "Automated linting and type checks",
  ],
};

export const EXPERIENCE: Experience = {
  summary:
    "Built and shipped software for lifestyle brands, community platforms, and internal operations. Through Akxost Studio, I handle discovery, architecture, implementation, deployment, and the operational work required after launch.",
  highlights: [
    "Scoped greenfield builds and technical rebuilds for product teams",
    "Built and maintained production APIs, app backends, and admin workflows",
    "Shipped mobile and web products from first release through iteration",
    "Handled cloud infrastructure, deployment pipelines, and runtime stability",
  ],
};

export const COMMUNITY: Community = {
  involvement: ["Delhi Lead and Co-Organiser, Open Community of Developers"],
  activities: [
    "Organized developer meetups",
    "Hosted technical discussions and talks",
    "Participated as a speaker at community and industry events",
    "Mentored students and early-career developers informally",
  ],
};

export const INTERESTS: Interests = {
  technical: [
    "AI-assisted developer tools",
    "Simulation systems and serious games",
    "Distributed systems",
    "Developer experience and tooling",
  ],
  personal: [
    "Travel and road trips",
    "Operationally simple products",
    "Exploring complex systems by building them",
  ],
};

export const PORTFOLIO_META: PortfolioMeta = {
  availability: "Taking select client projects via Akxost Studio",
  preferredWork: [
    "Fractional product engineering partnerships",
    "MVP to production web and mobile delivery",
    "Backend-heavy systems that need reliable execution",
  ],
  lastUpdated: "2026-02-17",
};
