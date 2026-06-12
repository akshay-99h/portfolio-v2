export type ProjectGroup = "product" | "lifestyle" | "community" | "minigames";

export interface ProjectLink {
  label: string;
  href: string;
}

/** The elevation a preview is drawn as. */
export type PreviewFrame = "phone" | "browser" | "desktop" | "note";

export type PreviewFont = "sans" | "serif" | "rounded" | "mono";

/**
 * The composition drawn beside the hero copy in a miniature —
 * matched to what the real start page shows there.
 */
export type PreviewArt =
  | "card" // generic media card stack
  | "carousel" // rotating promo slides (ZenIMF)
  | "device" // phone shell mockup (Verve)
  | "chat" // assistant thread + input bar (RakshaAI)
  | "arena" // full-bleed game start screen with HUD (Frost Runner)
  | "focus"; // text-only centered hero, no side visual (Garima Setu)

/**
 * Palette and copy lifted from each project's own entry page and globals.css,
 * so previews render as miniatures of the real product — no screenshots.
 * Native apps with no web UI use `frame: "note"` and carry their description
 * as the headline.
 */
export interface ProjectPreview {
  frame: PreviewFrame;
  /** Page background. */
  bg: string;
  /** Ink / body text. */
  fg: string;
  /** Primary accent. */
  accent: string;
  /** Muted support tone (chips, secondary blocks). */
  muted: string;
  /** Display face used by the original page. */
  font: PreviewFont;
  /** Hero headline from the entry page — or the product description for native apps. */
  headline: string;
  /** Nav wordmark exactly as the real page renders it. */
  brand?: string;
  /** Eyebrow / badge text above the headline. */
  kicker?: string;
  /** Subheadline, trimmed to miniature scale. */
  sub?: string;
  /** Primary CTA label from the real page. */
  cta?: string;
  /** Secondary CTA label. */
  cta2?: string;
  /** Feature chips or HUD stats shown on the start screen. */
  chips?: string[];
  /** Side-visual composition. Defaults to "card". */
  art?: PreviewArt;
}

export interface Project {
  slug: string;
  name: string;
  group: ProjectGroup;
  platform: string;
  summary: string;
  details: string;
  stack: string[];
  year: string;
  link?: ProjectLink;
  preview: ProjectPreview;
}
