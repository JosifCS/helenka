"use server"

import { portuParser } from "@/modules/portuParser"
import { zfd } from "zod-form-data"
import { authActionClient } from "@/modules/safe-action"

const schema = zfd.formData({
	report: zfd.file(),
})

export const importReport = authActionClient
	.schema(schema)
	//.metadata({})
	.action(async function ({ parsedInput: { report } }) {
		// TODO univerzální import výkazů

		return {
			success: true,
			message: "ok",
			redirect: `/dashboard`, // TODO reálně se můžu vracet na různé stránky, protože dialog je přístupný všude
		}
	})
