import { PageTitle } from "@/components/page-title"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { CirclePlus } from "lucide-react"
import Link from "next/link"

export default async function Page() {
	const t = await getTranslations("Reports")
	return (
		<main>
			<PageTitle title={t("title")} description={t("description")}>
				<Link href="/reports/import" passHref>
					<Button icon={CirclePlus}>{t("newImport")}</Button>
				</Link>
			</PageTitle>
			<div className=""></div>
		</main>
	)
}
