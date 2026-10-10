// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Syne } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CursorLight } from "@/components/ui/cursor-light";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { DentalPopup } from "@/components/ui/dental-popup"; // 1. Import the component

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Salt & Light '26 — Influence on World Mountains",
    template: "%s | Salt & Light '26",
  },
  description:
    "A convocation of and for influence on world mountains. Salt & Light 2026 by MIV Word House.",
  keywords: [
    "Salt and Light 2026",
    "MIV Word House",
    "Men of Issachar Vision",
    "Samonda",
    "Ibadan",
    "Influence",
    "World Mountains",
  ],
  authors: [{ name: "MIV Word House" }],
  creator: "MIV Word House",
  metadataBase: new URL("https://saltandlight.example.com"),
  openGraph: {
    title: "Salt & Light '26",
    description: "A convocation of and for influence on world mountains.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050308",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${jakarta.variable}`}
    >
      <body>
        <SmoothScroll />
        <CursorLight />
        <NoiseOverlay />
        <Navbar />
        {children}
        <DentalPopup /> {/* 2. Add it here so it appears globally */}
        <Footer />
      </body>
    </html>
  );
}
