import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { TopMenu } from "@/components/top-menu"
import { getLocale } from "next-intl/server"
import { ReactNode } from "react"

// inicializace konstant
String.Empty = ""
String.CR = "\r"
String.LF = "\n"
String.CRLF = "\r\n"

const geistSans = localFont({
	src: "../assets/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
})
const geistMono = localFont({
	src: "../assets/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
})

export const metadata: Metadata = {
	title: "Helenka",
	description:
		"Hospodářská evidence likvidity, evidence nákladů a kontrola aktiv",
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const locale = await getLocale()

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<TopMenu />
				<div className="mt-10 bg-background h-full px-4 py-6 lg:px-8">
					{children}
				</div>
			</body>
		</html>
	)
}
