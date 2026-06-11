"use client";

import { SectionContainer } from "@/components/layout/section-container";
import { TestimonialsWithMarquee } from "@/components/ui/testimonials-with-marquee";
import { TESTIMONIALS } from "@/lib/data/testimonials";

function TestimonialsSection() {
  const testimonials = TESTIMONIALS.map((item, index) => ({
    author: item.author,
    href: item.href,
    text: item.text,
    highlights: item.highlights,
    highlightSeed: index,
  }));

  return (
    <SectionContainer id="testimonials" className="pt-12 sm:pt-14">
      <TestimonialsWithMarquee
        title="Trusted By Teams We Build With"
        description="Feedback from teams who partnered with Akxost Studio for product engineering and launch delivery."
        testimonials={testimonials}
        className="py-0"
      />
    </SectionContainer>
  );
}

export { TestimonialsSection };
