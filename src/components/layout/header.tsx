"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/about", label: "Agency" },
  { href: "/projects", label: "Work" },
  { href: "/tech", label: "Capabilities" },
  { href: "/blog", label: "Writing" },
];

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background px-4 sm:px-6">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <BrandWordmark className="text-[1.65rem] sm:text-[1.85rem]" />

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-1 py-2 text-sm transition-colors after:absolute after:inset-x-1 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-foreground/72 hover:text-foreground hover:after:scale-x-50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button asChild size="sm" className="px-4">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon-sm"
            className="md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>

        {isOpen ? (
          <div className="border-t border-border pb-3 md:hidden">
            <div className="flex flex-col gap-1 pt-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-1 py-2 text-sm transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <ThemeToggle />
              <Button asChild className="w-full px-4">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export { Header };
