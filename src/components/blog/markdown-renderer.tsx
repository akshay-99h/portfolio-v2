import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "@/components/sections/code-block";
import { cn } from "@/lib/utils";

function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-foreground/88 sm:text-base">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-8 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-6 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-foreground/82 sm:text-base">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-6">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-6">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-foreground/20 pl-4 text-foreground/75">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            const language = match?.[1];
            const value = String(children ?? "");

            if (className) {
              return (
                <CodeBlock code={value} language={language} className="my-4" />
              );
            }

            return (
              <code
                className={cn(
                  "rounded-md border border-border bg-muted px-1.5 py-0.5 text-[12px]",
                  "text-foreground",
                )}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export { MarkdownRenderer };
