"use client";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AlphabetBar({ active, onSelect, available }) {
  return (
    <div dir="ltr" className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 py-1">
      {LETTERS.map((l) => {
        const enabled = available.has(l);
        const isActive = active === l;
        return (
          <button
            key={l}
            type="button"
            disabled={!enabled}
            onClick={() => onSelect(isActive ? "" : l)}
            aria-pressed={isActive}
            className={[
              "grid size-10 shrink-0 place-items-center rounded-xl text-sm font-bold transition",
              isActive
                ? "bg-brand-700 text-white shadow-md shadow-brand-700/30"
                : enabled
                ? "bg-white text-brand-700 ring-1 ring-brand-100 hover:bg-brand-50"
                : "bg-transparent text-slate-300",
            ].join(" ")}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
