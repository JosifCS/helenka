import { PortuAnnualReport, PortuTotals } from "@/types/portuParser"
import dictionary from "@/dictionaries/report2023.portu.json"
import { RawTableDefinition } from "@/types/global"

export const portuParser = async (csvFile: File) => {
	const raw = await csvFile.text(),
		rawGrid = raw.split(String.CRLF).map((x) => x.split(";"))

	const parsedData: PortuAnnualReport = {
		currencyHedging: parseTable(rawGrid, dictionary.currencyHedging),
		czkIncomes: parseTable(rawGrid, dictionary.czkIncomes),
		dividends: parseTable(rawGrid, dictionary.dividends),
		eurIncomes: parseTable(rawGrid, dictionary.eurIncomes),
		fees: parseTable(rawGrid, dictionary.fees),
		usdIncomes: parseTable(rawGrid, dictionary.usdIncomes),
		totals: parseTotals(rawGrid),
	}

	return parsedData
}

const parseTotals = (rawGrid: string[][]): PortuTotals => {
	const totals: any = {}

	dictionary.totals.forEach((item) => {
		totals[item.key] = getRowValue(item, rawGrid) as any
	})

	return totals
}

const parseTable = (
	rawGrid: string[][],
	definition: RawTableDefinition
): any => {
	const firstIndex = rawGrid.findIndex((x) => x.at(0) == definition.name)

	if (firstIndex == -1)
		throw Error(
			`Při pokusu o parsování tabulky nebla tabulka nelazena podle názvu. ${definition.name}`
		)

	const lastIndex =
		rawGrid.slice(firstIndex).findIndex((x) => x.at(0) == String.CR) +
		firstIndex

	if (lastIndex == -1)
		throw Error(
			`Při pokusu o parsování tabulky nebl nalezen konec tabulky ${definition.name}`
		)

	/** První řádek je název tabulky a druhý řádek jsou názvy sloupců. */
	const OFFSET_HEAD = 1

	checkTableColumns(rawGrid.at(firstIndex + OFFSET_HEAD)!, definition)

	/** První řádek je název tabulky a druhý řádek jsou názvy sloupců. Až pak jsou data. */
	const OFFSET_DATA = 2

	/** Datové řádky vybrané tabulky. */
	const table = rawGrid.slice(firstIndex + OFFSET_DATA, lastIndex)

	return table.map((x) => parseTableRow(x, definition.columns))
}

const checkTableColumns = (
	dataRow: string[],
	definition: RawTableDefinition
) => {
	definition.columns.forEach((def) => {
		if (dataRow[def.index] != def.name)
			throw Error(
				`Při kontrole sloupců tabulky ${definition.name} došlo k chybě. Sloupec číslo ${def.index} byl učekáván s názvem ${def.name} ale je s názvem ${dataRow[def.index]}.`
			)
	})
}

const parseTableRow = (
	dataRow: string[],
	definitions: {
		key: string
		type: string
		index: number
	}[]
) => {
	const row: any = {}

	definitions.forEach((def) => {
		row[def.key] = parseValue(dataRow[def.index], def.type)
	})
	return row
}

/**
 * Získání hodnoty na základě názvu řádku.
 * @param value Název hodnoty v řádku.
 * @param rawGrid Celý Portu výpis v poli.
 * @returns Hodnota ve sloupci vedle názvu.
 */
const getRowValue = (
	definition: {
		key: string
		type: string
		name: string
	},
	rawGrid: string[][]
) => {
	const value = rawGrid.find((x) => x[0] == definition.name)?.at(1)
	if (value == undefined)
		throw Error(`Portu výpis neobsahuje řádek s názvem ${definition.name}`)

	return parseValue(value, definition.type)
}

const parseValue = (value: string, type: string) => {
	switch (type) {
		case "string":
			return value
		case "number":
			return Number(
				value.replace(",", ".").replaceAll(" ", "").replaceAll(" ", "")
			)
		case "date":
			return new Date(value)
		case "range":
			const d = value.split("/")
			return { from: new Date(d[0].trim()), to: new Date(d[1].trim()) }
		default:
			throw new Error(`Typ hodnoty ${type} neumím parsovat.`)
	}
}
