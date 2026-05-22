import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { clashDisplay, satoshi } from "@/src/lib/fonts";
import "./globals.css";
import OpeningAnimation from "./components/OpeningAnimation";
import FloatingCallCTA from "./components/FloatingCta";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridgewell Colorado Xeriscaping",
  description: "Ridgewell Colorado Xeriscaping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} ${satoshi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OpeningAnimation />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
          <FloatingCallCTA />
        </main>
      </body>
    </html>
  );
}
