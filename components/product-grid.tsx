import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass-panel rounded-[30px] px-5 py-10 text-center">
        <p className="mb-2 text-lg font-bold text-white">
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
    <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
