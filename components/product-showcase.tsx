"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { CategoryFilters } from "@/components/category-filters";
import { ProductGrid } from "@/components/product-grid";
import { SearchBar } from "@/components/search-bar";

type ProductShowcaseProps = {
  initialProducts: Product[];
};

const ALL_CATEGORY = "Todos";

export function ProductShowcase({ initialProducts }: ProductShowcaseProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(initialProducts.map((product) => product.categoria))
    );

    return [ALL_CATEGORY, ...dynamicCategories];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim();

    return initialProducts.filter((product) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || product.categoria === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        String(product.numero_achado) === normalizedSearch;

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, initialProducts, search]);

  return (
    <section id="produtos" className="min-w-0 space-y-4">
      <div className="glass-panel rounded-[32px] p-4 sm:p-5">
        <div className="flex flex-col gap-4">
          <SearchBar value={search} onChange={setSearch} />

          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      <ProductGrid products={filteredProducts} />
    </section>
  );
}
