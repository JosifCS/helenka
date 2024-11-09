import { importReport } from "@/actions/import-report"
import { Dialog } from "@/components/dialog"
import { Form } from "@/components/form"
import { FormInput } from "@/components/form-input"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"

// TODO locales

type SearchParams = { broker: string }

export default async function Page() {
	return (
		<Dialog title={"import"} description="Import obchodního výpisu.">
			<Form action={importReport}>
				<FormInput
					label="Výpis"
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
