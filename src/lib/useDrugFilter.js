"use client";
import { useMemo, useState } from "react";
import { filterDrugs } from "@/lib/search";

export function useDrugFilter(items) {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState("");

  const available = useMemo(() => new Set(items.map((d) => d.letter)), [items]);
  const results = useMemo(() => filterDrugs(items, query, letter), [items, query, letter]);
  const filtering = Boolean(query.trim() || letter);

  return { query, setQuery, letter, setLetter, available, results, filtering };
}
