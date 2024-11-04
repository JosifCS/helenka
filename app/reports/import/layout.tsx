import { ReactNode } from "react"

export default async function RootLayout({
	children,
	dialogs,
}: Readonly<{
	children: ReactNode
	dialogs: ReactNode
}>) {
	return (
		<>
			{dialogs} {children}
		</>
	)
}
