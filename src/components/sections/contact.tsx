"use client";

import * as React from "react";

import { SectionContainer } from "@/components/layout/section-container";
import { Button } from "@/components/ui/button";
import { BASICS } from "@/lib/data/resume";

const INITIAL_STATE = {
  name: "",
  email: "",
  message: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ContactSection() {
  const [formState, setFormState] = React.useState(INITIAL_STATE);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!formState.name || !formState.email || !formState.message) {
      setError("Fill out all fields.");
      return;
    }

    if (!isValidEmail(formState.email)) {
      setError("Enter a valid email address.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Something went wrong.");
      }

      setStatus("success");
      setFormState(INITIAL_STATE);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  function handleFieldChange(
    field: "name" | "email" | "message",
    value: string,
  ) {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (status !== "idle") setStatus("idle");
    if (error) setError(null);
  }

  const fieldClass =
    "w-full border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/55 focus:border-foreground";

  return (
    <SectionContainer id="contact" className="pb-14 sm:pb-18">
      <div className="max-w-3xl">
        <p className="section-kicker">Contact</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Want to work together?
        </h1>
        <p className="section-copy mt-4 text-sm sm:text-base">
          If you are building something interesting, exploring a collaboration,
          or want another builder in the room, send it over. Products, games,
          tools, and odd technical experiments are all fair game.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          className="space-y-4 border-y border-border py-5"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="section-kicker">Name</span>
              <input
                className={fieldClass}
                placeholder="Your name"
                value={formState.name}
                onChange={(event) =>
                  handleFieldChange("name", event.target.value)
                }
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="section-kicker">Email</span>
              <input
                className={fieldClass}
                placeholder="you@email.com"
                type="email"
                value={formState.email}
                onChange={(event) =>
                  handleFieldChange("email", event.target.value)
                }
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm">
            <span className="section-kicker">Message</span>
            <textarea
              className={`${fieldClass} min-h-[180px]`}
              placeholder="What you are making, where you want help, timeline, and any technical constraints."
              value={formState.message}
              onChange={(event) =>
                handleFieldChange("message", event.target.value)
              }
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {status === "success" ? (
            <p className="text-sm text-[color:var(--chart-1)]">
              Message sent. I’ll reply within 24-48 hours.
            </p>
          ) : null}

          <Button disabled={status === "loading"} className="px-5">
            {status === "loading" ? "Sending..." : "Send message"}
          </Button>
        </form>

        <aside className="space-y-5 border-y border-border py-5">
          <div>
            <p className="section-kicker">Direct</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              I am not using this site as a full-time job board. It is mainly
              here for collaborations, side projects, game-adjacent ideas, and
              conversations with people building thoughtful things.
            </p>
          </div>

          <div className="space-y-3 border-t border-border pt-4 text-sm">
            <p>
              <span className="text-muted-foreground">Email:</span>{" "}
              <a
                className="hover:underline"
                href={`mailto:${BASICS.contact.email}`}
              >
                {BASICS.contact.email}
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">GitHub:</span>{" "}
              <a className="hover:underline" href={BASICS.contact.github}>
                github.com/akshay-99h
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">LinkedIn:</span>{" "}
              <a className="hover:underline" href={BASICS.contact.linkedin}>
                linkedin.com/in/akshay-99h
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">Location:</span>{" "}
              {BASICS.location}
            </p>
          </div>
        </aside>
      </div>
    </SectionContainer>
  );
}

export { ContactSection };
