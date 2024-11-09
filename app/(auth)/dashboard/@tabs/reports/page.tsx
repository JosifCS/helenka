import { CreateNewPlaceholder } from "@/components/create-new-placeholder"
import { PageTitle } from "@/components/page-title"
import { FileText } from "lucide-react"
import { getTranslations } from "next-intl/server"
import path from "path"
import fs from "fs"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Artwork } from "@/components/artwork"
import { Report } from "@/modules/report-builder"

export default async function Page() {
	const t = await getTranslations("Reports")

	const reports: Report[] = []

	// TODO nahradit skutečným načítáním dat
	const filePath = path.join(process.cwd(), "data", "data.json")
	try {
		const jsonData = fs.readFileSync(filePath, "utf-8")
		reports.push(JSON.parse(jsonData))
	} catch (e: unknown) {}

	return (
		<>
			<div>
				<PageTitle
					title={"Aktuální výkazy"}
					description={"Výkazy přidané v posledním roce."}
				/>

				<div className="">
					{reports.length == 0 ? (
						<CreateNewPlaceholder
							btnLabel="Importovat výkaz"
							description="Importovat svůj výkaz je dobrý první krork."
							href="/dialog/import-report"
							icon={FileText}
							label="Žádné importované výkazy"
						/>
					) : (
						<div className="relative">
							<ScrollArea>
								<div className="flex space-x-4 pb-4">
									{reports.map((report, index) => (
										<Artwork
											key={index}
											alt=""
											description={
												report.description ?? ""
											}
											href="/"
											label={report.broker}
											src="/portu.png"
											className="w-[250px]"
											aspectRatio="portrait"
											width={250}
											height={330}
										/>
									))}
								</div>
								<ScrollBar orientation="horizontal" />
							</ScrollArea>
						</div>
					)}
				</div>
			</div>

			{reports.length > 0 && (
				<div>
					<PageTitle
						title={"Starší výkazy"}
						description={"Všechny ostatní výkazy."}
					/>
					<div className=""></div>
				</div>
			)}
		</>
	)
}
