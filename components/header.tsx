import { ShoppingBag } from "lucide-react";

const highlights = [
  { label: "Busca inteligente", value: "Ache pelo codigo do video" },
  { label: "Visual limpo", value: "Rapido no celular e no desktop" },
  { label: "Clique certo", value: "Leva direto ao link de compra" }
];

export function Header() {
  return (
    <header className="animate-fade-up glass-panel relative mb-6 overflow-hidden rounded-[34px] px-5 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="hero-orb animate-float left-[-20px] top-10 h-24 w-24 bg-emerald-400/30" />
      <div className="hero-orb right-[-12px] top-[-8px] h-28 w-28 bg-emerald-500/18" />

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
        <div className="min-w-0">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/14 bg-emerald-400/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-emerald-300">
                <span>{"\u{2728}"}</span>
                As melhores ofertas
              </p>
              <h1 className="text-[2.2rem] font-black leading-[0.95] tracking-[-0.06em] text-white sm:text-[2.8rem] lg:text-[3.35rem]">
                louisdeals
              </h1>
              <p className="mt-3 max-w-[60ch] text-sm leading-6 text-[var(--muted)] sm:text-[0.96rem]">
                Um catalogo de achados com visual premium, busca instantanea,
                filtros por categoria e foco em fazer o usuario chegar rapido ao
                produto certo.
              </p>
            </div>

            <div className="flex h-[3.4rem] w-[3.4rem] shrink-0 items-center justify-center rounded-[22px] border border-emerald-400/14 bg-emerald-400/10 text-emerald-300 shadow-[var(--shadow-soft)] sm:h-[3.8rem] sm:w-[3.8rem]">
              <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.1} />
            </div>
          </div>

          <div className="rounded-[28px] border border-emerald-400/10 bg-[linear-gradient(135deg,rgba(57,217,117,0.12),rgba(8,14,10,0.2))] p-4 sm:p-5">
            <p className="text-sm font-semibold text-white sm:text-base">
              Achados selecionados para voce encontrar rapido o que viu no video.
            </p>
            <p className="mt-1.5 text-sm leading-6 text-[var(--muted)]">
              Digite o codigo do produto, filtre por categoria e abra direto o
              link da oferta. Tudo organizado para facilitar a busca e acelerar
              o clique para compra.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="soft-panel rounded-[24px] px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/18"
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
    </header>
  );
}
