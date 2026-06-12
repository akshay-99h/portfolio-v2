import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SectionContainer } from "@/components/layout/section-container";
import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { BASICS } from "@/lib/data/resume";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  let post: ReturnType<typeof getPostBySlug>;
  try {
    post = getPostBySlug(slug);
  } catch {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [BASICS.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post: ReturnType<typeof getPostBySlug>;
  try {
    post = getPostBySlug(slug);
  } catch {
    return notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    keywords: post.tags.join(", "),
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: {
      "@type": "Person",
      name: BASICS.name,
      url: absoluteUrl("/about"),
    },
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  return (
    <div className="relative min-h-screen text-foreground">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD built from local content
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
