"use server"

import { portuParser } from "@/modules/portuParser"

/** @deprecated */
export async function uploadPortu(formData: FormData) {
	const file = formData.get("file")

	if (file instanceof File) {
		await portuParser(file)
	}
}
