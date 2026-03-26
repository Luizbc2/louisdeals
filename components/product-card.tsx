import Image from "next/image";
import { ArrowUpRight, Hash } from "lucide-react";
import { trackSiteClick } from "@/lib/analytics";
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
  const handleSelect = () => {
    trackSiteClick({
      buttonKey: "product_card_select",
      buttonLabel: "Abrir preview do produto",
      productId: product.id,
      metadata: {
        numeroAchado: product.numero_achado,
        categoria: product.categoria
      }
    });
    onSelect?.(product);
  };

  return (
    <article
      className={`glass-panel group flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[32px] border transition-all duration-300 ${
        isSelected
          ? "border-[color:var(--line-strong)] shadow-[0_26px_56px_rgba(19,122,103,0.16)]"
          : "border-[var(--border)] hover:-translate-y-1 hover:border-[color:var(--line-strong)] hover:shadow-[var(--shadow-card)]"
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={handleSelect}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleSelect();
          }
        }}
        aria-pressed={isSelected}
        className="flex flex-1 cursor-pointer flex-col text-left focus:outline-none focus-visible:outline-none"
      >
        <div className="relative aspect-[4/3.25] overflow-hidden bg-[var(--surface-muted)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.28),transparent_24%),linear-gradient(180deg,transparent_50%,rgba(22,18,15,0.18)_100%)] opacity-95" />
          <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-2 p-4">
            <div className="inline-flex max-w-full min-w-0 items-center gap-1 rounded-full border border-white/45 bg-white/78 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-strong)] backdrop-blur-md">
              <Hash className="h-3.5 w-3.5" />
              {product.numero_achado}
            </div>
            <span className="max-w-full min-w-0 truncate rounded-full border border-white/45 bg-white/72 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] backdrop-blur-md">
              {product.categoria}
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 p-4">
            <span className="rounded-full border border-white/40 bg-black/16 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/88 backdrop-blur-md">
              {isSelected ? "Preview aberto" : "Toque para ampliar"}
            </span>
          </div>
          <Image
            src={product.url_imagem}
            alt={product.titulo}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            className={`transform-gpu object-cover transition-transform duration-500 [backface-visibility:hidden] ${
              isSelected ? "scale-[1.04]" : "scale-[1.02] group-hover:scale-[1.08]"
            }`}
            sizes="(max-width: 767px) 100vw, (max-width: 1535px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col gap-4 px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Produto em foco
              </span>
              <h2 className="line-clamp-2 mt-2 text-[1.08rem] font-extrabold leading-6 text-[var(--foreground)] sm:text-[1.12rem]">
                {product.titulo}
              </h2>
            </div>

            <span className="tag-pill-muted px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em]">
              Preview
            </span>
          </div>

          <p className="text-[0.92rem] leading-7 text-[var(--muted)]">
            Clique no card para abrir a foto maior e ver os detalhes com mais
            destaque.
          </p>

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-[var(--border)] pt-4">
            {product.preco ? (
              <p className="display-title min-w-0 text-[1.55rem] leading-none tracking-[-0.06em] text-[var(--foreground)]">
                {product.preco}
              </p>
            ) : (
              <p className="min-w-0 text-sm font-semibold text-[var(--muted)]">
                Sob consulta
              </p>
            )}

            <span className="text-[0.76rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Preview
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <a
          href={product.link_afiliado}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackSiteClick({
              buttonKey: "product_card_affiliate",
              buttonLabel: "Ver agora",
              productId: product.id,
              metadata: {
                numeroAchado: product.numero_achado,
                categoria: product.categoria,
                source: "card"
              }
            })
          }
          className="cta-primary flex min-h-[50px] items-center justify-center gap-2 rounded-full px-4 text-sm font-extrabold transition-all duration-200 focus:outline-none"
        >
          Ver agora
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}
