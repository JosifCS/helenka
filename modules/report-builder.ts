import { ExcelData } from "./csv-json"
import { ReportSchema, reportSchema } from "./report-schema"
import { parseDate } from "./date-utils"
import { ArgumentNullError, FormatError, NotImplementedError } from "./error"

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
		const broker = b.schema.broker,
			fees = b.parseFees()
		const { from, to } = ReportBuilder.getReportRange(broker, fees)

		const report: Report = {
			broker,
			from,
			to,
			version: b.schema.version,
			description: b.schema.description ?? null,
			incomeForegin: b.parseIncomeForegin(
				b.schema.incomesUsd,
				b.schema.incomesEur
			),
			incomeCzk: b.parseIncomeCzk(),
			currencyHedging: b.parseCurrencyHedging(),
			fees,
			dividendsUsd: b.parseDividends(b.schema.dividendsUsd),
		}

		return report
	}

	private static getReportRange(
		broker: "portu" | "xtb" | "etoro",
		fees: Fee[] | null
	) {
		switch (broker) {
			case "portu":
				return {
					from: new Date(
						new Date(fees![0].date).getFullYear(),
						0,
						1
					).getTime(),
					to: new Date(
						new Date(fees![0].date).getFullYear() + 1,
						0,
						0
					).getTime(),
				}
			default:
				throw new NotImplementedError(
					"Error in Report builder. GetReportRange."
				)
		}
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
		incomesUsd: ReportSchema["incomesUsd"] | undefined,
		incomesEur: ReportSchema["incomesEur"] | undefined
	): IncomeForegin[] | null {
		if (incomesEur == undefined || incomesUsd == undefined) return null

		const usd = this.parseIncomeForegin2(incomesUsd, "usd")
		const eur = this.parseIncomeForegin2(incomesEur, "eur")
		const incomes = [...usd, ...eur].sort((a, b) => a.dateOut - b.dateOut)

		return incomes
	}

	private parseIncomeForegin2(
		tableSchema: ReportSchema["incomesUsd"] | undefined,
		currency: "eur" | "usd"
	): IncomeForegin[] {
		if (tableSchema == undefined) return []

		const incomes: IncomeForegin[] = []

		const table = this.selectTableArea(tableSchema)

		table.forEach((row) => {
			this.activeRow = row
			const unitBuy = this.getNumber(tableSchema, "unitBuy"),
				unitSale = this.getNumber(tableSchema, "unitSale"),
				count = this.getNumber(tableSchema, "count")!

			let expense = 0,
				income = 0
			if (unitBuy != null && unitSale != null) {
				expense = unitBuy * count
				income = unitSale * count
			} else {
				throw new Error(
					"Error in Report builder. The schema does not contain data for income and expense from sales."
				)
			}

			incomes.push({
				count,
				currency,
				dateIn: this.getDate(tableSchema, "dates", "in"),
				dateOut: this.getDate(tableSchema, "dates", "out"),
				isin: this.getString(tableSchema, "isin")!,
				name: this.getString(tableSchema, "name")!,
				timeTest: this.getBoolean(tableSchema, "timeTest")!,
				expense,
				income,
				check: {
					buyRate: this.getNumber(tableSchema, "buyRate"),
					expenseCzk: this.getNumber(tableSchema, "expenseCzk"),
					incomeCzk: this.getNumber(tableSchema, "incomeCzk"),
					profitCzk: this.getNumber(tableSchema, "profitCzk"),
					sellRate: this.getNumber(tableSchema, "sellRate"),
					unitBuy,
					unitSale,
				},
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
				unitSell: this.getNumber(tableSchema, "unitSale")!,
				expense: this.getNumber(tableSchema, "expense"),
				income: this.getNumber(tableSchema, "income"),
				profit: this.getNumber(tableSchema, "profit"),
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

	/**
	 *
	 * @param schema
	 * @param column
	 * @returns Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC or null.
	 */
	private getDate<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"]
	): number
	/**
	 *
	 * @param schema
	 * @param column
	 * @param date
	 * @returns Returns the stored time value in milliseconds since midnight, January 1, 1970 UTC or throw Error.
	 */
	private getDate<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"],
		date: "in" | "out"
	): number
	private getDate<T extends TableSchemaWithColumns>(
		schema: T,
		column: keyof T["columns"],
		date?: "in" | "out"
	): number {
		const columnDef = schema.columns[column as any]
		if (columnDef == undefined)
			throw new ArgumentNullError(
				`Error in Report builder. Undefined value in column ${String(column)}.`
			)
		const dates = this.activeRow![columnDef.column]

		if (date == undefined) {
			const parsed = parseDate(dates)
			if (parsed == null)
				throw new FormatError(
					`Error in Report builder. Invalid value in column ${String(column)}. Format DATE is expected.`
				)
			return parsed
		}

		const splitted = dates.split("/")

		if (splitted.length != 2)
			throw Error(
				`Error in Report builder. Invalid data in dates column (${this.activeRow![schema.columns.dates!.column]}). Format DATE_IN / DATE_OUT is expected.`
			)

		const parsed = parseDate(splitted[date == "in" ? 0 : 1])

		if (parsed == null)
			throw new FormatError(
				`Error in Report builder. Invalid value in column ${String(column)}. Format DATE_IN / DATE_OUT is expected.`
			)
		return parsed
	}
}

const DEFAULT_SHEET = "sheet1"

type TableSchemaWithColumns = {
	columns: Record<string, { column: string; header: string } | undefined>
}

export type Report = {
	broker: "portu" | "xtb" | "etoro"
	/** Označení verze formátu výpisu. Zpravidla se jedná o rok. */
	version: number
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	from: number
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	to: number
	description: string | null
	incomeForegin: IncomeForegin[] | null
	incomeCzk: IncomeCzk[] | null
	currencyHedging: CurrencyHedging[] | null
	fees: Fee[] | null
	dividendsUsd: Dividend[] | null
}

type IncomeForegin = {
	currency: "usd" | "eur"
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	dateIn: number
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	dateOut: number
	isin: string
	name: string
	count: number
	expense: number
	income: number
	timeTest: boolean | null
	/** Control data that can be used to check the calculation. */
	check: {
		/** Daily exchange rate (Portu). */
		buyRate: number | null
		/** Daily exchange rate (Portu). */
		sellRate: number | null
		/** Expense in CZK at the daily exchange rate (Portu). */
		expenseCzk: number | null
		/** Income in CZK at the daily exchange rate (Portu). */
		incomeCzk: number | null
		/** Profit in CZK at the daily exchange rate (Portu). */
		profitCzk: number | null
		/** Unit price of purchase. */
		unitBuy: number | null
		/** Unit price sale. */
		unitSale: number | null
	}
}

type IncomeCzk = {
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	dateIn: number
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	dateOut: number
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

type CurrencyHedging = {
	name: string
	position: string
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	dateIn: number
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	dateOut: number
	buyRate: number
	sellRate: number
	profit: number
}

type Fee = {
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	date: number
	name: string
	fee: number
}

type Dividend = {
	/** The stored time value in milliseconds since midnight, January 1, 1970 UTC. */
	date: number
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
