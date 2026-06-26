"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

type ThemeSpotlightLogoProps = {
  className?: string;
  imageClassName?: string;
  logoClassName?: string;
  priority?: boolean;
  variant?: "default" | "hero";
};

function ThemeSpotlightLogo({
  className,
  imageClassName,
  logoClassName,
  priority = false,
  variant = "default",
}: ThemeSpotlightLogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [spotlight, setSpotlight] = React.useState({ x: 50, y: 50 });

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const baseLogo = isDark
    ? "/brand/akxost-dark-cutout.png"
    : "/brand/akxost-light-cutout.png";
  const revealLogo = isDark
    ? "/brand/akxost-light-cutout.png"
    : "/brand/akxost-dark-cutout.png";
  const isHero = variant === "hero";

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setSpotlight({ x, y });
  }

  const mask = hovered
    ? `radial-gradient(circle ${isHero ? "540px" : "110px"} at ${spotlight.x}% ${spotlight.y}%, black 0, rgba(0,0,0,0.98) ${isHero ? "18%" : "26%"}, rgba(0,0,0,0.88) ${isHero ? "34%" : "44%"}, rgba(0,0,0,0.45) ${isHero ? "56%" : "60%"}, rgba(0,0,0,0.16) ${isHero ? "72%" : "70%"}, transparent ${isHero ? "92%" : "78%"})`
    : "radial-gradient(circle 0px at 50% 50%, black 0, transparent 0)";

  const baseBlendClass = isDark ? "mix-blend-screen" : "mix-blend-multiply";
  const baseToneClass = isDark
    ? "brightness-[1.04] contrast-[1.06] saturate-0"
    : "brightness-[0.99] contrast-[1.02]";
  const revealBlendClass = isDark
    ? "invert mix-blend-screen brightness-[1.08] contrast-[1.08]"
    : "invert mix-blend-multiply brightness-[0.98] contrast-[1.08]";

  return (
    <div
      className={cn(
        "group relative block select-none overflow-hidden",
        isHero
          ? "rounded-[3rem] px-6 py-12 sm:px-10 sm:py-18"
          : "rounded-[1.2rem]",
        className,
      )}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      aria-hidden="true"
    >
      {isHero ? (
        <>
          <div className="pointer-events-none absolute inset-[-12%] bg-[radial-gradient(circle_at_center,rgba(29,169,163,0.16),transparent_58%)]" />
          <div
            className="pointer-events-none absolute inset-[-18%] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 920px at ${spotlight.x}% ${spotlight.y}%, rgba(29,169,163,0.14), rgba(29,169,163,0.08) 24%, rgba(29,169,163,0.03) 46%, transparent 82%)`,
            }}
          />
          <div
            className="pointer-events-none absolute inset-[-18%] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 760px at ${spotlight.x}% ${spotlight.y}%, color-mix(in oklab, var(--foreground) 5%, transparent), transparent 86%)`,
            }}
          />
        </>
      ) : null}
      <div
        className={cn(
          "relative mx-auto aspect-[2.1/1] w-full",
          isHero ? "max-w-[620px]" : "",
          logoClassName,
        )}
      >
        <Image
          src={baseLogo}
          alt="Akxost"
          fill
          priority={priority}
          sizes="(max-width: 640px) 220px, 280px"
          className={cn(
            "object-contain",
            baseBlendClass,
            baseToneClass,
            imageClassName,
          )}
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            WebkitMaskImage: mask,
            maskImage: mask,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <Image
            src={revealLogo}
            alt=""
            fill
            sizes="(max-width: 640px) 220px, 280px"
            className={cn(
              "object-contain saturate-0",
              revealBlendClass,
              imageClassName,
            )}
          />
        </div>
        {!isHero ? (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 110px at ${spotlight.x}% ${spotlight.y}%, color-mix(in oklab, var(--foreground) 12%, transparent), transparent 72%)`,
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

export { ThemeSpotlightLogo };
