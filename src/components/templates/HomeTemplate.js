"use client";
import { useMemo } from "react";
import { FaStethoscope, FaPills, FaBolt } from "react-icons/fa6";
import { getAllDrugs } from "@/lib/search";
import { useDrugFilter } from "@/lib/useDrugFilter";
import SearchInput from "@/components/modules/SearchInput";
import AlphabetBar from "@/components/modules/AlphabetBar";
import CategoryButton from "@/components/modules/CategoryButton";
import DrugListItem from "@/components/modules/DrugListItem";
import Disclaimer from "@/components/modules/Disclaimer";

export default function HomeTemplate() {
  const all = useMemo(() => getAllDrugs(), []);
  const { query, setQuery, letter, setLetter, available, results, filtering } = useDrugFilter(all);

  const commonCount = all.filter((d) => d.kind === "common").length;
  const emergencyCount = all.length - commonCount;

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-800 to-brand-600 px-4 pb-16 pt-8 text-white">
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/25">
            <FaStethoscope />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold leading-tight">دوزیار اطفال</h1>
            <p className="text-sm text-brand-100">دوز، تجویز و عوارض دارو بر اساس وزن</p>
          </div>
        </div>
      </section>

      {/* Search + Alphabet */}
      <section className="-mt-9 space-y-3 px-4">
        <SearchInput value={query} onChange={setQuery} />
        <AlphabetBar active={letter} onSelect={setLetter} available={available} />
      </section>

      <section className="space-y-3 px-4 pt-4">
        {filtering ? (
          <>
            <p className="text-sm font-semibold text-slate-500">{results.length} نتیجه</p>
            {results.length > 0 ? (
              results.map((d) => <DrugListItem key={d.key} drug={d} />)
            ) : (
              <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 ring-1 ring-slate-200">
                دارویی پیدا نشد. نام انگلیسی یا فارسی دیگری را امتحان کنید.
              </p>
            )}
          </>
        ) : (
          <>
            <CategoryButton
              href="/drugs"
              title="داروهای کاربردی در کودکان"
              subtitle="شربت، قرص، آمپول و ..."
              count={commonCount}
              icon={FaPills}
              tone="brand"
            />
            <CategoryButton
              href="/emergency"
              title="داروهای اورژانسی"
              subtitle="STAT Bolus و Infusion"
              count={emergencyCount}
              icon={FaBolt}
              tone="red"
            />
          </>
        )}
      </section>

      <Disclaimer />
    </main>
  );
}
