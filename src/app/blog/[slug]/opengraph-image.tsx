import { getAllPosts, getPostBySlug } from "@/lib/blog/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og";

export const alt = "Akxost Studio — Writing";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** Keep long copy from blowing past the sheet layout. */
function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}

type Props = { params: Promise<{ slug: string }> };

export default async function OpengraphImage({ params }: Props) {
  const { slug } = await params;

  let post: ReturnType<typeof getPostBySlug> | null = null;
  try {
    post = getPostBySlug(slug);
  } catch {
    post = null;
  }

  if (!post) {
    return renderOgImage({
      sheet: "Sheet 05 / Writing",
      eyebrow: "Writing",
      headline: "Notes from the agency side.",
      note: "Product delivery, architecture decisions, and the tradeoffs of client work.",
    });
  }

  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const eyebrow = post.readTime ? `${date} · ${post.readTime}` : date;

  return renderOgImage({
    sheet: "Sheet 05 / Writing",
    eyebrow,
    headline: truncate(post.title, 72),
    note: truncate(post.excerpt, 140),
  });
}
