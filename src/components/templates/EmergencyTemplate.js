"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaBolt, FaDroplet, FaBrain, FaTableList, FaBookMedical, FaXmark } from "react-icons/fa6";
import { EMERGENCY_DRUGS } from "@/lib/data/emergency";
import { parseWeight } from "@/lib/dose";
import { useWeight } from "@/lib/useWeight";
import PageHeader from "@/components/modules/PageHeader";
import SegmentedTabs from "@/components/modules/SegmentedTabs";
import WeightInput from "@/components/modules/WeightInput";
import InfusionControls from "@/components/modules/InfusionControls";
import BolusCard from "@/components/modules/BolusCard";
import InfusionCard from "@/components/modules/InfusionCard";
import { BolusTable, InfusionTable } from "@/components/modules/DrugTables";
import Disclaimer from "@/components/modules/Disclaimer";

const MODES = [
  { value: "bolus", label: "STAT BOLUS", icon: <FaBolt />, tone: "red" },
  { value: "infusion", label: "INFUSION", icon: <FaDroplet />, tone: "brand" },
];

const VIEWS = [
  { value: "smart", label: "Smart View", icon: <FaBrain />, tone: "brand" },
  { value: "table", label: "Table View", icon: <FaTableList />, tone: "blue" },
];

export default function EmergencyTemplate() {
  const router = useRouter();
  const params = useSearchParams();

  const focusId = params.get("drug");
  const focused = EMERGENCY_DRUGS.find((d) => d.id === focusId) || null;

  const [mode, setMode] = useState(() => {
    const m = params.get("mode");
    if (m === "bolus" || m === "infusion") return m;
    return focused && !focused.bolus ? "infusion" : "bolus";
  });
  const [view, setView] = useState("smart");
  const [weightStr, setWeight] = useWeight();
  const [factor, setFactor] = useState(1);
  const [volume, setVolume] = useState(0); // 0 = Default

  const weight = parseWeight(weightStr);
  const list = EMERGENCY_DRUGS.filter((d) => d[mode] && (!focused || d.id === focused.id));

  return (
    <main>
      <PageHeader
        title="داروهای اورژانسی"
        subtitle="بر اساس وزن · Bolus + Infusion"
        right={
          <Link
            href="/drugs"
            aria-label="داروهای کاربردی"
            className="grid size-10 place-items-center rounded-full text-xl transition hover:bg-white/10"
          >
            <FaBookMedical />
          </Link>
        }
      />

      <div className="space-y-4 border-b border-slate-200 bg-white px-4 pb-4 pt-4">
        <SegmentedTabs options={MODES} value={mode} onChange={setMode} size="lg" />
        <WeightInput value={weightStr} onChange={setWeight} />
        <SegmentedTabs options={VIEWS} value={view} onChange={setView} />
        {mode === "infusion" && (
          <InfusionControls factor={factor} onFactor={setFactor} volume={volume} onVolume={setVolume} />
        )}
      </div>

      <div className="space-y-4 bg-brand-50/60 px-4 py-4">
        {focused && (
          <button
            type="button"
            onClick={() => router.replace("/emergency")}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-200"
          >
            فقط {focused.name}
            <FaXmark />
          </button>
        )}

        {list.length === 0 && (
          <p className="rounded-2xl bg-white p-6 text-center text-sm text-slate-500 ring-1 ring-slate-200">
            این دارو در این حالت موجود نیست.
          </p>
        )}

        {mode === "bolus" &&
          (view === "smart" ? (
            list.map((d) => <BolusCard key={d.id} drug={d} weight={weight} />)
          ) : list.length > 0 ? (
            <BolusTable drugs={list} weight={weight} />
          ) : null)}

        {mode === "infusion" &&
          (view === "smart" ? (
            list.map((d) => (
              <InfusionCard key={d.id} drug={d} weight={weight} factor={factor} volume={volume} />
            ))
          ) : list.length > 0 ? (
            <InfusionTable drugs={list} weight={weight} factor={factor} volume={volume} />
          ) : null)}
      </div>

      <Disclaimer />
    </main>
  );
}
