"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import type { AssemblyDrivers } from "@/components/gl/scenes/hero-assembly";
import { CubeMark } from "@/components/layout/brand-wordmark";
import { StaticCube } from "@/components/sections/static-cube";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/use-is-mobile";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const HeroAssemblyCanvas = dynamic(
  () =>
    import("@/components/gl/scenes/hero-assembly").then(
      (m) => m.HeroAssemblyCanvas,
    ),
  { ssr: false },
);

const ANNOTATIONS = [
  {
    id: "A.01",
    label: "Signal corner",
    className: "right-0 top-[12%] text-right",
  },
  { id: "A.02", label: "Drawing envelope", className: "left-0 top-[46%]" },
  {
    id: "A.03",
    label: "Modules ×27",
    className: "right-4 bottom-[14%] text-right",
  },
] as const;

const TITLE_BLOCK_ROWS = [
  ["Drg. No.", "AKX-001"],
  ["Scale", "1 : 1"],
  ["Drawn", "New Delhi"],
  ["Rev.", "A — Current"],
] as const;

/** Crop marks at the sheet corners — print-room registration. */
function CropMarks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -left-px size-3 border-t border-l border-foreground/60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -right-px size-3 border-t border-r border-foreground/60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px -left-px size-3 border-b border-l border-foreground/60"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-px -bottom-px size-3 border-r border-b border-foreground/60"
      />
    </>
  );
}

