"use client";

import * as React from "react";

import { audio } from "@/lib/audio/engine";

/**
 * Subscribes to the audio engine's mute state and wires a one-time
 * first-interaction unlock. The Web Audio context starts suspended (browsers
 * block audio until a gesture), so the first pointer/key/scroll event resumes
 * it. Sound stays muted until the user explicitly enables it via the toggle.
 */
export function useAudio() {
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    setMuted(audio.isMuted());
    const unsubscribe = audio.subscribe(setMuted);

    const unlock = () => {
      audio.unlock();
    };

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
      "wheel",
    ];
    for (const ev of events) {
      window.addEventListener(ev, unlock, { once: true, passive: true });
    }

    return () => {
      unsubscribe();
      for (const ev of events) {
        window.removeEventListener(ev, unlock);
      }
    };
  }, []);

  const toggle = React.useCallback(() => {
    // Toggling is itself a gesture — make sure the context is live first.
    audio.unlock();
    audio.toggleMuted();
  }, []);

  return { muted, toggle };
}
