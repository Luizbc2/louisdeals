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
    <label className="glass-panel group flex items-center gap-3 rounded-[28px] px-4 py-3.5 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:border-emerald-400/20 focus-within:shadow-[var(--shadow-card)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] border border-emerald-400/12 bg-emerald-400/10 text-emerald-300 shadow-[var(--shadow-soft)] transition-transform duration-200 group-focus-within:scale-105">
        <Search className="h-5 w-5" />
      </div>

      <div className="flex-1">
        <span className="mb-1 block text-[0.72rem] font-bold uppercase tracking-[0.22em] text-emerald-300/80">
          Buscar codigo
        </span>
        <input
          className="w-full border-none bg-transparent text-[1rem] font-semibold text-white outline-none placeholder:text-[var(--muted)]"
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
