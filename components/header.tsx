import { ShoppingBag } from "lucide-react";

const highlights = [
  { label: "Busca rapida", value: "Numero do video" },
  { label: "Categorias", value: "Casa, tech e mais" },
  { label: "Clique direto", value: "Abre na Shopee" }
];

export function Header() {
  return (
    <header className="animate-fade-up glass-panel relative mb-6 overflow-hidden rounded-[32px] px-5 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-7">
      <div className="hero-orb animate-float left-[-30px] top-8 h-24 w-24 bg-orange-200" />
      <div className="hero-orb right-[-18px] top-[-8px] h-20 w-20 bg-amber-100" />

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_320px] lg:items-end">
        <div className="min-w-0">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[var(--accent)] shadow-[var(--shadow-soft)]">
                <span>{"\u{1F6CD}\uFE0F"}</span>
                Achadinhos
              </p>
              <h1 className="max-w-[12ch] text-[2rem] font-black leading-[1.02] tracking-[-0.05em] text-slate-900 sm:max-w-none sm:text-[2.35rem] lg:text-[2.8rem]">
                Achadinhos da Shopee
              </h1>
            </div>

            <div className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center rounded-[22px] bg-gradient-to-br from-[var(--surface-muted)] to-white text-[var(--accent)] shadow-[var(--shadow-soft)] sm:h-14 sm:w-14">
              <ShoppingBag className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.2} />
            </div>
          </div>

          <div className="rounded-[26px] bg-[linear-gradient(135deg,rgba(238,77,45,0.12),rgba(255,255,255,0.92))] p-4 sm:p-5">
            <p className="text-sm font-semibold text-slate-900 sm:text-base">
              Encontre rapido o produto exato do video e envie o clique certo
              para a Shopee.
            </p>
            <p className="mt-1.5 max-w-[58ch] text-sm leading-6 text-slate-600">
              Busque pelo numero do achadinho, filtre por categoria e abra em
              um toque o seu link de afiliado. A experiencia segue mobile-first,
              mas agora responde melhor em notebook, desktop e telas amplas.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="soft-panel rounded-[24px] px-4 py-3.5 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
