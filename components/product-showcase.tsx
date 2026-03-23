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
    <section className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-5">
      <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
        <SearchBar value={search} onChange={setSearch} />

        <div className="glass-panel rounded-[30px] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="section-title">Categorias</p>
              <p className="section-subtitle">Escolha o setor do produto.</p>
            </div>
            <span className="rounded-full border border-emerald-400/12 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-emerald-300">
              {categories.length - 1}
            </span>
          </div>

          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="soft-panel rounded-[28px] p-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-emerald-300">
            Fluxo rapido
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Busque pelo codigo ou navegue pelas categorias. O resultado aparece
            de forma limpa para o clique acontecer sem distracao.
          </p>
        </div>
      </aside>

      <div className="space-y-4">
        <div className="glass-panel flex flex-col gap-3 rounded-[28px] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-title">Vitrine em destaque</p>
            <p className="section-subtitle">
              Selecoes prontas para serem exploradas com rapidez.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {search ? (
              <span className="rounded-full border border-emerald-400/12 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-200">
                Codigo: #{search}
              </span>
            ) : null}
            <span className="rounded-full border border-emerald-400/12 bg-black/45 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-300">
              {filteredProducts.length} itens
            </span>
          </div>
        </div>

        <ProductGrid products={filteredProducts} />
      </div>
    </section>
  );
}
