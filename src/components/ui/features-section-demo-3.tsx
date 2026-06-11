"use client";

import { motion } from "motion/react";
import * as React from "react";

import { Terminal } from "@/components/sections/terminal";
import type { TechCategory } from "@/lib/data/tech-stack";
import { cn } from "@/lib/utils";

const BENTO_LAYOUT_BY_NAME: Record<string, string> = {
  Languages: "lg:col-span-4",
  Frontend: "lg:col-span-2",
  Backend: "lg:col-span-3",
  Databases: "lg:col-span-3",
  "Cloud & DevOps": "lg:col-span-4",
  "Tooling & Auth": "lg:col-span-2",
};

type FeaturesSectionDemo3Props = {
  features: TechCategory[];
};

type SkillInsight = {
  snippet: string;
  fact: string;
};

const SKILL_INSIGHTS: Record<string, SkillInsight> = {
  TypeScript: {
    snippet: "type ApiResponse<T> = { data: T; error?: string };",
    fact: "TypeScript shipped in 2012 and still compiles down to plain JavaScript.",
  },
  JavaScript: {
    snippet: "const total = items.reduce((sum, item) => sum + item.price, 0);",
    fact: "JavaScript was created in 10 days and now runs from browsers to edge runtimes.",
  },
  HTML: {
    snippet: "<main><section aria-label='work'>...</section></main>",
    fact: "Semantic HTML improves accessibility and SEO before any framework code.",
  },
  CSS: {
    snippet: ".card { backdrop-filter: blur(14px); border-radius: 1.5rem; }",
    fact: "Modern CSS has container queries, logical properties, and nested rules.",
  },
  SQL: {
    snippet:
      "SELECT id, email FROM users WHERE active = true ORDER BY created_at DESC;",
    fact: "SQL has been around since the 1970s and is still core to production systems.",
  },
  Bash: {
    snippet: 'for file in src/*.ts; do echo "$file"; done',
    fact: "Bash is still one of the fastest ways to automate repetitive dev workflows.",
  },
  React: {
    snippet: "const [count, setCount] = useState(0);",
    fact: "React's component model made UI state composition predictable at scale.",
  },
  "Next.js": {
    snippet: "export const revalidate = 60;",
    fact: "Next.js combines SSR, SSG, and streaming in one routing system.",
  },
  TailwindCSS: {
    snippet:
      "<button className='rounded-xl px-4 py-2 bg-sky-300 text-slate-900' />",
    fact: "Tailwind v4 shifts more configuration into CSS-first primitives.",
  },
  "ShadCN UI": {
    snippet: "pnpm dlx shadcn@latest add button card badge",
    fact: "shadcn/ui gives you copy-paste components you fully own in your repo.",
  },
  "TanStack Query": {
    snippet: "useQuery({ queryKey: ['projects'], queryFn: fetchProjects })",
    fact: "Query key caching is what keeps refetches predictable across screens.",
  },
  "Node.js": {
    snippet: "const app = express(); app.listen(3000);",
    fact: "Node's event loop is why one process can handle many concurrent I/O tasks.",
  },
  Express: {
    snippet: "app.get('/health', (_req, res) => res.json({ ok: true }));",
    fact: "Express remains one of the most widely used minimalist web servers in JS.",
  },
  NestJS: {
    snippet: "@Controller('users') export class UsersController {}",
    fact: "NestJS borrows modular patterns from Angular for backend architecture.",
  },
  "REST APIs": {
    snippet: "GET /v1/projects/:id  -> 200 { id, name }",
    fact: "Clear resource naming and status codes are still the biggest API quality levers.",
  },
  WebSockets: {
    snippet: "socket.emit('project:update', payload);",
    fact: "WebSockets keep a persistent duplex connection for real-time features.",
  },
  PostgreSQL: {
    snippet: "CREATE INDEX idx_projects_status ON projects(status);",
    fact: "Postgres is often chosen for reliability, indexing depth, and SQL standards support.",
  },
  MongoDB: {
    snippet: "db.projects.find({ status: 'active' }).sort({ createdAt: -1 })",
    fact: "MongoDB's document model works well when schemas evolve rapidly.",
  },
  DynamoDB: {
    snippet: "PK = ORG#42, SK = PROJECT#9001",
    fact: "In DynamoDB, data modeling around access patterns is everything.",
  },
  Redis: {
    snippet: 'await redis.set("session:" + id, token, { EX: 3600 });',
    fact: "Redis is frequently used for caching, pub/sub, rate limiting, and queues.",
  },
  "Prisma ORM": {
    snippet: "await prisma.user.findMany({ where: { active: true } });",
    fact: "Prisma generates type-safe DB clients from your schema.",
  },
  "AWS (EC2, ECS, S3)": {
    snippet:
      "docker push <ecr-uri> && ecs update-service --force-new-deployment",
    fact: "ECS + ECR keeps container deploys straightforward for many web workloads.",
  },
  Docker: {
    snippet: "FROM node:20-alpine\nWORKDIR /app\nCOPY . .",
    fact: "Container parity between local and production cuts environment drift.",
  },
  "CI/CD": {
    snippet: "on: [push]\njobs: { test: { runs-on: ubuntu-latest } }",
    fact: "Fast pipelines with quality gates reduce hotfix pressure after release.",
  },
  "GitHub Actions": {
    snippet: "uses: actions/setup-node@v4\nwith: { node-version: 20 }",
    fact: "Reusable workflows keep org-wide automation consistent.",
  },
  "Load Balancers": {
    snippet: "target_group -> /healthz with 30s interval",
    fact: "Health checks and timeouts matter more than most people think.",
  },
  JWT: {
    snippet: "jwt.sign({ sub: user.id }, secret, { expiresIn: '15m' })",
    fact: "JWT payloads are readable, so only non-sensitive claims should go inside.",
  },
  "OAuth 2.0": {
    snippet: "GET /oauth/authorize?client_id=...&redirect_uri=...",
    fact: "PKCE is now standard for securing public client auth flows.",
  },
  "Passport.js": {
    snippet: "passport.use(new JwtStrategy(opts, verify));",
    fact: "Passport's strategy model lets you plug in multiple auth providers cleanly.",
  },
  BullMQ: {
    snippet: "await queue.add('send-email', payload, { attempts: 3 });",
    fact: "BullMQ job retries and backoff are useful for resilience under load.",
  },
  Sentry: {
    snippet: "Sentry.captureException(error);",
    fact: "Error grouping plus release tagging makes production debugging much faster.",
  },
  Git: {
    snippet: "git checkout -b feature/skill-hover-insights",
    fact: "Small, reviewable commits are usually the highest ROI team habit.",
  },
};

