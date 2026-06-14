"use client";

import * as React from "react";

/**
 * Reports whether the viewport is phone-sized. SSR-safe: starts `null` until
 * mounted so server and first client render agree (avoids hydration flicker),
 * then resolves to a boolean and tracks changes.
 *
 * The breakpoint matches the GSAP matchMedia split used by the hero
 * (`max-width: 1023.98px`) so the static fallback and the live WebGL scene
 * never both try to own the cube at the same width.
 */
const MOBILE_QUERY = "(max-width: 1023.98px)";

export function useIsMobile(): boolean | null {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}
