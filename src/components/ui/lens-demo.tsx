"use client";

import { motion } from "motion/react";
import * as React from "react";

import { Lens } from "@/components/ui/lens";
import { cn } from "@/lib/utils";

function LensDemo() {
  const [hovering, setHovering] = React.useState(false);

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="relative my-10 overflow-hidden rounded-3xl border border-white/20 bg-[linear-gradient(130deg,rgba(13,29,62,0.92),rgba(6,17,38,0.92))] p-6 sm:p-8">
        <Rays />
        <Beams />
        <div className="relative z-10">
          <Lens hovering={hovering} setHovering={setHovering} zoomFactor={1.65}>
            <div className="rounded-2xl border border-white/15 bg-[rgba(8,20,45,0.82)] p-5 sm:p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#9bdfff]">
                Delivery Lens
              </p>
              <h3 className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
                Build with clarity, ship with confidence
              </h3>
              <div className="mt-4 grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-medium text-[#b4e8ff]">Architecture</p>
                  <p className="mt-1 text-xs text-foreground/70">
                    API contracts, data models, and deployment flow.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-medium text-[#b4e8ff]">Execution</p>
                  <p className="mt-1 text-xs text-foreground/70">
                    Full-stack delivery with measurable milestones.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-medium text-[#ffcfb6]">Reliability</p>
                  <p className="mt-1 text-xs text-foreground/70">
                    Monitoring, quality checks, and rollback safety.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="font-medium text-[#ffcfb6]">Iteration</p>
                  <p className="mt-1 text-xs text-foreground/70">
                    Tight feedback loops after launch.
                  </p>
                </div>
              </div>
            </div>
          </Lens>
          <motion.div
            animate={{ filter: hovering ? "blur(1.6px)" : "blur(0px)" }}
            className="relative z-20 py-4"
          >
            <h2 className="text-left text-xl font-semibold text-foreground sm:text-2xl">
              Hover to inspect the operating model
            </h2>
            <p className="mt-3 max-w-2xl text-left text-sm text-muted-foreground sm:text-base">
              The lens magnifies any area so visitors can explore detail without
              leaving the flow of the page.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const Beams = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(116,255,229,0.16),transparent_34%),radial-gradient(circle_at_84%_8%,rgba(255,151,188,0.16),transparent_40%),radial-gradient(circle_at_45%_100%,rgba(137,214,255,0.18),transparent_44%)]"
      aria-hidden
    />
  );
};

const Rays = ({ className }: { className?: string }) => {
  return (
    <svg
      width="880"
      height="420"
      viewBox="0 0 880 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "pointer-events-none absolute -left-20 -top-24 z-[1] h-full w-full opacity-45",
        className,
      )}
    >
      <path d="M40 40L460 340" stroke="url(#ray-one)" strokeWidth="1.5" />
      <path d="M140 0L560 320" stroke="url(#ray-two)" strokeWidth="1.5" />
      <path d="M-40 120L420 380" stroke="url(#ray-three)" strokeWidth="1.5" />
      <defs>
        <linearGradient id="ray-one" x1="40" y1="40" x2="460" y2="340">
          <stop stopColor="#88ddff" />
          <stop offset="1" stopColor="#88ddff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ray-two" x1="140" y1="0" x2="560" y2="320">
          <stop stopColor="#a8ffe9" />
          <stop offset="1" stopColor="#a8ffe9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ray-three" x1="-40" y1="120" x2="420" y2="380">
          <stop stopColor="#ffbf8a" />
          <stop offset="1" stopColor="#ffbf8a" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LensDemo;
