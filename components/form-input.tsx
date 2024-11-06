"use client"

import { useFormContext } from "./form"
import { Input } from "./ui/input"

export function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	const result = useFormContext() as { validationErrors: any }

	return (
		<div className="flex flex-col">
			<Input {...props} />

			{props.name &&
				result.validationErrors?.fieldErrors?.[props.name] && (
					<small className="text-red-700">
						{result.validationErrors.fieldErrors[props.name][0]}
					</small>
				)}
		</div>
	)
}
