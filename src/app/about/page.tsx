import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import {
  BASICS,
  COMMUNITY,
  EXPERIENCE,
  INTERESTS,
  PORTFOLIO_META,
} from "@/lib/data/resume";

const DESCRIPTION =
  "Akshay Prabhat Mishra is a full-stack developer in New Delhi who builds web products, mobile apps, backend systems, and internal tools from first version to stable release.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Akxost",
    description: DESCRIPTION,
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <main className="px-4 pt-16 pb-14 sm:px-6 sm:pt-24 sm:pb-18">
        <div className="mx-auto w-full max-w-[1320px]">
          {/* Sheet header */}
          <div className="rule-x reg-tick" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-4">
            <p className="section-kicker">Dossier — About</p>
            <p className="dim-label hidden sm:block">
              Last surveyed {PORTFOLIO_META.lastUpdated}
            </p>
          </div>

          <div className="max-w-3xl pt-10 lg:pt-14">
            <h1 className="display-section">
              A developer who likes building things end to end.
            </h1>
            <div className="ruler-x mt-6 max-w-md" />
            <p className="section-copy mt-6 max-w-xl text-sm sm:text-base">
              {BASICS.summary}
            </p>
          </div>

          {/* Title block — like the corner of a drawing sheet. */}
          <div className="mt-12 grid border border-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            <div className="border-b border-border p-5 sm:border-r lg:border-b-0">
              <p className="dim-label text-[0.6rem]">Developer</p>
              <p className="mt-2 text-sm font-medium">{BASICS.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {BASICS.title}
              </p>
            </div>
            <div className="border-b border-border p-5 lg:border-r lg:border-b-0">
              <p className="dim-label text-[0.6rem]">Location</p>
              <p className="mt-2 text-sm font-medium">{BASICS.location}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                IST · UTC+5:30
              </p>
            </div>
            <div className="border-b border-border p-5 sm:border-r sm:border-b-0">
              <p className="dim-label text-[0.6rem]">Availability</p>
              <p className="mt-2 text-sm leading-6 text-foreground/85">
                {PORTFOLIO_META.availability}
              </p>
            </div>
            <div className="p-5">
              <p className="dim-label text-[0.6rem]">Channels</p>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href={`mailto:${BASICS.contact.email}`}
                  className="text-sm text-foreground/85 transition-colors hover:text-[color:var(--signal)]"
                >
                  {BASICS.contact.email}
                </a>
                <span className="flex flex-wrap gap-x-3">
                  {[
                    ["GitHub", BASICS.contact.github],
                    ["LinkedIn", BASICS.contact.linkedin],
                    ["Twitter", BASICS.contact.twitter],
                  ].map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="dim-label text-[0.6rem] text-foreground/70 underline decoration-border underline-offset-4 transition-colors hover:text-[color:var(--signal)]"
                    >
                      {label}
                    </a>
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Records */}
          <div className="mt-16 lg:mt-24">
            {/* R.01 — Practice */}
            <article className="grid gap-x-10 gap-y-6 border-t border-border py-10 lg:grid-cols-[8rem_minmax(0,26rem)_1fr] lg:py-14">
              <div>
                <p className="dim-label text-[color:var(--signal)]">R.01</p>
                <p
                  aria-hidden="true"
                  className="mt-2 hidden font-display text-[3.4rem] leading-none font-[550] tracking-[-0.04em] text-foreground/12 lg:block"
                >
                  01
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  The practice
                </h2>
                <p className="mt-4 max-w-[44ch] text-sm leading-7 text-muted-foreground">
                  {EXPERIENCE.summary}
                </p>
              </div>
              <div className="self-start lg:w-full lg:max-w-md lg:justify-self-end">
                <p className="dim-label border-b border-border pb-2.5 text-[0.6rem]">
                  On record
                </p>
                <ul>
                  {EXPERIENCE.highlights.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-border/60 py-2.5"
                    >
                      <span className="dim-label">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* R.02 — Engagements */}
            <article className="grid gap-x-10 gap-y-6 border-t border-border py-10 lg:grid-cols-[8rem_minmax(0,26rem)_1fr] lg:py-14">
              <div>
                <p className="dim-label text-[color:var(--signal)]">R.02</p>
                <p
                  aria-hidden="true"
                  className="mt-2 hidden font-display text-[3.4rem] leading-none font-[550] tracking-[-0.04em] text-foreground/12 lg:block"
                >
                  02
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  How engagements run
                </h2>
                <p className="mt-4 max-w-[44ch] text-sm leading-7 text-muted-foreground">
                  Best fit when a founder or team needs a hands-on developer
                  who can move from product thinking to implementation, backend
                  architecture, release work, and post-launch fixes without
                  treating them as separate jobs.
                </p>
              </div>
              <div className="self-start lg:w-full lg:max-w-md lg:justify-self-end">
                <p className="dim-label border-b border-border pb-2.5 text-[0.6rem]">
                  Preferred work
                </p>
                <ul>
                  {PORTFOLIO_META.preferredWork.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-border/60 py-2.5"
                    >
                      <span className="dim-label">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* R.03 — Community */}
            <article className="grid gap-x-10 gap-y-6 border-t border-border py-10 lg:grid-cols-[8rem_minmax(0,26rem)_1fr] lg:py-14">
              <div>
                <p className="dim-label text-[color:var(--signal)]">R.03</p>
                <p
                  aria-hidden="true"
                  className="mt-2 hidden font-display text-[3.4rem] leading-none font-[550] tracking-[-0.04em] text-foreground/12 lg:block"
                >
                  03
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  Off the clock, still shipping
                </h2>
                <p className="mt-4 max-w-[44ch] text-sm leading-7 text-muted-foreground">
                  {COMMUNITY.involvement[0]}. The work stays close to the
                  developer community it came from.
                </p>
              </div>
              <div className="self-start lg:w-full lg:max-w-md lg:justify-self-end">
                <p className="dim-label border-b border-border pb-2.5 text-[0.6rem]">
                  Community record
                </p>
                <ul>
                  {COMMUNITY.activities.map((item, index) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 border-b border-border/60 py-2.5"
                    >
                      <span className="dim-label">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-foreground/85">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* R.04 — Interests */}
            <article className="grid gap-x-10 gap-y-6 border-t border-border py-10 lg:grid-cols-[8rem_minmax(0,26rem)_1fr] lg:py-14">
              <div>
                <p className="dim-label text-[color:var(--signal)]">R.04</p>
                <p
                  aria-hidden="true"
                  className="mt-2 hidden font-display text-[3.4rem] leading-none font-[550] tracking-[-0.04em] text-foreground/12 lg:block"
                >
                  04
                </p>
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
                  What pulls the pencil
                </h2>
                <p className="mt-4 max-w-[44ch] text-sm leading-7 text-muted-foreground">
                  The interests that decide which side projects get built — and
                  which product problems are too interesting to ignore.
                </p>
              </div>
              <div className="self-start space-y-6 lg:w-full lg:max-w-md lg:justify-self-end">
                <div>
                  <p className="dim-label border-b border-border pb-2.5 text-[0.6rem]">
                    Technical
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {INTERESTS.technical.map((item) => (
                      <span
                        key={item}
                        className="border border-border px-2.5 py-1 text-xs text-foreground/85"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="dim-label border-b border-border pb-2.5 text-[0.6rem]">
                    Personal
                  </p>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {INTERESTS.personal.map((item) => (
                      <span
                        key={item}
                        className="border border-border px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
            <div className="rule-x" />
          </div>

          {/* CTA */}
          <div className="pt-20 sm:pt-28">
            <div className="rule-x reg-tick" />
            <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8 pt-10">
              <h2 className="display-section max-w-xl">
                Open to collaborations with people building interesting things.
              </h2>
              <div className="flex flex-wrap gap-3 pb-1">
                <Button asChild>
                  <Link href="/contact">Want to work together?</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/projects">View work</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
