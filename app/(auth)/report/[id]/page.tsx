import { PageTitle } from "@/components/page-title"
import path from "path"
import fs from "fs"
import { Report } from "@/modules/report-builder"
import { IncomesTable } from "@/components/incomes-table"
import { Card } from "@/components/card"
import { Metadata } from "next"

//type Props = PageProps<"id">

export async function generateMetadata(): Promise<Metadata> {
//{ params }: Props
//parent: ResolvingMetadata
	// read route params
	//const id = (await params).id

	// optionally access and extend (rather than replace) parent metadata
	//const previousImages = (await parent).openGraph?.images || []

	return {
		title: "Demo title", // TODO title
	}
}

export default async function Page(/*{ params }: Props*/) {
	//const id = (await params).id
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
			<Card
				label="Příjmy"
				description="Labore ullamco pariatur consequat cupidatat ad sint velit reprehenderit qui consequat."
			>
				<IncomesTable incomes={report.incomeForegin} />
			</Card>
		</main>
	)
}
