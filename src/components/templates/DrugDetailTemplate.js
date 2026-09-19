"use client";
import { useState } from "react";
import { FORM_TYPES } from "@/lib/forms";
import { calcForm, num, range, parseWeight } from "@/lib/dose";
import { useWeight } from "@/lib/useWeight";
import PageHeader from "@/components/modules/PageHeader";
import WeightInput from "@/components/modules/WeightInput";
import FormSelector from "@/components/modules/FormSelector";
import FormIllustration from "@/components/modules/FormIllustration";
import Disclaimer from "@/components/modules/Disclaimer";

function Row({ label, children, ltr = false }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="shrink-0 text-sm text-slate-500">{label}</dt>
      <dd dir={ltr ? "ltr" : undefined} className="text-sm font-semibold text-slate-800">
        {children}
      </dd>
    </div>
  );
}

export default function DrugDetailTemplate({ drug }) {
  const [weightStr, setWeight] = useWeight();
  const weight = parseWeight(weightStr);
  const [idx, setIdx] = useState(0);

  const form = drug.forms[idx];
  const meta = FORM_TYPES[form.type];
  const calc = weight ? calcForm(form, weight) : null;
  const perKgLabel = `${range(form.dosePerKg[0], form.dosePerKg[1])} mg/kg${
    form.basis === "day" ? "/day" : ""
  }`;

  return (
    <main>
      <PageHeader title={drug.name} subtitle={`${drug.fa}  ·  ${drug.category}`} backHref="/drugs" />

      <div className="space-y-4 px-4 pt-4">
        <WeightInput value={weightStr} onChange={setWeight} />

        <FormSelector forms={drug.forms} activeIndex={idx} onSelect={setIdx} />

        {/* تصویر شکل دارویی + غلظت */}
        <section className="flex items-center gap-4 rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-4">
          <FormIllustration type={form.type} className="size-32 shrink-0 drop-shadow-md" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-brand-500">{meta.label}</p>
            <p dir="ltr" className="text-start text-xl font-extrabold text-brand-900">
              {form.strength}
            </p>
            <p className="mt-1 text-sm text-slate-500">{form.route}</p>
          </div>
        </section>

        {/* نتیجهٔ محاسبه */}
        <section className="rounded-3xl bg-brand-700 p-4 text-white shadow-lg shadow-brand-700/30">
          <p className="text-xs font-semibold text-brand-100">مقدار هر نوبت</p>
          {calc ? (
            <>
              <p dir="ltr" className="mt-1 text-start text-3xl font-extrabold">
                {range(calc.unitsLo, calc.unitsHi, 2)} <span className="text-lg font-semibold">{form.unitLabel}</span>
              </p>
              <p dir="ltr" className="text-start text-sm text-brand-100">
                = {range(calc.mgLo, calc.mgHi, 1)} mg
              </p>
              {calc.capped && (
                <p className="mt-2 rounded-lg bg-white/15 px-3 py-1.5 text-xs">
                  به سقف مجاز هر نوبت ({num(form.maxDose)} mg) محدود شد.
                </p>
              )}
            </>
          ) : (
            <p className="mt-1 text-sm text-brand-100">برای محاسبه، وزن بیمار را وارد کنید.</p>
          )}
        </section>

        {/* جزئیات */}
        <dl className="divide-y divide-slate-100 rounded-3xl border border-slate-200 bg-white px-4">
          <Row label="دوز" ltr>{perKgLabel}</Row>
          {form.basis === "day" && <Row label="تقسیم دوز">{form.dosesPerDay} نوبت در روز</Row>}
          <Row label="فواصل مصرف">{form.freq}</Row>
          <Row label="حداکثر روزانه" ltr>{form.maxDaily}</Row>
        </dl>

        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-bold text-slate-900">نحوه تجویز</h2>
          <p className="mt-1.5 text-sm leading-7 text-slate-600">{form.admin}</p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-bold text-slate-900">عوارض</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {drug.sideEffects.map((s) => (
              <li key={s} className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-800 ring-1 ring-red-100">
                {s}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Disclaimer />
    </main>
  );
}
