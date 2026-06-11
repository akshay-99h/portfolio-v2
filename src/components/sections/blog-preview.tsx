import Link from "next/link";

import { BlogCard } from "@/components/blog/blog-card";
import { SectionContainer } from "@/components/layout/section-container";
import { getFeaturedPosts } from "@/lib/blog/posts";

function BlogPreviewSection() {
  const posts = getFeaturedPosts();

  return (
    <SectionContainer id="blog">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-4">
        <div>
          <p className="section-kicker">Blog</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Writing on systems and craft
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-sm text-foreground/72 transition-colors hover:text-foreground"
        >
          View all posts
        </Link>
      </div>

      <div className="divide-y divide-border">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <BlogCard post={post} />
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}

export { BlogPreviewSection };
