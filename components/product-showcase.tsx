"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { CategoryFilters } from "@/components/category-filters";
import { ProductGrid } from "@/components/product-grid";
import { ProductPreviewPanel } from "@/components/product-preview-panel";
import { SearchBar } from "@/components/search-bar";

type ProductShowcaseProps = {
  initialProducts: Product[];
};

const ALL_CATEGORY = "Todos";

export function ProductShowcase({ initialProducts }: ProductShowcaseProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

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

  const selectedProduct = useMemo(
    () =>
      filteredProducts.find((product) => product.id === selectedProductId) ??
      null,
    [filteredProducts, selectedProductId]
  );

  useEffect(() => {
    if (selectedProductId === null) {
      return;
    }

    const productIsVisible = filteredProducts.some(
      (product) => product.id === selectedProductId
    );

    if (!productIsVisible) {
      setSelectedProductId(null);
    }
  }, [filteredProducts, selectedProductId]);

  return (
    <section
      id="produtos"
      className="grid min-w-0 gap-4 xl:grid-cols-[320px_minmax(0,1fr)] xl:gap-5"
    >
      <aside className="min-w-0 space-y-4 xl:sticky xl:top-6 xl:self-start">
        <SearchBar value={search} onChange={setSearch} />

        <div className="glass-panel overflow-hidden rounded-[30px] p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="section-title">Categorias</p>
              <p className="section-subtitle">
                Escolha o setor para lapidar a vitrine.
              </p>
            </div>
            <span className="tag-pill">{categories.length - 1}</span>
          </div>

          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="soft-panel rounded-[28px] p-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-emerald-200/84">
            Fluxo rapido
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
            Busque pelo codigo ou navegue pelas categorias. O resultado aparece
            com foco no produto e o clique vai direto para a oferta, sem
            friccao.
          </p>

          <div className="mt-4 grid gap-2">
            <div className="metric-card rounded-[20px] px-3.5 py-3">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-emerald-200/74">
                Busca
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Digite o numero do achado
              </p>
            </div>
            <div className="metric-card rounded-[20px] px-3.5 py-3">
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-emerald-200/74">
                Abertura
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Abra o preview sem sair da pagina
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        <div className="glass-panel relative overflow-hidden rounded-[30px] px-4 py-4 sm:px-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(132,234,175,0.12),transparent_22%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_45%)]" />

          <div className="relative flex min-w-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <span className="eyebrow mb-3">vitrine em destaque</span>
              <p className="display-title text-[1.65rem] font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-[2rem]">
                Todos os produtos em um lugar só.
              </p>
              <p className="section-subtitle mt-2 max-w-[58ch]">
                 Clique na imagem do produto para abrir a descrição e acessar a oferta rapidamente, sem
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {search ? <span className="tag-pill">Codigo: #{search}</span> : null}
              {selectedProduct ? (
                <span className="tag-pill-muted">
                  Aberto: #{selectedProduct.numero_achado}
                </span>
              ) : null}
              <span className="tag-pill-muted">{filteredProducts.length} itens</span>
            </div>
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          selectedProductId={selectedProductId}
          onSelectProduct={(product) => setSelectedProductId(product.id)}
        />
      </div>

      {selectedProduct ? (
        <ProductPreviewPanel
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
        />
      ) : null}
    </section>
  );
}
