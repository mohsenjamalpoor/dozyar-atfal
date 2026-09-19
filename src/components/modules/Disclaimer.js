import { FaTriangleExclamation } from "react-icons/fa6";

export default function Disclaimer() {
  return (
    <p className="mx-4 my-6 flex gap-2 rounded-2xl bg-amber-50 p-3 text-xs leading-6 text-amber-900 ring-1 ring-amber-200">
      <FaTriangleExclamation className="mt-1 shrink-0" />
      <span>
        این ابزار صرفاً مرجع کمکی است. پیش از تجویز، دوزها را با پروتکل و منبع معتبر بخش خود تطبیق دهید.
      </span>
    </p>
  );
}
