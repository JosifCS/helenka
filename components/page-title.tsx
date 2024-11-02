import { HTMLAttributes } from "react"
import { Separator } from "./ui/separator"

type PageTitleProps = HTMLAttributes<HTMLDivElement> & {
	title: string
	description: string
}

export function PageTitle({
	description,
	title,
	children,
	...props
}: PageTitleProps) {
	return (
		<>
			<div className="flex items-center justify-between" {...props}>
				<div className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">
						{title}
					</h2>
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				</div>
				<div>{children}</div>
			</div>
			<Separator className="my-4" />
		</>
	)
}
