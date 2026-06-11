"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TextHoverEffectProps = {
  text: string;
  duration?: number;
  className?: string;
};

export const TextHoverEffect = ({
  text,
  duration = 0.18,
  className,
}: TextHoverEffectProps) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);
  const [maskPosition, setMaskPosition] = React.useState({
    cx: "50%",
    cy: "50%",
  });
  const [gradientId] = React.useState(
    () => `text-gradient-${Math.random().toString(36).slice(2, 9)}`,
  );
  const [revealId] = React.useState(
    () => `reveal-mask-${Math.random().toString(36).slice(2, 9)}`,
  );
  const [maskId] = React.useState(
    () => `text-mask-${Math.random().toString(36).slice(2, 9)}`,
  );

  React.useEffect(() => {
    if (!svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
    setMaskPosition({
      cx: `${cxPercentage}%`,
      cy: `${cyPercentage}%`,
    });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={cn("select-none", className)}
    >
      <title>Interactive text hover effect</title>
      <defs>
        <linearGradient
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered ? (
            <>
              <stop offset="0%" stopColor="#eab308" />
              <stop offset="25%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="75%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#a78bfa" />
            </>
          )}
        </linearGradient>

        <radialGradient
          id={revealId}
          gradientUnits="userSpaceOnUse"
          r="22%"
          cx={maskPosition.cx}
          cy={maskPosition.cy}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={maskId}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${revealId})`}
          />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.35"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
        style={{
          opacity: hovered ? 0.7 : 0.2,
          transition: `opacity ${duration}s ease-out`,
        }}
      >
        {text}
      </text>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.35"
        mask={`url(#${maskId})`}
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ transition: `all ${duration}s ease-out` }}
      >
        {text}
      </text>
    </svg>
  );
};
