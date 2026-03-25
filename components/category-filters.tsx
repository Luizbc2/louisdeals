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
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "cta-primary"
                : "border border-emerald-400/10 bg-black/28 text-[var(--foreground)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-emerald-300/18 hover:bg-emerald-300/7 hover:text-emerald-50"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
