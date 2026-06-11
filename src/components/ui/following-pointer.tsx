"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValue,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type CenterTooltipCandidate = {
  id: string;
  eligible: boolean;
  score: number;
  hovering: boolean;
};

const centerTooltipCandidates = new Map<string, CenterTooltipCandidate>();
const centerTooltipSubscribers = new Set<(activeId: string | null) => void>();
let activeCenterTooltipId: string | null = null;
let rotatingCandidateIds: string[] = [];
let rotatingCandidateIndex = 0;
let rotatingIntervalMs = 0;
let rotationTimer: number | null = null;

function arraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) return false;
  }
  return true;
}

function notifyCenterTooltipSubscribers() {
  centerTooltipSubscribers.forEach((listener) => {
    listener(activeCenterTooltipId);
  });
}

function setActiveCenterTooltip(nextId: string | null) {
  if (activeCenterTooltipId === nextId) return;
  activeCenterTooltipId = nextId;
  notifyCenterTooltipSubscribers();
}

function stopCenterTooltipRotation() {
  if (rotationTimer !== null) {
    window.clearInterval(rotationTimer);
    rotationTimer = null;
  }
  rotatingCandidateIds = [];
  rotatingCandidateIndex = 0;
  rotatingIntervalMs = 0;
}

function startOrUpdateCenterTooltipRotation(candidateIds: string[]) {
  const intervalMs = Math.max(420, Math.floor(2100 / candidateIds.length));
  const sameIds = arraysEqual(rotatingCandidateIds, candidateIds);
  const sameInterval = intervalMs === rotatingIntervalMs;

  if (!sameIds) {
    rotatingCandidateIds = [...candidateIds];
    rotatingCandidateIndex = 0;
    setActiveCenterTooltip(rotatingCandidateIds[0] ?? null);
  }

  if (rotationTimer !== null && sameIds && sameInterval) {
    return;
  }

  if (rotationTimer !== null) {
    window.clearInterval(rotationTimer);
  }

  rotatingIntervalMs = intervalMs;
  rotationTimer = window.setInterval(() => {
    if (rotatingCandidateIds.length === 0) return;
    rotatingCandidateIndex =
      (rotatingCandidateIndex + 1) % rotatingCandidateIds.length;
    setActiveCenterTooltip(
      rotatingCandidateIds[rotatingCandidateIndex] ?? null,
    );
  }, intervalMs);
}

function recomputeActiveCenterTooltip() {
  const eligibleCards = Array.from(centerTooltipCandidates.values()).filter(
    (candidate) => candidate.eligible,
  );

  if (eligibleCards.length === 0) {
    stopCenterTooltipRotation();
    setActiveCenterTooltip(null);
    return;
  }

  const hoveredEligibleCards = eligibleCards.filter(
    (candidate) => candidate.hovering,
  );
  if (hoveredEligibleCards.length === 0) {
    stopCenterTooltipRotation();
    setActiveCenterTooltip(null);
    return;
  }

  hoveredEligibleCards.sort((a, b) => b.score - a.score);
  const bestScore = hoveredEligibleCards[0].score;
  const nearCenterCards = hoveredEligibleCards.filter(
    (candidate) => bestScore - candidate.score <= 0.035,
  );

  if (nearCenterCards.length === 1) {
    stopCenterTooltipRotation();
    setActiveCenterTooltip(nearCenterCards[0].id);
    return;
  }

  startOrUpdateCenterTooltipRotation(
    nearCenterCards.map((candidate) => candidate.id),
  );
}

function updateCenterTooltipCandidate(candidate: CenterTooltipCandidate) {
  centerTooltipCandidates.set(candidate.id, candidate);
  recomputeActiveCenterTooltip();
}

function removeCenterTooltipCandidate(candidateId: string) {
  if (!centerTooltipCandidates.has(candidateId)) return;
  centerTooltipCandidates.delete(candidateId);
  recomputeActiveCenterTooltip();
}

function subscribeToCenterTooltip(listener: (activeId: string | null) => void) {
  centerTooltipSubscribers.add(listener);
  listener(activeCenterTooltipId);

  return () => {
    centerTooltipSubscribers.delete(listener);
  };
}

type FollowerPointerCardProps = {
  children: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode;
  hideCursor?: boolean;
  onPointerDownCapture?: React.PointerEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
};

