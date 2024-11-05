import { PageTitle } from "@/components/page-title"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Assemblies")
	return (
		<main>
			<PageTitle
				title={"Sestavy výkazů"}
				description={
					"Spojení výce výkazů a vyhodnocení celého období v jednom."
				}
			/>
			<div className=""></div>
		</main>
	)
}
