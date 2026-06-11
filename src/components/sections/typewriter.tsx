"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TypewriterProps = {
  words: string[];
  className?: string;
};

function Typewriter({ words, className }: TypewriterProps) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState(words[0] ?? "");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    function handleChange() {
      setReducedMotion(mediaQuery.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  React.useEffect(() => {
    if (reducedMotion) return;
    const word = words[index % words.length] ?? "";
    const timeout = window.setTimeout(
      () => {
        if (!isDeleting) {
          const next = word.slice(0, display.length + 1);
          setDisplay(next);
          if (next === word) {
            setIsDeleting(true);
          }
        } else {
          const next = word.slice(0, display.length - 1);
          setDisplay(next);
          if (next.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 45 : 80,
    );

    return () => window.clearTimeout(timeout);
  }, [display, index, isDeleting, reducedMotion, words]);

  if (reducedMotion) {
    return <span className={className}>{words[0] ?? ""}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span>{display}</span>
      <span className="h-5 w-[2px] animate-pulse bg-foreground/70" />
    </span>
  );
}

export { Typewriter };
export type { TypewriterProps };
