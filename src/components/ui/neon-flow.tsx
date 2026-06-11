"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TubesApp = {
  tubes: {
    setColors: (colors: string[]) => void;
    setLightsColors: (colors: string[]) => void;
  };
  dispose?: () => void;
};

const randomColors = (count: number) =>
  Array.from({ length: count }, () => {
    const value = Math.floor(Math.random() * 0xffffff);
    return `#${value.toString(16).padStart(6, "0")}`;
  });

type TubesBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
  canvasClassName?: string;
  enableClickInteraction?: boolean;
  tubeColors?: string[];
  lightColors?: string[];
};

function TubesBackground({
  children,
  className,
  canvasClassName,
  enableClickInteraction = true,
  tubeColors = ["#f967fb", "#53bc28", "#6958d5"],
  lightColors = ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"],
}: TubesBackgroundProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const tubesRef = React.useRef<TubesApp | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    let dispose: (() => void) | undefined;

    async function initTubes() {
      if (!canvasRef.current) {
        return;
      }

      try {
        const module = await import(
          "threejs-components/build/cursors/tubes1.min.js"
        );
        const TubesCursor = module.default as (
          canvas: HTMLCanvasElement,
          options: {
            tubes: {
              colors: string[];
              lights: {
                intensity: number;
                colors: string[];
              };
            };
          },
        ) => TubesApp;

        if (!isMounted || !canvasRef.current) {
          return;
        }

        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: tubeColors,
            lights: {
              intensity: 200,
              colors: lightColors,
            },
          },
        });

        tubesRef.current = app;
        setIsLoaded(true);

        dispose = () => {
          app.dispose?.();
          tubesRef.current = null;
        };
      } catch (error) {
        console.error("Failed to load TubesBackground", error);
      }
    }

    initTubes();

    return () => {
      isMounted = false;
      dispose?.();
    };
  }, [lightColors, tubeColors]);

  const handleClick = React.useCallback(() => {
    if (!enableClickInteraction || !tubesRef.current) {
      return;
    }

    tubesRef.current.tubes.setColors(randomColors(3));
    tubesRef.current.tubes.setLightsColors(randomColors(4));
  }, [enableClickInteraction]);

  return (
    <div
      className={cn(
        "relative h-full min-h-[400px] w-full overflow-hidden bg-transparent",
        className,
      )}
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 block h-full w-full touch-none opacity-0 transition-opacity duration-700",
          isLoaded && "opacity-100",
          canvasClassName,
        )}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export { TubesBackground };
