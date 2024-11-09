"use client"

import { createContext, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

type FormWrapper = {
	action: any
	children: React.ReactNode
	className?: string
}

type ActionResult = {
	success: boolean
	message?: string
	redirect?: string
}

type FormResult = {
	validationErrors?: unknown
}

const FormContext = createContext<FormResult>({})

export const useFormContext = () => useContext(FormContext)

export function Form({ action, children, className }: FormWrapper) {
	const router = useRouter()
	const { execute, result, hasSucceeded } = useAction(action)

	useEffect(() => {
		if (hasSucceeded) {
			const data = result.data as ActionResult

			if (data.message) {
				if (data.success) {
					toast({
						title: "Success",
						description: data.message,
					})
				} else {
					toast({
						variant: "error",
						title: "Error",
						description: data.message,
					})
				}
			}

			if (data.redirect) {
				router.push(data.redirect)
			} else {
				router.back()
			}
		} else if (typeof result.serverError === "string") {
			toast({
				variant: "error",
				title: "Server error",
				description: result.serverError,
			})
		} else if (result.validationErrors) {
			toast({
				variant: "error",
				title: "Validation error",
				description: "Invalid form",
			})
		}
	}, [result])

	return (
		<form
			action={execute}
			className={cn("flex flex-col gap-4", className)}
			autoComplete="off"
		>
			<FormContext.Provider value={{ validationErrors: result }}>
				{children}
			</FormContext.Provider>
		</form>
	)
}
