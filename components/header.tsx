"use client";

import { ArrowDownRight, ShoppingBag, Sparkles, Tag, Zap } from "lucide-react";
import { trackSiteClick } from "@/lib/analytics";

const highlights = [
  {
    icon: Sparkles,
    label: "Busca precisa",
    value: "Digite o codigo e encontre em segundos"
  },
  {
    icon: Tag,
    label: "Categorias organizadas",
    value: "Encontre o tipo de produto que voce quer"
  },
  {
    icon: Zap,
    label: "Clique direto",
    value: "Sai da vitrine e abre a oferta"
  }
];

export function Header() {
  return (
    <header className="animate-fade-up mb-4 w-full max-w-full overflow-x-clip sm:mb-5">
      <div className="glass-panel relative overflow-hidden rounded-[34px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
        <div className="hero-orb animate-float left-[-28px] top-[-12px] h-24 w-24 bg-emerald-300/22" />
        <div className="hero-orb bottom-[-28px] right-[-24px] h-32 w-32 bg-emerald-500/16" />
        <div className="absolute inset-[1px] rounded-[33px] border border-white/4" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,234,175,0.16),transparent_24%),radial-gradient(circle_at_88%_18%,rgba(132,234,175,0.1),transparent_18%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_42%)]" />

        <div className="relative grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="min-w-0 overflow-hidden rounded-[28px] border border-emerald-300/10 bg-[linear-gradient(145deg,rgba(14,29,23,0.92),rgba(8,15,12,0.96))] p-4.5 sm:p-6 lg:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                <span>{"\u2726"}</span>
                LouisDeals
              </span>
              <span className="tag-pill-muted">As melhores ofertas!</span>
            </div>

            <div className="max-w-none lg:max-w-[12ch]">
              <h1 className="display-title max-w-[9.8ch] text-[1.9rem] font-black leading-[0.92] tracking-[-0.08em] text-white sm:max-w-[12ch] sm:text-[3rem] lg:max-w-none lg:text-[4rem]">
                Os melhores produtos que valem o seu clique.
              </h1>
            </div>

            <p className="mt-3.5 max-w-[54ch] text-sm leading-6 text-emerald-50/74 sm:text-[0.96rem]">
              Encontre produtos pelos codigos dos videos, navegue por categoria
              e abra direto a oferta. Tudo reunido em uma vitrine pratica,
              bonita e feita para facilitar sua busca.
            </p>

            <div className="mt-4.5 flex flex-wrap gap-2.5">
              <span className="tag-pill">Busca por codigo</span>
              <span className="tag-pill">Categorias organizadas</span>
              <span className="tag-pill">Links diretos</span>
            </div>

            <div className="mt-5">
              <a
                href="#produtos"
                onClick={() =>
                  trackSiteClick({
                    buttonKey: "hero_view_products",
                    buttonLabel: "Ver produtos",
                    metadata: {
                      area: "header"
                    }
                  })
                }
                className="cta-primary inline-flex items-center gap-2 rounded-[20px] px-4 py-3 text-sm font-extrabold transition-all duration-200"
              >
                Ver produtos
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="soft-panel relative overflow-hidden rounded-[28px] p-4 sm:p-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(132,234,175,0.16),transparent_22%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.18)_100%)]" />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-emerald-200/12 bg-emerald-100/8 text-emerald-100 shadow-[var(--shadow-soft)]">
                  <ShoppingBag className="h-6 w-6" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-emerald-200/80">
                    Achados em destaque
                  </p>
                  <h2 className="display-title mt-2 text-[1.35rem] font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-[1.55rem]">
                    Veja rapido, abra o produto e siga para a oferta.
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    Uma vitrine direta para voce encontrar sem perder tempo.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="metric-card rounded-[22px] px-4 py-3.5"
                  >
                    <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-[14px] border border-emerald-200/10 bg-emerald-200/6 text-emerald-200">
                      <Icon className="h-4 w-4" strokeWidth={2.1} />
                    </div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-emerald-200/78">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-[0.84rem] font-semibold leading-5 text-white">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
