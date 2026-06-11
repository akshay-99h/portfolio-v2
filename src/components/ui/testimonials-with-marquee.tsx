import {
  type TestimonialAuthor,
  TestimonialCard,
} from "@/components/ui/testimonial-card";
import { cn } from "@/lib/utils";

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Array<{
    author: TestimonialAuthor;
    text: string;
    highlights?: string[];
    highlightSeed?: number;
    href?: string;
  }>;
  className?: string;
}

export function TestimonialsWithMarquee({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const duplicateSets = ["set-a", "set-b"] as const;

  return (
    <div className={cn("text-foreground", "py-12 sm:py-16 px-0", className)}>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-6 text-center sm:gap-12">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-6">
          <h2 className="max-w-[760px] text-3xl font-semibold leading-tight sm:text-5xl">
            {title}
          </h2>
          <p className="max-w-[640px] text-sm font-medium text-muted-foreground sm:text-lg">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex w-full overflow-hidden p-2 [--duration:42s] [--gap:1rem] [gap:var(--gap)]">
            <div className="flex min-w-max shrink-0 flex-row justify-around [gap:var(--gap)] [animation:marquee_var(--duration)_linear_infinite] group-hover:[animation-play-state:paused]">
              {duplicateSets.flatMap((setId) =>
                testimonials.map((testimonial) => (
                  <TestimonialCard
                    key={`${setId}-${testimonial.author.handle}`}
                    {...testimonial}
                  />
                )),
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-background via-background/80 to-transparent sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-background via-background/80 to-transparent sm:block" />
        </div>
      </div>
    </div>
  );
}
