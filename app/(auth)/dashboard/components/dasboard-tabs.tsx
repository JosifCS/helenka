"use client"

import { usePathname, useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DashboardTabs() {
	const router = useRouter()
	const pathname = usePathname()
	const value = pathname.split("/")[2] || "reports"

	return (
		<Tabs
			value={value}
			onValueChange={(v) => router.push(`/dashboard/${v}`)}
			className="h-full space-y-6"
		>
			<div className="space-between flex items-center">
				<TabsList>
					<TabsTrigger value="reports">Výkazy</TabsTrigger>
					<TabsTrigger value="assemblies">Sestavy</TabsTrigger>
				</TabsList>
			</div>
		</Tabs>
	)
}
