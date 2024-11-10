import { PageTitle } from "@/components/page-title"
import path from "path"
import fs from "fs"
import { Report } from "@/modules/report-builder"
import { IncomesTable } from "@/components/incomes-table"

export default function Page() {
	let report: Report | null = null

	// TODO nahradit skutečným načítáním dat
	const filePath = path.join(process.cwd(), "data", "data.json")
	try {
		const jsonData = fs.readFileSync(filePath, "utf-8")
		report = JSON.parse(jsonData) as Report
	} catch (e: unknown) {}

	if (report == null) return null

	return (
		<main>
			<PageTitle
				title={report.broker}
				description={report.description ?? "???"}
			/>
			<IncomesTable incomes={report.incomeForegin} />
		</main>
	)
}
