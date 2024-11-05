import { PageTitle } from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Reports")
	return (
		<>
			<div>
				<PageTitle
					title={"Aktuální výkazy"}
					description={"Výkazy přidané v posledním roce."}
				/>
				<div className=""></div>
			</div>

			<div>
				<PageTitle
					title={"Starší výkazy"}
					description={"Všechny ostatní výkazy."}
				/>
				<div className=""></div>
			</div>
		</>
	)
}
