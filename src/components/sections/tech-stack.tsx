import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CLIENT_CAPABILITY_GROUPS, STACK_GROUPS } from "@/lib/data/tech-stack";

/**
 * Capabilities as a specification sheet: what the studio takes ownership
 * of (the spec), then the materials it is usually built with (the schedule).
 */
function TechStackSection() {
  return (
    <main className="px-4 pt-28 pb-14 sm:px-6 sm:pt-36 sm:pb-18">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Sheet header */}
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Spec. 01 — Capabilities</p>
          <p className="dim-label hidden sm:block">
            Outcomes first, tools second
          </p>
        </div>

        <div className="max-w-3xl pt-12 lg:pt-16">
          <h1 className="display-section">
            What a client can actually hand off.
          </h1>
          <p className="section-copy mt-6 max-w-xl text-sm sm:text-base">
            Start with the outcome, not the tools. These are the areas where the
            studio takes direct ownership — from customer-facing products to the
            backend and operational systems behind them.
          </p>
        </div>

        {/* Specification rows */}
        <div className="mt-14 lg:mt-20">
          {CLIENT_CAPABILITY_GROUPS.map((group, index) => (
            <article
              key={group.name}
              className="grid gap-x-10 gap-y-6 border-t border-border py-10 lg:grid-cols-[5rem_minmax(0,26rem)_1fr] lg:py-12"
            >
              <p className="dim-label pt-1 text-[color:var(--signal)]">
                C.0{index + 1}
              </p>

              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  {group.name}
                </h2>
                <p className="mt-4 max-w-[44ch] text-sm leading-7 text-muted-foreground">
                  {group.summary}
                </p>
              </div>

              <ul className="self-start lg:max-w-md lg:justify-self-end lg:w-full">
                {group.examples.map((item, itemIndex) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 border-t border-border/60 py-2.5 first:border-t-0 first:pt-0"
                  >
                    <span className="dim-label">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-foreground/85">{item}</span>
                  </li>
                ))}
              </ul>
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

          <div className="mt-10 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_GROUPS.map((group, groupIndex) => (
              <section key={group.name}>
                <div className="flex items-baseline justify-between border-b border-border pb-3">
                  <h3 className="dim-label text-foreground">{group.name}</h3>
                  <span className="dim-label text-[color:var(--signal)]">
                    A.{groupIndex + 1}
                  </span>
                </div>
                <ul>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-b border-border/60 py-2.5 text-sm text-foreground/85"
                    >
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
              Hand it off. Get a drawing back.
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
