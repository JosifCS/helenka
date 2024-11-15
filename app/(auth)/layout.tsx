import { TopMenu } from "@/components/top-menu"
import { ReactNode } from "react"

/*export const metadata: Metadata = {
	title: "Helenka",
	description:
		"Hospodářská evidence likvidity, evidence nákladů a kontrola aktiv",
}*/

export default async function RootLayout({
	children,
	rootDialogs,
}: Readonly<{
	children: ReactNode
	rootDialogs: ReactNode
}>) {
	return (
		<>
			<TopMenu />
			<div className="mt-10 bg-background h-full px-4 py-6 lg:px-8">
				{children}
			</div>
			{rootDialogs}
		</>
	)
}
