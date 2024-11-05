import { CreateNewPlaceholder } from "@/components/create-new-placeholder"
import { PageTitle } from "@/components/page-title"
import { FileText } from "lucide-react"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Reports")
	const reports = []
	return (
		<>
			<div>
				<PageTitle
					title={"Aktuální výkazy"}
					description={"Výkazy přidané v posledním roce."}
				/>

				<div className="">
					{reports.length == 0 && (
						<CreateNewPlaceholder
							btnLabel="Importovat výkaz"
							description="Importovat svůj výkaz je dobrý první krork."
							href="/dialog/import-report"
							icon={FileText}
							label="Žádné importované výkazy"
						/>
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
