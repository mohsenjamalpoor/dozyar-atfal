/**
 * داروهای اورژانسی — بر اساس اسکرین‌شات‌های اپ مرجع
 * ⚠️ غلظت استوک (stockConc) در اسکرین‌شات‌ها دیده نمی‌شد؛ مقادیر استاندارد گذاشته شده،
 *    قبل از استفاده با ویال/آمپول واقعی بخش خودتان تطبیق دهید.
 *
 * bolus:
 *   indications : متن ایتالیک زیر نام دارو
 *   doses[]     : هر باکس دوز → { label, dosePerKg, doseUnit, stockConc, stockLabel, minDose?, maxDose? }
 *                 (minDose / maxDose به همان doseUnit محاسبه می‌شوند)
 *   maxLabel    : متن ردیف Max
 *   notes       : متن ردیف Notes
 *   warning     : باکس هشدار قرمز (اختیاری)
 *
 * infusion:
 *   order         : ترتیب نمایش در تب INFUSION
 *   title?        : نام نمایشی مخصوص انفوزیون (اگر با name فرق دارد)
 *   range         : [min, max] عددی برای محاسبه؛ rangeLabel: متن بج (مثلاً "0.05–1.0")
 *   doseUnit      : 'µg/kg/min' | 'mIU/kg/min'
 *   prepUnit      : 'mg' | 'U' — واحد در فرمول Add (Wt × amountPerKg × غلظت) ... to X mL
 *   amountPerKg   : ضریب آماده‌سازی؛ 1 mL/hr = amountPerKg × 1000 / (حجم کل × 60)
 *   defaultVolume : حجم کل پیش‌فرض (mL)
 *   stockConc     : غلظت استوک به‌ازای prepUnit در هر mL؛ stockLabel: متن نمایشی
 *   warning?      : باکس هشدار قرمز؛ rates?: نرخ‌های چیپ تیتراسیون (پیش‌فرض 0.5/1/2/4 mL/hr)
 */
