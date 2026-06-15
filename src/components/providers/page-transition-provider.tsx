"use client";

import { motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";

type Point = {
  x: number;
  y: number;
};

type TransitionKind = "route" | "theme";
type TransitionPhase = "cover" | "hold" | "reveal";
type TransitionTone = "light" | "dark";

type TransitionState = {
  href?: string;
  kind: TransitionKind;
  origin: Point;
  phase: TransitionPhase;
  tone: TransitionTone;
};

type PageTransitionContextValue = {
  transitionTheme: (nextTheme: "light" | "dark", origin?: Point) => void;
};

type PageTransitionProviderProps = {
  children: React.ReactNode;
};

const TOP_LEVEL_ROUTES = [
  "/",
  "/about",
  "/projects",
  "/tech",
  "/blog",
  "/contact",
];
const PageTransitionContext =
  React.createContext<PageTransitionContextValue | null>(null);

const COVER_DURATION_MS = 420;
const REVEAL_DELAY_MS = 80;

function getDefaultOrigin() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

function getRouteHref(href: string) {
  const url = new URL(href, window.location.href);
  return `${url.pathname}${url.search}${url.hash}`;
}

function getFarthestDistance(origin: Point) {
  const points = [
    { x: 0, y: 0 },
    { x: window.innerWidth, y: 0 },
    { x: 0, y: window.innerHeight },
    { x: window.innerWidth, y: window.innerHeight },
  ];

  return Math.max(
    ...points.map((point) =>
      Math.hypot(point.x - origin.x, point.y - origin.y),
    ),
  );
}

function DropTransitionOverlay({
  transition,
}: {
  transition: TransitionState;
}) {
  const radius = getFarthestDistance(transition.origin);
  const diameter = radius * 2;
  const x = transition.origin.x - radius;
  const y = transition.origin.y - radius;
  const coverScale = 1.04;
  const background =
    transition.tone === "dark"
      ? "rgba(5, 5, 5, 0.985)"
      : "rgba(244, 240, 232, 0.985)";
  const ring =
    transition.tone === "dark"
      ? "rgba(29, 169, 163, 0.52)"
      : "rgba(29, 169, 163, 0.34)";
  const glow =
    transition.tone === "dark"
      ? "rgba(29, 169, 163, 0.22)"
      : "rgba(29, 169, 163, 0.14)";

  const scale =
    transition.phase === "cover"
      ? coverScale
      : transition.phase === "hold"
        ? coverScale
        : 0;

  return (
    <div
      className="pointer-events-auto fixed inset-0 z-[140] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full"
        style={{
          width: diameter,
          height: diameter,
          left: x,
          top: y,
          background,
          boxShadow: `0 0 0 1px ${ring}, 0 0 120px ${glow}`,
          willChange: "transform",
        }}
        initial={{ scale: 0 }}
        animate={{ scale }}
        transition={{
          duration: transition.phase === "reveal" ? 0.52 : 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <motion.div
        className="absolute rounded-full border"
        style={{
          width: diameter,
          height: diameter,
          left: x,
          top: y,
          borderColor: ring,
        }}
        initial={{ scale: 0.2, opacity: 0.95 }}
        animate={{
          opacity: transition.phase === "reveal" ? 0 : 0.22,
          scale: transition.phase === "reveal" ? 1.02 : 0.92,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: diameter,
          height: diameter,
          left: x,
          top: y,
          background: `radial-gradient(circle, ${glow} 0%, transparent 62%)`,
          filter: "blur(18px)",
        }}
        initial={{ scale: 0.08, opacity: 0.95 }}
        animate={{
          scale: transition.phase === "reveal" ? 0.16 : 0.72,
          opacity: transition.phase === "reveal" ? 0 : 0.45,
        }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const { resolvedTheme, setTheme } = useTheme();
  const [transition, setTransition] = React.useState<TransitionState | null>(
    null,
  );
  const mountedRef = React.useRef(false);
  const pendingRouteRef = React.useRef<string | null>(null);
  const pendingThemeRef = React.useRef<"light" | "dark" | null>(null);
  const clearTimerRef = React.useRef<number | null>(null);
  const revealFallbackRef = React.useRef<number | null>(null);
  const activeRef = React.useRef(false);

  const clearTransition = React.useCallback(() => {
    activeRef.current = false;
    pendingRouteRef.current = null;
    pendingThemeRef.current = null;
    if (revealFallbackRef.current) {
      window.clearTimeout(revealFallbackRef.current);
      revealFallbackRef.current = null;
    }
    setTransition(null);
  }, []);

  const beginReveal = React.useCallback(() => {
    setTransition((current) =>
      current ? { ...current, phase: "reveal" } : current,
    );

    if (clearTimerRef.current) {
      window.clearTimeout(clearTimerRef.current);
    }

    clearTimerRef.current = window.setTimeout(() => {
      clearTransition();
    }, 540);
  }, [clearTransition]);

  const transitionTheme = React.useCallback(
    (nextTheme: "light" | "dark", origin?: Point) => {
      if (resolvedTheme === nextTheme) {
        return;
      }

      if (prefersReducedMotion) {
        setTheme(nextTheme);
        return;
      }

      if (activeRef.current) {
        return;
      }

      activeRef.current = true;
      pendingThemeRef.current = nextTheme;
      setTransition({
        kind: "theme",
        origin: origin ?? getDefaultOrigin(),
        phase: "cover",
        tone: nextTheme,
      });

      window.setTimeout(() => {
        setTransition((current) =>
          current ? { ...current, phase: "hold" } : current,
        );
        setTheme(nextTheme);

        window.setTimeout(() => {
          beginReveal();
        }, REVEAL_DELAY_MS);
      }, COVER_DURATION_MS);
    },
    [beginReveal, prefersReducedMotion, resolvedTheme, setTheme],
  );

  React.useEffect(() => {
    TOP_LEVEL_ROUTES.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  React.useEffect(() => {
    mountedRef.current = true;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the route-change trigger for the reveal.
  React.useEffect(() => {
    if (!mountedRef.current) {
      return;
    }

    if (!pendingRouteRef.current) {
      return;
    }

    beginReveal();
  }, [beginReveal, pathname]);

  React.useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (window.matchMedia("(pointer: coarse)").matches) {
        return;
      }

      if (prefersReducedMotion || activeRef.current) {
        return;
      }

      if (event.defaultPrevented || event.button !== 0) {
        return;
      }

      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (anchor.target && anchor.target !== "_self") {
        return;
      }

      if (
        anchor.hasAttribute("download") ||
        anchor.dataset.noTransition === "true"
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) {
        return;
      }

      if (
        url.hash &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      const href = getRouteHref(anchor.href);
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;

      if (href === current) {
        return;
      }

      event.preventDefault();

      activeRef.current = true;
      pendingRouteRef.current = href;

      setTransition({
        kind: "route",
        href,
        origin: { x: event.clientX, y: event.clientY },
        phase: "cover",
        tone: resolvedTheme === "dark" ? "dark" : "light",
      });

      window.setTimeout(() => {
        setTransition((currentTransition) =>
          currentTransition
            ? { ...currentTransition, phase: "hold" }
            : currentTransition,
        );
        router.push(href);

        if (revealFallbackRef.current) {
          window.clearTimeout(revealFallbackRef.current);
        }

        // If app-router navigation is interrupted, clear the overlay so touch
        // devices and Safari don't get stranded under a dead transition shell.
        revealFallbackRef.current = window.setTimeout(() => {
          beginReveal();
        }, 1800);
      }, COVER_DURATION_MS);
    }

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [beginReveal, prefersReducedMotion, resolvedTheme, router]);

  React.useEffect(() => {
    return () => {
      if (clearTimerRef.current) {
        window.clearTimeout(clearTimerRef.current);
      }
      if (revealFallbackRef.current) {
        window.clearTimeout(revealFallbackRef.current);
      }
    };
  }, []);

  return (
    <PageTransitionContext.Provider value={{ transitionTheme }}>
      {children}
      {transition ? <DropTransitionOverlay transition={transition} /> : null}
    </PageTransitionContext.Provider>
  );
}

function usePageTransition() {
  const context = React.useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      "usePageTransition must be used within PageTransitionProvider",
    );
  }

  return context;
}

export { PageTransitionProvider, usePageTransition };
