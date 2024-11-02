import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/global.css";
import { ReactNode } from "react";

// inicializace konstant
String.Empty = "";
String.CR = "\r";
String.LF = "\n";
String.CRLF = "\r\n";

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
