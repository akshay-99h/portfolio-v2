"use client";

import { Box, Sparkles, Trophy, Waypoints } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

const COLLECTIBLES = [
  {
    id: "build",
    label: "Build token",
    title: "Build",
    position:
      "left-[10%] top-[18%] sm:left-[8%] sm:top-[16%] lg:left-[4%] lg:top-[18%]",
    depth: 16,
  },
  {
    id: "systems",
    label: "Systems token",
    title: "Systems",
    position:
      "right-[10%] top-[10%] sm:right-[6%] sm:top-[14%] lg:right-[0%] lg:top-[16%]",
    depth: -20,
  },
  {
    id: "curious",
    label: "Curious token",
    title: "Curious",
    position:
      "bottom-[10%] left-[16%] sm:bottom-[12%] sm:left-[18%] lg:bottom-[10%] lg:left-[20%]",
    depth: 12,
  },
] as const;

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

const STORAGE_KEY = "akxost.builder-mode";
const TOKENS_KEY = "akxost.builder-tokens";

function HeroPlayground() {
  const reducedMotion = useReducedMotion();
  const sceneRef = React.useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = React.useState({ x: 0, y: 0 });
  const [found, setFound] = React.useState<string[]>([]);
  const [builderMode, setBuilderMode] = React.useState(false);
  const [konamiIndex, setKonamiIndex] = React.useState(0);

  React.useEffect(() => {
    const storedMode = window.localStorage.getItem(STORAGE_KEY);
    const storedTokens = window.localStorage.getItem(TOKENS_KEY);

    if (storedMode === "true") {
      setBuilderMode(true);
    }

    if (storedTokens) {
      try {
        const parsed = JSON.parse(storedTokens) as string[];
        setFound(parsed);
      } catch {
        window.localStorage.removeItem(TOKENS_KEY);
      }
    }
  }, []);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const nextKey =
        event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const expected = KONAMI[konamiIndex];

      if (nextKey === expected) {
        const nextIndex = konamiIndex + 1;

        if (nextIndex === KONAMI.length) {
          setBuilderMode(true);
          window.localStorage.setItem(STORAGE_KEY, "true");
          setKonamiIndex(0);
          return;
        }

        setKonamiIndex(nextIndex);
        return;
      }

      setKonamiIndex(nextKey === KONAMI[0] ? 1 : 0);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  React.useEffect(() => {
    document.body.dataset.builderMode = builderMode ? "true" : "false";
    return () => {
      delete document.body.dataset.builderMode;
    };
  }, [builderMode]);

  const foundCount = found.length;

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!sceneRef.current || reducedMotion) return;

    const rect = sceneRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setPointer({ x, y });
  }

  function handlePointerLeave() {
    setPointer({ x: 0, y: 0 });
  }

  function collectToken(id: string) {
    setFound((prev) => {
      if (prev.includes(id)) return prev;

      const next = [...prev, id];
      window.localStorage.setItem(TOKENS_KEY, JSON.stringify(next));

      if (next.length === COLLECTIBLES.length) {
        setBuilderMode(true);
        window.localStorage.setItem(STORAGE_KEY, "true");
      }

      return next;
    });
  }

  return (
    <div
      ref={sceneRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate min-h-[26rem] overflow-hidden rounded-[2rem] border border-border bg-background/55 p-5 sm:min-h-[32rem] sm:p-6 lg:p-7"
      style={{ perspective: "1400px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.8),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(31,53,77,0.14),transparent_30%),radial-gradient(circle_at_50%_86%,rgba(31,53,77,0.18),transparent_34%)] dark:bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_80%_12%,rgba(232,220,200,0.1),transparent_30%),radial-gradient(circle_at_50%_86%,rgba(232,220,200,0.12),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(18,29,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,29,42,0.06)_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-[linear-gradient(to_right,rgba(238,242,247,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,242,247,0.04)_1px,transparent_1px)]" />

      <motion.div
        className="absolute inset-x-[10%] bottom-[11%] h-24 rounded-full bg-[radial-gradient(circle,rgba(18,29,42,0.18),transparent_68%)] blur-2xl dark:bg-[radial-gradient(circle,rgba(232,220,200,0.12),transparent_68%)]"
        animate={
          reducedMotion
            ? undefined
            : {
                x: pointer.x * 12,
                y: pointer.y * 8,
                opacity: builderMode ? 0.9 : 0.7,
              }
        }
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
      />

      <motion.div
        className="absolute left-[18%] top-[16%] h-28 w-28 rounded-[2rem] border border-border bg-background/85 shadow-[0_24px_40px_-28px_rgba(0,0,0,0.24)]"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reducedMotion
            ? undefined
            : {
                rotateX: -8 - pointer.y * 10,
                rotateY: 18 + pointer.x * 16,
                y: [-4, 4, -4],
              }
        }
        transition={{
          rotateX: { type: "spring", stiffness: 120, damping: 18 },
          rotateY: { type: "spring", stiffness: 120, damping: 18 },
          y: {
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <div className="absolute inset-3 rounded-[1.3rem] border border-border/70 bg-[linear-gradient(145deg,rgba(255,255,255,0.66),rgba(31,53,77,0.1))] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(232,220,200,0.08))]" />
      </motion.div>

      <motion.div
        className="absolute right-[14%] top-[22%] h-20 w-20 rounded-full border border-border bg-background/80 shadow-[0_22px_34px_-24px_rgba(0,0,0,0.26)]"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reducedMotion
            ? undefined
            : {
                rotateX: 12 + pointer.y * 8,
                rotateY: -16 + pointer.x * 12,
                y: [5, -6, 5],
              }
        }
        transition={{
          rotateX: { type: "spring", stiffness: 120, damping: 18 },
          rotateY: { type: "spring", stiffness: 120, damping: 18 },
          y: {
            duration: 5.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <div className="absolute inset-2 rounded-full border border-border/70 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.82),rgba(31,53,77,0.16))] dark:bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.12),rgba(232,220,200,0.08))]" />
      </motion.div>

      <motion.div
        className="absolute bottom-[18%] right-[18%] flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-border bg-background/80 shadow-[0_22px_40px_-26px_rgba(0,0,0,0.28)]"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reducedMotion
            ? undefined
            : {
                rotateX: -12 + pointer.y * 9,
                rotateY: -8 + pointer.x * 13,
                y: [0, -8, 0],
              }
        }
        transition={{
          rotateX: { type: "spring", stiffness: 120, damping: 18 },
          rotateY: { type: "spring", stiffness: 120, damping: 18 },
          y: {
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <Waypoints className="size-8 text-foreground/70" />
      </motion.div>

      <motion.div
        className="relative mx-auto mt-16 flex max-w-[21rem] flex-col items-center rounded-[2rem] border border-border bg-background/84 px-6 py-7 text-center shadow-[0_28px_70px_-36px_rgba(0,0,0,0.28)]"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reducedMotion
            ? undefined
            : {
                rotateX: -pointer.y * 8,
                rotateY: pointer.x * 14,
                y: builderMode ? [-3, 3, -3] : [-1, 4, -1],
              }
        }
        transition={{
          rotateX: { type: "spring", stiffness: 100, damping: 18 },
          rotateY: { type: "spring", stiffness: 100, damping: 18 },
          y: {
            duration: builderMode ? 3.8 : 5.2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-foreground text-background">
          <Box className="size-5" />
        </div>
        <p className="section-kicker">Studio World</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">
          Builder mode
        </h3>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          A playful layer for people who poke around. Hidden tokens and classic
          keyboard rituals both work here.
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <StatusChip
            icon={<Sparkles className="size-3.5" />}
            label={`${foundCount}/${COLLECTIBLES.length} signals found`}
          />
          <StatusChip
            icon={<Trophy className="size-3.5" />}
            label={
              builderMode ? "builder mode unlocked" : "hidden inputs accepted"
            }
            highlighted={builderMode}
          />
        </div>
      </motion.div>

      {COLLECTIBLES.map((item, index) => {
        const discovered = found.includes(item.id);

        return (
          <motion.button
            key={item.id}
            type="button"
            aria-label={item.label}
            onClick={() => collectToken(item.id)}
            className={cn(
              "absolute z-10 rounded-full border border-border bg-background/80 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-foreground/78 shadow-[0_16px_36px_-26px_rgba(0,0,0,0.28)] backdrop-blur-sm transition",
              item.position,
              discovered && "opacity-35",
            )}
            style={{ transformStyle: "preserve-3d" }}
            animate={
              reducedMotion
                ? undefined
                : {
                    rotateX: pointer.y * 6,
                    rotateY: pointer.x * item.depth,
                    y: [0, index % 2 === 0 ? -8 : 7, 0],
                    z: discovered ? -24 : 0,
                  }
            }
            transition={{
              rotateX: { type: "spring", stiffness: 120, damping: 18 },
              rotateY: { type: "spring", stiffness: 120, damping: 18 },
              y: {
                duration: 4.6 + index,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
              z: { type: "spring", stiffness: 130, damping: 18 },
            }}
          >
            {item.title}
          </motion.button>
        );
      })}

      <div className="pointer-events-none absolute inset-x-5 bottom-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        <span>Collect the hidden tokens</span>
        <span>Try the classics</span>
      </div>
    </div>
  );
}

function StatusChip({
  icon,
  label,
  highlighted = false,
}: {
  icon: React.ReactNode;
  label: string;
  highlighted?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
        highlighted && "bg-foreground text-background",
      )}
    >
      {icon}
      {label}
    </span>
  );
}

export { HeroPlayground };
