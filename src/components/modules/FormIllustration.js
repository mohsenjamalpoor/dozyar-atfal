"use client";
import { useId } from "react";

/**
 * تصویر برداری (SVG) هر شکل دارویی.
 * اگر عکس واقعی دارید، می‌توانید به‌جای این کامپوننت از <Image src="/forms/syrup.png" /> استفاده کنید.
 */
export default function FormIllustration({ type, className = "size-40" }) {
  const id = useId().replace(/:/g, "");
  const common = { viewBox: "0 0 120 120", className, role: "img", "aria-label": type };

  switch (type) {
    case "syrup":
      return (
        <svg {...common}>
          <defs>
            <linearGradient id={`${id}g`} x1="0" x2="1">
              <stop offset="0" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="112" rx="34" ry="5" fill="#000" opacity=".08" />
          <rect x="42" y="8" width="36" height="16" rx="4" fill="#5f1f8a" />
          <rect x="46" y="24" width="28" height="10" fill="#d4d4d8" />
          <path d="M34 42q0-8 12-8h28q12 0 12 8v58q0 10-10 10H44q-10 0-10-10z" fill={`url(#${id}g)`} />
          <rect x="34" y="56" width="52" height="38" fill="#fff" />
          <path d="M60 64v22M49 75h22" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
          <path d="M40 44v50" stroke="#fff" strokeWidth="3" opacity=".35" strokeLinecap="round" />
        </svg>
      );

    case "tablet":
      return (
        <svg {...common}>
          <ellipse cx="60" cy="108" rx="38" ry="5" fill="#000" opacity=".08" />
          <ellipse cx="60" cy="72" rx="42" ry="30" fill="#c9b3dd" />
          <ellipse cx="60" cy="64" rx="42" ry="30" fill="#fff" stroke="#8a3cbd" strokeWidth="3" />
          <path d="M22 64h76" stroke="#8a3cbd" strokeWidth="3" strokeLinecap="round" opacity=".6" />
          <ellipse cx="44" cy="52" rx="14" ry="6" fill="#8a3cbd" opacity=".08" />
        </svg>
      );

    case "capsule":
      return (
        <svg {...common}>
          <ellipse cx="60" cy="108" rx="40" ry="5" fill="#000" opacity=".08" />
          <g transform="rotate(-35 60 60)">
            <path d="M33 42h27v36H33a18 18 0 0 1 0-36z" fill="#8a3cbd" />
            <path d="M60 42h27a18 18 0 0 1 0 36H60z" fill="#fff" stroke="#c9b3dd" strokeWidth="2" />
            <rect x="38" y="47" width="40" height="5" rx="2.5" fill="#fff" opacity=".35" />
          </g>
        </svg>
      );

    case "ampoule":
      return (
        <svg {...common}>
          <ellipse cx="60" cy="112" rx="26" ry="4" fill="#000" opacity=".08" />
          <path d="M60 6q7 12 7 26v10q17 10 17 34 0 26-24 26T36 76q0-24 17-34V32Q53 18 60 6z" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="3" />
          <path d="M39 74q0 24 21 24t21-24q0-6-2-11H41q-2 5-2 11z" fill="#38bdf8" opacity=".55" />
          <path d="M48 62v22" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" />
          <path d="M53 34h14" stroke="#38bdf8" strokeWidth="2" opacity=".6" />
        </svg>
      );

    case "vial":
      return (
        <svg {...common}>
          <ellipse cx="60" cy="112" rx="30" ry="4" fill="#000" opacity=".08" />
          <rect x="44" y="8" width="32" height="12" rx="3" fill="#71717a" />
          <rect x="40" y="18" width="40" height="10" rx="3" fill="#dc2626" />
          <path d="M44 28h32v10q6 4 6 12v50q0 10-10 10H48q-10 0-10-10V50q0-8 6-12z" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="3" />
          <rect x="38" y="54" width="44" height="34" fill="#fff" />
          <path d="M60 60v22M49 71h22" stroke="#5f1f8a" strokeWidth="5" strokeLinecap="round" />
          <path d="M46 42v6" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case "drop":
      return (
        <svg {...common}>
          <ellipse cx="60" cy="112" rx="26" ry="4" fill="#000" opacity=".08" />
          <path d="M52 6h16v22H52z" fill="#5f1f8a" />
          <path d="M46 28h28l4 10H42z" fill="#a865d3" />
          <path d="M40 38h40q6 0 6 8v50q0 12-12 12H46q-12 0-12-12V46q0-8 6-8z" fill="#fde68a" stroke="#f59e0b" strokeWidth="3" />
          <rect x="40" y="58" width="40" height="30" fill="#fff" rx="2" />
          <path d="M60 64q8 10 0 18-8-8 0-18z" fill="#0ea5e9" />
        </svg>
      );

    case "suppository":
      return (
        <svg {...common}>
          <ellipse cx="60" cy="100" rx="42" ry="5" fill="#000" opacity=".08" />
          <g transform="rotate(-28 60 60)">
            <path d="M18 48q0-8 8-8h42q30 0 30 20t-30 20H26q-8 0-8-8z" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
            <path d="M28 48h40" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" />
          </g>
        </svg>
      );

    case "neb":
      return (
        <svg {...common}>
          <ellipse cx="62" cy="112" rx="34" ry="4" fill="#000" opacity=".08" />
          <rect x="44" y="6" width="24" height="46" rx="6" fill="#94a3b8" />
          <path d="M36 50h40q6 0 6 6v26h20q6 0 6 6v10q0 8-8 8H50q-14 0-14-14z" fill="#0ea5e9" />
          <rect x="52" y="14" width="12" height="20" rx="3" fill="#fff" opacity=".6" />
          <circle cx="62" cy="70" r="5" fill="#fff" opacity=".7" />
        </svg>
      );

    default:
      return null;
  }
}
