import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
import { BASICS, PORTFOLIO_META } from "@/lib/data/resume";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <main>
        <SectionContainer className="pb-14 sm:pb-18">
          <div className="max-w-3xl">
            <p className="section-kicker">About</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Akxost Studio is a small product engineering agency built around
              direct execution.
            </h1>
            <p className="section-copy mt-4 text-sm sm:text-base">
              {BASICS.summary}
            </p>
          </div>

          <div className="mt-10 grid gap-4 border-y border-border py-5 sm:grid-cols-3">
            <div>
              <p className="section-kicker">Location</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {BASICS.location}
              </p>
            </div>
            <div>
              <p className="section-kicker">Focus</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {PORTFOLIO_META.preferredWork.join(" · ")}
              </p>
            </div>
            <div>
              <p className="section-kicker">Availability</p>
              <p className="mt-2 text-sm text-muted-foreground">
                {PORTFOLIO_META.availability}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-2xl space-y-4">
            <p className="text-sm leading-7 text-foreground/88">
              The agency is set up for founders and teams that need more than a
              developer for hire. Engagements usually cover discovery, product
              planning, web or mobile implementation, backend architecture, and
              the release work required to get a product into production.
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              That includes public-facing products, internal tools, community
              platforms, and the infrastructure around them. The work stays
              intentionally compact, but the scope is end-to-end.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <Button asChild>
              <Link href="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">View work</Link>
            </Button>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
