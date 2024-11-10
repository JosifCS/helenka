import { PageTitle } from "@/components/page-title"

export default function Page() {
	return (
		<main>
			<PageTitle
				title="První stránka"
				description="Tahle stránka není o ničem."
			/>
			<div className="flex gap-4 items-center flex-col sm:flex-row"></div>
		</main>
	)
}
