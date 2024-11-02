import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { TopMenu } from "@/components/top-menu";

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
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TopMenu />
        {children}
      </body>
    </html>
  );
}
