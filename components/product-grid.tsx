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
      <div className="glass-panel rounded-[32px] px-5 py-12 text-center">
        <p className="display-title mb-2 text-[1.55rem] font-black tracking-[-0.05em] text-white">
          Nenhum produto encontrado
        </p>
        <p className="text-sm leading-6 text-[var(--muted)]">
          Tente outro codigo ou remova os filtros para voltar a vitrine
          completa.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 lg:grid lg:grid-cols-2 2xl:grid-cols-3">
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
