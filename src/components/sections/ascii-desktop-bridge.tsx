"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

import { AsciiDesktopViewer } from "@/components/ui/3d-ascii-model-viewer";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";

function AsciiDesktopBridgeSection() {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const smokeColor = resolvedTheme === "dark" ? "#5aa9a3" : "#c7d9d5";

  return (
    <section className="relative isolate overflow-hidden py-4 sm:py-8">
      <motion.div
        className="relative min-h-[clamp(780px,92vh,1180px)] overflow-hidden"
        initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.99 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.22 }}
        transition={{
          duration: reduceMotion ? 0 : 0.38,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 opacity-100">
          <SmokeBackground smokeColor={smokeColor} />
        </div>

        <div
          className={`pointer-events-none absolute inset-0 z-[1] ${
            resolvedTheme === "dark"
              ? "bg-[radial-gradient(circle_at_50%_24%,rgba(29,169,163,0.08),transparent_32%),linear-gradient(180deg,rgba(7,12,12,0.58)_0%,rgba(3,5,5,0.62)_100%)]"
              : "bg-[radial-gradient(circle_at_50%_24%,rgba(29,169,163,0.05),transparent_32%),linear-gradient(180deg,rgba(248,243,234,0.36)_0%,rgba(244,240,232,0.32)_100%)]"
          }`}
        />

        <div className="relative z-10 mx-auto w-full px-4 py-6 sm:px-6 sm:pt-10 lg:px-8">
          <AsciiDesktopViewer />
        </div>

        <div className="pointer-events-none absolute left-[40%] top-4 z-30 max-w-[18rem] rounded-2xl border border-border/60 bg-background/90 px-4 py-3 text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-[4px] sm:left-6 sm:top-6 sm:max-w-[21rem] sm:px-5 sm:py-4">
          <h2 className="mt-3 max-w-[16ch] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            The product surface and the delivery system should feel like one
            thing.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}

export { AsciiDesktopBridgeSection };
