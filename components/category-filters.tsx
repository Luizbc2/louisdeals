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
            onClick={() => onChange(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
              isActive
                ? "bg-[var(--accent)] text-white shadow-lg shadow-orange-200"
                : "border border-[var(--border)] bg-white text-slate-700 shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-orange-200 hover:text-slate-900"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
