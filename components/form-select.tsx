"use client"

import { useId } from "react"
import { useFormContext } from "./form"
import { Label } from "./ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select"
import { Translations } from "@/types/global"
import { hasFieldErrors } from "./form-input"

type FormSelectProps = {
	label?: string
	value?: string
	defaultValue?: string
	options: { value: string; label?: string }[]
	name?: string
	placeholder?: string
	className?: string
	translations?: Translations
}

export function FormSelect({
	label,
	options,
	placeholder,
	translations: t,
	...props
}: FormSelectProps) {
	const result = useFormContext()
	const id = useId()

	return (
		<div className="grid w-full items-center gap-1.5">
			{label && <Label htmlFor={id}>{label}</Label>}
			<Select {...props}>
				<SelectTrigger>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((x) => (
						<SelectItem key={x.value} value={x.value}>
							{x.label ?? (t ? t(x.value as any) : x.value)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			{props.name &&
				hasFieldErrors(result.validationErrors) &&
				result.validationErrors?.fieldErrors?.[props.name] && (
					<small className="text-red-700">
						{result.validationErrors.fieldErrors[props.name][0]}
					</small>
				)}
		</div>
	)
}
