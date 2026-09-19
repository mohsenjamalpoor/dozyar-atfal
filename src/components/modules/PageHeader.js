import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

export default function PageHeader({ title, subtitle, backHref = "/", right = null }) {
  return (
    <header className="sticky top-0 z-30 bg-brand-700 text-white shadow-md shadow-brand-900/20">
      <div className="flex items-center gap-3 px-4 py-3">
        {backHref && (
          <Link
            href={backHref}
            aria-label="بازگشت"
            className="grid size-10 shrink-0 place-items-center rounded-full text-lg transition hover:bg-white/10 active:bg-white/20"
          >
            <FaChevronRight />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold leading-tight">{title}</h1>
          {subtitle && <p className="truncate text-xs text-brand-100">{subtitle}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}
