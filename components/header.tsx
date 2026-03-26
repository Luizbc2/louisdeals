"use client";

import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  MoonStar,
  ShoppingBag,
  Sparkles,
  SunMedium,
  Tag,
  Zap
} from "lucide-react";
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

const quickStats = [
  {
    label: "Busca por codigo",
    value: "Encontre produtos pelos codigos dos videos."
  },
  {
    label: "Categorias",
    value: "Navegue rapido pelo tipo de produto que voce quer."
  },
  {
    label: "Links diretos",
    value: "Abra a oferta sem enrolacao e sem perder tempo."
  }
];

export function Header() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("louis-site-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      document.body.dataset.siteTheme = storedTheme;
      return;
    }

    document.body.dataset.siteTheme = "dark";
  }, []);

  useEffect(() => {
    document.body.dataset.siteTheme = theme;
    window.localStorage.setItem("louis-site-theme", theme);
  }, [theme]);

  return (
    <header className="animate-fade-up mb-5 w-full max-w-full overflow-x-clip sm:mb-6">
      <div className="glass-panel relative overflow-hidden rounded-[36px] px-5 py-5 sm:px-7 sm:py-7 xl:px-8 xl:py-8">
        <div className="hero-orb animate-float left-[-52px] top-[-24px] h-32 w-32 bg-[rgba(221,147,82,0.22)]" />
        <div className="hero-orb bottom-[-40px] right-[-22px] h-40 w-40 bg-[rgba(105,201,166,0.18)]" />
        <div className="absolute inset-[1px] rounded-[35px] border border-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),transparent_48%)]" />

        <div className="relative grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_360px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                LouisDeals
              </span>
              <span className="tag-pill-muted">As melhores ofertas!</span>
              <button
                type="button"
                onClick={() =>
                  setTheme((current) => (current === "dark" ? "light" : "dark"))
                }
                className="cta-secondary inline-flex min-h-[42px] items-center gap-2 rounded-full px-4 text-[0.78rem] font-semibold"
              >
                {theme === "dark" ? (
                  <>
                    <SunMedium className="h-4 w-4" />
                    Tema claro
                  </>
                ) : (
                  <>
                    <MoonStar className="h-4 w-4" />
                    Tema escuro
                  </>
                )}
              </button>
            </div>

            <h1 className="display-title mt-5 max-w-[12ch] text-[clamp(2.4rem,9vw,5.7rem)] leading-[0.9] tracking-[-0.08em] text-[var(--foreground)]">
              Os melhores produtos que valem o seu clique.
            </h1>

            <p className="mt-4 max-w-[60ch] text-[0.98rem] leading-7 text-[var(--muted)] sm:text-[1.05rem]">
              Encontre produtos pelos codigos dos videos, navegue por categoria
              e abra direto a oferta. Tudo reunido em uma vitrine pratica,
              bonita e feita para facilitar sua busca.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                className="cta-primary inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold sm:text-[0.95rem]"
              >
                Ver produtos
                <ArrowDownRight className="h-4 w-4" />
              </a>

              <div className="flex flex-wrap gap-2">
                <span className="tag-pill">Busca por codigo</span>
                <span className="tag-pill">Categorias organizadas</span>
                <span className="tag-pill">Links diretos</span>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {quickStats.map((item) => (
                <div key={item.label} className="metric-card rounded-[24px] p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <div className="soft-panel rounded-[30px] p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] border border-[var(--border)] bg-white/10 text-[var(--accent)] shadow-[var(--shadow-soft)]">
                  <ShoppingBag className="h-5 w-5" strokeWidth={2} />
                </div>
                <div>
                  <p className="section-title">Achados em destaque</p>
                  <p className="section-subtitle mt-2">
                    Veja rapido, abra o produto e siga para a oferta.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="metric-card rounded-[22px] px-4 py-3.5"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[14px] border border-[var(--border)] bg-white/10 text-[var(--accent)]">
                        <Icon className="h-4 w-4" strokeWidth={2.1} />
                      </div>
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[var(--foreground)]">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel rounded-[30px] p-5">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                Vitrine direta
              </p>
              <p className="display-title mt-3 text-[2rem] leading-[0.94] tracking-[-0.06em] text-[var(--foreground)]">
                Uma vitrine direta para voce encontrar sem perder tempo.
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Tudo reunido para facilitar sua busca e levar voce rapido para
                a oferta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
