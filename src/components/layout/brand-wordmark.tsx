import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The brand glyph: an isometric cube in the signal color.
 * Pulled from the Akxost logotype — the cube is the studio's whole
 * pitch in one shape: a drawing that became an object.
 */
function CubeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 28"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {/* top face */}
      <path d="M12 2 22 8 12 14 2 8Z" fill="var(--signal)" />
      {/* left face */}
      <path d="M2 8 12 14v12L2 20Z" fill="var(--signal)" opacity="0.72" />
      {/* right face */}
      <path d="M22 8 12 14v12l10-6Z" fill="var(--signal)" opacity="0.45" />
    </svg>
  );
}

type BrandWordmarkProps = {
  className?: string;
  href?: string;
  /** Adds the letterspaced studio line under the logotype. */
  withTagline?: boolean;
};

function BrandWordmark({
  className,
  href = "/",
  withTagline = false,
}: BrandWordmarkProps) {
  const content = (
    <span className={cn("inline-block uppercase text-foreground", className)}>
      <span className="flex items-center gap-[0.34em]">
        <CubeMark className="h-[0.74em] w-auto -translate-y-[0.04em]" />
        <span className="font-display text-[1em] leading-none font-black tracking-[-0.06em]">
          Akxost
        </span>
      </span>
      {withTagline ? (
        <span className="dim-label mt-[0.55em] block pl-[0.08em] text-[0.26em] tracking-[0.42em]">
          Product Engineering Studio
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="inline-block">
      {content}
    </Link>
  );
}

export { BrandWordmark, CubeMark };
