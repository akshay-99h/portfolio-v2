import type * as React from "react";

import { cn } from "@/lib/utils";

const GRADIENT_TOKENS: Record<string, string> = {
  "blue-500": "#3b82f6",
  "blue-600": "#2563eb",
  "blue-700": "#1d4ed8",
  "purple-600": "#7c3aed",
  "purple-700": "#6d28d9",
  "green-500": "#22c55e",
  "emerald-600": "#059669",
  "orange-500": "#f97316",
  "orange-600": "#ea580c",
  "red-600": "#dc2626",
  "cyan-500": "#06b6d4",
  "violet-500": "#8b5cf6",
  "pink-500": "#ec4899",
  "rose-600": "#e11d48",
  "indigo-500": "#6366f1",
  "amber-500": "#f59e0b",
};

const DEFAULT_FROM = "#1f6feb";
const DEFAULT_TO = "#0ea5e9";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type ProjectThumbnailProps = {
  title: string;
  year?: number;
  gradientFrom: string;
  gradientTo: string;
  label?: string;
  className?: string;
};

function ProjectThumbnail({
  title,
  year,
  gradientFrom,
  gradientTo,
  label,
  className,
}: ProjectThumbnailProps) {
  const fromColor = GRADIENT_TOKENS[gradientFrom] ?? DEFAULT_FROM;
  const toColor = GRADIENT_TOKENS[gradientTo] ?? DEFAULT_TO;
  const displayLabel = label ?? `~/projects/${toSlug(title)}`;

  return (
    <div
      data-slot="project-thumbnail"
      className={cn(
        "group relative aspect-[16/9] w-full overflow-hidden rounded-[1.5rem] border border-border",
        "bg-[linear-gradient(135deg,var(--thumb-from),var(--thumb-to))]",
        "shadow-[0_18px_44px_-30px_rgba(0,0,0,0.22)]",
        className,
      )}
      style={
        {
          "--thumb-from": fromColor,
          "--thumb-to": toColor,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-70",
          "bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)]",
          "bg-[size:24px_24px]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(12,18,26,0.62))]" />
      <div className="absolute left-4 top-4 flex items-center gap-2 text-[11px] font-mono text-white/85">
        <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs font-mono text-white/90">
            {displayLabel}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/60">
            build #{Math.abs(title.length * 37)}
          </p>
        </div>
        {year ? (
          <span className="rounded-full border border-white/30 bg-black/20 px-2.5 py-1 text-[10px] font-mono text-white/90 backdrop-blur-sm">
            {year}
          </span>
        ) : null}
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.12))]" />
      </div>
    </div>
  );
}

export { ProjectThumbnail };
export type { ProjectThumbnailProps };
