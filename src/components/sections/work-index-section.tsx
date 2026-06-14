"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import * as React from "react";

import { PlatePreview } from "@/components/projects/plate-preview";
import { FEATURED_PROJECTS } from "@/lib/data/projects";

gsap.registerPlugin(ScrollTrigger);

const FEATURED = FEATURED_PROJECTS;

function plateLabel(index: number) {
  return `PLT.${String(index + 1).padStart(2, "0")}`;
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
                <PlatePreview
                  project={project}
                  plateLabel={plateLabel(index)}
                />
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
                  className="font-display text-[1.35rem] leading-[1.05] font-[550] tracking-[-0.03em] text-foreground/85 transition-[transform,color] duration-300 group-hover:translate-x-2 group-hover:text-foreground sm:text-[2.4rem] lg:text-[3rem]"
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
        <PlatePreview
          project={FEATURED[active]}
          plateLabel={plateLabel(active)}
        />
      </div>
    </section>
  );
}

export { WorkIndexSection };
