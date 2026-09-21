"use client";
import { FaCheck, FaChevronDown } from "react-icons/fa6";

const FACTORS = [
  { value: 0.5, label: "½x" },
  { value: 1, label: "1x" },
  { value: 2, label: "2x" },
  { value: 3, label: "3x" },
  { value: 4, label: "4x" },
];

const VOLUMES = [20, 25, 50, 100, 250];

export default function InfusionControls({
  factor,
  onFactor,
  volume,
  onVolume,
}) {
  return (
    <div dir="ltr" className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="shrink-0 text-sm font-semibold text-slate-600">
          Concentration:
        </span>
        <div dir="ltr" className="no-scrollbar flex gap-2 overflow-x-auto py-1">
          {FACTORS.map((f) => {
            const active = f.value === factor;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => onFactor(f.value)}
                aria-pressed={active}
                className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "border-brand-700 bg-brand-700 text-white shadow-md shadow-brand-700/30"
                    : "border-brand-100 bg-brand-50 text-slate-700 hover:bg-brand-100"
                }`}
              >
                {active && <FaCheck className="text-xs" />}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <label className="flex items-center gap-3">
        <span className="shrink-0 text-sm font-semibold text-slate-600">
          Total volume:
        </span>
        <span className="relative">
          <select
            dir="ltr"
            value={volume}
            onChange={(e) => onVolume(Number(e.target.value))}
            className="appearance-none rounded-xl border border-brand-100 bg-white py-2 ps-3 pe-9 text-sm font-semibold text-slate-800 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
          >
            <option value={0}>Default</option>
            {VOLUMES.map((v) => (
              <option key={v} value={v}>
                {v} mL
              </option>
            ))}
          </select>
          <FaChevronDown className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-xs text-slate-500" />
        </span>
      </label>
    </div>
  );
}
