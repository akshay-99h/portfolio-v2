"use client";

import { Volume2, VolumeX } from "lucide-react";
import { usePathname } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

const AUDIO_PREF_KEY = "akxost_audio_enabled";
const ROUTE_STING_LENGTH_MS = 620;
const SCROLL_STING_LENGTH_MS = 420;

const MIXKIT_AUDIO = {
  ambient: "https://assets.mixkit.co/music/download/mixkit-deep-urban-623.mp3",
  pageChange:
    "https://assets.mixkit.co/music/download/mixkit-tech-house-vibes-130.mp3",
  scroll:
    "https://assets.mixkit.co/music/download/mixkit-driving-ambition-32.mp3",
} as const;

function createAudio(
  src: string,
  options?: { loop?: boolean; volume?: number },
) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.loop = options?.loop ?? false;
  audio.volume = options?.volume ?? 0.18;
  return audio;
}

function playTransient(audio: HTMLAudioElement | null, durationMs: number) {
  if (!audio) return;

  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});

  window.setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, durationMs);
}

function SiteAudioController() {
  const pathname = usePathname();
  const ambientRef = React.useRef<HTMLAudioElement | null>(null);
  const routeRef = React.useRef<HTMLAudioElement | null>(null);
  const scrollRef = React.useRef<HTMLAudioElement | null>(null);
  const hasMountedRef = React.useRef(false);
  const hasInteractedRef = React.useRef(false);
  const lastPathRef = React.useRef<string | null>(null);
  const lastScrollYRef = React.useRef(0);
  const lastScrollSoundAtRef = React.useRef(0);

  const [isEnabled, setIsEnabled] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(AUDIO_PREF_KEY);
      if (stored === "true") {
        setIsEnabled(true);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    ambientRef.current = createAudio(MIXKIT_AUDIO.ambient, {
      loop: true,
      volume: 0.2,
    });
    routeRef.current = createAudio(MIXKIT_AUDIO.pageChange, {
      loop: false,
      volume: 0.24,
    });
    scrollRef.current = createAudio(MIXKIT_AUDIO.scroll, {
      loop: false,
      volume: 0.14,
    });
    setIsReady(true);

    return () => {
      ambientRef.current?.pause();
      routeRef.current?.pause();
      scrollRef.current?.pause();
    };
  }, []);

  React.useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(AUDIO_PREF_KEY, String(isEnabled));
    } catch {}

    if (!isEnabled) {
      ambientRef.current?.pause();
      return;
    }

    ambientRef.current?.play().catch(() => {});
  }, [isEnabled, isReady]);

  React.useEffect(() => {
    if (!isReady || !isEnabled || !pathname) return;

    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      lastPathRef.current = pathname;
      return;
    }

    if (pathname !== lastPathRef.current && hasInteractedRef.current) {
      playTransient(routeRef.current, ROUTE_STING_LENGTH_MS);
    }
    lastPathRef.current = pathname;
  }, [isEnabled, isReady, pathname]);

  React.useEffect(() => {
    if (!isReady || !isEnabled) return;

    function onScroll() {
      const now = performance.now();
      const nextY = window.scrollY;
      const delta = Math.abs(nextY - lastScrollYRef.current);
      const elapsed = now - lastScrollSoundAtRef.current;

      if (delta > 90 && elapsed > 700 && hasInteractedRef.current) {
        playTransient(scrollRef.current, SCROLL_STING_LENGTH_MS);
        lastScrollSoundAtRef.current = now;
      }

      lastScrollYRef.current = nextY;
    }

    lastScrollYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isEnabled, isReady]);

  React.useEffect(() => {
    if (!isReady) return;

    function onVisibilityChange() {
      if (document.hidden) {
        ambientRef.current?.pause();
        return;
      }

      if (isEnabled) {
        ambientRef.current?.play().catch(() => {});
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isEnabled, isReady]);

  function handleToggle() {
    hasInteractedRef.current = true;
    setIsEnabled((prev) => !prev);
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "fixed right-4 bottom-4 z-[80] inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background text-xs font-medium transition-colors hover:bg-foreground/[0.03]",
        isEnabled
          ? "border-border text-foreground"
          : "border-border text-foreground/72 hover:text-foreground",
      )}
      aria-label={isEnabled ? "Disable site audio" : "Enable site audio"}
      title="Audio tracks powered by Mixkit"
    >
      {isEnabled ? (
        <Volume2 className="size-4" />
      ) : (
        <VolumeX className="size-4" />
      )}
      <span className="sr-only">{isEnabled ? "Audio On" : "Audio Off"}</span>
    </button>
  );
}

export { SiteAudioController };
