"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import * as React from "react";

import { PROJECTS } from "@/lib/data/projects";
import type { PreviewFont, Project, ProjectPreview } from "@/types/project";

gsap.registerPlugin(ScrollTrigger);

const FEATURED = PROJECTS.slice(0, 8);

/** Closest system stand-ins for each project's real display face. */
const FONT_STACKS: Record<PreviewFont, string> = {
  sans: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif',
  serif: 'ui-serif, Georgia, "Times New Roman", serif',
  rounded: 'ui-rounded, "Avenir Next", "Trebuchet MS", system-ui, sans-serif',
  mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
};

const ELEVATION_LABEL: Record<ProjectPreview["frame"], string> = {
  phone: "ELEV. MOBILE",
  browser: "ELEV. WEB",
  desktop: "ELEV. DESKTOP",
  note: "SPEC. NATIVE",
};

/**
 * Miniature of the project's real entry page, drawn from its own
 * globals.css palette and hero copy. No screenshots — the studio
 * redraws each landing at plate scale.
 */
function PreviewViewport({ preview }: { preview: ProjectPreview }) {
  const { bg, fg, accent, muted, headline } = preview;
  const base: React.CSSProperties = {
    background: bg,
    color: fg,
    fontFamily: FONT_STACKS[preview.font],
  };

  if (preview.frame === "phone") {
    // Split hero: copy left, device elevation right — like the real pages.
    return (
      <div
        className="relative flex h-full items-center gap-3 overflow-hidden px-3"
        style={base}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${accent}24, transparent 62%)`,
          }}
        />
        <div className="relative min-w-0 flex-1">
          <p className="text-[0.6rem] leading-[1.3] font-semibold tracking-[-0.01em]">
            {headline}
          </p>
          <div className="mt-1.5 h-[3px] w-7" style={{ background: accent }} />
          <div className="mt-1.5 flex gap-1">
            <span
              className="h-[9px] w-8 rounded-full"
              style={{ background: accent }}
            />
            <span
              className="h-[9px] w-6 rounded-full border"
              style={{ borderColor: `${fg}40` }}
            />
          </div>
        </div>
        <div
          className="relative h-[6.2rem] w-[3rem] shrink-0 rounded-[9px] border"
          style={{
            borderColor: `${fg}59`,
            background: `color-mix(in srgb, ${bg}, #ffffff 45%)`,
          }}
        >
          <div
            className="mx-auto mt-1 h-[3px] w-2.5 rounded-full"
            style={{ background: `${fg}33` }}
          />
          <div className="mx-1.5 mt-1.5 space-y-1">
            <div
              className="h-[5px] w-4/5 rounded-full"
              style={{ background: `${fg}cc` }}
            />
            <div
              className="h-[4px] rounded-full"
              style={{ background: `${fg}40` }}
            />
            <div
              className="h-[4px] w-3/4 rounded-full"
              style={{ background: `${fg}40` }}
            />
            <div
              className="h-5 rounded-[4px]"
              style={{ background: `${muted}4d`, border: `1px solid ${fg}1f` }}
            />
          </div>
          <div className="absolute inset-x-1.5 bottom-1 flex justify-between">
            <span
              className="size-[5px] rounded-full"
              style={{ background: accent }}
            />
            <span
              className="size-[5px] rounded-full"
              style={{ background: `${fg}33` }}
            />
            <span
              className="size-[5px] rounded-full"
              style={{ background: `${fg}33` }}
            />
            <span
              className="size-[5px] rounded-full"
              style={{ background: `${fg}33` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (preview.frame === "browser") {
    return (
      <div className="flex h-full flex-col overflow-hidden" style={base}>
        <div
          className="flex items-center gap-1 border-b px-2 py-1"
          style={{ borderColor: `${fg}1f` }}
        >
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: accent }}
          />
          <span
            className="ml-1.5 h-[5px] w-16 rounded-full"
            style={{ background: `${fg}14` }}
          />
        </div>
        <div className="relative flex flex-1 items-center gap-3 px-3">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${accent}1c, transparent 58%)`,
            }}
          />
          <div className="relative min-w-0 flex-1">
            <p className="text-[0.6rem] leading-[1.3] font-semibold tracking-[-0.01em]">
              {headline}
            </p>
            <div className="mt-1.5 flex items-center gap-1">
              <span
                className="h-[9px] w-9 rounded-full"
                style={{ background: accent }}
              />
              <span
                className="h-[9px] w-7 rounded-full border"
                style={{ borderColor: `${fg}40` }}
              />
            </div>
          </div>
          <div className="relative w-[4.2rem] shrink-0 space-y-1">
            <div
              className="h-8 rounded-[3px]"
              style={{ background: `${muted}73`, border: `1px solid ${fg}1f` }}
            />
            <div
              className="h-[5px] w-4/5 rounded-full"
              style={{ background: accent }}
            />
            <div
              className="h-[5px] rounded-full"
              style={{ background: `${fg}26` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (preview.frame === "desktop") {
    // Three-pane app shell: nav rail, chat thread, context panel.
    return (
      <div className="flex h-full flex-col overflow-hidden" style={base}>
        <div
          className="flex items-center gap-1 border-b px-2 py-1"
          style={{ borderColor: `${fg}1f` }}
        >
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: accent }}
          />
        </div>
        <div className="flex min-h-0 flex-1">
          <div
            className="flex w-5 flex-col items-center gap-1.5 border-r py-1.5"
            style={{ borderColor: `${fg}1f` }}
          >
            <span
              className="size-1.5 rounded-[2px]"
              style={{ background: accent }}
            />
            <span
              className="size-1.5 rounded-[2px]"
              style={{ background: `${fg}33` }}
            />
            <span
              className="size-1.5 rounded-[2px]"
              style={{ background: `${fg}33` }}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col px-2 py-1.5">
            <p
              className="text-[0.55rem] leading-[1.3] font-medium"
              style={{ color: muted }}
            >
              {headline}
            </p>
            <div className="mt-auto space-y-1">
              <div
                className="h-[7px] w-3/5 rounded-[3px]"
                style={{ background: `${fg}1f` }}
              />
              <div
                className="ml-auto h-[7px] w-2/5 rounded-[3px]"
                style={{ background: `${accent}59` }}
              />
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span
                className="h-[10px] flex-1 rounded-[3px] border"
                style={{ borderColor: `${fg}33` }}
              />
              <span
                className="size-[10px] rounded-[2px]"
                style={{ background: accent }}
              />
            </div>
          </div>
          <div
            className="w-7 space-y-1 border-l px-1 py-1.5"
            style={{ borderColor: `${fg}1f` }}
          >
            <div
              className="h-[4px] rounded-full"
              style={{ background: `${fg}26` }}
            />
            <div
              className="h-[4px] rounded-full"
              style={{ background: `${fg}26` }}
            />
            <div
              className="h-[4px] w-3/4 rounded-full"
              style={{ background: accent }}
            />
          </div>
        </div>
      </div>
    );
  }

  // "note": native builds with no web elevation — drawn as a spec card.
  return (
    <div
      className="flex h-full flex-col overflow-hidden px-3 py-2.5"
      style={base}
    >
      <p
        className="font-mono text-[0.45rem] font-bold tracking-[0.2em] uppercase"
        style={{ color: accent }}
      >
        Native build — no web elevation
      </p>
      <p className="mt-1 text-[0.58rem] leading-[1.35]">{headline}</p>
      <div className="mt-auto space-y-1">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span
              className="size-[7px] rounded-[2px]"
              style={
                row === 0
                  ? { background: accent }
                  : { border: `1px solid ${fg}40` }
              }
            />
            <span
              className="h-[4px] rounded-full"
              style={{
                background: `${fg}26`,
                width: `${56 - row * 12}%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Drafting plate: project chrome around the themed miniature. */
function PlatePreview({ project, index }: { project: Project; index: number }) {
  return (
    <div className="h-full w-full bg-card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="dim-label truncate text-[0.6rem]">
          PLT.{String(index + 1).padStart(2, "0")} — {project.name}
        </span>
        <span className="dim-label text-[0.6rem]">{project.year}</span>
      </div>

      <div className="relative mt-3 h-[7.5rem] border border-border/80">
        <PreviewViewport preview={project.preview} />
        {/* Dimension tick */}
        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
          <span className="h-px w-5 bg-[color:var(--signal)]" />
          <span className="dim-label text-[0.55rem] text-[color:var(--signal)]">
            {ELEVATION_LABEL[project.preview.frame]}
          </span>
        </div>
      </div>

      <p className="dim-label mt-3 text-[0.6rem]">{project.platform}</p>
    </div>
  );
}

function WorkIndexSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const hoverEnabledRef = React.useRef(false);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    const preview = previewRef.current;
    if (!section || !preview) {
      return;
    }

    const q = gsap.utils.selector(section);
    const mm = gsap.matchMedia(section);

    mm.add(
      {
        fine: "(pointer: fine) and (min-width: 1024px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { fine, reduce } = context.conditions as {
          fine: boolean;
          reduce: boolean;
        };

        gsap.set(preview, { autoAlpha: 0, scale: 0.92 });

        if (!reduce) {
          // --- Index rows rise in, staggered, once.
          gsap.fromTo(
            q("[data-work-row]"),
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.8,
              ease: "expo.out",
              stagger: 0.07,
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }

        if (!fine || reduce) {
          hoverEnabledRef.current = false;
          return;
        }
        hoverEnabledRef.current = true;

        // --- Plate preview follows the cursor with damped lag + tilt.
        const xTo = gsap.quickTo(preview, "x", {
          duration: 0.55,
          ease: "power3",
        });
        const yTo = gsap.quickTo(preview, "y", {
          duration: 0.55,
          ease: "power3",
        });
        const rTo = gsap.quickTo(preview, "rotation", {
          duration: 0.6,
          ease: "power3",
        });

        let lastX = 0;
        const handleMove = (event: PointerEvent) => {
          const bounds = section.getBoundingClientRect();
          const x = event.clientX - bounds.left;
          const y = event.clientY - bounds.top;
          xTo(x + 28);
          yTo(y - 110);
          rTo(gsap.utils.clamp(-7, 7, (event.clientX - lastX) * 0.35));
          lastX = event.clientX;
        };

        section.addEventListener("pointermove", handleMove, { passive: true });
        return () => {
          section.removeEventListener("pointermove", handleMove);
        };
      },
    );

    return () => mm.revert();
  }, []);

  const showPreview = (index: number) => {
    if (!hoverEnabledRef.current || !previewRef.current) {
      return;
    }
    setActive(index);
    gsap.to(previewRef.current, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const hidePreview = () => {
    if (!hoverEnabledRef.current || !previewRef.current) {
      return;
    }
    gsap.to(previewRef.current, {
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative px-4 pt-24 pb-10 sm:px-6 sm:pt-32"
      aria-label="Selected work"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Fig. 02 — Selected work</p>
          <Link
            href="/projects"
            className="dim-label text-foreground/80 transition-colors hover:text-foreground"
          >
            Full index →
          </Link>
        </div>

        <h2 className="display-section mt-12 max-w-2xl lg:mt-16">
          Built, shipped, and still running.
        </h2>

        {/* Touch devices never meet the cursor plate — give them a swipeable
            rail of the same drawings instead. */}
        <div className="mt-10 lg:hidden">
          <p className="dim-label">
            Plates 01–{String(FEATURED.length).padStart(2, "0")} — swipe
          </p>
          <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6">
            {FEATURED.map((project, index) => (
              <Link
                key={project.slug}
                href="/projects"
                aria-label={`${project.name} — view all projects`}
                className="w-[16rem] shrink-0 snap-start border border-border"
              >
                <PlatePreview project={project} index={index} />
              </Link>
            ))}
          </div>
        </div>

        <ul className="mt-12" onPointerLeave={hidePreview}>
          {FEATURED.map((project, index) => (
            <li key={project.slug}>
              <Link
                href="/projects"
                data-work-row
                onPointerEnter={() => showPreview(index)}
                onFocus={() => showPreview(index)}
                onBlur={hidePreview}
                className="group grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-4 border-t border-border py-5 sm:grid-cols-[3.5rem_1fr_11rem_4.5rem_2rem] sm:gap-x-6 sm:py-6"
              >
                <span className="dim-label transition-colors group-hover:text-[color:var(--signal)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-display text-[1.6rem] leading-[1.05] font-[550] tracking-[-0.03em] text-foreground/85 transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-foreground sm:text-[2.4rem] lg:text-[3rem]"
                  style={{ transitionTimingFunction: "var(--ease-out-strong)" }}
                >
                  {project.name}
                </span>
                <span className="dim-label hidden sm:block">
                  {project.platform}
                </span>
                <span className="dim-label text-right">{project.year}</span>
                <span
                  aria-hidden="true"
                  className="hidden text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
          <li className="rule-x" />
        </ul>
      </div>

      {/* Cursor-following plate. Desktop fine-pointer only. */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 hidden w-[16.5rem] border border-border shadow-[0_24px_60px_-24px_rgba(19,19,16,0.35)] lg:block"
      >
        <PlatePreview project={FEATURED[active]} index={active} />
      </div>
    </section>
  );
}

export { WorkIndexSection };
