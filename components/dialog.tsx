import { ReactNode } from "react"
import { ActionDialog } from "./action-dialog"
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "./ui/dialog"

type DialogProps = {
	title: string
	description?: string
	children?: ReactNode
}

export function Dialog({ title, children, description }: DialogProps) {
	return (
		<ActionDialog>
			<DialogContent size={"xs"}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>
				{children}
			</DialogContent>
		</ActionDialog>
	)
}
