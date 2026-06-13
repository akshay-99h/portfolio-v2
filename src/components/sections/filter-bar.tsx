"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FilterCategory = {
  id: string;
  label: string;
  count?: number;
};

type FilterBarProps = {
  categories: readonly FilterCategory[];
  techTags: readonly string[];
  activeCategory: string;
  activeTags: string[];
  onCategoryChange: (categoryId: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters?: () => void;
  className?: string;
};

function FilterBar({
  categories,
  techTags,
  activeCategory,
  activeTags,
  onCategoryChange,
  onTagToggle,
  onClearFilters,
  className,
}: FilterBarProps) {
  const hasActiveFilters = activeCategory !== "all" || activeTags.length > 0;

  return (
    <div
      data-slot="filter-bar"
      className={cn(
        "flex w-full flex-col gap-4 rounded-[1.75rem] border border-border bg-background/72 p-4 backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((category) => {
          const isActive = category.id === activeCategory;

          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-8 rounded-full px-4 text-xs font-semibold",
                isActive
                  ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                  : "border-border bg-transparent text-foreground/70",
              )}
              onClick={() => onCategoryChange(category.id)}
            >
              <span>{category.label}</span>
              {typeof category.count === "number" ? (
                <span className="ml-2 text-[10px] opacity-70">
                  {category.count}
                </span>
              ) : null}
            </Button>
          );
        })}
        {hasActiveFilters && onClearFilters ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 rounded-full px-3 text-xs text-muted-foreground hover:bg-foreground/5"
            onClick={onClearFilters}
          >
            Clear filters
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {techTags.map((tag) => {
          const isActive = activeTags.includes(tag);

          return (
            <button
              type="button"
              key={tag}
              data-active={isActive}
              onClick={() => onTagToggle(tag)}
              className={cn(
                "cursor-pointer rounded-full border border-border px-3 py-1 text-[11px]",
                "transition hover:border-foreground/30 hover:bg-foreground/5",
                isActive
                  ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                  : "bg-transparent text-foreground/70",
              )}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { FilterBar };
export type { FilterBarProps };
