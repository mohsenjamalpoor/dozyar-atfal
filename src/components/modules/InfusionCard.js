import { FaTriangleExclamation } from "react-icons/fa6";
import { calcInfusion, fmtDose, num } from "@/lib/dose";

export default function InfusionCard({ drug, weight, factor, volume }) {
  const inf = drug.infusion;
  const c = calcInfusion(inf, weight, factor, volume);

  return (
    <article
      dir="ltr"
      className="overflow-hidden rounded-xl border border-slate-200 border-s-[6px] border-s-brand-700 bg-white shadow-sm"
    >
      <div className="space-y-4 p-5">
        <header className="flex items-start justify-between gap-3">
          <h3
            dir="ltr"
            className="text-start text-2xl font-semibold leading-tight text-slate-900"
          >
            {inf.title || drug.name}
            <p className="text-sm text-slate-500">{drug.fa}</p>
          </h3>
          <span
            dir="ltr"
            className="shrink-0 rounded-full bg-brand-700 px-3.5 py-1.5 text-sm font-medium text-white"
          >
            {inf.rangeLabel} {inf.doseUnit}
          </span>
        </header>

        {/* PREPARE */}
        <section className="rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3">
          <p className="text-sm tracking-wide text-slate-500">PREPARE</p>
          <p
            dir="ltr"
            className="mt-1 text-start text-[17px] italic leading-7 text-slate-600"
          >
            Add (Wt × {inf.amountPerKg.toFixed(2)} × {factor.toFixed(2)}){" "}
            {inf.prepUnit} to {c.volume.toFixed(2)} mL total. Stock:{" "}
            {inf.stockLabel}.
          </p>

          {c.totalAmount !== null && (
            <div
              dir="ltr"
              className="mt-2 rounded-xl bg-white p-3 text-start ring-1 ring-brand-100"
            >
              <p className="text-[15px] font-bold not-italic text-brand-800">
                {num(c.totalAmount)} {inf.prepUnit} = {num(c.stockMl)} mL stock
              </p>
              {c.diluentMl >= 0 ? (
                <p className="text-[15px] text-slate-600">
                  + {num(c.diluentMl)} mL diluent → {num(c.volume)} mL total
                </p>
              ) : (
                <p className="text-sm font-medium text-red-700" dir="rtl">
                  حجم استوک از حجم کل بیشتر است؛ «Total volume» را افزایش دهید
                  یا غلظت را کم کنید.
                </p>
              )}
            </div>
          )}
        </section>

        {/* TITRATE */}
        <section className="w-fit max-w-full rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3">
          <p className="text-sm tracking-wide text-slate-500">TITRATE</p>
          <p
            dir="ltr"
            className="mt-0.5 text-start text-[22px] font-medium text-orange-700"
          >
            1 mL/hr = {num(c.perMlHr)} {inf.doseUnit}
          </p>

          <ul dir="ltr" className="mt-2 flex flex-col items-start gap-2">
            {c.rates.map((r) => (
              <li
                key={r.rate}
                className="rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-1.5 text-[17px] text-orange-800"
              >
                {r.rate.toFixed(2)} mL/hr → {fmtDose(r.dose)} {inf.doseUnit}
              </li>
            ))}
          </ul>
        </section>

        {inf.warning && (
          <p
            dir="ltr"
            className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-3.5 text-start text-[15px] leading-6 text-red-700"
          >
            <FaTriangleExclamation className="mt-1 shrink-0 text-lg" />
            <span>{inf.warning}</span>
          </p>
        )}
      </div>
    </article>
  );
}
