import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/blog";

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col justify-between border-b border-border py-5 transition-colors hover:border-foreground/35">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{post.date}</span>
          <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span>{post.readTime} min read</span>
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-foreground/90">
            {post.title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="px-2.5 py-1 text-[11px]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

export { BlogCard };
