import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionContainer } from "@/components/layout/section-container";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: ReturnType<typeof getPostBySlug>;
  try {
    post = getPostBySlug(slug);
  } catch {
    return notFound();
  }

  return (
    <div className="relative min-h-screen text-foreground">
      <Header />
      <SectionContainer>
        <div className="max-w-3xl">
          <p className="section-kicker">{post.tags.join(" · ")}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {post.date} · {post.readTime} min read
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_0.5fr]">
          <MarkdownRenderer content={post.content} />
          <aside className="space-y-4">
            <div className="border-y border-border py-4">
              <p className="section-kicker">Summary</p>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
            <div className="border-y border-border py-4">
              <p className="section-kicker">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-muted px-3 py-1 text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </SectionContainer>
      <Footer />
    </div>
  );
}
