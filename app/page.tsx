import { uploadPortu } from "@/actions/uploadPortu"
import { PageTitle } from "@/components/page-title"
import { Input } from "@/components/ui/input"

export default function Page() {
	return (
		<main>
			<PageTitle
				title="První stránka"
				description="Tahle stránka není o ničem."
			/>
			<div className="flex gap-4 items-center flex-col sm:flex-row">
				<form action={uploadPortu}>
					<Input type="file" name="file" accept="text/csv" />
					<button type="submit">Odeslat</button>
				</form>
			</div>
		</main>
	)
}
