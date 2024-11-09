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
import { NotImplementedError } from "@/types/error"

const schema = zfd.formData({
	report: zfd.file(),
	broker: zfd.text(z.enum(["portu", "xtb", "etoro"])),
})

export const importReport = authActionClient
	.schema(schema)
	.action(async function ({ parsedInput: { report, broker } }) {
		const json = broker == "portu" ? await csvToJson(report) : null

		if (json == null) throw new NotImplementedError("Broker.")

		const data = ReportBuilder.build(json, portuSchema as ReportSchema)

		// TODO univerzální ukládání
		const filePath = path.join(process.cwd(), "data", "data.json")
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8")

		return {
			success: true,
			message: "ok",
			//redirect: `/dashboard/reports`, // TODO reálně se můžu vracet na různé stránky, protože dialog je přístupný všude
		}
	})
