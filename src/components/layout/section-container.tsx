import type * as React from "react";

import { cn } from "@/lib/utils";

function SectionContainer({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="section-container"
      className={cn(
        "mx-auto w-full max-w-[1120px] px-4 py-14 sm:px-6 sm:py-16",
        className,
      )}
      {...props}
    />
  );
}

export { SectionContainer };
