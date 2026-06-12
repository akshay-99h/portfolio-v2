"use client";

import { Canvas, invalidate } from "@react-three/fiber";
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

  return (
    <div ref={wrapperRef} className={cn("relative", className)}>
      <Canvas
        frameloop={active ? "demand" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, cameraZ], fov }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
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
