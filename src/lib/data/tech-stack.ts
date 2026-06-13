export interface CapabilityGroup {
  name: string;
  summary: string;
  examples: string[];
}

export interface StackGroup {
  name: string;
  items: string[];
}

export interface TechCategoryItem {
  name: string;
}

export interface TechCategory {
  name: string;
  items: TechCategoryItem[];
  terminalCommand: string;
}

export const CLIENT_CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    name: "Customer-facing products",
    summary:
      "Web apps, mobile products, dashboards, portals, and content-backed platforms that need to feel credible and stay maintainable.",
    examples: [
      "Marketing sites with real product depth",
      "Client or member portals",
      "Dashboards and admin panels",
      "Mobile-first product surfaces",
    ],
  },
  {
    name: "Backend and product systems",
    summary:
      "The logic behind the interface: APIs, auth, integrations, automation, queues, notifications, and the structure required to support growth.",
    examples: [
      "APIs and service layers",
      "Authentication and permissions",
      "Third-party integrations",
      "Background jobs and operational flows",
    ],
  },
  {
    name: "Internal tools and workflow software",
    summary:
      "Systems that replace manual coordination, spreadsheets, and patchwork processes for teams that need better operational control.",
    examples: [
      "Approval and review workflows",
      "Ops dashboards",
      "Content and data management tools",
      "Automation for repetitive team tasks",
    ],
  },
  {
    name: "Launch, delivery, and reliability",
    summary:
      "The release side of the work so the product can go live cleanly and remain stable after launch.",
    examples: [
      "Deployment setup",
      "Environment and release flow",
      "Monitoring and error tracking",
      "Post-launch iteration support",
    ],
  },
] as const;

export const STACK_GROUPS: StackGroup[] = [
  {
    name: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "ShadCN UI", "TanStack Query"],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express", "NestJS", "REST APIs", "WebSockets"],
  },
  {
    name: "Data",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Prisma ORM"],
  },
  {
    name: "Infrastructure",
    items: ["AWS", "Docker", "CI/CD", "GitHub Actions", "Sentry"],
  },
] as const;
