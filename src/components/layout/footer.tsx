import Link from "next/link";

import { BrandWordmark } from "@/components/layout/brand-wordmark";
import { StudioClock } from "@/components/layout/studio-clock";
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
    <footer className="px-4 pt-16 pb-8 sm:px-6 sm:pt-20">
      <div className="mx-auto w-full max-w-[1320px]">
        <div className="rule-x" />

        <div className="grid gap-10 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <section className="space-y-6">
            <p className="dim-label">Endnote</p>
            <BrandWordmark
              withTagline
              className="text-[2.4rem] sm:text-[3.2rem]"
            />
            <h2 className="display-section max-w-xl">
              Product work kept disciplined enough to ship, hand off, and keep
              growing.
            </h2>
            <p className="section-copy max-w-md text-sm sm:text-base">
              Akxost Studio builds web and mobile systems with clear
              architecture, restrained scope, and delivery that does not get
              harder to maintain after launch.
            </p>
          </section>

          <section className="grid content-between gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <nav aria-label="Footer" className="space-y-1">
              <p className="dim-label mb-4">Index</p>
              {FOOTER_LINKS.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-baseline gap-4 border-t border-border/60 py-2.5 text-foreground/80 transition-colors hover:text-foreground"
                >
                  <span className="dim-label">0{index + 1}</span>
                  <span className="text-sm tracking-tight">{link.label}</span>
                </Link>
              ))}
            </nav>

            <div className="space-y-3">
              <p className="dim-label mb-4">Contact</p>
              <Link
                href={`mailto:${BASICS.contact.email}`}
                className="block text-sm text-foreground/80 hover:text-foreground"
              >
                {BASICS.contact.email}
              </Link>
              <StudioClock />
            </div>
          </section>
        </div>

        <div className="rule-x mt-12" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-4">
          <p className="dim-label">
            © {new Date().getFullYear()} Akxost Studio
          </p>
          <p className="dim-label hidden sm:block">
            Set in Switzer &amp; JetBrains Mono · Next.js · React · WebGL
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
