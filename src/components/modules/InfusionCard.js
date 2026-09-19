import { calcInfusion, num, range } from "@/lib/dose";

export default function InfusionCard({ drug, weight, factor, volume }) {
  const inf = drug.infusion;
  const c = calcInfusion(inf, weight, factor, volume);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 border-s-[6px] border-s-brand-700 bg-white shadow-sm">
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900">{drug.name}</h3>
            <p className="text-sm text-slate-500">{drug.fa}</p>
          </div>
          <span
            dir="ltr"
            className="shrink-0 rounded-full bg-brand-700 px-3.5 py-1.5 text-sm font-semibold text-white"
          >
            {range(inf.range[0], inf.range[1])} µg/kg/min
          </span>
        </div>

        {/* PREPARE */}
        <section className="rounded-xl border border-slate-200 bg-slate-100/70 p-3">
          <p className="text-xs font-bold text-slate-500">آماده‌سازی</p>
          <p dir="ltr" className="mt-1 text-left text-[15px] italic leading-6 text-slate-600">
            Add (Wt × {inf.mgPerKg.toFixed(2)} × {factor.toFixed(2)}) mg to {c.volume.toFixed(2)} mL total.
            <br />
            Stock: {inf.stockLabel}.
          </p>

          {c.totalMg !== null && (
            <div className="mt-2 rounded-lg bg-white p-2.5 ring-1 ring-brand-100">
              <p dir="ltr" className="text-left text-sm font-bold text-brand-800">
                {num(c.totalMg)} mg = {num(c.stockMl)} mL stock
              </p>
              {c.diluentMl >= 0 ? (
                <p dir="ltr" className="text-left text-sm text-slate-600">
                  + {num(c.diluentMl)} mL diluent → {num(c.volume)} mL
                </p>
              ) : (
                <p className="text-sm font-medium text-red-700">
                  حجم استوک از حجم کل بیشتر است؛ «حجم کل» را افزایش دهید یا غلظت را کم کنید.
                </p>
              )}
            </div>
          )}
        </section>

        {/* TITRATE */}
        <section className="rounded-xl border border-amber-300 bg-amber-50 p-3">
          <p className="text-xs font-bold text-slate-500">تیتراسیون</p>
          <p dir="ltr" className="mt-1 text-left text-lg font-bold text-orange-700">
            1 mL/hr = {num(c.perMlHr)} µg/kg/min
          </p>

          <ul dir="ltr" className="mt-2 grid grid-cols-2 gap-2">
            {c.rates.map((r) => (
              <li
                key={r.rate}
                className="rounded-xl border border-amber-300 bg-white px-3 py-2 text-left text-[15px] font-medium text-orange-800"
              >
                {num(r.rate)} mL/hr → {num(r.dose)}
                <span className="text-xs text-orange-600"> µg/kg/min</span>
              </li>
            ))}
          </ul>

          <p dir="ltr" className="mt-2 text-left text-xs text-slate-600">
            Range: {range(c.rateMin, c.rateMax)} mL/hr
          </p>
        </section>
      </div>
    </article>
  );
}
