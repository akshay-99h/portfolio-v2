"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";

gsap.registerPlugin(ScrollTrigger);

const STATIONS = [
  {
    id: "survey",
    numeral: "01",
    stage: "Survey",
    title: "Clarity before momentum.",
    note: "The work starts by making the scope, the user flow, and the release shape understandable — on paper, before anything is built.",
    outputs: ["Scope document", "Flow map", "Release shape"],
  },
  {
    id: "drawing",
    numeral: "02",
    stage: "Drawing",
    title: "One drawing, one team.",
    note: "Interface, systems, deployment, and post-launch support stay on the same sheet instead of being split across handoffs.",
    outputs: ["Interface system", "Architecture plan", "Data model"],
  },
  {
    id: "assembly",
    numeral: "03",
    stage: "Assembly",
    title: "Restraint over complexity.",
    note: "Small, senior-led execution. Fewer layers, fewer moving parts, and less noise around the real work of building.",
    outputs: ["Working software", "Weekly demos", "Honest status"],
  },
  {
    id: "handover",
    numeral: "04",
    stage: "Handover",
    title: "Built to survive contact.",
    note: "The product has to launch cleanly, hold up under change, and stay workable long after the first release.",
    outputs: ["Clean launch", "Documentation", "Support window"],
  },
] as const;

/**
 * The method drawn as a dimension line: four stations measured off
 * left to right, the way a drawing dimensions a span.
 */
function MethodSection() {
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The dimension line draws across, ticks land on it.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q("[data-method-dimension]")[0] ?? section,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "expo.out" },
      });
      tl.fromTo(
        q("[data-method-line]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2 },
        0,
      )
        .fromTo(
          q("[data-method-tick]"),
          { autoAlpha: 0, y: 4 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.09 },
          0.12,
        )
        .fromTo(
          q("[data-method-measure]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          0.5,
        );

      // Each station rises once as it enters.
      for (const station of q("[data-method-station]")) {
        gsap.fromTo(
          station.querySelectorAll("[data-method-reveal]"),
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.07,
            ease: "expo.out",
            scrollTrigger: {
              trigger: station,
              start: "top 82%",
              once: true,
            },
          },
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-4 pt-24 pb-10 sm:px-6 sm:pt-32"
      aria-label="How the studio works"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Fig. 01 — Method</p>
          <p className="dim-label hidden sm:block">Run in order, no handoffs</p>
        </div>

        <div className="grid gap-x-16 gap-y-6 pt-12 lg:grid-cols-[1fr_auto] lg:items-end lg:pt-16">
          <h2 className="display-section max-w-2xl">
            Four stations, one drawing.
          </h2>
          <p className="section-copy max-w-xs pb-1 text-sm sm:text-base">
            Every project crosses the same span. The same team carries it the
            whole way.
          </p>
        </div>

        {/* Dimension line: the span the stations are measured off. */}
        <div
          aria-hidden="true"
          data-method-dimension
          className="relative mt-14 hidden h-8 lg:block"
        >
          <span
            data-method-measure
            className="dim-label absolute -top-1 left-1/2 -translate-x-1/2 bg-background px-4"
          >
            Scope → Launch
          </span>
          <div
            data-method-line
            className="absolute top-1/2 right-0 left-0 h-px origin-left bg-foreground/55"
          />
          {[0, 25, 50, 75, 100].map((pos) => (
            <span
              key={pos}
              data-method-tick
              className="absolute top-1/2 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-foreground/70"
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>

        {/* Stations. */}
        <div className="mt-4 grid lg:grid-cols-4">
          {STATIONS.map((station, index) => (
            <article
              key={station.id}
              data-method-station
              className="border-t border-border py-10 lg:border-t-0 lg:border-l lg:px-8 lg:py-4 lg:first:border-l-0 lg:first:pl-0 lg:last:pr-0"
            >
              <p
                data-method-reveal
                className="dim-label text-[color:var(--signal)]"
              >
                Sta. 0{index + 1} — {station.stage}
              </p>

              <p
                data-method-reveal
                className="mt-5 font-display text-[3.4rem] leading-none font-[550] tracking-[-0.04em] text-foreground sm:text-[4.2rem] lg:text-[4.6rem]"
              >
                {station.numeral}
              </p>

              <h3
                data-method-reveal
                className="mt-6 max-w-[16ch] font-display text-[1.3rem] leading-snug font-semibold tracking-tight"
              >
                {station.title}
              </h3>

              <p
                data-method-reveal
                className="mt-4 text-sm leading-7 text-muted-foreground"
              >
                {station.note}
              </p>

              <div data-method-reveal className="mt-8">
                <p className="dim-label border-b border-border pb-2.5">
                  Leaves the desk
                </p>
                <ul>
                  {station.outputs.map((output, outputIndex) => (
                    <li
                      key={output}
                      className="flex items-baseline gap-3 border-b border-border/60 py-2.5"
                    >
                      <span className="dim-label">0{outputIndex + 1}</span>
                      <span className="text-sm text-foreground/85">
                        {output}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { MethodSection };
