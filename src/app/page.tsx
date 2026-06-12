import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FieldNotesSection } from "@/components/sections/field-notes-section";
import { HeroAssemblySection } from "@/components/sections/hero-assembly-section";
import { MethodSection } from "@/components/sections/method-section";
import { WorkIndexSection } from "@/components/sections/work-index-section";
import { Button } from "@/components/ui/button";
import { BASICS } from "@/lib/data/resume";

const BRIEF_PROMPTS = [
  "The product that needs to exist",
  "The bottleneck that will not move",
  "The system that keeps breaking",
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <main className="pb-14 sm:pb-18">
        <HeroAssemblySection />

        <MethodSection />

        <WorkIndexSection />

        <FieldNotesSection />

        {/* Fig. 04 — New brief */}
        <section
          className="px-4 pt-24 sm:px-6 sm:pt-32"
          aria-label="Start a new brief"
        >
          <div className="mx-auto w-full max-w-[1320px]">
            <div className="rule-x reg-tick" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
              <p className="section-kicker">Fig. 04 — New brief</p>
              <p className="dim-label hidden sm:block">
                Reply within two working days
              </p>
            </div>

            <div className="grid gap-10 pt-12 lg:grid-cols-[1fr_auto] lg:items-end lg:pt-16">
              <div className="max-w-2xl">
                <h2 className="display-section">
                  Start with whichever line is true.
                </h2>
                <ul className="mt-10">
                  {BRIEF_PROMPTS.map((prompt, index) => (
                    <li key={prompt}>
                      <Link
                        href="/contact"
                        className="group flex items-baseline gap-4 border-t border-border py-4 transition-colors hover:text-foreground"
                      >
                        <span className="dim-label transition-colors group-hover:text-[color:var(--signal)]">
                          0{index + 1}
                        </span>
                        <span className="text-lg text-muted-foreground transition-colors group-hover:text-foreground sm:text-xl">
                          {prompt}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li className="rule-x" />
                </ul>
              </div>

              <div className="flex flex-wrap gap-3 pb-1">
                <Button asChild>
                  <Link href="/contact">Start a brief</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`mailto:${BASICS.contact.email}`}>Email</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
