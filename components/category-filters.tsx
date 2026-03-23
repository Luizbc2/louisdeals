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
                ? "border border-emerald-300/18 bg-[linear-gradient(135deg,#35cf70,#1c8e49)] text-white shadow-[0_16px_30px_rgba(53,207,112,0.26)]"
                : "border border-emerald-400/10 bg-black/35 text-[var(--foreground)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:border-emerald-400/22 hover:bg-emerald-400/8 hover:text-emerald-200"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
