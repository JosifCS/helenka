/** Data in Excel file format.
 * @example
 *{
 *   sheet1: [
 *     {
 *       A: 'data of cell A1',
 *       B: 'data of cell B1',
 *       C: 'data of cell C1'
 *     },
 *     ...
 *   ]
 * }
 */
export type ExcelData = Record<string, Record<string, string>[]>

/**
 * Převod CSV souboru na objekt indexovaný jako Exelová tabulka. Jen s jednou stránkou.
 * @param csvFile CSV soubor.
 * @param columnSeparator Oddělovač sloupců. Výchozí jodnota je *;*.
 * @param lineBreak Znak odřádkování. Výchozí hodnota je *\r\n*.
 * @returns
 * ```
 * {
 *   sheet1: [
 *     {
 *       A: 'data of cell A1',
 *       B: 'data of cell B1',
 *       C: 'data of cell C1'
 *     },
 *     ...
 *   ]
 * }
 * ```
 */
export async function csvToJson(
	csvFile: File,
	columnSeparator: ";" | "," | "\t" | " " = ";",
	lineBreak: "\r" | "\n" | "\r\n" = "\r\n"
): Promise<ExcelData> {
	const raw = await csvFile.text(),
		rawGrid = raw.split(lineBreak).map((x) => x.split(columnSeparator))

	const sheet1 = rawGrid.map((row) => {
		const rowObject: any = {}
		row.forEach((column, index) => {
			rowObject[indexToExcelColumn(index)] = column
		})
		return rowObject
	})

	return { sheet1 }
}

function indexToExcelColumn(index: number) {
	let column = ""
	while (index >= 0) {
		column = String.fromCharCode((index % 26) + 65) + column
		index = Math.floor(index / 26) - 1
	}
	return column
}
