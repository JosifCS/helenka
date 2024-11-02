import { PageTitle } from "@/components/page-title"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Index")
	return (
		<main>
			<PageTitle title={t("title")} description={t("description")} />
			<div className="flex gap-4 items-center flex-col sm:flex-row"></div>
		</main>
	)
}
