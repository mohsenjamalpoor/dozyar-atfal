import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata = {
  title: { default: "دوزیار اطفال", template: "%s | دوزیار اطفال" },
  description: "محاسبه دوز دارویی کودکان بر اساس وزن؛ داروهای کاربردی و اورژانسی",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5f1f8a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-sans antialiased">
        <div className="mx-auto min-h-dvh max-w-xl bg-slate-50 shadow-2xl shadow-brand-900/10">
          {children}
        </div>
      </body>
    </html>
  );
}
