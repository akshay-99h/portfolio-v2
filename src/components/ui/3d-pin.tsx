"use client";

import { motion } from "motion/react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type PinContainerProps = {
  children: React.ReactNode;
  title?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
};

function PinContainer({
  children,
  title = "OPEN SECTION",
  href = "/",
  className,
  containerClassName,
}: PinContainerProps) {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Link
      href={href}
      className={cn(
        "group/pin relative block h-full [perspective:1200px]",
        containerClassName,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        animate={
          isHovering
            ? { rotateX: 30, scale: 0.975, y: -12 }
            : { rotateX: 0, scale: 1, y: 0 }
        }
        transition={{
          duration: 0.48,
          ease: [0.2, 0.85, 0.2, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        className={cn("relative h-full", className)}
      >
        {children}
      </motion.div>
      <PinPerspective title={title} isHovering={isHovering} />
    </Link>
  );
}

type PinPerspectiveProps = {
  title: string;
  isHovering: boolean;
};

function PinPerspective({ title, isHovering }: PinPerspectiveProps) {
  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? -8 : 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="pointer-events-none absolute inset-0 z-[60] flex items-start justify-center"
    >
      <div className="relative mt-2 h-28 w-full">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div className="relative rounded-full border border-[#9fd8ff]/45 bg-[rgba(7,22,46,0.94)] px-4 py-1 text-[10px] font-semibold tracking-[0.2em] text-[#d8f1ff]">
            {title}
            <span className="absolute -bottom-px left-[1.1rem] h-px w-[calc(100%-2.2rem)] bg-gradient-to-r from-transparent via-[#8ae1ff] to-transparent opacity-70" />
          </div>
        </div>

        <div className="absolute bottom-[0.85rem] left-1/2 -translate-x-1/2">
          <motion.div
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6fd7ff]/10"
            animate={{
              opacity: isHovering ? [0, 0.75, 0] : 0,
              scale: [0.6, 1.1, 1.35],
            }}
            transition={{
              duration: 2.1,
              repeat: isHovering ? Infinity : 0,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8fd9ff]/12"
            animate={{
              opacity: isHovering ? [0, 0.7, 0] : 0,
              scale: [0.55, 1.05, 1.25],
            }}
            transition={{
              duration: 2.1,
              repeat: isHovering ? Infinity : 0,
              ease: "easeOut",
              delay: 0.65,
            }}
          />
          <motion.div
            className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-cyan-400/80 blur-[1px]"
            animate={{ height: isHovering ? 62 : 26 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
          <motion.div
            className="absolute bottom-[0.35rem] left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-cyan-300"
            animate={{
              opacity: isHovering ? 1 : 0.25,
              scale: isHovering ? 1 : 0.8,
            }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export { PinContainer };
