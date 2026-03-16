import Image from "next/image";
import { ArrowUpRight, Hash } from "lucide-react";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="glass-panel group overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-muted)]">
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent)] shadow-[var(--shadow-soft)]">
            <Hash className="h-3.5 w-3.5" />
            {product.numero_achado}
          </div>
          <span className="rounded-full bg-slate-900/72 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
            {product.categoria}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/18 to-transparent" />
        <Image
          src={product.url_imagem}
          alt={product.titulo}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
      </div>

      <div className="space-y-3 p-3.5 sm:p-4">
        <div>
          <h2 className="line-clamp-2 text-[0.95rem] font-extrabold leading-5 text-slate-900 sm:text-base">
            {product.titulo}
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            Clique para abrir na Shopee e ver os detalhes completos do produto.
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          {product.preco ? (
            <p className="text-[1.05rem] font-black tracking-[-0.03em] text-slate-900 sm:text-[1.15rem]">
              {product.preco}
            </p>
          ) : (
            <p className="text-sm font-semibold text-slate-400">
              Preco sob consulta
            </p>
          )}

          <span className="rounded-full bg-[var(--surface-muted)] px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
            Link afiliado
          </span>
        </div>

        <a
          href={product.link_afiliado}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-[18px] bg-[var(--accent)] px-3 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-[var(--accent-strong)] hover:tracking-[0.01em]"
        >
          Ver na Shopee
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
