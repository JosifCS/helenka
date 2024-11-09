"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type FormInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	label?: string
}

export function FormInput({ label, ...props }: FormInputProps) {
	const result = useFormContext() as { validationErrors: any }
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			<Input id={id} {...props} />
			{props.name &&
				result.validationErrors?.fieldErrors?.[props.name] && (
					<small className="text-red-700">
						{result.validationErrors.fieldErrors[props.name][0]}
					</small>
				)}
		</div>
	)
}
