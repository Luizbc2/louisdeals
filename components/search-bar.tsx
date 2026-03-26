import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  const handleChange = (nextValue: string) => {
    onChange(nextValue.replace(/\D/g, ""));
  };

  return (
    <div className="glass-panel group relative flex items-center gap-3 overflow-hidden rounded-[30px] p-4 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-[color:var(--line-strong)] focus-within:shadow-[var(--shadow-card)] sm:p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.45),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_46%)] opacity-90" />

      <div className="relative flex h-12 w-12 items-center justify-center rounded-[18px] border border-[var(--border)] bg-white/75 text-[var(--accent)] shadow-[var(--shadow-soft)] transition-transform duration-200 group-focus-within:scale-105">
        <Search className="h-5 w-5" strokeWidth={2.1} />
      </div>

      <div className="relative flex-1">
        <label
          htmlFor="product-search"
          className="block text-[0.7rem] font-bold uppercase tracking-[0.22em] text-[var(--accent)]"
        >
          Buscar codigo
        </label>
        <input
          id="product-search"
          className="mt-1 w-full border-none bg-transparent text-[1rem] font-semibold text-[var(--foreground)] outline-none sm:text-[1.06rem]"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          placeholder="Ex: 101"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          aria-label="Buscar por numero do achadinho"
        />
        <span className="mt-1.5 block text-[0.8rem] leading-5 text-[var(--muted)]">
          Digite apenas o numero do achado.
        </span>
      </div>
    </div>
  );
}