function getSkillInsight(skillName: string): SkillInsight {
  return (
    SKILL_INSIGHTS[skillName] ?? {
      snippet: `// ${skillName}\n// integrated in active delivery workflows`,
      fact: `${skillName} is part of the current shipping stack across client and lab builds.`,
    }
  );
}

type SkillBentoCardProps = {
  feature: TechCategory;
  index: number;
};

function SkillBentoCard({ feature, index }: SkillBentoCardProps) {
  const [selectedSkill, setSelectedSkill] = React.useState<string | null>(
    feature.items[0]?.name ?? null,
  );
  const [hoveredSkill, setHoveredSkill] = React.useState<string | null>(null);

  const activeSkill = hoveredSkill ?? selectedSkill;
  const activeInsight = activeSkill ? getSkillInsight(activeSkill) : null;

  return (
    <motion.div
      className={cn(
        "rise-in",
        BENTO_LAYOUT_BY_NAME[feature.name] ?? "lg:col-span-3",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        ease: [0.2, 0.9, 0.2, 1],
        delay: index * 0.06,
      }}
    >
      <Terminal
        title={feature.name}
        prompt={feature.terminalCommand}
        className="h-full transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="flex flex-wrap gap-2.5">
          {feature.items.map((item) => {
            const isActive = item.name === activeSkill;

            return (
              <button
                type="button"
                key={item.name}
                onMouseEnter={() => setHoveredSkill(item.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onFocus={() => setSelectedSkill(item.name)}
                onClick={() => setSelectedSkill(item.name)}
                className={cn(
                  "group/skill rounded-full border px-3 py-1 text-left text-[13px] font-semibold tracking-[0.01em] transition-all duration-220",
                  isActive
                    ? "border-[#9fd8ff]/70 bg-[linear-gradient(145deg,rgba(230,248,255,0.96),rgba(171,226,255,0.88))] text-[#0f3f61] shadow-[0_10px_22px_-14px_rgba(149,214,255,0.9)]"
                    : "border-[var(--terminal-border)] bg-[linear-gradient(140deg,rgba(133,216,255,0.2),rgba(255,176,141,0.14))] text-[var(--terminal-text)]/92 hover:border-[#9fd8ff]/60 hover:bg-[linear-gradient(140deg,rgba(180,230,255,0.3),rgba(255,202,170,0.18))] hover:text-[#e8f8ff]",
                )}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeSkill ?? "empty"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="mt-4 min-h-[8.25rem] rounded-2xl border border-[var(--terminal-border)]/80 bg-[linear-gradient(145deg,rgba(7,20,44,0.86),rgba(8,18,35,0.8))] p-3.5"
        >
          {activeSkill && activeInsight ? (
            <>
              <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.25em] text-[var(--terminal-text)]/55">
                <span>{activeSkill}</span>
                <span>Hover Insight</span>
              </div>
              <pre className="mt-2 overflow-x-auto rounded-xl border border-white/12 bg-[rgba(2,10,24,0.85)] px-3 py-2 text-[11px] leading-relaxed text-[#d9f4ff]">
                {activeInsight.snippet}
              </pre>
              <p className="mt-2 text-xs text-[var(--terminal-text)]/80">
                {activeInsight.fact}
              </p>
            </>
          ) : (
            <p className="pt-4 text-xs text-[var(--terminal-text)]/60">
              Hover any skill to preview a snippet or quick implementation fact.
            </p>
          )}
        </motion.div>
      </Terminal>
    </motion.div>
  );
}

function FeaturesSectionDemo3({ features }: FeaturesSectionDemo3Props) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-x-3 -inset-y-2 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(112,209,255,0.16),transparent_58%)]" />
      <div className="relative mt-10 grid grid-cols-1 gap-5 lg:grid-cols-6">
        {features.map((feature, index) => (
          <SkillBentoCard key={feature.name} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
}

export { FeaturesSectionDemo3 };