export const EMERGENCY_DRUGS = [
  {
    id: "adrenaline",
    name: "Adrenaline",
    fa: "آدرنالین (اپی‌نفرین)",
    alias: ["Epinephrine", "اپی نفرین", "اپینفرین"],
    bolus: {
      indications: ["Cardiac arrest", "Symptomatic bradycardia", "Anaphylaxis"],
      doses: [
        {
          label: "Cardiac arrest IV/IO (1:10,000)",
          dosePerKg: 0.01,
          doseUnit: "mg",
          stockConc: 0.1,
          stockLabel: "0.1 mg/mL (1:10,000)",
          maxDose: 1,
        },
        {
          label: "Symptomatic bradycardia ETT (1:1,000)",
          dosePerKg: 0.1,
          doseUnit: "mg",
          stockConc: 1,
          stockLabel: "1 mg/mL (1:1,000)",
          maxDose: 2.5,
        },
        {
          label: "Anaphylaxis IM (1:1,000)",
          dosePerKg: 0.01,
          doseUnit: "mg",
          stockConc: 1,
          stockLabel: "1 mg/mL (1:1,000)",
          maxDose: 0.5,
        },
      ],
      maxLabel: "1 mg  / 2.5 mg / 0.5 mg",
      notes: "IM in anaphylaxis. Repeat q 3–5 min in arrest.",
    },
    infusion: {
      order: 3,
      title: "Epinephrine (Adrenaline)",
      range: [0.05, 1],
      rangeLabel: "0.05–1.0",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 0.3,
      defaultVolume: 50,
      stockConc: 1,
      stockLabel: "1 mg/mL (1:1,000)",
    },
  },
  {
    id: "atropine",
    name: "Atropine",
    fa: "آتروپین",
    alias: [],
    bolus: {
      indications: ["Bradycardia", "AV Block"],
      doses: [
        {
          label: "IV / IO / IM",
          dosePerKg: 0.02,
          doseUnit: "mg",
          stockConc: 0.5,
          stockLabel: "0.5 mg/mL",
          minDose: 0.1,
          maxDose: 1,
        },
        {
          label: "ETT",
          dosePerKg: 0.05,
          doseUnit: "mg",
          stockConc: 0.5,
          stockLabel: "0.5 mg/mL",
          minDose: 0.1,
          maxDose: 1,
        },
      ],
      maxLabel: "1 mg",
      notes: "Min single dose 0.1 mg to avoid paradoxical bradycardia.",
    },
  },
  {
    id: "adenosine",
    name: "Adenosine",
    fa: "آدنوزین",
    alias: [],
    bolus: {
      indications: ["Supraventricular tachycardia"],
      doses: [
        {
          label: "1st dose IV/IO",
          dosePerKg: 0.1,
          doseUnit: "mg",
          stockConc: 3,
          stockLabel: "3 mg/mL",
          maxDose: 6,
        },
        {
          label: "2nd dose IV/IO",
          dosePerKg: 0.2,
          doseUnit: "mg",
          stockConc: 3,
          stockLabel: "3 mg/mL",
          maxDose: 12,
        },
      ],
      maxLabel: "6 mg / 12 mg",
      notes: "Rapid bolus, immediately follow with 10 mL NS flush.",
      warning: "Half-life ~10 sec — give as fast push into a large vein.",
    },
  },
  {
    id: "amiodarone",
    name: "Amiodarone",
    fa: "آمیودارون",
    alias: [],
    bolus: {
      indications: ["Ventricular tachycardia", "Ventricular fibrillation"],
      doses: [
        {
          label: "IV / IO",
          dosePerKg: 5,
          doseUnit: "mg",
          stockConc: 50,
          stockLabel: "50 mg/mL",
          maxDose: 300,
        },
      ],
      maxLabel: "First dose 300 mg ; Subsequent 150 mg",
      notes: "Infuse over 20–60 minutes (over 1–2 min in pulseless arrest).",
    },
  },
  {
    id: "calcium-gluconate",
    name: "Calcium gluconate (10 %)",
    fa: "کلسیم گلوکونات ۱۰٪",
    alias: ["Calcium", "کلسیم"],
    bolus: {
      indications: ["Hypocalcaemia", "Hyperkalaemia"],
      doses: [
        {
          label: "IV slow push",
          dosePerKg: 1,
          doseUnit: "mL",
          stockConc: 1,
          stockLabel: "10 % = 100 mg/mL",
          maxDose: 20, // 2 g
        },
      ],
      maxLabel: "2 g per dose",
      notes: "Over 10–20 min via confirmed IV — extravasation causes necrosis.",
      warning: "Do NOT mix with NaHCO₃ (precipitates). Monitor HR.",
    },
  },
  {
    id: "dextrose",
    name: "Dextrose",
    fa: "دکستروز",
    alias: ["Glucose", "D10W", "D50", "گلوکز"],
    bolus: {
      indications: ["Hypoglycaemia"],
      doses: [
        {
          label: "10 % dextrose IV/IO",
          dosePerKg: 10,
          doseUnit: "mL",
          stockConc: 1,
          stockLabel: "10 %",
          maxDose: 500, // 50 g
        },
        {
          label: "25 % dextrose IV/IO",
          dosePerKg: 4,
          doseUnit: "mL",
          stockConc: 1,
          stockLabel: "25 %",
          maxDose: 200, // 50 g
        },
        {
          label: "50 % dextrose IV/IO",
          dosePerKg: 2,
          doseUnit: "mL",
          stockConc: 1,
          stockLabel: "50 %",
          maxDose: 100, // 50 g
        },
      ],
      maxLabel: "Max single dose 50 g",
      notes: "Re-check capillary glucose at 15–30 min.",
    },
  },
  {
    id: "insulin",
    name: "Insulin",
    fa: "انسولین",
    alias: ["Regular insulin"],
    bolus: {
      indications: ["Hyperkalaemia"],
      doses: [
        {
          label: "Regular insulin IV/IO",
          dosePerKg: 0.1,
          doseUnit: "U",
          stockConc: 1,
          stockLabel: "1 U/mL (diluted)",
          maxDose: 10,
        },
      ],
      maxLabel: "10 Units",
      notes:
        "Always co-administer with 0.5 g/kg dextrose. Monitor blood glucose hourly.",
    },
  },
  {
    id: "magnesium-sulphate",
    name: "Magnesium sulphate",
    fa: "سولفات منیزیم",
    alias: ["MgSO4", "منیزیم"],
    bolus: {
      indications: ["Torsades de pointes", "Hypomagnesaemia"],
      doses: [
        {
          label: "IV / IO",
          dosePerKg: 50,
          doseUnit: "mg",
          stockConc: 500,
          stockLabel: "50 % = 500 mg/mL",
          maxDose: 2000,
        },
      ],
      maxLabel: "2 g per dose",
      notes: "Over 20–30 min. Stop if hypotension or bradycardia.",
    },
  },
  {
    id: "naloxone",
    name: "Naloxone",
    fa: "نالوکسان",
    alias: ["Narcan"],
    bolus: {
      indications: ["Opioid overdose", "Respiratory depression"],
      doses: [
        {
          label: "Resp depression (low dose)",
          dosePerKg: 0.003,
          doseUnit: "mg",
          stockConc: 0.4,
          stockLabel: "0.4 mg/mL",
          maxDose: 0.1,
        },
        {
          label: "Full reversal IV/IO/IM/SC",
          dosePerKg: 0.1,
          doseUnit: "mg",
          stockConc: 0.4,
          stockLabel: "0.4 mg/mL",
          maxDose: 2,
        },
      ],
      maxLabel: "0.1 mg / 2 mg",
      notes: "ETT dose 2–3x IV dose. Watch for re-narcotisation.",
    },
  },
  {
    id: "sodium-bicarbonate",
    name: "Sodium Bicarbonate",
    fa: "بی‌کربنات سدیم",
    alias: ["NaHCO3", "بیکربنات"],
    bolus: {
      indications: ["Metabolic acidosis", "Hyperkalaemia", "TCA overdose"],
      doses: [
        {
          label: "IV / IO (8.4 %)",
          dosePerKg: 1,
          doseUnit: "mEq",
          stockConc: 1,
          stockLabel: "8.4 % = 1 mEq/mL",
          maxDose: 50,
        },
      ],
      maxLabel: "50 mEq per dose",
      notes: "Dilute 1:1 with sterile water for peripheral access.",
      warning:
        "Establish ventilation first. Do NOT mix with adrenaline or calcium.",
    },
  },

  /* ---------- فقط انفوزیون ---------- */
  {
    id: "dopamine",
    name: "Dopamine",
    fa: "دوپامین",
    alias: [],
    infusion: {
      order: 1,
      range: [5, 20],
      rangeLabel: "5–20",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 30,
      defaultVolume: 50,
      stockConc: 40,
      stockLabel: "40 mg/mL ampoule",
    },
  },
  {
    id: "dobutamine",
    name: "Dobutamine",
    fa: "دوبوتامین",
    alias: [],
    infusion: {
      order: 2,
      range: [5, 20],
      rangeLabel: "5–20",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 30,
      defaultVolume: 50,
      stockConc: 50,
      stockLabel: "50 mg/mL ampoule",
    },
  },
  {
    id: "norepinephrine",
    name: "Norepinephrine",
    fa: "نوراپی‌نفرین",
    alias: ["Noradrenaline", "نورآدرنالین", "Levophed"],
    infusion: {
      order: 4,
      range: [0.05, 0.5],
      rangeLabel: "0.05–0.5",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 0.3,
      defaultVolume: 50,
      stockConc: 2,
      stockLabel: "2 mg/mL ampoule",
    },
  },
  {
    id: "vasopressin",
    name: "Vasopressin",
    fa: "وازوپرسین",
    alias: ["ADH", "Pitressin"],
    infusion: {
      order: 5,
      range: [0.5, 2],
      rangeLabel: "0.5–2",
      doseUnit: "mIU/kg/min",
      // ⚠️ در اپ مرجع در متن PREPARE واحد "mIU" نوشته شده، ولی ریاضی 1 mL/hr = 1 mIU/kg/min
      //    فقط با «واحد (U)» درست درمی‌آید (3 U/kg در 50 mL). اینجا U گذاشته شده.
      prepUnit: "U",
      amountPerKg: 3,
      defaultVolume: 50,
      stockConc: 20,
      stockLabel: "20 U/mL ampoule (= 20,000 mIU/mL)",
    },
  },
  {
    id: "milrinone",
    name: "Milrinone",
    fa: "میلرینون",
    alias: [],
    infusion: {
      order: 6,
      range: [0.25, 1],
      rangeLabel: "0.25–1.0",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 1.5,
      defaultVolume: 50,
      stockConc: 1,
      stockLabel: "1 mg/mL ampoule",
    },
  },
  {
    id: "levosimendan",
    name: "Levosimendan",
    fa: "لووسیمندان",
    alias: [],
    infusion: {
      order: 7,
      range: [0.05, 0.2],
      rangeLabel: "0.05–0.2",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 0.3,
      defaultVolume: 50,
      stockConc: 2.5,
      stockLabel: "2.5 mg/mL ampoule",
    },
  },
  {
    id: "snp",
    name: "Sodium nitroprusside (SNP)",
    fa: "نیتروپروساید سدیم",
    alias: ["SNP", "Nitroprusside", "Nipride", "نیتروپروساید"],
    infusion: {
      order: 8,
      range: [0.5, 10],
      rangeLabel: "0.5–10",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 3,
      defaultVolume: 50,
      stockConc: 25,
      stockLabel: "50 mg vial / 2 mL → 25 mg/mL",
      warning:
        "Protect from light. Watch for cyanide toxicity beyond 48 h or > 2 µg/kg/min.",
    },
  },
  {
    id: "ntg",
    name: "Nitroglycerin (NTG)",
    fa: "نیتروگلیسیرین",
    alias: ["NTG", "GTN", "Glyceryl trinitrate", "TNT"],
    infusion: {
      order: 9,
      range: [0.5, 20],
      rangeLabel: "0.5–20",
      doseUnit: "µg/kg/min",
      prepUnit: "mg",
      amountPerKg: 3,
      defaultVolume: 50,
      stockConc: 5,
      stockLabel: "5 mg/mL ampoule",
    },
  },
];
