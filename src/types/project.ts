export type ProjectGroup = "product" | "lifestyle" | "community" | "minigames";

export interface ProjectLink {
  label: string;
  href: string;
}

/** The elevation a preview is drawn as. */
export type PreviewFrame = "phone" | "browser" | "desktop" | "note";

export type PreviewFont = "sans" | "serif" | "rounded" | "mono";

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
