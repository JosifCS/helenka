import { ExcelData } from "./csv-json"
import { ReportSchema, reportSchema } from "./report-schema"

export class ReportBuilder {
	private excel: ExcelData
	private schema: ReportSchema
	private activeRow: Record<string, string> | null

	private constructor(excel: ExcelData, schema: ReportSchema) {
		this.excel = excel
		this.schema = schema
		this.activeRow = null
	}

	/**
	 * Convert excel JSON data to `Report` object.
	 * @param schema Report schema (will be validated).
	 * @param excel Report data in excel JSON format.
	 * @returns `Report`.
	 */
	public static build(excel: ExcelData, schema: ReportSchema): Report {
		const b = new ReportBuilder(excel, ReportBuilder.validateSchema(schema))

		const report: Report = {
			broker: b.schema.broker,
			version: b.schema.version,
			description: b.schema.description ?? null,
			incomeUsd: b.parseIncomeForegin(b.schema.incomesUsd),
			incomeEur: b.parseIncomeForegin(b.schema.incomesEur),
			incomeCzk: b.parseIncomeCzk(),
			income: b.parseIncome(),
			currencyHedging: b.parseCurrencyHedging(),
			fees: b.parseFees(),
			dividendsUsd: b.parseDividends(b.schema.dividendsUsd),
		}

		return report
	}

	/**
	 * Report schema validation. Set `this.schema`.
	 * @param schema Unvalidated schema.
	 * @returns Validated schema or *null*.
	 */
	private static validateSchema(schema: any): ReportSchema {
		try {
			return reportSchema.parse(schema)
		} catch (error) {
			throw Error(
				`Error in Report builder. Schema has invalid data structure. ${error}`
			)
		}
	}

	private parseIncomeForegin(
		tableSchema: ReportSchema["incomesUsd"]
	): IncomeForegin[] | null {
		if (tableSchema == undefined) return null

		const incomes: IncomeForegin[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			incomes.push({
				count: this.getNumber(tableSchema, "count")!,
				dateIn: this.getDate(tableSchema, "dates", "in"),
				dateOut: this.getDate(tableSchema, "dates", "out"),
				isin: this.getString(tableSchema, "isin")!,
				name: this.getString(tableSchema, "name")!,
				timeTest: this.getBoolean(tableSchema, "timeTest")!,
				unitBuy: this.getNumber(tableSchema, "unitBuy")!,
				unitSell: this.getNumber(tableSchema, "unitSell")!,
				buyRate: this.getNumber(tableSchema, "buyRate"),
				expenseCzk: this.getNumber(tableSchema, "expenseCzk"),
				id: this.getNumber(tableSchema, "id"),
				incomeCzk: this.getNumber(tableSchema, "incomeCzk"),
				profitCzk: this.getNumber(tableSchema, "profitCzk"),
				sellRate: this.getNumber(tableSchema, "sellRate"),
			})
		})

