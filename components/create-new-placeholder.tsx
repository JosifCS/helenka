import Link from "next/link"
import { Button } from "./ui/button"
import { IconProps } from "."

type CreateNewPlaceholderProps = {
	label: string
	btnLabel: string
	description: string
	href: string
	icon: IconProps
}

export function CreateNewPlaceholder({
	description,
	href,
	label,
	btnLabel,
	icon: Icon,
}: CreateNewPlaceholderProps) {
	return (
		<div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
			<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
				<Icon className="h-10 w-10 text-muted-foreground" />

				<h3 className="mt-4 text-lg font-semibold">{label}</h3>
				<p className="mb-4 mt-2 text-sm text-muted-foreground">
					{description}
				</p>
				<Link href={href} passHref>
					<Button size="sm" className="relative">
						{btnLabel}
					</Button>
				</Link>
			</div>
		</div>
	)
}
