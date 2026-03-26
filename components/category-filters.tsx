import { trackSiteClick } from "@/lib/analytics";

type CategoryFiltersProps = {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export function CategoryFilters({
  categories,
  activeCategory,
  onChange
}: CategoryFiltersProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1 pt-1 lg:flex-wrap lg:overflow-visible">
      {categories.map((category) => {
        const isActive = category === activeCategory;

        return (
          <button
            key={category}
            type="button"
            onClick={() => {
              trackSiteClick({
                buttonKey: "category_filter",
                buttonLabel: `Filtro ${category}`,
                metadata: {
                  category
                }
              });
              onChange(category);
            }}
            className={`min-h-[44px] whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "cta-primary"
                : "border border-[var(--border)] bg-white/70 text-[var(--foreground)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] hover:bg-[var(--accent-fade)]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
