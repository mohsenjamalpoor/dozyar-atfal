"use client";
import { FORM_TYPES } from "@/lib/forms";

export default function FormSelector({ forms, activeIndex, onSelect }) {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 py-1" role="tablist">
      {forms.map((f, i) => {
        const meta = FORM_TYPES[f.type];
        const Icon = meta.icon;
        const active = i === activeIndex;
        return (
          <button
            key={`${f.type}-${i}`}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(i)}
            className={`flex shrink-0 items-center gap-2 rounded-2xl border-2 px-5 py-3 text-sm font-bold transition active:scale-[0.97] ${
              active
                ? "border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-700/30"
                : "border-brand-100 bg-white text-brand-700 hover:bg-brand-50"
            }`}
          >
            <Icon className="text-lg" />
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
