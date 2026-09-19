import { Suspense } from "react";
import EmergencyTemplate from "@/components/templates/EmergencyTemplate";

export const metadata = { title: "داروهای اورژانسی" };

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EmergencyTemplate />
    </Suspense>
  );
}
