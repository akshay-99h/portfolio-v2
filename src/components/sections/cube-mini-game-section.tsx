"use client";

import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, RotateCcw } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Point = {
  x: number;
  y: number;
};

type GameState = {
  position: Point;
  collected: string[];
  moves: number;
  status: "idle" | "playing" | "won";
};

const BOARD_SIZE = 5;
const START: Point = { x: 0, y: 4 };
const CHECKPOINTS = [
  { x: 1, y: 3, label: "A1" },
  { x: 3, y: 2, label: "B4" },
  { x: 4, y: 0, label: "C7" },
] as const;

function cellKey(point: Point) {
  return `${point.x}:${point.y}`;
}

function createInitialState(): GameState {
  return {
    position: START,
    collected: [],
    moves: 0,
    status: "idle",
  };
}

function CubeToken({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 28" aria-hidden="true" className={className}>
      <path d="M12 2 22 8 12 14 2 8Z" fill="var(--signal)" />
      <path d="M2 8 12 14v12L2 20Z" fill="var(--signal)" opacity="0.72" />
      <path d="M22 8 12 14v12l10-6Z" fill="var(--signal)" opacity="0.45" />
    </svg>
  );
}

function CubeMiniGameSection() {
  const [game, setGame] = React.useState<GameState>(() => createInitialState());
  const [bestRun, setBestRun] = React.useState<number | null>(null);

  const checkpointLookup = React.useMemo(
    () =>
      new Map(
        CHECKPOINTS.map((checkpoint) => [
          cellKey({ x: checkpoint.x, y: checkpoint.y }),
          checkpoint,
        ]),
      ),
    [],
  );

  const move = React.useCallback((dx: number, dy: number) => {
    setGame((current) => {
      if (current.status === "won") {
        return current;
      }

      const nextPosition = {
        x: Math.min(BOARD_SIZE - 1, Math.max(0, current.position.x + dx)),
        y: Math.min(BOARD_SIZE - 1, Math.max(0, current.position.y + dy)),
      };

      if (
        nextPosition.x === current.position.x &&
        nextPosition.y === current.position.y
      ) {
        return current;
      }

      const nextKey = cellKey(nextPosition);
      const nextCollected = current.collected.includes(nextKey)
        ? current.collected
        : checkpointLookup.has(nextKey)
          ? [...current.collected, nextKey]
          : current.collected;
      const nextMoves = current.moves + 1;
      const nextStatus =
        nextCollected.length === CHECKPOINTS.length ? "won" : "playing";

      return {
        position: nextPosition,
        collected: nextCollected,
        moves: nextMoves,
        status: nextStatus,
      };
    });
  }, [checkpointLookup]);

  const reset = React.useCallback(() => {
    setGame(createInitialState());
  }, []);

  React.useEffect(() => {
    if (game.status !== "won") {
      return;
    }

    setBestRun((current) =>
      current === null ? game.moves : Math.min(current, game.moves),
    );
  }, [game.moves, game.status]);

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLButtonElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case "arrowup":
        case "w":
          event.preventDefault();
          move(0, -1);
          break;
        case "arrowdown":
        case "s":
          event.preventDefault();
          move(0, 1);
          break;
        case "arrowleft":
        case "a":
          event.preventDefault();
          move(-1, 0);
          break;
        case "arrowright":
        case "d":
          event.preventDefault();
          move(1, 0);
          break;
        case "r":
          event.preventDefault();
          reset();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [move, reset]);

  return (
    <section
      className="px-4 pt-24 pb-10 sm:px-6 sm:pt-32"
      aria-label="Cube mini-game"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Fig. 02b — Calibration run</p>
          <p className="dim-label hidden sm:block">
            Arrow keys, WASD, or touch controls
          </p>
        </div>

        <div className="grid gap-10 pt-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.85fr)] lg:items-start lg:pt-16">
          <div className="max-w-2xl">
            <h2 className="display-section">
              Guide the cube through the signal points.
            </h2>
            <p className="section-copy mt-5 max-w-xl text-sm sm:text-base">
              Sweep the cube across the board, collect all three markers, and
              reset the run whenever you want another pass.
            </p>

            <div className="mt-8 grid gap-4 border-y border-border py-5 sm:grid-cols-3 sm:gap-6">
              {[
                [String(game.moves).padStart(2, "0"), "Moves"],
                [
                  `${game.collected.length}/${CHECKPOINTS.length}`,
                  "Signals locked",
                ],
                [
                  bestRun === null ? "--" : String(bestRun).padStart(2, "0"),
                  "Best run",
                ],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-2xl font-[550] tracking-[-0.02em] sm:text-3xl">
                    {value}
                  </p>
                  <p className="dim-label mt-1 text-[0.6rem]">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <p className="dim-label">Signal route</p>
              <div className="flex flex-wrap gap-2">
                {CHECKPOINTS.map((checkpoint, index) => {
                  const key = cellKey(checkpoint);
                  const isCollected = game.collected.includes(key);

                  return (
                    <span
                      key={checkpoint.label}
                      className={cn(
                        "inline-flex items-center gap-2 border px-3 py-1.5 text-xs tracking-[0.16em] uppercase transition-colors",
                        isCollected
                          ? "border-[color:var(--signal)]/70 bg-[color:var(--signal)]/10 text-foreground"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      <span className="dim-label text-[0.58rem]">
                        0{index + 1}
                      </span>
                      {checkpoint.label}
                    </span>
                  );
                })}
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                {game.status === "won"
                  ? "Run complete. All signal points are aligned."
                  : "Reach A1, then B4, then C7. The cube can move one square at a time."}
              </p>
            </div>
          </div>

          <div className="border border-border bg-card/55 p-4 sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_11rem]">
              <div
                tabIndex={0}
                className="outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
                aria-label="Cube board"
              >
                <div className="grid aspect-square grid-cols-5 gap-2">
                  {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
                    const x = index % BOARD_SIZE;
                    const y = Math.floor(index / BOARD_SIZE);
                    const key = cellKey({ x, y });
                    const checkpoint = checkpointLookup.get(key);
                    const isCollected = game.collected.includes(key);
                    const isCube =
                      game.position.x === x && game.position.y === y;

                    return (
                      <div
                        key={key}
                        className={cn(
                          "relative aspect-square border bg-background/75 transition-colors duration-200",
                          checkpoint
                            ? "border-[color:var(--signal)]/35"
                            : "border-border/80",
                          isCollected && "bg-[color:var(--signal)]/10",
                        )}
                      >
                        <div className="absolute inset-[12%] border border-dashed border-border/45" />

                        {checkpoint ? (
                          <span
                            className={cn(
                              "absolute left-2 top-2 font-mono text-[0.58rem] tracking-[0.18em] uppercase",
                              isCollected
                                ? "text-foreground"
                                : "text-muted-foreground",
                            )}
                          >
                            {checkpoint.label}
                          </span>
                        ) : null}

                        {checkpoint && !isCollected ? (
                          <span className="absolute right-2 bottom-2 size-2 rounded-full bg-[color:var(--signal)]/70 shadow-[0_0_16px_rgba(45,186,180,0.35)]" />
                        ) : null}

                        {isCube ? (
                          <div className="absolute inset-0 grid place-items-center">
                            <CubeToken className="h-9 w-auto drop-shadow-[0_14px_18px_rgba(22,143,138,0.24)] transition-transform duration-200 sm:h-11" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="dim-label">Controls</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label="Move up"
                      onClick={() => move(0, -1)}
                    >
                      <ArrowUp className="size-4" />
                    </Button>
                    <div />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label="Move left"
                      onClick={() => move(-1, 0)}
                    >
                      <ArrowLeft className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label="Reset run"
                      onClick={reset}
                    >
                      <RotateCcw className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label="Move right"
                      onClick={() => move(1, 0)}
                    >
                      <ArrowRight className="size-4" />
                    </Button>
                    <div />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon-sm"
                      aria-label="Move down"
                      onClick={() => move(0, 1)}
                    >
                      <ArrowDown className="size-4" />
                    </Button>
                    <div />
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="dim-label">Status</p>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {game.status === "won"
                      ? "Calibration passed. The cube hit every signal marker."
                      : "The board is live. Shortest clean route wins."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CubeMiniGameSection };
