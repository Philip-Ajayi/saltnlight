import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, Outfit } from "next/font/google";

import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AmbientBackground from "@/components/ambient-background";
import PageTransition from "@/components/page-transition";
import CustomCursor from "@/components/custom-cursor";
import AudioPlayer from "@/components/audio-player";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MIV Word House",
    template: "%s · MIV Word House",
  },
  description:
    "MIV Word House — Faith. Character. Leadership. Excellence. A place where young destinies fire up.",
  keywords: [
    "MIV Word House",
    "Men of Issachar Vision",
    "church",
    "Ibadan",
    "Samonda",
    "youth ministry",
  ],
  metadataBase: new URL("https://mivwordhouse.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jakarta.variable} ${outfit.variable}`}
    >
      <body>
        <AmbientBackground />
        <div className="noise" aria-hidden="true" />

        <PageTransition>
          <Navbar />
          <main>{children}</main>
          <AudioPlayer />
          <Footer />
        </PageTransition>

        <CustomCursor />
      </body>
    </html>
  );
}
