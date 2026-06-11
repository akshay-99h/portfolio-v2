import type * as React from "react";

import { cn } from "@/lib/utils";

const DOTS = ["#ff5f56", "#ffbd2e", "#27c93f"] as const;

type TerminalProps = {
  title?: string;
  prompt?: string;
  children: React.ReactNode;
  className?: string;
};

function Terminal({
  title = "terminal",
  prompt = "$",
  children,
  className,
}: TerminalProps) {
  return (
    <div
      data-slot="terminal"
      className={cn(
        "overflow-hidden rounded-3xl border border-[var(--terminal-border)] bg-[var(--terminal-bg)]",
        "text-[var(--terminal-text)] shadow-[0_36px_90px_-62px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--terminal-border)] px-5 py-3.5">
        <div className="flex items-center gap-2">
          {DOTS.map((color) => (
            <span
              key={color}
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <p className="text-xs font-mono text-[var(--terminal-text)]/80">
          {title}
        </p>
        <span className="h-2 w-8" aria-hidden />
      </div>
      <div className="space-y-4 px-5 py-5 font-mono text-sm text-[var(--terminal-text)]/90">
        {prompt ? (
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--terminal-text)]/55">
            {prompt}
          </div>
        ) : null}
        <div className="space-y-3 text-[13px] leading-relaxed text-[var(--terminal-text)]/80">
          {children}
        </div>
      </div>
    </div>
  );
}

export { Terminal };
export type { TerminalProps };
