import Image from "next/image";
import { ArrowUpRight, Hash } from "lucide-react";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="glass-panel group overflow-hidden rounded-[30px] border border-emerald-400/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/22 hover:shadow-[var(--shadow-card)]">
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-muted)]">
        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-3">
          <div className="inline-flex items-center gap-1 rounded-full border border-emerald-400/12 bg-black/60 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-emerald-300 backdrop-blur">
            <Hash className="h-3.5 w-3.5" />
            {product.numero_achado}
          </div>
          <span className="rounded-full border border-emerald-300/10 bg-black/45 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-emerald-50 backdrop-blur">
            {product.categoria}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <Image
          src={product.url_imagem}
          alt={product.titulo}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
        />
      </div>

      <div className="space-y-3 p-3.5 sm:p-4">
        <div>
          <h2 className="line-clamp-2 text-[0.96rem] font-extrabold leading-5 text-white sm:text-base">
            {product.titulo}
          </h2>
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
            Visual rapido, clique direto e foco total no produto.
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          {product.preco ? (
            <p className="text-[1.05rem] font-black tracking-[-0.03em] text-emerald-300 sm:text-[1.15rem]">
              {product.preco}
            </p>
          ) : (
            <p className="text-sm font-semibold text-[var(--muted)]">
              Preco sob consulta
            </p>
          )}

          <span className="rounded-full border border-emerald-400/12 bg-emerald-400/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-emerald-300">
            deal
          </span>
        </div>

        <a
          href={product.link_afiliado}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 rounded-[18px] bg-[linear-gradient(135deg,#35cf70,#1c8e49)] px-3 py-3 text-sm font-bold text-white transition-all duration-200 hover:translate-y-[-1px] hover:brightness-105"
        >
          Ver agora
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
