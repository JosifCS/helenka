import { CreateNewPlaceholder } from "@/components/create-new-placeholder"
import { PageTitle } from "@/components/page-title"
import { FileStack } from "lucide-react"

export default async function Page() {
	const assemblies = []
	return (
		<main>
			<PageTitle
				title={"Sestavy výkazů"}
				description={
					"Spojení výce výkazů a vyhodnocení celého období v jednom."
				}
			/>
			<div className="">
				{assemblies.length == 0 && (
					<CreateNewPlaceholder
						btnLabel="Nová sestava"
						description="Není vytvořena žádná sestava výkazů. Vytvořte novou."
						href="/dialog/edit-assembly"
						icon={FileStack}
						label="Žádné vytvořené sestavy"
					/>
				)}
			</div>
		</main>
	)
}
