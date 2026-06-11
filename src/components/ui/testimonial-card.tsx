"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
  role?: string;
  company?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  highlights?: string[];
  highlightSeed?: number;
  href?: string;
  className?: string;
}

type HighlightToken =
  | { kind: "plain"; value: string; key: string }
  | { kind: "highlight"; value: string; order: number; key: string };

const HIGHLIGHT_STYLES = [
  {
    rectangleClassName:
      "rounded-[0.35rem] border-[color:var(--chart-2)]/50 bg-[rgba(137,214,255,0.2)]",
    pointerClassName: "text-[color:var(--chart-2)]",
    containerClassName: "mx-[0.08rem]",
  },
  {
    rectangleClassName:
      "rounded-[0.35rem] border-[color:var(--chart-4)]/50 bg-[rgba(255,151,188,0.18)]",
    pointerClassName: "text-[color:var(--chart-4)]",
    containerClassName: "mx-[0.08rem]",
  },
  {
    rectangleClassName:
      "rounded-[0.35rem] border-[color:var(--chart-5)]/50 bg-[rgba(255,191,138,0.18)]",
    pointerClassName: "text-[color:var(--chart-5)]",
    containerClassName: "mx-[0.08rem]",
  },
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenizeText(text: string, highlights: string[]): HighlightToken[] {
  if (highlights.length === 0) {
    return [{ kind: "plain", value: text, key: "plain-0" }];
  }

  const orderedHighlights = [...highlights].sort((a, b) => b.length - a.length);
  const pattern = new RegExp(
    `(${orderedHighlights.map((item) => escapeRegExp(item)).join("|")})`,
    "gi",
  );

  const tokens: HighlightToken[] = [];
  let lastIndex = 0;
  let highlightOrder = 0;
  let match = pattern.exec(text);

  while (match) {
    const matchedText = match[0] ?? "";
    const startIndex = match.index;
    const endIndex = startIndex + matchedText.length;

    if (startIndex > lastIndex) {
      tokens.push({
        kind: "plain",
        value: text.slice(lastIndex, startIndex),
        key: `plain-${startIndex}`,
      });
    }

    tokens.push({
      kind: "highlight",
      value: matchedText,
      order: highlightOrder,
      key: `highlight-${startIndex}-${matchedText.toLowerCase()}`,
    });

    highlightOrder += 1;
    lastIndex = endIndex;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    tokens.push({
      kind: "plain",
      value: text.slice(lastIndex),
      key: "plain-tail",
    });
  }

  return tokens;
}

function useCenterHighlightCount(
  cardRef: React.RefObject<HTMLElement | null>,
  totalHighlights: number,
) {
  const [activeCount, setActiveCount] = React.useState(0);
  const activeCountRef = React.useRef(0);

  React.useEffect(() => {
    if (totalHighlights === 0) {
      setActiveCount(0);
      activeCountRef.current = 0;
      return;
    }

    let frame = 0;

    const update = () => {
      const element = cardRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const viewportCenterX = window.innerWidth / 2;
        const activationRadius = Math.max(
          rect.width * 1.25,
          window.innerWidth * 0.28,
        );
        const distance = Math.abs(cardCenterX - viewportCenterX);
        const proximity = Math.max(0, 1 - distance / activationRadius);
        const nextCount = Math.min(
          totalHighlights,
          Math.max(0, Math.round(proximity * totalHighlights)),
        );

        if (nextCount !== activeCountRef.current) {
          activeCountRef.current = nextCount;
          setActiveCount(nextCount);
        }
      }

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [cardRef, totalHighlights]);

  return activeCount;
}

export function TestimonialCard({
  author,
  text,
  highlights = [],
  highlightSeed = 0,
  href,
  className,
}: TestimonialCardProps) {
  const cardRef = React.useRef<HTMLElement>(null);
  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const tokens = React.useMemo(
    () => tokenizeText(text, highlights),
    [text, highlights],
  );
  const totalHighlights = React.useMemo(
    () => tokens.filter((token) => token.kind === "highlight").length,
    [tokens],
  );
  const activeHighlightCount = useCenterHighlightCount(
    cardRef,
    totalHighlights,
  );

  const content = (
    <>
      <div className="flex items-center gap-3">
        <Avatar className="h-11 w-11 border border-white/20">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback className="bg-[rgba(137,214,255,0.24)] text-xs font-semibold text-foreground">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none text-foreground/95">
            {author.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{author.handle}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/82">
        <span aria-hidden>“</span>
        {tokens.map((token) => {
          if (token.kind === "plain") {
            return (
              <React.Fragment key={token.key}>{token.value}</React.Fragment>
            );
          }

          const style =
            HIGHLIGHT_STYLES[
              (highlightSeed + token.order) % HIGHLIGHT_STYLES.length
            ];

          return (
            <PointerHighlight
              key={token.key}
              active={token.order < activeHighlightCount}
              rectangleClassName={cn(
                style.rectangleClassName,
                "leading-relaxed",
              )}
              pointerClassName={cn(style.pointerClassName, "h-3 w-3")}
              containerClassName={cn(
                "inline-block align-baseline",
                style.containerClassName,
              )}
            >
              <span className="relative z-10 px-[0.1rem]">{token.value}</span>
            </PointerHighlight>
          );
        })}
        <span aria-hidden>”</span>
      </p>

      {author.role || author.company ? (
        <p className="mt-4 border-t border-white/10 pt-3 text-xs text-muted-foreground">
          {[author.role, author.company].filter(Boolean).join(" · ")}
        </p>
      ) : null}
    </>
  );

  const cardClassName = cn(
    "glass-card flex h-full min-h-[210px] max-w-[340px] flex-col rounded-2xl border border-white/15 bg-[rgba(10,28,56,0.72)] p-5 text-start transition-transform duration-300 hover:-translate-y-1 hover:border-white/28",
    className,
  );

  if (href) {
    return (
      <a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cardClassName}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={cardClassName}
    >
      {content}
    </div>
  );
}
