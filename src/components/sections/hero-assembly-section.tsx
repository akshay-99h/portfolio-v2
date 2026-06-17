"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import { CubeMark } from "@/components/layout/brand-wordmark";
import type { AssemblyDrivers } from "@/components/gl/scenes/hero-assembly";
import { StaticCube } from "@/components/sections/static-cube";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const HeroAssemblyCanvas = dynamic(
  () =>
    import("@/components/gl/scenes/hero-assembly").then(
      (mod) => mod.HeroAssemblyCanvas,
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
    label: "Modules x27",
    className: "right-4 bottom-[14%] text-right",
  },
] as const;

const TITLE_BLOCK_ROWS = [
  ["Drg. No.", "AKX-001"],
  ["Scale", "1 : 1"],
  ["Drawn", "New Delhi"],
  ["Rev.", "A - Current"],
] as const;

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

function RegistrationStamp({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <svg
        viewBox="0 0 120 120"
        className="size-full text-muted-foreground"
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
            Akxost Studio - New Delhi - Drawn, then built -
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

function TitleBlock() {
  return (
    <dl className="w-full max-w-[17rem] border border-border bg-card/60 sm:w-auto sm:min-w-[16rem]">
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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const driversRef = React.useRef<AssemblyDrivers>({
    progress: 1,
    intro: 0,
    pointerX: 0,
    pointerY: 0,
    scroll: 0,
  });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }

    const drivers = driversRef.current;
    let frame = 0;
    let start = 0;

    const animateIntro = (timestamp: number) => {
      if (!start) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      drivers.intro = Math.min(1, elapsed / 1200);
      drivers.kick?.();

      if (drivers.intro < 1) {
        frame = window.requestAnimationFrame(animateIntro);
      }
    };

    frame = window.requestAnimationFrame(animateIntro);
    return () => window.cancelAnimationFrame(frame);
  }, [mounted]);

  React.useEffect(() => {
    if (!mounted) {
      return;
    }

    const drivers = driversRef.current;

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      drivers.scroll =
        max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      drivers.kick?.();
    };

    const handlePointerMove = (event: PointerEvent) => {
      drivers.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      drivers.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
      drivers.kick?.();
    };

    const handlePointerLeave = () => {
      drivers.pointerX = 0;
      drivers.pointerY = 0;
      drivers.kick?.();
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, [mounted]);

  return (
    <section className="relative px-4 pt-5 sm:px-6 sm:pt-6">
      {mounted ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 hidden lg:block"
        >
          <HeroAssemblyCanvas
            drivers={driversRef}
            tone={resolvedTheme === "dark" ? "dark" : "light"}
          />
        </div>
      ) : null}

      <div className="relative mx-auto w-full max-w-[1320px] border border-border/70">
        <CropMarks />

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/70 px-4 py-3 sm:px-6">
          <p className="section-kicker">Product Engineering Studio</p>
          <p className="dim-label hidden md:block">28.6139deg N - 77.2090deg E</p>
          <p className="dim-label">Sheet 01 / 04</p>
        </div>

        <div className="grid gap-x-12 gap-y-8 px-4 pt-12 pb-9 sm:px-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:pt-16 lg:pb-10">
          <div>
            <h1 className="display-hero text-foreground">
              <span className="line-mask">
                <span>We build</span>
              </span>
              <span className="line-mask lg:pl-[7%]">
                <span>products that</span>
              </span>
              <span className="line-mask lg:pl-[14%]">
                <span>
                  <em>survive</em> contact
                </span>
              </span>
              <span className="line-mask lg:pl-[5%]">
                <span>
                  with reality
                  <span className="text-[color:var(--signal)]">.</span>
                </span>
              </span>
            </h1>

            <div className="ruler-x mt-10 origin-left lg:mt-12 lg:max-w-[88%]" />

            <p className="section-copy mt-9 max-w-md text-base sm:text-lg">
              Strategy, design, engineering, and launch support. One senior
              team carries the product from first drawing to dependable
              release.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Button asChild size="lg" className="px-7">
                <Link href="/contact">Start a project</Link>
              </Button>
              <Link
                href="/projects"
                className="dim-label text-foreground/80 transition-colors hover:text-foreground"
              >
                Recent work -&gt;
              </Link>
            </div>
          </div>

          <div className="pointer-events-none relative h-[42svh] min-h-[280px] lg:h-full lg:min-h-[480px]">
            <StaticCube
              className={cn(
                "absolute inset-0 transition-opacity duration-300 lg:opacity-0",
                !mounted && "lg:opacity-100",
              )}
              variant="hero"
            />

            <div className="absolute inset-0 hidden lg:block">
              {ANNOTATIONS.map((annotation) => (
                <div
                  key={annotation.id}
                  className={`absolute ${annotation.className}`}
                >
                  <span className="dim-label">
                    {annotation.id} - {annotation.label}
                  </span>
                  <div className="rule-x mt-1.5 w-12" />
                </div>
              ))}
            </div>

            <div className="absolute inset-x-0 bottom-1 flex justify-center px-4">
              <p className="dim-label max-w-[18rem] text-balance text-center sm:max-w-none sm:whitespace-nowrap">
                One team, end to end - designed, then built
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-10 px-4 pb-9 sm:px-6 lg:pb-10">
          <div className="hidden lg:block">
            <RegistrationStamp className="size-[6.5rem]" />
          </div>

          <TitleBlock />
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border/70 px-4 py-3 sm:px-6">
          <span className="dim-label">Senior-led delivery</span>
          <span className="dim-label hidden lg:inline-flex lg:items-baseline lg:gap-2">
            Built to ship, not to stall
          </span>
          <span className="dim-label hidden sm:inline">
            New builds / Rebuilds / Systems
          </span>
        </div>
      </div>
    </section>
  );
}

export { HeroAssemblySection };
