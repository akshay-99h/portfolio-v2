import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandWordmarkProps = {
  className?: string;
  href?: string;
};

function BrandWordmark({ className, href = "/" }: BrandWordmarkProps) {
  const content = (
    <span
      className={cn(
        "inline-flex items-baseline uppercase text-foreground",
        className,
      )}
    >
      <span className="font-display text-[1.8rem] font-black leading-none tracking-[-0.11em] sm:text-[2rem]">
        AKXOST
      </span>
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

export { BrandWordmark };
