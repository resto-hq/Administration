import localFont from "next/font/local";

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
