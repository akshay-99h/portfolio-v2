"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  AsciiRenderer,
  Environment,
  OrbitControls,
  useGLTF,
} from "@react-three/drei";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const COMPUTER_MODEL = {
  url: "https://danielcodepen.s3.us-east-1.amazonaws.com/apple_macintosh.glb",
  scale: 0.054,
  position: [0, -0.32, 0] as [number, number, number],
};

function DesktopModel() {
  const { scene } = useGLTF(COMPUTER_MODEL.url);

  return (
    <primitive
      object={scene}
      scale={COMPUTER_MODEL.scale}
      rotation={[0.08, -0.48, 0]}
      position={COMPUTER_MODEL.position}
    />
  );
}

useGLTF.preload(COMPUTER_MODEL.url);

type AsciiDesktopViewerProps = {
  className?: string;
};

function AsciiDesktopViewer({ className }: AsciiDesktopViewerProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  const asciiSettings = useMemo(
    () =>
      isDark
        ? {
            resolution: 0.16,
            characters: " .:-=+*#%@",
            fgColor: "#f5f0e8",
            bgColor: "#05090a",
          }
        : {
            resolution: 0.16,
            characters: " .:-=+*#%@",
            fgColor: "#163633",
            bgColor: "#f6f1e8",
          },
    [isDark],
  );

  return (
    <div
      className={cn(
        "relative mx-auto h-[760px] w-full max-w-[1280px] overflow-hidden rounded-[2.5rem] border border-border/45 shadow-[0_24px_100px_rgba(0,0,0,0.22)] sm:h-[1080px]",
        isDark
          ? "bg-[radial-gradient(circle_at_50%_32%,rgba(29,169,163,0.16),transparent_22%),linear-gradient(180deg,rgba(10,14,14,0.96)_0%,rgba(6,9,9,0.96)_100%)]"
          : "bg-[radial-gradient(circle_at_50%_32%,rgba(29,169,163,0.08),transparent_22%),linear-gradient(180deg,rgba(247,242,233,0.96)_0%,rgba(243,238,228,0.94)_100%)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle,_currentColor_1px,_transparent_1px)] [background-size:20px_20px] text-[color:var(--chart-1)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_28%,rgba(0,0,0,0.18)_100%)]" />

      <Canvas
        camera={{ position: [0, 0.1, 3.18], fov: 44 }}
        gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.72} />
        <directionalLight position={[6, 8, 5]} intensity={1.1} />
        <pointLight position={[-6, -4, -2]} intensity={0.35} />

        <Suspense fallback={null}>
          <DesktopModel />
          <Environment preset="studio" />
          <AsciiRenderer
            resolution={asciiSettings.resolution}
            characters={asciiSettings.characters}
            fgColor={asciiSettings.fgColor}
            bgColor={asciiSettings.bgColor}
            invert={false}
          />
        </Suspense>

        <OrbitControls
          autoRotate
          autoRotateSpeed={1.35}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute right-[8%] top-[25%] max-w-[13rem] text-left p-4 bg-[#111]">
          <div className="mb-2 h-px w-10 bg-[color:var(--chart-1)]/65" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--chart-1)]">
            Launch a new product
          </p>
        </div>

        <div className="absolute left-[7%] top-[40%] max-w-[13rem] text-right p-4 bg-[#111]">
          <div className="ml-auto mb-2 h-px w-10 bg-[color:var(--chart-1)]/65" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--chart-1)]">
            Stabilize a messy product
          </p>
        </div>

        <div className="absolute right-[10%] bottom-[30%] max-w-[13rem] text-left p-4 bg-[#111]">
          <div className="mb-2 h-px w-10 bg-[color:var(--chart-1)]/65" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--chart-1)]">
            Build internal tools and workflows
          </p>
        </div>

        <div className="absolute left-[8%] bottom-[15%] max-w-[13rem] text-right p-4 bg-[#111]">
          <div className="ml-auto mb-2 h-px w-10 bg-[color:var(--chart-1)]/65" />
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--chart-1)]">
            Add systems behind the product
          </p>
        </div>
      </div>
    </div>
  );
}

export { AsciiDesktopViewer };
