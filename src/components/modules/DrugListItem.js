import Link from "next/link";
import { FaBolt, FaPills, FaChevronLeft } from "react-icons/fa6";

export default function DrugListItem({ drug }) {
  const emergency = drug.kind === "emergency";
  return (
    <Link
      href={drug.href}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm transition hover:border-brand-300 active:scale-[0.99]"
    >
      <span
        className={`grid size-11 shrink-0 place-items-center rounded-xl text-lg ${
          emergency ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700"
        }`}
      >
        {emergency ? <FaBolt /> : <FaPills />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-slate-900">{drug.name}</span>
        <span className="block truncate text-sm text-slate-500">{drug.fa}</span>
      </span>
      <span className="flex flex-col items-end gap-1">
        <span
          className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
            emergency ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700"
          }`}
        >
          {emergency ? "اورژانسی" : "کاربردی"}
        </span>
        <span className="text-[11px] text-slate-400">{drug.sub}</span>
      </span>
      <FaChevronLeft className="shrink-0 text-slate-300" />
    </Link>
  );
}
