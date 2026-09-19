import { DRUGS } from "@/lib/data/drugs";
import { EMERGENCY_DRUGS } from "@/lib/data/emergency";

export const normalize = (s = "") =>
  String(s)
    .toLowerCase()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[\u200c\u064b-\u065f]/g, "")
    .trim();

/** لیست یکپارچهٔ همهٔ داروها برای جستجو و حروف الفبا */
export function getAllDrugs() {
  const common = DRUGS.map((d) => ({
    key: `common-${d.id}`,
    kind: "common",
    name: d.name,
    fa: d.fa,
    alias: d.alias || [],
    sub: d.category,
    href: `/drugs/${d.id}`,
    letter: d.name[0].toUpperCase(),
  }));

  const emergency = EMERGENCY_DRUGS.map((d) => ({
    key: `emergency-${d.id}`,
    kind: "emergency",
    name: d.name,
    fa: d.fa,
    alias: d.alias || [],
    sub: [d.bolus && "Bolus", d.infusion && "Infusion"].filter(Boolean).join(" / "),
    href: `/emergency?drug=${d.id}`,
    letter: d.name[0].toUpperCase(),
  }));

  return [...common, ...emergency].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterDrugs(items, query, letter) {
  const q = normalize(query);
  return items.filter((d) => {
    if (letter && d.letter !== letter) return false;
    if (!q) return true;
    return [d.name, d.fa, ...d.alias].some((t) => normalize(t).includes(q));
  });
}
