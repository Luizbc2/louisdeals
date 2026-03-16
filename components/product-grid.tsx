import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="glass-panel rounded-[28px] px-5 py-10 text-center">
        <p className="mb-2 text-lg font-bold text-slate-900">
          Nenhum achadinho encontrado
        </p>
        <p className="text-sm leading-6 text-slate-600">
          Tente outro numero ou limpe os filtros para ver todos os produtos.
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
