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
    const normalizedSearch = search.trim().toLowerCase();

    return initialProducts.filter((product) => {
      const matchesCategory =
        activeCategory === ALL_CATEGORY || product.categoria === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        String(product.numero_achado).includes(normalizedSearch) ||
        product.titulo.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, initialProducts, search]);

  return (
    <section className="grid gap-4 lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-5">
      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <SearchBar value={search} onChange={setSearch} />

        <div className="glass-panel rounded-[28px] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="section-title">Categorias</p>
              <p className="section-subtitle">Filtre mais rapido por tipo.</p>
            </div>
            <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              {categories.length - 1}
            </span>
          </div>

          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </aside>

      <div className="space-y-4">
        <div className="glass-panel flex flex-col gap-3 rounded-[26px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-title">Achados em destaque</p>
            <p className="section-subtitle">
              Ofertas organizadas para converter rapido em qualquer tela.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {search ? (
              <span className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                Busca: #{search}
              </span>
            ) : null}
            <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
              {filteredProducts.length} itens
            </span>
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}
