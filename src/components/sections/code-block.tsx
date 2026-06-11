"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const LANGUAGE_LABELS: Record<string, string> = {
  ts: "TypeScript",
  tsx: "TypeScript",
  js: "JavaScript",
  jsx: "JavaScript",
  bash: "Bash",
  sh: "Shell",
  json: "JSON",
  md: "Markdown",
  yml: "YAML",
  yaml: "YAML",
};

type CodeBlockProps = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
};

function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);
  const trimmedCode = code.replace(/\n$/, "");
  const lines = trimmedCode.split("\n");

  const label = language
    ? (LANGUAGE_LABELS[language.toLowerCase()] ?? language.toUpperCase())
    : null;

  React.useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(trimmedCode);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      data-slot="code-block"
      className={cn(
        "group relative overflow-hidden rounded-md border border-border bg-[var(--code-bg)]",
        "text-[var(--code-text)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/45" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
          {label ? <span>{label}</span> : null}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "rounded-md border border-border bg-background px-3 py-1 text-[10px] uppercase tracking-[0.2em]",
            "text-foreground/70 transition hover:border-foreground hover:text-foreground",
          )}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="max-h-[360px] overflow-auto px-5 py-4">
        <pre className="text-[13px] leading-relaxed">
          <code>
            {lines.map((line, index) => (
              <div key={`${index}-${line}`} className="flex gap-4">
                {showLineNumbers ? (
                  <span className="select-none text-right text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                ) : null}
                <span className="whitespace-pre text-foreground">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export { CodeBlock };
export type { CodeBlockProps };
