import localFont from "next/font/local";
import { Space_Grotesk } from "next/font/google";

export const lufga = localFont({
  src: [
    { path: "../app/fonts/lufga/LufgaRegular.ttf", weight: "400", style: "normal" },
    { path: "../app/fonts/lufga/LufgaMedium.ttf", weight: "500", style: "normal" },
    { path: "../app/fonts/lufga/LufgaSemiBold.ttf", weight: "600", style: "normal" },
    { path: "../app/fonts/lufga/LufgaBold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-lufga",
  display: "swap",
});

// Public showcase page only — the admin/dashboard shell keeps Lufga.
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});
