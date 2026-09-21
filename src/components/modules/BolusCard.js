import { calcBolus, num } from "@/lib/dose";

export default function BolusCard({ drug, weight }) {
  const b = drug.bolus;
  const c = calcBolus(b, weight);
  const isVolumeDose = b.doseUnit === "mL";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 border-s-[6px] border-s-red-700 bg-white shadow-sm">
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <span
            dir="ltr"
            className="shrink-0 rounded-full bg-red-700 px-3.5 py-1.5 text-sm font-semibold text-white"
          >
            {num(b.dosePerKg)} {b.doseUnit}/kg
          </span>
          <div className="min-w-0">
            <h3 className="text-xl font-bold text-slate-900">{drug.name}</h3>
            <p className="text-sm text-slate-500">{drug.fa}</p>
          </div>
        </div>

        {c ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-red-50 p-3 ring-1 ring-red-100">
              <p className="text-xs font-bold text-red-800/70">دوز</p>
              <p
                dir="ltr"
                className="text-left text-2xl font-extrabold text-red-700"
              >
                {num(c.dose)}{" "}
                <span className="text-sm font-semibold">{b.doseUnit}</span>
              </p>
            </div>
            <div className="rounded-xl bg-brand-50 p-3 ring-1 ring-brand-100">
              <p className="text-xs font-bold text-brand-800/70">
                {isVolumeDose ? "حجم تزریق" : "حجم برداشت"}
              </p>
              <p
                dir="ltr"
                className="text-left text-2xl font-extrabold text-brand-700"
              >
                {num(c.volume)}{" "}
                <span className="text-sm font-semibold">mL</span>
              </p>
            </div>
            {c.capped && (
              <p className="col-span-2 text-xs font-medium text-amber-700">
                {c.capped === "max"
                  ? "به سقف مجاز دوز محدود شد."
                  : "به حداقل دوز توصیه‌شده رسانده شد."}
              </p>
            )}
          </div>
        ) : (
          <p className="rounded-xl bg-slate-100 p-3 text-center text-sm text-slate-500">
            برای محاسبه، وزن بیمار را وارد کنید.
          </p>
        )}

        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-slate-500">استوک</dt>
            <dd dir="ltr" className="font-medium text-slate-800">
              {b.stockLabel}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-slate-500">راه تجویز</dt>
            <dd dir="ltr" className="font-medium text-slate-800">
              {b.route}
            </dd>
          </div>
          {(b.minDose != null || b.maxDose != null) && (
            <div className="flex justify-between gap-3">
              <dt className="text-slate-500">محدودهٔ دوز</dt>
              <dd dir="ltr" className="font-medium text-slate-800">
                {b.minDose != null && `min ${num(b.minDose)} `}
                {b.maxDose != null && `max ${num(b.maxDose)} `}
                {b.doseUnit}
              </dd>
            </div>
          )}
        </dl>

        {b.note && (
          <p className="rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900 ring-1 ring-amber-200">
            {b.note}
          </p>
        )}
      </div>
    </article>
  );
}
