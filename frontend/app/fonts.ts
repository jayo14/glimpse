import { Instrument_Serif, Hanken_Grotesk } from "next/font/google";

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif-next",
  subsets: ["latin"],
});

export const hankenGrotesk = Hanken_Grotesk({
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans-next",
  subsets: ["latin"],
});
