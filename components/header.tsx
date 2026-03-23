import { ShoppingBag } from "lucide-react";

const highlights = [
  { label: "Busca inteligente", value: "Ache pelo codigo do video" },
  { label: "Categorias", value: "Navegue por tipo de produto" },
  { label: "Clique rapido", value: "Abre direto a oferta" }
];

export function Header() {
  return (
    <header className="animate-fade-up mb-6 space-y-4">
      <div className="glass-panel relative overflow-hidden rounded-[30px] p-2 sm:p-3">
        <div className="hero-orb animate-float left-[-20px] top-4 h-20 w-20 bg-emerald-400/30" />
        <div className="hero-orb right-[-16px] top-[-10px] h-24 w-24 bg-emerald-500/22" />

        <div className="relative overflow-hidden rounded-[24px] border border-emerald-400/12 bg-[linear-gradient(135deg,#0b1711_0%,#0b1f14_45%,#08100c_100%)] px-4 py-7 text-center sm:px-7 sm:py-9 lg:px-10 lg:py-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(57,217,117,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(57,217,117,0.14),transparent_18%),linear-gradient(135deg,transparent,rgba(57,217,117,0.05))]" />

          <div className="relative mx-auto max-w-[900px]">
            <p className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/12 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-emerald-300 sm:text-[0.72rem]">
              <span>{"\u{2728}"}</span>
              LouisDeals
            </p>
            <h1 className="text-[2rem] font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-[3rem] lg:text-[4.5rem]">
              LouisDeals
            </h1>
            <p className="mx-auto mt-3 max-w-[38ch] text-sm leading-6 text-emerald-50/70 sm:text-base">
              Achados certos, busca rapida e clique direto para a oferta.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel relative overflow-hidden rounded-[34px] px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="hero-orb animate-float left-[-20px] top-10 h-24 w-24 bg-emerald-400/30" />
        <div className="hero-orb right-[-12px] top-[-8px] h-28 w-28 bg-emerald-500/18" />

        <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
          <div className="min-w-0 text-center lg:text-left">
            <div className="mb-4 flex flex-col items-center gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/14 bg-emerald-400/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-emerald-300">
                  <span>{"\u{2728}"}</span>
                  As melhores ofertas
                </p>
                <h2 className="text-[1.7rem] font-black leading-[0.98] tracking-[-0.05em] text-white sm:text-[2.1rem] lg:text-[2.5rem]">
                  Encontre rapido o produto certo.
                </h2>
                <p className="mt-3 mx-auto max-w-[60ch] text-sm leading-6 text-[var(--muted)] sm:text-[0.96rem] lg:mx-0">
                  Um catalogo de achados com busca instantanea, filtros por
                  categoria e um caminho rapido para o usuario abrir a oferta
                  certa sem enrolacao.
                </p>
              </div>

              <div className="flex h-[3.4rem] w-[3.4rem] shrink-0 items-center justify-center rounded-[22px] border border-emerald-400/14 bg-emerald-400/10 text-emerald-300 shadow-[var(--shadow-soft)] sm:h-[3.8rem] sm:w-[3.8rem]">
                <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.1} />
              </div>
            </div>

            <div className="rounded-[28px] border border-emerald-400/10 bg-[linear-gradient(135deg,rgba(57,217,117,0.12),rgba(8,14,10,0.2))] p-4 text-left sm:p-5">
              <p className="text-sm font-semibold text-white sm:text-base">
                Os achados certos, organizados para quem quer bater o olho e
                abrir a oferta.
              </p>
              <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
                Digite o codigo do produto, filtre por categoria e abra direto o
                link da promocao. Tudo em uma vitrine simples, rapida e clara.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="soft-panel rounded-[24px] px-4 py-3.5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/18 lg:text-left"
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-emerald-300">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
