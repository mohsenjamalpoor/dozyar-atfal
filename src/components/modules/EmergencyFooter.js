import Link from "next/link";
import { FaBookMedical, FaChevronLeft } from "react-icons/fa6";

export default function EmergencyFooter({ guideHref = "/drugs" }) {
  return (
    <div className="space-y-4 px-4 pb-8 pt-2">
      <Link
        href={guideHref}
        dir="ltr"
        className="flex items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-4 text-brand-700 transition hover:bg-brand-100 active:scale-[0.99]"
      >
        <FaBookMedical className="text-xl" />
        <span className="flex-1 text-start text-[17px] font-semibold">
          Open Emergency ICU Drugs reference guide
        </span>
        <FaChevronLeft className="rotate-180 text-sm" />
      </Link>

      <p
        dir="ltr"
        className="rounded-2xl border border-slate-200 bg-white p-4 text-start text-[15px] leading-6 text-slate-500"
      >
        PICU Emergency Drugs calculator. For use by qualified clinicians only — verify every dose against local
        protocol and current vial concentration before administration.
      </p>
    </div>
  );
}
