"use server"

import { zfd } from "zod-form-data"
import { authActionClient } from "@/modules/safe-action"
import { csvToJson } from "@/modules/csv-json"
import { ReportBuilder } from "@/modules/report-builder"
import portuSchema from "@/dictionaries/portu-2023.report.json"
import path from "path"
import fs from "fs"

const schema = zfd.formData({
	report: zfd.file(),
})

export const importReport = authActionClient
	.schema(schema)
	//.metadata({})
	.action(async function ({ parsedInput: { report } }) {
		// TODO univerzální import výkazů

		const json = await csvToJson(report)
		const data = ReportBuilder.build(json, portuSchema)

		// TODO univerzální ukládání
		const filePath = path.join(process.cwd(), "data", "data.json")
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")

		return {
			success: true,
			message: "ok",
			redirect: `/dashboard/reports`, // TODO reálně se můžu vracet na různé stránky, protože dialog je přístupný všude
		}
	})
