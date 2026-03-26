import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

type ProductGridProps = {
  products: Product[];
  selectedProductId?: number | null;
  onSelectProduct?: (product: Product) => void;
};

export function ProductGrid({
  products,
  selectedProductId = null,
  onSelectProduct
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass-panel rounded-[34px] px-5 py-12 text-center sm:px-8">
        <p className="display-title mb-3 text-[1.95rem] leading-[0.95] tracking-[-0.06em] text-[var(--foreground)]">
          Nenhum produto encontrado
        </p>
        <p className="mx-auto max-w-[42ch] text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">
          Tente outro codigo ou remova os filtros para voltar a vitrine
          completa.
        </p>
      </div>
    );
  }

  return (
    <div className="grid w-full min-w-0 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProductId === product.id}
          onSelect={onSelectProduct}
          priority={index < 6}
        />
      ))}
    </div>
  );
}
