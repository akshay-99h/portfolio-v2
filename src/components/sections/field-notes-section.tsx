"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as React from "react";

import { TESTIMONIALS } from "@/lib/data/testimonials";
import { cn } from "@/lib/utils";

/** Underlines the phrases the client actually meant. */
function HighlightedQuote({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  let segments: { value: string; hit: boolean }[] = [
    { value: text, hit: false },
  ];

  for (const phrase of highlights) {
    segments = segments.flatMap((segment) => {
      if (segment.hit || !segment.value.includes(phrase)) {
        return [segment];
      }
      const [before, ...rest] = segment.value.split(phrase);
      const after = rest.join(phrase);
      return [
        { value: before, hit: false },
        { value: phrase, hit: true },
        { value: after, hit: false },
      ].filter((part) => part.value.length > 0);
    });
  }

  return (
    <>
      {segments.map((segment, index) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: static segmentation of a fixed string.
          key={index}
          className={
            segment.hit
              ? "text-foreground underline decoration-[color:var(--signal)] decoration-1 underline-offset-[6px]"
              : undefined
          }
        >
          {segment.value}
        </span>
      ))}
    </>
  );
}

function FieldNotesSection() {
  const [index, setIndex] = React.useState(0);
  const reduceMotion = useReducedMotion();
  const note = TESTIMONIALS[index];

  return (
    <section
      className="px-4 pt-24 pb-10 sm:px-6 sm:pt-32"
      aria-label="Client field notes"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="rule-x reg-tick" />
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
          <p className="section-kicker">Fig. 03 — Field notes</p>
          <p className="dim-label hidden sm:block">
            Recorded after delivery, not before
          </p>
        </div>

        <div className="grid gap-10 pt-12 lg:grid-cols-[auto_1fr] lg:gap-20 lg:pt-16">
          {/* Note selector: drawing numbers. */}
          <div
            className="flex gap-2 lg:flex-col lg:gap-0"
            role="tablist"
            aria-label="Select field note"
          >
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.author.handle}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "group flex items-baseline gap-3 border-t border-border py-3 pr-8 text-left transition-colors lg:py-4",
                  i === index
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "dim-label transition-colors",
                    i === index && "text-[color:var(--signal)]",
                  )}
                >
                  N.0{i + 1}
                </span>
                <span className="dim-label hidden lg:inline">
                  {testimonial.author.company}
                </span>
              </button>
            ))}
          </div>

          {/* The note itself. */}
          <div className="min-h-[16rem] max-w-3xl sm:min-h-[14rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={note.author.handle}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <blockquote className="editorial text-[1.45rem] leading-[1.45] text-muted-foreground sm:text-[1.9rem] lg:text-[2.15rem]">
                  <HighlightedQuote
                    text={note.text}
                    highlights={note.highlights}
                  />
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <span className="text-sm font-[550] tracking-tight text-foreground">
                    {note.author.name}
                  </span>
                  <span className="dim-label">
                    {note.author.role}, {note.author.company}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export { FieldNotesSection };
