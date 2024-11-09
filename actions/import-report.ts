"use server"

import { zfd } from "zod-form-data"
import { authActionClient } from "@/modules/safe-action"
import { csvToJson } from "@/modules/csv-json"
import { ReportBuilder } from "@/modules/report-builder"
import portuSchema from "@/dictionaries/portu-2023.report.json"
import path from "path"
import fs from "fs"
import { z } from "zod"
import { ReportSchema } from "@/modules/report-schema"

const schema = zfd.formData({
	report: zfd.file(),
	broker: zfd.text(z.enum(["portu", "xtb", "etoro"])),
})

export const importReport = authActionClient
	.schema(schema)
	.action(async function ({ parsedInput: { report, broker } }) {
		// TODO univerzální import výkazů

		const json = await csvToJson(report)
		const data = ReportBuilder.build(json, portuSchema as ReportSchema)

		// TODO univerzální ukládání
		const filePath = path.join(process.cwd(), "data", "data.json")
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")

		return {
			success: true,
			message: "ok",
			redirect: `/dashboard/reports`, // TODO reálně se můžu vracet na různé stránky, protože dialog je přístupný všude
		}
	})
