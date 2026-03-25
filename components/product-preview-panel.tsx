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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 px-3 py-4 backdrop-blur-md sm:px-6"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes do produto ${product.titulo}`}
        onClick={(event) => event.stopPropagation()}
        className="glass-panel animate-fade-up flex max-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[34px] border border-emerald-300/16"
      >
        <div className="flex items-start justify-between gap-3 border-b border-emerald-300/10 px-4 py-4 sm:px-5">
          <div>
            <p className="section-title">Produto em destaque</p>
            <p className="section-subtitle">
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
            className="cta-secondary inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-200"
            aria-label="Fechar detalhes do produto"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="relative min-h-[280px] bg-[var(--surface-muted)] lg:min-h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,234,175,0.16),transparent_24%)] opacity-90" />
            <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-start justify-between gap-2 p-4">
              <div className="inline-flex max-w-full min-w-0 items-center gap-1 rounded-full border border-emerald-300/14 bg-black/45 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-emerald-100 backdrop-blur-md">
                <Hash className="h-3.5 w-3.5" />
                {product.numero_achado}
              </div>
              <span className="max-w-full min-w-0 truncate rounded-full border border-white/10 bg-black/35 px-2.5 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-emerald-50 backdrop-blur-md">
                {product.categoria}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/76 via-black/10 to-transparent" />
            <Image
              src={product.url_imagem}
              alt={product.titulo}
              fill
              className="object-cover"
              sizes="(max-width: 1023px) 100vw, 58vw"
            />
          </div>

          <div className="flex min-h-0 flex-col overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-emerald-200/84">
                  Nome completo
                </p>
                <h3 className="display-title text-[1.9rem] font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-[2.35rem]">
                  {product.titulo}
                </h3>
              </div>

              <div className="soft-panel rounded-[26px] p-4">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-emerald-200/84">
                  Valor
                </p>
                <p className="display-title mt-2 text-[2.2rem] font-black tracking-[-0.06em] text-white sm:text-[2.55rem]">
                  {product.preco || "Sob consulta"}
                </p>
              </div>

              <p className="text-sm leading-6 text-[var(--muted)] sm:text-[0.95rem]">
                Clique no botao abaixo para abrir a oferta na Shopee e concluir
                sua compra.
              </p>
            </div>

            <div className="mt-5 border-t border-emerald-300/10 pt-4">
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
                className="cta-primary flex w-full items-center justify-center gap-2 rounded-[20px] px-3 py-3 text-sm font-extrabold transition-all duration-200"
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