		return incomes
	}

	private parseIncomeCzk(): IncomeCzk[] | null {
		const tableSchema = this.schema.incomesCzk
		if (tableSchema == undefined) return null

		const incomes: IncomeCzk[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			incomes.push({
				count: this.getNumber(tableSchema, "count")!,
				dateIn: this.getDate(tableSchema, "dates", "in"),
				dateOut: this.getDate(tableSchema, "dates", "out"),
				isin: this.getString(tableSchema, "isin")!,
				name: this.getString(tableSchema, "name")!,
				timeTest: this.getBoolean(tableSchema, "timeTest")!,
				unitBuy: this.getNumber(tableSchema, "unitBuy")!,
				unitSell: this.getNumber(tableSchema, "unitSell")!,
				expense: this.getNumber(tableSchema, "expense"),
				id: this.getNumber(tableSchema, "id"),
				income: this.getNumber(tableSchema, "income"),
				profit: this.getNumber(tableSchema, "profit"),
			})
		})

		return incomes
	}

	private parseIncome(): Income[] | null {
		const tableSchema = this.schema.incomes
		if (tableSchema == undefined) return null

		const incomes: Income[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			incomes.push({
				count: this.getNumber(tableSchema, "count")!,
				dateIn: this.getDate(tableSchema, "dateIn"),
				dateOut: this.getDate(tableSchema, "dateOut"),
				isin: this.getString(tableSchema, "isin")!,
				name: this.getString(tableSchema, "name")!,
				unitBuy: this.getNumber(tableSchema, "unitBuy")!,
				unitSell: this.getNumber(tableSchema, "unitSell")!,
				id: this.getNumber(tableSchema, "id"),
			})
		})

		return incomes
	}

	private parseCurrencyHedging(): CurrencyHedging[] | null {
		const tableSchema = this.schema.currencyHedging
		if (tableSchema == undefined) return null

		const items: CurrencyHedging[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			items.push({
				dateIn: this.getDate(tableSchema, "dateIn"),
				dateOut: this.getDate(tableSchema, "dateOut"),
				name: this.getString(tableSchema, "name")!,
				id: this.getNumber(tableSchema, "id"),
				profit: this.getNumber(tableSchema, "profit")!,
				buyRate: this.getNumber(tableSchema, "buyRate")!,
				position: this.getString(tableSchema, "position")!,
				sellRate: this.getNumber(tableSchema, "sellRate")!,
			})
		})

		return items
	}

	private parseFees(): Fee[] | null {
		const tableSchema = this.schema.fees
		if (tableSchema == undefined) return null

		const fees: Fee[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			fees.push({
				name: this.getString(tableSchema, "name")!,
				id: this.getNumber(tableSchema, "id"),
				date: this.getDate(tableSchema, "date")!,
				fee: this.getNumber(tableSchema, "fee")!,
			})
		})

		return fees
	}

	private parseDividends(
		tableSchema: ReportSchema["dividendsUsd"]
	): Dividend[] | null {
		if (tableSchema == undefined) return null

		const dividends: Dividend[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			dividends.push({
				isin: this.getString(tableSchema, "isin")!,
				name: this.getString(tableSchema, "name")!,
				id: this.getNumber(tableSchema, "id"),
				creditedTax: this.getNumber(tableSchema, "creditedTax"),
				czWithholdingTax: this.getNumber(
					tableSchema,
					"czWithholdingTax"
				),
				czWithholdingTaxValue: this.getNumber(
					tableSchema,
					"czWithholdingTaxValue"
				),
				date: this.getDate(tableSchema, "date"),
				gross: this.getNumber(tableSchema, "gross")!,
				grossCzk: this.getNumber(tableSchema, "grossCzk"),
				rate: this.getNumber(tableSchema, "rate"),
				sourceWithholdingTax: this.getNumber(
					tableSchema,
					"sourceWithholdingTax"
				),
				sourceWithholdingTaxValue: this.getNumber(
					tableSchema,
					"sourceWithholdingTaxValue"
				),
			})
		})

		return dividends
	}

	private selectTableArea(tableSchema: {
		name?: string
		sheet?: string
		columns: Record<string, { column: string; header: string }>
	}) {
		const sheetName = tableSchema.sheet ?? DEFAULT_SHEET
		const sheet = this.excel[sheetName]

		if (sheet == undefined)
			throw Error(
				`Error in Report builder. Data doesn't include ${sheetName} sheet.`
			)

		let startIndex = 0

		if (tableSchema.name) {
			startIndex = sheet.findIndex((x) => x.A == tableSchema.name)

			if (startIndex == -1)
				throw Error(
					`Error in Report builder. Data doesn't include table with name ${tableSchema.name} on sheet ${sheetName}.`
				)
		}

		let lastIndex = sheet
			.slice(startIndex)
			.findIndex((x) => x.A == String.Empty)

		if (lastIndex == -1)
			throw Error(
				`Error in Report builder. End of table ${tableSchema.name} on sheet ${sheetName} not found.`
			)

		lastIndex = lastIndex + startIndex

		const offsetHead = tableSchema.name ? 1 : 0

		this.validateTableColumns(
			`${sheetName}_${tableSchema.name ?? "N/A"}`,
			sheet.at(startIndex + offsetHead)!,
			tableSchema.columns
		)

		const offsetData = tableSchema.name ? 2 : 1

		return sheet.slice(startIndex + offsetData, lastIndex)
	}

	private validateTableColumns(
		tableName: string,
		row: Record<string, string>,
		columnsSchema: Record<string, { column: string; header: string }>
	) {
		const defs = Object.values(columnsSchema)

		defs.forEach((def) => {
			if (row[def.column] != def.header)
				throw Error(
					`Error in Report builder. An error occurred while checking the columns of the ${tableName} table. Column ${def.column} was expected with name ${def.header} but is named ${row[def.column]}.`
				)
		})
	}

	private getNumber<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"]
	) {
		const columnDef = schema.columns[column as any]
		if (columnDef == undefined) return null
		const v = this.activeRow![columnDef.column]
		return Number(
			v.replace(",", ".").replaceAll(" ", "").replaceAll(" ", "")
		)
	}

	private getBoolean<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"]
	) {
		const columnDef = schema.columns[column as any]
		if (columnDef == undefined) return null
		return this.activeRow![columnDef.column] == "Ano"
	}

	private getString<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"]
	) {
		const columnDef = schema.columns[column as any]
		if (columnDef == undefined) return null
		return String(this.activeRow![columnDef.column])
	}

	private getDate<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"]
	): Date
	private getDate<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"],
		date: "in" | "out"
	): Date
	private getDate<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"],
		date?: "in" | "out"
	): Date | null {
		const columnDef = schema.columns[column as any]
		if (columnDef == undefined) return null
		const dates = this.activeRow![columnDef.column]

		if (date == undefined) return new Date(dates.trim())

		const splitted = dates.split("/")

		if (splitted.length != 2)
			throw Error(
				`Error in Report builder. Invalid data in dates column (${this.activeRow![schema.columns.dates!.column]}). Format DATE_IN / DATE_OUT is expected.`
			)

		return new Date(splitted[date == "in" ? 0 : 1].trim())
	}
}

