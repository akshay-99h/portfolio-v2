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
  title: "Independent Full-Stack Developer",
  location: "New Delhi, India",
  experienceLevel: "Full-Stack Developer",
  summary:
    "I build web apps, mobile products, backend systems, and internal tools. Akxost is where I collect the products I have shipped, the systems I have maintained, and the way I approach building software that holds up in production.",
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
    "I have built and shipped software for lifestyle brands, community platforms, internal operations, and product experiments. Most of my work stays close to the build itself: shaping scope, writing the application code, shipping releases, and fixing what only shows up after launch.",
  highlights: [
    "Built greenfield products and rebuilt fragile codebases",
    "Shipped production APIs, app backends, dashboards, and internal workflows",
    "Handled deployment, cloud infrastructure, and runtime debugging",
    "Stayed with products after launch to iterate, simplify, and stabilize",
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
  availability: "Open to collaborations, side projects, and interesting builds",
  preferredWork: [
    "Collaborative web and mobile products",
    "Backend-heavy tools, automations, and internal systems",
    "Games, experiments, and technically interesting side projects",
  ],
  lastUpdated: "2026-02-17",
};
