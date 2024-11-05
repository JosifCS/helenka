import { ReactNode } from "react"
import { TabSelect } from "./components/tab-select"

export default async function Layout({ tabs }: { tabs: ReactNode }) {
	//const t = await getTranslations("Index")
	return (
		<main className="space-y-6">
			<TabSelect />
			{tabs}
		</main>
	)
}
