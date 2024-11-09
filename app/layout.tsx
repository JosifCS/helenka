import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { getLocale } from "next-intl/server"
import { ReactNode } from "react"
import { ClientProviders } from "@/components/client-providers"

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
				{children}
				<ClientProviders />
			</body>
		</html>
	)
}
