import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Card as UiCard,
} from "./ui/card"

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
	label?: string
	description?: string
}

export function Card({ label, description, children, ...props }: CardProps) {
	return (
		<UiCard {...props}>
			{label || description ? (
				<CardHeader>
					{label ? <CardTitle>{label}</CardTitle> : null}
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
				</CardHeader>
			) : null}
			<CardContent>{children}</CardContent>
		</UiCard>
	)
}
