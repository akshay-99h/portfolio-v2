"use client";

import { Camera, CameraOff } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";
import { BASICS } from "@/lib/data/resume";

const TOPICS = [
  "#Client Projects",
  "#Personal Labs",
  "#Product Engineering",
  "#Backend Systems",
  "#AI Workflows",
];
const HERO_CAMERA_STORAGE_KEY = "akxost.hero.camera.enabled";

function Hero() {
  const heroShellRef = React.useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = React.useState({ x: 50, y: 24 });
  const [isCameraEnabled, setIsCameraEnabled] = React.useState(true);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(HERO_CAMERA_STORAGE_KEY);
    if (stored === "false") {
      setIsCameraEnabled(false);
    }
  }, []);

  React.useEffect(() => {
    const shell = heroShellRef.current;
    if (!shell) return;
    const shellEl = shell;

    function handlePointerMove(event: MouseEvent) {
      const rect = shellEl.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setSpotlight({ x, y });
    }

    function handlePointerLeave() {
      setSpotlight({ x: 50, y: 24 });
    }

    shellEl.addEventListener("mousemove", handlePointerMove);
    shellEl.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      shellEl.removeEventListener("mousemove", handlePointerMove);
      shellEl.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  function handleCameraToggle() {
    setIsCameraEnabled((prev) => {
      const next = !prev;
      window.localStorage.setItem(HERO_CAMERA_STORAGE_KEY, String(next));
      return next;
    });
  }

  return (
    <SectionContainer
      id="about"
      className="flex min-h-[calc(100dvh-7.75rem)] flex-col justify-center pt-9 pb-3 sm:min-h-[calc(100dvh-8.5rem)] sm:pt-11 sm:pb-4"
    >
      <div
        ref={heroShellRef}
        className="glass-shell relative overflow-hidden rounded-[2rem] px-5 py-7 sm:px-8 sm:py-8 lg:px-12 lg:py-10"
      >
        {isCameraEnabled ? (
          <div className="absolute inset-0">
            <WebcamPixelGrid
              gridCols={58}
              gridRows={34}
              maxElevation={22}
              motionSensitivity={0.35}
              elevationSmoothing={0.14}
              colorMode="webcam"
              backgroundColor="#020612"
              mirror
              gapRatio={0.08}
              invertColors={false}
              darken={0.55}
              borderColor="#cde5ff"
              borderOpacity={0.06}
              showPermissionUi={false}
              className="h-full w-full opacity-45"
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(92,170,255,0.16),rgba(5,16,38,0.95)_58%)]" />
        )}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(162,196,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(162,196,255,0.1)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(85,214,255,0.27),transparent_38%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_10%,rgba(255,143,182,0.2),transparent_42%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_54%_88%,rgba(255,192,123,0.16),transparent_34%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,11,28,0),rgba(4,8,22,0.78))]" />
          <div
            className="absolute inset-0 transition-[background] duration-200"
            style={{
              background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(132,224,255,0.24), transparent 36%)`,
            }}
          />
        </div>

        <div className="absolute right-4 top-4 z-20 sm:right-5 sm:top-5">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={handleCameraToggle}
            aria-label={
              isCameraEnabled
                ? "Disable camera background"
                : "Enable camera background"
            }
            title={
              isCameraEnabled
                ? "Disable camera background"
                : "Enable camera background"
            }
            className="rounded-full border-[#9fd8ff]/40 bg-[rgba(9,29,60,0.78)] text-[#d3ecff] hover:border-[#b9e7ff]/70 hover:bg-[rgba(14,39,79,0.92)] hover:text-[#f2fbff]"
          >
            {isCameraEnabled ? (
              <Camera className="size-4" />
            ) : (
              <CameraOff className="size-4" />
            )}
          </Button>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <h1 className="rise-in text-balance text-[clamp(2.2rem,6.8vw,5.25rem)] font-semibold leading-[1.02]">
            <span className="bg-[linear-gradient(100deg,#edf4ff_10%,#8de7ff_46%,#ffbe9e_95%)] bg-clip-text text-transparent">
              Build, Launch, and Scale
            </span>
            <span className="mt-1.5 block bg-[linear-gradient(105deg,#d8e9ff_12%,#93dbff_46%,#ffa8bb_95%)] bg-clip-text text-transparent">
              Web Products That Perform.
            </span>
          </h1>
          <p className="rise-in mt-4 text-sm text-foreground/80 sm:text-base">
            <span className="font-display text-foreground">
              Design-aware thinking
            </span>{" "}
            <span className="font-sans">meets</span>{" "}
            <span className="font-mono text-[color:var(--chart-2)]">
              backend-first execution
            </span>{" "}
            <span className="font-sans">for teams that ship fast.</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="rounded-xl px-6">
              <Link href="/contact">Book a discovery call</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-[#ffab9d]/45 bg-[linear-gradient(145deg,rgba(255,155,126,0.24),rgba(255,112,173,0.16))] px-6 text-[#ffe4dc] hover:bg-[linear-gradient(145deg,rgba(255,155,126,0.32),rgba(255,112,173,0.22))]"
            >
              <Link href="/projects">View all projects</Link>
            </Button>
          </div>

          <div className="mx-auto mt-6 max-w-4xl border-t border-white/15 pt-5">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-medium text-foreground/72 sm:text-xs">
              {TOPICS.map((topic, index) => (
                <span
                  key={topic}
                  className="transition duration-300 hover:text-foreground"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
              <a
                className="text-foreground/76 underline decoration-white/25 underline-offset-4 transition duration-300 hover:text-foreground hover:decoration-[#9bdfff]/60"
                href={BASICS.contact.github}
              >
                GitHub
              </a>
              <a
                className="text-foreground/76 underline decoration-white/25 underline-offset-4 transition duration-300 hover:text-foreground hover:decoration-[#9bdfff]/60"
                href={BASICS.contact.linkedin}
              >
                LinkedIn
              </a>
              <a
                className="text-foreground/76 underline decoration-white/25 underline-offset-4 transition duration-300 hover:text-foreground hover:decoration-[#9bdfff]/60"
                href={`mailto:${BASICS.contact.email}`}
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

export { Hero };
