import type { Metadata } from "next";
import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionContainer } from "@/components/layout/section-container";
import { getAllPosts } from "@/lib/blog/posts";

const DESCRIPTION =
  "Notes from the agency side of building software — product delivery, architecture decisions, and the engineering tradeoffs that come up in client work.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Writing — Akxost Studio",
    description: DESCRIPTION,
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <SectionContainer>
        <div className="max-w-3xl">
          <p className="section-kicker">Blog</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes from the agency side of building software
          </h1>
          <p className="section-copy mt-4 text-sm sm:text-base">
            Short writing on product delivery, architecture decisions, and the
            engineering tradeoffs that come up in client work.
          </p>
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <BlogCard post={post} />
            </Link>
          ))}
        </div>
      </SectionContainer>
      <Footer />
    </div>
  );
}
