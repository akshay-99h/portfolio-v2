import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionContainer } from "@/components/layout/section-container";
import { AsciiDesktopBridgeSection } from "@/components/sections/ascii-desktop-bridge";
import { HeroRevealWave } from "@/components/sections/hero-reveal-wave";
import { ProjectPoemAnimationSection } from "@/components/sections/project-poem-animation-section";
import { StorytellingScrollSection } from "@/components/sections/scroll-story-section";
import { Button } from "@/components/ui/button";
import { BASICS } from "@/lib/data/resume";

const HIGHLIGHTS = [
  "Web products",
  "Mobile apps",
  "Internal tools",
  "Backend systems",
] as const;

export default function Home() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <main className="pb-14 sm:pb-18">
        <SectionContainer className="relative flex min-h-[calc(100vh-4.5rem)] max-w-none px-0 py-0 items-center pt-0 sm:pt-0">
          <HeroRevealWave highlights={HIGHLIGHTS} location={BASICS.location} />
        </SectionContainer>

        <AsciiDesktopBridgeSection />

        <StorytellingScrollSection />

        <ProjectPoemAnimationSection />

        <SectionContainer className="pt-6 sm:pt-10">
          <section className="grid gap-8 pt-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="section-kicker">Availability</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Start with the product, the bottleneck, or the system that keeps
                breaking.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact">Contact</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`mailto:${BASICS.contact.email}`}>Email</Link>
              </Button>
            </div>
          </section>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
}
