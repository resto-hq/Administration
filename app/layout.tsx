import type { Metadata } from "next";
import { lufga } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resto — Ton resto, visible à Lomé",
  description:
    "Resto aide les restaurateurs de Lomé à se faire découvrir, récolter des avis et remplir leurs tables.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={lufga.variable}>
      <body className="font-sans bg-canvas text-secondary antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
