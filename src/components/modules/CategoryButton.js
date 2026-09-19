import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";

const TONES = {
  brand: "from-brand-600 to-brand-800 shadow-brand-700/30",
  red: "from-red-600 to-red-800 shadow-red-700/30",
};

export default function CategoryButton({
  href,
  title,
  subtitle,
  count,
  icon: Icon,
  tone = "brand",
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 rounded-3xl bg-gradient-to-l p-5 text-white shadow-lg transition active:scale-[0.98] ${TONES[tone]}`}
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/25">
        <Icon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold leading-tight">{title}</span>
        <span className="mt-1 block text-sm text-white/80">{subtitle}</span>
      </span>
      <span className="flex flex-col items-center gap-1">
        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-semibold">
          {count} دارو
        </span>
        <FaChevronLeft className="text-white/70 transition group-hover:-translate-x-1" />
      </span>
    </Link>
  );
}
