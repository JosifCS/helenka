import { ReactNode } from "react"
import { DashboardTabs } from "./components/dasboard-tabs"

export default async function Layout({ tabs }: { tabs: ReactNode }) {
	//const t = await getTranslations("Index")
	return (
		<main className="space-y-6">
			<DashboardTabs />
			{tabs}
		</main>
	)
}
