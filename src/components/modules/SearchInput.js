"use client";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

export default function SearchInput({
  value,
  onChange,
  placeholder = "جستجوی دارو (فارسی یا English)",
}) {
  return (
    <div className="relative">
      <FaMagnifyingGlass className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-brand-500" />
      <input
        type="text"
        inputMode="search"
        enterKeyHint="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="جستجوی دارو"
        className="w-full rounded-2xl border border-brand-100 bg-white py-3.5 ps-11 pe-11 text-base shadow-lg shadow-brand-900/10 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="پاک کردن"
          className="absolute end-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <FaXmark />
        </button>
      )}
    </div>
  );
}
