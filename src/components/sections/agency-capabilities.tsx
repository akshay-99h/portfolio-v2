"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const OFFER_AREAS = [
  {
    title: "Launch a new product",
    summary:
      "For founders and teams that need a web app, mobile app, or platform shipped without spending months coordinating separate strategy, design, and engineering vendors.",
    deliverables: [
      "Product scope and release plan",
      "Web or mobile build",
      "Launch-ready infrastructure",
    ],
  },
  {
    title: "Stabilize a messy product",
    summary:
      "For teams with something already live but difficult to extend, difficult to trust, or increasingly expensive to maintain.",
    deliverables: [
      "Codebase cleanup and restructuring",
      "Feature delivery without re-platforming",
      "Improved reliability and release flow",
    ],
  },
  {
    title: "Build internal tools and workflows",
    summary:
      "For operations-heavy teams that are still running key processes through spreadsheets, inboxes, or fragile manual workarounds.",
    deliverables: [
      "Internal dashboards and panels",
      "Workflow automation",
      "Role-based access and approvals",
    ],
  },
  {
    title: "Add systems behind the product",
    summary:
      "For teams that need the layer under the interface to work properly: APIs, admin tooling, integrations, queues, auth, and operational support.",
    deliverables: [
      "Backend services and APIs",
      "Integrations and automation",
      "Monitoring and deployment support",
    ],
  },
] as const;

const ENGAGEMENT_POINTS = [
  "Direct technical ownership from scope through launch",
  "Clear communication with fewer handoffs",
  "A small senior-led delivery surface, not a bloated agency chain",
] as const;

