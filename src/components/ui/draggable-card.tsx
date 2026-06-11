"use client";

import {
  type MotionStyle,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

const DragConstraintsContext =
  React.createContext<React.RefObject<HTMLDivElement | null> | null>(null);

type DraggableCardBodyProps = {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  hideCursor?: boolean;
  freeDrag?: boolean;
};

const spring = {
  stiffness: 140,
  damping: 22,
  mass: 0.55,
};

export function DraggableCardBody({
  className,
  children,
  style,
  hideCursor = false,
  freeDrag = false,
}: DraggableCardBodyProps) {
  const constraintsRef = React.useContext(DragConstraintsContext);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-260, 260], [10, -10]),
    spring,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-260, 260], [-10, 10]),
    spring,
  );
  const shadowOpacity = useSpring(
    useTransform(mouseX, [-260, 0, 260], [0.2, 0, 0.2]),
    spring,
  );

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    mouseX.set(dx);
    mouseY.set(dy);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      drag
      dragElastic={0.14}
      dragMomentum
      dragConstraints={freeDrag ? undefined : (constraintsRef ?? undefined)}
      whileHover={{ scale: 1.012 }}
      whileDrag={{
        scale: 1.03,
        zIndex: 50,
        cursor: hideCursor ? "none" : "grabbing",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          ...style,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        } as MotionStyle
      }
      className={cn(
        "relative transition-[border-color] duration-300",
        "touch-none",
        hideCursor
          ? "cursor-none active:cursor-none"
          : "cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white"
        style={{ opacity: shadowOpacity }}
        aria-hidden
      />
    </motion.div>
  );
}

type DraggableCardContainerProps = {
  className?: string;
  children?: React.ReactNode;
};

export function DraggableCardContainer({
  className,
  children,
}: DraggableCardContainerProps) {
  const constraintsRef = React.useRef<HTMLDivElement>(null);

  return (
    <DragConstraintsContext.Provider value={constraintsRef}>
      <div
        ref={constraintsRef}
        className={cn("relative [perspective:2400px]", className)}
      >
        {children}
      </div>
    </DragConstraintsContext.Provider>
  );
}
