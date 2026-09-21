import { FaTriangleExclamation } from "react-icons/fa6";
import { calcBolus, fmtPerKg, smartNum } from "@/lib/dose";

function DoseBox({ dose, weight }) {
  const c = calcBolus(dose, weight);
  const isVolume = dose.doseUnit === "mL";

  return (
    <div className="w-fit min-w-[62%] max-w-full rounded-2xl border border-slate-200 bg-slate-100/80 px-4 py-3">
      <p
        dir="ltr"
        className="text-start text-[15px] font-medium leading-snug text-slate-800"
      >
        {dose.label}
      </p>
      <p dir="ltr" className="mt-0.5 text-start text-xl text-slate-700">
        {fmtPerKg(dose.dosePerKg)} {dose.doseUnit}/kg
      </p>

      {c ? (
        <div dir="ltr" className="mt-1 text-start">
          <p className="text-lg font-extrabold text-red-700">
            {isVolume ? (
              <>{smartNum(c.volume)} mL</>
            ) : (
              <>
                {smartNum(c.dose)} {dose.doseUnit}{" "}
                <span className="text-slate-400">→</span> {smartNum(c.volume)}{" "}
                mL
              </>
            )}
          </p>
          {c.capped && (
            <p className="text-xs font-medium text-amber-700">
              {c.capped === "max" ? "capped at max dose" : "raised to min dose"}
            </p>
          )}
          <p className="text-xs text-slate-500">Stock: {dose.stockLabel}</p>
        </div>
      ) : (
        <p dir="ltr" className="mt-0.5 text-start text-sm text-slate-400">
          — enter weight to see mL —
        </p>
      )}
    </div>
  );
}

export default function BolusCard({ drug, weight }) {
  const b = drug.bolus;

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 border-s-[6px] border-s-red-700 bg-white shadow-sm">
      <div className="space-y-4 p-5">
        <header>
          <div className="flex items-start justify-between gap-3">
            <span className="shrink-0 rounded-full bg-red-100 px-3.5 py-1.5 text-sm font-medium text-red-700">
              STAT
            </span>
            <h3
              dir="ltr"
              className="text-start text-2xl font-semibold leading-tight text-slate-900"
            >
              {drug.name}
              <p className="text-sm text-slate-500">{drug.fa}</p>
            </h3>
          </div>
          <p
            dir="ltr"
            className="mt-1 text-start text-[15px] italic text-slate-500"
          >
            {b.indications.join(" · ")}
          </p>
        </header>

        <div dir="ltr" className="space-y-3">
          {b.doses.map((d) => (
            <DoseBox key={d.label} dose={d} weight={weight} />
          ))}
        </div>

        <dl
          dir="ltr"
          className="grid grid-cols-[4rem_1fr] gap-x-3 gap-y-2 text-[15px]"
        >
          <dt className="text-left text-slate-500">Max</dt>

          <dd className="text-left text-slate-800">
            <span dir="ltr" className="inline-block">
              {b.maxLabel}
            </span>
          </dd>

          <dt className="text-left text-slate-500">Notes</dt>

          <dd className="text-left text-slate-800">
            <span dir="ltr" className="inline-block">
              {b.notes}
            </span>
          </dd>
        </dl>

        {b.warning && (
          <p
            dir="ltr"
            className="flex items-start gap-2.5 rounded-xl border border-red-300 bg-red-50 p-3.5 text-start text-[15px] leading-6 text-red-700"
          >
            <FaTriangleExclamation className="mt-1 shrink-0 text-lg" />
            <span>{b.warning}</span>
          </p>
        )}
      </div>
    </article>
  );
}
