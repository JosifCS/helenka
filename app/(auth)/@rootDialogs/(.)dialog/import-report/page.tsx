import { importReport } from "@/actions/import-report"
import { Dialog } from "@/components/dialog"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { FormSelect } from "@/components/form-select"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { getTranslations } from "next-intl/server"

// TODO locales

type SearchParams = { broker: string }

export default async function Page() {
	const t = await getTranslations()
	return (
		<Dialog title={"import"} description="Import obchodního výpisu.">
			<Form action={importReport}>
				<FormSelect
					options={[
						{ value: "portu", label: "Portu" },
						{ value: "xtb", label: "XTB" },
						{ value: "etoro", label: "eToro" },
					]}
					placeholder="Broker"
					name="broker"
				/>
				<FormInput
					title="Výpis"
					name="report"
					type="file"
					accept="text/csv"
				/>

				<DialogFooter>
					<Button type="submit">Importovat</Button>
				</DialogFooter>
			</Form>
		</Dialog>
	)
}
