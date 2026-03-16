import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="glass-panel group flex items-center gap-3 rounded-[26px] px-4 py-3.5 transition-all duration-200 focus-within:-translate-y-0.5 focus-within:shadow-[var(--shadow-card)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[18px] bg-[var(--surface-muted)] text-[var(--accent)] shadow-[var(--shadow-soft)] transition-transform duration-200 group-focus-within:scale-105">
        <Search className="h-5 w-5" />
      </div>

      <div className="flex-1">
        <span className="mb-1 block text-[0.72rem] font-bold uppercase tracking-[0.22em] text-slate-500">
          Buscar achadinho
        </span>
        <input
          className="w-full border-none bg-transparent text-[1rem] font-semibold text-slate-900 outline-none placeholder:text-slate-400"
          type="text"
          inputMode="numeric"
          placeholder="Ex: 101"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-label="Buscar por numero do achadinho"
        />
      </div>
    </label>
  );
}
