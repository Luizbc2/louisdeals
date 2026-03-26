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

const flowSteps = [
  {
    title: "Busca",
    body: "Digite o numero do achado"
  },
  {
    title: "Abertura",
    body: "Abra o preview sem sair da pagina"
  }
];

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

  const summaryItems = [
    {
      label: "Categorias",
      value: String(Math.max(categories.length - 1, 0))
    },
    {
      label: "Itens visiveis",
      value: String(filteredProducts.length)
    },
    {
      label: "Preview",
      value: selectedProduct ? `#${selectedProduct.numero_achado}` : "Nenhum"
    }
  ];

  return (
    <section
      id="produtos"
      className="grid min-w-0 gap-4 xl:grid-cols-[312px_minmax(0,1fr)] xl:gap-5"
    >
      <aside className="min-w-0 space-y-4 xl:sticky xl:top-6 xl:self-start">
        <SearchBar value={search} onChange={setSearch} />

        <div className="glass-panel overflow-hidden rounded-[32px] p-5 sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="section-title">Categorias</p>
              <p className="section-subtitle mt-2">
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

        <div className="soft-panel rounded-[32px] p-5 sm:p-6">
          <span className="eyebrow">Fluxo rapido</span>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Busque pelo codigo ou navegue pelas categorias. O resultado aparece
            com foco no produto e o clique vai direto para a oferta, sem
            friccao.
          </p>
          <div className="mt-4 grid gap-3">
            {flowSteps.map((step) => (
              <div key={step.title} className="metric-card rounded-[22px] p-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {step.title}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0 space-y-4">
        <div className="glass-panel relative overflow-hidden rounded-[36px] px-5 py-5 sm:px-6 sm:py-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,122,103,0.14),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(207,127,63,0.1),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.2),transparent_48%)]" />

          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div className="min-w-0">
              <span className="eyebrow mb-4">vitrine em destaque</span>
              <p className="display-title text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-[-0.08em] text-[var(--foreground)]">
                Todos os produtos em um lugar so.
              </p>
              <p className="section-subtitle mt-3 max-w-[58ch]">
                Clique na imagem do produto para abrir a descricao e acessar a
                oferta rapidamente, sem sair da vitrine.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {summaryItems.map((item) => (
                <div key={item.label} className="metric-card rounded-[24px] p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {item.label}
                  </p>
                  <p className="display-title mt-2 text-[1.7rem] leading-none tracking-[-0.06em] text-[var(--foreground)]">
                    {item.label === "Itens visiveis" ? `${item.value} itens` : item.value}
                  </p>
                </div>
              ))}
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