const DEFAULT_SHEET = "sheet1"

type TableSchemaWithColumns = {
	columns: Record<string, { column: string; header: string } | undefined>
}

export type Report = {
	broker: string
	version: number
	description: string | null
	incomeUsd: IncomeForegin[] | null
	incomeEur: IncomeForegin[] | null
	incomeCzk: IncomeCzk[] | null
	income: Income[] | null
	currencyHedging: CurrencyHedging[] | null
	fees: Fee[] | null
	dividendsUsd: Dividend[] | null
}

type IncomeForegin = {
	id: number | null
	dateIn: Date
	dateOut: Date
	isin: string
	name: string
	count: number
	unitBuy: number
	unitSell: number
	buyRate: number | null
	sellRate: number | null
	expenseCzk: number | null
	incomeCzk: number | null
	profitCzk: number | null
	timeTest: boolean
}

type IncomeCzk = {
	id: number | null
	dateIn: Date
	dateOut: Date
	isin: string
	name: string
	count: number
	unitBuy: number
	unitSell: number
	expense: number | null
	income: number | null
	profit: number | null
	timeTest: boolean
}

type Income = {
	id: number | null
	dateIn: Date
	dateOut: Date
	isin: string
	name: string
	count: number
	unitBuy: number
	unitSell: number
}

type CurrencyHedging = {
	id: number | null
	name: string
	position: string
	dateIn: Date
	dateOut: Date
	buyRate: number
	sellRate: number
	profit: number
}

type Fee = {
	id: number | null
	date: Date
	name: string
	fee: number
}

type Dividend = {
	id: number | null
	date: Date
	isin: string
	name: string
	gross: number
	rate: number | null
	grossCzk: number | null
	sourceWithholdingTax: number | null
	czWithholdingTax: number | null
	sourceWithholdingTaxValue: number | null
	czWithholdingTaxValue: number | null
	creditedTax: number | null
}
