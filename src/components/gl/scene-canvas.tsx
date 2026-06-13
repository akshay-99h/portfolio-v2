"use client";

import { Canvas, invalidate, type RootState } from "@react-three/fiber";
import * as React from "react";

import { cn } from "@/lib/utils";

type SceneCanvasProps = {
  children: React.ReactNode;
  className?: string;
  /** Camera field of view. Default 35 (long-lens, low distortion). */
  fov?: number;
  /** Camera z position. */
  cameraZ?: number;
};

/**
 * Section-scoped WebGL viewport with baked-in guardrails:
 * - DPR clamped to [1, 1.75]
 * - demand frameloop: nothing renders unless a scene invalidates
 * - deactivates rendering entirely while offscreen (IntersectionObserver)
 * - re-invalidates on scroll/resize so scissored views never go stale
 *
 * Scenes own their geometry lifecycle; R3F disposes on unmount.
 */
function SceneCanvas({
  children,
  className,
  fov = 35,
  cameraZ = 8,
}: SceneCanvasProps) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) {
          invalidate();
        }
      },
      { rootMargin: "10% 0px" },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!active) {
      return;
    }

    const handle = () => invalidate();
    window.addEventListener("scroll", handle, { passive: true });
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("scroll", handle);
      window.removeEventListener("resize", handle);
    };
  }, [active]);

  // A lost GPU context (driver hiccup, GPU switch, tab backgrounding) leaves the
  // canvas permanently blank unless we opt into recovery: preventDefault on loss
  // tells the browser to fire a restore, where we re-arm the demand loop.
  const handleCreated = React.useCallback((state: RootState) => {
    const canvas = state.gl.domElement;

    const onLost = (event: Event) => {
      event.preventDefault();
    };
    const onRestored = () => {
      state.gl.resetState();
      invalidate();
    };

    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);
  }, []);

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <Canvas
        frameloop={active ? "demand" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, cameraZ], fov }}
        onCreated={handleCreated}
        gl={{
          antialias: true,
          alpha: true,
          // "default" lets the OS keep the integrated GPU; forcing
          // "high-performance" triggers GPU switches on dual-GPU Macs, a
          // common cause of context loss for a shader this light.
          powerPreference: "default",
        }}
        style={{ position: "absolute", inset: 0 }}
        aria-hidden="true"
      >
        {children}
      </Canvas>
    </div>
  );
}

export { SceneCanvas };
