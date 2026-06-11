"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

type PointerHighlightProps = {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
  active?: boolean;
};

function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
  active,
}: PointerHighlightProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const shouldShow = active ?? isInView;

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const { width, height } = element.getBoundingClientRect();
    setDimensions({ width, height });

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        setDimensions({ width: w, height: h });
      }
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={cn("relative w-fit", containerClassName)}
      ref={containerRef}
    >
      {children}
      <AnimatePresence>
        {shouldShow && dimensions.width > 0 && dimensions.height > 0 ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 0.96, originX: 0, originY: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            <motion.div
              className={cn(
                "absolute inset-0 border border-[color:var(--chart-2)]/45 bg-[rgba(125,198,255,0.2)]",
                rectangleClassName,
              )}
              initial={{ width: 0, height: 0, opacity: 0.7 }}
              animate={{
                width: dimensions.width,
                height: dimensions.height,
                opacity: 1,
              }}
              exit={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute"
              style={{ rotate: -90 }}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{
                opacity: 1,
                x: dimensions.width + 4,
                y: dimensions.height + 4,
              }}
              exit={{
                opacity: 0,
                x: dimensions.width - 8,
                y: dimensions.height - 8,
              }}
              transition={{ duration: 0.42, ease: "easeInOut" }}
            >
              <Pointer
                className={cn(
                  "h-4 w-4 text-[color:var(--chart-2)]",
                  pointerClassName,
                )}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const Pointer = ({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Highlight pointer</title>
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
    </svg>
  );
};

export { PointerHighlight };
