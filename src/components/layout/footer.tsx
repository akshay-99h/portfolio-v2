import Link from "next/link";

import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { Sneak } from "@/components/ui/sneak";
import { BASICS } from "@/lib/data/resume";

const FOOTER_LINKS = [
  { href: "/about", label: "Agency" },
  { href: "/projects", label: "Work" },
  { href: "/tech", label: "Capabilities" },
  { href: "/blog", label: "Writing" },
  { href: "/contact", label: "Contact" },
] as const;

function Footer() {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-[color:color-mix(in_oklab,var(--card)_88%,transparent)] px-5 py-6 shadow-[0_24px_80px_rgba(17,17,17,0.08)] sm:px-7 sm:py-8 lg:px-10 lg:py-10 dark:shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top_left,rgba(29,169,163,0.18),transparent_52%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(28,179,173,0.16),transparent_48%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(17,17,17,0.05),transparent_58%)] dark:bg-[radial-gradient(circle_at_center,rgba(243,241,236,0.05),transparent_54%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
            <section className="flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Endnote
                </p>
                <BrandWordmark className="text-[2rem] sm:text-[2.4rem]" />
                <div className="max-w-lg space-y-4">
                  <h2 className="text-balance text-2xl font-semibold tracking-[-0.05em] sm:text-[2rem]">
                    Product work kept disciplined enough to ship, hand off, and
                    keep growing.
                  </h2>
                  <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">
                    Akxost Studio builds web and mobile systems with clear
                    architecture, restrained scope, and delivery that does not
                    get harder to maintain after launch.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-end">
                <div className="flex flex-wrap gap-2">
                  {FOOTER_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-sm text-foreground/78 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-2 text-sm text-muted-foreground sm:text-right">
                  <p>{BASICS.location}</p>
                  <Link
                    href={`mailto:${BASICS.contact.email}`}
                    className="inline-block text-foreground/80 hover:text-foreground"
                  >
                    {BASICS.contact.email}
                  </Link>
                  <p className="text-xs">
                    © {new Date().getFullYear()} Akxost Studio
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Studio Lines
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Hover across the field to disturb the text surface.
                  </p>
                </div>

                <div className="hidden gap-2 sm:flex">
                  <span className="rounded-full border border-border/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-foreground/78">
                    Lifestyle
                  </span>
                  <span className="rounded-full border border-border/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-foreground/78">
                    Community
                  </span>
                </div>
              </div>

              <Sneak />
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
