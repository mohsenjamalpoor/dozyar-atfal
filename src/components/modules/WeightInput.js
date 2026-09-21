"use client";
import { FaWeightScale } from "react-icons/fa6";
import { sanitizeNumber, parseWeight } from "@/lib/dose";

export default function WeightInput({ value, onChange }) {
  const w = parseWeight(value);
  const odd = w !== null && (w < 0.4 || w > 100);

  return (
    <div>
      <div className="relative">
        <FaWeightScale className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-brand-500" />
        <input
          dir="ltr"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(sanitizeNumber(e.target.value))}
          placeholder="Patient's Weight"
          aria-label="وزن بیمار (کیلوگرم)"
          className="w-full rounded-2xl border-2 border-brand-100 bg-brand-50/70 py-3.5 text-center text-lg font-semibold text-brand-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
        />
        <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-500">
          kg
        </span>
      </div>
      {odd && (
        <p className="mt-1.5 text-xs font-medium text-amber-700">
          وزن خارج از محدودهٔ معمول اطفال است؛ مقدار واردشده را بررسی کنید.
        </p>
      )}
    </div>
  );
}
