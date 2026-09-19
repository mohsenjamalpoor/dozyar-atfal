import { notFound } from "next/navigation";
import { DRUGS } from "@/lib/data/drugs";
import DrugDetailTemplate from "@/components/templates/DrugDetailTemplate";

export function generateStaticParams() {
  return DRUGS.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const drug = DRUGS.find((d) => d.id === id);
  return { title: drug ? drug.fa : "دارو" };
}

export default async function Page({ params }) {
  const { id } = await params;
  const drug = DRUGS.find((d) => d.id === id);
  if (!drug) notFound();
  return <DrugDetailTemplate drug={drug} />;
}
