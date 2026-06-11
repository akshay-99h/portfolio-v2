"use client";

import { AnimatePresence, motion } from "motion/react";
import * as React from "react";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: {
    x: number;
    y: number;
  };
  isStatic?: boolean;
  hovering?: boolean;
  setHovering?: (hovering: boolean) => void;
}

function Lens({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  isStatic = false,
  position = { x: 200, y: 150 },
  hovering,
  setHovering,
}: LensProps) {
  const [localIsHovering, setLocalIsHovering] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 100, y: 100 });

  const isHovering = hovering !== undefined ? hovering : localIsHovering;
  const setIsHovering = setHovering ?? setLocalIsHovering;

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setMousePosition({ x, y });
  }

  return (
    <section
      className="relative z-20 overflow-hidden rounded-2xl"
      aria-label="Magnifier lens area"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {children}

      {isStatic ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.58 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 overflow-hidden"
          style={{
            maskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${position.x}px ${position.y}px, black 100%, transparent 100%)`,
            transformOrigin: `${position.x}px ${position.y}px`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: `scale(${zoomFactor})`,
              transformOrigin: `${position.x}px ${position.y}px`,
            }}
          >
            {children}
          </div>
        </motion.div>
      ) : (
        <AnimatePresence>
          {isHovering ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.58 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute inset-0 overflow-hidden"
              style={{
                maskImage: `radial-gradient(circle ${lensSize / 2}px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle ${lensSize / 2}px at ${mousePosition.x}px ${mousePosition.y}px, black 100%, transparent 100%)`,
                transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                zIndex: 50,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transform: `scale(${zoomFactor})`,
                  transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
                }}
              >
                {children}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      )}
    </section>
  );
}

export { Lens };
export type { LensProps };
