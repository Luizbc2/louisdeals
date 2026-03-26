"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Hash, X } from "lucide-react";
import { trackSiteClick } from "@/lib/analytics";
import type { Product } from "@/lib/types";

type ProductPreviewPanelProps = {
  product: Product;
  onClose: () => void;
};

export function ProductPreviewPanel({
  product,
  onClose
}: ProductPreviewPanelProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[rgba(24,20,18,0.58)] px-3 py-3 backdrop-blur-md sm:items-center sm:px-6 sm:py-6"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do produto ${product.titulo}`}
        onClick={(event) => event.stopPropagation()}
        className="glass-panel animate-fade-up flex max-h-[calc(100vh-0.75rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-[var(--line-strong)] sm:rounded-[36px]"
      >
        <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
          <div className="relative min-h-[320px] bg-[var(--surface-muted)] sm:min-h-[380px] lg:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.34),transparent_24%),linear-gradient(180deg,transparent_44%,rgba(25,20,17,0.16)_100%)] opacity-95" />
            <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-2 p-4">
              <div className="inline-flex max-w-full min-w-0 items-center gap-1 rounded-full border border-white/45 bg-white/78 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--accent-strong)] backdrop-blur-md">
                <Hash className="h-3.5 w-3.5" />
                {product.numero_achado}
              </div>
              <span className="max-w-full min-w-0 truncate rounded-full border border-white/45 bg-white/72 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] backdrop-blur-md">
                {product.categoria}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-[rgba(18,14,12,0.18)] to-transparent" />
            <Image
              src={product.url_imagem}
              alt={product.titulo}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 55vw"
            />
          </div>

          <div className="flex min-h-0 flex-col overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Produto em destaque
                </p>
                <p className="section-subtitle mt-2 max-w-[42ch]">
                  O item abriu por cima da vitrine para uma leitura mais rica.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  trackSiteClick({
                    buttonKey: "product_modal_close",
                    buttonLabel: "Fechar preview",
                    productId: product.id,
                    metadata: {
                      numeroAchado: product.numero_achado
                    }
                  });
                  onClose();
                }}
                className="cta-secondary inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200"
                aria-label="Fechar detalhes do produto"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="tag-pill">Achado #{product.numero_achado}</span>
              <span className="tag-pill-muted">{product.categoria}</span>
            </div>

            <p className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Nome completo
            </p>
            <h3 className="display-title mt-5 text-[clamp(2.2rem,6vw,3.5rem)] leading-[0.92] tracking-[-0.08em] text-[var(--foreground)]">
              {product.titulo}
            </h3>

            <div className="soft-panel mt-5 rounded-[28px] p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                Valor
              </p>
              <p className="display-title mt-3 text-[clamp(2rem,7vw,3.3rem)] leading-[0.92] tracking-[-0.08em] text-[var(--foreground)]">
                {product.preco || "Sob consulta"}
              </p>
            </div>

            <p className="mt-5 text-[0.94rem] leading-7 text-[var(--muted)]">
              Clique no botao abaixo para abrir a oferta na Shopee e concluir
              sua compra.
            </p>

            <div className="mt-auto pt-6">
              <a
                href={product.link_afiliado}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackSiteClick({
                    buttonKey: "product_modal_affiliate",
                    buttonLabel: "Ver agora no modal",
                    productId: product.id,
                    metadata: {
                      numeroAchado: product.numero_achado,
                      categoria: product.categoria,
                      source: "modal"
                    }
                  })
                }
                className="cta-primary flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full px-4 text-sm font-extrabold transition-all duration-200"
              >
                Ver agora
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
