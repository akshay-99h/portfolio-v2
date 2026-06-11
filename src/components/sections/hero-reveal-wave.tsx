"use client";

import {
  Cloud,
  Database,
  GitBranch,
  Globe,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroRevealWaveProps = {
  highlights: readonly string[];
  location: string;
};

function InfraBadge({
  icon,
  label,
  tone,
  x,
  y,
  delay = 0,
  isDark,
  mouse,
}: {
  icon: React.ReactNode;
  label: string;
  tone: string;
  x: number;
  y: number;
  delay?: number;
  isDark: boolean;
  mouse: { x: number; y: number; active: boolean };
}) {
  const [popToken, setPopToken] = React.useState(0);
  const dx = x - mouse.x;
  const dy = y - mouse.y;
  const distance = Math.hypot(dx, dy);
  const repulseStrength =
    mouse.active && distance < 16 ? ((16 - distance) / 16) * 22 : 0;
  const repulseX = distance > 0 ? (dx / distance) * repulseStrength : 0;
  const repulseY = distance > 0 ? (dy / distance) * repulseStrength : 0;

  return (
    <motion.div
      className="group absolute flex items-center justify-center"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: repulseX,
        y: repulseY,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 18, mass: 0.8 }}
    >
      <motion.button
        type="button"
        className={cn(
          "relative flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center transition-transform duration-200 ease-out group-hover:scale-[1.14]",
        )}
        onClick={() => setPopToken((value) => value + 1)}
        whileTap={{ scale: 0.96 }}
        animate={{
          x: [0, 9, -6, 0],
          y: [0, -14, 10, 0],
          rotate: [0, 2.5, -2, 0],
          opacity: [0.92, 1, 0.94, 0.92],
          scale: popToken ? [1, 1.16, 0.97, 1] : [1, 1.02, 1],
        }}
        transition={{
          x: { duration: 8 + delay, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 8 + delay, repeat: Infinity, ease: "easeInOut" },
          rotate: {
            duration: 8 + delay,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 8 + delay,
            repeat: Infinity,
            ease: "easeInOut",
          },
          scale: popToken
            ? { duration: 0.34, ease: [0.23, 1, 0.32, 1] }
            : { duration: 8 + delay, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          color: tone,
          filter: `drop-shadow(0 0 22px color-mix(in oklab, ${tone} 40%, transparent))`,
        }}
      >
        <div
          className={cn(
            "scale-[2.25] transition-transform duration-200 ease-out group-hover:scale-[2.45]",
            isDark ? "opacity-95" : "opacity-90",
          )}
          title={label}
        >
          {icon}
        </div>
      </motion.button>
    </motion.div>
  );
}

function HeroDepthBackground({ isDark }: { isDark: boolean }) {
  const [mouse, setMouse] = React.useState({ x: 50, y: 50, active: false });

  return (
    <div
      className="absolute inset-0 overflow-hidden [perspective:1600px]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
          active: true,
        });
      }}
      onPointerLeave={() => setMouse((value) => ({ ...value, active: false }))}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          isDark
            ? "bg-[radial-gradient(circle_at_50%_32%,rgba(29,169,163,0.12),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.04),transparent_14%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_16%)]"
            : "bg-[radial-gradient(circle_at_50%_32%,rgba(29,169,163,0.08),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(17,17,17,0.04),transparent_12%),linear-gradient(180deg,rgba(255,255,255,0.26),transparent_18%)]",
        )}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-20",
          isDark
            ? "bg-[radial-gradient(circle,_white_1px,_transparent_1px)]"
            : "bg-[radial-gradient(circle,_black_1px,_transparent_1px)]",
          "[background-size:22px_22px]",
        )}
      />

      <motion.div
        className={cn(
          "pointer-events-none absolute left-1/2 top-[50%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl",
          isDark ? "bg-[rgba(29,169,163,0.12)]" : "bg-[rgba(29,169,163,0.08)]",
        )}
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.72, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.2}
        icon={<Globe className="size-4" />}
        label="Edge"
        tone="#22c7c3"
        x={12}
        y={20}
      />

      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.6}
        icon={<Layers3 className="size-4" />}
        label="App"
        tone="#8b7bff"
        x={20}
        y={34}
      />

      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.4}
        icon={<Workflow className="size-4" />}
        label="APIs"
        tone="#5fa7ff"
        x={88}
        y={22}
      />

      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.8}
        icon={<ShieldCheck className="size-4" />}
        label="Auth"
        tone="#71d39b"
        x={14}
        y={50}
      />

      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.3}
        icon={<Database className="size-4" />}
        label="Data"
        tone="#f0b35d"
        x={86}
        y={48}
      />

      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.9}
        icon={<Cloud className="size-4" />}
        label="Infra"
        tone="#22c7c3"
        x={18}
        y={72}
      />

      <InfraBadge
        isDark={isDark}
        mouse={mouse}
        delay={0.5}
        icon={<GitBranch className="size-4" />}
        label="Delivery"
        tone="#ff8f74"
        x={84}
        y={70}
      />
    </div>
  );
}

function HeroRevealWave({ highlights, location }: HeroRevealWaveProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const logoSrc = isDark
    ? "/brand/akxost-dark-cutout.png"
    : "/brand/akxost-light-cutout.png";

  return (
    <section className="relative left-1/2 flex min-h-[calc(100vh-4.5rem)] w-screen -translate-x-1/2 items-center justify-center overflow-hidden text-center">
      <HeroDepthBackground isDark={isDark} />

      <div className="relative z-10 flex min-h-[calc(100vh-4.5rem)] w-full items-center justify-center px-6 py-10 sm:px-10">
        <div className="relative flex h-[80vh] min-h-[620px] w-full max-w-[1480px] flex-col items-center justify-center overflow-hidden">
          <div className="absolute top-[clamp(1.15rem,2.5vh,2rem)] left-1/2 flex w-full max-w-[980px] -translate-x-1/2 justify-center px-4">
            <p className="max-w-[34rem] text-balance text-xs font-medium uppercase tracking-[0.22em] text-[color:var(--chart-1)] sm:text-sm">
              Strategy, build, systems, launch support.
            </p>
          </div>

          <div className="relative flex w-full flex-1 items-center justify-center px-4">
            <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-center">
              <div className="relative aspect-[2.1/1] w-full max-w-[1160px] sm:max-w-[1220px] lg:max-w-[1280px]">
                <Image
                  src={logoSrc}
                  alt="Akxost Studio"
                  fill
                  priority
                  sizes="100vw"
                  className={cn(
                    "object-contain",
                    isDark
                      ? "brightness-[1.02] contrast-[1.03]"
                      : "saturate-[1.05] brightness-[1] contrast-[1.02]",
                  )}
                />
              </div>

              <div className="mt-0 flex max-w-[1120px] flex-wrap justify-center gap-2 sm:mt-1">
                {highlights.map((item) => (
                  <Badge
                    key={item}
                    variant="ghost"
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] backdrop-blur-sm",
                      isDark
                        ? "border-white/10 bg-white/[0.03] text-foreground"
                        : "border-black/10 bg-white/50 text-foreground",
                    )}
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button asChild>
                  <Link href="/contact">Discuss a project</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">Recent work</Link>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                <span>{location}</span>
                <span>Senior-led delivery</span>
                <span>New builds / rebuilds / systems</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroRevealWave };
