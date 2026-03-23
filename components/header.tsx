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
    <header className="animate-fade-up mb-6 w-full max-w-full overflow-x-clip space-y-3 sm:space-y-4">
      <div className="glass-panel relative w-full max-w-full overflow-hidden rounded-[28px] p-2.5 sm:p-3">
        <div className="hero-orb animate-float left-0 top-0 h-20 w-20 bg-emerald-400/26 sm:left-[-14px] sm:top-[-10px]" />
        <div className="hero-orb bottom-0 right-0 h-24 w-24 bg-emerald-500/18 sm:bottom-[-16px] sm:right-[-18px]" />

        <div className="relative max-w-full overflow-hidden rounded-[22px] border border-emerald-400/12 bg-[linear-gradient(135deg,#0b1711_0%,#0d2116_45%,#08110c_100%)] px-4 py-6 text-center sm:px-7 sm:py-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(57,217,117,0.18),transparent_22%),radial-gradient(circle_at_85%_20%,rgba(57,217,117,0.12),transparent_18%)]" />

          <div className="relative mx-auto w-full max-w-[560px] min-w-0 text-center">
            <p className="mx-auto mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/12 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-emerald-300">
              <span>{"\u{2728}"}</span>
              LouisDeals
            </p>
            <h1 className="mx-auto max-w-[10ch] break-words text-[2rem] font-black leading-[0.92] tracking-[-0.06em] text-white sm:max-w-none sm:text-[3rem] lg:text-[3.8rem]">
              LouisDeals
            </h1>
            <p className="mx-auto mt-3 max-w-[30ch] text-sm leading-6 text-emerald-50/72 sm:max-w-[40ch] sm:text-[0.98rem]">
              Achados certos, busca rapida e acesso direto para a oferta.
            </p>
          </div>
        </div>
      </div>

      <div className="glass-panel relative w-full max-w-full overflow-hidden rounded-[30px] px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
        <div className="hero-orb left-0 top-10 h-24 w-24 bg-emerald-400/20 sm:left-[-20px] sm:top-12" />
        <div className="hero-orb right-0 top-0 h-24 w-24 bg-emerald-500/14 sm:right-[-10px] sm:top-[-12px]" />

        <div className="relative mx-auto w-full max-w-[760px] min-w-0">
          <div className="mx-auto flex w-full max-w-[620px] min-w-0 flex-col items-center text-center">
            <div className="mb-4 flex h-[3.4rem] w-[3.4rem] items-center justify-center rounded-[20px] border border-emerald-400/14 bg-emerald-400/10 text-emerald-300 shadow-[var(--shadow-soft)]">
              <ShoppingBag className="h-6 w-6" strokeWidth={2.1} />
            </div>

            <p className="mx-auto mb-3 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/14 bg-emerald-400/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-emerald-300">
              <span>{"\u{2728}"}</span>
              As melhores ofertas
            </p>
            <h2 className="mx-auto max-w-[12ch] break-words text-[1.75rem] font-black leading-[1] tracking-[-0.05em] text-white sm:max-w-none sm:text-[2.25rem]">
              Encontre rapido o produto certo.
            </h2>
            <p className="mx-auto mt-3 max-w-[34ch] text-sm leading-6 text-[var(--muted)] sm:max-w-[56ch] sm:text-[0.98rem]">
              Digite o codigo do produto, filtre por categoria e abra direto o
              link da promocao. Tudo em uma vitrine simples, clara e feita
              para mobile.
            </p>
          </div>

          <div className="mt-5 grid w-full min-w-0 gap-3 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="soft-panel flex w-full flex-col items-center justify-center rounded-[22px] px-4 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-400/18"
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/12 bg-emerald-400/10 text-emerald-300">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    {item.label}
                  </p>
                  <p className="mt-1.5 max-w-[18ch] text-sm font-semibold leading-6 text-white">
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
