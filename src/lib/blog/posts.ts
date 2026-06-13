import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { BlogFrontmatter, BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));
}

export function getAllPosts(): BlogPost[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => post.featured);
}

export function getPostBySlug(slug: string): BlogPost {
  const normalizedSlug = slug.replace(/\.md$/, "");
  const filePath = path.join(BLOG_DIR, `${normalizedSlug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;

  return {
    slug: normalizedSlug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags,
    readTime: frontmatter.readTime,
    featured: frontmatter.featured,
    content,
  };
}
