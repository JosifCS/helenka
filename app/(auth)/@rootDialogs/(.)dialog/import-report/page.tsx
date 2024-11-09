import { importReport } from "@/actions/import-report"
import { Dialog } from "@/components/dialog"
import { Form } from "@/components/form"
import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// TODO locales

type SearchParams = { broker: string }

export default async function Page() {
	return (
		<Dialog
			title={"import"}
			description="Import ročního daňového výpisu za daný rok."
		>
			<Form action={importReport}>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="year" className="text-right">
							Rok
						</Label>
						<Input
							name="year"
							id="year"
							type="number"
							maxLength={4}
							min={2000}
							max={3000}
							defaultValue={new Date().getFullYear()}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="report" className="text-right">
							Výpis
						</Label>
						<Input
							id="report"
							name="report"
							type="file"
							accept="text/csv"
							className="col-span-3"
						/>
					</div>
				</div>
				<DialogFooter>
					<Button type="submit">Importovat</Button>
				</DialogFooter>
			</Form>
		</Dialog>
	)
}
