import { ShoppingBag, Sparkles, Tag, Zap } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    label: "Busca inteligente",
    value: "Ache pelo codigo do video"
  },
  {
    icon: Tag,
    label: "Categorias",
    value: "Filtre por tipo de produto"
  },
  {
    icon: Zap,
    label: "Clique rapido",
    value: "Abre direto a oferta"
  }
];

export function Header() {
  return (
    <header className="animate-fade-up mb-6 space-y-3 sm:space-y-4">
      <div className="glass-panel relative overflow-hidden rounded-[28px] p-2.5 sm:p-3">
        <div className="hero-orb animate-float left-[-14px] top-[-10px] h-20 w-20 bg-emerald-400/26" />
        <div className="hero-orb right-[-18px] bottom-[-16px] h-24 w-24 bg-emerald-500/18" />

        <div className="relative overflow-hidden rounded-[22px] border border-emerald-400/12 bg-[linear-gradient(135deg,#0b1711_0%,#0d2116_45%,#08110c_100%)] px-4 py-6 text-center sm:px-7 sm:py-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(57,217,117,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(57,217,117,0.12),transparent_18%)]" />

          <div className="relative mx-auto max-w-[560px]">
            <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/12 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-300">
              <span>{"\u{2728}"}</span>
              LouisDeals
            </p>
            <h1 className="text-[2rem] font-black leading-[0.92] tracking-[-0.06em] text-white sm:text-[3rem] lg:text-[3.8rem]">
              LouisDeals
            </h1>
            <p className="mx-auto mt-3 max-w-[30ch] text-sm leading-6 text-emerald-50/72 sm:max-w-[40ch] sm:text-[0.98rem]">
              Achados certos, busca rapida e acesso direto para a oferta.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel relative overflow-hidden rounded-[30px] px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
        <div className="hero-orb left-[-20px] top-12 h-24 w-24 bg-emerald-400/20" />
        <div className="hero-orb right-[-10px] top-[-12px] h-24 w-24 bg-emerald-500/14" />

        <div className="relative space-y-5">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-[20px] border border-emerald-400/14 bg-emerald-400/10 text-emerald-300 shadow-[var(--shadow-soft)]">
              <ShoppingBag className="h-6 w-6" strokeWidth={2.1} />
            </div>

            <div className="max-w-[620px]">
              <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/14 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-emerald-300">
                <span>{"\u{2728}"}</span>
                As melhores ofertas
              </p>
              <h2 className="text-[1.75rem] font-black leading-[1] tracking-[-0.05em] text-white sm:text-[2.25rem]">
                Encontre rapido o produto certo.
              </h2>
              <p className="mx-auto mt-3 max-w-[34ch] text-sm leading-6 text-[var(--muted)] sm:max-w-[56ch] sm:text-[0.98rem]">
                Digite o codigo do produto, filtre por categoria e abra direto
                o link da promocao. Tudo em uma vitrine simples, clara e feita
                para mobile.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="soft-panel rounded-[22px] px-4 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/18"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/12 bg-emerald-400/10 text-emerald-300">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold leading-6 text-white">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
