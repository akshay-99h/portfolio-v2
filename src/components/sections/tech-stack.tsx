import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/data/projects";
import { CLIENT_CAPABILITY_GROUPS, STACK_GROUPS } from "@/lib/data/tech-stack";

/**
 * Built work that proves each capability, indexed against
 * CLIENT_CAPABILITY_GROUPS by position.
 */
const CAPABILITY_PROOF: string[][] = [
  ["Zen IMF", "Verve", "Garima Setu"],
  ["RakshaAI", "Akxost OS"],
  ["Supplier Catalog Cleaner", "Tool Selector"],
  ["Frost Runner", "akxost.com fleet"],
];

/**
 * Capabilities as a specification sheet: what the studio takes ownership
 * of (the spec), then the materials it is usually built with (the schedule).
 */
function TechStackSection() {
  const totalBuilds = PROJECTS.length;
  const liveBuilds = PROJECTS.filter((project) => project.link).length;

  return (
    <main className="px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-18">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Sheet header */}
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Spec. 01 — Capabilities</p>
          <p className="dim-label hidden sm:block">
            Outcomes first, tools second
          </p>
        </div>

        <div className="max-w-3xl pt-10 lg:pt-14">
          <h1 className="display-section">
            What a client can actually hand off.
          </h1>
          <div className="ruler-x mt-6 max-w-md" />
          <p className="section-copy mt-6 max-w-xl text-sm sm:text-base">
            Start with the outcome, not the tools. These are the areas where the
            studio takes direct ownership — from customer-facing products to the
            backend and operational systems behind them.
          </p>
        </div>

        {/* Sheet metrics */}
        <div className="mt-10 grid grid-cols-3 gap-x-6 border-y border-border py-5 sm:max-w-xl lg:mt-14">
          {[
            [String(totalBuilds).padStart(2, "0"), "Builds in the index"],
            [String(liveBuilds).padStart(2, "0"), "Live right now"],
            [
              String(CLIENT_CAPABILITY_GROUPS.length).padStart(2, "0"),
              "Areas of ownership",
            ],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="font-display text-2xl font-[550] tracking-[-0.02em] sm:text-3xl">
                {value}
              </p>
              <p className="dim-label mt-1 text-[0.6rem]">{label}</p>
            </div>
          ))}
        </div>

        {/* Specification rows */}
        <div className="mt-14 lg:mt-20">
          {CLIENT_CAPABILITY_GROUPS.map((group, index) => (
            <article
              key={group.name}
              className="group grid gap-x-10 gap-y-6 border-t border-border py-10 lg:grid-cols-[8rem_minmax(0,26rem)_1fr] lg:py-14"
            >
              <div>
                <p className="dim-label text-[color:var(--signal)]">
                  C.0{index + 1}
                </p>
                <p
                  aria-hidden="true"
                  className="mt-2 hidden font-display text-[3.4rem] leading-none font-[550] tracking-[-0.04em] text-foreground/12 transition-colors duration-500 group-hover:text-foreground/25 lg:block"
                >
                  0{index + 1}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  {group.name}
                </h2>
                <p className="mt-4 max-w-[44ch] text-sm leading-7 text-muted-foreground">
                  {group.summary}
                </p>
                <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="dim-label text-[0.6rem]">Drawn from</span>
                  {CAPABILITY_PROOF[index]?.map((proof) => (
                    <Link
                      key={proof}
                      href="/projects"
                      className="dim-label text-[0.6rem] text-foreground/75 underline decoration-border underline-offset-4 transition-colors hover:text-[color:var(--signal)]"
                    >
                      {proof}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="self-start lg:w-full lg:max-w-md lg:justify-self-end">
                <p className="dim-label border-b border-border pb-2.5 text-[0.6rem]">
                  In scope
                </p>
                <ul>
                  {group.examples.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-border/60 py-2.5"
                    >
                      <span className="dim-label">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/85">{item}</span>
                      <span
                        aria-hidden="true"
                        className="ml-auto size-[7px] shrink-0 self-center border border-[color:var(--signal)]/60 transition-colors duration-300 group-hover:bg-[color:var(--signal)]/70"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
          <div className="rule-x" />
        </div>

        {/* Schedule of materials */}
        <div className="pt-24 sm:pt-32">
          <div className="rule-x reg-tick" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
            <p className="section-kicker">Schedule A — Materials</p>
            <p className="dim-label hidden sm:block">
              Primary tools across delivery
            </p>
          </div>

          <p className="mt-10 max-w-xl text-sm leading-7 text-muted-foreground">
            If your team does care about the underlying stack, this is the
            schedule it is usually built from.
          </p>

          <div className="mt-10 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            {STACK_GROUPS.map((group, groupIndex) => (
              <section
                key={group.name}
                className="border-border px-0 py-6 sm:px-6 sm:odd:border-r sm:first:pl-0 sm:last:pr-0 lg:border-r lg:last:border-r-0"
              >
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <h3 className="dim-label text-foreground">{group.name}</h3>
                  <span className="dim-label text-[color:var(--signal)]">
                    A.{groupIndex + 1}
                  </span>
                </div>
                <ul>
                  {group.items.map((item, itemIndex) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-3 border-b border-border/60 py-2.5 text-sm text-foreground/85 last:border-b-0"
                    >
                      <span className="dim-label text-[0.6rem]">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        {/* Hand-off CTA */}
        <div className="pt-24 sm:pt-32">
          <div className="rule-x reg-tick" />
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8 pt-10">
            <h2 className="display-section max-w-xl">
              Hand it off. Get a product back.
            </h2>
            <div className="flex flex-wrap gap-3 pb-1">
              <Button asChild>
                <Link href="/contact">Start a brief</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">See the work</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { TechStackSection };
