"use client";

import { cn } from "@/lib/utils";

type StaticCubeProps = {
  className?: string;
  variant?: "hero" | "interlude";
};

/**
 * Pure-CSS/SVG stand-in for the WebGL hero cube on phones.
 *
 * The live three.js object "splatters" on small screens — its page-long tour
 * and explode/reassemble beats read as chaos and tax mobile GPUs. Here the
 * same isometric brand cube is drawn as three flat faces with a measured
 * draw-in (faces fade + lift into place) and a slow idle float. No canvas, no
 * shaders — always crisp, near-zero cost. Honors reduced motion via CSS.
 */
function StaticCube({ className, variant = "hero" }: StaticCubeProps) {
  const isHero = variant === "hero";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "static-cube relative grid place-items-center overflow-hidden",
        isHero && "static-cube--hero",
        className,
      )}
    >
      <div className="static-cube__rig relative grid h-full w-full place-items-center">
        {isHero ? (
          <>
            <span className="static-cube__halo absolute inset-auto top-[18%] size-[58%] rounded-full" />
            <span className="static-cube__particle static-cube__particle--one absolute left-[18%] top-[34%] size-2.5 rounded-full" />
            <span className="static-cube__particle static-cube__particle--two absolute right-[20%] top-[22%] size-2 rounded-full" />
            <span className="static-cube__particle static-cube__particle--three absolute bottom-[24%] right-[24%] size-1.5 rounded-full" />
          </>
        ) : null}

        {/* Faint drawing envelope, echoing the desktop wireframe. */}
        <svg
          viewBox="0 0 240 260"
          className="static-cube__envelope absolute size-[78%] text-foreground/15"
          fill="none"
        >
          <title>Drawing envelope</title>
          <path
            d="M120 18 222 76 222 184 120 242 18 184 18 76Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M120 18 120 242 M18 76 222 184 M222 76 18 184"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.6"
          />
        </svg>

        <span className="static-cube__shadow absolute bottom-[12%] h-5 w-[38%] rounded-full" />

        {/* The cube itself — three isometric faces. */}
        <svg
          viewBox="0 0 240 280"
          className="static-cube__glyph relative w-[62%]"
        >
          <title>Akxost cube</title>
          {/* top face — the signal-lit keystone */}
          <path
            className="static-cube__face static-cube__face--top"
            d="M120 20 220 80 120 140 20 80Z"
            fill="var(--signal)"
          />
          {/* left face */}
          <path
            className="static-cube__face static-cube__face--left"
            d="M20 80 120 140 120 260 20 200Z"
            fill="var(--signal)"
            opacity="0.72"
          />
          {/* right face */}
          <path
            className="static-cube__face static-cube__face--right"
            d="M220 80 120 140 120 260 220 200Z"
            fill="var(--signal)"
            opacity="0.45"
          />
        </svg>
      </div>
    </div>
  );
}

export { StaticCube };
