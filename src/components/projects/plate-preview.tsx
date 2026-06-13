import type * as React from "react";

import type { PreviewFont, Project, ProjectPreview } from "@/types/project";

/** Closest system stand-ins for each project's real display face. */
const FONT_STACKS: Record<PreviewFont, string> = {
  sans: 'ui-sans-serif, system-ui, "Segoe UI", sans-serif',
  serif: 'ui-serif, Georgia, "Times New Roman", serif',
  rounded: 'ui-rounded, "Avenir Next", "Trebuchet MS", system-ui, sans-serif',
  mono: "var(--font-jetbrains-mono), ui-monospace, monospace",
};

const ELEVATION_LABEL: Record<ProjectPreview["frame"], string> = {
  phone: "ELEV. MOBILE",
  browser: "ELEV. WEB",
  desktop: "ELEV. DESKTOP",
  note: "SPEC. NATIVE",
};

/** Primary/secondary CTA pills, with real labels when the page has them. */
function MiniCtas({ preview }: { preview: ProjectPreview }) {
  const { accent, bg, fg, cta, cta2 } = preview;

  if (!cta) {
    return (
      <div className="flex items-center gap-1">
        <span
          className="h-[9px] w-9 rounded-full"
          style={{ background: accent }}
        />
        <span
          className="h-[9px] w-7 rounded-full border"
          style={{ borderColor: `${fg}40` }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1">
      <span
        className="rounded-full px-1.5 py-[2.5px] text-[0.4rem] font-semibold whitespace-nowrap"
        style={{ background: accent, color: bg }}
      >
        {cta}
      </span>
      {cta2 ? (
        <span
          className="rounded-full border px-1.5 py-[2.5px] text-[0.4rem] whitespace-nowrap"
          style={{ borderColor: `${fg}40` }}
        >
          {cta2}
        </span>
      ) : null}
    </div>
  );
}

/** Hero copy column: kicker → headline → sub → CTAs, like the real page. */
function MiniHeroCopy({ preview }: { preview: ProjectPreview }) {
  const { accent, fg, kicker, headline, sub } = preview;

  return (
    <div className="relative min-w-0 flex-1">
      {kicker ? (
        <p
          className="mb-0.5 truncate text-[0.38rem] font-semibold tracking-[0.12em] uppercase"
          style={{ color: accent }}
        >
          {kicker}
        </p>
      ) : null}
      <p className="line-clamp-3 text-[0.58rem] leading-[1.25] font-semibold tracking-[-0.01em]">
        {headline}
      </p>
      {sub ? (
        <p
          className="mt-0.5 line-clamp-2 text-[0.42rem] leading-[1.35]"
          style={{ color: `${fg}b3` }}
        >
          {sub}
        </p>
      ) : (
        <div className="mt-1.5 h-[3px] w-7" style={{ background: accent }} />
      )}
      <div className="mt-1.5">
        <MiniCtas preview={preview} />
      </div>
    </div>
  );
}

/** Tiny feature chips ("Replies", "Openers", …) under the hero. */
function MiniChips({ preview }: { preview: ProjectPreview }) {
  const { fg, chips } = preview;
  if (!chips?.length) {
    return null;
  }
  return (
    <div className="mt-1 flex flex-wrap gap-0.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border px-1 py-[1px] text-[0.35rem] whitespace-nowrap"
          style={{ borderColor: `${fg}26`, color: `${fg}99` }}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

/** Phone shell mockup — the device elevation the real pages show. */
function MiniDevice({ preview }: { preview: ProjectPreview }) {
  const { bg, fg, accent, muted } = preview;
  return (
    <div
      className="relative h-[6.2rem] w-[3rem] shrink-0 rounded-[9px] border"
      style={{
        borderColor: `${fg}59`,
        background: `color-mix(in srgb, ${bg}, #ffffff 45%)`,
      }}
    >
      <div
        className="mx-auto mt-1 h-[3px] w-2.5 rounded-full"
        style={{ background: `${fg}33` }}
      />
      <div className="mx-1.5 mt-1.5 space-y-1">
        <div
          className="h-[5px] w-4/5 rounded-full"
          style={{ background: `${fg}cc` }}
        />
        <div
          className="h-[4px] rounded-full"
          style={{ background: `${fg}40` }}
        />
        <div
          className="h-[4px] w-3/4 rounded-full"
          style={{ background: `${fg}40` }}
        />
        <div
          className="h-5 rounded-[4px]"
          style={{ background: `${muted}4d`, border: `1px solid ${fg}1f` }}
        />
      </div>
      <div className="absolute inset-x-1.5 bottom-1 flex justify-between">
        <span
          className="size-[5px] rounded-full"
          style={{ background: accent }}
        />
        <span
          className="size-[5px] rounded-full"
          style={{ background: `${fg}33` }}
        />
        <span
          className="size-[5px] rounded-full"
          style={{ background: `${fg}33` }}
        />
        <span
          className="size-[5px] rounded-full"
          style={{ background: `${fg}33` }}
        />
      </div>
    </div>
  );
}

/** Side visual matched to what the real start page draws there. */
function MiniArt({ preview }: { preview: ProjectPreview }) {
  const { fg, accent, muted } = preview;
  const art = preview.art ?? "card";

  if (art === "device") {
    return <MiniDevice preview={preview} />;
  }

  if (art === "carousel") {
    // Rotating promo slides with dot indicators.
    return (
      <div className="relative w-[4.6rem] shrink-0">
        <div
          className="rounded-[4px] border p-1"
          style={{ background: `${muted}66`, borderColor: `${fg}1f` }}
        >
          <div
            className="h-7 rounded-[3px]"
            style={{ background: `${accent}26` }}
          />
          <div
            className="mt-1 h-[4px] w-3/4 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <div
            className="mt-0.5 h-[4px] w-1/2 rounded-full"
            style={{ background: accent }}
          />
        </div>
        <div className="mt-1 flex justify-center gap-0.5">
          <span
            className="h-[3px] w-2 rounded-full"
            style={{ background: accent }}
          />
          <span
            className="size-[3px] rounded-full"
            style={{ background: `${fg}33` }}
          />
          <span
            className="size-[3px] rounded-full"
            style={{ background: `${fg}33` }}
          />
        </div>
      </div>
    );
  }

  if (art === "chat") {
    // Assistant thread: user bubble, reply, input bar with mic.
    return (
      <div className="w-[4.6rem] shrink-0 space-y-1">
        <div
          className="ml-auto h-[9px] w-3/5 rounded-[4px] rounded-tr-[1px]"
          style={{ background: `${accent}33` }}
        />
        <div
          className="h-[14px] w-4/5 rounded-[4px] rounded-tl-[1px]"
          style={{ background: `${muted}99` }}
        />
        <div
          className="h-[6px] w-3/5 rounded-full"
          style={{ background: `${fg}1f` }}
        />
        <div className="flex items-center gap-1 pt-0.5">
          <span
            className="h-[10px] flex-1 rounded-full border"
            style={{ borderColor: `${fg}33` }}
          />
          <span
            className="size-[10px] rounded-full"
            style={{ background: accent }}
          />
        </div>
      </div>
    );
  }

  // Default: media card stack.
  return (
    <div className="relative w-[4.2rem] shrink-0 space-y-1">
      <div
        className="h-8 rounded-[3px]"
        style={{ background: `${muted}73`, border: `1px solid ${fg}1f` }}
      />
      <div
        className="h-[5px] w-4/5 rounded-full"
        style={{ background: accent }}
      />
      <div className="h-[5px] rounded-full" style={{ background: `${fg}26` }} />
    </div>
  );
}

/**
 * Miniature of the project's real entry page, drawn from its own
 * globals.css palette, hero copy, and start-page chrome. No screenshots —
 * the studio redraws each landing at plate scale.
 */
function PreviewViewport({ project }: { project: Project }) {
  const preview = project.preview;
  const { bg, fg, accent, muted, headline } = preview;
  const brand = preview.brand ?? project.name;
  const base: React.CSSProperties = {
    background: bg,
    color: fg,
    fontFamily: FONT_STACKS[preview.font],
  };

  if (preview.frame === "phone") {
    // Split hero: copy left, device elevation right — like the real pages.
    return (
      <div
        className="relative flex h-full flex-col overflow-hidden"
        style={base}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at 0% 0%, ${accent}24, transparent 62%)`,
          }}
        />
        <div className="relative flex items-center justify-between px-3 pt-1.5">
          <span className="text-[0.46rem] font-bold tracking-[-0.01em]">
            {brand}
          </span>
          <span className="flex items-center gap-1">
            <span
              className="h-[3px] w-3 rounded-full"
              style={{ background: `${fg}33` }}
            />
            <span
              className="h-[3px] w-3 rounded-full"
              style={{ background: `${fg}33` }}
            />
          </span>
        </div>
        <div className="relative flex min-h-0 flex-1 items-center gap-2.5 px-3 pb-1.5">
          <div className="min-w-0 flex-1">
            <MiniHeroCopy preview={preview} />
            <MiniChips preview={preview} />
          </div>
          <MiniDevice preview={preview} />
        </div>
      </div>
    );
  }

  if (preview.frame === "browser") {
    const domain = project.link?.label ?? `${project.slug}.akxost.com`;
    const art = preview.art ?? "card";

    return (
      <div className="flex h-full flex-col overflow-hidden" style={base}>
        <div
          className="flex items-center gap-1 border-b px-2 py-1"
          style={{ borderColor: `${fg}1f` }}
        >
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: accent }}
          />
          <span
            className="ml-1.5 flex h-[9px] max-w-[9rem] items-center truncate rounded-full px-1.5 font-mono text-[0.36rem]"
            style={{ background: `${fg}12`, color: `${fg}8c` }}
          >
            {domain}
          </span>
        </div>

        {art === "arena" ? (
          // Game start screen: HUD strip, centered call to action, ground line.
          <div className="relative flex min-h-0 flex-1 flex-col px-2.5 py-1.5">
            <div className="flex flex-wrap gap-0.5">
              {(preview.chips ?? []).map((chip) => (
                <span
                  key={chip}
                  className="rounded-[2px] border px-1 py-[1px] font-mono text-[0.33rem] whitespace-nowrap"
                  style={{ borderColor: `${fg}33`, color: `${fg}b3` }}
                >
                  {chip}
                </span>
              ))}
            </div>
            <div className="my-auto text-center">
              <p className="font-mono text-[0.64rem] font-bold tracking-[0.12em] uppercase">
                {headline}
              </p>
              {preview.sub ? (
                <p
                  className="mt-0.5 text-[0.38rem]"
                  style={{ color: `${fg}99` }}
                >
                  {preview.sub}
                </p>
              ) : null}
              {preview.cta ? (
                <span
                  className="mt-1 inline-block rounded-[2px] px-2 py-[2px] font-mono text-[0.42rem] font-bold tracking-[0.08em] uppercase"
                  style={{ background: accent, color: bg }}
                >
                  {preview.cta}
                </span>
              ) : null}
            </div>
            <div className="relative">
              <div className="h-[2px]" style={{ background: `${fg}40` }} />
              <span
                className="absolute bottom-[2px] left-4 size-2 rounded-[2px]"
                style={{ background: accent }}
              />
              <span
                className="absolute right-6 bottom-[2px] h-2.5 w-1 rounded-[1px]"
                style={{ background: `${fg}40` }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-3 pt-1.5">
              <span className="truncate text-[0.46rem] font-bold tracking-[-0.01em]">
                {brand}
              </span>
              <span className="flex shrink-0 items-center gap-1">
                <span
                  className="h-[3px] w-3 rounded-full"
                  style={{ background: `${fg}33` }}
                />
                <span
                  className="h-[3px] w-3 rounded-full"
                  style={{ background: `${fg}33` }}
                />
                <span
                  className="h-[3px] w-3 rounded-full"
                  style={{ background: `${fg}33` }}
                />
              </span>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center gap-2.5 px-3 pb-1.5">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 100% 0%, ${accent}1c, transparent 58%)`,
                }}
              />
              {art === "focus" ? (
                // Text-focused hero, stacked and centered — no side visual.
                <div className="relative mx-auto max-w-[12rem] text-center">
                  <p className="line-clamp-2 text-[0.6rem] leading-[1.25] font-semibold tracking-[-0.01em]">
                    {headline}
                  </p>
                  {preview.sub ? (
                    <p
                      className="mt-0.5 line-clamp-2 text-[0.42rem] leading-[1.35]"
                      style={{ color: `${fg}b3` }}
                    >
                      {preview.sub}
                    </p>
                  ) : null}
                  <div className="mt-1.5 flex justify-center">
                    <MiniCtas preview={preview} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative min-w-0 flex-1">
                    <MiniHeroCopy preview={preview} />
                    <MiniChips preview={preview} />
                  </div>
                  <MiniArt preview={preview} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  if (preview.frame === "desktop") {
    // Three-pane app shell: nav rail, chat thread, context panel.
    return (
      <div className="flex h-full flex-col overflow-hidden" style={base}>
        <div
          className="flex items-center gap-1 border-b px-2 py-1"
          style={{ borderColor: `${fg}1f` }}
        >
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: `${fg}40` }}
          />
          <span
            className="size-1 rounded-full"
            style={{ background: accent }}
          />
          <span
            className="ml-1.5 truncate text-[0.4rem] font-semibold tracking-[0.08em] uppercase"
            style={{ color: `${fg}8c` }}
          >
            {brand}
          </span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div
            className="flex w-5 flex-col items-center gap-1.5 border-r py-1.5"
            style={{ borderColor: `${fg}1f` }}
          >
            <span
              className="size-1.5 rounded-[2px]"
              style={{ background: accent }}
            />
            <span
              className="size-1.5 rounded-[2px]"
              style={{ background: `${fg}33` }}
            />
            <span
              className="size-1.5 rounded-[2px]"
              style={{ background: `${fg}33` }}
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col px-2 py-1.5">
            <p
              className="text-[0.55rem] leading-[1.3] font-medium"
              style={{ color: muted }}
            >
              {headline}
            </p>
            <div className="mt-auto space-y-1">
              <div
                className="h-[7px] w-3/5 rounded-[3px]"
                style={{ background: `${fg}1f` }}
              />
              <div
                className="ml-auto h-[7px] w-2/5 rounded-[3px]"
                style={{ background: `${accent}59` }}
              />
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span
                className="h-[10px] flex-1 rounded-[3px] border"
                style={{ borderColor: `${fg}33` }}
              />
              <span
                className="size-[10px] rounded-[2px]"
                style={{ background: accent }}
              />
            </div>
          </div>
          <div
            className="w-7 space-y-1 border-l px-1 py-1.5"
            style={{ borderColor: `${fg}1f` }}
          >
            <div
              className="h-[4px] rounded-full"
              style={{ background: `${fg}26` }}
            />
            <div
              className="h-[4px] rounded-full"
              style={{ background: `${fg}26` }}
            />
            <div
              className="h-[4px] w-3/4 rounded-full"
              style={{ background: accent }}
            />
          </div>
        </div>
      </div>
    );
  }

  // "note": native builds with no web elevation — drawn as a spec card.
  return (
    <div
      className="flex h-full flex-col overflow-hidden px-3 py-2.5"
      style={base}
    >
      <p
        className="font-mono text-[0.45rem] font-bold tracking-[0.2em] uppercase"
        style={{ color: accent }}
      >
        Native build — no web elevation
      </p>
      <p className="mt-1 text-[0.58rem] leading-[1.35]">{headline}</p>
      <div className="mt-auto space-y-1">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-1.5">
            <span
              className="size-[7px] rounded-[2px]"
              style={
                row === 0
                  ? { background: accent }
                  : { border: `1px solid ${fg}40` }
              }
            />
            <span
              className="h-[4px] rounded-full"
              style={{
                background: `${fg}26`,
                width: `${56 - row * 12}%`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Drafting plate: project chrome around the themed miniature. */
function PlatePreview({
  project,
  plateLabel,
}: {
  project: Project;
  plateLabel: string;
}) {
  return (
    <div className="h-full w-full bg-card p-4">
      <div className="flex items-baseline justify-between gap-2">
        <span className="dim-label truncate text-[0.6rem]">
          {plateLabel} — {project.name}
        </span>
        <span className="dim-label text-[0.6rem]">{project.year}</span>
      </div>

      <div className="relative mt-3 h-[8.25rem] border border-border/80">
        <PreviewViewport project={project} />
        {/* Dimension tick */}
        <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1">
          <span className="h-px w-5 bg-[color:var(--signal)]" />
          <span className="dim-label text-[0.55rem] text-[color:var(--signal)]">
            {ELEVATION_LABEL[project.preview.frame]}
          </span>
        </div>
      </div>

      <p className="dim-label mt-3 text-[0.6rem]">{project.platform}</p>
    </div>
  );
}

export { PlatePreview, PreviewViewport };
