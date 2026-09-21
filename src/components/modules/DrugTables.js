import { calcBolus, calcInfusion, fmtPerKg, num, smartNum } from "@/lib/dose";

export function BolusTable({ drugs, weight }) {
  const h =
    "px-3 py-3.5 text-start text-sm font-semibold uppercase tracking-wide text-red-900";
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table dir="ltr" className="w-full table-fixed border-collapse">
        <colgroup>
          <col className="w-[34%]" />
          <col className="w-[33%]" />
          <col className="w-[33%]" />
        </colgroup>
        <thead>
          <tr className="bg-rose-100/60">
            <th className={h}>Drug · Route</th>
            <th className={h}>Per-kg dose</th>
            <th className={h}>Max</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {drugs.flatMap((d) =>
            d.bolus.doses.map((dose) => {
              const c = calcBolus(dose, weight);
              return (
                <tr key={`${d.id}-${dose.label}`} className="align-top">
                  <td className="break-words px-3 py-3.5">
                    <span className="block text-[17px] font-medium leading-snug text-slate-900">
                      {d.name}
                    </span>
                    <span className="mt-0.5 block text-[15px] leading-snug text-slate-500">
                      {dose.label}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-[17px] text-slate-600">
                    {fmtPerKg(dose.dosePerKg)} {dose.doseUnit}/kg
                    {c && (
                      <span className="mt-1 block text-[15px] font-bold text-red-700">
                        {dose.doseUnit === "mL"
                          ? `${smartNum(c.volume)} mL`
                          : `${smartNum(c.dose)} ${dose.doseUnit} → ${smartNum(c.volume)} mL`}
                      </span>
                    )}
                  </td>
                  <td className="break-words px-3 py-3.5 text-[16px] leading-snug text-slate-500">
                    {d.bolus.maxLabel}
                  </td>
                </tr>
              );
            }),
          )}
        </tbody>
      </table>
    </div>
  );
}

export function InfusionTable({ drugs, weight, factor, volume }) {
  const h =
    "bg-brand-50 px-3 py-2 text-start text-xs font-semibold text-slate-500";
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table dir="ltr" className="w-full border-collapse">
        <thead>
          <tr>
            <th className={h}>Drug</th>
            <th className={h}>Range</th>
            <th className={h}>Preparation</th>
            <th className={h}>1 mL/hr =</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {drugs.map((d) => {
            const inf = d.infusion;
            const c = calcInfusion(inf, weight, factor, volume);
            return (
              <tr key={d.id} className="align-top">
                <td className="break-words px-3 py-3 text-[15px] font-medium text-slate-900">
                  {inf.title || d.name}
                </td>
                <td className="px-3 py-3 text-[15px] text-slate-600">
                  {inf.rangeLabel} {inf.doseUnit}
                </td>
                <td className="px-3 py-3 text-[15px] text-slate-600">
                  {(inf.amountPerKg * factor).toFixed(2)} {inf.prepUnit}/kg in{" "}
                  {c.volume.toFixed(2)} mL
                  {c.totalAmount !== null && (
                    <span className="mt-1 block text-xs font-semibold text-brand-700">
                      = {num(c.totalAmount)} {inf.prepUnit} ({num(c.stockMl)} mL
                      stock)
                    </span>
                  )}
                </td>
                <td className="px-3 py-3 text-[15px] font-medium text-red-800">
                  {c.perMlHr.toFixed(2)} {inf.doseUnit}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
