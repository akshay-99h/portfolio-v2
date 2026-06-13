---
title: "Mastering TypeScript: Advanced Patterns"
date: "2025-02-16"
excerpt: "Patterns I reach for when TypeScript needs to model complex APIs without turning into a type soup."
tags: ["TypeScript", "DX", "Patterns"]
readTime: 5
featured: true
---

## Use inference where it helps, lock it where it matters

A good type system guides users. A bad one becomes a puzzle. My rule: infer in APIs, enforce in core layers.

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };

function wrap<T>(fn: () => T): Result<T> {
  try {
    return { ok: true, value: fn() };
  } catch {
    return { ok: false, error: "Failed" };
  }
}
```

## Leverage template literal types

```ts
type EventName = `user.${"created" | "updated" | "deleted"}`;
```

When you have event-driven systems, this prevents impossible events from slipping through.

## Use discriminated unions for workflow state

```ts
type FlowState =
  | { status: "idle" }
  | { status: "loading"; startedAt: number }
  | { status: "success"; finishedAt: number }
  | { status: "error"; message: string };
```

It forces every consumer to handle each state explicitly.