function FollowerPointerCard({
  children,
  className,
  title,
  hideCursor = false,
  onPointerDownCapture,
  style,
}: FollowerPointerCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const cardIdRef = React.useRef(
    `follower-pointer-${Math.random().toString(36).slice(2, 10)}`,
  );
  const [isInside, setIsInside] = React.useState(false);
  const [intersectionRatio, setIntersectionRatio] = React.useState(0);
  const [centerTouchRatio, setCenterTouchRatio] = React.useState(0);
  const [activeCardId, setActiveCardId] = React.useState<string | null>(null);
  const isHalfVisible = intersectionRatio >= 0.5;
  const isHalfTouchingCenter = centerTouchRatio >= 0.5;
  const isCenterCard = activeCardId === cardIdRef.current;
  const isTooltipEligible =
    isHalfVisible && isHalfTouchingCenter && isCenterCard;

  React.useEffect(() => subscribeToCenterTooltip(setActiveCardId), []);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionRatio(entry.intersectionRatio);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    let raf = 0;

    function updateCenterTouchRatio() {
      raf = 0;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const deltaX = Math.abs(cardCenterX - viewportCenterX);
      const deltaY = Math.abs(cardCenterY - viewportCenterY);
      const xTouch = Math.max(0, 1 - deltaX / Math.max(1, rect.width));
      const yTouch = Math.max(0, 1 - deltaY / Math.max(1, rect.height));

      setCenterTouchRatio(Math.min(xTouch, yTouch));
    }

    function requestUpdate() {
      if (raf !== 0) return;
      raf = window.requestAnimationFrame(updateCenterTouchRatio);
    }

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (raf !== 0) {
        window.cancelAnimationFrame(raf);
      }
    };
  }, []);

  React.useEffect(() => {
    if (!isInside) return;
    let raf = 0;

    const updateWhileHovering = () => {
      raf = requestAnimationFrame(updateWhileHovering);
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      const deltaX = Math.abs(cardCenterX - viewportCenterX);
      const deltaY = Math.abs(cardCenterY - viewportCenterY);
      const xTouch = Math.max(0, 1 - deltaX / Math.max(1, rect.width));
      const yTouch = Math.max(0, 1 - deltaY / Math.max(1, rect.height));
      setCenterTouchRatio(Math.min(xTouch, yTouch));
    };

    raf = requestAnimationFrame(updateWhileHovering);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [isInside]);

  React.useEffect(() => {
    const candidateId = cardIdRef.current;
    const cardEligible = intersectionRatio >= 0.5 && centerTouchRatio >= 0.5;
    const score = centerTouchRatio * 0.8 + intersectionRatio * 0.2;

    updateCenterTooltipCandidate({
      id: candidateId,
      eligible: cardEligible,
      score,
      hovering: isInside,
    });

    return () => {
      removeCenterTooltipCandidate(candidateId);
    };
  }, [centerTouchRatio, intersectionRatio, isInside]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const deltaX = Math.abs(cardCenterX - viewportCenterX);
    const deltaY = Math.abs(cardCenterY - viewportCenterY);
    const xTouch = Math.max(0, 1 - deltaX / Math.max(1, rect.width));
    const yTouch = Math.max(0, 1 - deltaY / Math.max(1, rect.height));
    setCenterTouchRatio(Math.min(xTouch, yTouch));

    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onMouseMove={handleMouseMove}
      onPointerDownCapture={onPointerDownCapture}
      style={{ ...style, cursor: hideCursor ? "none" : style?.cursor }}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && isTooltipEligible ? (
          <FollowPointer x={x} y={y} title={title} />
        ) : null}
      </AnimatePresence>
      {children}
    </motion.div>
  );
}

type FollowPointerProps = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  title?: string | React.ReactNode;
};

function FollowPointer({ x, y, title }: FollowPointerProps) {
  return (
    <motion.div
      className="pointer-events-none absolute z-50 h-4 w-4"
      style={{ top: y, left: x }}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.65, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="-translate-x-[12px] -translate-y-[10px] -rotate-[68deg] transform stroke-[color:var(--chart-2)] text-[color:var(--chart-2)]"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>Pointer icon</title>
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="min-w-max -translate-y-11 translate-x-2 rounded-full border border-[color:var(--chart-2)]/45 bg-[linear-gradient(140deg,rgba(137,214,255,0.94),rgba(168,255,233,0.9))] px-3 py-1.5 text-xs font-semibold text-[#06243a] shadow-[0_14px_36px_-22px_rgba(120,205,255,0.8)]"
      >
        {title ?? "Wanna reach out? Try sending a contact query."}
      </motion.div>
    </motion.div>
  );
}

export { FollowerPointerCard };
