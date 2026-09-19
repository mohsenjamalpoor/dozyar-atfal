const FA = "۰۱۲۳۴۵۶۷۸۹";
const AR = "٠١٢٣٤٥٦٧٨٩";

/** ورودی عددی را تمیز می‌کند (ارقام فارسی/عربی → انگلیسی، فقط یک ممیز) */
export function sanitizeNumber(raw = "") {
  let s = String(raw)
    .replace(/[۰-۹]/g, (d) => FA.indexOf(d))
    .replace(/[٠-٩]/g, (d) => AR.indexOf(d))
    .replace(/[٫,،]/g, ".")
    .replace(/[^0-9.]/g, "");
  const i = s.indexOf(".");
  if (i !== -1) s = s.slice(0, i + 1) + s.slice(i + 1).replace(/\./g, "");
  return s;
}

export function parseWeight(str) {
  const n = parseFloat(str);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export function num(n, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return String(Number(n.toFixed(digits)));
}

export function range(a, b, digits = 2) {
  return a === b ? num(a, digits) : `${num(a, digits)}–${num(b, digits)}`;
}

export const roundTo = (n, step) => Math.round(n / step) * step;

/** ---------- STAT BOLUS ---------- */
export function calcBolus(bolus, weight) {
  if (!weight) return null;
  const raw = weight * bolus.dosePerKg;
  let dose = raw;
  if (bolus.minDose != null) dose = Math.max(dose, bolus.minDose);
  if (bolus.maxDose != null) dose = Math.min(dose, bolus.maxDose);
  return {
    dose,
    volume: dose / bolus.stockConc,
    capped: dose < raw ? "max" : dose > raw ? "min" : null,
  };
}

/**
 * ---------- INFUSION ----------
 * mgPerKg  : ضریب آماده‌سازی؛ (وزن × mgPerKg × غلظت) میلی‌گرم در حجم کل
 * perMlHr  : هر 1 mL/hr معادل چند µg/kg/min است (مستقل از وزن)
 */
export function calcInfusion(inf, weight, cf = 1, totalVolume) {
  const volume = totalVolume || inf.defaultVolume;
  const perMlHr = (inf.mgPerKg * cf * 1000) / (volume * 60);

  const base = {
    volume,
    perMlHr,
    rates: (inf.rates || [0.5, 1, 2, 4]).map((rate) => ({ rate, dose: rate * perMlHr })),
    rateMin: inf.range[0] / perMlHr,
    rateMax: inf.range[1] / perMlHr,
    totalMg: null,
    stockMl: null,
    diluentMl: null,
  };
  if (!weight) return base;

  const totalMg = weight * inf.mgPerKg * cf;
  const stockMl = totalMg / inf.stockConc;
  return { ...base, totalMg, stockMl, diluentMl: volume - stockMl };
}

/** ---------- داروهای کاربردی (شربت/قرص/آمپول ...) ---------- */
export function calcForm(form, weight) {
  const div = form.basis === "day" ? form.dosesPerDay || 1 : 1;
  const [lo, hi] = form.dosePerKg;

  const clamp = (mg) => {
    let v = mg;
    if (form.minDose != null) v = Math.max(v, form.minDose);
    if (form.maxDose != null) v = Math.min(v, form.maxDose);
    return v;
  };

  const rawHi = (weight * hi) / div;
  const mgLo = clamp((weight * lo) / div);
  const mgHi = clamp(rawHi);
  const step = form.unitLabel === "mL" ? 0.1 : 0.25;

  return {
    mgLo,
    mgHi,
    unitsLo: roundTo(mgLo / form.mgPerUnit, step),
    unitsHi: roundTo(mgHi / form.mgPerUnit, step),
    capped: form.maxDose != null && rawHi > form.maxDose,
  };
}
