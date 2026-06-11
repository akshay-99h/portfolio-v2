export type ProjectGroup = "lifestyle" | "community";

export interface ProjectLink {
  label: string;
  href: string;
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
}
