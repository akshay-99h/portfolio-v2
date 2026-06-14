"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import * as React from "react";

import { registerScrollController } from "@/lib/scroll-lock";

gsap.registerPlugin(ScrollTrigger);

type LenisProviderProps = {
  children: React.ReactNode;
};

/**
 * Site-wide smooth scroll, synced to the GSAP ticker so ScrollTrigger
 * scenes scrub against the same clock. Disabled entirely for users who
 * prefer reduced motion - native scrolling remains untouched.
 */
function LenisProvider({ children }: LenisProviderProps) {
  React.useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Native scroll stays untouched, but the mobile nav still needs a way
      // to stop/start page scroll, handled by the <html> overflow toggle.
      registerScrollController({
        stop: () => {},
        start: () => {},
      });
      return () => registerScrollController(null);
    }

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.115,
    });

    lenis.on("scroll", ScrollTrigger.update);

    registerScrollController({
      stop: () => lenis.stop(),
      start: () => lenis.start(),
    });

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      registerScrollController(null);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}

export { LenisProvider };
