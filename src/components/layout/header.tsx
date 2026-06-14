"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { SoundToggle } from "@/components/layout/sound-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/about", label: "Agency" },
  { href: "/projects", label: "Work" },
  { href: "/tech", label: "Capabilities" },
  { href: "/blog", label: "Writing" },
];

function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  const pathname = usePathname();

  // Quiet authority: the title block steps aside on scroll-down,
  // returns immediately on scroll-up.
  React.useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;
        if (y < 96 || delta < -2) {
          setIsHidden(false);
        } else if (delta > 2) {
          setIsHidden(true);
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on every navigation
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // While the menu is open: freeze the page and let Escape close it.
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    lockScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      unlockScroll();
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/80 bg-background/95 px-4 backdrop-blur-sm transition-transform duration-300 sm:px-6",
        isHidden && !isOpen ? "-translate-y-full" : "translate-y-0",
      )}
      style={
        {
          "--header-h": "4.25rem",
          transitionTimingFunction: "var(--ease-out-strong)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="flex items-center justify-between gap-4 py-3.5">
          <BrandWordmark className="text-[1.65rem] sm:text-[1.85rem]" />

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "dim-label relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground hover:text-foreground hover:after:scale-x-50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <span className="dim-label hidden items-center gap-2 lg:flex">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-signal"
              />
              Accepting briefs
            </span>
            <SoundToggle />
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
          <div
            data-lenis-prevent
            className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-border pb-[max(1rem,env(safe-area-inset-bottom))] md:hidden"
          >
            <div className="flex flex-col pt-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "border-b border-border/60 py-3.5 text-lg tracking-tight transition-colors",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-foreground/75 hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <SoundToggle />
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
