import { Separator } from "./ui/separator"

export function PageTitle({
	description,
	title,
}: {
	title: string
	description: string
}) {
	return (
		<>
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">
						{title}
					</h2>
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				</div>
			</div>
			<Separator className="my-4" />
		</>
	)
}
