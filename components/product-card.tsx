import Image from "next/image";
import { ArrowUpRight, Hash } from "lucide-react";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  isSelected?: boolean;
  onSelect?: (product: Product) => void;
  priority?: boolean;
};

export function ProductCard({
  product,
  isSelected = false,
  onSelect,
  priority = false
}: ProductCardProps) {
  return (
    <article
      className={`glass-panel group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[32px] border transition-all duration-300 ${
        isSelected
          ? "border-emerald-200/28 shadow-[0_24px_56px_rgba(17,68,42,0.34)]"
          : "border-emerald-400/10 hover:-translate-y-1 hover:border-emerald-300/18 hover:shadow-[var(--shadow-card)]"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect?.(product)}
        aria-pressed={isSelected}
        className="flex flex-1 cursor-pointer flex-col text-left focus:outline-none focus-visible:outline-none"
      >
        <div className="relative aspect-square overflow-hidden bg-[var(--surface-muted)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,234,175,0.15),transparent_24%)] opacity-90" />
          <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-2 p-3">
            <div className="inline-flex max-w-full min-w-0 items-center gap-1 rounded-full border border-emerald-300/14 bg-black/40 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-emerald-100 backdrop-blur-md">
              <Hash className="h-3.5 w-3.5" />
              {product.numero_achado}
            </div>
            <span className="max-w-full min-w-0 truncate rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-emerald-50 backdrop-blur-md">
              {product.categoria}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[4px] bg-[var(--surface-strong)]" />
          <Image
            src={product.url_imagem}
            alt={product.titulo}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className={`transform-gpu object-cover transition-transform duration-500 [backface-visibility:hidden] ${
              isSelected ? "scale-[1.04]" : "scale-[1.03] group-hover:scale-[1.09]"
            }`}
            sizes="(max-width: 1023px) 100vw, (max-width: 1535px) 50vw, 33vw"
          />
        </div>

        <div className="relative z-10 -mt-[1px] flex flex-1 flex-col gap-4 bg-[linear-gradient(180deg,rgba(14,29,23,0.96),rgba(8,15,12,0.98))] p-4 sm:p-[18px]">
          <div className="space-y-2">
            <span className="text-[0.66rem] font-bold uppercase tracking-[0.22em] text-emerald-200/72">
              Produto em foco
            </span>
            <h2 className="line-clamp-2 text-[1rem] font-extrabold leading-6 text-white sm:text-[1.04rem]">
              {product.titulo}
            </h2>
            <p className="text-xs leading-5 text-[var(--muted)]">
              Clique no card para abrir a foto maior e ver os detalhes com mais
              destaque.
            </p>
          </div>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-2.5">
            {product.preco ? (
              <p className="display-title min-w-0 text-[1.2rem] font-black tracking-[-0.05em] text-emerald-100 sm:text-[1.28rem]">
                {product.preco}
              </p>
            ) : (
              <p className="min-w-0 text-sm font-semibold text-[var(--muted)]">
                Preco sob consulta
              </p>
            )}

            <span className="tag-pill-muted px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.16em]">
              preview
            </span>
          </div>
        </div>
      </button>

      <div className="relative z-20 -mt-[1px] bg-[linear-gradient(180deg,rgba(14,29,23,0.98),rgba(8,15,12,0.99))] px-4 pb-4 pt-2">
        <a
          href={product.link_afiliado}
          target="_blank"
          rel="noreferrer"
          className="cta-primary relative z-10 flex items-center justify-center gap-2 rounded-[20px] px-3 py-3 text-sm font-extrabold transition-all duration-200 focus:outline-none"
        >
          Ver agora
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
