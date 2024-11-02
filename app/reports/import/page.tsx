import { uploadPortu } from "@/actions/uploadPortu"
import { PageTitle } from "@/components/page-title"
import { Input } from "@/components/ui/input"
import { getTranslations } from "next-intl/server"

export default async function Page() {
	const t = await getTranslations("Reports.Import")
	return (
		<main>
			<PageTitle title={t("title")} description={t("description")} />
			<div className="">
				<form action={uploadPortu}>
					<Input type="file" name="file" accept="text/csv" />
					<button type="submit">Odeslat</button>
				</form>
			</div>
		</main>
	)
}
