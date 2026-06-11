"use client";

import * as React from "react";
import {
  Focus,
  Link2,
  Minimize2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";

const STORY_FRAMES = [
  {
    id: "clarity",
    label: "01",
    title: "Clarity before momentum.",
    note: "The work starts by making the scope, the user flow, and the release shape understandable.",
  },
  {
    id: "ownership",
    label: "02",
    title: "Direct ownership across the product.",
    note: "Interface, systems, deployment, and post-launch support stay connected instead of being split across handoffs.",
  },
  {
    id: "restraint",
    label: "03",
    title: "Restraint over unnecessary complexity.",
    note: "Small, senior-led execution. Fewer layers, fewer moving parts, and less noise around the real work.",
  },
  {
    id: "dependability",
    label: "04",
    title: "Dependable delivery that survives contact.",
    note: "The product has to launch cleanly, hold up under change, and stay workable after the first release.",
  },
] as const;

const VALUE_SYMBOLS = [
  {
    id: "clarity",
    label: "Clarity",
    icon: Focus,
    className: "left-[7%] top-[8%]",
    tint: "from-[#1da9a3]/28 to-[#1da9a3]/6",
    orbitX: -34,
    orbitY: -24,
  },
  {
    id: "ownership",
    label: "Ownership",
    icon: Link2,
    className: "right-[11%] top-[20%]",
    tint: "from-[#d7f3ef]/22 to-[#1da9a3]/10",
    orbitX: 28,
    orbitY: -10,
  },
  {
    id: "restraint",
    label: "Restraint",
    icon: Minimize2,
    className: "right-[18%] bottom-[16%]",
    tint: "from-[#f3f1ec]/14 to-[#1da9a3]/8",
    orbitX: 22,
    orbitY: 26,
  },
  {
    id: "dependability",
    label: "Dependability",
    icon: ShieldCheck,
    className: "left-[20%] bottom-[10%]",
    tint: "from-[#1da9a3]/30 to-[#111111]/8",
    orbitX: -18,
    orbitY: 20,
  },
] as const;

type StoryFrameItemProps = {
  frame: (typeof STORY_FRAMES)[number];
  index: number;
  frameProgress: MotionValue<number[]>;
  reduceMotion: boolean;
};

function StoryFrameItem({
  frame,
  index,
  frameProgress,
  reduceMotion,
}: StoryFrameItemProps) {
  const opacity = useTransform(frameProgress, (values) =>
    Math.max(0.24, Math.min(1, values[index] ?? 0)),
  );
  const x = useTransform(frameProgress, (values) =>
    reduceMotion ? 0 : (1 - Math.max(0, values[index] ?? 0)) * 56,
  );

  return (
    <motion.article style={{ opacity, x }} className="max-w-[30rem] space-y-2">
      <p className="font-mono text-xs tracking-[0.28em] text-[color:var(--chart-1)]">
        {frame.label}
      </p>
      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {frame.title}
      </h3>
      <p className="text-sm text-muted-foreground">{frame.note}</p>
    </motion.article>
  );
}

type ValueSymbolProps = {
  index: number;
  frameProgress: MotionValue<number[]>;
  reduceMotion: boolean;
  icon: LucideIcon;
  label: string;
  className: string;
  tint: string;
  orbitX: number;
  orbitY: number;
};

function ValueSymbol({
  index,
  frameProgress,
  reduceMotion,
  icon: Icon,
  label,
  className,
  tint,
  orbitX,
  orbitY,
}: ValueSymbolProps) {
  const intensity = useTransform(frameProgress, (values) =>
    Math.max(0, Math.min(1, values[index] ?? 0)),
  );
  const opacity = useTransform(intensity, [0, 1], [0.28, 1]);
  const scale = useTransform(
    intensity,
    [0, 1],
    reduceMotion ? [1, 1] : [0.74, 1.28],
  );
  const rotate = useTransform(
    intensity,
    [0, 1],
    reduceMotion ? [0, 0] : [-8, 0],
  );
  const x = useTransform(
    intensity,
    [0, 1],
    reduceMotion ? [0, 0] : [orbitX, 0],
  );
  const y = useTransform(
    intensity,
    [0, 1],
    reduceMotion ? [0, 0] : [orbitY, 0],
  );
  const glowOpacity = useTransform(intensity, [0, 1], [0.1, 0.9]);

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ opacity, scale, rotate, x, y, translateZ: 220 }}
    >
      <div className="relative">
        <motion.div
          className={`absolute inset-[-18%] rounded-[1.9rem] bg-gradient-to-br ${tint} blur-2xl`}
          style={{ opacity: glowOpacity }}
        />
        <div className="relative flex size-28 items-center justify-center rounded-[1.9rem] border border-border/45 bg-background/40 shadow-[0_18px_70px_rgba(0,0,0,0.18)] backdrop-blur-md">
          <Icon
            className="size-10 text-[color:var(--chart-1)]"
            strokeWidth={1.7}
          />
          <span className="sr-only">{label}</span>
        </div>
      </div>
    </motion.div>
  );
}

function StorytellingScrollSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    mass: 0.18,
  });

  const stageRotateX = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [14, -12],
  );
  const stageRotateY = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-16, 16],
  );
  const stageLift = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -36],
  );
  const beamTravel = useTransform(smoothProgress, [0, 1], ["14%", "82%"]);
  const coreScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [0.88, 1.06, 0.94],
  );
  const frameA = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-24, 30],
  );
  const frameB = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [16, -20],
  );
  const frameC = useTransform(
    smoothProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [26, -28],
  );

  const frameProgress = useTransform(smoothProgress, (value) => {
    return STORY_FRAMES.map((_, index) => {
      const total = STORY_FRAMES.length - 1;
      const center = total === 0 ? 0 : index / total;
      const distance = Math.min(Math.abs(value - center), 1);
      return 1 - distance * 1.55;
    });
  });

  return (
    <section ref={containerRef} className="relative h-[320vh]">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 px-4 py-18 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-10">
            <div className="space-y-3">
              <p className="section-kicker">What the studio does</p>
              <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl">
                The motion should resolve into a few principles, not just a
                visual effect.
              </h2>
            </div>

            <div className="space-y-10">
              {STORY_FRAMES.map((frame, index) => (
                <StoryFrameItem
                  key={frame.id}
                  frame={frame}
                  index={index}
                  frameProgress={frameProgress}
                  reduceMotion={!!reduceMotion}
                />
              ))}
            </div>
          </div>

          <div className="relative h-[60vh] min-h-[420px] [perspective:1800px]">
            <motion.div
              className="absolute inset-0 rounded-[2.7rem]"
              style={{
                y: stageLift,
                rotateX: stageRotateX,
                rotateY: stageRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.div
                className="absolute inset-[8%] rounded-[2.4rem] border border-border/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]"
                style={{ translateZ: -140 }}
              />

              <motion.div
                className="absolute inset-[16%] rounded-[2rem] border border-border/50 bg-background/28 backdrop-blur-md"
                style={{ translateZ: -20, x: frameA, y: frameB }}
              />

              <motion.div
                className="absolute inset-[23%] rounded-[1.7rem] border border-border/60 bg-background/38 backdrop-blur-lg"
                style={{ translateZ: 70, x: frameB, y: frameC }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border/40 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_44%),linear-gradient(145deg,rgba(29,169,163,0.3),rgba(10,10,10,0.06))] shadow-[0_25px_90px_rgba(29,169,163,0.18)]"
                style={{ scale: coreScale, translateZ: 140 }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 h-[54%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(180deg,transparent,rgba(29,169,163,0.7),transparent)]"
                style={{ translateZ: 205, scaleY: coreScale }}
              />

              <motion.div
                className="absolute inset-y-[18%] left-[12%] w-[20%] rounded-full bg-[radial-gradient(circle_at_center,rgba(29,169,163,0.34),transparent_72%)] blur-2xl"
                style={{ x: beamTravel, translateZ: 170 }}
              />

              {VALUE_SYMBOLS.map((symbol, index) => (
                <ValueSymbol
                  key={symbol.id}
                  index={index}
                  frameProgress={frameProgress}
                  reduceMotion={!!reduceMotion}
                  icon={symbol.icon}
                  label={symbol.label}
                  className={symbol.className}
                  tint={symbol.tint}
                  orbitX={symbol.orbitX}
                  orbitY={symbol.orbitY}
                />
              ))}
            </motion.div>

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,169,163,0.14),transparent_56%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export { StorytellingScrollSection };
