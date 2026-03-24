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
    <label className="glass-panel group relative flex items-center gap-3 overflow-hidden rounded-[30px] px-4 py-4 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-emerald-300/24 focus-within:shadow-[var(--shadow-card)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(132,234,175,0.16),transparent_20%),linear-gradient(135deg,rgba(255,255,255,0.03),transparent_40%)] opacity-80" />

      <div className="relative flex h-12 w-12 items-center justify-center rounded-[20px] border border-emerald-200/12 bg-emerald-100/8 text-emerald-100 shadow-[var(--shadow-soft)] transition-transform duration-200 group-focus-within:scale-105">
        <Search className="h-5 w-5" strokeWidth={2.1} />
      </div>

      <div className="relative flex-1">
        <span className="mb-1 block text-[0.7rem] font-bold uppercase tracking-[0.24em] text-emerald-200/72">
          Buscar codigo
        </span>
        <input
          className="w-full border-none bg-transparent text-[1.02rem] font-semibold text-white outline-none placeholder:text-[var(--muted)]"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="off"
          placeholder="Ex: 101"
          value={value}
          onChange={(event) => handleChange(event.target.value)}
          aria-label="Buscar por numero do achadinho"
        />
      </div>
    </label>
  );
}
