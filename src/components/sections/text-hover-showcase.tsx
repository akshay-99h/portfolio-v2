"use client";

import { SectionContainer } from "@/components/layout/section-container";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

const CLIENT_PLACEHOLDERS = [
  "Orion Labs",
  "Northline",
  "ScaleForge",
  "Peak Commerce",
  "Nova Ledger",
  "Atlas Systems",
];

function TextHoverShowcase() {
  return (
    <SectionContainer className="pt-8 sm:pt-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background/72 px-4 py-8 backdrop-blur-sm sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.7),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(31,53,77,0.12),transparent_34%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(232,220,200,0.08),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(18,29,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(18,29,42,0.05)_1px,transparent_1px)] bg-[size:42px_42px] dark:bg-[linear-gradient(to_right,rgba(238,242,247,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,242,247,0.04)_1px,transparent_1px)]" />
        <p className="section-kicker relative z-10 text-center">Past clients</p>
        <div className="relative z-10 mt-3 h-44 sm:h-52">
          <TextHoverEffect text="AKXOST" />
        </div>
        <div className="relative z-10 mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CLIENT_PLACEHOLDERS.map((client) => (
            <div
              key={client}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-background/78 px-3 py-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-background"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-border bg-foreground text-[11px] font-semibold tracking-[0.08em] text-background">
                {client
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <p className="truncate text-xs font-medium tracking-[0.05em] text-foreground/74 transition group-hover:text-foreground">
                {client}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

export { TextHoverShowcase };
