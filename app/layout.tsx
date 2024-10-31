import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactNode } from "react";

// inicializace konstanty
String.Empty = "";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Helenka",
  description:
    "Hospodářská evidence likvidity, evidence nákladů a kontrola aktiv",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className={`${geistSans.variable}`}>{children}</body>
    </html>
  );
}
