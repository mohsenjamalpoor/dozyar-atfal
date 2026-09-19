"use client";
import { useMemo } from "react";
import { getAllDrugs } from "@/lib/search";
import { useDrugFilter } from "@/lib/useDrugFilter";
import PageHeader from "@/components/modules/PageHeader";
import SearchInput from "@/components/modules/SearchInput";
import AlphabetBar from "@/components/modules/AlphabetBar";
import DrugListItem from "@/components/modules/DrugListItem";
import Disclaimer from "@/components/modules/Disclaimer";

export default function CommonDrugsTemplate() {
  const items = useMemo(() => getAllDrugs().filter((d) => d.kind === "common"), []);
  const { query, setQuery, letter, setLetter, available, results } = useDrugFilter(items);

  return (
    <main>
      <PageHeader title="داروهای کاربردی در کودکان" subtitle={`${items.length} دارو`} />
      <div className="space-y-3 px-4 pt-4">
        <SearchInput value={query} onChange={setQuery} />
        <AlphabetBar active={letter} onSelect={setLetter} available={available} />
      </div>

      <div className="space-y-3 px-4 pt-3">
        {results.length > 0 ? (
          results.map((d) => <DrugListItem key={d.key} drug={d} />)
        ) : (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 ring-1 ring-slate-200">
            دارویی پیدا نشد.
          </p>
        )}
      </div>
      <Disclaimer />
    </main>
  );
}
