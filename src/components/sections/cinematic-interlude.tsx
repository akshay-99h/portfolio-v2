"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as React from "react";

gsap.registerPlugin(ScrollTrigger);

type CinematicInterludeProps = {
  /** Frame label, e.g. "Fig. 02a — Reassembly". */
  figure: string;
  /** One-line caption that breathes in at the center of the beat. */
  caption: string;
  /** Right-aligned coordinate / status line. */
  meta?: string;
};

/**
 * A full-height, empty cinematic beat. The screen pins while the page scrolls
 * through it, handing the stage entirely to the brand cube and the contour
 * background — the cube explodes and reassembles, the survey map sweeps. Only
 * a faint frame label and a single caption fade through, so the beat reads as
 * an intentional film shot rather than a blank gap.
 *
 * The cube/terrain choreography is driven elsewhere by document scroll
 * (see hero-assembly.tsx ASSEMBLY_TRACK and contour-terrain.tsx REGIONS);
 * this component owns only the pin and the sparse type that fades over it.
 */
function CinematicInterlude({
  figure,
  caption,
  meta,
}: CinematicInterludeProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) {
      return;
    }

    const q = gsap.utils.selector(stage);
    const mm = gsap.matchMedia(section);

    mm.add(
      {
        isMotion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { reduce } = context.conditions as { reduce: boolean };

        // Reduced motion: hold the stage static and legible, no pin, no scrub.
        if (reduce) {
          gsap.set(q("[data-interlude-fade]"), { autoAlpha: 1 });
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: 0.4,
            pin: stage,
            anticipatePin: 1,
          },
        });

        // The label and caption breathe in over the first third, hold through
        // the middle (where the cube does its work), then fade as we leave.
        tl.fromTo(
          q("[data-interlude-fade]"),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.25, stagger: 0.05 },
          0.04,
        );
        tl.to({}, { duration: 0.45 }, 0.3);
        tl.to(
          q("[data-interlude-fade]"),
          { autoAlpha: 0, y: -12, duration: 0.22 },
          0.74,
        );
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={figure}
      className="relative h-[300vh]"
    >
      <div
        ref={stageRef}
        className="pointer-events-none flex h-screen w-full flex-col justify-between px-4 py-8 sm:px-6 sm:py-10"
      >
        <div className="mx-auto flex w-full max-w-[1320px] items-baseline justify-between gap-x-6">
          <p data-interlude-fade className="section-kicker">
            {figure}
          </p>
          {meta ? (
            <p data-interlude-fade className="dim-label hidden sm:block">
              {meta}
            </p>
          ) : null}
        </div>

        <div className="mx-auto w-full max-w-[1320px]">
          <p
            data-interlude-fade
            className="dim-label max-w-xs text-balance sm:max-w-sm"
          >
            {caption}
          </p>
        </div>
      </div>
    </section>
  );
}

export { CinematicInterlude };
