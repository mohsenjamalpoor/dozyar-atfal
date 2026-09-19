import { calcBolus, calcInfusion, num, range } from "@/lib/dose";

const th =
  "whitespace-nowrap bg-brand-700 px-3 py-2.5 text-start text-xs font-bold text-white";
const td = "whitespace-nowrap px-3 py-2.5 text-sm";

export function BolusTable({ drugs, weight }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[520px] border-collapse">
        <thead>
          <tr>
            <th className={th}>دارو</th>
            <th className={th}>دوز/kg</th>
            <th className={th}>دوز</th>
            <th className={th}>حجم (mL)</th>
            <th className={th}>راه</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {drugs.map((d) => {
            const c = calcBolus(d.bolus, weight);
            return (
              <tr key={d.id} className="odd:bg-white even:bg-slate-50/70">
                <td className={`${td} font-bold text-slate-900`}>{d.name}</td>
                <td dir="ltr" className={`${td} text-left text-slate-600`}>
                  {num(d.bolus.dosePerKg)} {d.bolus.doseUnit}
                </td>
                <td
                  dir="ltr"
                  className={`${td} text-left font-bold text-red-700`}
                >
                  {c ? `${num(c.dose)} ${d.bolus.doseUnit}` : "—"}
                </td>
                <td
                  dir="ltr"
                  className={`${td} text-left font-bold text-brand-700`}
                >
                  {c ? num(c.volume) : "—"}
                </td>
                <td dir="ltr" className={`${td} text-left text-slate-600`}>
                  {d.bolus.route}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function InfusionTable({ drugs, weight, factor, volume }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[620px] border-collapse">
        <thead>
          <tr>
            <th className={th}>دارو</th>
            <th className={th}>محدوده (µg/kg/min)</th>
            <th className={th}>مقدار در سرنگ</th>
            <th className={th}>استوک (mL)</th>
            <th className={th}>1 mL/hr =</th>
            <th className={th}>Rate (mL/hr)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {drugs.map((d) => {
            const c = calcInfusion(d.infusion, weight, factor, volume);
            return (
              <tr key={d.id} className="odd:bg-white even:bg-slate-50/70">
                <td className={`${td} font-bold text-slate-900`}>{d.name}</td>
                <td dir="ltr" className={`${td} text-left text-slate-600`}>
                  {range(d.infusion.range[0], d.infusion.range[1])}
                </td>
                <td
                  dir="ltr"
                  className={`${td} text-left font-bold text-brand-700`}
                >
                  {c.totalMg !== null
                    ? `${num(c.totalMg)} mg / ${num(c.volume)} mL`
                    : `Wt × ${num(d.infusion.mgPerKg * factor)} mg`}
                </td>
                <td dir="ltr" className={`${td} text-left text-slate-700`}>
                  {c.stockMl !== null ? num(c.stockMl) : "—"}
                </td>
                <td
                  dir="ltr"
                  className={`${td} text-left font-bold text-orange-700`}
                >
                  {num(c.perMlHr)} µg/kg/min
                </td>
                <td dir="ltr" className={`${td} text-left text-slate-700`}>
                  {range(c.rateMin, c.rateMax)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
