import { PageTitle } from "@/components/page-title"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Reports")
	return (
		<main>
			<PageTitle title={t("title")} description={t("description")} />
			<div className=""></div>
		</main>
	)
}