/** Rotating registration stamp with the brand cube at its center. */
function RegistrationStamp({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <svg
        viewBox="0 0 120 120"
        className="stamp-rotate size-full text-muted-foreground"
      >
        <title>Akxost registration stamp</title>
        <defs>
          <path
            id="hero-stamp-arc"
            d="M60 60 m -47 0 a 47 47 0 1 1 94 0 a 47 47 0 1 1 -94 0"
          />
        </defs>
        <text
          className="fill-current font-mono uppercase"
          fontSize="9"
          letterSpacing="2.4"
        >
          <textPath href="#hero-stamp-arc" textLength="294">
            Akxost Studio · New Delhi · Drawn, then built ·
          </textPath>
        </text>
        <circle
          cx="60"
          cy="60"
          r="32"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
      </svg>
      <CubeMark className="absolute top-1/2 left-1/2 w-[1.35rem] -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

/** Engineering title block — the corner table every real drawing carries. */
function TitleBlock() {
  return (
    <dl
      data-hero-fade
      className="w-full max-w-[17rem] border border-border bg-card/60 sm:w-auto sm:min-w-[16rem]"
    >
      {TITLE_BLOCK_ROWS.map(([term, detail], index) => (
        <div
          key={term}
          className={cn(
            "grid grid-cols-[6rem_1fr]",
            index > 0 && "border-t border-border",
          )}
        >
          <dt className="dim-label border-r border-border px-3 py-2">{term}</dt>
          <dd className="px-3 py-2 font-mono text-[0.68rem] tracking-[0.12em] text-foreground uppercase">
            {detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function HeroAssemblySection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const tone = resolvedTheme === "dark" ? "dark" : "light";
  const isMobile = useIsMobile();

  const driversRef = React.useRef<AssemblyDrivers>({
    progress: 0,
    intro: 0,
    pointerX: 0,
    pointerY: 0,
    scroll: 0,
  });

  // Document scroll progress drives the object's tour of the whole page.
  React.useEffect(() => {
    const drivers = driversRef.current;

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      drivers.scroll =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      drivers.kick?.();
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    if (!section || !viewport) {
      return;
    }

    const drivers = driversRef.current;
    const kick = () => drivers.kick?.();
    const q = gsap.utils.selector(section);

    const mm = gsap.matchMedia(section);

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023.98px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions as {
          isDesktop: boolean;
          reduce: boolean;
        };

        // Reduced motion: everything lands in its final, legible state.
        if (reduce) {
          drivers.intro = 1;
          drivers.progress = 1;
          kick();
          gsap.set(q("[data-hero-labels]"), { autoAlpha: 0 });
          gsap.set(q("[data-hero-caption]"), { autoAlpha: 1 });
          return;
        }

        // --- Entrance: ruler draws, headline lines unmask, object draws in.
        gsap.set(q("[data-hero-caption]"), { autoAlpha: 0 });

        const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
        intro.fromTo(
          q("[data-hero-rule]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9 },
          0,
        );
        intro.fromTo(
          q("[data-hero-line]"),
          { yPercent: 110 },
          { yPercent: 0, duration: 0.95, stagger: 0.085 },
          0.1,
        );
        intro.fromTo(
          q("[data-hero-fade]"),
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 },
          0.45,
        );
        intro.to(drivers, { intro: 1, duration: 1.4, onUpdate: kick }, 0.35);
        intro.fromTo(
          q("[data-hero-labels]"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          0.85,
        );

        if (isDesktop) {
          // --- Pinned assembly: the drawing seats into an object over +150vh.
          const scrub = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              scrub: 0.4,
              pin: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                drivers.progress = self.progress;
                kick();
              },
            },
          });
          scrub.to({}, { duration: 1 }, 0);
          scrub.to(
            q("[data-hero-cue]"),
            { autoAlpha: 0, duration: 0.08, immediateRender: false },
            0.04,
          );
          scrub.to(
            q("[data-hero-labels]"),
            { autoAlpha: 0, duration: 0.18, immediateRender: false },
            0.55,
          );
          scrub.fromTo(
            q("[data-hero-caption]"),
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.2, immediateRender: false },
            0.78,
          );
        } else {
          // --- Mobile: no pin. One-shot assembly when the object enters view.
          ScrollTrigger.create({
            trigger: viewport,
            start: "top 78%",
            once: true,
            onEnter: () => {
              gsap.to(drivers, {
                progress: 1,
                duration: 1.8,
                ease: "power3.inOut",
                onUpdate: kick,
              });
              gsap.to(q("[data-hero-labels]"), {
                autoAlpha: 0,
                duration: 0.5,
                delay: 1.2,
              });
              gsap.to(q("[data-hero-caption]"), {
                autoAlpha: 1,
                y: 0,
                duration: 0.5,
                delay: 1.5,
              });
            },
          });
        }

        // --- Material response: damped tilt, clamped, decays to rest.
        // Window-level: the object roams the whole page, so it should
        // respond to the pointer wherever it currently sits.
        const handlePointerMove = (event: PointerEvent) => {
          drivers.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
          drivers.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
          kick();
        };
        const handlePointerLeave = () => {
          drivers.pointerX = 0;
          drivers.pointerY = 0;
          kick();
        };

        window.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        document.documentElement.addEventListener(
          "pointerleave",
          handlePointerLeave,
        );

        return () => {
          window.removeEventListener("pointermove", handlePointerMove);
          document.documentElement.removeEventListener(
            "pointerleave",
            handlePointerLeave,
          );
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* The object's playground is the whole viewport: a fixed canvas that
          sits behind every section. It starts seated in the hero's right
          column, then tours the page as the document scrolls. Kept outside
          the section so the ScrollTrigger pin never affects it.

          Phones get a static SVG cube in the hero column instead (see below):
          the live tour "splatters" on small screens and taxes mobile GPUs, so
          the canvas is mounted only once we know we're on a desktop. */}
      {isMobile === false ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <HeroAssemblyCanvas drivers={driversRef} tone={tone} />
        </div>
      ) : null}

      <section ref={sectionRef} className="relative px-4 pt-5 sm:px-6 sm:pt-6">
        {/* The sheet. Everything in the hero lives on one technical drawing. */}
        <div className="relative mx-auto w-full max-w-[1320px] border border-border/70">
          <CropMarks />

          {/* Sheet header strip */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/70 px-4 py-3 sm:px-6">
            <p data-hero-fade className="section-kicker">
              Product Engineering Studio
            </p>
            <p data-hero-fade className="dim-label hidden md:block">
              28.6139° N — 77.2090° E
            </p>
            <p data-hero-fade className="dim-label">
              Sheet 01 / 04
            </p>
          </div>

          {/* Drawing area: type column left, object column right — no overlap. */}
          <div className="grid gap-x-12 gap-y-8 px-4 pt-12 pb-9 sm:px-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:pt-16 lg:pb-10">
            <div>
              {/* Headline: staircase composition — type steps like the modules. */}
              <h1 className="display-hero text-foreground">
                <span className="line-mask">
                  <span data-hero-line>We build</span>
                </span>
                <span className="line-mask lg:pl-[7%]">
                  <span data-hero-line>products that</span>
                </span>
                <span className="line-mask lg:pl-[14%]">
                  <span data-hero-line>
                    <em>survive</em> contact
                  </span>
                </span>
                <span className="line-mask lg:pl-[5%]">
                  <span data-hero-line>
                    with reality
                    <span className="text-[color:var(--signal)]">.</span>
                  </span>
                </span>
              </h1>

              {/* Measurement ruler under the type. */}
              <div
                data-hero-rule
                className="ruler-x mt-10 origin-left lg:mt-12 lg:max-w-[88%]"
              />

              <p
                data-hero-fade
                className="section-copy mt-9 max-w-md text-base sm:text-lg"
              >
                Strategy, design, engineering, and launch support. One senior
                team carries the product from first drawing to dependable
                release.
              </p>
              <div
                data-hero-fade
                className="mt-7 flex flex-wrap items-center gap-6"
              >
                <Button asChild size="lg" className="px-7">
                  <Link href="/contact">Start a project</Link>
                </Button>
                <Link
                  href="/projects"
                  className="dim-label text-foreground/80 transition-colors hover:text-foreground"
                >
                  Recent work →
                </Link>
              </div>
            </div>

            {/* The object's home column: reserves the hero space it starts in
              and carries the annotations that point at it. */}
            <div
              ref={viewportRef}
              className="pointer-events-none relative h-[42svh] min-h-[280px] lg:h-full lg:min-h-[480px]"
            >
              {/* Mobile-only: the static cube stands in for the WebGL tour. */}
              {isMobile !== false ? (
                <StaticCube className="absolute inset-0 lg:hidden" />
              ) : null}

              <div
                data-hero-labels
                className="absolute inset-0 hidden lg:block"
              >
                {ANNOTATIONS.map((annotation) => (
                  <div
                    key={annotation.id}
                    className={`absolute ${annotation.className}`}
                  >
                    <span className="dim-label">
                      {annotation.id} — {annotation.label}
                    </span>
                    <div className="rule-x mt-1.5 w-12" />
                  </div>
                ))}
              </div>

              <div className="absolute inset-x-0 bottom-1 flex justify-center px-4">
                <p
                  data-hero-caption
                  className="dim-label max-w-[18rem] text-balance text-center sm:max-w-none sm:whitespace-nowrap"
                >
                  One team, end to end — designed, then built
                </p>
              </div>
            </div>
          </div>

          {/* Bottom row: stamp and title block. */}
          <div className="flex flex-wrap items-end justify-between gap-10 px-4 pb-9 sm:px-6 lg:pb-10">
            <div data-hero-fade className="hidden lg:block">
              <RegistrationStamp className="size-[6.5rem]" />
            </div>

            <TitleBlock />
          </div>

          {/* Sheet footer strip */}
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border/70 px-4 py-3 sm:px-6">
            <span data-hero-fade className="dim-label">
              Senior-led delivery
            </span>
            <span
              data-hero-cue
              className="dim-label hidden lg:inline-flex lg:items-baseline lg:gap-2"
            >
              Scroll — the drawing assembles
              <span aria-hidden="true" className="cue-bob">
                ↓
              </span>
            </span>
            <span data-hero-fade className="dim-label hidden sm:inline">
              New builds / Rebuilds / Systems
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export { HeroAssemblySection };