function DeviceShowcase() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] [perspective:1600px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_44%_42%,rgba(29,169,163,0.18),transparent_48%),linear-gradient(180deg,rgba(29,169,163,0.05),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle,_currentColor_1px,_transparent_1px)] [background-size:22px_22px] text-[color:var(--chart-1)]" />

      <div className="pointer-events-none absolute left-[8%] top-[14%] h-16 w-16 rotate-6 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(29,169,163,0.12),rgba(29,169,163,0.03))] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
      <div className="pointer-events-none absolute right-[10%] top-[22%] h-20 w-20 -rotate-6 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(29,169,163,0.09),rgba(29,169,163,0.02))] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
      <div className="pointer-events-none absolute left-[12%] bottom-[12%] h-14 w-14 rotate-12 rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,rgba(29,169,163,0.08),rgba(29,169,163,0.02))] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />

      <motion.div
        className="absolute left-[10%] top-[16%] z-10 w-[68%]"
        initial={reduceMotion ? false : { opacity: 0, y: 18, rotateX: 8 }}
        whileInView={
          reduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }
        }
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: reduceMotion ? 0 : 0.42,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div className="relative aspect-[1.45/1] p-5 [transform:rotateX(9deg)_rotateY(-14deg)_rotateZ(-1.5deg)]">
          <div className="absolute inset-0 rounded-[2.1rem] border border-white/8 bg-[#071311]/92 shadow-[0_40px_120px_rgba(0,0,0,0.35)] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
          <div className="absolute inset-0 rounded-[2.1rem] bg-[linear-gradient(135deg,rgba(29,169,163,0.2),transparent_34%,transparent_70%,rgba(29,169,163,0.08))] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
          <div className="absolute inset-0 rounded-[2.1rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
          <div className="relative flex h-full flex-col rounded-[1.55rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-5 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="mt-2 text-lg font-semibold tracking-tight text-white/92">
                  Product control with system visibility.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-2.5 w-2.5 rounded-full bg-[color:var(--chart-1)]/70"
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 grid flex-1 grid-cols-[1.15fr_0.85fr] gap-4">
              <div className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(29,169,163,0.16),rgba(29,169,163,0.04))] p-4 [clip-path:polygon(18%_0%,82%_0%,100%_18%,100%_82%,82%_100%,18%_100%,0_82%,0_18%)]">
                <div className="grid gap-3">
                  <div className="h-20 rounded-[1rem] bg-white/[0.03]" />
                  <div className="grid grid-cols-3 gap-3">
                    <div className="h-14 rounded-[0.9rem] bg-white/[0.04] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                    <div className="h-14 rounded-[0.9rem] bg-white/[0.04] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                    <div className="h-14 rounded-[0.9rem] bg-white/[0.04] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                  </div>
                  <div className="h-24 rounded-[1rem] bg-white/[0.03] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]">
                  <div className="h-3 w-18 rounded-full bg-[color:var(--chart-1)]/70" />
                  <div className="mt-4 space-y-2">
                    <div className="h-2.5 rounded-full bg-white/[0.08]" />
                    <div className="h-2.5 w-[82%] rounded-full bg-white/[0.08]" />
                    <div className="h-2.5 w-[64%] rounded-full bg-white/[0.08]" />
                  </div>
                </div>
                <div className="rounded-[1.1rem] border border-white/8 bg-white/[0.03] p-4 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 rounded-[0.9rem] bg-[color:var(--chart-1)]/12 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                    <div className="h-16 rounded-[0.9rem] bg-white/[0.05] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[11%] top-[28%] z-20 w-[24%] min-w-[132px]"
        initial={reduceMotion ? false : { opacity: 0, y: 24, rotateY: -12 }}
        whileInView={
          reduceMotion ? undefined : { opacity: 1, y: 0, rotateY: 0 }
        }
        viewport={{ once: true, amount: 0.45 }}
        transition={{
          duration: reduceMotion ? 0 : 0.38,
          delay: reduceMotion ? 0 : 0.08,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div className="relative aspect-[0.58/1] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.34)] [transform:rotateX(5deg)_rotateY(18deg)_rotateZ(5deg)]">
          <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-[#091412]/95 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
          <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(29,169,163,0.18),transparent_34%,rgba(29,169,163,0.08))] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
          <div className="relative flex h-full flex-col rounded-[1.55rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-3 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]">
            <div className="mx-auto h-1.5 w-16 rounded-full bg-white/12" />
            <div className="mt-4 flex-1 rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(29,169,163,0.16),rgba(29,169,163,0.04))] p-3">
              <div className="h-20 rounded-[1rem] bg-white/[0.04]" />
              <div className="mt-3 space-y-2">
                <div className="h-2.5 rounded-full bg-white/[0.08]" />
                <div className="h-2.5 w-[78%] rounded-full bg-white/[0.08]" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-12 rounded-[0.9rem] bg-white/[0.05] [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
                <div className="h-12 rounded-[0.9rem] bg-[color:var(--chart-1)]/14 [clip-path:polygon(25%_6%,75%_6%,100%_50%,75%_94%,25%_94%,0_50%)]" />
              </div>
            </div>
            <div className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--chart-1)]">
              Mobile touchpoint
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-[8%] left-[10%] right-[10%] grid gap-4 border-t border-border/60 pt-5 sm:grid-cols-3">
        {[
          "Web product surface",
          "Mobile companion flows",
          "Shared systems underneath",
        ].map((item) => (
          <div
            key={item}
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function AgencyCapabilitiesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="space-y-10 pt-8 sm:space-y-14">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="section-kicker">Where Akxost Fits</p>
          <h2 className="mt-4 max-w-[14ch] text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            The studio is usually brought in for one of four situations.
          </h2>
          <p className="mt-6 max-w-[44ch] text-sm leading-7 text-muted-foreground sm:text-base">
            Each one needs product judgment, engineering depth, and a delivery
            structure that does not collapse under ambiguity.
          </p>
        </div>

        <motion.div
          className="relative overflow-hidden rounded-[2rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
          whileInView={
            reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.28 }}
          transition={{
            duration: reduceMotion ? 0 : 0.36,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <div className="grid gap-8 md:items-start md:grid-cols-[0.58fr_0.42fr]">
            <div className="relative h-[320px] overflow-hidden rounded-[2.2rem] md:h-[420px]">
              <DeviceShowcase />
            </div>

            <div className="space-y-6 px-1 py-3">
              <div className="max-w-[24rem]">
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Engagement model
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  Senior product engineering with direct ownership.
                </p>
              </div>

              <div className="space-y-4">
                {ENGAGEMENT_POINTS.map((point) => (
                  <div
                    key={point}
                    className="grid grid-cols-[auto_1fr] items-start gap-3"
                  >
                    <span className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[color:var(--chart-1)]" />
                    <p className="text-sm leading-7 text-muted-foreground">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
        {OFFER_AREAS.map((item, index) => (
          <motion.article
            key={item.title}
            className="relative px-1 py-2"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{
              duration: reduceMotion ? 0 : 0.32,
              delay: reduceMotion ? 0 : index * 0.05,
              ease: [0.23, 1, 0.32, 1],
            }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="max-w-[18ch] text-[1.45rem] font-semibold tracking-tight">
                {item.title}
              </h3>
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
                0{index + 1}
              </span>
            </div>

            <p className="mt-4 max-w-[42ch] text-sm leading-7 text-muted-foreground">
              {item.summary}
            </p>

            <ul className="mt-6 space-y-2.5">
              {item.deliverables.map((deliverable) => (
                <li
                  key={deliverable}
                  className="flex items-start gap-3 text-sm text-foreground/84"
                >
                  <span className="mt-[0.48rem] h-1.5 w-1.5 rounded-full bg-foreground/80" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export { AgencyCapabilitiesSection };
