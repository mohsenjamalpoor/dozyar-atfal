"use client";

const TONES = {
  brand: {
    on: "border-brand-700 bg-brand-700 text-white shadow-lg shadow-brand-700/30",
    off: "border-brand-700 bg-white text-brand-700 hover:bg-brand-50",
  },
  red: {
    on: "border-red-700 bg-red-700 text-white shadow-lg shadow-red-700/30",
    off: "border-red-700 bg-white text-red-700 hover:bg-red-50",
  },
  blue: {
    on: "border-blue-700 bg-blue-700 text-white shadow-lg shadow-blue-700/30",
    off: "border-blue-700 bg-white text-blue-700 hover:bg-blue-50",
  },
};

const SIZES = {
  lg: "rounded-2xl py-3.5 text-base font-extrabold tracking-wide",
  md: "rounded-full py-2.5 text-sm font-bold",
};

/** options: [{ value, label, icon?, tone? (رنگ حالت فعال), offTone? (رنگ حالت غیرفعال) }] */
export default function SegmentedTabs({
  options,
  value,
  onChange,
  size = "md",
}) {
  return (
    <div className="grid grid-cols-2 gap-3" role="tablist">
      {options.map((o) => {
        const active = o.value === value;
        const on = TONES[o.tone || "brand"].on;
        const off = TONES[o.offTone || o.tone || "brand"].off;
        return (
          <button
            key={o.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={`flex items-center justify-center gap-2 border-2 transition active:scale-[0.98] ${SIZES[size]} ${
              active ? on : off
            }`}
          >
            <span>{o.label}</span>
            {o.icon}
          </button>
        );
      })}
    </div>
  );
}
