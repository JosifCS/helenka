import { uploadPortu } from "@/actions/uploadPortu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<form action={uploadPortu}>
						<Input type="file" name="file" accept="text/csv" />
						<button type="submit">Odeslat</button>
					</form>
				</div>
			</main>
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<Button variant={"link"}>Learn</Button>
			</footer>
		</div>
	)
}
