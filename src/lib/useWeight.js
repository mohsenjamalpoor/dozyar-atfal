"use client";
import { useEffect, useState } from "react";

const KEY = "dozyar-weight";

/** وزن بیمار بین صفحه‌ها در localStorage نگه داشته می‌شود */
export function useWeight() {
  const [weight, setWeight] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setWeight(saved);
    } catch {}
  }, []);

  const update = (value) => {
    setWeight(value);
    try {
      localStorage.setItem(KEY, value);
    } catch {}
  };

  return [weight, update];
}
